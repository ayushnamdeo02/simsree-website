import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import StatCard from '../components/StatCard';
import { usePlacementsData } from '../lib/usePlacementsData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackPage = {
  heroEyebrow: 'For Recruiters',
  heroTitle: 'Hire from the 2024-26 batch.',
  heroTitleItalic: '2024-26 batch.',
  heroDescription:
    '120 students, 26% women, 63% with prior work-ex. Placement window opens January 2026 — book your interview slot now.',
  heroPrimaryCtaLabel: 'Book a campus visit',
  heroPrimaryCtaUrl: '/placements/contact',
  heroSecondaryCtaLabel: 'See why recruit here',
  heroSecondaryCtaUrl: '/placements/why-recruit',
  heroTertiaryCtaLabel: 'Download the recruiter brochure (PDF)',
  heroTertiaryCtaUrl: '#reports',

  stats: [
    { label: 'Placement', value: '100%', dark: true },
    { label: 'Avg CTC', value: '{{avgCtc}}', dark: false },
    { label: 'Highest CTC', value: '{{highestCtc}}', dark: true },
    { label: 'Recruiters', value: '120+', dark: false },
  ],

  pathsEyebrow: 'Two Paths',
  pathsTitle: 'Pick your next step.',
  pathsTitleHighlight: 'next step.',
  pathsSubtitle: 'Get what you need, wherever you are starting.',
  pathCards: [
    {
      label: 'Recruiter Path',
      title: '3 steps to start hiring today',
      steps: [
        'Read the case for hiring here',
        'Download the batch profile (PDF) for your team',
        'Book a Campus Visit slot through the Placement Cell',
      ],
      primaryCtaLabel: 'Start hiring now',
      primaryCtaUrl: '/placements/contact',
      secondaryCtaLabel: 'Email {{placementEmail}}',
      secondaryCtaUrl: 'mailto:placements@simsree.org',
    },
    {
      label: 'Prospect Path',
      title: 'See where SIMSREE students land',
      body: 'See the latest report, the sector split, and the firms that hire again and again.',
      primaryCtaLabel: 'Download the 2024-25 final report (PDF)',
      primaryCtaUrl: '#reports',
      secondaryCtaLabel: 'See all {{recruiterCount}} recruiters',
      secondaryCtaUrl: '/placements/partners',
    },
  ],

  partnersEyebrow: 'Our Recruiting Partners',
  partnersTitle: 'Pick a sector. We have a partner there.',
  partnersSubtitle:
    '120+ companies recruit at SIMSREE every cycle — banking, consulting, FMCG, tech, manufacturing, pharma, payments and beyond. Move your cursor over the grid to bring any logo into focus.',
  partnersCtaLabel: 'Final Report 2024-25',
  partnersCtaUrl: '#reports',

  processEyebrow: 'How Placement Works',
  processTitle: 'Student-driven · faculty-guided.',
  processTitleHighlight: 'faculty-guided.',
  processSubtitle: 'Here is how hiring works, in six steps.',

  reportsEyebrow: 'Reports',
  reportsTitle: 'Detailed outcomes per year',
  reportsTitleHighlight: 'outcomes',
  reportsSubtitle: 'Three reports · final, summer, executive · current year + multi-year archive.',

  cellEyebrow: 'Direct Line to the Cell',
  cellTitle: 'Speak to the Placement Office.',
  cellSubtitle: 'Paras Surve · +91 8830 332 100 · Sahil Sawant · +91 8097 251 728',
  cellButtons: [
    { label: 'Call Paras Surve', url: 'tel:+918830332100', primary: true },
    { label: 'WhatsApp Sahil', url: '#', primary: false },
    { label: 'Email placements@', url: 'mailto:placements@simsree.org', primary: false },
    { label: 'All placement contacts', url: '/placements/contact', primary: false },
  ],

  journeyEyebrow: 'The Placement Journey',
  journeyTitle: 'Six steps · fully transparent.',
  journeyTitleHighlight: 'fully transparent.',
  journeySubtitle:
    'Every interaction with a recruiter follows the same student-led, faculty-mentored process. No black box.',

  factPanels: [
    {
      title: 'Average per visit',
      rows: [
        { label: 'Time on campus', value: '1 day' },
        { label: 'Candidates seen', value: '14-22' },
        { label: 'Offer roll', value: 'Same day' },
      ],
    },
    {
      title: 'Logistics handled',
      rows: [
        { label: 'Travel coordination', value: '1 day' },
        { label: 'Audio/video setup', value: '14-22' },
        { label: 'Lunch + breakouts', value: 'Same day' },
      ],
    },
    {
      title: 'Faculty involvement',
      rows: [
        { label: 'Process oversight', value: '1 day' },
        { label: 'Panel support', value: '14-22' },
        { label: 'Final escalations', value: 'Same day' },
      ],
    },
  ],
};

