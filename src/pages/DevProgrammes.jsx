import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Plus } from 'lucide-react';
import { useDevProgrammesData } from '../lib/useDevProgrammesData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const fallbackPage = {
  heroEyebrow: 'For Working Professionals',
  heroTitle: 'Development Programmes.',
  heroTitleItalic: 'Programmes.',
  heroDescription:
    'Two paid programme tracks: MDPs (2-5 day intensives for managers) and Career Catalyst (short workshops for early-career professionals).',
  heroButtons: [
    { label: 'See the MDP calendar', url: '#calendar', primary: true },
    { label: 'See Career Catalyst workshops', url: '#tabs', primary: false },
  ],

  mdpTabLabel: 'MDP',
  mdpEyebrow: 'For Working Professionals',
  mdpTitle: 'MDPs · 2-5 day intensives.',
  mdpTitleHighlight: 'MDPs',
  mdpSubtitle:
    'Mumbai-based or hybrid. Designed and taught by SIMSREE faculty + senior industry practitioners.',

  catalystTabLabel: 'Career Catalyst',
  catalystEyebrow: 'For Early-Career Professionals',
  catalystTitle: 'Career Catalyst · short workshops.',
  catalystTitleHighlight: 'Career Catalyst',
  catalystSubtitle:
    'CV clinics, mock case workshops, interview bootcamps. Three productised tracks.',
  catalystOutcomes: [
    { value: '62%', description: 'CV-clinic attendees received an interview within 6 weeks (n=140, 2025).' },
    { value: '+1.4 pts', description: 'average case-interview score lift on a 5-pt scale after the bootcamp.' },
    { value: '85 NPS', description: '73% of attendees recommended a colleague.' },
  ],

  customTabLabel: 'Custom in-company',
  customEyebrow: 'Custom For Your Team',
  customTitle: 'In-company MDP.',
  customTitleHighlight: 'MDP.',
  customSubtitle:
    'Run a SIMSREE-designed programme exclusively for your team. 50% of MDPs delivered last year were custom.',
  customCtaLabel: 'Talk to MDP Office',
  customCtaUrl: '/contact',

  calendarEyebrow: 'Calendar · 2026',
  calendarTitle: 'Upcoming programmes.',
  calendarTitleHighlight: 'programmes.',
  calendarSubtitle:
    'Click any item to see the full curriculum, faculty, capacity and how to apply. Most programmes have a 50-seat cap.',

  faqEyebrow: 'FAQ',
  faqTitle: 'Common questions.',
  faqTitleHighlight: 'questions.',
  faqs: [
    {
      question: 'Who can attend an MDP?',
      answer:
        'MDPs are open to mid- and senior-level professionals (3+ years of experience). Career Catalyst workshops are for early-career professionals and MBA students. Custom in-company MDPs are tailored to your team’s level.',
    },
    { question: 'Are programmes hybrid or in-person?', answer: '' },
    { question: 'Do I get a certificate?', answer: '' },
    { question: 'Can my employer sponsor me?', answer: '' },
    { question: 'Group discounts?', answer: '' },
  ],

  ctaEyebrow: 'Need Something Different?',
  ctaTitle: 'A custom MDP for your team.',
  ctaSubtitle:
    '50% of our MDPs last year were delivered as private programmes for specific organisations. Tell us what you need, we will build it around your team and your timeline.',
  ctaButtons: [
    { label: 'Start a conversation', url: '/contact', primary: true },
    { label: 'Email MDP Office', url: 'mailto:mdp@simsree.org', primary: false },
  ],
};

const fallbackMdps = [
  { name: 'Data-Driven Decision Making', dates: '14-16 May 2026', format: '3-day in-person', fee: '₹15,000', order: 1 },
  { name: 'Negotiation Skills', dates: '30-31 May 2026', format: '2-day hybrid', fee: '₹12,000', order: 2 },
  { name: 'Strategic Brand Management', dates: '10-13 Jun 2026', format: '4-day in-person', fee: '₹22,000', order: 3 },
  { name: 'Financial Modelling for Managers', dates: '17-19 Jul 2026', format: '3-day hybrid', fee: '₹18,000', order: 4 },
  { name: 'Operations Excellence (Lean)', dates: '5-7 Aug 2026', format: '3-day in-person', fee: '₹16,000', order: 5 },
];

