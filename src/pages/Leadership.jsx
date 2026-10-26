import { useState } from 'react';
import { StatGrid } from '../components/StatCard';
import PageHero, { HeroButton } from '../components/PageHero';
import { Section, SectionTitle } from '../components/ui';
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
    'Year-2 chairs of each committee form a single leadership forum - the Chairpersons Council. Current chairs: Harshwardhan Ugale & Shriya Aphale · chairpersons@simsree.org',
  chairs: [
    { name: 'Harshwardhan Ugale', role: 'Chairperson', photo: '/images/students/chair-harshwardhan-ugale.webp' },
    { name: 'Shriya Aphale', role: 'Chairperson', photo: '/images/students/chair-shriya-aphale.webp' },
  ],
  ctaEyebrow: 'For recruiters',
  ctaTitle: 'Reach the leadership team.',
  ctaBody: "For anything that doesn't fit a committee - student-welfare issues, inter-batch coordination, or institute-wide ideas.",
  ctaButtons: [
    { label: 'Email to Chairperson', url: 'mailto:chairpersons@simsree.org', primary: true },
    { label: 'Email to General Secretary', url: 'mailto:gs@simsree.org' },
  ],
};

const TABS = [
  { id: 'gs', label: 'General Secretaries' },
  { id: 'chairs', label: 'Chairpersons' },
];

// Figma "Filters": 44px tabs, radius 4, the active tab navy. A tab swaps which
// section (GS team / Chairpersons) is shown.
function Tabs({ active, tabs, onSelect, className = '' }) {
  return (
    <div role="tablist" aria-label="Leadership sections" className={`grid grid-cols-2 md:flex md:flex-wrap md:justify-center ${className}`}>
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          id={`tab-${t.id}`}
          aria-controls={t.id}
          aria-selected={t.id === active}
          onClick={() => onSelect(t.id)}
          className={`h-11 px-4 inline-flex items-center justify-center rounded text-base leading-[150%] ${
            t.id === active ? 'bg-navy-900 text-white font-medium outline outline-1 -outline-offset-1 outline-black/20' : 'text-black hover:bg-navy-50'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
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
  const [tab, setTab] = useState(() => (typeof window !== 'undefined' && window.location.hash === '#chairs' ? 'chairs' : 'gs'));

  return (
    <div className="bg-white">
      <PageHero
        image="/images/students/leadership-hero.webp"
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
        <Tabs active={tab} tabs={tabs} onSelect={setTab} className="mb-12 md:mb-16" />
        <div id="gs" role="tabpanel" aria-labelledby="tab-gs" hidden={tab !== 'gs'} className={`scroll-mt-40 flex-col gap-12 md:gap-16 ${tab === 'gs' ? 'flex' : 'hidden'}`}>
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
        <div id="chairs" role="tabpanel" aria-labelledby="tab-chairs" hidden={tab !== 'chairs'} className={`scroll-mt-40 flex-col gap-12 md:gap-16 ${tab === 'chairs' ? 'flex' : 'hidden'}`}>
          <SectionTitle center tagline={lp.chairsEyebrow} title={lp.chairsTitle} body={lp.chairsBody} />
          <div className="flex flex-col gap-12">
            <div className="max-w-[1089px] mx-auto w-full flex flex-wrap justify-center gap-x-6 lg:gap-x-[99px] gap-y-12">
              {lp.chairs.map((p, i) => (
                <div key={p.name || i} className="w-[calc(50%-12px)] md:w-[260px] flex flex-col items-center gap-4 text-center text-black">
                  <div
                    className="w-[150px] h-[150px] md:w-[198px] md:h-[198px] rounded-full bg-navy-50 bg-cover bg-center"
                    style={{ backgroundImage: `url('${p.photo || `/images/students/chair-${String(i + 1).padStart(2, '0')}.webp`}')` }}
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
      </Section>

      {/* CTA — navy, centred 768 column. */}
      <Section bg="bg-navy-900" width={768} className="text-center">
        <SectionTitle center dark tagline={lp.ctaEyebrow} title={lp.ctaTitle} body={lp.ctaBody} />
        <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap justify-center gap-4 max-sm:[&>*]:w-full">
          {lp.ctaButtons.map((b) => (
            <HeroButton key={b.label} label={b.label} href={b.url} primary={b.primary} />
          ))}
        </div>
      </Section>
    </div>
  );
}
