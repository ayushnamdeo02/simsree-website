import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useSiteSettings } from '../lib/useSiteSettings';

// Admissions disclaimer, shown once per visit on whichever page a visitor lands
// on. The copy and the on/off switch live in Site Settings in the Studio.
const FALLBACK = {
  disclaimerTitle: 'Disclaimer',
  disclaimerText:
    'We would like to warn applicants about unscrupulous agencies that may put out misleading social media advertisements promising seats for various courses or programmes at SIMSREE. We have no agents, no middlemen, no management quota, no reserved seats or payment seats of any kind. Admissions for MMS are done through the State CET Cell and the Government of Maharashtra ONLY ON MERIT BASIS.',
  disclaimerHighlight: 'ONLY ON MERIT BASIS.',
  disclaimerButtonLabel: 'I understand',
};
const SEEN_KEY = 'simsree-disclaimer-seen';
// If Sanity is slow or unreachable, show the built-in copy after this long.
const SETTINGS_TIMEOUT_MS = 2500;

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function Highlighted({ text, highlight }) {
  const idx = highlight ? text.indexOf(highlight) : -1;
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <strong className="font-semibold text-navy-900">{highlight}</strong>
      {text.slice(idx + highlight.length)}
    </>
  );
}

export default function DisclaimerPopup() {
  const settings = useSiteSettings();
  const [timedOut, setTimedOut] = useState(false);
  const [open, setOpen] = useState(() => !alreadySeen());
  const buttonRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), SETTINGS_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, []);

  // Wait for Site Settings (or the timeout) so a popup switched off in the
  // Studio never flashes, and the visitor sees the CMS copy straight away.
  const ready = settings !== null || timedOut;
  const d = { ...FALLBACK };
  for (const k of Object.keys(FALLBACK)) if (settings?.[k]) d[k] = settings[k];
  const visible = open && ready && settings?.disclaimerEnabled !== false;

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      // Private mode or blocked storage: it simply shows again next page load.
    }
  };

  useEffect(() => {
    if (!visible) return;
    buttonRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && close();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-5 py-6"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-title"
        className="relative w-full max-w-[640px] max-h-full overflow-y-auto rounded-2xl bg-white p-6 md:p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close disclaimer"
          className="absolute top-4 right-4 p-1 text-ink-600 hover:text-navy-900 transition-colors"
        >
          <X size={22} />
        </button>
        <span className="inline-block bg-navy-50 text-navy-900 text-sm leading-[150%] px-4 py-1.5 rounded-full uppercase">
          Important notice
        </span>
        <h2 id="disclaimer-title" className="mt-4 font-display font-medium text-[28px] md:text-[36px] leading-[130%] tracking-[-0.01em] text-navy-900">
          {d.disclaimerTitle}
        </h2>
        <p className="mt-4 text-base md:text-lg leading-[150%] text-black whitespace-pre-line">
          <Highlighted text={d.disclaimerText} highlight={d.disclaimerHighlight} />
        </p>
        <button
          ref={buttonRef}
          type="button"
          onClick={close}
          className="mt-8 inline-flex items-center h-11 px-6 rounded-md bg-navy-900 text-white text-base leading-[150%] font-medium hover:bg-navy-800 transition-colors"
        >
          {d.disclaimerButtonLabel}
        </button>
      </div>
    </div>
  );
}
