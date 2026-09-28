import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import EventCalendar from '../components/EventCalendar';
import SessionCard from '../components/SessionCard';
import PageHero from '../components/PageHero';
import { Section, SectionTitle, Tagline, H5, H6 } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { useEventsData } from '../lib/useEventsData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const TYPES = [
  'Guest Lectures',
  'Corporate Interactions',
  'MDP',
  'Career Catalyst',
  'Simerations',
  'TEDxSIMSREE',
  'Mrudgandha',
];


const fallbackPage = {
  heroEyebrow: 'Always Something Happening',
  heroTitle: 'There are no quiet weeks at SIMSREE.',
  heroTitleItalic: 'SIMSREE.',
  heroTitleBreakAfter: 'weeks',
  heroDescription:
    'A speaker, contest, or workshop every week — Simerations · TEDxSIMSREE · weekly guest lectures · corporate interactions · MDPs for working professionals. Browse by date or type.',
  heroButtons: [
    { label: "See this month's calendar", url: '#calendar', primary: true },
    { label: 'Get event updates by email', url: '/contact', primary: false },
    { label: 'News & Announcements', url: '/events/news', primary: false },
  ],

  flagshipsEyebrow: 'Signature',
  flagshipsTitle: 'flagships worth planning your year around',
  flagshipsTitleHighlight: 'flagships',
  flagshipsSubtitle: 'Four flagships · all student-organised.',

  calendarEyebrow: 'Live Calendar · Filter + Browse',
  calendarTitle: 'Browse by date, filter by type.',
  calendarTitleHighlight: 'date,',
  calendarTitleHighlightTwo: 'type.',
  calendarSubtitle:
    'This month’s dates load automatically. Use ‹ › to move months — highlighted days have events, so click one for details.',

  industryEyebrow: 'Industry Events',
  industryTitle: 'Curated industry programmes',
  industrySubtitle:
    'Three programmes for working professionals — designed to extend the SIMSREE classroom beyond the cohort.',
};

const fallbackFlagships = [
  {
    title: 'Simerations',
    monthBadge: 'Sept 2026',
    description: "SIMSREE's flagship national management fest · 5 tracks · 500+ delegates.",
    order: 1,
  },
  {
    title: 'TEDxSIMSREE',
    monthBadge: 'Nov',
    description: 'Student-curated TED talks since 2017 · open to all.',
    order: 2,
  },
  {
    title: 'Mrudgandha',
    monthBadge: 'Feb',
    description: "SSR's flagship community-outreach day.",
    order: 3,
  },
  {
    title: 'Batchmeet',
    monthBadge: 'Mar',
    description: 'Annual alumni reunion across Mumbai, Bangalore, Delhi.',
    order: 4,
  },
];

const fallbackEvents = [
  {
    title: 'Guest Lecture · ESG @ Indian Banks',
    date: '2026-05-06',
    type: 'Guest Lectures',
    audience: 'student',
    meta: 'Corporate Relations · 3pm Auditorium',
    description:
      "Senior leaders from Axis, ICICI and IDFC First break down RBI's 2026 ESG disclosure mandate.",
    detailRows: [
      { label: 'Speaker', value: '3-way panel · Axis · ICICI · IDFC' },
      { label: 'Format', value: 'In-person' },
    ],
    ctaLabel: 'Save my seat',
  },
  {
    title: 'Mock GDPI Day',
    date: '2026-05-08',
    type: 'Career Catalyst',
    audience: 'student',
    meta: 'Career Catalyst · Mock-Interview Cell',
  },
  {
    title: 'MDP · Data-Driven Decision Making',
    date: '2026-05-14',
    type: 'MDP',
    audience: 'corporate',
    meta: 'Career Catalyst · Mock-Interview Cell',
  },
  {
    title: 'Corporate Interaction · FMCG Panel',
    date: '2026-05-18',
    type: 'Corporate Interactions',
    audience: 'corporate',
    meta: 'Corporate Relations · 5pm Seminar Hall',
  },
  {
    title: 'Simerations Registration Opens',
    date: '2026-05-30',
    type: 'Simerations',
    audience: 'student',
    meta: 'Events Committee · Online',
  },
];

const fallbackProgrammes = [
  {
    title: 'MDP · Management Development Programmes',
    badge: '2-5 Day Intensive',
    description: 'For working professionals · Mumbai-based or hybrid · 5 active programmes in AY 2025-26.',
    ctaLabel: 'Open',
    ctaUrl: '/events/development-programmes',
    order: 1,
  },
  {
    title: 'Career Catalyst',
    badge: 'Short Workshops',
    description: 'CV clinic · mock case · interview bootcamp · for early-career professionals.',
    ctaLabel: 'Open',
    ctaUrl: '/events/industry-events',
    order: 2,
  },
  {
    title: 'Corporate Interactions',
    badge: 'Panels · Live Projects',
    description: 'CXO panels · live project briefings · breakfast briefings.',
    ctaLabel: 'Open',
    ctaUrl: '/events/industry-events',
    order: 3,
  },
];

