import { useMemo, useState } from 'react';
import { StatGrid } from '../components/StatCard';
import PageHero from '../components/PageHero';
import { Section, SectionTitle, H5, H6 } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { useFacultyData } from '../lib/useFacultyData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const DISCIPLINES = ['Finance', 'Marketing', 'Operations', 'HR & OB', 'Systems', 'Economics', 'Strategy'];

const fallbackPage = {
  heroEyebrow: 'Scholarship + Industry Experience',
  heroTitle: "Meet the people who'll teach you.",
  heroTitleBreakAfter: 'people',
  heroDescription:
    'Learn from permanent faculty across Finance, Marketing, Operations, HR, Systems, Economics, OB and Strategy — supplemented by senior industry practitioners.',
  heroButtons: [
    { label: 'Meet the core faculty', url: '#core', primary: true },
    { label: 'Meet the visiting faculty', url: '#visiting', primary: false },
    { label: 'See research areas', url: '#research', primary: false },
  ],
  stats: [
    { label: 'Core faculty', value: '32', dark: true },
    { label: 'Visiting practitioners', value: '48+', dark: false },
    { label: 'Disciplines', value: '7', dark: true },
    { label: 'Doctoral qualified', value: '100%', dark: false },
  ],
  coreEyebrow: 'Permanent · Across Disciplines',
  coreTitle: 'Core faculty.',
  coreSubtitle: 'Every one combines doctoral scholarship with corporate practice.',
  filterLabel: 'Filter by:',
  visitingEyebrow: 'Industry Practitioners',
  visitingTitle: 'Visiting faculty.',
  visitingSubtitle:
    'Senior industry practitioners teach electives and short modules — many are SIMSREE alumni giving back.',
  researchEyebrow: 'Research Clusters',
  researchTitle: 'Research areas.',
  researchTitleHighlight: 'areas.',
  researchSubtitle:
    'Active research clusters — open to PhD enquiries and industry collaborations.',
};

const fallbackCore = [
  ['Dr. Anand Mehta', 'Professor & Head, Finance', 'Finance', 'PhD · IIM Ahmedabad', 'Capital markets · corporate finance', '18 years at SIMSREE'],
  ['Dr. Priya Iyer', 'Associate Professor', 'Finance', 'PhD · JBIMS Mumbai', 'Derivatives · fintech · valuation', '11 years at SIMSREE'],
  ['Dr. Rohan Deshpande', 'Assistant Professor', 'Finance', 'PhD · IIT Bombay (SJMSOM)', 'Banking · risk management · FPSB', '8 years at SIMSREE'],
  ['Dr. Kavita Rao', 'Professor & Head, Marketing', 'Marketing', 'PhD · Mumbai University', 'Brand · consumer behaviour · retail', '16 years at SIMSREE'],
  ['Dr. Siddharth Menon', 'Associate Professor', 'Marketing', 'PhD · NITIE Mumbai', 'Digital marketing · growth · B2B', '9 years at SIMSREE'],
  ['Dr. Meena Kulkarni', 'Professor & Head, Operations', 'Operations', 'PhD · IIM Calcutta', 'Supply chain · lean · six sigma', '14 years at SIMSREE'],
  ['Dr. Vikram Singh', 'Associate Professor', 'Operations', 'PhD · NITIE Mumbai', 'Logistics · sustainability · services ops', '9 years at SIMSREE'],
  ['Dr. Anjali Nair', 'Professor & Head, HR/OB', 'HR & OB', 'PhD · XLRI Jamshedpur', 'People analytics · leadership · OD', '13 years at SIMSREE'],
  ['Dr. Rajat Khanna', 'Assistant Professor', 'HR & OB', 'PhD · TISS Mumbai', 'Change management · culture · OB', '7 years at SIMSREE'],
  ['Dr. Aditya Verma', 'Professor & Head, Systems', 'Systems', 'PhD · IIT Kharagpur', 'Data science · analytics · BI', '15 years at SIMSREE'],
  ['Dr. Pooja Bhatia', 'Associate Professor', 'Systems', 'PhD · MIT Manipal', 'Machine learning · AI applications', '6 years at SIMSREE'],
  ['Dr. Harish Patil', 'Professor & Head, Economics', 'Economics', 'PhD · Delhi School of Economics', 'Indian economy · public policy', '18 years at SIMSREE'],
  ['Dr. Ritu Chaudhary', 'Associate Professor', 'Economics', 'PhD · IGIDR Mumbai', 'Development economics · financial markets', '10 years at SIMSREE'],
  ['Dr. Nikhil Sharma', 'Professor, Strategy & Entrepreneurship', 'Strategy', 'PhD · IIM Indore', 'Corporate strategy · entrepreneurship · governance', '12 years at SIMSREE'],
].map(([name, role, discipline, qualification, specialism, tenure], i) => ({
  name, role, discipline, qualification, specialism, tenure, order: i + 1,
}));

