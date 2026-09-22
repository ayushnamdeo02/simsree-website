import { useSyncExternalStore } from 'react';
import { figmaWrap } from './text';

// The keep-together phrases come from the 1440 frames; on phones the Figma
// mobile frames wrap differently and a joined phrase can be wider than the
// screen. So they only apply from Tailwind's `md` breakpoint up.
const query = '(min-width: 768px)';
const subscribe = (cb) => {
  const mq = window.matchMedia(query);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const isWide = () => window.matchMedia(query).matches;

export function useFigmaWrap() {
  const wide = useSyncExternalStore(subscribe, isWide, () => true);
  return wide ? figmaWrap : (t) => t;
}