// Figma photos used when an entry has no Sanity image.
const FLAGSHIP_PHOTOS = [1, 2, 3, 4].map((n) => `/images/events/flag-${n}.webp`);
const PROGRAMME_PHOTOS = [1, 2, 3].map((n) => `/images/events/prog-${n}.webp`);
const EVENT_PHOTO = '/images/events/flag-3.webp';

// Figma month tags cycle navy, gold and Eastern Blue tints.
const TAG_STYLES = [
  'bg-navy-50 text-navy-900',
  'bg-[#ffdb43]/10 text-[#dfb400]',
  'bg-sky-50 text-sky-600',
  'bg-navy-50 text-navy-900',
];

const COUNT_WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

const img = (image, fallback, w) => (image ? urlFor(image).width(w).auto('format').url() : fallback);

// Figma H2 with two teal phrases ("Browse by date, filter by type.").
function TwoHighlightHeading({ text = '', one, two }) {
  const parts = [];
  let rest = text;
  for (const h of [one, two]) {
    const i = h ? rest.indexOf(h) : -1;
    if (i === -1) continue;
    parts.push(
      rest.slice(0, i),
      <span key={h} className="text-teal-500">
        {h}
      </span>,
    );
    rest = rest.slice(i + h.length);
  }
  parts.push(rest);
  return (
    <h2 className="font-display font-medium text-[36px] leading-[130%] md:text-[52px] md:leading-[120%] tracking-[-0.01em] text-navy-900">
      {parts}
    </h2>
  );
}

