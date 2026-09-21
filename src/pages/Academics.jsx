import { ArrowUpRight } from 'lucide-react';
import { useAcademicsData } from '../lib/useAcademicsData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackPage = {
  heroEyebrow: 'Five Programmes · One Institute',
  heroTitle: 'Find the programme that fits your next move.',
  heroTitleBreakAfter: 'the',
  heroDescription:
    'Full-time, executive, doctoral — five AICTE-approved degrees, one Churchgate campus.',
  heroPrimaryCtaLabel: 'See all programmes',
  heroPrimaryCtaUrl: '#full-time',
  heroSecondaryCtaLabel: 'Compare all five',
  heroSecondaryCtaUrl: '#compare',
  heroTertiaryCtaLabel: 'See how to apply',
  heroTertiaryCtaUrl: '/admissions',

  approachEyebrow: 'Why SIMSREE Academics',
  approachTitle: 'Practise management — don’t just study it.',
  approachTitleHighlight: 'Practise',
  approachSubtitle:
    'Rigour is the baseline. What sets you apart is the mix — a student-run committee system, a Churchgate address, and an alumni network that opens doors.',
  approachCards: [
    {
      title: 'Industry-led teaching',
      description:
        'Learn every doctrine from someone who’s done the job — senior practitioners co-teach alongside doctoral faculty.',
    },
    {
      title: 'Case-based pedagogy',
      description:
        'Real cases · real briefs · real consulting engagements — apply theory from week one.',
    },
    {
      title: 'Outcomes-focused',
      description:
        '{{placementRate}} placement · {{avgCtc}} average CTC · {{recruiterCount}} recruiters. Outcomes published, not promised.',
    },
  ],

  fullTimeEyebrow: 'Full-time Programmes',
  fullTimeTitle: 'Got two years? Go full-time.',
  fullTimeTitleHighlight: 'Go full-time.',
  fullTimeSubtitle:
    'Two full-time years on campus, in the heart of Mumbai’s financial district — that’s MMS and M.Sc. Finance.',

  executiveEyebrow: 'Executive Programmes',
  executiveTitle: 'Can’t pause your career? Study weekends',
  executiveTitleHighlight: 'your career?',
  executiveSubtitle:
    'Keep working and earn a master’s in three years — MFM and MMM run on weekends at Churchgate.',

  doctoralEyebrow: 'Doctoral',
  doctoralTitle: 'Build a research career.',
  doctoralTitleHighlight: 'research',
  doctoralSubtitle:
    'Produce original research across management disciplines — 3-5 years, just 8-12 seats per cohort.',

  compareEyebrow: 'Compare',
  compareTitle: 'Compare all five in one view.',
  compareTitleHighlight: 'all five',
  compareSubtitle:
    'Duration, mode, intake, admission path and approximate fees — all at a glance.',

  differentiatorsEyebrow: 'Why SIMSREE Academics',
  differentiatorsTitle: 'Five things other B-schools can’t give you.',
  differentiatorsTitleHighlight: 'B-schools can’t give you.',
  differentiatorsSubtitle: 'Beyond the curriculum — what sets your degree apart.',

  facultyEyebrow: 'Faculty',
  facultyTitle: 'Meet the people who’ll teach you.',
  facultySubtitle:
    'Core faculty across all disciplines + a rotating panel of senior industry visiting faculty.',
  facultyCards: [
    {
      title: 'Core Faculty',
      description:
        'Permanent faculty across Finance, Marketing, Operations, HR, Systems, Economics, OB, Strategy.',
      ctaLabel: 'Meet the core faculty',
      ctaUrl: '/academics/faculty',
    },
    {
      title: 'Visiting Faculty',
      description:
        'Senior industry practitioners teaching electives and short-form modules. Many are SIMSREE alumni.',
      ctaLabel: 'Meet the visiting faculty',
      ctaUrl: '/academics/faculty',
    },
  ],

  ctaEyebrow: 'Ready to Apply?',
  ctaTitle: 'Apply to MMS 2026-28.',
  ctaTitleHighlight: 'MMS 2026-28.',
  ctaSubtitle:
    'Committee selection happens during induction week. Every student is eligible. The only requirement is the initiative to put yourself forward.',
  ctaButtons: [
    { label: 'See all admission dates', url: '/admissions', primary: true },
    { label: 'Talk to a current student', url: '/contact', primary: false },
  ],
};

