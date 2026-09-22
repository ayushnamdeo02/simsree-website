import BreakdownPanel from '../components/BreakdownPanel';
import PageHero, { HeroButton } from '../components/PageHero';
import { Section, SectionTitle, H6 } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { useWhyRecruitData } from '../lib/useWhyRecruitData';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackPage = {
  heroEyebrow: 'For Recruiters',
  heroTitle: 'Hire practitioners. Not just graduates.',
  heroTitleItalic: 'practitioners.',
  heroTitleBreakAfter: 'practitioners.',
  heroDescription:
    "SIMSREE students don't just learn management — they practise it for two years before you meet them. Six proof points.",
  heroPrimaryCtaLabel: 'Book a campus visit',
  heroPrimaryCtaUrl: '/placements/contact',
  heroSecondaryCtaLabel: 'Download the recruiter brochure (PDF)',
  heroSecondaryCtaUrl: '#',

  reasonsEyebrow: 'Six Reasons',
  reasonsTitle: 'Why hire from SIMSREE',
  reasonsTitleHighlight: 'SIMSREE',
  reasonsSubtitle: 'Every point links to the evidence.',

  outcomesEyebrow: 'Last Batch Outcomes',
  outcomesTitle: 'See where the cohort landed',
  outcomesTitleHighlight: 'landed',
  outcomesSubtitle: 'See the MMS 2023-25 final placement breakdown.',
  breakdowns: [
    {
      title: 'By sector',
      rows: [
        { label: 'BFSI', value: 42 },
        { label: 'FMCG', value: 18 },
        { label: 'Consulting', value: 14 },
        { label: 'IT/Tech', value: 12 },
        { label: 'Other', value: 14 },
      ],
    },
    {
      title: 'By role',
      rows: [
        { label: 'Mgmt Trainee', value: 28 },
        { label: 'Analyst', value: 22 },
        { label: 'Associate', value: 14 },
        { label: 'Consultant', value: 12 },
        { label: 'Other', value: 24 },
      ],
    },
  ],

  ctaEyebrow: 'Recruit This Year',
  ctaTitle: 'Three ways to start hiring',
  ctaSubtitle: 'Pick the path that fits where you are.',
  ctaButtons: [
    { label: 'Submit your hiring needs', url: '/placements/contact', primary: true },
    { label: 'Email the placement cell', url: 'mailto:placements@simsree.org', primary: false },
    { label: 'Call the placement cell', url: 'tel:+918830332100', primary: false },
  ],
};

const fallbackReasons = [
  {
    title: 'Curated cohort',
    description: 'Merit only · Maharashtra CET-selected · top percentile.',
    order: 1,
  },
  {
    title: 'Real management experience',
    description: 'Every student runs a real committee — budgets, vendors, stakeholders, outcomes.',
    order: 2,
  },
  {
    title: 'Churchgate advantage',
    description: "Steps from Mumbai's banking and corporate core — live exposure from week one.",
    order: 3,
  },
  {
    title: 'Strong alumni network',
    description: 'Active alumni across 200+ firms — most placement leads route through them.',
    order: 4,
  },
  {
    title: 'Diversity by design',
    description: '38% women · 14 states · 7 undergrad disciplines · 62% prior work-ex.',
    order: 5,
  },
  {
    title: '{{noQuotaShort}}',
    description: 'No paid seats · no agents · every seat earned. Class composition reflects merit.',
    order: 6,
  },
];

export default function WhyRecruit() {
  const facts = useKeyFacts();
  const { data } = useWhyRecruitData();
  const wp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const reasons = fillFactsDeep(data?.reasons?.length ? data.reasons : fallbackReasons, facts);
  const breakdowns = fillFactsDeep(wp.breakdowns?.length ? wp.breakdowns : fallbackPage.breakdowns, facts);
  const ctaButtons = fillFactsDeep(wp.ctaButtons?.length ? wp.ctaButtons : fallbackPage.ctaButtons, facts);

  // The title breaks after one phrase ("practitioners.") onto a second line.
  const title = wp.heroTitle || '';
  const brk = wp.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;
  const heroTitle = bIdx === -1 ? title : `${title.slice(0, bIdx + brk.length)}\n${title.slice(bIdx + brk.length).trim()}`;

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(wp.heroImage, '/images/placements/why-recruit-hero.webp')}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Placement', to: '/placements' }, { label: 'Why Recruit' }]}
        eyebrow={wp.heroEyebrow}
        eyebrowUpper
        title={heroTitle}
        titleItalic={wp.heroTitleItalic}
        description={wp.heroDescription}
        descriptionWidth={628}
        actions={[
          { label: wp.heroPrimaryCtaLabel, href: wp.heroPrimaryCtaUrl, primary: true },
          { label: wp.heroSecondaryCtaLabel, href: wp.heroSecondaryCtaUrl },
        ]}
        mobileOverlay="gradient-tint"
      />

      {/* Six reasons — left title (30 gap to the grid in Figma), 405x128 bar cards:
          H6 22 "NN · title" in navy over 16/150 copy. */}
      <Section width={1280}>
        <SectionTitle
          tagline={wp.reasonsEyebrow}
          title={composeTitle(wp.reasonsTitle, wp.reasonsTitleHighlight)}
          highlight={wp.reasonsTitleHighlight}
          body={wp.reasonsSubtitle}
        />
        <div className="mt-[30px] grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r, i) => (
            <div key={r._id || r.title} className="flex min-h-32 outline outline-1 -outline-offset-1 outline-black/20 shadow-small">
              <span className="w-[3px] shrink-0 bg-teal-500" aria-hidden="true" />
              <div className="flex flex-col justify-center gap-2 py-4 pl-8 pr-6">
                <H6 as="h3">
                  {String(r.order ?? i + 1).padStart(2, '0')} · {r.title}
                </H6>
                <p className="text-base leading-[150%] text-black">{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Batch outcomes — 1312 title, two 640x336 breakdown cards, 32 apart. */}
      <Section>
        <SectionTitle
          tagline={wp.outcomesEyebrow}
          title={composeTitle(wp.outcomesTitle, wp.outcomesTitleHighlight)}
          highlight={wp.outcomesTitleHighlight}
          body={wp.outcomesSubtitle}
          width={1312}
        />
        <div className="mt-20 grid lg:grid-cols-2 gap-8">
          {breakdowns.map((b) => (
            <BreakdownPanel key={b.title} title={b.title} rows={b.rows || []} />
          ))}
        </div>
      </Section>

      {/* Hiring CTA — navy, 64 padding, left 723 column, three buttons 14 apart. */}
      <section className="bg-navy-900 text-white px-5 py-16 md:p-16 border-t border-white/20">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-[723px]">
            <SectionTitle dark tagline={wp.ctaEyebrow} title={wp.ctaTitle} width={723} />
            <p className="mt-6 max-w-[598px] text-base md:text-lg leading-[150%]">{wp.ctaSubtitle}</p>
          </div>
          <div className="mt-8 flex flex-col md:flex-row flex-wrap gap-3.5">
            {ctaButtons.map((b) => (
              <HeroButton key={b.label} label={b.label} href={b.url} primary={b.primary} icon={false} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
