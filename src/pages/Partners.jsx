import { useMemo, useState } from 'react';
import PageHero, { HeroButton } from '../components/PageHero';
import { Section, SectionTitle } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { usePartnersData } from '../lib/usePartnersData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const SECTORS = ['BFSI', 'Consulting', 'FMCG', 'IT. Tech', 'Pharma', 'Manufacturing', 'Media'];

const fallbackPage = {
  heroEyebrow: "Renamed from 'List of Recruiters'",
  heroTitle: 'companies already recruit here.',
  heroDescription: 'recruiters across 7 sectors - filter or search to find yours.',
  heroCtaLabel: 'Become a recruiting partner',
  heroCtaUrl: '/placements/contact',

  gridEyebrow: 'Recruiting Partners',
  gridTitle: 'companies. Pick a sector.',
  gridTitleHighlight: 'Pick a sector.',
  gridSubtitle: 'Filter by industry - or move your cursor over the grid to bring any logo into focus.',

  ctaEyebrow: 'Want to Join This List?',
  ctaTitle: 'Tell us who you want to hire',
  ctaSubtitle: "We'll set up your campus visit · brochure on request.",
  ctaButtons: [
    { label: 'Submit your hiring needs', url: '/placements/contact', primary: true },
    { label: 'Email the placement cell', url: 'mailto:placements@simsree.org', primary: false },
  ],
};

// Eight columns × eight rows, matching the design's grid.
const fallbackPartners = [
  ['Barclays', 'BFSI'], ['Deloitte', 'Consulting'], ['Citi', 'BFSI'], ['Deutsche Bank', 'BFSI'],
  ['Godrej & Boyce', 'Manufacturing'], ['Piramal', 'Pharma'], ['Arcesium', 'IT. Tech'], ['Wells Fargo', 'BFSI'],
  ['Morgan Stanley', 'BFSI'], ['GEP', 'Consulting'], ['De Shaw', 'BFSI'], ['HUL', 'FMCG'],
  ['Asian Paints', 'Manufacturing'], ['Marico', 'FMCG'], ['Bajaj Finserv', 'BFSI'], ['L&T', 'Manufacturing'],
  ['Infosys', 'IT. Tech'], ['GEP', 'Consulting'], ['De Shaw', 'BFSI'], ['HUL', 'FMCG'],
  ['Asian Paints', 'Manufacturing'], ['Marico', 'FMCG'], ['Bajaj Finserv', 'BFSI'], ['L&T', 'Manufacturing'],
  ['Wipro', 'IT. Tech'], ['Deloitte', 'Consulting'], ['Citi', 'BFSI'], ['Deutsche Bank', 'BFSI'],
  ['Godrej & Boyce', 'Manufacturing'], ['Piramal', 'Pharma'], ['Arcesium', 'IT. Tech'], ['Wells Fargo', 'BFSI'],
  ['Cipla', 'Pharma'], ['GEP', 'Consulting'], ['De Shaw', 'BFSI'], ['HUL', 'FMCG'],
  ['Asian Paints', 'Manufacturing'], ['Marico', 'FMCG'], ['Bajaj Finserv', 'BFSI'], ['L&T', 'Manufacturing'],
  ['Standard Chartered', 'BFSI'], ['GEP', 'Consulting'], ['De Shaw', 'BFSI'], ['HUL', 'FMCG'],
  ['Asian Paints', 'Manufacturing'], ['Marico', 'FMCG'], ['Bajaj Finserv', 'BFSI'], ['L&T', 'Manufacturing'],
  ['Adobe', 'IT. Tech'], ['GEP', 'Consulting'], ['De Shaw', 'BFSI'], ['HUL', 'FMCG'],
  ['Asian Paints', 'Manufacturing'], ['Marico', 'FMCG'], ['Bajaj Finserv', 'BFSI'], ['L&T', 'Manufacturing'],
  ['Paytm', 'BFSI'], ['GEP', 'Consulting'], ['De Shaw', 'BFSI'], ['HUL', 'FMCG'],
  ['Asian Paints', 'Manufacturing'], ['Marico', 'FMCG'], ['Bajaj Finserv', 'BFSI'], ['L&T', 'Manufacturing'],
].map(([name, sector], i) => ({ name, sector, order: i + 1 }));

