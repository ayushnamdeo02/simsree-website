import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarPlus, ChevronRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import { useSimerationsData } from '../lib/useSimerationsData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackPage = {
  heroEyebrow: "SIMSREE's Flagship Management Fest",
  heroTitle: 'Simerations — the annual show.',
  heroTitleBreakAfter: '—',
  heroDescription:
    'Two days · five tracks · 500+ delegates. Case competitions, industry games, keynote speakers — organised entirely by the Events Committee.',
  heroButtons: [
    { label: 'Register for Simerations 2026', url: '/contact', primary: true },
    { label: 'See past editions', url: '#archive', primary: false },
  ],
  stats: [
    { label: 'Delegates', value: '500+', dark: true },
    { label: 'Colleges', value: '50', dark: false },
    { label: 'Tracks', value: '5', dark: true },
    { label: '18-19 Sept', value: '2026', dark: false },
  ],

  editionsEyebrow: 'Edition',
  editionsTitle: 'Pick an edition',
  editionsSubtitle: 'Every past edition, archived.',

  tracksEyebrow: 'Tracks',
  tracksTitle: '2026 · 18-19 Sept',
  tracksTitleHighlight: '18-19 Sept',
  tracksSubtitle: 'Each track has its own prize pool and partner sponsor.',

  datesEyebrow: 'Key Dates',
  datesTitle: 'Mark your calendar',
  datesTitleHighlight: 'calendar',
  datesSubtitle: 'One click adds it to iCal / Google / Outlook.',
  calendarCtaLabel: 'Add to calendar (.ics)',
  calendarEventName: 'Simerations 2026',
  keyDates: [
    { label: '1 July', description: 'Registration opens', date: '2026-07-01' },
    { label: '15 Aug', description: 'Team submissions due', date: '2026-08-15' },
    { label: '1-7 Sept', description: 'Pre-elims (online)', date: '2026-09-01' },
    { label: '18-19 Sept', description: 'Campus rounds + ceremony', date: '2026-09-18' },
  ],

  archiveEyebrow: 'Past Editions',
  archiveTitle: 'Archive · 2023-2025',
  archiveTitleHighlight: '2023-2025',
  archiveSubtitle: 'Open any card for winners + gallery.',

  sponsorEyebrow: 'Become a Sponsor',
  sponsorTitle: 'Three tiers · 50-college reach',
  sponsorTitleHighlight: '50-college reach',
  sponsorSubtitle:
    'Branding across 50 colleges · case challenge naming rights · deck on request.',
  sponsorButtons: [
    { label: 'Email the sponsorship team', url: 'mailto:simerations@simsree.org', primary: true },
    { label: 'Download sponsor deck', url: '#', primary: false },
  ],
};

const fallbackEditions = [
  {
    year: '2026',
    title: 'Simerations 2026',
    upcoming: true,
    summary: '18-19 September 2026 · 5 tracks · 500+ delegates expected. Registrations open July 2026.',
    rows: [
      { label: 'Theme', value: 'Future-Forward Finance' },
      { label: 'Format', value: 'Hybrid · on-campus + livestream' },
      { label: 'Prize pool', value: '₹5,00,000' },
    ],
    order: 1,
  },
  {
    year: '2025',
    title: 'Simerations 2025',
    summary: '12-13 September 2025 · 482 delegates from 38 B-schools · 14 cases solved.',
    rows: [
      { label: 'Winner', value: 'Team Visionary · IIM Lucknow' },
      { label: 'Sponsor', value: 'Bajaj Finserv · Asian Paints' },
      { label: 'Footfall', value: '482' },
    ],
    archiveSummary: '600 delegates · 50 colleges · Theme: AI in Management',
    archiveCtaLabel: 'Gallery + Winners',
    order: 2,
  },
  {
    year: '2024',
    title: 'Simerations 2024',
    summary: '7-8 September 2024 · "Resilient Business" theme · launch of TEDxSIMSREE collab track.',
    rows: [
      { label: 'Winner', value: 'Team Lakeside · NMIMS' },
      { label: 'Sponsor', value: 'L&T · Wipro · Deloitte' },
      { label: 'Footfall', value: '426' },
    ],
    archiveSummary: '450 delegates · Theme: Sustainable Business',
    archiveCtaLabel: 'Gallery + Winners',
    order: 3,
  },
  {
    year: '2023',
    title: 'Simerations 2023',
    summary: '23-24 September 2023 · 30th edition · post-pandemic comeback fest.',
    rows: [
      { label: 'Winner', value: 'Team Pivot · XLRI Jamshedpur' },
      { label: 'Sponsor', value: 'HDFC · Marico · Infosys' },
      { label: 'Footfall', value: '398' },
    ],
    archiveSummary: '400 delegates · Theme: Beyond Boundaries',
    archiveCtaLabel: 'Gallery + Winners',
    order: 4,
  },
];

