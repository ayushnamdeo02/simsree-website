import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { Section, SectionTitle, Tagline, Heading, H5, H6, Highlighted, AccentCard } from '../components/ui';
import {
  ArrowRight,
  BookOpen,
  Compass,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Lightbulb,
  Rocket,
  Shield,
  Sun,
  Target,
  Trophy,
  UsersRound,
} from 'lucide-react';
import { useHistoryPageData } from '../lib/useHistoryPageData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';
import CountUp from '../components/CountUp';

const fallbackHistoryPage = {
  heroEyebrow: 'Established · 1983',
  heroTitle: 'A legacy built over four decades.',
  heroTitleHighlight: 'over four decades.',
  heroDescription: "Founded in 1983 as an extension of Sydenham College of Commerce, the Sydenham Institute of Management Studies, Research & Entrepreneurship Education (SIMSREE) sits at Churchgate - the very heart of Mumbai's financial district - with unmatched proximity to India's corporate and financial epicentre.",
  heroPrimaryCtaLabel: 'Explore the timeline',
  heroPrimaryCtaUrl: '#timeline',
  heroSecondaryCtaLabel: "Read the Director's message",
  heroSecondaryCtaUrl: '/about/directors-message',
  heroStrip: [
    { year: '1983', label: 'Founded' },
    { year: '1990s', label: 'Executive Programmes' },
    { year: '2000s', label: 'Doctoral Research' },
    { year: '2010s', label: 'NIRF Recognition' },
    { year: '2024', label: 'Dr Homi Bhabha State University' },
    { year: '2025', label: 'FPSB India Award' },
  ],

  locationEyebrow: 'Our Advantage',
  locationTitle: "Steps from India's financial core.",
  locationTitleHighlight: 'financial core.',
  locationBody: "Churchgate puts you minutes from India's most important banks, stock exchanges, and corporate headquarters. That address draws the finest industry talent and gives students unparalleled access to the corporate world. In forty years, SIMSREE has grown from a promising newcomer into one of India's most respected management schools.\n\nOver forty years, SIMSREE has grown from a promising new institute into one of India's most respected management schools. One thing hasn't changed: student-driven learning, entrepreneurial thinking, and an uncompromising standard of academic excellence. Today SIMSREE blends legacy with ambition - new programmes, new partnerships, new ideas.",
  locationQuote: 'At the centre of commerce - not on its periphery.',
  locationStats: [
    { value: '2 min', label: 'to Churchgate station' },
    { value: '0.5 km', label: 'to Bombay Stock Exchange' },
    { value: '1 km', label: 'to RBI headquarters' },
  ],

  timelineEyebrow: 'Milestones',
  timelineTitle: 'Defining moments.',
  timelineTitleHighlight: 'moments.',
  timelineIntro: "From 1983 to today - the moments that shaped SIMSREE. Scroll through forty years of building India's premier management institute.",

  visionEyebrow: 'Purpose',
  visionSectionTitle: 'Vision & Mission.',
  visionSectionTitleHighlight: 'Mission.',
  visionSectionSubtitle: 'Two statements that have not changed since {{foundedYear}}.',
  visionLabel: 'Our Vision',
  visionStatements: [
    'To be a Leader in Management Education and be recognised and respected by the corporate world as an Institution of Academic Excellence.',
    'To mold students into industry-ready and highly resourceful professionals capable of effectively managing business complexities in a globally competitive environment.',
  ],
  missionLabel: 'Our Mission',
  missionCommitments: [
    'To let student initiative be a driving force behind the institution; supervising and guiding the students as and when required.',
    'To maximize industry exposure of students through internships, live projects, guest lectures and management events.',
    'To simulate a temperament of research and culture of entrepreneurship among students.',
    'To instill in students a sense of ingenuity, discipline and commitment to lead their organizations towards resounding success.',
  ],

  valuesEyebrow: 'Core Values',
  valuesTitle: 'What we stand for.',
  valuesTitleHighlight: 'stand for.',
  valuesSubtitle: 'Six values that guide every decision at SIMSREE - from admissions to placements, from classroom debates to flagship events.',

  ctaEyebrow: 'Continue Exploring',
  ctaTitle: 'Read what comes next.',
  ctaTitleHighlight: 'next.',
  ctaSubtitle: 'From history to leadership, recognition to alumni - explore every facet of SIMSREE.',
  ctaCards: [
    {
      tag: 'Leadership',
      title: 'Simerations',
      description: 'An uncompromising standard across academics, research, and student experience.',
      linkLabel: "Read the Director's message",
      linkUrl: '/about/directors-message',
    },
    {
      tag: 'Recognition',
      title: 'Rankings & accreditations',
      description: 'NIRF · AICTE · University of Mumbai affiliation · FPSB India 2025 award.',
      linkLabel: 'See our rankings',
      linkUrl: '/about/rankings',
    },
    {
      tag: 'Network',
      title: 'Illustrious alumni',
      description: 'Five thousand graduates across BFSI, consulting, media, and public service.',
      linkLabel: 'Meet alumni',
      linkUrl: '/about/alumni',
    },
  ],
};

