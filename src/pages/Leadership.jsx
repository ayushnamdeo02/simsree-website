import { useState } from 'react';
import { Plus } from 'lucide-react';
import { StatGrid } from '../components/StatCard';
import PageHero, { HeroButton } from '../components/PageHero';
import { Section, SectionTitle, H5 } from '../components/ui';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

// Leadership Directory — built from the Figma "Leadership Directory" frame.
// People below are the design's placeholders (every card reads "Mr. Ashish
// Bhasin"); replace them with the 2025-26 GS team and chairs.
const page = {
  heroEyebrow: 'Year-2 apex leadership',
  heroTitle: "Meet SIMSREE's student leadership.",
  heroDescription:
    'Above every committee are the Year-2 Chairpersons and the apex General Secretaries - both elected by the batch each year. Together: the Chairpersons Council.',
  heroButtons: [
    { label: 'Email GS team', url: 'mailto:gs@simsree.org', primary: true },
    { label: 'Email Chairs', url: 'mailto:chairpersons@simsree.org' },
    { label: "See how they're elected", url: '#election' },
  ],
  stats: [
    { label: 'GS portfolios', value: '4', dark: true },
    { label: 'Chairs', value: '{{committeeCount}}', dark: false },
    { label: 'Year of leadership', value: '2', dark: true },
    { label: 'Elected', value: '100%', dark: false },
  ],
  gsEyebrow: '2025-26 GS team',
  gsTitle: 'Apex student leadership.',
  gsBody:
    'Above every committee chairperson sits the GS team - the apex student leadership for the institute, elected by the batch.',
  gs: [
    { name: 'Mr. Ashish Bhasin', role: 'GS · Academics' },
    { name: 'Mr. Ashish Bhasin', role: 'GS · Academics' },
    { name: 'Mr. Ashish Bhasin', role: 'GS · Academics' },
    { name: 'Mr. Ashish Bhasin', role: 'GS · Academics' },
  ],
  chairsEyebrow: 'Year-2 chairs · 2025-26',
  chairsTitle: 'Cross-committee forum.',
  chairsBody:
    'Year-2 chairs of each committee form a single leadership forum - the Chairpersons Council. Current chairs: Sumedh Deshpande &\nYash Raj Pandey · chairpersons@simsree.org',
  chairs: [
    'Placement', 'Finance Forum', 'E-Cell', 'Marketing',
    'Sports', 'Operations', 'Marketing', 'Course Co',
    'Operations', 'Marketing', 'Operations', 'Infra-Tech',
  ].map((role) => ({ name: 'Mr. Ashish Bhasin', role })),
  electionEyebrow: 'Year-2 chairs · 2025-26',
  electionTitle: 'How leadership is elected.',
  electionBody: 'Four-step process · runs in Week 4-8 of Year 2.',
  steps: [
    {
      title: '1 · Nomination + 5 endorsement',
      body: 'Self-nomination opens Week 4 of Year 2. Each candidate needs five batchmate endorsements to qualify.',
    },
    { title: '2 · Manifesto + open debate', body: '' },
    { title: '3 · Secret ballot', body: '' },
    { title: '4 · 2-week structured handover', body: '' },
  ],
  selectionTitle: 'Selection for Chairpersons (per committee)',
  selectionBody: 'Three-step gate: Year-1 performance review by exiting chair → 5 peer endorsements → Director sign-off.',
  ctaEyebrow: 'For recruiters',
  ctaTitle: 'Reach the leadership team.',
  ctaBody: "For anything that doesn't fit a committee - student-welfare issues, inter-batch coordination, or institute-wide ideas.",
  ctaButtons: [
    { label: 'Email GS Team', url: 'mailto:gs@simsree.org', primary: true },
    { label: 'Email Chairs', url: 'mailto:chairpersons@simsree.org' },
  ],
};

const TABS = [
  { id: 'gs', label: 'General Secretaries' },
  { id: 'chairs', label: 'Chairpersons ({{committeeCount}})' },
  { id: 'election', label: 'Election process' },
];

