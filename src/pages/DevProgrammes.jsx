import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import PageHero, { HeroButton } from '../components/PageHero';
import SessionCard from '../components/SessionCard';
import { Section, SectionTitle, Tagline, Heading, H5, H6 } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { useDevProgrammesData } from '../lib/useDevProgrammesData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';
import CountUp from '../components/CountUp';

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

// Figma photo used when a calendar entry has no Sanity image.
const CALENDAR_PHOTO = '/images/events/dev-mdp.webp';

// Figma bar card: hairline + "small" shadow, 3px Eastern Blue bar, content 32 from it.
function BarCard({ children }) {
  return (
    <div className="rounded-lg overflow-hidden rounded-lg overflow-hidden flex gap-4 md:gap-8 bg-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small">
      <span className="w-[3px] shrink-0 bg-teal-500" aria-hidden="true" />
      <div className="flex-1 min-w-0 py-4 pr-4 flex flex-col gap-2">{children}</div>
    </div>
  );
}

export default function DevProgrammes() {
  const facts = useKeyFacts();
  const { data } = useDevProgrammesData();
  const dp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const mdps = fillFactsDeep(data?.mdps?.length ? data.mdps : fallbackMdps, facts);
  const workshops = fillFactsDeep(data?.workshops?.length ? data.workshops : fallbackWorkshops, facts);
  const calendar = fillFactsDeep(data?.calendar?.length ? data.calendar : fallbackCalendar, facts);
  const pick = (k) => fillFactsDeep(dp[k]?.length ? dp[k] : fallbackPage[k], facts);
  const heroButtons = pick('heroButtons');
  const outcomes = pick('catalystOutcomes');
  const faqs = pick('faqs');
  const ctaButtons = pick('ctaButtons');

  const [tab, setTab] = useState(0);
  const [track, setTrack] = useState('All upcoming');

  const tabs = [dp.mdpTabLabel, dp.catalystTabLabel, dp.customTabLabel];
  const trackChips = ['All upcoming', 'MDPs only', 'Career Catalyst'];

  const visibleCalendar = useMemo(() => {
    if (track === 'MDPs only') return calendar.filter((c) => c.track === 'MDP');
    if (track === 'Career Catalyst') return calendar.filter((c) => c.track === 'Career Catalyst');
    return calendar;
  }, [calendar, track]);

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(dp.heroImage, '/images/events/dev-hero.webp', { stretch: true })}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Events', to: '/events' }, { label: 'Development Programmes' }]}
        eyebrow={dp.heroEyebrow}
        eyebrowUpper
        title={dp.heroTitle}
        titleItalic={dp.heroTitleItalic}
        titleWidth={845}
        description={dp.heroDescription}
        descriptionWidth={628}
        actions={heroButtons.map((b) => ({ label: b.label, href: b.url, primary: b.primary }))}
      />

      {/* Tracks — centred underline tabs (active navy 500 over a 3px Eastern Blue
          rule, others #6c709d), then the tab's title and content 64 below. */}
      <Section id="tabs" width={1280} className="scroll-mt-24">
        <div role="tablist" aria-label="Programme tracks" className="flex flex-wrap justify-center">
          {tabs.map((t, i) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={i === tab}
              onClick={() => setTab(i)}
              className={`px-4 pt-2.5 flex flex-col items-center gap-2 text-base leading-[150%] ${
                i === tab ? 'font-medium text-navy-900' : 'text-navy-600 hover:text-navy-900'
              }`}
            >
              {t}
              <span className={`h-[3px] w-full ${i === tab ? 'bg-teal-500' : 'bg-transparent'}`} aria-hidden="true" />
            </button>
          ))}
        </div>

        <div className="mt-16">
          {tab === 0 && (
            <div className="flex flex-col gap-12">
              <SectionTitle tagline={dp.mdpEyebrow} title={dp.mdpTitle} body={dp.mdpSubtitle} />
              {/* Figma table: navy 64px header (14/150 white uppercase), 64px white rows. */}
              <div className="overflow-x-auto rounded-lg">
                <table className="w-full min-w-[900px] border-collapse text-left">
                  <thead>
                    <tr className="bg-navy-900 text-white">
                      {['Programme', 'Dates', 'Format', 'Fee', ''].map((h, i) => (
                        <th key={h || i} scope="col" className="h-16 px-6 text-sm leading-[150%] font-normal uppercase">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mdps.map((m) => (
                      <tr key={m._id || m.name} className="border-b border-[#fefefe]">
                        <th scope="row" className="h-16 px-6 text-sm leading-[150%] font-normal text-black">
                          {m.name}
                        </th>
                        <td className="h-16 px-6 text-sm leading-[150%] text-black whitespace-nowrap">{m.dates}</td>
                        <td className="h-16 px-6 text-sm leading-[150%] text-black whitespace-nowrap">{m.format}</td>
                        <td className="h-16 px-6 text-sm leading-[150%] text-black whitespace-nowrap">{m.fee}</td>
                        <td className="h-16 px-6">
                          <a
                            href={m.ctaUrl || '/contact'}
                            className="inline-flex items-center h-[37px] px-5 rounded-md bg-teal-500 hover:bg-teal-600 text-sm leading-[150%] text-white whitespace-nowrap transition-colors"
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

          {tab === 1 && (
            <div className="flex flex-col gap-12">
              <SectionTitle tagline={dp.catalystEyebrow} title={dp.catalystTitle} highlight={dp.catalystTitleHighlight} body={dp.catalystSubtitle} />
              <div className="grid md:grid-cols-3 gap-8">
                {workshops.map((w) => (
                  <BarCard key={w._id || w.name}>
                    <H5 as="h3">{w.name}</H5>
                    <p className="text-base leading-[150%] text-black">{w.summary}</p>
                    <HeroButton label={w.ctaLabel || 'Book my seat'} href={w.ctaUrl || '/contact'} primary className="mt-4 w-fit" />
                  </BarCard>
                ))}
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {outcomes.map((o) => (
                  <div key={o.value} className="rounded-lg p-6 flex flex-col gap-2 outline outline-1 -outline-offset-1 outline-black/20 shadow-small">
                    <H5 as="p"><CountUp value={o.value} /></H5>
                    <p className="text-base leading-[150%] text-black">{o.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 2 && (
            <div className="flex flex-col gap-8 items-start">
              <SectionTitle tagline={dp.customEyebrow} title={dp.customTitle} highlight={dp.customTitleHighlight} body={dp.customSubtitle} />
              <HeroButton label={dp.customCtaLabel} href={dp.customCtaUrl || '/contact'} primary />
            </div>
          )}
        </div>
      </Section>

      {/* Calendar — centred title, radius-4 filter tabs, wide session cards. */}
      <Section id="calendar" width={1280} className="scroll-mt-24">
        <SectionTitle center tagline={dp.calendarEyebrow} title={dp.calendarTitle} body={dp.calendarSubtitle} />
        <div className="mt-20 flex flex-wrap justify-center">
          {trackChips.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setTrack(c)}
              aria-pressed={c === track}
              className={`h-11 px-4 rounded text-base leading-[150%] transition-colors ${
                c === track ? 'bg-navy-900 text-white font-medium outline outline-1 -outline-offset-1 outline-black/20' : 'text-black hover:bg-navy-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-20 flex flex-col gap-8">
          {visibleCalendar.length > 0 ? (
            visibleCalendar.map((c, i) => (
              <SessionCard
                key={c._id || c.title}
                s={{ ...c, imageUrl: c.image && urlFor(c.image).width(760).auto('format').url() }}
                wide
                fallbackImage={CALENDAR_PHOTO}
                defaultOpen={i === 0}
              />
            ))
          ) : (
            <p className="text-center text-base leading-[150%] text-black">No programmes in this track yet.</p>
          )}
        </div>
      </Section>

      {/* FAQ — centred title; 768 hairline-boxed accordion, 22px Playfair
          questions in 72px rows with a 32px chevron. */}
      <Section width={768}>
        <div className="text-center">
          <Tagline>{dp.faqEyebrow}</Tagline>
          <Heading text={dp.faqTitle} className="mt-3 md:mt-4 text-navy-900" />
        </div>
        <div className="rounded-lg overflow-hidden rounded-lg overflow-hidden mt-20 border border-black/20">
          {faqs.map((f, i) => (
            <details key={f.question} open={i === 0} className="group">
              <summary className="flex items-center gap-6 py-5 border-b border-black/20 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <H6 as="h3" className="flex-1 text-black">
                  {f.question}
                </H6>
                <ChevronDown size={32} strokeWidth={1.5} className="shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              {f.answer && <p className="pt-4 pb-6 text-base leading-[150%] text-black border-b border-black/20">{f.answer}</p>}
            </details>
          ))}
        </div>
      </Section>

      {/* Closing CTA — navy, 64 padding, centred 768 column. */}
      <section className="bg-navy-900 px-5 py-16 md:p-16">
        <div className="max-w-[768px] mx-auto text-center">
          <SectionTitle center dark tagline={dp.ctaEyebrow} title={dp.ctaTitle} body={dp.ctaSubtitle} />
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {ctaButtons.map((b) => (
              <HeroButton key={b.label} label={b.label} href={b.url} primary={b.primary} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
