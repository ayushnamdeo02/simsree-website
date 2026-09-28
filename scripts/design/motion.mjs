#!/usr/bin/env node
// Check the scroll reveal and counters on a route:  node scripts/design/motion.mjs /route
// Scrolls the page the way a visitor would, then reports anything left invisible.
import { chromium } from 'playwright-core';

const base = process.env.SITE_URL ?? 'https://simsree-website.vercel.app';
const route = process.argv[2] || '/';
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('pageerror', (e) => console.log('PAGE ERROR', e.message));
await page.goto(base + route, { waitUntil: 'networkidle', timeout: 60000 });

// How many boxes start hidden, before any scrolling.
const tagged = await page.evaluate(() => document.querySelectorAll('[data-reveal]').length);

await page.evaluate(async () => {
  const step = Math.round(window.innerHeight * 0.8);
  for (let y = 0; y <= document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1800);

const report = await page.evaluate(() => {
  const hidden = [];
  for (const el of document.querySelectorAll('main *')) {
    const style = getComputedStyle(el);
    if (Number(style.opacity) < 0.9 && el.getBoundingClientRect().height > 40) {
      hidden.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().slice(0, 60)}`);
    }
  }
  const stats = [...document.querySelectorAll('main span')]
    .map((s) => s.textContent.trim())
    .filter((t) => /^[₹+]?\d/.test(t) && t.length < 14)
    .slice(0, 8);
  return { hidden: hidden.slice(0, 8), hiddenCount: hidden.length, stats };
});

console.log(`${route}  tagged-on-load: ${tagged}  still-hidden-after-scroll: ${report.hiddenCount}`);
if (report.hidden.length) console.log('  ' + report.hidden.join('\n  '));
console.log('  numbers: ' + report.stats.join(' | '));
await browser.close();
