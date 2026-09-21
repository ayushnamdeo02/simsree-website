import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight, Plus } from 'lucide-react';
import EventCalendar from '../components/EventCalendar';
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

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
    ctaUrl: '/events/industry',
    order: 2,
  },
  {
    title: 'Corporate Interactions',
    badge: 'Panels · Live Projects',
    description: 'CXO panels · live project briefings · breakfast briefings.',
    ctaLabel: 'Open',
    ctaUrl: '/events/industry',
    order: 3,
  },
];

// Splits a title on two separate highlight phrases.
function CalendarTitle({ text = '', one, two, className }) {
  if (!one) return <h2 className={className}>{text}</h2>;
  const i1 = text.indexOf(one);
  if (i1 === -1) return <h2 className={className}>{text}</h2>;
  const before = text.slice(0, i1);
  const rest = text.slice(i1 + one.length);
  const i2 = two ? rest.indexOf(two) : -1;
  return (
    <h2 className={className}>
      {before}
      <span className="text-teal-500">{one}</span>
      {i2 === -1 ? (
        rest
      ) : (
        <>
          {rest.slice(0, i2)}
          <span className="text-teal-500">{two}</span>
          {rest.slice(i2 + two.length)}
        </>
      )}
    </h2>
  );
}

function TitleWithHighlight({ text = '', highlight, className, prefix }) {
  const idx = highlight ? text.indexOf(highlight) : -1;
  const body =
    idx === -1 ? (
      text
    ) : (
      <>
        {text.slice(0, idx)}
        <span className="text-teal-500">{highlight}</span>
        {text.slice(idx + highlight.length)}
      </>
    );
  return (
    <h2 className={className}>
      {prefix && <>{prefix} </>}
      {body}
    </h2>
  );
}

