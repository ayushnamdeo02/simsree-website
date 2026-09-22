import { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { StatGrid } from '../components/StatCard';
import PageHero from '../components/PageHero';
import { Section, SectionTitle, Tagline, AccentCard } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
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

// Figma logo files for recruiters without a logo set in the Studio.
const LOGO_FALLBACK = {
  Deloitte: 'deloitte',
  HSBC: 'hsbc',
  Citibank: 'citibank',
  NVIDIA: 'nvidia',
  Microsoft: 'microsoft',
  Oracle: 'oracle',
};

function PdfIcon() {
  return <FileText size={36} strokeWidth={1.25} className="shrink-0" aria-hidden="true" />;
}

// Outlined download button — Figma: 40 tall, padding 8/20, navy hairline and text.
function DownloadButton({ href, label = 'Download' }) {
  return (
    <a
      href={href || '#'}
      className="inline-flex items-center gap-3 h-10 px-5 rounded-md shrink-0 bg-white outline outline-1 -outline-offset-1 outline-navy-900 text-base leading-[150%] font-medium text-navy-900 hover:bg-navy-50 transition-colors"
    >
      {label} <Download size={24} strokeWidth={1.5} />
    </a>
  );
}

export default function ReportsHub() {
  const facts = useKeyFacts();
  const { data } = useReportsHubData();
  const rp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const tabs = fillFactsDeep(data?.tabs?.length ? data.tabs : fallbackTabs, facts);
  const [active, setActive] = useState(0);
  const tab = tabs[Math.min(active, tabs.length - 1)] || {};

  // Hero title takes a forced line break after a configurable phrase.
  const title = rp.heroTitle || '';
  const brk = rp.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;
  const heroTitle = bIdx === -1 ? title : `${title.slice(0, bIdx + brk.length)}\n${title.slice(bIdx + brk.length).trim()}`;

  const hasChart = tab.chartPanel?.rows?.length;
  const hasLogos = tab.logoPanel?.logos?.length;
  const hasStat = tab.statPanel?.value;
  const hasMetrics = tab.metricCards?.length;
  const hasArchive = tab.archive?.length;

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(rp.heroImage, '/images/committees/hero-placement.webp')}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Placement', to: '/placements' }, { label: 'Placements Reports Hub' }]}
        eyebrow={rp.heroEyebrow}
        eyebrowUpper
        title={heroTitle}
        description={rp.heroDescription}
        descriptionWidth={628}
        // The pills pick the same report as the tab row below.
        actions={tabs.map((t, i) => ({
          label: t.pillLabel,
          onClick: () => setActive(i),
          pressed: i === active,
          primary: i === active,
          icon: false,
        }))}
      />

      <section className="px-5 py-16 md:p-16">
        <StatGrid stats={rp.stats} />
      </section>

      <Section className="border-t border-white/20" width={1280}>
        {/* Tabs — Figma "Filters": 818 wide, centred; active tab navy Medium with a
            3px Eastern Blue underline, others #6c709d. */}
        <div role="tablist" aria-label="Placement reports" className="flex flex-wrap justify-center">
          {tabs.map((t, i) => (
            <button
              key={t._id || t.tabLabel}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`px-4 py-2.5 text-base leading-[150%] rounded ${
                i === active ? 'font-medium text-navy-900' : 'text-navy-600 hover:text-navy-900'
              }`}
            >
              <span className={`block pb-1 border-b-[3px] ${i === active ? 'border-teal-500' : 'border-transparent'}`}>
                {t.tabLabel}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-12">
          <SectionTitle
            tagline={tab.eyebrow}
            title={composeTitle(tab.title, tab.titleHighlight)}
            highlight={tab.titleHighlight}
            body={tab.subtitle}
          />

          {/* Report file bar — navy, radius 16, padding 24; 36px PDF icon, 18/150
              title over 14/150 meta, outlined download button. */}
          {tab.fileTitle && (
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 p-6 rounded-2xl bg-navy-900 text-white outline outline-1 -outline-offset-1 outline-black/20">
              <div className="flex-1 min-w-0 flex items-center gap-4">
                <PdfIcon />
                <div className="flex flex-col gap-1">
                  <p className="text-lg leading-[150%]">{tab.fileTitle}</p>
                  <p className="text-sm leading-[150%]">{tab.fileMeta}</p>
                </div>
              </div>
              <DownloadButton href={tab.fileUrl} label={tab.fileCtaLabel || 'Download the full report (PDF)'} />
            </div>
          )}

          {/* Panels — 700 chart | 548 logo wall or stat, both with the 3px bar. */}
          {(hasChart || hasLogos || hasStat) && (
            <div className="grid lg:grid-cols-[700px_1fr] gap-8">
              {hasChart && (
                <BreakdownPanel accent title={tab.chartPanel.title} rows={tab.chartPanel.rows} titleClass="text-navy-900" />
              )}
              {hasLogos && (
                <AccentCard>
                  <div className="flex flex-col gap-6">
                    <h3 className="font-display font-medium text-[28px] leading-[140%] md:text-[36px] md:leading-[130%] tracking-[-0.01em] text-navy-900">
                      {tab.logoPanel.title}
                    </h3>
                    <div className="grid grid-cols-3 gap-x-5 gap-y-4">
                      {tab.logoPanel.logos.map((l) => {
                        const logoUrl = l.logo
                          ? urlFor(l.logo).width(296).auto('format').url()
                          : LOGO_FALLBACK[l.name] && `/images/recruiters/${LOGO_FALLBACK[l.name]}.webp`;
                        return (
                          <div key={l.name} className="h-[72px] flex items-center justify-center">
                            {logoUrl ? (
                              <img src={logoUrl} alt={l.name} className="max-h-full max-w-full object-contain" />
                            ) : (
                              <span className="text-sm leading-[150%] text-black text-center">{l.name}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </AccentCard>
              )}
              {hasStat && (
                <AccentCard>
                  <div className="flex flex-col gap-6">
                    <h3 className="font-display font-medium text-[28px] leading-[140%] md:text-[36px] md:leading-[130%] tracking-[-0.01em] text-navy-900">
                      {tab.statPanel.title}
                    </h3>
                    <p className="text-base leading-[150%] text-black">{tab.statPanel.description}</p>
                    <p className="font-display font-medium text-[52px] leading-[120%] tracking-[-0.01em] text-navy-900">
                      {tab.statPanel.value}
                    </p>
                  </div>
                </AccentCard>
              )}
            </div>
          )}

          {hasMetrics && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {tab.metricCards.map((m) => (
                <AccentCard key={m.label}>
                  <p className="font-display font-medium text-[28px] leading-[140%] tracking-[-0.01em] text-navy-900">{m.value}</p>
                  <p className="mt-2 text-base leading-[150%] text-black">{m.label}</p>
                </AccentCard>
              ))}
            </div>
          )}

          {/* Archive — tagline, then 102px hairline rows (24 apart): PDF icon, 18/150
              title, 14/150 meta, outlined download. */}
          {hasArchive && (
            <div className="flex flex-col gap-12">
              <Tagline>{tab.archiveTitle}</Tagline>
              <div className="flex flex-col gap-6">
                {tab.archive.map((a) => (
                  <div
                    key={a.title}
                    className="flex flex-col md:flex-row md:items-center gap-6 p-6 bg-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small"
                  >
                    <div className="flex-1 min-w-0 flex items-center gap-4">
                      <PdfIcon />
                      <div className="flex flex-col gap-1.5 text-black">
                        <p className="text-lg leading-[150%]">{a.title}</p>
                        <p className="text-sm leading-[150%]">{a.meta}</p>
                      </div>
                    </div>
                    <DownloadButton href={a.fileUrl} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
