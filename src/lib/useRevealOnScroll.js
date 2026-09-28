import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Boxes and media that get a reveal as they scroll into view. Anything can opt in
// with data-reveal="up|fade|left|right", or out with data-no-reveal.
const CARD_SELECTORS = [
  '[class*="outline-black/20"]',
  '[class*="outline-black/15"]',
  '[class*="outline-white/20"]',
  '[class*="outline-ink-50"]',
  '[class*="border-black/20"]',
  'figure',
  'table',
];
const MEDIA_SELECTORS = ['img', '[class*="bg-cover"]'];

// Small controls (chips, buttons, inputs, tags) share the card outlines, so size
// is what separates a card from a control.
const MIN_SIDE = 80;

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

function mark(root) {
  const seen = new Set(root.querySelectorAll('[data-reveal]'));

  const consider = (el, kind) => {
    if (seen.has(el) || el.hasAttribute('data-reveal') || el.closest('[data-no-reveal]')) return;
    // Skip anything already inside a revealing element — one animation per box.
    for (const other of seen) if (other !== el && other.contains(el)) return;
    const r = el.getBoundingClientRect();
    if (r.height < MIN_SIDE || r.width < MIN_SIDE) return;
    el.setAttribute('data-reveal', kind);
    // A card you can click lifts on hover, as the prototype's cards do.
    if ((el.tagName === 'A' || el.tagName === 'BUTTON') && !el.hasAttribute('data-lift')) {
      el.setAttribute('data-lift', '');
    }
    seen.add(el);
  };

  for (const sel of CARD_SELECTORS) for (const el of root.querySelectorAll(sel)) consider(el, 'up');
  for (const sel of MEDIA_SELECTORS) for (const el of root.querySelectorAll(sel)) consider(el, 'fade');
  return [...seen].filter((el) => !el.classList.contains('is-revealed'));
}

/**
 * Fades and slides boxes and images in as they enter the viewport, across every
 * page. Runs again on navigation and whenever Sanity data swaps content in.
 * Does nothing when the visitor asks for reduced motion.
 */
export function useRevealOnScroll() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const root = document.querySelector('main');
    if (!root || prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          io.unobserve(el);
          // Stagger a row of cards so they arrive one after another, the
          // prototype's 60ms step cycling every sixth card.
          const siblings = [...(el.parentElement?.children || [])].filter((n) => n.hasAttribute('data-reveal'));
          const index = Math.max(siblings.indexOf(el), 0) % 6;
          el.style.setProperty('--reveal-delay', `${index * 60}ms`);
          el.classList.add('is-revealed');
          // Drop the hooks once the animation has played, so nothing keeps a
          // compositor layer or re-animates on the next pass.
          const clean = () => {
            el.classList.remove('is-revealed');
            el.removeAttribute('data-reveal');
            el.style.removeProperty('--reveal-delay');
          };
          el.addEventListener('transitionend', clean, { once: true });
          setTimeout(clean, 1800);
        }
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.12 },
    );

    let frame = 0;
    const scan = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        for (const el of mark(root)) io.observe(el);
      });
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);
}