const fallbackVisiting = [
  ['Aarav Mehta', 'Finance', 'MD, Global Markets · Barclays', 'Teaches: Trading Floor Realities', "Visiting since 2019 · SIMSREE alum '08"],
  ['Sneha Patel', 'Marketing', 'CMO · Hindustan Unilever', 'Teaches: Brand at Scale', "Visiting since 2021 · SIMSREE alum '10"],
  ['Aditya Verma', 'Strategy', 'Partner · McKinsey & Co', 'Teaches: Strategy in Practice', "Visiting since 2020 · SIMSREE alum '09"],
  ['Priya Sharma', 'Finance', 'CFO · ICICI Bank', 'Teaches: Banking Capstone', "Visiting since 2017 · SIMSREE alum '02"],
  ['Karthik Rao', 'Marketing', 'Brand Director, Asia · P&G', 'Teaches: Consumer Insights Lab', "Visiting since 2022 · SIMSREE alum '10"],
  ['Kavya Singh', 'Operations', 'Co-founder & CEO · FinSure', 'Teaches: Founder Stories', "Visiting since 2023 · SIMSREE alum '15"],
  ['Pooja Desai', 'HR & OB', 'Director · EY Parthenon', 'Teaches: Consulting Casework', "Visiting since 2020 · SIMSREE alum '09"],
  ['Arjun Khanna', 'Media & Sports', 'CEO · Star India Sports', 'Teaches: Media Economics', "Visiting since 2021 · SIMSREE alum '03"],
].map(([name, tag, role, teaches, since], i) => ({ name, tag, role, teaches, since, order: i + 1 }));

const fallbackClusters = [
  ['Capital Markets & Banking', 'Equity, derivatives, financial regulation, Indian banking, fintech.', 'Dr. Mehta · Dr. Iyer · Dr. Deshpande'],
  ['Consumer Behaviour & Brand', 'Indian consumer markets, brand strategy, digital marketing, retail.', 'Dr. Rao · Dr. Menon'],
  ['Operations & SCM', 'Supply chain, lean, sustainability, services operations.', 'Dr. Kulkarni · Dr. Singh'],
  ['HR & Org Behaviour', 'Leadership, talent analytics, OD, organisational change.', 'Dr. Nair · Dr. Khanna'],
  ['Strategy & Entrepreneurship', 'Corporate strategy, startup ecosystems, governance.', 'Dr. Sharma'],
  ['Economics & Policy', 'Indian economy, public policy, development, financial markets.', 'Dr. Patil · Dr. Chaudhary'],
].map(([title, description, leads], i) => ({ title, description, leads, order: i + 1 }));

// Figma photos used when a person has no Sanity photo.
const CORE_PHOTOS = Array.from({ length: 14 }, (_, i) => `/images/faculty/core-${i + 1}.webp`);
const VISIT_PHOTOS = Array.from({ length: 8 }, (_, i) => `/images/faculty/visit-${i + 1}.webp`);
const img = (image, fallback, w) => (image ? urlFor(image).width(w).auto('format').url() : fallback);