const fallbackPartners = [
  'Barclays', 'Deloitte', 'Citi', 'Deutsche Bank', 'Godrej & Boyce', 'Finserv', 'Goldman', 'Wells Fargo',
  'Morgan Stanley', 'BNP', 'De Shaw', 'HUL', 'Asian Paints', 'Marico', 'Bajaj Finserv', 'L&T',
  'Infosys', 'BNP', 'De Shaw', 'HUL', 'Asian Paints', 'Marico', 'Bajaj Finserv', 'L&T',
  'Wipro', 'Deloitte', 'Citi', 'Deutsche Bank', 'Godrej & Boyce', 'Finserv', 'Goldman', 'Wells Fargo',
  'Cipla', 'BNP', 'De Shaw', 'HUL', 'Asian Paints', 'Marico', 'Bajaj Finserv', 'L&T',
  'Standard Chartered', 'BNP', 'De Shaw', 'HUL', 'Asian Paints', 'Marico', 'Bajaj Finserv', 'L&T',
  'Adobe', 'BNP', 'De Shaw', 'HUL', 'Asian Paints', 'Marico', 'Bajaj Finserv', 'L&T',
  'Paytm', 'BNP', 'De Shaw', 'HUL', 'Asian Paints', 'Marico', 'Bajaj Finserv', 'L&T',
].map((name, i) => ({ name, order: i + 1 }));

const fallbackHiringSteps = [
  {
    timing: 'Day 0 · 45-60 min',
    title: 'Pre-Placement Talk',
    description: 'You brief students on the role and projects.',
    meta: 'Run by: Placement Committee',
    order: 1,
  },
  {
    timing: 'Day 1 · 24-hr window',
    title: 'Resume Scrutiny',
    description: 'We send you resumes to shortlist.',
    meta: 'Owner: Placement Portal · PlaceComm',
    order: 2,
  },
  {
    timing: 'Day 2 · 90 min',
    title: 'Group Discussion',
    description: 'Shortlisted students move to your selection round.',
    meta: 'Moderated by: Placement Officer',
    order: 3,
  },
  {
    timing: 'Day 3 · 30-45 min/slot',
    title: 'Personal Interviews',
    description: 'You interview candidates one on one.',
    meta: 'Slot managed by: PlaceComm',
    order: 4,
  },
  {
    timing: 'Day 3 EOD',
    title: 'Final Selection',
    description: 'Final results are announced.',
    meta: 'Moderated by: Placement Officer',
    order: 5,
  },
  {
    timing: 'Within 2 weeks',
    title: 'Final Offer',
    description: 'You make offers to the students you select.',
    meta: 'Audited by: Cell',
    order: 6,
  },
];

const fallbackReports = [
  {
    title: 'Final Placement Report',
    tag: 'Current · Archive',
    description: '{{placementRate}} placement · {{avgCtc}} avg CTC · top 12 recruiters listed.',
    downloadLabel: 'Download',
    order: 1,
  },
  {
    title: 'Summer Placement Report',
    tag: 'Year 1 internships',
    description: '100% summer · ₹85K avg stipend · 62% PPO conversion.',
    downloadLabel: 'Download',
    order: 2,
  },
  {
    title: 'Executive Placement Report',
    tag: 'MFM · MMM',
    description: '5.7 candidate CGL each 25 minutes · Faculty observers join for first-time recruiters.',
    downloadLabel: 'Download',
    order: 3,
  },
];

