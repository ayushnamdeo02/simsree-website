#!/usr/bin/env node
// One-shot export of the Simsree Figma file to design/figma/ via the Figma REST API
// (not the MCP server, so it doesn't use up the MCP quota).
//
//   npm run figma:export
//
// Needs FIGMA_TOKEN (a personal access token with "File content: read-only") in the
// environment or in .env.local. Safe to re-run: every step skips what is already on disk,
// so if Figma rate-limits us partway through, just run it again later to resume.
//
// Output (all git-ignored, regenerate with this script):
//   file.json            full document: every node, text, fill, font, layout
//   frames.json          index of every section/frame with id, size, position
//   frames/<section>/    one JSON subtree + one text dump per frame
//   tokens.json          colours, text styles, radii, effects actually used, with usage counts
//   renders/<section>/   PNG of every frame (desktop + mobile)
//   assets/              every raster image used as a fill, named by imageRef

import fs from 'node:fs'
import path from 'node:path'

const FILE_KEY = 'akRHKhz6PoLU6r7jPtamQn'
const OUT = path.resolve('design/figma')
const API = 'https://api.figma.com/v1'
const RENDER_BATCH = 20 // frames per /images call; bigger batches risk Figma render timeouts

const token = process.env.FIGMA_TOKEN || readEnvLocal('FIGMA_TOKEN')
if (!token) {
  console.error('FIGMA_TOKEN is not set. Put FIGMA_TOKEN=... in .env.local (git-ignored) or the environment.')
  process.exit(1)
}

fs.mkdirSync(OUT, {recursive: true})

// ---------- helpers ----------

function readEnvLocal(name) {
  try {
    const line = fs
      .readFileSync('.env.local', 'utf8')
      .split(/\r?\n/)
      .find((l) => l.startsWith(name + '='))
    return line?.slice(name.length + 1).trim().replace(/^["']|["']$/g, '')
  } catch {
    return undefined
  }
}

class RateLimited extends Error {}

async function api(pathname) {
  const res = await fetch(API + pathname, {headers: {'X-Figma-Token': token}})
  const tier = res.headers.get('x-figma-plan-tier')
  const limitType = res.headers.get('x-figma-rate-limit-type')
  if (res.status === 429) {
    const retry = Number(res.headers.get('retry-after') || 0)
    throw new RateLimited(
      `Rate limited on ${pathname} (plan tier: ${tier ?? '?'}, limit type: ${limitType ?? '?'}). ` +
        `Retry after ${retry ? humanSeconds(retry) : 'a while'}; re-run to resume — finished steps are kept.`,
    )
  }
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} on ${pathname}: ${await res.text()}`)
  return res.json()
}

async function download(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} downloading ${url}`)
  fs.mkdirSync(path.dirname(dest), {recursive: true})
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()))
}

function humanSeconds(s) {
  if (s < 120) return `${s}s`
  if (s < 7200) return `${Math.round(s / 60)} min`
  if (s < 172800) return `${Math.round(s / 3600)} h`
  return `${Math.round(s / 86400)} days`
}

