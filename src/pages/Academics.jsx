import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, Star, Target } from 'lucide-react';
import PageHero, { HeroButton } from '../components/PageHero';
import { Section, SectionTitle, Tagline, Heading, H5, H6 } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { useAcademicsData } from '../lib/useAcademicsData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackPage = {
  heroEyebrow: 'Five Programmes · One Institute',
  heroTitle: 'Find the programme that fits your next move.',
  heroTitleBreakAfter: 'the',
  heroDescription:
    'Full-time, executive, or doctoral — each built for India’s real business complexity. Compare them side-by-side, then open the one that fits.',
  heroPrimaryCtaLabel: 'See all five programmes',
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
        'Learn every elective from someone who’s done the job — senior practitioners co-teach alongside doctoral faculty.',
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
      'India’s longest-running MBA-equivalent. Specialisations in Finance, HR, Marketing, Operations, Systems. Admission via Maharashtra CET.',
    points: [
      '5 specialisations · Finance · HR · Marketing · Operations · Systems',
      '2-year structure · 4 semesters + summer internship',
      '~₹4.5L total fees · 4 instalments',
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
    admissionVia: 'Maharashtra CET (MMS-CMAT/CET) → GD + PI',
    order: 1,
  },
  {
    name: 'Master of Science in Finance',
    shortName: 'M.Sc. Finance',
    tier: 'fullTime',
    badge: 'Full-time · 2 years · 40 seats',
    description:
      'Specialise in finance — capital markets, investment banking, equity research, derivatives, fintech — on a CFP® certification pathway.',
    points: [
      'CFP® partnership · structured pathway to Financial Planner certification',
      '2-year structure · 4 semesters + industry capstone',
      '~₹3.8L total fees',
      'SIMSREE entrance · GD + PI',
    ],
    primaryCtaLabel: 'Programme detail',
    primaryCtaUrl: '/academics/msc-finance',
    secondaryCtaLabel: 'Admission cycle',
    secondaryCtaUrl: '/admissions',
    duration: '2 years',
    mode: 'Full-time on-campus',
    seats: '40',
    fees: '~₹3.8L',
    admissionVia: 'SIMSREE entrance → GD + PI',
    order: 2,
  },
  {
    name: 'Master’s in Financial Management',
    shortName: 'MFM (Executive)',
    tier: 'executive',
    badge: 'Executive · 3 yrs · Part-time',
    description:
      'Advance in finance — built for tomorrow’s CFOs, banking specialists, and treasury and FP&A leaders.',
    points: [
      'Weekend classes · Churchgate campus',
      '~₹2.8L total · paid by semester',
      'Min 2 years finance work-ex + bachelor’s + employer NOC',
    ],
    primaryCtaLabel: 'See the MFM programme',
    primaryCtaUrl: '/academics/mfm',
    duration: '3 years',
    mode: 'Part-time · weekends',
    seats: '60',
    fees: '~₹2.8L',
    admissionVia: 'SIMSREE entrance + interview · 2 yr work-ex required',
    order: 3,
  },
  {
    name: 'Master’s in Marketing Management',
    shortName: 'MMM (Executive)',
    tier: 'executive',
    badge: 'Executive · 3 yrs · Part-time',
    description:
      'Advance in marketing — built for brand managers, growth leads, sales heads, and agency strategists.',
    points: [
      'Weekend classes · Churchgate campus',
      '~₹2.8L total · paid by semester',
      'Min 2 years marketing work-ex + bachelor’s + employer NOC',
    ],
    primaryCtaLabel: 'Open programme',
    primaryCtaUrl: '/academics/mmm',
    duration: '3 years',
    mode: 'Part-time · weekends',
    seats: '60',
    fees: '~₹2.8L',
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
      '~₹1.5L per year · fellowship opportunities available',
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
      'Student-run · {{recruiterCount}} recruiters · {{placementRate}} placement record · transparent salary data.',
    order: 3,
  },
  {
    title: '{{alumniCount}} alumni network',
    description:
      'SIMAA-led mentorship · alumni referrals · sector-specific networking.',
    order: 4,
  },
  {
    title: 'Zero management quota',
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

// Figma photos per programme and for the faculty cards.
const PROGRAMME_PHOTOS = {
  MMS: '/images/academics/mms.webp',
  'M.Sc. Finance': '/images/academics/msc-finance.webp',
  'MFM (Executive)': '/images/academics/mfm.webp',
  'MMM (Executive)': '/images/academics/mmm.webp',
  PhD: '/images/history/location.webp',
};
const FACULTY_PHOTOS = ['/images/academics/faculty-core.webp', '/images/academics/faculty-visiting.webp'];

const APPROACH_ICONS = [Target, BriefcaseBusiness, Star];

const img = (image, fallback, w) => (image ? urlFor(image).width(w).auto('format').url() : fallback);

// Bullet list — Figma: 16/150 disc list; full-time cards set the lead phrase
// (up to the first " · ") in SemiBold.
function Points({ points = [], boldLead = false }) {
  return (
    <ul className="list-disc pl-6 flex flex-col text-base leading-[150%] text-black">
      {points.map((pt) => {
        const i = pt.indexOf(' · ');
        return (
          <li key={pt}>
            {boldLead && i > 0 ? (
              <>
                <strong className="font-semibold">{pt.slice(0, i)}</strong>
                {pt.slice(i)}
              </>
            ) : (
              pt
            )}
          </li>
        );
      })}
    </ul>
  );
}

function ProgrammeActions({ p }) {
  return (
    <div className="flex flex-wrap gap-4">
      {p.primaryCtaLabel && (
        <Link
          to={p.primaryCtaUrl || '#'}
          className="inline-flex items-center gap-3 h-11 px-6 rounded-md bg-navy-900 text-white text-base leading-[150%] font-medium hover:bg-navy-800 transition-colors"
        >
          {p.primaryCtaLabel} <ArrowUpRight size={24} strokeWidth={1.5} />
        </Link>
      )}
      {p.secondaryCtaLabel && <HeroButton label={p.secondaryCtaLabel} to={p.secondaryCtaUrl || '#'} />}
    </div>
  );
}

// Figma programme card: 624 wide, radius 16, hairline + "small" shadow, padded 32;
// 560x490 photo (radius 16), yellow-tint tag, H5 navy name, 18/150 copy, bullets.
function ProgrammeCard({ p }) {
  const src = img(p.image, PROGRAMME_PHOTOS[p.shortName], 1120);
  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl bg-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small">
      <div
        className="h-[260px] md:h-[490px] rounded-2xl bg-navy-50 bg-cover bg-center"
        style={src ? { backgroundImage: `url('${src}')` } : undefined}
      />
      {p.badge && (
        <span
          className={`w-fit px-4 py-1 rounded-2xl text-navy-900 text-sm leading-[150%] uppercase ${
            p.tier === 'executive' ? 'bg-navy-50' : 'bg-[#fffbec]'
          }`}
        >
          {p.badge}
        </span>
      )}
      <div className="flex flex-col gap-3">
        <H5>{p.name}</H5>
        <p className="text-base md:text-lg leading-[150%] text-black">{p.description}</p>
        <Points points={p.points} boldLead={p.tier === 'fullTime'} />
      </div>
      <ProgrammeActions p={p} />
    </div>
  );
}