const fallbackJourneySteps = [
  {
    title: 'Pre-Placement Talk',
    description:
      'Company arrives on campus · briefs the cohort about the role, mandate, team and growth track. 45-60 minutes including Q&A.',
    order: 1,
  },
  {
    title: 'Resume Scrutiny',
    description:
      'Interested candidates upload resumes via the Placement Portal. Placement Committee normalises to the recruiter preferred format and ships within 24 hours.',
    order: 2,
  },
  {
    title: 'Shortlist',
    description:
      'Recruiter shares shortlist by midnight 2 days before the slot. Candidates get individual SMS + email notifications by 8am the next morning.',
    order: 3,
  },
  {
    title: 'Aptitude · Case · optional',
    description:
      'Roles requiring quantitative aptitude or case-solving get a 75-90 minute on-campus written/online round. Most consulting and finance recruiters use this stage.',
    order: 4,
  },
  {
    title: 'Group Discussion',
    description:
      'Groups of 8-10 · 20 minutes each · moderated by Placement Officer with faculty observers. Held in the seminar hall.',
    order: 5,
  },
  {
    title: 'Personal Interviews · Offer',
    description:
      '2-3 round PIs · ending the same day with offer rollouts in the auditorium. Average time from PPT to offer: 3-4 hours.',
    order: 6,
  },
];

function TitleWithHighlight({ text, highlight, className }) {
  const idx = highlight ? (text || '').indexOf(highlight) : -1;
  if (idx === -1) return <h2 className={className}>{text}</h2>;
  return (
    <h2 className={className}>
      {text.slice(0, idx)}
      <span className="text-teal-500">{highlight}</span>
      {text.slice(idx + highlight.length)}
    </h2>
  );
}

