import { useState } from 'react';
import StatCard, { StatGrid } from '../components/StatCard';
import PageHero, { HeroButton } from '../components/PageHero';
import { Section, SectionTitle } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import BreakdownPanel from '../components/BreakdownPanel';
import { useBatchProfileData } from '../lib/useBatchProfileData';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackPage = {
  heroEyebrow: 'For Recruiters · Updated Sept 2025',
  heroTitle: 'MMS Batch 2024-26 - hiring data at a glance.',
  heroTitleBreakAfter: ' -',
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
    'Three things you can do today - Recruiter Brochure, Campus Slot, Direct Email.',
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


  const chartPanels = cohort.panels || [];
  // First two panels sit side by side; the rest run in a three-up row with the
  // average-profile panel, matching the design's rhythm.
  const topPanels = chartPanels.slice(0, 2);
  const restPanels = chartPanels.slice(2);

  const title = bp.heroTitle || '';
  const brk = bp.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(bp.heroImage, '/images/students/batch-hero.webp', { stretch: true })}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: "Student's Corner", to: '/students' }, { label: 'Batch Profile' }]}
        eyebrow={bp.heroEyebrow}
        eyebrowUpper
        title={bIdx === -1 ? title : `${title.slice(0, bIdx + brk.length)}\n${title.slice(bIdx + brk.length).trim()}`}
        description={bp.heroDescription}
        descriptionWidth={628}
        actions={heroButtons.map((b, i) => ({
          label: b.label,
          // The first hero button downloads the uploaded PDF when one exists.
          href: i === 0 && bp.pdfUrl ? bp.pdfUrl : b.url || '#',
          download: i === 0 && bp.pdfUrl ? '' : undefined,
          primary: b.primary,
        }))}
      />

      {/* Cohort — Figma: title column | 2x2 stat cards, then the selector, charts and
          summary cards inside one 1280 section, 80 apart. */}
      <Section width={1280}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <SectionTitle
            tagline="The Cohort"
            title={composeTitle(cohort.headline, cohort.headlineHighlight)}
            highlight={cohort.headlineHighlight}
            body={cohort.headlineSubtitle}
            width={600}
          />
          <div className="grid grid-cols-2 gap-4 md:gap-8 max-lg:[&>*:nth-child(3)]:order-last">
            {(cohort.stats || []).map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </Section>

      {/* Selector + charts — Figma "Layout / 396 /": 112 padding, blocks 80 apart. */}
      <Section width={1280}>
        {cohorts.length > 0 && (
          <div className="flex flex-col gap-4">
            <label htmlFor="cohort" className="text-base leading-[150%] uppercase text-black">
              {bp.selectorLabel}
            </label>
            <select
              id="cohort"
              value={index}
              onChange={(e) => setIndex(Number(e.target.value))}
              className="rounded w-full max-w-[416px] h-12 border border-black px-3 text-base leading-[150%] text-black bg-white focus:outline-none focus:border-teal-500"
            >
              {cohorts.map((c, i) => (
                <option key={c._id || c.name} value={i}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Charts — two 624 panels, then three 405; one bar colour per panel. */}
        <div className="mt-10 md:mt-12 flex flex-col gap-12 md:gap-16">
          {topPanels.length > 0 && (
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {topPanels.map((p) => (
                <BreakdownPanel key={p.title} title={p.title} rows={p.rows || []} dark={p.dark} mono upperLabels />
              ))}
            </div>
          )}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {restPanels.map((p) => (
              <BreakdownPanel key={p.title} title={p.title} rows={p.rows || []} dark={p.dark} mono upperLabels />
            ))}
            {cohort.profileRows?.length > 0 && (
              <div className="rounded-xl p-8 flex flex-col gap-6 bg-white outline outline-1 -outline-offset-1 outline-black/20">
                <h3 className="pb-4 border-b border-black/20 font-display font-medium text-[28px] leading-[140%] md:text-[36px] md:leading-[130%] tracking-[-0.01em] text-black">
                  {cohort.profileTitle}
                </h3>
                <dl className="flex flex-col gap-4 m-0">
                  {cohort.profileRows.map((r) => (
                    <div key={r.label} className="flex items-center justify-between gap-4 text-base leading-[150%] text-black">
                      <dt className="uppercase">{r.label}</dt>
                      <dd className="m-0 tabular-nums">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>

      </Section>

      {cohort.summaryCards?.length > 0 && (
        <section className="px-5 py-12 md:px-16 md:py-20">
          <StatGrid stats={cohort.summaryCards} />
        </section>
      )}

      {/* Recruiter CTA — navy, centred 768 column. */}
      <Section bg="bg-navy-900" width={1280} className="text-center">
        <SectionTitle center dark tagline={bp.ctaEyebrow} title={bp.ctaTitle} body={bp.ctaSubtitle} />
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {ctaButtons.map((b) => (
            <HeroButton key={b.label} label={b.label} href={b.url} primary={b.primary} />
          ))}
        </div>
      </Section>
    </div>
  );
}
