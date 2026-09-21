#!/usr/bin/env node
// Compact, readable outline of one exported Figma frame (see scripts/figma-export.mjs).
//
//   node scripts/design/outline.mjs <nodeId> [--y0=N --y1=N] [--depth=N]
//
// Prints each visible node as one line: type, name, box relative to the frame,
// auto-layout, fills/strokes, radius, effects, and text with its font. --y0/--y1
// limit output to nodes overlapping that vertical band of the frame, so a long
// page can be read one section at a time.

import fs from 'node:fs'
import path from 'node:path'

const [id, ...flags] = process.argv.slice(2)
if (!id) {
  console.error('usage: outline.mjs <nodeId> [--y0=N --y1=N] [--depth=N]')
  process.exit(1)
}
const opt = Object.fromEntries(flags.map((f) => f.replace(/^--/, '').split('=')).map(([k, v]) => [k, Number(v)]))
const y0 = opt.y0 ?? -Infinity
const y1 = opt.y1 ?? Infinity
const maxDepth = opt.depth ?? 99

const root = path.resolve('design/figma')
const index = JSON.parse(fs.readFileSync(path.join(root, 'frames.json'), 'utf8'))
const entry = index.find((f) => f.id === id)
if (!entry) {
  console.error(`frame ${id} not found in design/figma/frames.json`)
  process.exit(1)
}
const frame = JSON.parse(fs.readFileSync(path.join(root, 'frames', entry.file + '.json'), 'utf8'))
const ox = frame.absoluteBoundingBox.x
const oy = frame.absoluteBoundingBox.y

const hex = ({r, g, b}) =>
  '#' + [r, g, b].map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('')
const r1 = (n) => Math.round(n * 10) / 10

function paint(p) {
  if (p.visible === false) return null
  if (p.type === 'SOLID') {
    const a = r1((p.opacity ?? 1) * (p.color.a ?? 1))
    return a === 1 ? hex(p.color) : `${hex(p.color)}@${a}`
  }
  if (p.type === 'IMAGE') return `img:${p.imageRef?.slice(0, 10)}(${p.scaleMode?.toLowerCase()})`
  if (p.type.startsWith('GRADIENT')) {
    const stops = p.gradientStops.map((s) => `${hex(s.color)}@${r1(s.color.a)} ${Math.round(s.position * 100)}%`)
    return `${p.type.replace('GRADIENT_', '').toLowerCase()}-gradient(${stops.join(', ')})`
  }
  return p.type.toLowerCase()
}

function describe(n) {
  const parts = []
  const b = n.absoluteBoundingBox
  if (b) parts.push(`[${Math.round(b.x - ox)},${Math.round(b.y - oy)} ${Math.round(b.width)}x${Math.round(b.height)}]`)
  if (n.layoutMode && n.layoutMode !== 'NONE') {
    const pad = [n.paddingTop, n.paddingRight, n.paddingBottom, n.paddingLeft].map((v) => v ?? 0)
    const padStr = pad.every((v) => v === pad[0]) ? `${pad[0]}` : pad.join('/')
    parts.push(
      `${n.layoutMode === 'HORIZONTAL' ? 'row' : 'col'} gap${n.itemSpacing ?? 0} pad${padStr}` +
        (n.primaryAxisAlignItems && n.primaryAxisAlignItems !== 'MIN' ? ` main:${n.primaryAxisAlignItems.toLowerCase()}` : '') +
        (n.counterAxisAlignItems && n.counterAxisAlignItems !== 'MIN' ? ` cross:${n.counterAxisAlignItems.toLowerCase()}` : '') +
        (n.layoutWrap === 'WRAP' ? ' wrap' : ''),
    )
  }
  const fills = (n.fills ?? []).map(paint).filter(Boolean)
  if (fills.length && n.type !== 'TEXT') parts.push(`bg ${fills.join(' + ')}`)
  const strokes = (n.strokes ?? []).map(paint).filter(Boolean)
  if (strokes.length && n.strokeWeight) parts.push(`border ${r1(n.strokeWeight)} ${strokes.join(' ')}`)
  if (n.cornerRadius) parts.push(`r${r1(n.cornerRadius)}`)
  else if (n.rectangleCornerRadii?.some(Boolean)) parts.push(`r${n.rectangleCornerRadii.map(r1).join('/')}`)
  const fx = (n.effects ?? []).filter((e) => e.visible !== false)
  if (fx.length) parts.push(fx.map((e) => e.type === 'DROP_SHADOW' ? `shadow(${e.offset?.y ?? 0},${e.radius})` : e.type.toLowerCase()).join(' '))
  if (n.opacity !== undefined && n.opacity < 1) parts.push(`opacity${r1(n.opacity)}`)
  if (n.type === 'TEXT') {
    const s = n.style ?? {}
    const color = fills[0] ?? ''
    const lh = s.lineHeightPx ? `/${r1(s.lineHeightPx)}` : ''
    const extras = [
      s.textAlignHorizontal && s.textAlignHorizontal !== 'LEFT' ? s.textAlignHorizontal.toLowerCase() : '',
      s.textCase && s.textCase !== 'ORIGINAL' ? s.textCase.toLowerCase() : '',
      s.letterSpacing ? `ls${r1(s.letterSpacing)}` : '',
      s.textDecoration && s.textDecoration !== 'NONE' ? s.textDecoration.toLowerCase() : '',
    ].filter(Boolean)
    parts.push(`${s.fontFamily} ${s.fontWeight} ${s.fontSize}${lh} ${color}${extras.length ? ' ' + extras.join(' ') : ''}`)
    const text = n.characters.replace(/\n/g, ' ⏎ ')
    parts.push(`"${text.length > 160 ? text.slice(0, 157) + '…' : text}"`)
  }
  return parts.join('  ')
}

function visit(n, depth) {
  if (n.visible === false) return
  const b = n.absoluteBoundingBox
  if (b && depth > 0) {
    const top = b.y - oy
    if (top + b.height < y0 || top > y1) return
  }
  const label = n.type === 'INSTANCE' ? `inst` : n.type.toLowerCase().replace('rounded_rectangle', 'rect')
  console.log(`${'  '.repeat(depth)}${label} ${JSON.stringify(n.name)}  ${describe(n)}`)
  if (depth >= maxDepth) {
    if (n.children?.length) console.log(`${'  '.repeat(depth + 1)}… ${n.children.length} children`)
    return
  }
  for (const c of n.children ?? []) visit(c, depth + 1)
}

visit(frame, 0)