const fallbackProgrammes = [
  {
    name: 'Masters of Management Studies',
    shortName: 'MMS',
    tier: 'fullTime',
    badge: 'Full-time · 2 years · 120 seats',
    description:
      'India’s longest-running MBA equivalent. Specialisations in Finance, HR, Marketing, Operations, Systems. Admission via Maharashtra CET.',
    points: [
      '5 specialisations · Finance · HR · Marketing · Operations · Systems',
      '2-year structure · 4 semesters + summer internship',
      '₹4.5L total fees · 4 instalments',
      'State CET Cell · merit-only admission',
    ],
    primaryCtaLabel: 'See full MMS detail',
    primaryCtaUrl: '/academics/mms',
    secondaryCtaLabel: 'See MMS admission dates',
    secondaryCtaUrl: '/admissions',
    duration: '2 years',
    mode: 'Full-time on-campus',
    seats: '120',
    fees: '~₹4.5L',
    admissionVia: 'Maharashtra CET (MMS-CMAT/CET) + GD + PI',
    order: 1,
  },
  {
    name: 'Master of Science in Finance',
    shortName: 'M.Sc. Finance',
    tier: 'fullTime',
    badge: 'Full-time · 2 years · 40 seats',
    description:
      'Specialise in finance — capital markets, investment banking, equity research, derivatives, fintech — on a CFPP certification pathway.',
    points: [
      'CFPP partnership · structured pathway to Financial Planner certification',
      '40 seats · 2 years · 4 semesters + industry capstone',
      '₹5.6L total fees',
      'SIMSREE entrance · GD + PI',
    ],
    primaryCtaLabel: 'Programme detail',
    primaryCtaUrl: '/academics/msc-finance',
    secondaryCtaLabel: 'Admission cycle',
    secondaryCtaUrl: '/admissions',
    duration: '2 years',
    mode: 'Full-time on-campus',
    seats: '40',
    fees: '~₹5.6L',
    admissionVia: 'SIMSREE entrance + GD + PI',
    order: 2,
  },
  {
    name: 'Master’s in Financial Management',
    shortName: 'MFM (Executive)',
    tier: 'executive',
    badge: 'Executive · 3 years · Part-time',
    description:
      'Advance in finance — built for tomorrow’s CFOs, banking specialists, and treasury and FP&A leaders.',
    points: [
      'Weekend classes · Churchgate campus',
      '₹3.2L total · paid by semester',
      'Min 2 years finance work-ex + bachelor’s + employer NOC',
    ],
    primaryCtaLabel: 'See the MFM programme',
    primaryCtaUrl: '/academics/mfm',
    duration: '3 years',
    mode: 'Part-time · weekends',
    seats: '60',
    fees: '~₹3.2L',
    admissionVia: 'SIMSREE entrance + interview · 2 yr work-ex required',
    order: 3,
  },
  {
    name: 'Master’s in Marketing Management',
    shortName: 'MMM (Executive)',
    tier: 'executive',
    badge: 'Executive · 3 years · Part-time',
    description:
      'Advance in marketing — built for brand managers, growth leads, sales heads, and agency strategists.',
    points: [
      'Weekend classes · Churchgate campus',
      '₹3.2L total · paid by semester',
      'Min 2 years marketing work-ex + bachelor’s + employer NOC',
    ],
    primaryCtaLabel: 'Open programme',
    primaryCtaUrl: '/academics/mmm',
    duration: '3 years',
    mode: 'Part-time · weekends',
    seats: '60',
    fees: '~₹3.2L',
    admissionVia: 'SIMSREE entrance + interview · 2 yr work-ex required',
    order: 4,
  },
  {
    name: 'Doctor of Philosophy',
    shortName: 'PhD',
    tier: 'doctoral',
    badge: 'Doctoral · 3-5 yrs · 8-12 seats',
    description:
      'Research across Strategy, Finance, Marketing, Operations, HR, Economics, Systems and Entrepreneurship — with a doctoral supervisor beside you.',
    points: [
      'Coursework + research proposal + thesis',
      'Master’s + min 55% + PET entrance + interview',
      '₹1.5L per year · fellowship opportunities available',
      'Per Mumbai University / Dr Homi Bhabha SU schedule',
    ],
    primaryCtaLabel: 'See the PhD programme',
    primaryCtaUrl: '/academics/phd',
    duration: '3-5 years',
    mode: 'Doctoral',
    seats: '8-12',
    fees: '~₹1.5L/yr',
    admissionVia: 'PET entrance + research proposal + interview',
    order: 5,
  },
];