const fallbackWorkshops = [
  { name: 'CV & LinkedIn Clinic', summary: '90-min · live edits · ₹2,500.', order: 1 },
  { name: 'Mock Case Workshop', summary: 'Half-day · MBB-style · ₹6,000.', order: 2 },
  { name: 'Interview Bootcamp', summary: '2-day · behavioural + technical · ₹14,000.', order: 3 },
];

const fallbackCalendar = [
  {
    title: 'MDP · Data-Driven Decision Making',
    date: '2026-05-14',
    track: 'MDP',
    meta: '3-day · ₹15,000 · Hybrid',
    description:
      'A 3-day intensive on translating raw data into board-room recommendations. Covers descriptive vs prescriptive analytics, decision-tree modelling in Excel, and a capstone case using a CPG dataset.',
    detailRows: [
      { label: 'Duration', value: '3 days' },
      { label: 'Format', value: 'Hybrid' },
      { label: 'Fee', value: '₹15,000' },
      { label: 'Faculty', value: 'Prof. Anand Kulkarni' },
    ],
    order: 1,
  },
  { title: 'MDP · Negotiation Skills', date: '2026-05-30', track: 'MDP', meta: '2-day · ₹12,000', order: 2 },
  { title: 'MDP · Brand Management Essentials', date: '2026-06-10', track: 'MDP', meta: '3-day · ₹18,000', order: 3 },
  { title: 'MDP · Project Finance & Risk', date: '2026-05-22', track: 'MDP', meta: '4-day · ₹22,000', order: 4 },
  {
    title: 'Career Catalyst · CV & Cover Letter Workshop',
    date: '2026-05-22',
    track: 'Career Catalyst',
    meta: 'Mock-Interview Cell',
    order: 5,
  },
  {
    title: 'Career Catalyst · Mock GD-PI Day',
    date: '2026-05-22',
    track: 'Career Catalyst',
    meta: 'Mock-Interview Cell',
    order: 6,
  },
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

// Native <details> so calendar rows expand with keyboard and without JS.
function CalendarRow({ item, defaultOpen }) {
  const imgUrl = item.image ? urlFor(item.image).width(500).url() : null;
  const [y, m, d] = (item.date || '').split('-').map(Number);
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
          <h3 className="font-display text-lg font-semibold text-navy-900 mb-1">{item.title}</h3>
          <p className="text-xs text-ink-600">{item.meta}</p>
        </div>
        <span className="shrink-0 self-center pr-5 text-ink-400 transition-transform group-open:rotate-45">
          <Plus size={18} />
        </span>
      </summary>

      {(item.description || item.detailRows?.length > 0) && (
        <div className="pl-[76px]">
          <div className="px-5 pb-5 flex gap-5">
            <div className="min-w-0 flex-1">
              {item.description && (
                <p className="text-xs text-ink-600 leading-relaxed mb-4">{item.description}</p>
              )}
              {item.detailRows?.length > 0 && (
                <dl className="flex flex-wrap gap-x-5 gap-y-1 m-0">
                  {item.detailRows.map((r) => (
                    <div key={r.label} className="flex items-center gap-1.5 text-[11px]">
                      <dt className="text-navy-900 font-medium">{r.label}:</dt>
                      <dd className="text-ink-600 m-0">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
            <div
              className="w-[150px] h-[100px] shrink-0 rounded bg-gray-200 bg-cover bg-center"
              style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
            />
          </div>
        </div>
      )}
    </details>
  );
}

export default function DevProgrammes() {
  const facts = useKeyFacts();
  const { data } = useDevProgrammesData();
  const dp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const mdps = fillFactsDeep(data?.mdps?.length ? data.mdps : fallbackMdps, facts);
  const workshops = fillFactsDeep(
    data?.workshops?.length ? data.workshops : fallbackWorkshops,
    facts
  );
  const calendar = fillFactsDeep(
    data?.calendar?.length ? data.calendar : fallbackCalendar,
    facts
  );
  const pick = (k) => fillFactsDeep(dp[k]?.length ? dp[k] : fallbackPage[k], facts);
  const heroButtons = pick('heroButtons');
  const outcomes = pick('catalystOutcomes');
  const faqs = pick('faqs');
  const ctaButtons = pick('ctaButtons');

  const [tab, setTab] = useState(0);
  const [track, setTrack] = useState('All upcoming');

  const heroImageUrl = dp.heroImage ? urlFor(dp.heroImage).width(1600).url() : null;

  const tabs = [dp.mdpTabLabel, dp.catalystTabLabel, dp.customTabLabel];

  const trackChips = useMemo(() => {
    const present = new Set(calendar.map((c) => c.track).filter(Boolean));
    return [
      'All upcoming',
      ...(present.has('MDP') ? ['MDPs only'] : []),
      ...(present.has('Career Catalyst') ? ['Career Catalyst'] : []),
    ];
  }, [calendar]);

  const visibleCalendar = useMemo(() => {
    if (track === 'MDPs only') return calendar.filter((c) => c.track === 'MDP');
    if (track === 'Career Catalyst') return calendar.filter((c) => c.track === 'Career Catalyst');
    return calendar;
  }, [calendar, track]);

  const italic = dp.heroTitleItalic;
  const iIdx = italic ? (dp.heroTitle || '').indexOf(italic) : -1;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="min-h-[340px] md:h-[400px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: heroImageUrl
            ? `url('${heroImageUrl}')`
            : 'linear-gradient(180deg, #8a8f9e, #cfd3da)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-navy-950/10" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[55px] pt-32 pb-10 md:pb-[40px] md:h-full flex flex-col justify-end text-white">
          <div className="text-xs text-white/70 mb-4 flex items-center">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/events" className="hover:text-white">Events</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white">Development Programmes</span>
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90 mb-3">
            {dp.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            {iIdx === -1 ? (
              dp.heroTitle
            ) : (
              <>
                {dp.heroTitle.slice(0, iIdx)}
                <span className="italic">{italic}</span>
                {dp.heroTitle.slice(iIdx + italic.length)}
              </>
            )}
          </h1>
          <p className="max-w-md text-xs text-white/85 leading-relaxed mb-6">
            {dp.heroDescription}
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

      {/* Tabs */}
      <section id="tabs" className="py-12 lg:py-16 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div
            role="tablist"
            aria-label="Programme tracks"
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {tabs.map((t, i) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={i === tab}
                onClick={() => setTab(i)}
                className={`text-sm pb-2 border-b-2 transition-colors ${
                  i === tab
                    ? 'border-sky-600 text-navy-900 font-semibold'
                    : 'border-transparent text-ink-400 hover:text-ink-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* MDP tab */}
          {tab === 0 && (
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                {dp.mdpEyebrow}
              </span>
              <TitleWithHighlight
                text={dp.mdpTitle}
                highlight={dp.mdpTitleHighlight}
                className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3"
              />
              <p className="text-sm text-ink-600 max-w-lg mb-8">{dp.mdpSubtitle}</p>

              {/* Wide table scrolls inside its own container, never the page */}
              <div className="overflow-x-auto rounded-lg border border-navy-100">
                <table className="w-full min-w-[820px] border-collapse text-left">
                  <thead>
                    <tr className="bg-navy-900 text-white">
                      {['Programme', 'Dates', 'Format', 'Fee', ''].map((h, i) => (
                        <th
                          key={h || i}
                          scope="col"
                          className="text-[10px] font-semibold tracking-widest uppercase px-5 py-4 whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mdps.map((m) => (
                      <tr key={m._id || m.name} className="border-t border-navy-100">
                        <th
                          scope="row"
                          className="text-xs font-medium text-navy-900 px-5 py-4"
                        >
                          {m.name}
                        </th>
                        <td className="text-xs text-ink-600 px-5 py-4 whitespace-nowrap">
                          {m.dates}
                        </td>
                        <td className="text-xs text-ink-600 px-5 py-4 whitespace-nowrap">
                          {m.format}
                        </td>
                        <td className="text-xs text-ink-600 px-5 py-4 whitespace-nowrap">
                          {m.fee}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <a
                            href={m.ctaUrl || '/contact'}
                            className="bg-sky-600 hover:bg-teal-600 transition-colors text-white text-[11px] font-medium px-3.5 py-2 rounded whitespace-nowrap inline-block"
                          >
                            {m.ctaLabel || 'Reserve your seat'}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Career Catalyst tab */}
          {tab === 1 && (
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                {dp.catalystEyebrow}
              </span>
              <TitleWithHighlight
                text={dp.catalystTitle}
                highlight={dp.catalystTitleHighlight}
                className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3"
              />
              <p className="text-sm text-ink-600 mb-8">{dp.catalystSubtitle}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                {workshops.map((w) => (
                  <div
                    key={w._id || w.name}
                    className="border border-navy-100 border-l-2 border-l-sky-600 rounded-sm px-6 py-5"
                  >
                    <h3 className="font-display text-xl font-semibold text-navy-900 mb-2">
                      {w.name}
                    </h3>
                    <p className="text-xs text-ink-600 mb-5">{w.summary}</p>
                    <a
                      href={w.ctaUrl || '/contact'}
                      className="bg-navy-900 hover:bg-navy-800 transition-colors text-white text-xs font-medium px-4 py-2.5 rounded inline-block"
                    >
                      {w.ctaLabel || 'Book my seat'}
                    </a>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {outcomes.map((o) => (
                  <div key={o.value} className="border border-navy-100 rounded-sm px-6 py-5">
                    <p className="font-display text-2xl font-semibold text-navy-900 mb-2">
                      {o.value}
                    </p>
                    <p className="text-xs text-ink-600 leading-relaxed">{o.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom in-company tab */}
          {tab === 2 && (
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                {dp.customEyebrow}
              </span>
              <TitleWithHighlight
                text={dp.customTitle}
                highlight={dp.customTitleHighlight}
                className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4"
              />
              <p className="text-sm text-ink-600 max-w-lg mb-7 leading-relaxed">
                {dp.customSubtitle}
              </p>
              <a
                href={dp.customCtaUrl || '/contact'}
                className="bg-navy-900 hover:bg-navy-800 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md inline-flex items-center gap-2"
              >
                {dp.customCtaLabel} <ArrowUpRight size={15} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Calendar */}
      <section id="calendar" className="py-16 lg:py-20 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {dp.calendarEyebrow}
            </span>
            <TitleWithHighlight
              text={dp.calendarTitle}
              highlight={dp.calendarTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4"
            />
            <p className="text-sm text-ink-600">{dp.calendarSubtitle}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {trackChips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setTrack(c)}
                aria-pressed={c === track}
                className={`text-xs px-4 py-2 rounded-md transition-colors ${
                  c === track
                    ? 'bg-navy-900 text-white'
                    : 'text-ink-600 hover:text-navy-900 hover:bg-navy-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="max-w-[900px] mx-auto flex flex-col gap-4">
            {visibleCalendar.map((c, i) => (
              <CalendarRow key={c._id || c.title} item={c} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[900px] mx-auto px-6 lg:px-0">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {dp.faqEyebrow}
            </span>
            <TitleWithHighlight
              text={dp.faqTitle}
              highlight={dp.faqTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5"
            />
          </div>

          <div className="border-t border-navy-100">
            {faqs.map((f, i) => (
              <details key={f.question} open={i === 0} className="group border-b border-navy-100">
                <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="text-sm font-medium text-navy-900">{f.question}</span>
                  <ChevronDown
                    size={16}
                    className="shrink-0 text-ink-400 transition-transform group-open:rotate-180"
                  />
                </summary>
                {f.answer && (
                  <p className="text-xs text-ink-600 leading-relaxed pb-5 pr-8">{f.answer}</p>
                )}
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-navy-900 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-white/70">
            {dp.ctaEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-5 mb-4">
            {dp.ctaTitle}
          </h2>
          <p className="text-sm text-white/75 mb-8 max-w-xl mx-auto leading-relaxed">
            {dp.ctaSubtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {ctaButtons.map((b) => (
              <a
                key={b.label}
                href={b.url || '#'}
                className={`text-sm font-medium px-4 py-2.5 rounded-md transition-colors flex items-center gap-2 ${
                  b.primary
                    ? 'bg-sky-600 hover:bg-teal-600 text-white'
                    : 'bg-white hover:bg-gray-100 text-navy-900'
                }`}
              >
                {b.label}
                {b.primary && <ArrowUpRight size={14} />}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