// Native <details> so each event row expands with keyboard and without JS.
function EventRow({ e, defaultOpen }) {
  const imgUrl = e.image ? urlFor(e.image).width(300).url() : null;
  const [y, m, d] = (e.date || '').split('-').map(Number);
  const dayName = y ? DAYS_SHORT[new Date(y, m - 1, d).getDay()] : '';

  return (
    <details open={defaultOpen} className="group border border-navy-100 rounded-lg overflow-hidden">
      <summary className="flex items-stretch gap-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <div className="w-[76px] shrink-0 bg-navy-900 text-white flex flex-col items-center justify-center py-4">
          <span className="text-[10px] text-white/70">{dayName}</span>
          <span className="font-display text-2xl font-semibold leading-tight">
            {String(d || '').padStart(2, '0')}
          </span>
          <span className="text-[9px] uppercase tracking-wide text-white/70">
            {m ? MONTHS_SHORT[m - 1] : ''} {y || ''}
          </span>
        </div>
        <div className="flex-1 min-w-0 py-4">
          <h3 className="font-display text-lg font-semibold text-navy-900 mb-1">{e.title}</h3>
          <p className="text-xs text-ink-600">{e.meta}</p>
        </div>
        <span className="shrink-0 self-center pr-5 text-ink-400 transition-transform group-open:rotate-45">
          <Plus size={18} />
        </span>
      </summary>

      {(e.description || e.detailRows?.length > 0 || e.ctaLabel) && (
        <div className="pl-[76px]">
          <div className="px-5 pb-5 flex gap-4">
            {imgUrl && (
              <div
                className="w-[110px] h-[76px] shrink-0 rounded bg-gray-200 bg-cover bg-center"
                style={{ backgroundImage: `url('${imgUrl}')` }}
              />
            )}
            <div className="min-w-0">
              {e.description && (
                <p className="text-xs text-ink-600 leading-relaxed mb-3">{e.description}</p>
              )}
              {e.detailRows?.length > 0 && (
                <dl className="flex flex-wrap gap-x-5 gap-y-1 m-0 mb-4">
                  {e.detailRows.map((r) => (
                    <div key={r.label} className="flex items-center gap-1.5 text-[11px]">
                      <dt className="text-navy-900 font-medium">{r.label}:</dt>
                      <dd className="text-ink-600 m-0">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {e.ctaLabel && (
                <a
                  href={e.ctaUrl || '#'}
                  className="bg-sky-600 hover:bg-teal-600 transition-colors text-white text-xs font-medium px-4 py-2 rounded-md inline-flex items-center gap-1.5"
                >
                  {e.ctaLabel} <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </details>
  );
}

export default function Events() {
  const facts = useKeyFacts();
  const { data } = useEventsData();
  const ep = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const flagships = fillFactsDeep(
    data?.flagships?.length ? data.flagships : fallbackFlagships,
    facts
  );
  const events = fillFactsDeep(data?.events?.length ? data.events : fallbackEvents, facts);
  const programmes = fillFactsDeep(
    data?.programmes?.length ? data.programmes : fallbackProgrammes,
    facts
  );
  const heroButtons = fillFactsDeep(
    ep.heroButtons?.length ? ep.heroButtons : fallbackPage.heroButtons,
    facts
  );

  const [type, setType] = useState('All');
  const [selectedDay, setSelectedDay] = useState(null);

  const heroImageUrl = ep.heroImage ? urlFor(ep.heroImage).width(1600).url() : null;

  // Only offer chips for types that actually have events.
  const chips = useMemo(() => {
    const present = new Set(events.map((e) => e.type).filter(Boolean));
    return [
      { label: 'All', display: `All ${events.length}` },
      ...TYPES.filter((t) => present.has(t)).map((t) => ({ label: t, display: t })),
    ];
  }, [events]);

  const visible = useMemo(
    () =>
      events.filter(
        (e) =>
          (type === 'All' || e.type === type) && (!selectedDay || e.date === selectedDay)
      ),
    [events, type, selectedDay]
  );

  // Open the calendar on the month of the first event, so the fallback data is visible.
  const initialDate = events[0]?.date;

  const title = ep.heroTitle || '';
  const brk = ep.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;
  const line1 = bIdx === -1 ? title : title.slice(0, bIdx + brk.length);
  const line2 = bIdx === -1 ? '' : title.slice(bIdx + brk.length).trim();
  const renderLine = (line) => {
    const it = ep.heroTitleItalic;
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
        className="min-h-[380px] md:h-[440px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: heroImageUrl
            ? `url('${heroImageUrl}')`
            : 'linear-gradient(180deg, #8a8f9e, #cfd3da)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-navy-950/10" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[55px] pt-32 pb-10 md:pb-[44px] md:h-full flex flex-col justify-end text-white">
          <div className="text-xs text-white/70 mb-4 flex items-center">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white">Events</span>
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90 mb-3">
            {ep.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            {renderLine(line1)}
            {line2 && (
              <>
                <br />
                {renderLine(line2)}
              </>
            )}
          </h1>
          <p className="max-w-lg text-xs text-white/85 leading-relaxed mb-7">
            {ep.heroDescription}
          </p>
          <div className="flex flex-wrap gap-3">
            {heroButtons.map((b) => (
              <a
                key={b.label}
                href={b.url || '#'}
                className={`text-sm font-medium px-5 py-3 rounded-md transition-colors flex items-center gap-2 w-fit ${
                  b.primary
                    ? 'bg-sky-600 hover:bg-teal-600 text-white'
                    : 'bg-white hover:bg-gray-100 text-navy-900'
                }`}
              >
                {b.label}
                {b.primary && <ArrowUpRight size={15} />}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Flagships */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {ep.flagshipsEyebrow}
          </span>
          <TitleWithHighlight
            prefix={flagships.length === 4 ? 'Four' : flagships.length}
            text={ep.flagshipsTitle}
            highlight={ep.flagshipsTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3 max-w-xl"
          />
          <p className="text-sm text-ink-600 mb-10">{ep.flagshipsSubtitle}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flagships.map((f) => {
              const imgUrl = f.image ? urlFor(f.image).width(600).url() : null;
              const card = (
                <>
                  <div
                    className="h-[130px] bg-gray-200 bg-cover bg-center"
                    style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                  />
                  <div className="p-5">
                    {f.monthBadge && (
                      <span className="inline-block text-[9px] font-semibold tracking-widest uppercase text-navy-900 bg-navy-50 px-2.5 py-1 rounded mb-3">
                        {f.monthBadge}
                      </span>
                    )}
                    <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
                      {f.title}
                    </h3>
                    <p className="text-xs text-ink-600 leading-relaxed">{f.description}</p>
                  </div>
                </>
              );
              return f.linkUrl ? (
                <Link
                  key={f._id || f.title}
                  to={f.linkUrl}
                  className="border border-navy-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  {card}
                </Link>
              ) : (
                <div
                  key={f._id || f.title}
                  className="border border-navy-100 rounded-lg overflow-hidden"
                >
                  {card}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live calendar */}
      <section id="calendar" className="py-16 lg:py-20 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {ep.calendarEyebrow}
          </span>
          <CalendarTitle
            text={ep.calendarTitle}
            one={ep.calendarTitleHighlight}
            two={ep.calendarTitleHighlightTwo}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3"
          />
          <p className="text-sm text-ink-600 max-w-2xl mb-8">{ep.calendarSubtitle}</p>

          <div className="flex flex-wrap items-center gap-2 mb-8">
            {chips.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => setType(c.label)}
                aria-pressed={c.label === type}
                className={`text-xs px-4 py-2 rounded-md transition-colors ${
                  c.label === type
                    ? 'bg-navy-900 text-white'
                    : 'text-ink-600 hover:text-navy-900 hover:bg-navy-50'
                }`}
              >
                {c.display}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 lg:gap-8 items-start">
            <EventCalendar
              events={events}
              selected={selectedDay}
              onSelect={setSelectedDay}
              initialDate={initialDate}
            />

            <div className="flex flex-col gap-4">
              {selectedDay && (
                <button
                  type="button"
                  onClick={() => setSelectedDay(null)}
                  className="self-start text-xs font-medium text-sky-600 hover:text-teal-600 transition-colors"
                >
                  Clear date filter
                </button>
              )}
              {visible.length > 0 ? (
                visible.map((e, i) => (
                  <EventRow key={e._id || e.title} e={e} defaultOpen={i === 0} />
                ))
              ) : (
                <p className="text-sm text-ink-600 py-8">
                  No events match this filter{selectedDay ? ' on the selected date' : ''}.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Industry programmes */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {ep.industryEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3">
            {ep.industryTitle}
          </h2>
          <p className="text-sm text-ink-600 max-w-lg mb-10">{ep.industrySubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programmes.map((p) => {
              const imgUrl = p.image ? urlFor(p.image).width(700).url() : null;
              return (
                <div
                  key={p._id || p.title}
                  className="border border-navy-100 rounded-lg overflow-hidden flex flex-col"
                >
                  <div
                    className="h-[150px] bg-gray-200 bg-cover bg-center"
                    style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                  />
                  <div className="p-5 flex flex-col flex-1">
                    {p.badge && (
                      <span className="inline-block w-fit text-[9px] font-semibold tracking-widest uppercase text-navy-900 bg-navy-50 px-2.5 py-1 rounded mb-3">
                        {p.badge}
                      </span>
                    )}
                    <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs text-ink-600 leading-relaxed mb-4">{p.description}</p>
                    <Link
                      to={p.ctaUrl || '#'}
                      className="text-xs font-medium text-navy-900 inline-flex items-center gap-1 mt-auto"
                    >
                      {p.ctaLabel || 'Open'} <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
