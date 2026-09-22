#!/usr/bin/env node
// Print runtime errors a route throws in the dev server:  node scripts/design/errors.mjs /route
import { chromium } from 'playwright-core';
const route = process.argv[2] || '/';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage();
p.on('pageerror', (e) => console.log('PAGEERROR', e.message));
p.on('console', (m) => m.type() === 'error' && console.log('CONSOLE', m.text().slice(0, 400)));
await p.goto((process.env.SITE_URL ?? 'https://simsree-website.vercel.app') + route, { waitUntil: 'networkidle' });
await b.close();
