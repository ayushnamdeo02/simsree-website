import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useHistoryPageData } from '../lib/useHistoryPageData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackHistoryPage = {
  heroEyebrow: 'Established · 1983',
  heroTitle: 'A legacy built over four decades.',
  heroTitleHighlight: 'over four decades.',
  heroDescription: "Founded in 1983 as an extension of Sydenham College of Commerce, the Sydenham Institute of Management Studies, Research & Entrepreneurship Education (SIMSREE) sits at Churchgate — the very heart of Mumbai's financial district — with unmatched proximity to India's corporate and financial epicentre.",
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
  locationBody: "Churchgate puts you minutes from India's most important banks, stock exchanges, and corporate headquarters. That address draws the finest industry talent and gives students unparalleled access to the corporate world. In forty years, SIMSREE has grown from a promising newcomer into one of India's most respected management schools.\n\nOver forty years, SIMSREE has grown from a promising new institute into one of India's most respected management schools. One thing hasn't changed: student-driven learning, entrepreneurial thinking, and an uncompromising standard of academic excellence. Today SIMSREE blends legacy with ambition — new programmes, new partnerships, new ideas.",
  locationQuote: 'At the centre of commerce — not on its periphery.',
  locationStats: [
    { value: '2 min', label: 'to Churchgate station' },
    { value: '0.5 km', label: 'to Bombay Stock Exchange' },
    { value: '1 km', label: 'to RBI headquarters' },
  ],

  timelineEyebrow: 'Milestones',
  timelineTitle: 'Defining moments.',
  timelineTitleHighlight: 'moments.',
  timelineIntro: "From 1983 to today — the moments that shaped SIMSREE. Scroll through forty years of building India's premier management institute.",

  visionEyebrow: 'Purpose',
  visionSectionTitle: 'Vision & Mission.',
  visionSectionTitleHighlight: 'Mission.',
  visionSectionSubtitle: 'Two statements that have not changed since {{foundedYear}}.',
  visionLabel: 'Our Vision',
  visionNumber: '01',
  visionTitle: 'To be a leader in management education.',
  visionTitleHighlight: 'management education.',
  visionDescription: 'Recognised and respected for the academic rigour and outcomes of its programmes — a leader students want to join, employers want to hire from, and peers want to compete against.',
  missionLabel: 'Our Mission',
  missionNumber: '02',
  missionTitle: 'Four commitments we make.',
  missionTitleHighlight: 'commitments',
  missionIntro: 'See the most recent placement report · sector split · firms that hire repeatedly · summer and executive outcomes.',
  missionCommitments: [
    'Let student initiative drive the institution.',
    'Maximise real-world exposure — internships, live projects, guest lectures, management events.',
    'Foster a culture of research, inquiry, and entrepreneurial thinking.',
    'Instil discipline, integrity, and ambition to lead organisations toward lasting success.',
  ],

  valuesEyebrow: 'Core Values',
  valuesTitle: 'What we stand for.',
  valuesTitleHighlight: 'stand for.',
  valuesSubtitle: 'Six values that guide every decision at SIMSREE — from admissions to placements, from classroom debates to flagship events.',

  ctaEyebrow: 'Continue Exploring',
  ctaTitle: 'Read what comes next.',
  ctaTitleHighlight: 'next.',
  ctaSubtitle: 'From history to leadership, recognition to alumni — explore every facet of SIMSREE.',
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
  { year: '1983', category: 'Founding', title: 'SIMSREE established', description: "Sydenham Institute of Management Studies, Research and Entrepreneurship Education founded — extending the legacy of Sydenham College of Commerce, one of Mumbai's oldest commerce colleges.", source: 'First batch · MMS programme · Churchgate campus' },
  { year: '1990s', category: 'Expansion', title: 'Executive programmes introduced', description: "MFM (Master's in Financial Management) and MMM (Master's in Marketing Management) launched on weekends — designed to serve Mumbai's working professionals without compromise on rigour.", source: 'MFM · MMM · weekend cohort model' },
  { year: '2000s', category: 'Research', title: 'Doctoral programme launched', description: "PhD programme started to produce original research across management disciplines — from finance and marketing to operations and organisational behaviour.", source: 'PhD admission · 5 specialisations' },
  { year: '2010s', category: 'Recognition', title: 'Consistent NIRF presence', description: "Inclusion in NIRF national rankings · 120+ corporate recruiters on campus annually · alumni network crosses 4,000 across BFSI, consulting, FMCG, tech, and public service.", source: 'NIRF listed · IIRF Rank 25 · 120+ recruiters' },
  { year: '2024', variant: 'highlight', category: 'Structure', title: 'Cabinet approval · Dr Homi Bhabha State University', description: "State Cabinet approves SIMSREE's integration into Dr Homi Bhabha State University — the next chapter of the institute's structure, opening new pathways for research, autonomy, and inter-institutional collaboration.", source: 'Government of Maharashtra · 2024' },
  { year: 'Nov 2025', category: 'Recognition', title: 'FPSB India · Best Authorised Institutional Partner 2025', description: "Awarded the Best Authorised Institutional Partner 2025 by the Financial Planning Standards Board India · ceremony held in Hyderabad in recognition of the institute's financial planning curriculum and outcomes.", source: 'FPSB India · Hyderabad ceremony' },
  { year: '2026', variant: 'current', ghostLabel: 'NOW', category: 'Today', title: 'M.Sc. Finance · MMM · MFM · AY 2026-27 cycles in progress', description: 'Active admission cycles across all five programmes · MMS opens via Maharashtra CET · 13 student committees run flagship events, placements, and outreach — the next chapter is already being written.', source: '5 programmes · 13 committees · 40+ years strong' },
];

