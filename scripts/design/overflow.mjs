#!/usr/bin/env node
// List elements that stick out past a mobile viewport:  node scripts/design/overflow.mjs /route [width]
import { chromium } from 'playwright-core';
const route = process.argv[2] || '/';
const width = Number(process.argv[3] || 375);
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport: { width, height: 800 } });
await p.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' });
const hits = await p.evaluate((w) => {
  const out = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.right > w + 1 && r.width > 0) {
      // Skip descendants of scroll containers — they are meant to overflow.
      let a = el.parentElement, clipped = false;
      while (a && a !== document.body && a !== document.documentElement) { const o = getComputedStyle(a).overflowX; if (o === 'auto' || o === 'hidden' || o === 'scroll') { clipped = true; break; } a = a.parentElement; }
      if (!clipped) out.push(`${Math.round(r.right)}  <${el.tagName.toLowerCase()} class="${(el.className?.baseVal ?? el.className ?? '').toString().slice(0, 90)}">  ${(el.textContent || '').trim().slice(0, 40)}`);
    }
  }
  out.unshift(`scrollWidth ${document.documentElement.scrollWidth}`);
  return out.slice(0, 15);
}, width);
console.log(hits.join('\n') || 'no overflow');
await b.close();