const fallbackDifferentiators = [
  {
    title: 'Mumbai’s financial core',
    description:
      'Steps from BSE, RBI, and 100+ corporate HQs. Internships and live projects come built-in.',
    order: 1,
  },
  {
    title: 'Practitioner-led teaching',
    description:
      'Industry guest faculty weekly · case-based pedagogy · live consulting briefs — practise on real problems.',
    order: 2,
  },
  {
    title: 'Active placement cell',
    description:
      '{{placementRate}} placement · {{recruiterCount}} recruiters · {{placementRate}} placement record · transparent salary data.',
    order: 3,
  },
  {
    title: '{{alumniCount}} alumni network',
    description:
      'SIMAA-led mentorship · alumni referrals · sector-specific networking.',
    order: 4,
  },
  {
    title: '{{noQuotaShort}}',
    description:
      'Pure merit · no paid seats · transparent admissions through CET / institute entrance.',
    order: 5,
  },
  {
    title: 'Faculty',
    description:
      'Core faculty + visiting industry practitioners — both with doctoral scholarship and corporate experience.',
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

function ProgrammeCard({ p, wide = false }) {
  const imgUrl = p.image ? urlFor(p.image).width(900).url() : null;
  return (
    <div
      className={`border border-navy-100 rounded-lg overflow-hidden flex ${
        wide ? 'flex-col lg:flex-row' : 'flex-col'
      }`}
    >
      <div
        className={`bg-gray-200 bg-cover bg-center shrink-0 ${
          wide ? 'h-[240px] lg:h-auto lg:w-[42%]' : 'h-[240px]'
        }`}
        style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
      />
      <div className="p-7 flex flex-col flex-1">
        {p.badge && (
          <span className="inline-block w-fit text-[10px] font-semibold tracking-widest uppercase text-navy-900 bg-navy-50 px-3 py-1.5 rounded mb-4">
            {p.badge}
          </span>
        )}
        <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">{p.name}</h3>
        <p className="text-sm text-ink-600 leading-relaxed mb-5">{p.description}</p>

        {p.points?.length > 0 && (
          <ul className="space-y-2 mb-6">
            {p.points.map((pt) => (
              <li key={pt} className="flex gap-2.5 text-xs text-ink-600">
                <span className="text-sky-600 shrink-0">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-3 mt-auto">
          {p.primaryCtaLabel && (
            <a
              href={p.primaryCtaUrl || '#'}
              className="bg-navy-900 hover:bg-navy-800 transition-colors text-white text-sm font-medium px-4 py-2.5 rounded-md flex items-center gap-2"
            >
              {p.primaryCtaLabel} <ArrowUpRight size={14} />
            </a>
          )}
          {p.secondaryCtaLabel && (
            <a
              href={p.secondaryCtaUrl || '#'}
              className="border border-navy-100 hover:bg-navy-50 transition-colors text-navy-900 text-sm font-medium px-4 py-2.5 rounded-md flex items-center gap-2"
            >
              {p.secondaryCtaLabel} <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function TierHeading({ eyebrow, title, highlight, subtitle }) {
  return (
    <>
      <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
        {eyebrow}
      </span>
      <TitleWithHighlight
        text={title}
        highlight={highlight}
        className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4"
      />
      <p className="text-sm text-ink-600 max-w-2xl mb-10">{subtitle}</p>
    </>
  );
}

export default function Academics() {
  const facts = useKeyFacts();
  const { data } = useAcademicsData();
  const ap = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const programmes = fillFactsDeep(data?.programmes?.length ? data.programmes : fallbackProgrammes, facts);
  const differentiators = fillFactsDeep(
    data?.differentiators?.length ? data.differentiators : fallbackDifferentiators,
    facts
  );
  const approachCards = fillFactsDeep(ap.approachCards?.length ? ap.approachCards : fallbackPage.approachCards, facts);
  const facultyCards = fillFactsDeep(ap.facultyCards?.length ? ap.facultyCards : fallbackPage.facultyCards, facts);
  const ctaButtons = fillFactsDeep(ap.ctaButtons?.length ? ap.ctaButtons : fallbackPage.ctaButtons, facts);

  const heroImageUrl = ap.heroImage ? urlFor(ap.heroImage).width(1600).url() : null;

  const byTier = (tier) => programmes.filter((p) => p.tier === tier);
  const fullTime = byTier('fullTime');
  const executive = byTier('executive');
  const doctoral = byTier('doctoral');

  // Hero title takes a forced line break after a configurable phrase.
  const title = ap.heroTitle || '';
  const brk = ap.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;
  const line1 = bIdx === -1 ? title : title.slice(0, bIdx + brk.length);
  const line2 = bIdx === -1 ? '' : title.slice(bIdx + brk.length).trim();

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
          <span className="inline-block w-fit bg-navy-900 text-white text-[11px] font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            {ap.heroEyebrow}
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
          <p className="max-w-lg text-sm text-white/85 leading-relaxed mb-8">{ap.heroDescription}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={ap.heroPrimaryCtaUrl}
              className="bg-sky-600 hover:bg-teal-600 transition-colors text-white font-medium px-5 py-3 rounded-md flex items-center gap-2 w-fit"
            >
              {ap.heroPrimaryCtaLabel} <ArrowUpRight size={16} />
            </a>
            <a
              href={ap.heroSecondaryCtaUrl}
              className="bg-white hover:bg-gray-100 transition-colors text-navy-900 font-medium px-5 py-3 rounded-md w-fit"
            >
              {ap.heroSecondaryCtaLabel}
            </a>
            <a
              href={ap.heroTertiaryCtaUrl}
              className="border border-white/40 hover:bg-white/10 transition-colors text-white font-medium px-5 py-3 rounded-md w-fit"
            >
              {ap.heroTertiaryCtaLabel}
            </a>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {ap.approachEyebrow}
          </span>
          <TitleWithHighlight
            text={ap.approachTitle}
            highlight={ap.approachTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4 max-w-2xl"
          />
          <p className="text-sm text-ink-600 max-w-2xl mb-10">{ap.approachSubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {approachCards.map((c) => (
              <div
                key={c.title}
                className="border border-navy-100 border-l-2 border-l-sky-600 rounded-sm px-6 py-5"
              >
                <h3 className="font-semibold text-navy-900 mb-2">{c.title}</h3>
                <p className="text-sm text-ink-600 leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-time */}
      <section id="full-time" className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <TierHeading
            eyebrow={ap.fullTimeEyebrow}
            title={ap.fullTimeTitle}
            highlight={ap.fullTimeTitleHighlight}
            subtitle={ap.fullTimeSubtitle}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {fullTime.map((p) => (
              <ProgrammeCard key={p._id || p.shortName} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Executive */}
      <section className="bg-navy-50 py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <TierHeading
            eyebrow={ap.executiveEyebrow}
            title={ap.executiveTitle}
            highlight={ap.executiveTitleHighlight}
            subtitle={ap.executiveSubtitle}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {executive.map((p) => (
              <div key={p._id || p.shortName} className="bg-white rounded-lg">
                <ProgrammeCard p={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctoral */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <TierHeading
            eyebrow={ap.doctoralEyebrow}
            title={ap.doctoralTitle}
            highlight={ap.doctoralTitleHighlight}
            subtitle={ap.doctoralSubtitle}
          />
          {doctoral.map((p) => (
            <ProgrammeCard key={p._id || p.shortName} p={p} wide />
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section id="compare" className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {ap.compareEyebrow}
          </span>
          <TitleWithHighlight
            text={ap.compareTitle}
            highlight={ap.compareTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4"
          />
          <p className="text-sm text-ink-600 mb-10">{ap.compareSubtitle}</p>

          {/* Wide table scrolls inside its own container rather than the page */}
          <div className="overflow-x-auto rounded-lg border border-navy-100">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="bg-navy-900 text-white">
                  {['Programme', 'Duration', 'Mode', 'Seats', 'Fees', 'Admission via'].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="text-[10px] font-semibold tracking-widest uppercase px-5 py-4 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {programmes.map((p) => (
                  <tr key={p._id || p.shortName} className="border-t border-navy-100">
                    <th scope="row" className="text-sm font-medium text-navy-900 px-5 py-4 whitespace-nowrap">
                      {p.shortName}
                    </th>
                    <td className="text-sm text-ink-600 px-5 py-4 whitespace-nowrap">{p.duration}</td>
                    <td className="text-sm text-ink-600 px-5 py-4 whitespace-nowrap">{p.mode}</td>
                    <td className="text-sm text-ink-600 px-5 py-4 whitespace-nowrap">{p.seats}</td>
                    <td className="text-sm text-ink-600 px-5 py-4 whitespace-nowrap">{p.fees}</td>
                    <td className="text-sm text-ink-600 px-5 py-4">{p.admissionVia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {ap.differentiatorsEyebrow}
          </span>
          <TitleWithHighlight
            text={ap.differentiatorsTitle}
            highlight={ap.differentiatorsTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4 max-w-lg"
          />
          <p className="text-sm text-ink-600 mb-10">{ap.differentiatorsSubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {differentiators.map((d, i) => (
              <div key={d._id || d.title} className="border border-navy-100 rounded-lg p-6">
                <span className="block font-display text-2xl font-semibold text-navy-100 mb-4">
                  {String(d.order ?? i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-semibold text-navy-900 mb-2">{d.title}</h3>
                <p className="text-sm text-ink-600 leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                {ap.facultyEyebrow}
              </span>
              <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4">
                {ap.facultyTitle}
              </h2>
              <p className="text-sm text-ink-600 max-w-md">{ap.facultySubtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {facultyCards.map((c) => {
                const imgUrl = c.image ? urlFor(c.image).width(600).url() : null;
                return (
                  <div key={c.title} className="border border-navy-100 rounded-lg overflow-hidden">
                    <div
                      className="h-[150px] bg-gray-200 bg-cover bg-center"
                      style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                    />
                    <div className="p-5">
                      <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
                        {c.title}
                      </h3>
                      <p className="text-xs text-ink-600 leading-relaxed mb-4">{c.description}</p>
                      {c.ctaLabel && (
                        <a
                          href={c.ctaUrl || '#'}
                          className="bg-navy-900 hover:bg-navy-800 transition-colors text-white text-xs font-medium px-4 py-2.5 rounded-md inline-flex items-center gap-2"
                        >
                          {c.ctaLabel} <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="bg-navy-900 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-white">
            {ap.ctaEyebrow}
          </span>
          <TitleWithHighlight
            text={ap.ctaTitle}
            highlight={ap.ctaTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-5 mb-4"
          />
          <p className="text-sm text-white/75 max-w-md mb-8">{ap.ctaSubtitle}</p>
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
