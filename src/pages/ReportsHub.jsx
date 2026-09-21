import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText } from 'lucide-react';
import StatCard from '../components/StatCard';
import BreakdownPanel from '../components/BreakdownPanel';
import { useReportsHubData } from '../lib/useReportsHubData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackPage = {
  heroEyebrow: 'All Reports in One Place',
  heroTitle: 'Placement proof you can download.',
  heroTitleBreakAfter: 'proof',
  heroDescription:
    'Download all three reports — final, summer, executive — current year plus a multi-year archive.',
  stats: [
    { label: 'Placement', value: '100%', dark: true },
    { label: 'Avg CTC', value: '{{avgCtc}}', dark: false },
    { label: 'Highest CTC', value: '{{highestCtc}}', dark: true },
    { label: 'Recruiters', value: '120+', dark: false },
  ],
};

const fallbackTabs = [
  {
    pillLabel: 'Final 2024-25',
    tabLabel: 'Download the final report · 2024-25',
    eyebrow: 'MMS · M.Sc. Finance',
    title: '100% placed — final 2024-25.',
    subtitle: '{{placementRate}} placement · {{avgCtc}} avg · 120 recruiters.',
    fileTitle: 'SIMSREE Final Placement Report · 2024-25',
    fileMeta: '42 pages · 4.2 MB · Crisil-audited · PDF',
    fileCtaLabel: 'Download the full report (PDF)',
    chartPanel: {
      title: 'By sector · MMS 2023-25',
      rows: [
        { label: 'BFSI', value: 42 },
        { label: 'FMCG', value: 18 },
        { label: 'Consulting', value: 14 },
        { label: 'IT/Tech', value: 12 },
        { label: 'Other', value: 14 },
      ],
    },
    logoPanel: {
      title: 'Top recruiters',
      logos: [
        { name: 'Deloitte' },
        { name: 'HSBC' },
        { name: 'Citibank' },
        { name: 'NVIDIA' },
        { name: 'Microsoft' },
        { name: 'Oracle' },
      ],
    },
    archiveTitle: 'Archive · Past 4 Years',
    archive: [
      { title: 'MMS 2023-24 · Avg ₹14.2L · 98%', meta: '31 pages · 3.1 MB' },
      { title: 'MMS 2022-23 · Avg ₹13.1L · 96%', meta: '28 pages · 2.8 MB' },
      { title: 'MMS 2021-22 · Avg ₹11.8L · 94%', meta: '24 pages · 2.4 MB' },
    ],
    order: 1,
  },
  {
    pillLabel: 'Summer 2024',
    tabLabel: 'Download the summer report · 2024',
    eyebrow: 'Year-1 Internships',
    title: '100% placed — summer 2024.',
    titleHighlight: 'summer 2024.',
    subtitle: '100% summer · ₹85K avg stipend · 62% PPO conversion.',
    fileTitle: 'SIMSREE Summer Internship Report · 2024',
    fileMeta: '28 pages · 2.6 MB · PPO breakdown · PDF',
    fileCtaLabel: 'Download the summer report (PDF)',
    chartPanel: {
      title: 'Stipend distribution',
      rows: [
        { label: '₹1L+', value: 14 },
        { label: '₹75K-1L', value: 32 },
        { label: '₹50-75K', value: 38 },
        { label: '<₹50K', value: 16 },
      ],
    },
    statPanel: {
      title: 'PPO conversion',
      description:
        '62% of summer interns received pre-placement offers — leading indicator for the upcoming final cycle.',
      value: '62%',
    },
    order: 2,
  },
  {
    pillLabel: 'Executive',
    tabLabel: 'Download the executive report · MFM/MMM',
    eyebrow: 'MFM · MMM Outcomes',
    title: 'Executive placements.',
    titleHighlight: 'placements.',
    subtitle: 'Reported in aggregate — most executive students stay with their employer.',
    fileTitle: 'SIMSREE Executive Placements · MFM & MMM',
    fileMeta: '18 pages · 1.8 MB · aggregate outcomes · PDF',
    fileCtaLabel: 'Download',
    metricCards: [
      { value: '+38%', label: 'CTC change · before vs after.' },
      { value: '62%', label: 'Switched role or company.' },
      { value: '28%', label: 'Promoted within.' },
      { value: '95%', label: 'Programme completion.' },
    ],
    order: 3,
  },
];

function TitleWithHighlight({ text, highlight, className }) {
  const idx = highlight ? (text || '').indexOf(highlight) : -1;
  if (idx === -1) return <h2 className={className}>{text}</h2>;
  return (
    <h2 className={className}>
      {text.slice(0, idx)}
      <span className="text-teal-500">{highlight}</span>
      {text.slice(idx + highlight.length)}
    </h2>
  );
}

