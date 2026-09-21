import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import BreakdownPanel from '../components/BreakdownPanel';
import { useWhyRecruitData } from '../lib/useWhyRecruitData';
import { urlFor } from '../lib/sanity';
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

export default function WhyRecruit() {
  const facts = useKeyFacts();
  const { data } = useWhyRecruitData();
  const wp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const reasons = fillFactsDeep(data?.reasons?.length ? data.reasons : fallbackReasons, facts);
  const breakdowns = fillFactsDeep(wp.breakdowns?.length ? wp.breakdowns : fallbackPage.breakdowns, facts);
  const ctaButtons = fillFactsDeep(wp.ctaButtons?.length ? wp.ctaButtons : fallbackPage.ctaButtons, facts);

  const heroImageUrl = wp.heroImage ? urlFor(wp.heroImage).width(1600).url() : null;

  // Hero title: italic serif on one phrase, forced line break after another.
  const title = wp.heroTitle || '';
  const brk = wp.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;
  const line1 = bIdx === -1 ? title : title.slice(0, bIdx + brk.length);
  const line2 = bIdx === -1 ? '' : title.slice(bIdx + brk.length).trim();

  const renderLine = (line) => {
    const it = wp.heroTitleItalic;
    const iIdx = it ? line.indexOf(it) : -1;
    if (iIdx === -1) return line;
    return (
      <>
        {line.slice(0, iIdx)}
        <span className="italic">{it}</span>
        {line.slice(iIdx + it.length)}
      </>
    );
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="min-h-[520px] md:h-[578px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
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
            <span className="text-white">Why Recruit</span>
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90 mb-4">
            {wp.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-[56px] md:leading-[1.12] font-semibold mb-5">
            {renderLine(line1)}
            {line2 && (
              <>
                <br />
                {renderLine(line2)}
              </>
            )}
          </h1>
          <p className="max-w-lg text-sm text-white/85 leading-relaxed mb-7">{wp.heroDescription}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={wp.heroPrimaryCtaUrl}
              className="bg-sky-600 hover:bg-teal-600 transition-colors text-white font-medium px-5 py-3 rounded-md flex items-center gap-2 w-fit"
            >
              {wp.heroPrimaryCtaLabel} <ArrowUpRight size={16} />
            </a>
            <a
              href={wp.heroSecondaryCtaUrl}
              className="bg-white hover:bg-gray-100 transition-colors text-navy-900 font-medium px-5 py-3 rounded-md w-fit"
            >
              {wp.heroSecondaryCtaLabel}
            </a>
          </div>
        </div>
      </section>

      {/* Six reasons */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {wp.reasonsEyebrow}
          </span>
          <TitleWithHighlight
            text={wp.reasonsTitle}
            highlight={wp.reasonsTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4"
          />
          <p className="text-sm text-ink-600 mb-10">{wp.reasonsSubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {reasons.map((r, i) => (
              <div
                key={r._id || r.title}
                className="border border-navy-100 border-l-2 border-l-sky-600 rounded-sm px-6 py-5"
              >
                <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
                  <span className="text-ink-400">
                    {String(r.order ?? i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-ink-400 mx-2">·</span>
                  {r.title}
                </h3>
                <p className="text-sm text-ink-600 leading-relaxed">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Batch outcomes */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {wp.outcomesEyebrow}
          </span>
          <TitleWithHighlight
            text={wp.outcomesTitle}
            highlight={wp.outcomesTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4"
          />
          <p className="text-sm text-ink-600 mb-12">{wp.outcomesSubtitle}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {breakdowns.map((b) => (
              <BreakdownPanel key={b.title} title={b.title} rows={b.rows || []} />
            ))}
          </div>
        </div>
      </section>

      {/* Start hiring CTA */}
      <section className="bg-navy-900 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-white">
            {wp.ctaEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-5 mb-4">{wp.ctaTitle}</h2>
          <p className="text-sm text-white/75 mb-8">{wp.ctaSubtitle}</p>
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
