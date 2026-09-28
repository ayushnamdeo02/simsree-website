import { useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import SessionCard from '../components/SessionCard';
import { Section, SectionTitle } from '../components/ui';

// Industry Events Hub — built from the Figma "Industry Events Hub" frame. The
// sessions below are the design's content; there is no Sanity schema for them yet.
const page = {
  heroEyebrow: 'Industry in the classroom',
  heroTitle: 'Industry Events Hub.',
  heroDescription:
    'Weekly guest lectures · CXO panels · live project briefings · breakfast briefings. Curated by the Corporate Relations — open to all programmes.',
  heroButtons: [
    { label: 'Get weekly invites by email', url: 'mailto:corporate.relations@simsree.org', primary: true },
    { label: 'Suggest a speaker', url: '/contact' },
  ],
};

const fri = (dayNum, monthLabel) => ({ dayName: 'Fri', dayNum, monthLabel });

const SECTIONS = [
  {
    id: 'guest-lectures',
    tab: 'Guest Lectures',
    eyebrow: 'Weekly · Open to all',
    title: 'Every week. Every function.',
    body: 'A senior industry leader on campus every week. RSVP for any · subscribe for weekly invites.',
    sessions: [
      {
        ...fri('06', 'MAY 2024'),
        title: 'ESG Disclosure Standards',
        meta: 'Open · 3pm Auditorium',
        description:
          "RBI's 2026 ESG disclosure mandate breakdown · what it means for risk-weighted assets, green bonds, Scope-3 accounting.",
        detailRows: [
          { label: 'Speaker', value: 'Vikram Sharma · MD Morgan Stanley India' },
          { label: 'Format', value: 'In-person' },
        ],
        ctaLabel: 'RSVP for the next talk',
        ctaUrl: 'mailto:corporate.relations@simsree.org',
        imageUrl: '/images/events/flag-3.webp',
      },
      { ...fri('13', 'MAY 2024'), title: "India's Renewable Capex Cycle", meta: 'Open · 4pm Seminar Hall' },
      { ...fri('20', 'MAY 2024'), title: 'Brand Building in Tier-2 India', meta: 'Marketing & Media' },
      { ...fri('27', 'MAY 2024'), title: 'Indian Pharma Going Global', meta: 'Open · 3pm Auditorium' },
    ],
  },
  {
    id: 'corporate-interactions',
    tab: 'Corporate Interactions',
    eyebrow: 'CXO panels · Live projects · Briefings',
    title: 'Corporate interactions.',
    body: 'CXO panel discussions, live consulting projects, breakfast briefings, and recruiter-led sessions. Organised by the Corporate Relations Committee in partnership with our recruiters.',
    sessions: [
      {
        ...fri('12', 'MAY 2024'),
        title: 'CXO Panel · Digital Transformation in BFSI',
        meta: 'Open · 3pm Auditorium',
        description:
          "Three CFOs and one chief digital officer on what's actually working in BFSI digital programmes vs theatre. 60-min panel + 20-min Q&A.",
        detailRows: [
          { label: 'Panel', value: 'Deloitte + Axis + ICICI' },
          { label: 'Format', value: 'In-person' },
          { label: 'Cohort', value: 'MMS, MFM, M.Sc. Finance' },
        ],
        ctaLabel: 'RSVP',
        ctaUrl: 'mailto:corporate.relations@simsree.org',
        imageUrl: '/images/events/industry-cxo.webp',
      },
      { ...fri('19', 'MAY 2024'), title: 'Live Project Briefing · Piramal Healthcare', meta: 'MMS 2024-26 · application-based · 5 weeks' },
      { ...fri('2', 'JUN 2024'), title: 'Breakfast Briefing · Future of Banking', meta: 'CR Committee + Citi · 8am Cafe Mocha · 20 seats' },
      { ...fri('27', 'MAY 2024'), title: 'Brand Studio Workshop · Asian Paints', meta: 'MMM cohort · 3-hour intensive' },
      { ...fri('16', 'JUN 2026'), title: 'Recruiter Roundtable · Big Four Strategy', meta: 'Final-year MMS · pre-placement window' },
      { ...fri('23', 'JUN 2024'), title: 'Founders Studio · Pitch & Feedback', meta: 'Open to all · VC panel feedback' },
    ],
  },
];

const archive = {
  id: 'archive',
  tab: 'Archive',
  eyebrow: 'Searchable archive · Since 2021',
  title: 'All past sessions.',
  body: 'Every guest lecture, panel and workshop since 2021. Click "Recap" for notes, photos and links to recordings (where speaker consented).',
  rows: [
    ['22 Apr 2026', 'Anjali Mehta', 'Piramal Group', 'Capital Allocation', 'Lecture'],
    ['15 Apr 2026', 'Rohan Bhatia', 'Morgan Stanley', 'Sell-Side Careers', 'Lecture'],
    ['08 Apr 2026', 'Aanchal Krishnan', 'HUL', 'Brand Portfolio Strategy', 'Lecture'],
    ['01 Apr 2026', 'Citi Markets Team', 'Citi', 'Outlook Q2 FY26', 'Briefing'],
    ['25 Mar 2026', 'Dr Anand Patel', 'ReNew Power', 'Renewable Capex Cycle', 'Lecture'],
    ['18 Mar 2026', 'Vikram Sharma', 'Morgan Stanley', 'ESG Disclosure', 'Lecture'],
    ['11 Mar 2026', 'KPMG · EY · Deloitte', 'Big Four', 'Recruiter Roundtable', 'Roundtable'],
    ['04 Mar 2026', 'Deepa Gopal', 'Mahindra Strategy', 'M&A Playbook', 'Lecture'],
    ['25 Feb 2026', 'Asian Paints Brand Team', 'Asian Paints', 'Royale Tier-2 Pitch', 'Workshop'],
    ['18 Feb 2026', 'Bajaj Finserv FX Desk', 'Bajaj Finserv', 'Currency Markets', 'Briefing'],
    ['11 Feb 2026', 'Sunita Roy', 'Wipro', 'Services-to-SaaS', 'Lecture'],
    ['04 Feb 2026', 'Sequoia + Blume', 'VC Panel', 'Founders Studio · Pitch Night', 'Pitch'],
  ],
};

const recent = {
  eyebrow: 'Recent sessions',
  title: 'Click any item to see details.',
  body: 'Each entry expands with speaker bio, format, attendance and a quick recap.',
  sessions: [
    {
      ...fri('15', 'APRIL 2026'),
      title: 'Capital Allocation in a High-Rate Cycle',
      meta: 'Morgan Stanley · CFO Office',
      description:
        'Vikram Sharma, MD of Strategy at Morgan Stanley India, walked the cohort through capital allocation frameworks under sustained higher rates.',
      detailRows: [
        { label: 'Speaker', value: 'Vikram Sharma · MD Morgan Stanley India' },
        { label: 'Format', value: 'In-person' },
        { label: 'Attended', value: '108 students' },
      ],
      imageUrl: '/images/events/flag-3.webp',
    },
    { ...fri('22', 'APR 2026'), title: "The Brand Manager's Toolkit · 2026 edition", meta: 'Hindustan Unilever' },
    { ...fri('06', 'MAY 2026'), title: 'ESG @ Indian Banks · 2026 Disclosure Mandate', meta: 'Corporate Relations · 3pm Auditorium' },
    { ...fri('19', 'MAR 2026'), title: 'Operations at Scale · The Zomato Story', meta: 'Zomato' },
    { ...fri('11', 'MAR 2026'), title: 'Consulting Mindset · Frameworks Behind the Frameworks', meta: 'McKinsey & Co.' },
    { ...fri('18', 'APR 2026'), title: 'Corporate Visit · National Stock Exchange', meta: 'NSE Mumbai · BKC' },
    { ...fri('30', 'MAR 2026'), title: 'Corporate Visit · Mahindra Mumbai HQ', meta: 'Worli' },
    { ...fri('14', 'FEB 2026'), title: 'Plant Visit · Tata Steel Jamshedpur', meta: 'Jharkhand' },
  ],
};

const TABS = [...SECTIONS.map((s) => ({ id: s.id, label: s.tab })), { id: archive.id, label: archive.tab }];

// Figma "Filters": 44px radius-4 tabs, the section's own tab navy. Desktop shows
// all three sections, each under its own bar, so a tab jumps to its section.
function Tabs({ active, onSelect }) {
  return (
    <nav aria-label="Industry events sections" className="flex flex-wrap max-md:justify-center">
      {TABS.map((t) => (
        <a
          key={t.id}
          href={`#${t.id}`}
          onClick={() => onSelect(t.id)}
          aria-current={t.id === active ? 'true' : undefined}
          className={`h-11 px-4 inline-flex items-center rounded text-base leading-[150%] ${
            t.id === active ? 'bg-navy-900 text-white font-medium outline outline-1 -outline-offset-1 outline-black/20' : 'text-black hover:bg-navy-50'
          }`}
        >
          {t.label}
        </a>
      ))}
    </nav>
  );
}

// Figma "Tag": #e9f3f8, Eastern Blue 14/150, radius 16.
function FormatTag({ children }) {
  return <span className="inline-flex px-2.5 py-1 rounded-2xl bg-sky-50 text-sm leading-[150%] text-sky-600">{children}</span>;
}

export default function IndustryEvents() {
  const [mobileTab, setMobileTab] = useState(SECTIONS[0].id);
  // Mobile (Figma): the two session sections swap under the tabs; the archive
  // always follows them, so its tab just scrolls there. Desktop shows all.
  const mobileOnly = (id) => (mobileTab === id ? '' : 'max-lg:hidden');
  const select = (id) => id !== archive.id && setMobileTab(id);

  return (
    <div className="bg-white">
      <PageHero
        image="/images/events/industry-hero.webp"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Events', to: '/events' }, { label: 'Industry Events Hub' }]}
        eyebrow={page.heroEyebrow}
        eyebrowUpper
        title={page.heroTitle}
        titleWidth={670}
        description={page.heroDescription}
        descriptionWidth={628}
        actions={page.heroButtons.map((b) => ({ label: b.label, href: b.url, primary: b.primary }))}
      />

      {/* Session sections — tabs, left title (48 below), 1280 wide cards 32 apart. */}
      {SECTIONS.map((sec) => (
        <Section key={sec.id} id={sec.id} width={1280} className={`scroll-mt-24 ${mobileOnly(sec.id)}`}>
          <Tabs active={sec.id} onSelect={select} />
          <SectionTitle className="mt-12" tagline={sec.eyebrow} title={sec.title} body={sec.body} />
          <div className="mt-12 flex flex-col gap-8">
            {sec.sessions.map((s, i) => (
              <SessionCard key={s.title} s={s} wide defaultOpen={i === 0} />
            ))}
          </div>
        </Section>
      ))}

      {/* Archive — navy header row (16 semibold white), 64px rows zebra-striped
          white / #eaeaf1@50, format tag and a "Read the recap" outline button. */}
      <Section id={archive.id} width={1280} className="scroll-mt-24">
        <Tabs active={archive.id} onSelect={select} />
        <SectionTitle className="mt-12" tagline={archive.eyebrow} title={archive.title} body={archive.body} />
        <div className="mt-12 overflow-x-auto rounded-lg">
          <table className="w-full min-w-[1000px] border-collapse text-left">
            <thead>
              <tr className="bg-navy-900 text-white">
                {['Date', 'Speaker', 'Company', 'Topic', 'Format', ''].map((h, i) => (
                  <th key={i} scope="col" className="h-16 px-6 first:pl-6 text-base leading-[150%] font-semibold uppercase">
                    {i === 0 ? (
                      <span className="inline-flex items-center gap-2">
                        {h} <ArrowDown size={20} strokeWidth={1.5} aria-hidden="true" />
                      </span>
                    ) : (
                      h
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {archive.rows.map((r, i) => (
                <tr key={r[0] + r[1]} className={i % 2 ? 'bg-navy-50/50' : 'bg-white'}>
                  {r.slice(0, 4).map((c, ci) => (
                    <td key={ci} className="h-16 px-6 text-sm leading-[150%] text-black">
                      {c}
                    </td>
                  ))}
                  <td className="h-16 px-6">
                    <FormatTag>{r[4]}</FormatTag>
                  </td>
                  <td className="h-16 px-6">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 h-[37px] px-5 rounded-md bg-white outline outline-1 -outline-offset-1 outline-black/20 text-sm leading-[150%] text-navy-900 whitespace-nowrap hover:bg-navy-50"
                    >
                      Read the recap <ArrowUpRight size={18} strokeWidth={1.5} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Recent sessions — centred title, the same wide cards. */}
      <Section width={1280}>
        <SectionTitle center tagline={recent.eyebrow} title={recent.title} body={recent.body} />
        <div className="mt-20 flex flex-col gap-8">
          {recent.sessions.map((s, i) => (
            <SessionCard key={s.title} s={s} wide defaultOpen={i === 0} />
          ))}
        </div>
      </Section>
    </div>
  );
}