export default function ReportsHub() {
  const facts = useKeyFacts();
  const { data } = useReportsHubData();
  const rp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const tabs = fillFactsDeep(data?.tabs?.length ? data.tabs : fallbackTabs, facts);
  const [active, setActive] = useState(0);
  const tab = tabs[Math.min(active, tabs.length - 1)] || {};

  const heroImageUrl = rp.heroImage ? urlFor(rp.heroImage).width(1600).url() : null;

  // Hero title takes a forced line break after a configurable phrase.
  const title = rp.heroTitle || '';
  const brk = rp.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;
  const line1 = bIdx === -1 ? title : title.slice(0, bIdx + brk.length);
  const line2 = bIdx === -1 ? '' : title.slice(bIdx + brk.length).trim();

  const hasChart = tab.chartPanel?.rows?.length;
  const hasLogos = tab.logoPanel?.logos?.length;
  const hasStat = tab.statPanel?.value;
  const hasMetrics = tab.metricCards?.length;
  const hasArchive = tab.archive?.length;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="min-h-[520px] md:h-[620px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: heroImageUrl
            ? `url('${heroImageUrl}')`
            : 'linear-gradient(180deg, #8a8f9e, #cfd3da)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-navy-950/10" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[55px] pt-32 pb-12 md:pb-[60px] md:h-full flex flex-col justify-end text-white">
          <div className="text-xs text-white/70 mb-5 flex items-center">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/placements" className="hover:text-white">Placement</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white">Placements Reports Hub</span>
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90 mb-4">
            {rp.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-[56px] md:leading-[1.12] font-semibold mb-5">
            {line1}
            {line2 && (
              <>
                <br />
                {line2}
              </>
            )}
          </h1>
          <p className="max-w-lg text-sm text-white/85 leading-relaxed mb-7">{rp.heroDescription}</p>

          {/* Hero pills select the same tab as the tab row below */}
          <div className="flex flex-wrap gap-3">
            {tabs.map((t, i) => (
              <button
                key={t._id || t.pillLabel}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`font-medium px-5 py-3 rounded-md transition-colors ${
                  i === active
                    ? 'bg-sky-600 hover:bg-teal-600 text-white'
                    : 'bg-white hover:bg-gray-100 text-navy-900'
                }`}
              >
                {t.pillLabel}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1408px] mx-auto px-6 lg:px-16 py-10 lg:py-16">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {(rp.stats || []).map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Tab row */}
      <section className="pt-8 lg:pt-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div
            role="tablist"
            aria-label="Placement reports"
            className="flex flex-wrap justify-center gap-6 lg:gap-10"
          >
            {tabs.map((t, i) => (
              <button
                key={t._id || t.tabLabel}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`text-sm pb-2 border-b-2 transition-colors ${
                  i === active
                    ? 'border-sky-600 text-navy-900 font-semibold'
                    : 'border-transparent text-ink-400 hover:text-ink-600'
                }`}
              >
                {t.tabLabel}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active tab body */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {tab.eyebrow}
          </span>
          <TitleWithHighlight
            text={tab.title}
            highlight={tab.titleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4"
          />
          <p className="text-sm text-ink-600 mb-8">{tab.subtitle}</p>

          {/* Report file banner */}
          {tab.fileTitle && (
            <div className="bg-navy-900 text-white rounded-lg px-6 py-5 flex flex-wrap items-center gap-4 mb-8">
              <FileText size={28} className="shrink-0 text-white/80" />
              <div className="min-w-0 flex-1">
                <p className="font-medium">{tab.fileTitle}</p>
                <p className="text-xs text-white/70 mt-1">{tab.fileMeta}</p>
              </div>
              <a
                href={tab.fileUrl || '#'}
                className="bg-white hover:bg-gray-100 transition-colors text-navy-900 text-sm font-medium px-4 py-2.5 rounded-md flex items-center gap-2 shrink-0"
              >
                {tab.fileCtaLabel || 'Download'} <Download size={14} />
              </a>
            </div>
          )}

          {/* Panels — chart beside either a logo wall or a hero number */}
          {(hasChart || hasLogos || hasStat) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {hasChart && (
                <BreakdownPanel accent title={tab.chartPanel.title} rows={tab.chartPanel.rows} />
              )}

              {hasLogos && (
                <div className="border border-navy-100 border-l-2 border-l-sky-600 rounded-lg p-8">
                  <h3 className="font-display text-2xl font-semibold text-navy-900 mb-8">
                    {tab.logoPanel.title}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 items-center">
                    {tab.logoPanel.logos.map((l) => {
                      const logoUrl = l.logo ? urlFor(l.logo).width(240).url() : null;
                      return (
                        <div key={l.name} className="h-10 flex items-center justify-center">
                          {logoUrl ? (
                            <img
                              src={logoUrl}
                              alt={l.name}
                              className="max-h-8 max-w-full object-contain"
                            />
                          ) : (
                            <span className="text-xs text-ink-600 text-center">{l.name}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {hasStat && (
                <div className="border border-navy-100 border-l-2 border-l-sky-600 rounded-lg p-8">
                  <h3 className="font-display text-2xl font-semibold text-navy-900 mb-6">
                    {tab.statPanel.title}
                  </h3>
                  <p className="text-sm text-ink-600 leading-relaxed mb-8">
                    {tab.statPanel.description}
                  </p>
                  <p className="font-display text-5xl font-semibold text-navy-900">
                    {tab.statPanel.value}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Metric cards */}
          {hasMetrics && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {tab.metricCards.map((m) => (
                <div
                  key={m.label}
                  className="border border-navy-100 border-l-2 border-l-sky-600 rounded-sm px-6 py-5"
                >
                  <p className="font-display text-2xl font-semibold text-navy-900 mb-2">{m.value}</p>
                  <p className="text-sm text-ink-600">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Archive */}
          {hasArchive && (
            <div className="mt-14">
              <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                {tab.archiveTitle}
              </span>
              <div className="flex flex-col gap-4 mt-6">
                {tab.archive.map((a) => (
                  <div
                    key={a.title}
                    className="border border-navy-100 rounded-lg px-6 py-4 flex flex-wrap items-center gap-4"
                  >
                    <FileText size={22} className="shrink-0 text-ink-400" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-navy-900">{a.title}</p>
                      <p className="text-xs text-ink-400 mt-1">{a.meta}</p>
                    </div>
                    <a
                      href={a.fileUrl || '#'}
                      className="border border-navy-100 hover:bg-navy-50 transition-colors text-navy-900 text-sm font-medium px-4 py-2 rounded-md flex items-center gap-2 shrink-0"
                    >
                      Download <Download size={14} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
