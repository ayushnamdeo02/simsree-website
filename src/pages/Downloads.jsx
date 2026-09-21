import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { useDownloadsData } from '../lib/useDownloadsData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const CATEGORIES = ['Affidavits', 'Documents', 'Fee', 'Notifications'];

const fallbackPage = {
  heroEyebrow: 'All Forms in One Place',
  heroTitle: 'Downloads & Affidavits.',
  heroDescription:
    'Get every mandatory PDF admitted students need — anti-ragging affidavit, gap certificate, documents required, fee structure · all current year.',
  heroCtaLabel: 'Back to admissions',
  heroCtaUrl: '/admissions',

  filterEyebrow: 'Filter',
  filterTitle: 'Filter by category',
  filterTitleHighlight: 'category',
  filterSubtitle: 'Tap any chip to filter.',
  filterLabel: 'Filter by:',

  filesEyebrow: 'All Files',
  filesTitle: 'Download the current-year PDFs',
  filesTitleHighlight: 'Download the current-year',
  filesSubtitle: 'Government of Maharashtra signs off most of these · updated annually.',

  ctaEyebrow: 'Need More Help?',
  ctaTitle: 'Talk to admissions.',
  ctaSubtitle: 'All forms in one place. Still stuck? Call us.',
  ctaButtons: [
    { label: 'Call admissions · {{admissionsPhone}}', url: 'tel:+912261510709', primary: true },
    { label: 'Email admissions', url: 'mailto:admissions@simsree.org', primary: false },
  ],
};

const fallbackFiles = [
  {
    title: 'Anti-Ragging Affidavit',
    description:
      'Every admitted student signs this UGC-mandated affidavit — zero tolerance, submit at induction.',
    category: 'Affidavits',
    ctaLabel: 'Download the affidavit',
    order: 1,
  },
  {
    title: 'Gap Certificate Affidavit',
    description: 'For any educational gap year between your qualifying degrees.',
    category: 'Affidavits',
    order: 2,
  },
  {
    title: 'Documents Required · MMS',
    description:
      'The complete MMS document list — academic, personal, and reservation · updated annually',
    category: 'Documents',
    order: 3,
  },
  {
    title: 'Documents Required · M.Sc. Finance',
    description: 'The complete M.Sc. Finance document list.',
    category: 'Documents',
    order: 4,
  },
  {
    title: 'Fee Payment Details',
    description:
      'How to pay — beneficiary account · IFSC · UPI · receipt format · updated each admission cycle.',
    category: 'Fee',
    order: 5,
  },
  {
    title: 'MMM & MFM Notification AY 2026-27 · Round 4',
    description:
      'Apply before it closes — latest notification · published May 2026 · closes 30 Jun 2026.',
    category: 'Notifications',
    order: 6,
  },
];

function TitleWithHighlight({ text = '', highlight, className }) {
  const idx = highlight ? text.indexOf(highlight) : -1;
  if (idx === -1) return <h2 className={className}>{text}</h2>;
  return (
    <h2 className={className}>
      {text.slice(0, idx)}
      <span className="text-teal-500">{highlight}</span>
      {text.slice(idx + highlight.length)}
    </h2>
  );
}

