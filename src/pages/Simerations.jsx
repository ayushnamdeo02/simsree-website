import { useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { StatGrid } from '../components/StatCard';
import PageHero, { HeroButton } from '../components/PageHero';
import { Section, SectionTitle, H5 } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { useSimerationsData } from '../lib/useSimerationsData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackPage = {
  heroEyebrow: "SIMSREE's Flagship Management Fest",
  heroTitle: 'Simerations — the annual show.',
  heroTitleBreakAfter: '—',
  heroDescription:
    'Two days · five tracks · 500+ delegates. Case competitions, debates, industry games, keynote speakers — organised entirely by the Events Committee.',
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
  tracksTitle: '2026 · 18–19 Sept',
  tracksTitleHighlight: '18–19 Sept',
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
  archiveTitle: 'Archive · 2023–2025',
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

// Figma photos used when an edition has no Sanity image.
const EDITION_PHOTOS = { 2026: 'sim-ed-2026', 2025: 'sim-ed-2025', 2024: 'sim-ed-2024', 2023: 'sim-ed-2023' };
const ARCHIVE_PHOTOS = { 2025: 'sim-arc-2025', 2024: 'sim-arc-2024', 2023: 'sim-arc-2023' };
const photo = (image, map, year, w) =>
  image ? urlFor(image).width(w).auto('format').url() : map[year] ? `/images/events/${map[year]}.webp` : null;

const COUNT_WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

// Figma bar card: 1px hairline + "small" shadow, a 3px coloured bar, content 32
// from the bar (16 on mobile) with 16/0 padding: H5 navy title over 16/150 copy.
function BarCard({ title, body, bar = 'bg-teal-500', className = '' }) {
  return (
    <div className={`flex gap-4 md:gap-8 outline outline-1 -outline-offset-1 outline-black/20 shadow-small ${className}`}>
      <span className={`w-[3px] shrink-0 ${bar}`} aria-hidden="true" />
      <div className="flex-1 min-w-0 py-4 pr-4 flex flex-col gap-2">
        <H5 as="h3">{title}</H5>
        <p className="text-base leading-[150%] text-black">{body}</p>
      </div>
    </div>
  );
}

export default function Simerations() {
  const facts = useKeyFacts();
  const { data } = useSimerationsData();
  const sp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const editions = fillFactsDeep(data?.editions?.length ? data.editions : fallbackEditions, facts);
  const tracks = fillFactsDeep(data?.tracks?.length ? data.tracks : fallbackTracks, facts);
  const heroButtons = fillFactsDeep(sp.heroButtons?.length ? sp.heroButtons : fallbackPage.heroButtons, facts);
  const sponsorButtons = fillFactsDeep(sp.sponsorButtons?.length ? sp.sponsorButtons : fallbackPage.sponsorButtons, facts);
  const keyDates = fillFactsDeep(sp.keyDates?.length ? sp.keyDates : fallbackPage.keyDates, facts);

  const [edition, setEdition] = useState('All');

  const chipOf = (e) => (e.upcoming ? `${e.year} (Upcoming)` : e.year);
  const chips = useMemo(() => ['All', ...editions.map(chipOf)], [editions]);
  const visible = useMemo(
    () => (edition === 'All' ? editions : editions.filter((e) => chipOf(e) === edition)),
    [editions, edition],
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
  const heroTitle = bIdx === -1 ? title : `${title.slice(0, bIdx + brk.length)}\n${title.slice(bIdx + brk.length).trim()}`;

  // Figma: three tracks on the first row, two wider ones on the second.
  const trackSpan = (i) =>
    tracks.length === 5 ? (i < 3 ? 'lg:col-span-2' : 'lg:col-span-3') : 'lg:col-span-2';

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(sp.heroImage, '/images/events/sim-hero.webp', { stretch: true })}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Events', to: '/events' }, { label: 'Simerations' }]}
        eyebrow={sp.heroEyebrow}
        eyebrowUpper
        title={heroTitle}
        description={sp.heroDescription}
        descriptionWidth={628}
        actions={heroButtons.map((b) => ({ label: b.label, href: b.url, primary: b.primary }))}
      />

      <section className="px-5 py-16 md:p-16">
        <StatGrid stats={sp.stats || []} />
      </section>

      {/* Editions — radius-4 year tabs; 616 cards in two columns (48 gaps): a 240
          photo | 24-padded H5 + tag, 14/150 summary and hairline-split rows. */}
      <Section width={1280}>
        <SectionTitle tagline={sp.editionsEyebrow} title={sp.editionsTitle} body={sp.editionsSubtitle} />
        <div className="mt-20 flex flex-col gap-12">
          <div className="flex flex-wrap">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setEdition(c)}
                aria-pressed={c === edition}
                className={`h-11 px-4 rounded text-base leading-[150%] transition-colors ${
                  c === edition
                    ? 'bg-navy-900 text-white font-medium outline outline-1 -outline-offset-1 outline-black/20'
                    : 'text-black hover:bg-navy-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {visible.map((e, i) => {
              const src = photo(e.image, EDITION_PHOTOS, e.year, 480);
              return (
                <div
                  key={e._id || e.year}
                  className={`${i >= 2 ? 'lg:min-h-[398px]' : ''} flex flex-col lg:flex-row bg-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small`}
                >
                  <div
                    className={`${i < 2 ? 'h-[380px]' : 'h-[199px]'} lg:h-auto lg:w-[240px] shrink-0 bg-navy-50 bg-cover bg-center`}
                    style={src ? { backgroundImage: `url('${src}')` } : undefined}
                  />
                  <div className="flex-1 min-w-0 p-6 flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-4">
                        <H5 as="h3" className="text-black">
                          {e.title}
                        </H5>
                        {e.upcoming && (
                          <span className="px-2.5 py-1 rounded-2xl bg-sky-50 text-xs leading-[150%] text-sky-600 uppercase">
                            Upcoming
                          </span>
                        )}
                      </div>
                      <p className="text-sm leading-[150%] text-black">{e.summary}</p>
                    </div>
                    {e.rows?.length > 0 && (
                      <dl className="m-0 flex flex-col gap-4">
                        {e.rows.map((r, ri) => (
                          <div
                            key={r.label}
                            className={`flex gap-2 text-sm leading-[150%] ${ri < e.rows.length - 1 ? 'pb-2 border-b border-black/20' : ''}`}
                          >
                            <dt className="uppercase text-ink-400">{r.label}</dt>
                            <dd className="m-0 text-black">{r.value}</dd>
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
      </Section>

      {/* Tracks — #eaeaf1 band; bar cards with Eastern Blue bars, 3 + 2 (32 gaps). */}
      <Section bg="bg-navy-50" width={1280}>
        <SectionTitle
          tagline={`${COUNT_WORDS[tracks.length] || tracks.length} ${sp.tracksEyebrow}`}
          title={sp.tracksTitle?.replace(/(\d)-(\d)/g, '$1–$2')}
          highlight={sp.tracksTitleHighlight?.replace(/(\d)-(\d)/g, '$1–$2')}
          body={sp.tracksSubtitle}
        />
        <div className="mt-20 grid lg:grid-cols-6 gap-8">
          {tracks.map((t, i) => (
            <BarCard key={t._id || t.name} title={t.name} body={t.description} className={trackSpan(i)} />
          ))}
        </div>
      </Section>

      {/* Key dates — four navy-bar cards (the last Eastern Blue), then the .ics button. */}
      <Section width={1280}>
        <SectionTitle tagline={sp.datesEyebrow} title={sp.datesTitle} body={sp.datesSubtitle} />
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {keyDates.map((d, i) => (
            <BarCard
              key={d.label}
              title={d.label}
              body={d.description}
              bar={i === keyDates.length - 1 ? 'bg-teal-500' : 'bg-navy-900'}
            />
          ))}
        </div>
        <div className="mt-20">
          <HeroButton label={sp.calendarCtaLabel} onClick={downloadIcs} primary />
        </div>
      </Section>

      {/* Archive — three 405 cards (32 gaps): 270 photo, H5 + copy, "Gallery + Winners ›". */}
      {archive.length > 0 && (
        <Section id="archive" width={1280} className="scroll-mt-24">
          <SectionTitle tagline={sp.archiveEyebrow} title={sp.archiveTitle} body={sp.archiveSubtitle} />
          <div className="mt-20 grid md:grid-cols-3 gap-8 items-start">
            {archive.map((e) => {
              const src = photo(e.archiveImage || e.image, ARCHIVE_PHOTOS, e.year, 810);
              return (
                <div key={e._id || e.year} className="flex flex-col bg-white outline outline-1 -outline-offset-1 outline-black/20">
                  <div
                    className="h-[223px] md:h-[270px] bg-navy-50 bg-cover bg-center"
                    style={src ? { backgroundImage: `url('${src}')` } : undefined}
                  />
                  <div className="p-6 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <H5 as="h3" className="text-black max-md:text-[22px]">
                        {e.title}
                      </H5>
                      <p className="text-base leading-[150%] text-black">{e.archiveSummary}</p>
                    </div>
                    <a
                      href={e.archiveCtaUrl || '#'}
                      className="w-fit inline-flex items-center gap-2 text-base leading-[150%] text-black hover:underline underline-offset-2"
                    >
                      {e.archiveCtaLabel || 'Gallery + Winners'} <ChevronRight size={24} strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* Sponsor CTA — navy, centred 768 column. */}
      <Section bg="bg-navy-900" width={768} className="text-center border-t border-white/20">
        <SectionTitle center dark tagline={sp.sponsorEyebrow} title={sp.sponsorTitle} body={sp.sponsorSubtitle} />
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {sponsorButtons.map((b) => (
            <HeroButton key={b.label} label={b.label} href={b.url} primary={b.primary} />
          ))}
        </div>
      </Section>
    </div>
  );
}
