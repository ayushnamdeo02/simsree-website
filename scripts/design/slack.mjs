#!/usr/bin/env node
// Find boxes with a lot of empty space inside them (a fixed height much taller
// than the content it holds):  node scripts/design/slack.mjs /route [width]
import { chromium } from 'playwright-core';

const base = process.env.SITE_URL ?? 'https://simsree-website.vercel.app';
const route = process.argv[2] || '/';
const width = Number(process.argv[3] || 1440);

const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
await p.goto(base + route, { waitUntil: 'networkidle', timeout: 90000 });

const rows = await p.evaluate(() => {
  const out = [];
  for (const el of document.querySelectorAll('main *')) {
    const cls = (el.className || '').toString();
    if (!/(min-h-|h-\[)/.test(cls)) continue;
    const r = el.getBoundingClientRect();
    if (r.height < 60 || !el.children.length) continue;
    const kids = [...el.children].map((k) => k.getBoundingClientRect());
    const content = Math.max(...kids.map((k) => k.bottom)) - Math.min(...kids.map((k) => k.top));
    const style = getComputedStyle(el);
    const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const slack = Math.round(r.height - content - padding);
    if (slack > 60) {
      out.push({ slack, h: Math.round(r.height), w: Math.round(r.width), cls: cls.slice(0, 95) });
    }
  }
  return out.sort((a, b) => b.slack - a.slack).slice(0, 10);
});

console.log(`${route} @${width}`);
for (const r of rows) console.log(`  empty ${r.slack}px  box ${r.w}x${r.h}  ${r.cls}`);
if (!rows.length) console.log('  no boxes with unused space');
await b.close();
