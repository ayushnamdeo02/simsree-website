import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { StatGrid } from '../components/StatCard';
import PageHero, { HeroButton } from '../components/PageHero';
import { Section, SectionTitle, Tagline, H5, H6, Tag, AccentCard } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { usePlacementsData } from '../lib/usePlacementsData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackPage = {
  heroEyebrow: 'For Recruiters',
  heroTitle: 'Hire from the 2024-26 batch.',
  heroTitleItalic: '2024-26 batch.',
  heroDescription:
    '120 students. 38% women. 62% with prior work-ex. Placement window opens January 2026 — book your interview slot now.',
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
  pathsSubtitle: "Get what you need, wherever you're starting.",
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
  processSubtitle: "Here's how hiring works, in six steps.",

  reportsEyebrow: 'Reports',
  reportsTitle: 'Detailed outcomes per year',
  reportsTitleHighlight: 'outcomes',
  reportsSubtitle: 'Three reports · final, summer, executive · current year + multi-year archive.',

  cellEyebrow: 'Direct Line to the Cell',
  cellTitle: 'Speak to the Placement Office.',
  cellSubtitle: 'Paras Surve · +91 8830 532 100 · Sahil Sawant · +91 8097 251 728',
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
        { label: 'Offer-roll out', value: 'Same-day' },
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

// Defaults below follow the Figma "Placements" frame.
const fallbackPartners = [
  ['Barclays', 'Deloitte', 'Citi', 'Deutsche Bank', 'Godrej & Boyce', 'Piramal', 'Arcesium', 'Wells Fargo'],
  ['Morgan Stanley', 'GEP', 'De Shaw', 'HUL', 'Asian Paints', 'Marico', 'Bajaj Finserv', 'L&T'],
  ['Infosys', 'GEP', 'De Shaw', 'HUL', 'Asian Paints', 'Marico', 'Bajaj Finserv', 'L&T'],
  ['Wipro', 'Deloitte', 'Citi', 'Deutsche Bank', 'Godrej & Boyce', 'Piramal', 'Arcesium', 'Wells Fargo'],
  ['Cipla', 'GEP', 'De Shaw', 'HUL', 'Asian Paints', 'Marico', 'Bajaj Finserv', 'L&T'],
  ['Standard Chartered', 'GEP', 'De Shaw', 'HUL', 'Asian Paints', 'Marico', 'Bajaj Finserv', 'L&T'],
  ['Adobe', 'GEP', 'De Shaw', 'HUL', 'Asian Paints', 'Marico', 'Bajaj Finserv', 'L&T'],
  ['Paytm', 'GEP', 'De Shaw', 'HUL', 'Asian Paints', 'Marico', 'Bajaj Finserv', 'L&T'],
]
  .flat()
  .map((name, i) => ({ name, order: i + 1 }));

const fallbackHiringSteps = [
  ['Day 0 · 45-60 min', 'Pre-Placement Talk', 'You brief students on the role and projects.', 'Run by: Placement Committee'],
  ['Day 1 · 24-hr window', 'Resume Scrutiny', 'We send you resumes to shortlist.', 'Owner: Placement Portal · PlaceComm'],
  ['Day 2 · 90 min', 'Group Discussion', 'Shortlisted students move to your selection round.', 'Moderated by: Placement Officer'],
  ['Day 3 · 30-45 min/slot', 'Personal Interview', 'You interview candidates one on one.', 'Slots managed by: PlaceComm'],
  ['Day 3 EOD', 'Final Selection', 'Final results are announced.', 'Moderated by: Placement Officer'],
  ['Within 2 weeks', 'Final Offer', 'You make offers to the students you select.', 'Audited by: Crisil'],
].map(([timing, title, description, meta], i) => ({ timing, title, description, meta, order: i + 1 }));

const fallbackReports = [
  {
    title: 'Final Placement Report',
    tag: 'Current + Archive',
    description: '{{placementRate}} placement · {{avgCtc}} avg CTC · top 12 recruiters listed.',
    downloadLabel: 'Download',
    order: 1,
  },
  {
    title: 'Summer Placement Report',
    tag: 'Year-1 internships',
    description: '100% summer · ₹85K avg stipend · 62% PPO conversion.',
    downloadLabel: 'Download',
    order: 2,
  },
  {
    title: 'Executive Placement Report',
    tag: 'MFM / MMM',
    description: '+38% CTC delta · 62% role switch · 28% promoted within.',
    downloadLabel: 'Download',
    order: 3,
  },
];

