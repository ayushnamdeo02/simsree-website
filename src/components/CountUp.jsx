import { useEffect, useRef, useState } from 'react';

// Splits "₹38.4 LPA" into "₹", 38.4 and " LPA" so only the number animates.
const NUMBER = /^(.*?)(\d[\d,]*(?:\.\d+)?)(.*)$/s;

const isYear = (digits) => /^\d{4}$/.test(digits) && +digits >= 1900 && +digits <= 2100;

function parse(value) {
  if (typeof value !== 'string' && typeof value !== 'number') return null;
  const m = NUMBER.exec(String(value));
  if (!m) return null;
  const [, prefix, digits, suffix] = m;
  if (isYear(digits)) return null; // a year counting up from zero reads as a bug
  const decimals = digits.includes('.') ? digits.split('.')[1].length : 0;
  // "5,00,000" is grouped the Indian way, "38,400" the western way.
  const groups = digits.split(',');
  const locale = groups.length > 2 && groups[1].length === 2 ? 'en-IN' : 'en-US';
  return {
    prefix,
    suffix,
    decimals,
    locale,
    grouped: digits.includes(','),
    target: Number(digits.replace(/,/g, '')),
  };
}

const easeOut = (t) => 1 - (1 - t) ** 3;

/**
 * Counts a stat up to its value the first time it scrolls into view. Anything
 * that isn't a number (or is a year) is rendered unchanged, as is the final
 * value for visitors who prefer reduced motion.
 */
export default function CountUp({ value, duration = 1200, className }) {
  const parsed = parse(value);
  const ref = useRef(null);
  const [shown, setShown] = useState(() => (parsed ? 0 : null));

  useEffect(() => {
    const el = ref.current;
    if (!parsed || !el) return undefined;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      setShown(parsed.target);
      return undefined;
    }

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        setShown(parsed.target * easeOut(t));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        run();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // The value is the only input that should restart the count.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  if (!parsed) return <span className={className}>{value}</span>;

  // Whole numbers tick up as whole numbers, as they do in the prototype.
  const rounded = parsed.decimals === 0 ? Math.floor(shown) : Number(shown.toFixed(parsed.decimals));
  const text = parsed.grouped
    ? rounded.toLocaleString(parsed.locale, {
        minimumFractionDigits: parsed.decimals,
        maximumFractionDigits: parsed.decimals,
      })
    : rounded.toFixed(parsed.decimals);

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {text}
      {parsed.suffix}
    </span>
  );
}
