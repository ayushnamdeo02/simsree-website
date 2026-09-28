#!/usr/bin/env node
// Full-page screenshots of the running dev site at the Figma frame widths.
//
//   node scripts/design/shoot.mjs <route> [name] [--widths=1440,375]
//   node scripts/design/shoot.mjs --pages=home,about,...   (names from pages.json)
//   node scripts/design/shoot.mjs --all
//
// Writes design/shots/<name>-<width>.png. Uses the locally installed Edge, so no
// browser download is needed. Waits for Sanity data and images before shooting.
// In Git Bash, export MSYS_NO_PATHCONV=1 first or "/" routes get mangled.

import fs from 'node:fs'
import path from 'node:path'
import {chromium} from 'playwright-core'

const args = process.argv.slice(2)
const flags = Object.fromEntries(args.filter((a) => a.startsWith('--')).map((a) => [...a.slice(2).split('='), true].slice(0, 2)))
const positional = args.filter((a) => !a.startsWith('--'))
const base = flags.base ?? process.env.SITE_URL ?? 'https://simsree-website.vercel.app'
const outDir = path.resolve('design/shots')
fs.mkdirSync(outDir, {recursive: true})

const pages = JSON.parse(fs.readFileSync(path.resolve('scripts/design/pages.json'), 'utf8'))
let jobs
if (flags.all || flags.pages) {
  const wanted = flags.all ? null : new Set(String(flags.pages).split(','))
  jobs = pages
    .filter((p) => !wanted || wanted.has(p.name))
    .map((p) => ({route: p.route, name: p.name, widths: p.mobile ? [1440, 375] : [1440]}))
} else {
  const [route = '/', name = route.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'home'] = positional
  jobs = [{route, name, widths: (flags.widths ?? '1440,375').split(',').map(Number)}]
}

async function shoot(browser, {route, name}, width) {
  const page = await browser.newPage({viewport: {width, height: 900}, deviceScaleFactor: 1, reducedMotion: 'reduce'})
  // A render crash leaves an empty page; report it instead of a misleading shot.
  page.on('pageerror', (e) => console.log(`${name}-${width}  PAGE ERROR: ${e.message}`))
  try {
    await page.goto(base + route, {waitUntil: 'networkidle', timeout: 60000})
    // Freeze motion so the screenshot is stable.
    await page.addStyleTag({
      content: '*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}',
    })
    // Scroll through the page so lazy images load, then back to the top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 60))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForLoadState('networkidle')
    await page.evaluate(() =>
      Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => (i.onload = i.onerror = r)))),
    )
    await page.evaluate(() => document.fonts.ready)
    const file = path.join(outDir, `${name}-${width}.png`)
    await page.screenshot({path: file, fullPage: true})
    const h = await page.evaluate(() => document.documentElement.scrollHeight)
    console.log(`${name}-${width}.png  ${width}x${h}`)
  } catch (e) {
    console.log(`${name}-${width}  FAILED: ${e.message.split('\n')[0]}`)
  } finally {
    await page.close()
  }
}

const browser = await chromium.launch({channel: 'msedge', headless: true})
try {
  for (const job of jobs) for (const w of job.widths) await shoot(browser, job, w)
} finally {
  await browser.close()
}
