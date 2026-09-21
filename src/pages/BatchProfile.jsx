import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import BreakdownPanel from '../components/BreakdownPanel';
import { useBatchProfileData } from '../lib/useBatchProfileData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackPage = {
  heroEyebrow: 'For Recruiters · Updated Sept 2025',
  heroTitle: 'MMS Batch 2024-26 — hiring data at a glance.',
  heroTitleBreakAfter: '—',
  heroDescription:
    '120 students · curated across disciplines, geographies and work-experience bands. The numbers your hiring team needs before you visit campus.',
  heroButtons: [
    { label: 'Download the batch profile (PDF · 4.2 MB)', url: '#', primary: true },
    { label: 'Schedule Campus Visit', url: '/placements/contact', primary: false },
  ],
  selectorLabel: 'Showing data for cohort',
  selectorPlaceholder: 'Select one...',
  ctaEyebrow: 'For Recruiters',
  ctaTitle: 'Ready to engage with this batch?',
  ctaSubtitle:
    'Three things you can do today — Recruiter Brochure, Campus Slot, Direct Email.',
  ctaButtons: [
    { label: 'Download the recruiter brochure', url: '#', primary: true },
    { label: 'Request Campus Slot', url: '/placements/contact', primary: false },
    { label: 'Email Placement Cell', url: 'mailto:placements@simsree.org', primary: false },
  ],
};