export default function Partners() {
  const facts = useKeyFacts();
  const { data } = usePartnersData();
  const pp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const partners = fillFactsDeep(data?.partners?.length ? data.partners : fallbackPartners, facts);
  const ctaButtons = fillFactsDeep(pp.ctaButtons?.length ? pp.ctaButtons : fallbackPage.ctaButtons, facts);

  const [sector, setSector] = useState('All');
  const visible = useMemo(
    () => partners.filter((p) => sector === 'All' || p.sector === sector),
    [partners, sector],
  );

  // The headline count is the institute's recruiter figure, not the number of cells.
  const count = pp.companyCount || facts.recruiterCount || '120+';

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(pp.heroImage, '/images/placements/partners-hero.webp')}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Placement', to: '/placements' }, { label: 'Recruiting Partners' }]}
        eyebrow={pp.heroEyebrow}
        eyebrowUpper
        title={`${count}\n${pp.heroTitle}`}
        titleWidth={700}
        description={`${count} ${pp.heroDescription}`}
        descriptionWidth={628}
        actions={[{ label: pp.heroCtaLabel, to: pp.heroCtaUrl, primary: true, icon: false }]}
      />

      {/* Partner grid — #12142e, 1312 column: title, 44px filter chips (8 apart,
          Eastern Blue when active), then 8-up 155x148 white-hairline cells. */}
      <Section bg="bg-navy-700">
        <SectionTitle
          dark
          tagline={pp.gridEyebrow}
          title={composeTitle(`${count} ${pp.gridTitle}`, pp.gridTitleHighlight)}
          highlight={pp.gridTitleHighlight}
          body={pp.gridSubtitle}
          titleClass="text-white [&_span]:text-teal-400"
        />
        <div className="mt-10 md:mt-12 flex flex-wrap gap-2">
          {['All', ...SECTORS].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSector(s)}
              aria-pressed={s === sector}
              className={`h-11 px-4 rounded text-base leading-[150%] text-white transition-colors ${
                s === sector ? 'bg-teal-500 font-medium outline outline-1 -outline-offset-1 outline-black/20' : 'hover:bg-white/10'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {visible.length > 0 ? (
          // Figma's mobile frame crams all 8 columns into 33px cells, which overflows
          // the names; 4 shorter columns keep the grid's height without the overflow.
          <div className="mt-10 md:mt-12 grid grid-cols-4 lg:grid-cols-8 gap-2.5 lg:gap-y-[30px]">
            {visible.map((p, i) => {
              const logoUrl = p.logo ? urlFor(p.logo).height(96).auto('format').url() : null;
              return (
                <div
                  key={p._id || `${p.name}-${i}`}
                  title={p.sector ? `${p.name} · ${p.sector}` : p.name}
                  className="h-[78px] lg:h-[148px] rounded-xl outline outline-1 -outline-offset-1 outline-white flex items-center justify-center p-1.5 lg:p-6 text-center transition-colors hover:bg-white/10"
                >
                  {logoUrl ? (
                    <img src={logoUrl} alt={p.name} className="max-h-12 max-w-full object-contain" />
                  ) : (
                    <span className="text-xs lg:text-sm leading-[150%] text-white">{p.name}</span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-10 md:mt-12 text-base leading-[150%] text-white/70">No partners listed in {sector} yet.</p>
        )}
      </Section>

      {/* Join CTA — navy, 64 padding, left column, buttons 14 apart. */}
      <section className="bg-navy-900 text-white px-5 py-12 md:px-16 md:py-20 border-t border-white/20">
        <div className="max-w-[1280px] mx-auto">
          <SectionTitle dark tagline={pp.ctaEyebrow} title={pp.ctaTitle} />
          <p className="mt-6 max-w-[598px] text-base md:text-lg leading-[150%]">{pp.ctaSubtitle}</p>
          <div className="mt-8 flex flex-col md:flex-row gap-3.5">
            {ctaButtons.map((b) => (
              <HeroButton key={b.label} label={b.label} href={b.url} primary={b.primary} icon={false} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