const fallbackMilestones = [
  { year: '1983', category: 'Founding', title: 'SIMSREE established', description: "Sydenham Institute of Management Studies, Research and Entrepreneurship Education founded - extending the legacy of Sydenham College of Commerce, one of Mumbai's oldest commerce colleges.", source: 'First batch · MMS programme · Churchgate campus' },
  { year: '1990s', category: 'Expansion', title: 'Executive programmes introduced', description: "MFM (Master's in Financial Management) and MMM (Master's in Marketing Management) launched on weekends - designed to serve Mumbai's working professionals without compromise on rigour.", source: 'MFM · MMM · weekend cohort model' },
  { year: '2000s', category: 'Research', title: 'Doctoral programme launched', description: "PhD programme started to produce original research across management disciplines - from finance and marketing to operations and organisational behaviour.", source: 'PhD admission · 5 specialisations' },
  { year: '2010s', category: 'Recognition', title: 'Consistent NIRF presence', description: "Inclusion in NIRF national rankings · 120+ corporate recruiters on campus annually · alumni network crosses 4,000 across BFSI, consulting, FMCG, tech, and public service.", source: 'NIRF listed · IIRF Rank 25 · 120+ recruiters' },
  { year: '2024', variant: 'highlight', category: 'Structure', title: 'Cabinet approval · Dr Homi Bhabha State University', description: "State Cabinet approves SIMSREE's integration into Dr Homi Bhabha State University - the next chapter of the institute's structure, opening new pathways for research, autonomy, and inter-institutional collaboration.", source: 'Government of Maharashtra · 2024' },
  { year: 'Nov 2025', category: 'Recognition', title: 'FPSB India · Best Authorised Institutional Partner 2025', description: "Awarded the Best Authorised Institutional Partner 2025 by the Financial Planning Standards Board India · ceremony held in Hyderabad in recognition of the institute's financial planning curriculum and outcomes.", source: 'FPSB India · Hyderabad ceremony' },
  { year: '2026', variant: 'current', ghostLabel: 'NOW', category: 'Today', title: 'M.Sc. Finance · MMM · MFM · AY 2026-27 cycles in progress', description: 'Active admission cycles across all five programmes · MMS opens via Maharashtra CET · 13 student committees run flagship events, placements, and outreach - the next chapter is already being written.', source: '5 programmes · 13 committees · 40+ years strong' },
];

const fallbackCoreValues = [
  { title: 'Excellence', icon: 'trophy', description: 'An uncompromising standard across academics, research, and student experience.' },
  { title: 'Collaboration', icon: 'people', description: 'Faculty, students, alumni, and industry working together - not in silos.' },
  { title: 'Integrity', icon: 'shield', description: 'Zero management quota · merit-only admissions · transparent decision-making.' },
  { title: 'Wisdom', icon: 'book', description: 'Knowledge that is rigorous, relevant, and applied to real problems.' },
  { title: 'Empathy', icon: 'heart', description: 'Leadership grounded in social responsibility - Mrudgandha and beyond.' },
  { title: 'Initiative', icon: 'sun', description: 'The institute runs largely on student initiative · responsibility is the curriculum.' },
];