export default function Placements() {
  const facts = useKeyFacts();
  const { data } = usePlacementsData();
  const pp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const partners = fillFactsDeep(data?.partners?.length ? data.partners : fallbackPartners, facts);
  const hiringSteps = fillFactsDeep(data?.hiringSteps?.length ? data.hiringSteps : fallbackHiringSteps, facts);
  const reports = fillFactsDeep(data?.reports?.length ? data.reports : fallbackReports, facts);
  const journeySteps = fillFactsDeep(data?.journeySteps?.length ? data.journeySteps : fallbackJourneySteps, facts);
  const pathCards = fillFactsDeep(pp.pathCards?.length ? pp.pathCards : fallbackPage.pathCards, facts);
  const cellButtons = fillFactsDeep(pp.cellButtons?.length ? pp.cellButtons : fallbackPage.cellButtons, facts);
  const factPanels = fillFactsDeep(pp.factPanels?.length ? pp.factPanels : fallbackPage.factPanels, facts);

  const heroImageUrl = pp.heroImage ? urlFor(pp.heroImage).width(1600).url() : null;
  const journeyImageUrl = pp.journeyImage ? urlFor(pp.journeyImage).width(1000).url() : null;

  // Hero title: render the italic tail in serif italic (Figma)
  const italic = pp.heroTitleItalic;
  const iIdx = italic ? (pp.heroTitle || '').indexOf(italic) : -1;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="min-h-[560px] md:h-[660px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: heroImageUrl
            ? `url('${heroImageUrl}')`
            : 'linear-gradient(180deg, #8a8f9e, #cfd3da)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-navy-950/10" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[55px] pt-32 pb-12 md:pb-[72px] md:h-full flex flex-col justify-end text-white">
          <span className="inline-block w-fit bg-navy-900 text-white text-[11px] font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            {pp.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-5">
            {iIdx === -1 ? (
              pp.heroTitle
            ) : (
              <>
                {pp.heroTitle.slice(0, iIdx)}
                <span className="italic">{italic}</span>
                {pp.heroTitle.slice(iIdx + italic.length)}
              </>
            )}
          </h1>
          <p className="max-w-xl text-sm text-white/85 leading-relaxed mb-8">{pp.heroDescription}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={pp.heroPrimaryCtaUrl}
              className="bg-sky-600 hover:bg-teal-600 transition-colors text-white font-medium px-5 py-3 rounded-md flex items-center gap-2 w-fit"
            >
              {pp.heroPrimaryCtaLabel} <ArrowUpRight size={16} />
            </a>
            <a
              href={pp.heroSecondaryCtaUrl}
              className="bg-white hover:bg-gray-100 transition-colors text-navy-900 font-medium px-5 py-3 rounded-md w-fit"
            >
              {pp.heroSecondaryCtaLabel}
            </a>
            <a
              href={pp.heroTertiaryCtaUrl}
              className="border border-white/40 hover:bg-white/10 transition-colors text-white font-medium px-5 py-3 rounded-md w-fit"
            >
              {pp.heroTertiaryCtaLabel}
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1408px] mx-auto px-6 lg:px-16 py-10 lg:py-16">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {(pp.stats || []).map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Two paths */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {pp.pathsEyebrow}
          </span>
          <TitleWithHighlight
            text={pp.pathsTitle}
            highlight={pp.pathsTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-4"
          />
          <p className="text-sm text-ink-600 mb-10">{pp.pathsSubtitle}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {pathCards.map((c, i) => {
              const dark = i === 0;
              return (
                <div
                  key={c.title}
                  className={`rounded-xl p-8 border ${
                    dark ? 'bg-navy-900 border-navy-900 text-white' : 'bg-white border-navy-100'
                  }`}
                >
                  <span
                    className={`text-[11px] font-semibold tracking-widest uppercase ${
                      dark ? 'text-white/70' : 'text-sky-600'
                    }`}
                  >
                    {c.label}
                  </span>
                  <h3
                    className={`font-display text-xl font-semibold mt-4 mb-6 ${
                      dark ? 'text-white' : 'text-navy-900'
                    }`}
                  >
                    {c.title}
                  </h3>

                  {c.steps?.length ? (
                    <ol className="space-y-3 mb-8">
                      {c.steps.map((s, si) => (
                        <li
                          key={s}
                          className={`flex gap-3 text-sm ${dark ? 'text-white/80' : 'text-ink-600'}`}
                        >
                          <span className={dark ? 'text-white/50' : 'text-ink-400'}>{si + 1}.</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className={`text-sm mb-8 ${dark ? 'text-white/80' : 'text-ink-600'}`}>{c.body}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-3">
                    {c.primaryCtaLabel && (
                      <a
                        href={c.primaryCtaUrl || '#'}
                        className="bg-sky-600 hover:bg-teal-600 transition-colors text-white text-sm font-medium px-4 py-2.5 rounded-md flex items-center gap-2 w-fit"
                      >
                        {c.primaryCtaLabel} <ArrowRight size={14} />
                      </a>
                    )}
                    {c.secondaryCtaLabel && (
                      <a
                        href={c.secondaryCtaUrl || '#'}
                        className={`text-sm font-medium px-4 py-2.5 rounded-md border transition-colors w-fit ${
                          dark
                            ? 'border-white/30 text-white hover:bg-white/10'
                            : 'border-navy-100 text-navy-900 hover:bg-navy-50'
                        }`}
                      >
                        {c.secondaryCtaLabel}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recruiting partners */}
      <section className="bg-navy-950 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-white">
            {pp.partnersEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-6 mb-5 max-w-xl">
            {pp.partnersTitle}
          </h2>
          <p className="text-sm text-white/70 leading-relaxed max-w-3xl mb-8">{pp.partnersSubtitle}</p>
          <a
            href={pp.partnersCtaUrl || '#'}
            className="bg-sky-600 hover:bg-teal-600 transition-colors text-white text-sm font-medium px-4 py-2.5 rounded-md inline-flex items-center gap-2 mb-12"
          >
            {pp.partnersCtaLabel} <ArrowUpRight size={14} />
          </a>

          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-3">
            {partners.map((p, i) => {
              const logoUrl = p.logo ? urlFor(p.logo).width(200).url() : null;
              return (
                <div
                  key={p._id || `${p.name}-${i}`}
                  className="h-[68px] rounded-md border border-white/10 bg-white/[0.03] hover:bg-white/10 transition-colors flex items-center justify-center px-2"
                >
                  {logoUrl ? (
                    <img src={logoUrl} alt={p.name} className="max-h-8 max-w-full object-contain" />
                  ) : (
                    <span className="text-[10px] text-white/70 text-center leading-tight">{p.name}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How placement works */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {pp.processEyebrow}
          </span>
          <TitleWithHighlight
            text={pp.processTitle}
            highlight={pp.processTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-4"
          />
          <p className="text-sm text-ink-600 mb-12">{pp.processSubtitle}</p>

          <div className="max-w-[900px]">
            {hiringSteps.map((s, i) => (
              <div
                key={s._id || s.title}
                className="flex gap-6 py-6 border-b border-navy-100 last:border-b-0"
              >
                <span className="shrink-0 w-9 h-9 rounded-full border border-navy-100 flex items-center justify-center text-xs font-semibold text-navy-600">
                  {String(s.order ?? i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-sky-600">
                    {s.timing}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-navy-900 mt-2 mb-1">
                    {s.title}
                  </h3>
                  <p className="text-sm text-ink-600">{s.description}</p>
                  {s.meta && <p className="text-xs text-ink-400 mt-2">{s.meta}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reports */}
      <section id="reports" className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {pp.reportsEyebrow}
          </span>
          <TitleWithHighlight
            text={pp.reportsTitle}
            highlight={pp.reportsTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-4"
          />
          <p className="text-sm text-ink-600 mb-10">{pp.reportsSubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {reports.map((r) => {
              const imgUrl = r.image ? urlFor(r.image).width(600).url() : null;
              return (
                <div
                  key={r._id || r.title}
                  className="rounded-xl border border-navy-100 overflow-hidden flex flex-col"
                >
                  <div
                    className="h-[200px] bg-gray-200 bg-cover bg-center"
                    style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[11px] font-semibold tracking-widest uppercase text-sky-600 mb-2">
                      {r.tag}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">{r.title}</h3>
                    <p className="text-sm text-ink-600 mb-5">{r.description}</p>
                    <a
                      href={r.fileUrl || '#'}
                      className="text-sm font-medium text-navy-900 flex items-center gap-2 w-fit mt-auto"
                    >
                      {r.downloadLabel || 'Download'} <Download size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Placement office CTA */}
      <section className="bg-navy-900 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-white">
            {pp.cellEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-6 mb-4">{pp.cellTitle}</h2>
          <p className="text-sm text-white/75 mb-8">{pp.cellSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {cellButtons.map((b) => (
              <a
                key={b.label}
                href={b.url || '#'}
                className={`text-sm font-medium px-4 py-2.5 rounded-md transition-colors ${
                  b.primary
                    ? 'bg-sky-600 hover:bg-teal-600 text-white'
                    : 'border border-white/30 text-white hover:bg-white/10'
                }`}
              >
                {b.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Placement journey */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                {pp.journeyEyebrow}
              </span>
              <TitleWithHighlight
                text={pp.journeyTitle}
                highlight={pp.journeyTitleHighlight}
                className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-4"
              />
              <p className="text-sm text-ink-600 mb-8">{pp.journeySubtitle}</p>
              <div
                className="h-[280px] rounded-xl bg-gray-200 bg-cover bg-center"
                style={journeyImageUrl ? { backgroundImage: `url('${journeyImageUrl}')` } : undefined}
              />
            </div>

            <div>
              {journeySteps.map((s, i) => (
                <div
                  key={s._id || s.title}
                  className="flex gap-5 pb-8 last:pb-0 border-b border-navy-100 last:border-b-0 mb-8 last:mb-0"
                >
                  <span className="shrink-0 w-9 h-9 rounded-full bg-navy-900 text-white flex items-center justify-center text-xs font-semibold">
                    {String(s.order ?? i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold text-sky-600 mb-2">{s.title}</h3>
                    <p className="text-sm text-ink-600 leading-relaxed">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fact panels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16">
            {factPanels.map((p) => (
              <div key={p.title} className="border border-navy-100 rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold text-navy-900 mb-4">{p.title}</h3>
                <div className="space-y-3">
                  {(p.rows || []).map((r) => (
                    <div key={r.label} className="flex items-center gap-3">
                      <span className="text-[11px] uppercase tracking-wide text-ink-400 shrink-0">
                        {r.label}
                      </span>
                      <span className="flex-1 h-px bg-navy-100" />
                      <span className="text-xs font-medium text-navy-900 shrink-0">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
