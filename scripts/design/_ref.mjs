// Dump the animation setup of a reference site.
import { chromium } from 'playwright-core';

const url = process.argv[2] || 'https://simsree-wireframe.vercel.app/';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const assets = [];
p.on('response', (r) => {
  const u = r.url();
  if (/\.(js|css)(\?|$)/.test(u)) assets.push(u);
});
await p.goto(url, { waitUntil: 'networkidle', timeout: 90000 });

const info = await p.evaluate(() => {
  const out = { libs: [], keyframes: [], animatedSamples: [], attrs: {}, inlineTransition: [] };
  for (const k of ['gsap', 'AOS', 'ScrollReveal', 'anime', 'Lenis', 'framerMotion', 'motion'])
    if (window[k]) out.libs.push(k);

  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch { continue; }
    for (const r of rules) {
      if (r.type === CSSRule.KEYFRAMES_RULE) out.keyframes.push(r.cssText.replace(/\s+/g, ' ').slice(0, 300));
      if (r.type === CSSRule.MEDIA_RULE) {
        for (const rr of r.cssRules) if (rr.type === CSSRule.KEYFRAMES_RULE) out.keyframes.push(rr.cssText.replace(/\s+/g, ' ').slice(0, 300));
      }
    }
  }

  // data-* hooks that reveal libraries (AOS, custom observers)
  for (const el of document.querySelectorAll('*')) {
    for (const a of el.attributes) {
      if (/^data-/.test(a.name) && /(aos|reveal|animate|motion|scroll|delay|inview)/i.test(a.name)) {
        out.attrs[a.name] = (out.attrs[a.name] || 0) + 1;
      }
    }
  }

  const seen = new Set();
  for (const el of document.querySelectorAll('main *, section *, body > div *')) {
    const s = getComputedStyle(el);
    const key = `${s.transitionProperty}|${s.transitionDuration}|${s.transitionTimingFunction}|${s.animationName}`;
    if (s.animationName !== 'none' || (s.transitionDuration !== '0s' && s.transitionProperty !== 'none')) {
      if (seen.has(key) || seen.size > 25) continue;
      seen.add(key);
      out.animatedSamples.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className || '').toString().slice(0, 70),
        anim: s.animationName,
        dur: s.animationDuration,
        ease: s.animationTimingFunction,
        tProp: s.transitionProperty.slice(0, 60),
        tDur: s.transitionDuration,
        tEase: s.transitionTimingFunction,
        opacity: s.opacity,
        transform: s.transform.slice(0, 40),
      });
    }
    if (el.style && (el.style.transform || el.style.opacity || el.style.transition)) {
      if (out.inlineTransition.length < 10)
        out.inlineTransition.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().slice(0, 40)} :: ${el.getAttribute('style').slice(0, 120)}`);
    }
  }
  return out;
});

console.log('ASSETS:', assets.slice(0, 12).join('\n  '));
console.log('\nLIBS:', info.libs);
console.log('\nDATA ATTRS:', JSON.stringify(info.attrs));
console.log('\nKEYFRAMES:');
for (const k of [...new Set(info.keyframes)].slice(0, 25)) console.log('  ' + k);
console.log('\nANIMATED SAMPLES:');
for (const s of info.animatedSamples) console.log('  ' + JSON.stringify(s));
console.log('\nINLINE STYLE:');
for (const s of info.inlineTransition) console.log('  ' + s);
await b.close();