const fallbackTracks = [
  { name: 'Beanstalk', description: 'Startup pitch competition · ₹2L prize pool.', order: 1 },
  { name: 'Bullseye', description: 'Marketing case challenge · sponsored by HUL.', order: 2 },
  { name: 'Quants', description: 'Finance simulation · live trading floor.', order: 3 },
  { name: 'Mind Games', description: 'Operations & strategy puzzle.', order: 4 },
  { name: 'The Keynote', description: 'CXO panel · sectors TBA · open to all delegates.', order: 5 },
];

function TitleWithHighlight({ text = '', highlight, className }) {
  const idx = highlight ? text.indexOf(highlight) : -1;
  if (idx === -1) return <h2 className={className}>{text}</h2>;
  return (
    <h2 className={className}>
      {text.slice(0, idx)}
      <span className="text-teal-500">{highlight}</span>
      {text.slice(idx + highlight.length)}
    </h2>
  );
}

// Builds a real .ics file from the key dates so the button downloads something
// a calendar app can actually open, rather than linking nowhere.
function buildIcs(eventName, dates) {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SIMSREE//Events//EN',
    'CALSCALE:GREGORIAN',
  ];
  dates
    .filter((d) => d.date)
    .forEach((d, i) => {
      const compact = d.date.replace(/-/g, '');
      // All-day events end the following day per the iCalendar spec.
      const [y, m, day] = d.date.split('-').map(Number);
      const end = new Date(Date.UTC(y, m - 1, day + 1));
      const endCompact = end.toISOString().slice(0, 10).replace(/-/g, '');
      lines.push(
        'BEGIN:VEVENT',
        `UID:simerations-${compact}-${i}@simsree.org`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${compact}`,
        `DTEND;VALUE=DATE:${endCompact}`,
        `SUMMARY:${eventName} — ${d.description || d.label}`,
        'END:VEVENT'
      );
    });
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

export default function Simerations() {
  const facts = useKeyFacts();
  const { data } = useSimerationsData();
  const sp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const editions = fillFactsDeep(
    data?.editions?.length ? data.editions : fallbackEditions,
    facts
  );
  const tracks = fillFactsDeep(data?.tracks?.length ? data.tracks : fallbackTracks, facts);
  const heroButtons = fillFactsDeep(
    sp.heroButtons?.length ? sp.heroButtons : fallbackPage.heroButtons,
    facts
  );
  const sponsorButtons = fillFactsDeep(
    sp.sponsorButtons?.length ? sp.sponsorButtons : fallbackPage.sponsorButtons,
    facts
  );
  const keyDates = fillFactsDeep(
    sp.keyDates?.length ? sp.keyDates : fallbackPage.keyDates,
    facts
  );

  const [edition, setEdition] = useState('All');

  const heroImageUrl = sp.heroImage ? urlFor(sp.heroImage).width(1600).url() : null;

  const chips = useMemo(
    () => [
      'All',
      ...editions.map((e) => (e.upcoming ? `${e.year} (Upcoming)` : e.year)),
    ],
    [editions]
  );

  const visible = useMemo(
    () =>
      edition === 'All'
        ? editions
        : editions.filter((e) => (e.upcoming ? `${e.year} (Upcoming)` : e.year) === edition),
    [editions, edition]
  );

  // Archive strip shows past editions only.
  const archive = editions.filter((e) => !e.upcoming && e.archiveSummary);

  const downloadIcs = () => {
    const ics = buildIcs(sp.calendarEventName || 'Simerations', keyDates);
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(sp.calendarEventName || 'simerations').toLowerCase().replace(/\s+/g, '-')}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const title = sp.heroTitle || '';
  const brk = sp.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;
  const line1 = bIdx === -1 ? title : title.slice(0, bIdx + brk.length);
  const line2 = bIdx === -1 ? '' : title.slice(bIdx + brk.length).trim();

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
            <Link to="/events" className="hover:text-white">Events</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white">Simerations</span>
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90 mb-3">
            {sp.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold italic mb-4">
            {line1}
            {line2 && (
              <>
                <br />
                {line2}
              </>
            )}
          </h1>
          <p className="max-w-md text-xs text-white/85 leading-relaxed mb-7">
            {sp.heroDescription}
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

      {/* Stats */}
      <section className="max-w-[1408px] mx-auto px-6 lg:px-16 py-10 lg:py-14">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {(sp.stats || []).map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Editions */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {sp.editionsEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3">
            {sp.editionsTitle}
          </h2>
          <p className="text-sm text-ink-600 mb-8">{sp.editionsSubtitle}</p>

          <div className="flex flex-wrap items-center gap-2 mb-8">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setEdition(c)}
                aria-pressed={c === edition}
                className={`text-xs px-4 py-2 rounded-md transition-colors ${
                  c === edition
                    ? 'bg-navy-900 text-white'
                    : 'text-ink-600 hover:text-navy-900 hover:bg-navy-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {visible.map((e) => {
              const imgUrl = e.image ? urlFor(e.image).width(500).url() : null;
              return (
                <div
                  key={e._id || e.year}
                  className="border border-navy-100 rounded-lg overflow-hidden flex"
                >
                  <div
                    className="w-[38%] shrink-0 bg-gray-200 bg-cover bg-center min-h-[190px]"
                    style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                  />
                  <div className="flex-1 min-w-0 p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <h3 className="font-display text-xl font-semibold text-navy-900">
                        {e.title}
                      </h3>
                      {e.upcoming && (
                        <span className="shrink-0 text-[9px] font-semibold tracking-widest uppercase text-sky-700 bg-sky-50 px-2 py-1 rounded">
                          Upcoming
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-ink-600 leading-relaxed mb-4">{e.summary}</p>
                    {e.rows?.length > 0 && (
                      <dl className="m-0">
                        {e.rows.map((r) => (
                          <div
                            key={r.label}
                            className="flex items-center gap-3 py-2 border-t border-navy-100"
                          >
                            <dt className="text-[9px] uppercase tracking-wide text-ink-400 w-[74px] shrink-0">
                              {r.label}
                            </dt>
                            <dd className="text-[11px] text-navy-900 m-0">{r.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="bg-navy-50 py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {tracks.length === 5 ? 'Five' : tracks.length} {sp.tracksEyebrow}
          </span>
          <TitleWithHighlight
            text={sp.tracksTitle}
            highlight={sp.tracksTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3"
          />
          <p className="text-sm text-ink-600 mb-8">{sp.tracksSubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tracks.map((t) => (
              <div
                key={t._id || t.name}
                className="bg-white border border-navy-100 border-l-2 border-l-sky-600 rounded-sm px-6 py-5"
              >
                <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">{t.name}</h3>
                <p className="text-xs text-ink-600 leading-relaxed">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key dates */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {sp.datesEyebrow}
          </span>
          <TitleWithHighlight
            text={sp.datesTitle}
            highlight={sp.datesTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3"
          />
          <p className="text-sm text-ink-600 mb-8">{sp.datesSubtitle}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {keyDates.map((d) => (
              <div
                key={d.label}
                className="border border-navy-100 border-l-2 border-l-sky-600 rounded-sm px-6 py-5"
              >
                <p className="font-display text-lg font-semibold text-navy-900 mb-1">{d.label}</p>
                <p className="text-xs text-ink-600">{d.description}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={downloadIcs}
            className="bg-sky-600 hover:bg-teal-600 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md inline-flex items-center gap-2"
          >
            {sp.calendarCtaLabel} <CalendarPlus size={15} />
          </button>
        </div>
      </section>

      {/* Archive */}
      {archive.length > 0 && (
        <section id="archive" className="py-16 lg:py-20 scroll-mt-24">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {sp.archiveEyebrow}
            </span>
            <TitleWithHighlight
              text={sp.archiveTitle}
              highlight={sp.archiveTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3"
            />
            <p className="text-sm text-ink-600 mb-8">{sp.archiveSubtitle}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {archive.map((e) => {
                const imgUrl = e.image ? urlFor(e.image).width(600).url() : null;
                return (
                  <div
                    key={e._id || e.year}
                    className="border border-navy-100 rounded-lg overflow-hidden flex flex-col"
                  >
                    <div
                      className="h-[150px] bg-gray-200 bg-cover bg-center"
                      style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                    />
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
                        {e.title}
                      </h3>
                      <p className="text-xs text-ink-600 leading-relaxed mb-4">
                        {e.archiveSummary}
                      </p>
                      <a
                        href={e.archiveCtaUrl || '#'}
                        className="text-xs font-medium text-navy-900 inline-flex items-center gap-1 mt-auto"
                      >
                        {e.archiveCtaLabel || 'Gallery + Winners'} <ChevronRight size={13} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Sponsor CTA */}
      <section className="bg-navy-900 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-white/70">
            {sp.sponsorEyebrow}
          </span>
          <TitleWithHighlight
            text={sp.sponsorTitle}
            highlight={sp.sponsorTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-5 mb-4"
          />
          <p className="text-sm text-white/75 mb-8 max-w-xl mx-auto">{sp.sponsorSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {sponsorButtons.map((b) => (
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
