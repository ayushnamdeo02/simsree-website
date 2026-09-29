import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * A new page starts at the top, the way a normal site load does, while back and
 * forward return to where you were and #anchor links still land on their section.
 *
 * The browser's own restoration guesses badly here: pages grow taller as Sanity
 * content arrives, so it lands at the wrong offset. We keep the position per
 * history entry instead, and re-apply it as the page fills out.
 */
export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map());
  const currentKey = useRef(key);

  // Remember where each history entry was left.
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    const onScroll = () => positions.current.set(currentKey.current, window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useLayoutEffect(() => {
    currentKey.current = key;

    if (navigationType === 'POP') {
      const saved = positions.current.get(key) ?? 0;
      // The page may still be growing, so aim again over the next few frames.
      const attempts = [0, 60, 200, 450];
      const timers = attempts.map((delay) => setTimeout(() => window.scrollTo(0, saved), delay));
      return () => timers.forEach(clearTimeout);
    }

    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ block: 'start' });
        return undefined;
      }
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash, key, navigationType]);

  return null;
}