const fallbackJourneySteps = [
  ['Pre-Placement Talk', 'Company arrives on campus · briefs the cohort about the role, mandate, team and growth track. 45-60 minutes including Q&A.'],
  ['Resume Scrutiny', "Interested candidates upload resumes via the Placement Portal · Placement Committee normalises to the recruiter's preferred format and ships within 24 hours."],
  ['Shortlist', 'Recruiter shares shortlist by midnight 2 days before the slot. Candidates get individual SMS + email notifications by 9am the next morning.'],
  ['Aptitude / Case · optional', 'Roles requiring quantitative aptitude or case-solving get a 75-90 minute on-campus written/online round. Most consulting and finance recruiters use this stage.'],
  ['Group Discussion', '5-7 candidate GDs, each 25 minutes. Faculty observers join for first-time recruiters. Results inside 90 minutes.'],
  ['Personal Interviews + Offer', '2-3 round PIs · ending the same day with offer rollouts in the auditorium. Average time from PPT to offer: 5.4 hours.'],
].map(([title, description], i) => ({ title, description, order: i + 1 }));

// Figma report photos, in card order.
const REPORT_FALLBACK = ['final', 'summer', 'executive'].map((n) => `/images/placements/report-${n}.webp`);

// Figma report tag colours: Astronaut/Lightest by default, Eastern Blue for exec.
const REPORT_TAG = ['bg-navy-50 text-navy-900', 'bg-navy-50 text-navy-900', 'bg-sky-50 text-teal-500'];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
      <path
        fill="#25D366"
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.2-.2-.5-.3z"
      />
    </svg>
  );
}

