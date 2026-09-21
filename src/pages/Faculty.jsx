import { useMemo, useState } from 'react';
import StatCard from '../components/StatCard';
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
  ['Dr. Anand Mehta', 'Professor & Head, Finance', 'Finance', 'PhD · IIM Ahmedabad', 'Capital markets · corporate finance', '19 years at SIMSREE'],
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
  ['Sneha Patel', 'Marketing', 'CMO · Hindustan Unilever', 'Teaches: Brand at Scale', "Visiting since 2021 · SIMSREE alum '05"],
  ['Aditya Verma', 'Strategy', 'Partner · McKinsey & Co', 'Teaches: Strategy in Practice', "Visiting since 2020 · SIMSREE alum '11"],
  ['Priya Sharma', 'Finance', 'CFO · ICICI Bank', 'Teaches: Banking Capstone', "Visiting since 2017 · SIMSREE alum '03"],
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

export default function Faculty() {
  const facts = useKeyFacts();
  const { data } = useFacultyData();
  const fp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const core = fillFactsDeep(data?.core?.length ? data.core : fallbackCore, facts);
  const visiting = fillFactsDeep(data?.visiting?.length ? data.visiting : fallbackVisiting, facts);
  const clusters = fillFactsDeep(data?.clusters?.length ? data.clusters : fallbackClusters, facts);
  const heroButtons = fillFactsDeep(fp.heroButtons?.length ? fp.heroButtons : fallbackPage.heroButtons, facts);

  const [discipline, setDiscipline] = useState('All');

  const heroImageUrl = fp.heroImage ? urlFor(fp.heroImage).width(1600).url() : null;
  const researchImageUrl = fp.researchImage ? urlFor(fp.researchImage).width(900).url() : null;

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
    [core, discipline]
  );

  const title = fp.heroTitle || '';
  const brk = fp.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;
  const line1 = bIdx === -1 ? title : title.slice(0, bIdx + brk.length);
  const line2 = bIdx === -1 ? '' : title.slice(bIdx + brk.length).trim();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="min-h-[440px] md:h-[520px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: heroImageUrl
            ? `url('${heroImageUrl}')`
            : 'linear-gradient(180deg, #8a8f9e, #cfd3da)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-navy-950/10" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[55px] pt-32 pb-12 md:pb-[56px] md:h-full flex flex-col justify-end text-white">
          <span className="inline-block w-fit bg-navy-900 text-white text-[11px] font-semibold tracking-widest uppercase px-4 py-2 rounded mb-6">
            {fp.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-5">
            {line1}
            {line2 && (
              <>
                <br />
                {line2}
              </>
            )}
          </h1>
          <p className="max-w-lg text-sm text-white/85 leading-relaxed mb-8">{fp.heroDescription}</p>
          <div className="flex flex-wrap gap-3">
            {heroButtons.map((b) => (
              <a
                key={b.label}
                href={b.url || '#'}
                className={`font-medium px-5 py-3 rounded-md transition-colors w-fit ${
                  b.primary
                    ? 'bg-navy-900 hover:bg-navy-800 text-white'
                    : 'bg-white hover:bg-gray-100 text-navy-900'
                }`}
              >
                {b.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1408px] mx-auto px-6 lg:px-16 py-10 lg:py-16">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {(fp.stats || []).map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Core faculty */}
      <section id="core" className="py-16 lg:py-24 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {fp.coreEyebrow}
            </span>
            <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4">
              {fp.coreTitle}
            </h2>
            <p className="text-sm text-ink-600">{fp.coreSubtitle}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <span className="text-xs text-ink-400 mr-1">{fp.filterLabel}</span>
            {chips.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => setDiscipline(c.label)}
                aria-pressed={c.label === discipline}
                className={`text-xs px-3.5 py-2 rounded-md transition-colors ${
                  c.label === discipline
                    ? 'bg-sky-600 text-white'
                    : 'text-ink-600 hover:text-navy-900 hover:bg-navy-50'
                }`}
              >
                {c.label} ({c.count})
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visibleCore.map((f) => {
              const photoUrl = f.photo ? urlFor(f.photo).width(600).url() : null;
              return (
                <div
                  key={f._id || f.name}
                  className="border border-navy-100 rounded-lg overflow-hidden flex flex-col"
                >
                  <div
                    className="h-[220px] bg-gray-200 bg-cover bg-center"
                    style={photoUrl ? { backgroundImage: `url('${photoUrl}')` } : undefined}
                  />
                  <div className="p-5 flex flex-col flex-1">
                    {f.discipline && (
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-sky-600 mb-2">
                        {f.discipline}
                      </span>
                    )}
                    <h3 className="font-display text-lg font-semibold text-navy-900 mb-1">
                      {f.name}
                    </h3>
                    <p className="text-xs text-ink-600 mb-3">{f.role}</p>
                    <div className="space-y-0.5 mt-auto">
                      {f.qualification && <p className="text-[11px] text-ink-400">{f.qualification}</p>}
                      {f.specialism && <p className="text-[11px] text-ink-400">{f.specialism}</p>}
                      {f.tenure && <p className="text-[11px] text-ink-400">{f.tenure}</p>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visiting faculty */}
      <section id="visiting" className="py-16 lg:py-24 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {fp.visitingEyebrow}
            </span>
            <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4">
              {fp.visitingTitle}
            </h2>
            <p className="text-sm text-ink-600">{fp.visitingSubtitle}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {visiting.map((v) => {
              const photoUrl = v.photo ? urlFor(v.photo).width(500).url() : null;
              return (
                <div key={v._id || v.name} className="flex flex-col">
                  <div
                    className="h-[220px] bg-gray-200 bg-cover bg-center mb-4"
                    style={photoUrl ? { backgroundImage: `url('${photoUrl}')` } : undefined}
                  />
                  {v.tag && (
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-sky-600 mb-2">
                      {v.tag}
                    </span>
                  )}
                  <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">{v.name}</h3>
                  <div className="space-y-0.5">
                    {v.role && <p className="text-[11px] text-ink-600">{v.role}</p>}
                    {v.teaches && <p className="text-[11px] text-ink-400">{v.teaches}</p>}
                    {v.since && <p className="text-[11px] text-ink-400">{v.since}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Research areas */}
      <section id="research" className="bg-navy-50 py-16 lg:py-24 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                {fp.researchEyebrow}
              </span>
              <TitleWithHighlight
                text={fp.researchTitle}
                highlight={fp.researchTitleHighlight}
                className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4"
              />
              <p className="text-sm text-ink-600 max-w-md mb-8">{fp.researchSubtitle}</p>
              <div
                className="h-[260px] rounded-lg bg-gray-200 bg-cover bg-center"
                style={researchImageUrl ? { backgroundImage: `url('${researchImageUrl}')` } : undefined}
              />
            </div>

            <div className="space-y-6">
              {clusters.map((c, i) => (
                <div key={c._id || c.title} className="flex gap-5">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-navy-900 text-white flex items-center justify-center text-xs font-semibold">
                    {String(c.order ?? i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold text-sky-600 mb-1.5">
                      {c.title}
                    </h3>
                    {c.description && (
                      <p className="text-sm text-ink-600 leading-relaxed mb-1.5">{c.description}</p>
                    )}
                    {c.leads && <p className="text-xs text-ink-400">{c.leads}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
