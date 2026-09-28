import { useEffect, useRef } from 'react';

/**
 * Drifts a hero photo as the page scrolls, the prototype's 0.18 speed. The
 * layer sits slightly oversized so the drift never uncovers an edge, and the
 * offset is capped for the same reason. Off for reduced motion.
 */
export function useParallax(speed = 0.18, max = 28) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = Math.min(window.scrollY * speed, max);
      el.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    el.style.transform = 'scale(1.08)';
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [speed, max]);

  return ref;
}