export default function Events() {
  const facts = useKeyFacts();
  const { data } = useEventsData();
  const ep = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const flagships = fillFactsDeep(data?.flagships?.length ? data.flagships : fallbackFlagships, facts);
  const events = fillFactsDeep(data?.events?.length ? data.events : fallbackEvents, facts);
  const programmes = fillFactsDeep(data?.programmes?.length ? data.programmes : fallbackProgrammes, facts);
  const heroButtons = fillFactsDeep(ep.heroButtons?.length ? ep.heroButtons : fallbackPage.heroButtons, facts);

  const [type, setType] = useState('All');
  const [selectedDay, setSelectedDay] = useState(null);

  // Figma lists every type; the count is the number of events.
  const chips = [{ label: 'All', display: `All ${events.length}` }, ...TYPES.map((t) => ({ label: t, display: t }))];

  const visible = useMemo(
    () => events.filter((e) => (type === 'All' || e.type === type) && (!selectedDay || e.date === selectedDay)),
    [events, type, selectedDay],
  );

  // Open the calendar on the month of the first event, so the listed events show.
  const initialDate = events[0]?.date;

  const title = ep.heroTitle || '';
  const brk = ep.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;
  const heroTitle = bIdx === -1 ? title : `${title.slice(0, bIdx + brk.length)}\n${title.slice(bIdx + brk.length).trim()}`;

  const count = COUNT_WORDS[flagships.length] || flagships.length;
  const flagshipsTitle = `${count} ${ep.flagshipsTitle}`;
  const flagshipsHighlight = ep.flagshipsTitleHighlight && `${count} ${ep.flagshipsTitleHighlight}`;

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(ep.heroImage, '/images/events/hero.webp', { stretch: true })}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Events' }]}
        eyebrow={ep.heroEyebrow}
        eyebrowUpper
        title={heroTitle}
        titleItalic={ep.heroTitleItalic}
        description={ep.heroDescription}
        descriptionWidth={628}
        actions={heroButtons.map((b) => ({ label: b.label, href: b.url, primary: b.primary }))}
      />

      {/* Flagships — 284 cards, 48 gaps: square photo, 16-padded tag + H6 + copy. */}
      <Section width={1280}>
        <SectionTitle tagline={ep.flagshipsEyebrow} title={flagshipsTitle} highlight={flagshipsHighlight} body={ep.flagshipsSubtitle} />
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-12 items-start">
          {flagships.map((f, i) => {
            const inner = (
              <>
                <div
                  className="aspect-square bg-navy-50 bg-cover bg-center"
                  style={{ backgroundImage: `url('${img(f.image, FLAGSHIP_PHOTOS[i % 4], 600)}')` }}
                />
                <div className="p-4 flex flex-col gap-2">
                  {f.monthBadge && (
                    <span className={`w-fit px-2.5 py-1 rounded-2xl text-sm leading-[150%] uppercase ${TAG_STYLES[i % 4]}`}>
                      {f.monthBadge}
                    </span>
                  )}
                  <div className="flex flex-col gap-2">
                    <H6 as="h3">{f.title}</H6>
                    <p className="text-base leading-[150%] text-black">{f.description}</p>
                  </div>
                </div>
              </>
            );
            const cls = 'rounded-xl overflow-hidden rounded-xl overflow-hidden flex flex-col gap-6 bg-white outline outline-1 -outline-offset-1 outline-black/20';
            return f.linkUrl ? (
              <Link key={f._id || f.title} to={f.linkUrl} className={`${cls} hover:shadow-medium transition-shadow`}>
                {inner}
              </Link>
            ) : (
              <div key={f._id || f.title} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>
      </Section>

      {/* Calendar — radius-4 filter tabs; 502 calendar | 730 event cards (48 apart). */}
      <Section id="calendar" width={1280} className="scroll-mt-24">
        <div className="max-w-[768px]">
          <Tagline>{ep.calendarEyebrow}</Tagline>
          <div className="mt-3 md:mt-4">
            <TwoHighlightHeading text={ep.calendarTitle} one={ep.calendarTitleHighlight} two={ep.calendarTitleHighlightTwo} />
          </div>
          <p className="mt-5 md:mt-6 text-base md:text-lg leading-[150%] text-black">{ep.calendarSubtitle}</p>
        </div>

        <div className="mt-20 flex flex-col gap-12">
          <div className="flex flex-wrap">
            {chips.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => setType(c.label)}
                aria-pressed={c.label === type}
                className={`h-11 px-4 rounded text-base leading-[150%] transition-colors ${
                  c.label === type
                    ? 'bg-navy-900 text-white font-medium outline outline-1 -outline-offset-1 outline-black/20'
                    : 'text-black hover:bg-navy-50'
                }`}
              >
                {c.display}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-[502px_1fr] gap-12 items-start">
            <EventCalendar events={events} selected={selectedDay} onSelect={setSelectedDay} initialDate={initialDate} />
            <div className="flex flex-col gap-8">
              {selectedDay && (
                <button
                  type="button"
                  onClick={() => setSelectedDay(null)}
                  className="self-start text-base leading-[150%] text-navy-900 underline underline-offset-2"
                >
                  Clear date filter
                </button>
              )}
              {visible.length > 0 ? (
                visible.map((e, i) => (
                  <SessionCard
                    key={e._id || `${e.title}-${e.date}`}
                    s={{ ...e, imageUrl: e.image && img(e.image, null, 400) }}
                    fallbackImage={EVENT_PHOTO}
                    desktopShadow={false}
                    defaultOpen={i === 0}
                  />
                ))
              ) : (
                <p className="text-base leading-[150%] text-black py-8">
                  No events match this filter{selectedDay ? ' on the selected date' : ''}.
                </p>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Industry programmes — three 405 cards (32 gaps): 270 photo, 24-padded
          radius-4 tag, H5 title, copy, "Open ›". */}
      <Section width={1280}>
        <SectionTitle tagline={ep.industryEyebrow} title={ep.industryTitle} body={ep.industrySubtitle} />
        <div className="mt-20 grid md:grid-cols-3 gap-8 items-start">
          {programmes.map((p, i) => (
            <div key={p._id || p.title} className="rounded-xl overflow-hidden rounded-xl overflow-hidden flex flex-col bg-white outline outline-1 -outline-offset-1 outline-black/20">
              <div
                className="h-[250px] md:h-[270px] bg-navy-50 bg-cover bg-center"
                style={{ backgroundImage: `url('${img(p.image, PROGRAMME_PHOTOS[i % 3], 810)}')` }}
              />
              <div className="p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  {p.badge && (
                    <span className="w-fit px-2.5 py-1 rounded bg-navy-50 outline outline-1 -outline-offset-1 outline-black/20 text-sm leading-[150%] uppercase text-navy-900">
                      {p.badge}
                    </span>
                  )}
                  <div className="flex flex-col gap-2">
                    <H5 as="h3" className="text-black max-md:text-[22px]">
                      {p.title}
                    </H5>
                    <p className="text-base leading-[150%] text-black">{p.description}</p>
                  </div>
                </div>
                <Link
                  to={p.ctaUrl || '#'}
                  className="w-fit inline-flex items-center gap-2 text-base leading-[150%] text-black hover:underline underline-offset-2"
                >
                  {p.ctaLabel || 'Open'} <ChevronRight size={24} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