function imgUrl(image, width) {
  if (!image) return undefined;
  try {
    return urlFor(image).width(width).auto('format').url();
  } catch {
    return undefined;
  }
}

const VALUE_ICONS = {
  trophy: Trophy,
  people: UsersRound,
  shield: Shield,
  book: BookOpen,
  heart: HeartHandshake,
  sun: Sun,
  lightbulb: Lightbulb,
  target: Target,
  handshake: Handshake,
  compass: Compass,
  graduation: GraduationCap,
  rocket: Rocket,
};

// Vision / Mission card heading: a hairline, then the label set large on the right.
function CardHeading({ text, dark = false }) {
  return (
    <div className="flex items-center gap-6">
      <span className={`h-px flex-1 ${dark ? 'bg-white/20' : 'bg-black/20'}`} aria-hidden="true" />
      <h3
        className={`font-display font-medium text-[32px] md:text-[44px] leading-[120%] tracking-[-0.01em] shrink-0 ${
          dark ? 'text-white' : 'text-navy-900'
        }`}
      >
        {text}
      </h3>
    </div>
  );
}

// One numbered statement box on the Vision / Mission cards.
function StatementRow({ n, text, dark = false }) {
  return (
    <li
      className={`rounded flex items-center gap-5 px-4 py-3 min-h-[47px] outline outline-1 -outline-offset-1 ${
        dark ? 'outline-white/20' : 'outline-black/20 shadow-small'
      }`}
    >
      <span className={`font-display font-medium text-[22px] leading-[140%] shrink-0 ${dark ? 'text-teal-400' : 'text-teal-500'}`}>{n}</span>
      <span className={`text-sm leading-[150%] ${dark ? 'text-white' : 'text-black'}`}>{text}</span>
    </li>
  );
}

// Timeline card looks (Figma): white, "highlight" (#FFDB43 at 10%), "current" navy.
// All share radius 16, a black/20 hairline and the "small" shadow.
const TIMELINE_VARIANTS = {
  default: { card: 'bg-white', title: 'text-black', body: 'text-black', rule: 'border-black/20' },
  highlight: { card: 'bg-[#fffbec]', title: 'text-black', body: 'text-black', rule: 'border-black/20' },
  current: { card: 'bg-navy-900', title: 'text-white', body: 'text-white', rule: 'border-white/20' },
};

// Figma "Card": 588 wide, padding 32. Cards left of the spine are right-aligned so
// they hug the centre. Label (Eastern Blue 20 SemiBold) → title (H5 28) → copy
// (14/150) → hairline → source line (18/150).
function TimelineCard({ category, title, description, source, align = 'left', variant = 'default' }) {
  const v = TIMELINE_VARIANTS[variant] || TIMELINE_VARIANTS.default;
  const right = align === 'right';
  return (
    <div
      className={`${v.card} rounded-2xl p-6 md:p-8 outline outline-1 -outline-offset-1 outline-black/20 shadow-small ${
        right ? 'text-right' : 'text-left'
      }`}
    >
      {/* The year itself sits in the large faded figure beside the spine (and in
          the pill above the card on mobile), so the card leads with its label. */}
      <Tagline className="text-teal-500 !text-lg md:!text-xl">{category}</Tagline>
      <H5 as="h3" className={`mt-3 ${v.title}`}>
        {title}
      </H5>
      <p className={`mt-2 text-sm leading-[150%] ${v.body}`}>{description}</p>
      {source && <p className={`mt-4 pt-4 border-t text-base md:text-lg leading-[150%] ${v.rule} ${v.body}`}>{source}</p>}
    </div>
  );
}