const fallbackCoreValues = [
  { title: 'Excellence', description: 'An uncompromising standard across academics, research, and student experience.' },
  { title: 'Collaboration', description: 'Faculty, students, alumni, and industry working together — not in silos.' },
  { title: 'Integrity', description: 'Zero management quota · merit-only admissions · transparent decision-making.' },
  { title: 'Wisdom', description: 'Knowledge that is rigorous, relevant, and applied to real problems.' },
  { title: 'Empathy', description: 'Leadership grounded in social responsibility — Mrudgandha and beyond.' },
  { title: 'Initiative', description: 'The institute runs largely on student initiative · responsibility is the curriculum.' },
];

function HashLink({ to, ...props }) {
  if (to?.startsWith('#')) {
    return <a href={to} {...props} />;
  }
  return <Link to={to} {...props} />;
}

function imgUrl(image, width) {
  if (!image) return undefined;
  try {
    return urlFor(image).width(width).auto('format').url();
  } catch {
    return undefined;
  }
}

function TitleWithHighlight({ text, highlight, className }) {
  const idx = text.indexOf(highlight);
  if (idx === -1) {
    return <h2 className={className}>{text}</h2>;
  }
  const before = text.slice(0, idx);
  const after = text.slice(idx + highlight.length);
  return (
    <h2 className={className}>
      {before}
      <span className="text-teal-500">{highlight}</span>
      {after}
    </h2>
  );
}

// Cards on the left of the spine align their text right, so it hugs the centre (Figma).
// Three card looks (Figma): default white, "highlight" cream, and "current" solid navy.
const TIMELINE_VARIANTS = {
  default: {
    card: 'bg-white border border-navy-100',
    category: 'text-teal-500',
    year: 'text-navy-900',
    title: 'text-ink-900',
    body: 'text-black',
    source: 'border-t border-navy-100 text-black',
  },
  highlight: {
    card: 'bg-[#F2EFE6] border border-[#E3DECC]',
    category: 'text-teal-500',
    year: 'text-navy-900',
    title: 'text-ink-900',
    body: 'text-black',
    source: 'border-t border-[#E3DECC] text-black',
  },
  current: {
    card: 'bg-navy-900 border border-navy-900',
    category: 'text-sky-300',
    year: 'text-white',
    title: 'text-white',
    body: 'text-white/80',
    source: 'border-t border-white/20 text-white/60',
  },
};