export default function Faculty() {
  const facts = useKeyFacts();
  const { data } = useFacultyData();
  const fp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const core = fillFactsDeep(data?.core?.length ? data.core : fallbackCore, facts);
  const visiting = fillFactsDeep(data?.visiting?.length ? data.visiting : fallbackVisiting, facts);
  const clusters = fillFactsDeep(data?.clusters?.length ? data.clusters : fallbackClusters, facts);
  const heroButtons = fillFactsDeep(fp.heroButtons?.length ? fp.heroButtons : fallbackPage.heroButtons, facts);

  const [discipline, setDiscipline] = useState('All');

  // Chips carry a live count, and only appear for disciplines that have faculty.
  const chips = useMemo(() => {
    const counts = new Map();
    for (const f of core) {
      if (f.discipline) counts.set(f.discipline, (counts.get(f.discipline) || 0) + 1);
    }
    return [
      { label: 'All', count: core.length },
      ...DISCIPLINES.filter((d) => counts.has(d)).map((d) => ({ label: d, count: counts.get(d) })),
    ];
  }, [core]);

  const visibleCore = useMemo(
    () => (discipline === 'All' ? core : core.filter((f) => f.discipline === discipline)),
    [core, discipline],
  );

  const title = fp.heroTitle || '';
  const brk = fp.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;
  const heroTitle = bIdx === -1 ? title : `${title.slice(0, bIdx + brk.length)}\n${title.slice(bIdx + brk.length).trim()}`;

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(fp.heroImage, '/images/faculty/hero.webp', { stretch: true })}
        eyebrow={fp.heroEyebrow}
        eyebrowStyle="pill"
        title={heroTitle}
        description={fp.heroDescription}
        descriptionWidth={628}
        actions={heroButtons.map((b) => ({ label: b.label, href: b.url, primary: b.primary }))}
      />

      <section className="px-5 py-16 md:p-16">
        <StatGrid stats={fp.stats || []} />
      </section>

      {/* Core faculty — centred title; square-cornered 45px outline chips (navy when
          picked); 405 cards (32 gaps): 341x320 photo (radius 16), yellow-tint tag,
          H5 navy name, 18/150 navy role, 16/150 grey details. */}
      <Section id="core" width={1280} className="scroll-mt-24">
        <SectionTitle center tagline={fp.coreEyebrow} title={fp.coreTitle} highlight={fp.coreTitleHighlight || 'faculty.'} body={fp.coreSubtitle} />
        <div className="mt-20 flex flex-col md:flex-row md:items-center md:justify-center gap-4 md:gap-8">
          <span className="text-base leading-[150%] font-semibold text-[#292929]">{fp.filterLabel}</span>
          <div className="flex flex-wrap gap-3">
            {chips.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => setDiscipline(c.label)}
                aria-pressed={c.label === discipline}
                className={`h-[45px] px-3 text-sm leading-[150%] outline outline-1 -outline-offset-1 outline-black/20 transition-colors ${
                  c.label === discipline ? 'bg-navy-900 text-white' : 'text-black hover:bg-navy-50'
                }`}
              >
                {c.label} ({c.count})
              </button>
            ))}
          </div>
        </div>
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleCore.map((f) => {
            const i = core.indexOf(f);
            return (
              <div key={f._id || f.name} className="p-6 md:p-8 flex flex-col gap-6 rounded-2xl bg-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small">
                <div
                  className="h-[320px] rounded-2xl bg-navy-50 bg-cover bg-center"
                  style={{ backgroundImage: `url('${img(f.photo, CORE_PHOTOS[i % CORE_PHOTOS.length], 682)}')` }}
                />
                <div className="flex flex-col gap-3">
                  {f.discipline && (
                    <span className="w-fit px-2.5 py-1 rounded-2xl bg-[#ffdb43]/10 text-xs leading-[150%] text-navy-900">{f.discipline}</span>
                  )}
                  <div className="flex flex-col gap-3">
                    <div>
                      <H5 as="h3">{f.name}</H5>
                      <p className="text-lg leading-[150%] text-navy-900">{f.role}</p>
                    </div>
                    <p className="text-base leading-[150%] text-[#4c4c4c]">
                      {[f.qualification, f.specialism, f.tenure].filter(Boolean).map((l, li) => (
                        <span key={li} className="block">
                          {l}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Visiting faculty — centred title; 308 cards (16 gaps): a 463 photo (top
          radius 16), then a 24-padded Eastern Blue tag, H5 name and three lines. */}
      <Section id="visiting" width={1280} className="scroll-mt-24">
        <SectionTitle center tagline={fp.visitingEyebrow} title={fp.visitingTitle} body={fp.visitingSubtitle} />
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 lg:gap-y-20">
          {visiting.map((v, i) => (
            <div key={v._id || v.name} className="flex flex-col gap-4 rounded-b-2xl outline outline-1 -outline-offset-1 outline-black/20">
              <div
                className="h-[463px] rounded-t-2xl bg-navy-50 bg-cover bg-center shadow-small"
                style={{ backgroundImage: `url('${img(v.photo, VISIT_PHOTOS[i % VISIT_PHOTOS.length], 616)}')` }}
              />
              <div className="p-6 pt-2 flex flex-col gap-2">
                {v.tag && <span className="w-fit px-2.5 py-1 rounded-2xl bg-sky-50 text-sm leading-[150%] text-sky-600">{v.tag}</span>}
                <div className="flex flex-col gap-4">
                  <H5 as="h3" className="text-black">
                    {v.name}
                  </H5>
                  <p className="text-base leading-[150%] text-black">
                    {[v.role, v.teaches, v.since].filter(Boolean).map((l, li) => (
                      <span key={li} className="block">
                        {l}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Research areas — #eaeaf1; 616 title + photo | 616 numbered timeline
          (48px navy circles, 2px connectors, H6 navy, copy + leads). */}
      <Section id="research" bg="bg-navy-50" className="scroll-mt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col gap-[52px]">
            <SectionTitle tagline={fp.researchEyebrow} title={fp.researchTitle} highlight={fp.researchTitleHighlight} body={fp.researchSubtitle} width={616} />
            <div
              className="h-[300px] lg:h-[475px] bg-navy-100 bg-cover bg-center"
              style={{ backgroundImage: `url('${img(fp.researchImage, '/images/faculty/research.webp', 1232)}')` }}
            />
          </div>
          <ol className="list-none m-0 p-0 flex flex-col gap-1">
            {clusters.map((c, i) => (
              <li key={c._id || c.title} className="flex gap-6 md:gap-10 min-h-[120px]">
                <div className="flex flex-col items-center gap-4 shrink-0">
                  <span className="w-12 h-12 rounded-full bg-navy-900 text-white flex items-center justify-center text-lg leading-[150%]">
                    {String(c.order ?? i + 1).padStart(2, '0')}
                  </span>
                  {i < clusters.length - 1 && <span className="flex-1 w-0.5 bg-black/20" aria-hidden="true" />}
                </div>
                <div className="flex-1 min-w-0 pb-6 flex flex-col gap-2">
                  <H6 as="h3">{c.title}</H6>
                  <p className="text-base leading-[150%] text-black">
                    {c.description}
                    {c.leads && (
                      <>
                        <br />
                        {c.leads}
                      </>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </div>
  );
}