// PhD card — Figma: 1280 row, 616x657 photo (radius 16 on the left) beside a
// padded 32 column with a navy pill tag and an H2 name.
function DoctoralCard({ p }) {
  const src = img(p.image, PROGRAMME_PHOTOS[p.shortName], 1232);
  return (
    <div className="grid lg:grid-cols-2 lg:items-center gap-8 lg:gap-12 rounded-2xl bg-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small overflow-hidden">
      <div
        className="h-[280px] lg:h-[657px] bg-navy-50 bg-cover bg-center rounded-t-2xl lg:rounded-none lg:rounded-l-2xl"
        style={src ? { backgroundImage: `url('${src}')` } : undefined}
      />
      <div className="p-6 md:p-8 flex flex-col gap-8">
        {p.badge && (
          <span className="w-fit px-8 py-2.5 rounded-[32px] bg-navy-900 text-hero text-base md:text-lg leading-[150%] uppercase outline outline-1 -outline-offset-1 outline-black/20">
            {p.badge}
          </span>
        )}
        <div className="flex flex-col gap-6">
          <Heading text={p.name} as="h3" />
          <p className="text-base md:text-lg leading-[150%] text-black">{p.description}</p>
          <Points points={p.points} />
        </div>
        <ProgrammeActions p={p} />
      </div>
    </div>
  );
}