function TimelineCard({ category, year, title, description, source, align = 'left', variant = 'default' }) {
  const alignClass = align === 'right' ? 'text-right' : 'text-left';
  const v = TIMELINE_VARIANTS[variant] || TIMELINE_VARIANTS.default;
  return (
    <div className={`${v.card} rounded-2xl px-6 py-6 shadow-sm ${alignClass}`}>
      {/* Figma: Heading/Tagline 16/150, Eastern Blue/Base. */}
      <span className={`text-base leading-[150%] uppercase ${v.category}`}>{category}</span>
      {/* Figma: Heading/H2 52/120. */}
      <div className={`font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-2 ${v.year}`}>{year}</div>
      {/* Figma: Heading/H5 28/140, Colour/Neutral/Darkest. */}
      <h4 className={`font-display text-2xl md:text-[28px] md:leading-[140%] font-medium mt-2 mb-3 ${v.title}`}>{title}</h4>
      {/* Figma: Text/Small/Normal 14/150. */}
      <p className={`text-sm leading-[150%] mb-4 ${v.body}`}>{description}</p>
      {source && <p className={`pt-4 text-sm leading-[150%] ${v.source}`}>{source}</p>}
    </div>
  );
}

function TimelineRow({ milestone, icon, side }) {
  const isCurrent = milestone.variant === 'current';
  const card = <TimelineCard {...milestone} align={side === 'left' ? 'right' : 'left'} />;
  // The current milestone shows its label (e.g. "NOW") in teal rather than the year.
  const yearGhost = (
    <div
      className={`hidden lg:flex text-6xl font-display font-semibold items-center ${
        isCurrent ? 'text-teal-500' : 'text-navy-100'
      } ${side === 'left' ? 'justify-start pl-32' : 'justify-end pr-32'}`}
    >
      {isCurrent ? milestone.ghostLabel || milestone.year : milestone.year}
    </div>
  );

  return (
    <div
      className={`relative grid gap-6 items-center lg:gap-10 ${
        side === 'left' ? 'lg:grid-cols-[524px_1fr]' : 'lg:grid-cols-[1fr_524px]'
      }`}
    >
      {/* Figma parts the spine around the icon with ~8px of clear space either
          side, and the segments meet the neighbouring rows so the line reads as
          continuous down the page. */}
      <span
        className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-0.5 bg-ink-900"
        style={{ top: 0, bottom: 'calc(50% + 20px)' }}
        aria-hidden="true"
      />
      <span
        className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-0.5 bg-ink-900"
        style={{ top: 'calc(50% + 20px)', bottom: 0 }}
        aria-hidden="true"
      />

      {/* Spine marker — three-dot cluster; the year is carried by the ghost text (Figma) */}
      <span className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-navy-50 items-center justify-center z-10">
        {icon ? (
          <img src={icon} alt="" className="w-full h-full object-cover rounded-full" />
        ) : (
          // Figma vector: 20.58x19.44 at left 1.73 / top 1.79 inside the 24x24
          // frame — three #238BBC rings (7.4 outer diameter, ~2.5 stroke) with a
          // 4.4 solid dot centred between them.
          <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
            <g fill="none" stroke="var(--color-teal-500)" strokeWidth="2.3">
              <circle cx="12.02" cy="5.49" r="2.95" />
              <circle cx="4.58" cy="17.53" r="2.95" />
              <circle cx="19.46" cy="17.53" r="2.95" />
            </g>
            <circle cx="12.02" cy="13.05" r="2.05" fill="var(--color-teal-500)" />
          </svg>
        )}
      </span>

      {/* Mobile: year pill above card */}
      <span className="lg:hidden inline-block bg-navy-50 text-navy-800 text-xs font-semibold px-2.5 py-1 rounded-full w-fit">
        {milestone.year}
      </span>

      {side === 'left' ? (
        <>
          {card}
          {yearGhost}
        </>
      ) : (
        <>
          {yearGhost}
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
  const commitments = hp.missionCommitments || [];

  const heroImageUrl = imgUrl(hp.heroImage, 1600);
  const locationImageUrl = imgUrl(hp.locationImage, 1000);

  return (
    <div>
      {/* Hero */}
      <section
        className="min-h-[600px] md:h-[767px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: heroImageUrl
            ? `url('${heroImageUrl}')`
            : "linear-gradient(180deg, #8a8f9e, #cfd3da)",
        }}
      >
        {/* Figma: linear gradient layer at 30% over the image. */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(25deg, rgba(0,0,0,0.3) 0%, rgba(51,51,51,0.3) 51%, rgba(102,102,102,0.3) 99%)',
          }}
        />
        {/* pt clears the fixed header; pb accounts for the milestone strip below */}
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-16 pt-32 pb-24 md:pb-[112px] md:h-full flex flex-col justify-end text-white">
          {/* Eyebrow flanked by rules on both sides (Figma) */}
          <span className="flex w-fit items-center gap-5 text-white text-sm font-medium uppercase tracking-[0.2em] mb-9">
            <span className="h-px w-16 bg-white/50" aria-hidden="true" />
            {hp.heroEyebrow}
            <span className="h-px w-16 bg-white/50" aria-hidden="true" />
          </span>
          {/* Figma H1 is 628 Fill but the text hugs; "over four decades." measures
              682px at 72px, so widen the heading to keep the designed two lines. */}
          <h1 className="font-display text-4xl md:text-[72px] md:leading-[120%] font-semibold mb-4 max-w-[720px]">
            {hp.heroTitle.replace(hp.heroTitleHighlight, '').trim()}
            <br />
            {hp.heroTitleHighlight}
          </h1>
          {/* Figma: Body medium Normal 18/150, W 628. */}
          <p className="max-w-[628px] text-lg leading-[150%] text-white mb-9">{hp.heroDescription}</p>
          <div className="flex flex-wrap gap-3">
            <HashLink to={hp.heroPrimaryCtaUrl} className="bg-sky-600 outline outline-1 outline-sky-600 hover:bg-sky-500 transition-colors text-white text-base leading-[150%] font-medium px-6 py-2.5 rounded-md flex items-center gap-3 w-fit">
              {hp.heroPrimaryCtaLabel} <ArrowUpRight size={16} />
            </HashLink>
            <Link to={hp.heroSecondaryCtaUrl} className="bg-white hover:bg-gray-100 transition-colors text-ink-900 text-base leading-[150%] font-medium px-6 py-2.5 rounded-md w-fit">
              {hp.heroSecondaryCtaLabel}
            </Link>
          </div>
        </div>

        {/* Bottom milestone strip — 48px tall, continuously scrolling marquee.
            The track holds two identical halves so the -50% loop is seamless. */}
        <div className="absolute bottom-0 left-0 right-0 h-12 flex items-center overflow-hidden bg-navy-900">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((half) => (
              <div key={half} className="flex items-center shrink-0" aria-hidden={half === 1}>
                {(hp.heroStrip || []).map((s) => (
                  <span key={`${half}-${s.year}`} className="px-8 text-xs font-medium whitespace-nowrap text-white">
                    <span className="font-semibold">{s.year}</span>
                    <span className="text-white/60"> · </span>
                    <span className="text-white/80 uppercase tracking-wide">{s.label}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Advantage — 1312 card (632 text + 48 gap + 632 image), 16px radius (Figma) */}
      <section className="py-16 lg:py-28">
        <div className="max-w-[1312px] mx-auto px-6 lg:px-0">
          <div className="bg-white border border-navy-100 shadow-md rounded-2xl overflow-hidden grid lg:grid-cols-[632px_1fr] gap-8 lg:gap-12">
            <div className="p-6 lg:p-8 flex flex-col gap-6">
              {/* Figma: Heading/Tagline 16/150, Color Scheme 1/Text. */}
              <span className="text-base leading-[150%] font-semibold uppercase text-black">{hp.locationEyebrow}</span>
              <TitleWithHighlight
                text={hp.locationTitle}
                highlight={hp.locationTitleHighlight}
                className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900"
              />
              {/* Figma: Text/Medium/Normal 18/150, Color Scheme 1/Text. */}
              <div className="flex flex-col gap-6">
                {(hp.locationBody || '').split('\n\n').map((para, i) => (
                  <p key={i} className="text-lg leading-[150%] text-black">{para}</p>
                ))}
              </div>
              {/* Stats sit above the pull-quote (Figma) */}
              {/* Figma keeps the three stats on one row across the 568px column. */}
              <div className="flex flex-wrap gap-x-6 gap-y-6">
                {(hp.locationStats || []).map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-2xl md:text-[28px] md:leading-[140%] font-medium text-navy-900">{s.value}</div>
                    {/* Figma: Text/Regular/Normal 16/150, Color Scheme 1/Text. */}
                    <div className="text-base leading-[150%] text-black mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <blockquote className="border border-black/15 border-l-2 border-l-teal-500 px-5 py-4 font-display text-xl md:text-[22px] md:leading-[140%] text-navy-900">
                "{hp.locationQuote}"
              </blockquote>
            </div>
            <div
              className="h-72 lg:h-auto lg:min-h-[818px] bg-gray-200 rounded-2xl bg-cover bg-center"
              style={locationImageUrl ? { backgroundImage: `url('${locationImageUrl}')` } : undefined}
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      {/* Milestones — 1280 inner, 112px padding, no container box (Figma) */}
      <section id="timeline" className="bg-navy-50 py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="text-center max-w-[768px] mx-auto mb-10 lg:mb-20">
            {/* Figma: Heading/Tagline 16/150, Color Scheme 1/Text. */}
            <span className="text-base leading-[150%] font-semibold uppercase text-black">{hp.timelineEyebrow}</span>
            <TitleWithHighlight
              text={hp.timelineTitle}
              highlight={hp.timelineTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-6"
            />
            {/* Figma: Text/Medium/Normal 18/150, Color Scheme 1/Text. */}
            <p className="text-lg leading-[150%] text-black">{hp.timelineIntro}</p>
          </div>

          <div className="flex flex-col gap-10">
          {milestones.map((m, i) => (
            <TimelineRow
              key={m._id || m.year}
              milestone={m}
              icon={imgUrl(m.icon, 80)}
              side={i % 2 === 0 ? 'left' : 'right'}
            />
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission — 1280 inner, 600px cards, 80px gap (Figma) */}
      <section className="py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="text-center max-w-[768px] mx-auto mb-10 lg:mb-20">
            {/* Figma: Heading/Tagline 16/150, Color Scheme 1/Text. */}
            <span className="text-base leading-[150%] font-semibold uppercase text-black">{hp.visionEyebrow}</span>
            <TitleWithHighlight
              text={hp.visionSectionTitle}
              highlight={hp.visionSectionTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-4"
            />
            {/* Figma: Text/Medium/Normal 18/150, Color Scheme 1/Text. */}
            <p className="text-lg leading-[150%] text-black">{hp.visionSectionSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-navy-900 text-white p-8">
              <div className="flex items-center gap-4 mb-8">
                {/* Figma: Heading/Tagline 16/150, Colour/Neutral/White. */}
                <span className="text-base leading-[150%] font-semibold uppercase text-white">{hp.visionLabel}</span>
                <span className="h-px flex-1 bg-white/20" aria-hidden="true" />
                {/* Figma: Heading/H2 52/120, white at 50%. */}
                <span className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-white/50">{hp.visionNumber}</span>
              </div>
              <TitleWithHighlight
                text={hp.visionTitle}
                highlight={hp.visionTitleHighlight}
                className="font-display text-2xl md:text-[28px] md:leading-[140%] font-medium mb-4"
              />
              {/* Figma: Text/Medium/Normal 18/150 on the navy card. */}
              <p className="text-white text-lg leading-[150%]">{hp.visionDescription}</p>
            </div>

            <div className="bg-white border border-navy-100 border-l-2 border-l-sky-600 p-8">
              <div className="flex items-center gap-4 mb-8">
                {/* Figma: Heading/Tagline 16/150, Colour/Astronaut/Base. */}
                <span className="text-base leading-[150%] font-semibold uppercase text-navy-900">{hp.missionLabel}</span>
                <span className="h-px flex-1 bg-navy-100" aria-hidden="true" />
                {/* Figma: Heading/H2 52/120. */}
                <span className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-300">{hp.missionNumber}</span>
              </div>
              <TitleWithHighlight
                text={hp.missionTitle}
                highlight={hp.missionTitleHighlight}
                className="font-display text-2xl md:text-[28px] md:leading-[140%] font-medium text-navy-900 mb-4"
              />
              {/* Figma: Text/Medium/Normal 18/150, Color Scheme 1/Text. */}
              <p className="text-lg leading-[150%] text-black mb-6">{hp.missionIntro}</p>
              {/* Figma: 536x47 boxes, padding 16/8, gap 20, radius 0, 1px inside
                  border and a small shadow — each row is its own box. */}
              <ul className="flex flex-col gap-5">
                {commitments.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-5 px-4 py-3 text-sm leading-[150%] text-black border border-black/15 shadow-sm"
                  >
                    {/* Figma: Heading/H6 22/140, Colour/Eastern Blue/Base. */}
                    <span className="font-display text-xl md:text-[22px] md:leading-[140%] text-teal-500 shrink-0">{i + 1}</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values — 1280 inner, 405.33 cards, 16px radius (Figma) */}
      <section className="py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-10 lg:mb-20">
            {/* Figma: Heading/Tagline 16/150, Color Scheme 1/Text. */}
            <span className="text-base leading-[150%] font-semibold uppercase text-black">{hp.valuesEyebrow}</span>
            <TitleWithHighlight
              text={hp.valuesTitle}
              highlight={hp.valuesTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-6"
            />
            {/* Figma: Text/Medium/Normal 18/150, Color Scheme 1/Text, W 678. */}
            <p className="max-w-[678px] mx-auto text-lg leading-[150%] text-black">{hp.valuesSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {coreValues.map((v, i) => (
              <div
                key={v._id || v.title}
                className="outline outline-1 outline-black/15 shadow-md rounded-2xl p-8 md:min-h-[208px]"
              >
                {/* Figma: Heading/H4 36/130, Colour/Astronaut/Base. */}
                <span className="font-display text-3xl md:text-[36px] md:leading-[130%] font-semibold text-navy-900">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Figma: Heading/H5 28/140, Colour/Neutral/Darkest. */}
                <h4 className="font-display text-2xl md:text-[28px] md:leading-[140%] font-medium text-ink-900 mt-3 mb-2">{v.title}</h4>
                {/* Figma: Text/Small/Normal 14/150, Color Scheme 1/Text. */}
                <p className="text-sm leading-[150%] text-black">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Continue Exploring — 1280 inner, 405.33 cards, teal left accent (Figma) */}
      <section className="bg-navy-800 text-white py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="text-center max-w-[768px] mx-auto mb-10 lg:mb-20">
            {/* Figma: Heading/Tagline 16/150, Colour/Neutral/White. */}
            <span className="text-base leading-[150%] font-semibold uppercase text-white">{hp.ctaEyebrow}</span>
            <TitleWithHighlight
              text={hp.ctaTitle}
              highlight={hp.ctaTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-6 mb-6"
            />
            {/* Figma: Text/Medium/Normal 18/150, Color Scheme 3/Text. */}
            <p className="text-lg leading-[150%] text-white">{hp.ctaSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {(hp.ctaCards || []).map((c) => (
              <div
                key={c.title}
                className="bg-navy-900 outline outline-1 outline-white/20 shadow-md rounded-2xl p-8 md:min-h-[222px] flex flex-col"
              >
                {/* Figma: Body small Normal 14/150, Colour/Eastern Blue/Light (#65ADD0). */}
                <span className="text-sm leading-[150%] uppercase text-teal-400">{c.tag}</span>
                {/* Figma: Heading/H5 28/140. */}
                <h4 className="font-display text-2xl md:text-[28px] md:leading-[140%] font-medium mt-2 mb-3">{c.title}</h4>
                {/* Figma: Text/Small/Normal 14/150, Colour/Neutral/Lightest (#F2F2F2). */}
                <p className="text-sm leading-[150%] text-ink-50 mb-4">{c.description}</p>
                <Link to={c.linkUrl} className="text-base leading-[150%] font-medium text-white flex items-center gap-2 w-fit mt-auto">
                  {c.linkLabel} <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