// Three-dot spine marker (Figma "circles_ext", 24x24, Eastern Blue).
function SpineIcon({ icon }) {
  if (icon) return <img src={icon} alt="" className="w-6 h-6 object-cover rounded-full" />;
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
      <g fill="none" stroke="var(--color-teal-500)" strokeWidth="2.3">
        <circle cx="12.02" cy="5.49" r="2.95" />
        <circle cx="4.58" cy="17.53" r="2.95" />
        <circle cx="19.46" cy="17.53" r="2.95" />
      </g>
      <circle cx="12.02" cy="13.05" r="2.05" fill="var(--color-teal-500)" />
    </svg>
  );
}

// Figma "Timeline Item": 1280 row = 588 card · 24 spine · 588 ghost year, 40 gaps.
// The spine is two 2px black rules either side of the icon, 16px clear.
function TimelineRow({ milestone, icon, side }) {
  const isCurrent = milestone.variant === 'current';
  const card = <TimelineCard {...milestone} align={side === 'left' ? 'right' : 'left'} />;
  // The ghost year is H2 52 in navy at 40%; the current milestone shows its label
  // (e.g. "NOW") in Eastern Blue instead.
  const ghost = (
    <div
      className={`hidden lg:block font-display font-medium text-[52px] leading-[120%] tracking-[-0.01em] ${
        isCurrent ? 'text-teal-500' : 'text-navy-900/40'
      } ${side === 'left' ? 'text-left' : 'text-right'}`}
    >
      {isCurrent ? milestone.ghostLabel || milestone.year : milestone.year}
    </div>
  );
  const spine = (
    <div className="hidden lg:flex flex-col items-center gap-4 self-stretch" aria-hidden="true">
      <span className="flex-1 w-0.5 bg-black" />
      <SpineIcon icon={icon} />
      <span className="flex-1 w-0.5 bg-black" />
    </div>
  );

  return (
    <div className="grid gap-4 lg:gap-10 items-center lg:grid-cols-[588px_24px_588px]">
      {/* Mobile: the year sits in a pill above the card. */}
      <span className="lg:hidden w-fit bg-white text-navy-900 text-sm font-semibold px-2.5 py-1 rounded-2xl outline outline-1 -outline-offset-1 outline-black/20">
        {milestone.year}
      </span>
      {side === 'left' ? (
        <>
          {card}
          {spine}
          {ghost}
        </>
      ) : (
        <>
          {ghost}
          {spine}
          {card}
        </>
      )}
    </div>
  );
}

