import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * A new page starts at the top, the way a normal site load does, while back and
 * forward return to where you were and #anchor links still land on their section.
 *
 * The browser's own restoration guesses badly here — pages grow taller as Sanity
 * content arrives, so it lands at the wrong offset. Instead each history entry's
 * position is recorded as you leave it and re-applied as the page fills out.
 */
export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map());

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  }, []);

  useLayoutEffect(() => {
    if (navigationType === 'POP') {
      const saved = positions.current.get(key) ?? 0;
      // The page may still be growing, so aim again over the next few frames.
      const timers = [0, 60, 200, 450].map((delay) => setTimeout(() => window.scrollTo(0, saved), delay));
      return () => {
        timers.forEach(clearTimeout);
        positions.current.set(key, window.scrollY);
      };
    }

    let timers = [];
    if (hash) {
      // The section may not be rendered yet (lazy page, Sanity content still
      // arriving and shifting the layout), so aim at it again as the page settles.
      window.scrollTo(0, 0);
      const jump = () => document.querySelector(hash)?.scrollIntoView({ block: 'start' });
      timers = [0, 60, 200, 450, 900].map((delay) => setTimeout(jump, delay));
    } else {
      window.scrollTo(0, 0);
    }

    // Record where this entry was left, for when the visitor comes back to it.
    return () => {
      timers.forEach(clearTimeout);
      positions.current.set(key, window.scrollY);
    };
  }, [pathname, hash, key, navigationType]);

  return null;
}