export default function Downloads() {
  const facts = useKeyFacts();
  const { data } = useDownloadsData();
  const dp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const files = fillFactsDeep(data?.files?.length ? data.files : fallbackFiles, facts);
  const ctaButtons = fillFactsDeep(dp.ctaButtons?.length ? dp.ctaButtons : fallbackPage.ctaButtons, facts);

  const [category, setCategory] = useState('All');

  const heroImageUrl = dp.heroImage ? urlFor(dp.heroImage).width(1600).url() : null;

  // Only offer chips for categories that actually have files behind them.
  const chips = useMemo(() => {
    const present = new Set(files.map((f) => f.category).filter(Boolean));
    return ['All', ...CATEGORIES.filter((c) => present.has(c))];
  }, [files]);

  const visible = useMemo(
    () => (category === 'All' ? files : files.filter((f) => f.category === category)),
    [files, category]
  );

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="min-h-[420px] md:h-[500px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: heroImageUrl
            ? `url('${heroImageUrl}')`
            : 'linear-gradient(180deg, #8a8f9e, #cfd3da)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-navy-950/10" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[55px] pt-32 pb-12 md:pb-[56px] md:h-full flex flex-col justify-end text-white">
          <div className="text-xs text-white/70 mb-5 flex items-center">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/admissions" className="hover:text-white">Admissions</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white">Downloads</span>
          </div>
          <span className="inline-block w-fit bg-navy-900 text-white text-[11px] font-semibold tracking-widest uppercase px-4 py-2.5 rounded-full mb-5">
            {dp.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">{dp.heroTitle}</h1>
          <p className="max-w-lg text-sm text-white/85 leading-relaxed mb-7">
            {dp.heroDescription}
          </p>
          <a
            href={dp.heroCtaUrl}
            className="bg-white hover:bg-gray-100 transition-colors text-navy-900 text-sm font-medium px-5 py-3 rounded-md w-fit"
          >
            {dp.heroCtaLabel}
          </a>
        </div>
      </section>

      {/* Filter */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {dp.filterEyebrow}
          </span>
          <TitleWithHighlight
            text={dp.filterTitle}
            highlight={dp.filterTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3"
          />
          <p className="text-sm text-ink-600 mb-10">{dp.filterSubtitle}</p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-ink-600 mr-1">{dp.filterLabel}</span>
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={c === category}
                className={`text-xs px-4 py-2.5 rounded-md border transition-colors ${
                  c === category
                    ? 'bg-navy-900 border-navy-900 text-white'
                    : 'border-navy-100 text-navy-900 hover:bg-navy-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Files */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {dp.filesEyebrow}
          </span>
          <TitleWithHighlight
            text={dp.filesTitle}
            highlight={dp.filesTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3"
          />
          <p className="text-sm text-ink-600 mb-10">{dp.filesSubtitle}</p>

          {visible.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {visible.map((f) => {
                const href = f.fileUrl || f.externalUrl;
                return (
                  <div
                    key={f._id || f.title}
                    className="border border-navy-100 border-l-2 border-l-sky-600 rounded-sm px-6 py-6 flex flex-col"
                  >
                    <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">
                      {f.title}
                    </h3>
                    <p className="text-sm text-ink-600 leading-relaxed mb-6">{f.description}</p>
                    <a
                      href={href || '#'}
                      // Uploaded PDFs download rather than opening in a tab.
                      {...(f.fileUrl ? { download: '' } : {})}
                      {...(f.externalUrl ? { target: '_blank', rel: 'noreferrer' } : {})}
                      aria-disabled={href ? undefined : 'true'}
                      className={`text-sm font-medium px-4 py-2.5 rounded-md inline-flex items-center gap-2 w-fit mt-auto transition-colors ${
                        href
                          ? 'bg-navy-900 hover:bg-navy-800 text-white'
                          : 'bg-navy-100 text-ink-400 cursor-not-allowed'
                      }`}
                    >
                      {f.ctaLabel || 'Download'} <Download size={14} />
                    </a>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-ink-600 py-8">No files in this category yet.</p>
          )}
        </div>
      </section>

      {/* Help CTA */}
      <section className="bg-navy-900 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-sky-500">
            {dp.ctaEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-5 mb-4">
            {dp.ctaTitle}
          </h2>
          <p className="text-sm text-white/75 mb-8">{dp.ctaSubtitle}</p>
          <div className="flex flex-wrap gap-3">
            {ctaButtons.map((b) => (
              <a
                key={b.label}
                href={b.url || '#'}
                className={`text-sm font-medium px-4 py-2.5 rounded-md transition-colors ${
                  b.primary
                    ? 'bg-sky-600 hover:bg-teal-600 text-white'
                    : 'bg-white hover:bg-gray-100 text-navy-900'
                }`}
              >
                {b.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