const fallbackCohorts = [
  {
    name: 'MMS Batch 2024-26',
    isCurrent: true,
    headline: 'A batch built for breadth.',
    headlineHighlight: 'breadth.',
    headlineSubtitle:
      '120 students · 22 states represented · 18 undergraduate disciplines · average 1.9 years of work experience.',
    stats: [
      { label: 'Batch size', value: '120', dark: true },
      { label: 'Women', value: '42%', dark: false },
      { label: 'With work-ex', value: '68%', dark: false },
      { label: 'States', value: '22', dark: true },
    ],
    panels: [
      {
        title: 'Academic background',
        rows: [
          { label: 'Engineering', value: 16 },
          { label: 'Commerce', value: 42 },
          { label: 'Economics', value: 12 },
          { label: 'Arts & Humanities', value: 3 },
          { label: 'Science', value: 5 },
          { label: 'Other (Law, Architecture, etc.)', value: 2 },
        ],
      },
      {
        title: 'Prior work experience',
        dark: true,
        rows: [
          { label: 'Fresher', value: 43 },
          { label: '0-12 months', value: 12 },
          { label: '1-2 years', value: 24 },
          { label: '2-3 years', value: 3 },
          { label: '3+ years', value: 7 },
        ],
      },
      {
        title: 'Industry exposure',
        rows: [
          { label: 'IT & Tech', value: 16 },
          { label: 'BFSI', value: 42 },
          { label: 'Consulting', value: 12 },
          { label: 'Manufacturing', value: 3 },
          { label: 'FMCG', value: 5 },
        ],
      },
      {
        title: 'Geographic mix',
        dark: true,
        rows: [
          { label: 'Maharashtra', value: 16 },
          { label: 'Gujarat', value: 42 },
          { label: 'Karnataka', value: 12 },
          { label: 'Delhi NCR', value: 3 },
          { label: 'Other 18 states', value: 5 },
        ],
      },
    ],
    profileTitle: 'Average profile',
    profileRows: [
      { label: 'CET percentile', value: '99.92' },
      { label: 'UG GPA', value: '8.4 / 10' },
      { label: 'Work-ex (avg)', value: '1.4 years' },
      { label: 'Age at entry', value: '23.1 years' },
    ],
    summaryCards: [
      { label: 'Students', value: '120', dark: true },
      { label: 'Women', value: '38%', dark: false },
      { label: 'Work-ex', value: '62%', dark: true },
      { label: 'States', value: '14', dark: false },
    ],
    order: 1,
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

export default function BatchProfile() {
  const facts = useKeyFacts();
  const { data } = useBatchProfileData();
  const bp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const cohorts = fillFactsDeep(
    data?.cohorts?.length ? data.cohorts : fallbackCohorts,
    facts
  );
  const heroButtons = fillFactsDeep(
    bp.heroButtons?.length ? bp.heroButtons : fallbackPage.heroButtons,
    facts
  );
  const ctaButtons = fillFactsDeep(
    bp.ctaButtons?.length ? bp.ctaButtons : fallbackPage.ctaButtons,
    facts
  );

  // Default to the cohort flagged current, else the first.
  const defaultIndex = Math.max(0, cohorts.findIndex((c) => c.isCurrent));
  const [index, setIndex] = useState(defaultIndex);
  const cohort = cohorts[Math.min(index, cohorts.length - 1)] || {};

  const heroImageUrl = bp.heroImage ? urlFor(bp.heroImage).width(1600).url() : null;

  const chartPanels = cohort.panels || [];
  // First two panels sit side by side; the rest run in a three-up row with the
  // average-profile panel, matching the design's rhythm.
  const topPanels = chartPanels.slice(0, 2);
  const restPanels = chartPanels.slice(2);

  const title = bp.heroTitle || '';
  const brk = bp.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;
  const line1 = bIdx === -1 ? title : title.slice(0, bIdx + brk.length);
  const line2 = bIdx === -1 ? '' : title.slice(bIdx + brk.length).trim();

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
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[55px] pt-32 pb-10 md:pb-[52px] md:h-full flex flex-col justify-end text-white">
          <div className="text-xs text-white/70 mb-4 flex items-center">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/students" className="hover:text-white">Student&apos;s Corner</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white">Batch Profile</span>
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90 mb-3">
            {bp.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-[46px] md:leading-[1.16] font-semibold mb-4 max-w-3xl">
            {line1}
            {line2 && (
              <>
                <br />
                {line2}
              </>
            )}
          </h1>
          <p className="max-w-lg text-sm text-white/85 leading-relaxed mb-7">
            {bp.heroDescription}
          </p>
          <div className="flex flex-wrap gap-3">
            {heroButtons.map((b, i) => {
              // The first hero button downloads the uploaded PDF when one exists.
              const href = i === 0 && bp.pdfUrl ? bp.pdfUrl : b.url || '#';
              return (
                <a
                  key={b.label}
                  href={href}
                  {...(i === 0 && bp.pdfUrl ? { download: '' } : {})}
                  className={`text-sm font-medium px-5 py-3 rounded-md transition-colors flex items-center gap-2 w-fit ${
                    b.primary
                      ? 'bg-sky-600 hover:bg-teal-600 text-white'
                      : 'bg-white hover:bg-gray-100 text-navy-900'
                  }`}
                >
                  {b.label}
                  {b.primary && <ArrowUpRight size={15} />}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cohort headline + stat cards */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                The Cohort
              </span>
              <TitleWithHighlight
                text={cohort.headline}
                highlight={cohort.headlineHighlight}
                className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4"
              />
              <p className="text-sm text-ink-600 leading-relaxed max-w-md">
                {cohort.headlineSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {(cohort.stats || []).map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cohort selector */}
      {cohorts.length > 0 && (
        <section className="pb-8">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
            <label
              htmlFor="cohort"
              className="block text-[10px] font-semibold tracking-widest uppercase text-navy-900 mb-3"
            >
              {bp.selectorLabel}
            </label>
            <select
              id="cohort"
              value={index}
              onChange={(e) => setIndex(Number(e.target.value))}
              className="w-full max-w-sm border border-navy-100 rounded-md px-4 py-3 text-sm text-navy-900 focus:outline-none focus:border-sky-600 transition-colors"
            >
              {cohorts.map((c, i) => (
                <option key={c._id || c.name} value={i}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </section>
      )}

      {/* Data panels */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          {topPanels.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
              {topPanels.map((p) => (
                <BreakdownPanel
                  key={p.title}
                  title={p.title}
                  rows={p.rows || []}
                  dark={p.dark}
                />
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {restPanels.map((p) => (
              <BreakdownPanel
                key={p.title}
                title={p.title}
                rows={p.rows || []}
                dark={p.dark}
              />
            ))}

            {/* Average profile — label/value rows, not a chart */}
            {cohort.profileRows?.length > 0 && (
              <div className="border border-navy-100 rounded-lg p-8">
                <h3 className="font-display text-2xl font-semibold text-navy-900 mb-6 pb-4 border-b border-navy-100">
                  {cohort.profileTitle}
                </h3>
                <dl className="flex flex-col gap-4 m-0">
                  {cohort.profileRows.map((r) => (
                    <div key={r.label} className="flex items-center justify-between gap-4">
                      <dt className="text-[10px] uppercase tracking-wide text-ink-600">
                        {r.label}
                      </dt>
                      <dd className="text-xs font-medium text-navy-900 m-0 tabular-nums">
                        {r.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Summary cards */}
      {cohort.summaryCards?.length > 0 && (
        <section className="pb-16 lg:pb-24">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {cohort.summaryCards.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recruiter CTA */}
      <section className="bg-navy-900 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-white/70">
            {bp.ctaEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-5 mb-4">
            {bp.ctaTitle}
          </h2>
          <p className="text-sm text-white/75 mb-8 max-w-xl mx-auto">{bp.ctaSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {ctaButtons.map((b) => (
              <a
                key={b.label}
                href={b.url || '#'}
                className={`text-sm font-medium px-4 py-2.5 rounded-md transition-colors flex items-center gap-2 ${
                  b.primary
                    ? 'bg-sky-600 hover:bg-teal-600 text-white'
                    : 'bg-white hover:bg-gray-100 text-navy-900'
                }`}
              >
                {b.label}
                {b.primary && <ArrowUpRight size={14} />}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