export default function Academics() {
  const facts = useKeyFacts();
  const { data } = useAcademicsData();
  const ap = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const programmes = fillFactsDeep(data?.programmes?.length ? data.programmes : fallbackProgrammes, facts);
  const differentiators = fillFactsDeep(
    data?.differentiators?.length ? data.differentiators : fallbackDifferentiators,
    facts,
  );
  const approachCards = fillFactsDeep(ap.approachCards?.length ? ap.approachCards : fallbackPage.approachCards, facts);
  const facultyCards = fillFactsDeep(ap.facultyCards?.length ? ap.facultyCards : fallbackPage.facultyCards, facts);
  const ctaButtons = fillFactsDeep(ap.ctaButtons?.length ? ap.ctaButtons : fallbackPage.ctaButtons, facts);

  const byTier = (tier) => programmes.filter((p) => p.tier === tier);
  const fullTime = byTier('fullTime');
  const executive = byTier('executive');
  const doctoral = byTier('doctoral');

  // Hero title takes a forced line break after a configurable phrase.
  const title = ap.heroTitle || '';
  const brk = ap.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;
  const heroTitle = bIdx === -1 ? title : `${title.slice(0, bIdx + brk.length)}\n${title.slice(bIdx + brk.length).trim()}`;

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(ap.heroImage, '/images/academics/hero.webp', { stretch: true })}
        eyebrow={ap.heroEyebrow}
        eyebrowStyle="pill"
        title={heroTitle}
        titleWidth={652}
        description={ap.heroDescription}
        descriptionWidth={628}
        actions={[
          { label: ap.heroPrimaryCtaLabel, href: ap.heroPrimaryCtaUrl, primary: true },
          { label: ap.heroSecondaryCtaLabel, href: ap.heroSecondaryCtaUrl },
          { label: ap.heroTertiaryCtaLabel, to: ap.heroTertiaryCtaUrl },
        ]}
        mobileOverlay="gradient-tint"
      />

      {/* Approach — title, then three 405x155 bar cards with a 44px #eaeaf1 icon tile. */}
      <Section width={1280}>
        <SectionTitle
          tagline={ap.approachEyebrow}
          title={composeTitle(ap.approachTitle, ap.approachTitleHighlight)}
          highlight={ap.approachTitleHighlight}
          body={ap.approachSubtitle}
        />
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {approachCards.map((c, i) => {
            const Icon = APPROACH_ICONS[i % APPROACH_ICONS.length];
            return (
              <div key={c.title} className="rounded-lg overflow-hidden rounded-lg overflow-hidden flex min-h-[155px] outline outline-1 -outline-offset-1 outline-black/20 shadow-small">
                <span className="w-[3px] shrink-0 bg-teal-500" aria-hidden="true" />
                <div className="flex gap-6 py-4 pl-8 pr-8">
                  <span className="w-11 h-11 shrink-0 rounded-xl bg-navy-50 flex items-center justify-center text-navy-900">
                    <Icon size={24} strokeWidth={1.5} />
                  </span>
                  <div className="flex flex-col gap-2">
                    <H6 as="h3">{c.title}</H6>
                    <p className="text-sm leading-[150%] text-black">{c.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Full-time — two 624 programme cards. */}
      <Section id="full-time" width={1280}>
        <SectionTitle
          tagline={ap.fullTimeEyebrow}
          title={composeTitle(ap.fullTimeTitle, ap.fullTimeTitleHighlight)}
          highlight={ap.fullTimeTitleHighlight}
          width={881}
        />
        <p className="mt-5 md:mt-6 max-w-[678px] text-base md:text-lg leading-[150%] text-black">{ap.fullTimeSubtitle}</p>
        <div className="mt-20 grid md:grid-cols-2 gap-8 items-start">
          {fullTime.map((p) => (
            <ProgrammeCard key={p._id || p.name} p={p} />
          ))}
        </div>
      </Section>

      {/* Executive — #eaeaf1 band, two cards. */}
      <Section bg="bg-navy-50" width={1280}>
        <SectionTitle
          tagline={ap.executiveEyebrow}
          title={composeTitle(ap.executiveTitle, ap.executiveTitleHighlight)}
          highlight={ap.executiveTitleHighlight}
          body={ap.executiveSubtitle}
        />
        <div className="mt-20 grid md:grid-cols-2 gap-8 items-start">
          {executive.map((p) => (
            <ProgrammeCard key={p._id || p.name} p={p} />
          ))}
        </div>
      </Section>

      {/* Doctoral — one wide card. */}
      <Section width={1280}>
        <SectionTitle
          tagline={ap.doctoralEyebrow}
          title={composeTitle(ap.doctoralTitle, ap.doctoralTitleHighlight)}
          highlight={ap.doctoralTitleHighlight}
          body={ap.doctoralSubtitle}
        />
        <div className="mt-12 flex flex-col gap-12">
          {doctoral.map((p) => (
            <DoctoralCard key={p._id || p.name} p={p} />
          ))}
        </div>
      </Section>

      {/* Compare — navy header row, 64px rows alternating white / #eaeaf1. */}
      <Section id="compare" width={1280}>
        <SectionTitle
          tagline={ap.compareEyebrow}
          title={composeTitle(ap.compareTitle, ap.compareTitleHighlight)}
          highlight={ap.compareTitleHighlight}
          body={ap.compareSubtitle}
        />
        <div className="mt-12 overflow-x-auto rounded-lg">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="bg-navy-900 text-hero h-16">
                {['Programme', 'Duration', 'Mode', 'Seats', 'Fees', 'Admission via'].map((h, i) => (
                  <th key={h} className="px-4 text-base leading-[150%] font-semibold uppercase first:pl-6">
                    <span className="flex items-center gap-2">
                      {h}
                      {i === 0 && <ArrowDown size={20} strokeWidth={1.5} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {programmes.map((p, i) => (
                <tr key={p._id || p.name} className={`h-16 text-black ${i % 2 ? 'bg-navy-50' : 'bg-white'}`}>
                  <td className="pl-6 pr-4 text-base leading-[150%] font-medium">{p.shortName}</td>
                  <td className="px-4 text-sm leading-[150%]">{p.duration}</td>
                  <td className="px-4 text-sm leading-[150%]">{p.mode}</td>
                  <td className="px-4 text-sm leading-[150%]">{p.seats}</td>
                  <td className="px-4 text-sm leading-[150%]">{p.fees}</td>
                  <td className="px-4 text-sm leading-[150%]">{p.admissionVia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Differentiators — six 405x221 cards: H4 36 number, H6 title, 14/150 copy. */}
      <Section width={1280}>
        <SectionTitle
          tagline={ap.differentiatorsEyebrow}
          title={composeTitle(ap.differentiatorsTitle, ap.differentiatorsTitleHighlight)}
          highlight={ap.differentiatorsTitleHighlight}
        />
        <p className="mt-5 md:mt-6 max-w-[678px] text-base md:text-lg leading-[150%] text-black">{ap.differentiatorsSubtitle}</p>
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {differentiators.map((d, i) => (
            <div
              key={d._id || d.title}
              className="flex flex-col justify-center gap-2 min-h-[221px] p-8 rounded-2xl bg-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small"
            >
              <span className="font-display font-medium text-[36px] leading-[130%] tracking-[-0.01em] text-navy-900">
                {String(d.order ?? i + 1).padStart(2, '0')}
              </span>
              <H6 as="h3" className="text-black">
                {d.title}
              </H6>
              <p className="text-sm leading-[150%] text-black">{d.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Faculty — 600 title (bottom-aligned) beside two staggered 292 photo cards. */}
      <Section width={1280}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end">
          <SectionTitle className="lg:pb-2" tagline={ap.facultyEyebrow} title={ap.facultyTitle} body={ap.facultySubtitle} width={600} />
          <div className="grid sm:grid-cols-2 gap-4 items-start">
            {facultyCards.map((c, i) => {
              const src = img(c.image, FACULTY_PHOTOS[i], 584);
              return (
                <div key={c.title} className="flex flex-col gap-4 rounded-b-2xl outline outline-1 -outline-offset-1 outline-black/20">
                  <div
                    className={`${i === 0 ? 'h-[336px]' : 'h-[463px]'} rounded-t-2xl bg-navy-50 bg-cover bg-center outline outline-1 -outline-offset-1 outline-black/20 shadow-small`}
                    style={src ? { backgroundImage: `url('${src}')` } : undefined}
                  />
                  <div className="flex flex-col gap-4 p-6 pt-2">
                    <H5 as="h3" className="text-black">
                      {c.title}
                    </H5>
                    <p className="text-base leading-[150%] text-black">{c.description}</p>
                    <Link
                      to={c.ctaUrl}
                      className="inline-flex items-center gap-3 w-fit h-11 px-6 rounded-md bg-navy-900 text-white text-base leading-[150%] font-medium whitespace-nowrap hover:bg-navy-800 transition-colors"
                    >
                      {c.ctaLabel} <ArrowUpRight size={24} strokeWidth={1.5} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Apply — navy, 64 padding, left column, Eastern Blue tagline. */}
      <section className="bg-navy-900 text-white px-5 py-16 md:p-16 border-t border-white/20">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-[613px]">
            <Tagline className="text-teal-400">{ap.ctaEyebrow}</Tagline>
            <Heading
              text={composeTitle(ap.ctaTitle, ap.ctaTitleHighlight)}
              highlight={ap.ctaTitleHighlight}
              className="text-white mt-4"
              highlightClass="text-teal-400"
            />
            <p className="mt-6 max-w-[504px] text-base md:text-lg leading-[150%]">{ap.ctaSubtitle}</p>
          </div>
          <div className="mt-8 flex flex-col md:flex-row gap-3.5">
            {ctaButtons.map((b) => (
              <HeroButton key={b.label} label={b.label} to={b.url} primary={b.primary} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