// Numbered timeline row — Figma "Timeline Item": 48px circle (white/navy outline or
// solid navy), 2px black/20 connector, 40 gap to the copy.
function StepCircle({ n, solid }) {
  return (
    <span
      className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-lg leading-[150%] outline outline-1 -outline-offset-1 outline-navy-900 ${
        solid ? 'bg-navy-900 text-white' : 'bg-white text-navy-900'
      }`}
    >
      {String(n).padStart(2, '0')}
    </span>
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

  const journeyImageUrl = pp.journeyImage
    ? urlFor(pp.journeyImage).width(1200).auto('format').url()
    : '/images/student-system/track.webp';
  const [recruiter, prospect] = pathCards;

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(pp.heroImage, '/images/placements/hero.webp')}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Placements' }]}
        eyebrow={pp.heroEyebrow}
        eyebrowUpper
        title={pp.heroTitle}
        titleItalic={pp.heroTitleItalic}
        description={pp.heroDescription}
        descriptionWidth={628}
        actions={[
          { label: pp.heroPrimaryCtaLabel, to: pp.heroPrimaryCtaUrl, primary: true },
          { label: pp.heroSecondaryCtaLabel, to: pp.heroSecondaryCtaUrl },
          { label: pp.heroTertiaryCtaLabel, href: pp.heroTertiaryCtaUrl },
        ]}
      />

      <section className="px-5 py-16 md:p-16">
        <StatGrid stats={pp.stats} />
      </section>

      {/* Two paths — left title; 600 navy card | 600 bar card, 80 apart. */}
      <Section width={1280}>
        <SectionTitle
          tagline={pp.pathsEyebrow}
          title={composeTitle(pp.pathsTitle, pp.pathsTitleHighlight)}
          highlight={pp.pathsTitleHighlight}
          body={pp.pathsSubtitle}
        />
        <div className="mt-20 grid lg:grid-cols-2 gap-10 lg:gap-20">
          {recruiter && (
            <div className="rounded-xl flex items-center p-8 bg-navy-900 text-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <Tagline className="text-white">{recruiter.label}</Tagline>
                  <div className="flex flex-col gap-6">
                    <H5 className="text-white">{recruiter.title}</H5>
                    <ol className="flex flex-col gap-2 text-base md:text-lg leading-[150%] list-decimal pl-6">
                      {(recruiter.steps || []).map((st) => (
                        <li key={st}>{st}</li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <HeroButton label={recruiter.primaryCtaLabel} to={recruiter.primaryCtaUrl} primary />
                  <HeroButton label={recruiter.secondaryCtaLabel} href={recruiter.secondaryCtaUrl} />
                </div>
              </div>
            </div>
          )}
          {prospect && (
            <AccentCard>
              <div className="flex flex-col gap-12">
                <Tagline>{prospect.label}</Tagline>
                <div className="flex flex-col gap-4">
                  <H5 className="text-black">{prospect.title}</H5>
                  <p className="text-base leading-[150%] text-black">{prospect.body}</p>
                </div>
                <div className="flex flex-col items-start gap-4">
                  <a
                    href={prospect.primaryCtaUrl}
                    className="inline-flex items-center gap-3 h-11 px-6 rounded-md bg-navy-900 text-white text-base leading-[150%] font-medium hover:bg-navy-800 transition-colors"
                  >
                    {prospect.primaryCtaLabel} <ArrowUpRight size={24} strokeWidth={1.5} />
                  </a>
                  <HeroButton label={prospect.secondaryCtaLabel} to={prospect.secondaryCtaUrl} />
                </div>
              </div>
            </AccentCard>
          )}
        </div>
      </Section>

      {/* Recruiting partners — #12142e, left title + teal CTA, then an 8-up grid of
          151x148 white-hairline cells (radius 12), 10/30 gaps. */}
      <Section bg="bg-navy-700" width={1280}>
        <SectionTitle dark tagline={pp.partnersEyebrow} title={pp.partnersTitle} body={pp.partnersSubtitle} />
        <div className="mt-9">
          <HeroButton label={pp.partnersCtaLabel} href={pp.partnersCtaUrl} primary />
        </div>
        <div className="mt-20 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-x-2.5 gap-y-[30px]">
          {partners.map((p, i) => {
            const logo = p.logo ? urlFor(p.logo).height(96).auto('format').url() : null;
            return (
              <div
                key={p._id || `${p.name}-${i}`}
                className="h-[120px] lg:h-[148px] rounded-xl outline outline-1 -outline-offset-1 outline-white flex items-center justify-center p-6 text-center transition-colors hover:bg-white/10"
              >
                {logo ? (
                  <img src={logo} alt={p.name} className="max-h-12 max-w-full object-contain" />
                ) : (
                  <span className="text-sm leading-[150%] text-white">{p.name}</span>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* How placement works — 1312 wide steps, 48 apart: outlined circle and
          connector | timing, H6 title + 16 copy, hairline, 14 owner line. */}
      <Section>
        <SectionTitle
          tagline={pp.processEyebrow}
          title={composeTitle(pp.processTitle, pp.processTitleHighlight)}
          highlight={pp.processTitleHighlight}
          body={pp.processSubtitle}
          width={1312}
        />
        <ol className="mt-20 flex flex-col gap-12">
          {hiringSteps.map((st, i, all) => (
            <li key={st._id || st.title} className="flex gap-6 md:gap-10">
              <div className="flex flex-col items-center gap-4">
                <StepCircle n={st.order ?? i + 1} />
                {i < all.length - 1 && <span className="w-0.5 h-[108px] bg-black/20" aria-hidden="true" />}
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-4">
                <span className="text-base leading-[150%] uppercase text-black">{st.timing}</span>
                <div className="flex flex-col gap-2">
                  <H6 as="h3" className="text-black">
                    {st.title}
                  </H6>
                  <p className="text-base leading-[150%] text-black">{st.description}</p>
                </div>
                <div className="flex flex-col gap-2 border-t border-black/20 pt-2">
                  <p className="text-sm leading-[150%] text-black">{st.meta}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Reports — left title; three 405x506 hairline cards: 270px photo, tag,
          H5 navy title, 16 copy, Download link with a chevron. */}
      <Section id="reports" width={1280}>
        <SectionTitle
          tagline={pp.reportsEyebrow}
          title={composeTitle(pp.reportsTitle, pp.reportsTitleHighlight)}
          highlight={pp.reportsTitleHighlight}
          body={pp.reportsSubtitle}
        />
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {reports.map((r, i) => {
            const img = r.image ? urlFor(r.image).width(810).auto('format').url() : REPORT_FALLBACK[i];
            const fileUrl = r.file?.asset?.url || r.fileUrl;
            return (
              <div key={r._id || r.title} className="rounded-xl overflow-hidden rounded-xl overflow-hidden flex flex-col bg-white outline outline-1 -outline-offset-1 outline-black/20">
                <div className="h-[270px] bg-navy-50 bg-cover bg-center" style={img ? { backgroundImage: `url('${img}')` } : undefined} />
                <div className="flex-1 flex flex-col gap-6 p-6">
                  <div className="flex flex-col gap-4">
                    <Tag className={`w-fit uppercase outline-0 ${REPORT_TAG[i] || REPORT_TAG[0]}`}>{r.tag}</Tag>
                    <div className="flex flex-col gap-2">
                      <H5>{r.title}</H5>
                      <p className="text-base leading-[150%] text-black">{r.description}</p>
                    </div>
                  </div>
                  <a
                    href={fileUrl || '/placements/reports'}
                    className="flex items-center gap-2 w-fit text-base leading-[150%] text-black hover:underline underline-offset-2"
                  >
                    {r.downloadLabel || 'Download'} <ChevronRight size={24} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Speak to the office — navy, 64 padding, centred; 598 contact line, four
          buttons 14 apart (WhatsApp mark on the second). */}
      <section className="bg-navy-900 text-white px-5 py-16 md:p-16 border-t border-white/20">
        <div className="max-w-[873px] mx-auto text-center flex flex-col items-center gap-8">
          <SectionTitle center dark tagline={pp.cellEyebrow} title={pp.cellTitle} />
          <p className="-mt-2 max-w-[598px] text-base md:text-lg leading-[150%]">{pp.cellSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-3.5">
            {cellButtons.map((b) => {
              const isWhatsApp = /whatsapp/i.test(b.label);
              return b.primary ? (
                <HeroButton key={b.label} label={b.label} href={b.url} primary />
              ) : (
                <a
                  key={b.label}
                  href={b.url || '#'}
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-white outline outline-1 -outline-offset-1 outline-black/20 text-base leading-[150%] font-medium text-black hover:bg-navy-50 transition-colors"
                >
                  {isWhatsApp && <WhatsAppIcon />}
                  {b.label}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey — 600 title + 600x553 photo | numbered steps (solid navy circles,
          32 gaps); three 395x237 fact panels with the Eastern Blue bar below. */}
      <Section width={1280}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col gap-[52px]">
            <SectionTitle
              tagline={pp.journeyEyebrow}
              title={composeTitle(pp.journeyTitle, pp.journeyTitleHighlight)}
              highlight={pp.journeyTitleHighlight}
              body={pp.journeySubtitle}
              width={600}
            />
            <div
              className="h-[300px] lg:h-[553px] bg-navy-50 bg-cover bg-center"
              style={{ backgroundImage: `url('${journeyImageUrl}')` }}
            />
          </div>
          <ol className="flex flex-col gap-8">
            {journeySteps.map((st, i, all) => (
              <li key={st._id || st.title} className="flex gap-10 min-h-[120px]">
                <div className="flex flex-col items-center gap-4">
                  <StepCircle n={st.order ?? i + 1} solid />
                  {i < all.length - 1 && <span className="w-0.5 h-14 bg-black/20" aria-hidden="true" />}
                </div>
                <div className="flex flex-col gap-2">
                  <H6 as="h3">{st.title}</H6>
                  <p className="text-base leading-[150%] text-black">{st.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-20 grid md:grid-cols-3 gap-8 lg:gap-12">
          {factPanels.map((f) => (
            <AccentCard key={f.title}>
              <div className="flex flex-col gap-4">
                <H5>{f.title}</H5>
                <span className="h-px bg-black/20" aria-hidden="true" />
                <dl className="flex flex-col gap-4">
                  {(f.rows || []).map((r) => (
                    <div key={r.label} className="flex gap-4 text-sm leading-[150%] text-black">
                      <dt className="uppercase">{r.label}</dt>
                      <dd className="font-semibold">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </AccentCard>
          ))}
        </div>
      </Section>
    </div>
  );
}