export default function History() {
  const facts = useKeyFacts();
  const { data } = useHistoryPageData();

  const hp = fillFactsDeep({ ...fallbackHistoryPage, ...(data?.historyPage || {}) }, facts);
  const milestones = fillFactsDeep(data?.milestones?.length ? data.milestones : fallbackMilestones, facts);
  const coreValues = fillFactsDeep(data?.coreValues?.length ? data.coreValues : fallbackCoreValues, facts);
  const visionStatements = hp.visionStatements || [];
  const commitments = hp.missionCommitments || [];

  const locationImageUrl = imgUrl(hp.locationImage, 1300) || '/images/history/location.webp';

  return (
    <div>
      <PageHero
        image={heroImage(hp.heroImage, '/images/history/hero.webp', { stretch: true })}
        eyebrow={hp.heroEyebrow}
        eyebrowStyle="rule"
        // Figma breaks the title before the highlighted phrase ("A legacy built /
        // over four decades."); force that break, as browser metrics run wider.
        title={`${hp.heroTitle.replace(hp.heroTitleHighlight, '').trim()}\n${hp.heroTitleHighlight}`}
        titleWidth={720}
        description={hp.heroDescription}
        descriptionWidth={628}
        actions={[
          { label: hp.heroPrimaryCtaLabel, href: hp.heroPrimaryCtaUrl, primary: true },
          { label: hp.heroSecondaryCtaLabel, to: hp.heroSecondaryCtaUrl },
        ]}
        mobileOverlay="dark"
        mobileTitle="text-[40px] leading-[120%]"
        mobileActions="full"
      />

      {/* Milestone strip — Figma: a 48px navy band under the photo, Inter 14/150
          uppercase, 44px apart. It scrolls continuously; the track holds two
          identical halves so the -50% loop is seamless. */}
      <div className="h-12 flex items-center overflow-hidden bg-navy-900 text-white">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((half) => (
            <div key={half} className="flex items-center shrink-0" aria-hidden={half === 1}>
              {(hp.heroStrip || []).map((s) => (
                <span key={`${half}-${s.year}`} className="pr-11 text-sm leading-[150%] uppercase whitespace-nowrap">
                  {s.year} · {s.label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Location Advantage — Figma "Component": 1312 card (632 copy + 48 gap + 632 photo),
          radius 16, hairline + "small" shadow; copy column padded 32 with 32 gaps. */}
      <section className="px-5 py-12 md:px-16 md:py-20">
        <div className="max-w-[1312px] mx-auto bg-white rounded-2xl outline outline-1 -outline-offset-1 outline-black/20 shadow-small overflow-hidden grid lg:grid-cols-[632px_1fr] gap-8 lg:gap-12">
          <div className="p-6 md:p-8 flex flex-col gap-8">
            <Tagline>{hp.locationEyebrow}</Tagline>
            <div className="flex flex-col gap-6">
              <Heading text={composeTitle(hp.locationTitle, hp.locationTitleHighlight)} highlight={hp.locationTitleHighlight} />
              <div className="text-base md:text-lg leading-[150%] text-black">
                {(hp.locationBody || '').split('\n\n').map((para, i) => (
                  <p key={i} className={i > 0 ? 'mt-[1.5em]' : undefined}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-5">
              {(hp.locationStats || []).map((s) => (
                <div key={s.label} className="flex flex-col gap-2">
                  <H5 as="div"><CountUp value={s.value} /></H5>
                  <div className="text-base leading-[150%] text-black">{s.label}</div>
                </div>
              ))}
            </div>
            {/* Figma: 64 tall hairline box, 3px Eastern Blue bar, 32 inset, H6 22 navy. */}
            <blockquote className="rounded-lg overflow-hidden rounded-lg overflow-hidden flex items-stretch outline outline-1 -outline-offset-1 outline-black/20 shadow-small">
              <span className="w-[3px] shrink-0 bg-teal-500" aria-hidden="true" />
              <span className="py-4 px-8 font-display font-medium text-[22px] leading-[140%] tracking-[-0.01em] text-navy-900">
                &ldquo;{hp.locationQuote}&rdquo;
              </span>
            </blockquote>
          </div>
          <div
            className="h-72 lg:h-auto lg:min-h-[818px] bg-navy-50 rounded-2xl bg-cover bg-center"
            style={locationImageUrl ? { backgroundImage: `url('${locationImageUrl}')` } : undefined}
          />
        </div>
      </section>

      {/* Milestones — Figma "Blog / 36 /" on #eaeaf1: centred 768 title, then timeline
          rows 80 apart. */}
      <Section id="timeline" bg="bg-navy-50" width={1280}>
        <SectionTitle
          center
          tagline={hp.timelineEyebrow}
          title={composeTitle(hp.timelineTitle, hp.timelineTitleHighlight)}
          highlight={hp.timelineTitleHighlight}
          body={hp.timelineIntro}
        />
        <div className="mt-10 md:mt-12 flex flex-col gap-10 lg:gap-20">
          {milestones.map((m, i) => (
            <TimelineRow
              key={m._id || m.year}
              milestone={m}
              icon={imgUrl(m.icon, 80)}
              side={i % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </Section>

      {/* Vision & Mission — two 600 cards, 80 gap: navy Vision and the Eastern Blue
          barred Mission card, each a large heading after a hairline and its
          statements as numbered boxes. */}
      <Section width={1280}>
        <SectionTitle
          center
          tagline={hp.visionEyebrow}
          title={composeTitle(hp.visionSectionTitle, hp.visionSectionTitleHighlight)}
          highlight={hp.visionSectionTitleHighlight}
        />
        <p className="mt-5 md:mt-6 max-w-[678px] mx-auto text-center text-base md:text-lg leading-[150%] text-black">
          {hp.visionSectionSubtitle}
        </p>

        <div className="mt-10 md:mt-12 grid lg:grid-cols-2 gap-10 lg:gap-20">
          <div className="rounded-xl bg-navy-900 text-white p-6 md:p-8 outline outline-1 -outline-offset-1 outline-black/20 shadow-small">
            <CardHeading text={hp.visionLabel} dark />
            <ol className="mt-8 flex flex-col gap-5">
              {visionStatements.map((v, i) => (
                <StatementRow key={i} n={i + 1} text={v} dark />
              ))}
            </ol>
          </div>

          <AccentCard className="[&>div]:pb-8">
            <CardHeading text={hp.missionLabel} />
            <ol className="mt-8 flex flex-col gap-4">
              {commitments.map((c, i) => (
                <StatementRow key={i} n={i + 1} text={c} />
              ))}
            </ol>
          </AccentCard>
        </div>
      </Section>

      {/* Core Values — on Astronaut Lightest: navy cards (radius 16, padded 32, 32
          apart) with a white icon disc and the number on top, a short rule under
          the title. The icon is picked per value in the Studio. */}
      <Section bg="bg-navy-50" width={1280}>
        <SectionTitle
          center
          tagline={hp.valuesEyebrow}
          title={composeTitle(hp.valuesTitle, hp.valuesTitleHighlight)}
          highlight={hp.valuesTitleHighlight}
        />
        <p className="mt-5 md:mt-6 max-w-[678px] mx-auto text-center text-base md:text-lg leading-[150%] text-black">
          {hp.valuesSubtitle}
        </p>
        <div className="mt-10 md:mt-12 grid md:grid-cols-3 gap-8">
          {coreValues.map((v, i) => {
            const Icon = VALUE_ICONS[v.icon] || Trophy;
            return (
              <div
                key={v._id || v.title}
                className="flex flex-col p-8 rounded-2xl bg-navy-900 text-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="w-10 h-10 rounded-full bg-white text-navy-900 flex items-center justify-center shrink-0" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <span className="font-display font-medium text-[22px] leading-[140%] text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <H5 className="mt-4 text-white">{v.title}</H5>
                <span className="mt-2 block w-20 h-px bg-white/30" aria-hidden="true" />
                <p className="mt-4 text-sm leading-[150%] text-white/85">{v.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Continue Exploring — Figma "CTA / 57 /" on #24295c: 405x222 navy cards. */}
      <Section bg="bg-navy-800" width={1280} className="border-t border-white/20">
        <SectionTitle
          center
          dark
          tagline={hp.ctaEyebrow}
          title={composeTitle(hp.ctaTitle, hp.ctaTitleHighlight)}
          highlight={hp.ctaTitleHighlight}
          body={hp.ctaSubtitle}
        />
        <div className="mt-10 md:mt-12 grid md:grid-cols-3 gap-8">
          {(hp.ctaCards || []).map((c) => (
            <div
              key={c.title}
              className="flex flex-col justify-center gap-4 min-h-[222px] p-8 rounded-2xl bg-navy-900 text-white outline outline-1 -outline-offset-1 outline-white/20 shadow-small"
            >
              <span className="text-sm leading-[150%] uppercase text-teal-400">{c.tag}</span>
              <div className="flex flex-col gap-2">
                <H6 as="h3" className="text-white">
                  {c.title}
                </H6>
                <p className="text-sm leading-[150%] text-ink-50">{c.description}</p>
              </div>
              <Link to={c.linkUrl} className="flex items-center gap-2 w-fit text-sm leading-[150%] hover:underline underline-offset-2">
                {c.linkLabel} <ArrowRight size={24} strokeWidth={1.5} />
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