const slug = (s) =>
  s
    .normalize('NFKD')
    .replace(/[^\w\s.-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase() || 'unnamed'

const fileNameFor = (f) => `${slug(f.name)}__${f.width}w__${f.id.replace(':', '-')}`

const writeJson = (p, v) => {
  fs.mkdirSync(path.dirname(p), {recursive: true})
  fs.writeFileSync(p, JSON.stringify(v, null, 2))
}

function walk(node, fn, depth = 0) {
  fn(node, depth)
  for (const c of node.children ?? []) walk(c, fn, depth + 1)
}

const hex = ({r, g, b}) =>
  '#' + [r, g, b].map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('')

// ---------- 1. full document (1 API call) ----------

const filePath = path.join(OUT, 'file.json')
let file
if (fs.existsSync(filePath)) {
  console.log('✓ file.json already downloaded')
  file = JSON.parse(fs.readFileSync(filePath, 'utf8'))
} else {
  console.log('… downloading full document (one call, can take a minute)')
  try {
    file = await api(`/files/${FILE_KEY}`)
  } catch (e) {
    if (!(e instanceof RateLimited)) throw e
    console.error('✗ ' + e.message)
    process.exit(2)
  }
  fs.writeFileSync(filePath, JSON.stringify(file))
  console.log(`✓ file.json (${(fs.statSync(filePath).size / 1e6).toFixed(1)} MB)`)
}

// ---------- 2. frame index + per-frame JSON and text (no API calls) ----------

const frames = []
for (const page of file.document.children) {
  for (const top of page.children ?? []) {
    const isSection = top.type === 'SECTION'
    const group = isSection ? top.children ?? [] : [top]
    for (const f of group) {
      const b = f.absoluteBoundingBox ?? {}
      frames.push({
        page: page.name,
        section: isSection ? top.name : '(top level)',
        id: f.id,
        name: f.name,
        type: f.type,
        width: Math.round(b.width ?? 0),
        height: Math.round(b.height ?? 0),
        x: Math.round(b.x ?? 0),
        y: Math.round(b.y ?? 0),
        node: f,
      })
    }
  }
}
writeJson(
  path.join(OUT, 'frames.json'),
  frames.map(({node, ...rest}) => ({...rest, file: `${slug(rest.section)}/${fileNameFor(rest)}`})),
)

for (const f of frames) {
  const base = path.join(OUT, 'frames', slug(f.section), fileNameFor(f))
  writeJson(base + '.json', f.node)

  const texts = []
  walk(f.node, (n) => {
    if (n.type !== 'TEXT' || !n.characters?.trim()) return
    const b = n.absoluteBoundingBox ?? {x: 0, y: 0}
    const s = n.style ?? {}
    texts.push({
      y: b.y,
      x: b.x,
      text: n.characters.trim(),
      style: [s.fontFamily, s.fontWeight, s.fontSize && `${s.fontSize}px`].filter(Boolean).join(' '),
    })
  })
  texts.sort((a, b) => a.y - b.y || a.x - b.x)
  const md = [
    `# ${f.name} (${f.width}×${f.height}) — node ${f.id}`,
    `Section: ${f.section}`,
    '',
    ...texts.map((t) => `- ${t.text.replace(/\n/g, ' / ')}  _(${t.style})_`),
  ].join('\n')
  fs.writeFileSync(base + '.md', md + '\n')
}
console.log(`✓ ${frames.length} frames split into frames/ (JSON + text)`)

// ---------- 3. design tokens actually in use (no API calls) ----------

const count = (map, key, extra) => {
  const e = map.get(key) ?? {count: 0, ...extra}
  e.count++
  map.set(key, e)
}
const colors = new Map()
const textStyles = new Map()
const radii = new Map()
const effects = new Map()
const styleNames = file.styles ?? {}

walk(file.document, (n) => {
  for (const kind of ['fills', 'strokes']) {
    for (const p of n[kind] ?? []) {
      if (p.type !== 'SOLID' || p.visible === false) continue
      const a = +((p.opacity ?? 1) * (p.color.a ?? 1)).toFixed(2)
      const styleId = n.styles?.[kind === 'fills' ? 'fill' : 'stroke']
      count(colors, a === 1 ? hex(p.color) : `${hex(p.color)} @${a}`, {
        style: styleId ? styleNames[styleId]?.name : undefined,
      })
    }
  }
  if (n.type === 'TEXT' && n.style) {
    const s = n.style
    const lh = s.lineHeightPx ? Math.round(s.lineHeightPx * 10) / 10 : undefined
    const key = `${s.fontFamily} ${s.fontWeight} ${s.fontSize}px / ${lh ?? 'auto'}${
      s.letterSpacing ? ` ls ${Math.round(s.letterSpacing * 100) / 100}` : ''
    }${s.textCase && s.textCase !== 'ORIGINAL' ? ` ${s.textCase}` : ''}`
    count(textStyles, key, {style: n.styles?.text ? styleNames[n.styles.text]?.name : undefined})
  }
  if (typeof n.cornerRadius === 'number' && n.cornerRadius > 0) count(radii, `${n.cornerRadius}px`)
  for (const e of n.effects ?? []) {
    if (e.visible === false) continue
    const c = e.color ? `${hex(e.color)} @${+(e.color.a ?? 1).toFixed(2)}` : ''
    count(effects, `${e.type} x${e.offset?.x ?? 0} y${e.offset?.y ?? 0} blur${e.radius ?? 0} spread${e.spread ?? 0} ${c}`.trim())
  }
})

const sorted = (m) =>
  [...m.entries()].sort((a, b) => b[1].count - a[1].count).map(([value, v]) => ({value, ...v}))
writeJson(path.join(OUT, 'tokens.json'), {
  namedStyles: Object.values(styleNames).map(({name, styleType, description}) => ({name, styleType, description})),
  colors: sorted(colors),
  textStyles: sorted(textStyles),
  radii: sorted(radii),
  effects: sorted(effects),
})
console.log(`✓ tokens.json (${colors.size} colours, ${textStyles.size} text styles)`)

// ---------- 4. raster image fills (1 API call, then plain downloads) ----------

try {
  const assetsDir = path.join(OUT, 'assets')
  const refs = new Set()
  walk(file.document, (n) => {
    for (const p of n.fills ?? []) if (p.type === 'IMAGE' && p.imageRef) refs.add(p.imageRef)
  })
  const missing = [...refs].filter(
    (r) => !fs.existsSync(assetsDir) || !fs.readdirSync(assetsDir).some((f) => f.startsWith(r)),
  )
  if (missing.length === 0) {
    console.log(`✓ assets/ already has all ${refs.size} images`)
  } else {
    const {meta} = await api(`/files/${FILE_KEY}/images`)
    let done = 0
    for (const ref of missing) {
      const url = meta.images[ref]
      if (!url) continue
      const res = await fetch(url)
      const ext = (res.headers.get('content-type') ?? 'image/png').split('/')[1].split(';')[0].replace('jpeg', 'jpg')
      fs.mkdirSync(assetsDir, {recursive: true})
      fs.writeFileSync(path.join(assetsDir, `${ref}.${ext}`), Buffer.from(await res.arrayBuffer()))
      done++
    }
    console.log(`✓ assets/ downloaded ${done} images (${refs.size} total)`)
  }
} catch (e) {
  if (e instanceof RateLimited) {
    console.error('✗ ' + e.message)
    process.exit(2)
  }
  throw e
}

// ---------- 5. PNG render of every frame (1 API call per RENDER_BATCH frames) ----------

const renderable = frames.filter((f) => ['FRAME', 'COMPONENT', 'INSTANCE', 'SECTION'].includes(f.type))
const renderPath = (f) => path.join(OUT, 'renders', slug(f.section), fileNameFor(f) + '.png')
const todo = renderable.filter((f) => !fs.existsSync(renderPath(f)))
console.log(`… rendering ${todo.length} of ${renderable.length} frames`)

try {
  for (let i = 0; i < todo.length; i += RENDER_BATCH) {
    const batch = todo.slice(i, i + RENDER_BATCH)
    const ids = batch.map((f) => f.id).join(',')
    const {images, err} = await api(`/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=png&scale=1`)
    if (err) console.warn('  render warning:', err)
    for (const f of batch) {
      if (images?.[f.id]) await download(images[f.id], renderPath(f))
      else console.warn(`  no render for ${f.id} ${f.name}`)
    }
    console.log(`  ${Math.min(i + RENDER_BATCH, todo.length)}/${todo.length}`)
  }
  console.log('✓ renders/ complete')
} catch (e) {
  if (e instanceof RateLimited) {
    console.error('✗ ' + e.message)
    process.exit(2)
  }
  throw e
}

console.log(`\nAll done → ${OUT}`)