// Figma "Filters": 44px tabs, radius 4, the section's own tab navy. On desktop Figma
// shows all three sections, each under its own bar, so the tabs jump between them.
// The mobile frames are one per tab, so there a tab swaps the visible section.
function Tabs({ active, tabs, onSelect, className = '' }) {
  return (
    <nav aria-label="Leadership sections" className={`flex flex-wrap justify-center ${className}`}>
      {tabs.map((t) => (
        <a
          key={t.id}
          href={`#${t.id}`}
          onClick={() => onSelect?.(t.id)}
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

function SocialLinks() {
  return (
    <div className="flex gap-4 text-black" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.1c0-1.22-.02-2.8-1.7-2.8-1.72 0-1.98 1.34-1.98 2.72V21h-4z" />
      </svg>
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
      </svg>
    </div>
  );
}

export default function Leadership() {
  const facts = useKeyFacts();
  const lp = fillFactsDeep(page, facts);
  const tabs = fillFactsDeep(TABS, facts);
  const [mobileTab, setMobileTab] = useState('gs');
  // On mobile only the chosen section shows; desktop shows all three.
  const mobileOnly = (id) => (mobileTab === id ? '' : 'max-lg:hidden');

  return (
    <div className="bg-white">
      <PageHero
        image="/images/students/leadership-hero.webp"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: "Student's Corner", to: '/students' }, { label: 'Leadership Directory' }]}
        eyebrow={lp.heroEyebrow}
        eyebrowUpper
        title={lp.heroTitle}
        description={lp.heroDescription}
        descriptionWidth={628}
        actions={lp.heroButtons.map((b) => ({ label: b.label, href: b.url, primary: b.primary }))}
      />

      <section className="px-5 py-12 md:px-16 md:py-20">
        <StatGrid stats={lp.stats} />
      </section>

      {/* One 112-padded section holding the three parts, 80 apart. */}
      <Section width={1280} className="border-t border-white/20">
        {/* GS team — tabs, centred title, four 284 portrait cards (48 gaps). */}
        <Tabs active={mobileTab} tabs={tabs} onSelect={setMobileTab} className="lg:hidden mb-12" />
        <div id="gs" className={`scroll-mt-40 flex flex-col gap-12 md:gap-16 ${mobileOnly('gs')}`}>
          <Tabs active="gs" tabs={tabs} className="max-lg:hidden" />
          <SectionTitle center tagline={lp.gsEyebrow} title={lp.gsTitle} body={lp.gsBody} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {lp.gs.map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-6 text-center text-black">
                <div
                  className="w-full aspect-square bg-navy-50 bg-cover bg-center"
                  style={{ backgroundImage: `url('/images/students/gs-${i + 1}.webp')` }}
                />
                <div>
                  <p className="text-[22px] leading-[150%] font-semibold">{p.name}</p>
                  <p className="text-lg leading-[150%]">{p.role}</p>
                </div>
                <SocialLinks />
              </div>
            ))}
          </div>
        </div>

        {/* Chairs — centred title, tabs, 198px round portraits (99 column gap). */}
        <div id="chairs" className={`lg:mt-12 scroll-mt-40 flex flex-col gap-12 md:gap-16 ${mobileOnly('chairs')}`}>
          <SectionTitle center tagline={lp.chairsEyebrow} title={lp.chairsTitle} body={lp.chairsBody} />
          <div className="-mt-8 flex flex-col gap-12">
            <Tabs active="chairs" tabs={tabs} className="max-lg:hidden" />
            <div className="max-w-[1089px] mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-x-6 lg:gap-x-[99px] gap-y-12">
              {lp.chairs.map((p, i) => (
                <div key={i} className="flex flex-col items-center gap-4 text-center text-black">
                  <div
                    className="w-[150px] h-[150px] md:w-[198px] md:h-[198px] rounded-full bg-navy-50 bg-cover bg-center"
                    style={{ backgroundImage: `url('/images/students/chair-${String(i + 1).padStart(2, '0')}.webp')` }}
                  />
                  <div>
                    <p className="text-[22px] leading-[150%] font-semibold">{p.name}</p>
                    <p className="text-lg leading-[150%]">{p.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Election — centred title, tabs, expandable 1280 rows (32px plus), then the
            chairperson-selection card with a 5px Eastern Blue bar. */}
        <div id="election" className={`lg:mt-12 scroll-mt-40 flex flex-col gap-12 md:gap-16 ${mobileOnly('election')}`}>
          <SectionTitle center tagline={lp.electionEyebrow} title={lp.electionTitle} body={lp.electionBody} />
          <div className="-mt-8 flex flex-col gap-12">
            <Tabs active="election" tabs={tabs} className="max-lg:hidden" />
            <div className="flex flex-col gap-12">
              {lp.steps.map((s, i) => (
                <details key={s.title} open={i === 0} className="rounded-lg group bg-white outline outline-1 -outline-offset-1 outline-black/20">
                  <summary className="flex items-center gap-8 p-8 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <div className="flex-1 min-w-0 flex flex-col gap-6">
                      <H5 as="h3" className="text-black">
                        {s.title}
                      </H5>
                      {s.body && <p className="hidden group-open:block text-base leading-[150%] text-black">{s.body}</p>}
                    </div>
                    <Plus size={32} strokeWidth={1.5} className="shrink-0 transition-transform group-open:rotate-45" />
                  </summary>
                </details>
              ))}
              <div className="flex rounded-r-2xl bg-white outline outline-1 -outline-offset-1 outline-black/20">
                <span className="w-[5px] shrink-0 bg-teal-500" aria-hidden="true" />
                <div className="flex flex-col gap-4 py-8 pl-8 pr-8">
                  <H5 as="h3" className="text-black">
                    {lp.selectionTitle}
                  </H5>
                  <p className="text-base leading-[150%] text-black">{lp.selectionBody}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA — navy, centred 768 column. */}
      <Section bg="bg-navy-900" width={768} className="text-center">
        <SectionTitle center dark tagline={lp.ctaEyebrow} title={lp.ctaTitle} body={lp.ctaBody} />
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {lp.ctaButtons.map((b) => (
            <HeroButton key={b.label} label={b.label} href={b.url} primary={b.primary} />
          ))}
        </div>
      </Section>
    </div>
  );
}
