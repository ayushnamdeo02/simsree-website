import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { usePartnersData } from '../lib/usePartnersData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const SECTORS = ['BFSI', 'Consulting', 'FMCG', 'IT. Tech', 'Pharma', 'Manufacturing', 'Media'];

const fallbackPage = {
  heroEyebrow: "Renamed from 'List of Recruiters'",
  heroTitle: 'companies already recruit here.',
  heroDescription: 'recruiters across 7 sectors — filter or search to find yours.',
  heroCtaLabel: 'Become a recruiting partner',
  heroCtaUrl: '/placements/contact',

  gridEyebrow: 'Recruiting Partners',
  gridTitle: 'companies. Pick a sector.',
  gridTitleHighlight: 'Pick a sector.',
  gridSubtitle: 'Filter by industry — or move your cursor over the grid to bring any logo into focus.',
  searchPlaceholder: 'Search for a company',

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

function TitleWithHighlight({ text, highlight, className, prefix }) {
  const idx = highlight ? (text || '').indexOf(highlight) : -1;
  const body =
    idx === -1 ? (
      text
    ) : (
      <>
        {text.slice(0, idx)}
        <span className="text-teal-500">{highlight}</span>
        {text.slice(idx + highlight.length)}
      </>
    );
  return (
    <h2 className={className}>
      {prefix && <>{prefix} </>}
      {body}
    </h2>
  );
}

export default function Partners() {
  const facts = useKeyFacts();
  const { data } = usePartnersData();
  const pp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const partners = fillFactsDeep(data?.partners?.length ? data.partners : fallbackPartners, facts);
  const ctaButtons = fillFactsDeep(pp.ctaButtons?.length ? pp.ctaButtons : fallbackPage.ctaButtons, facts);

  const [sector, setSector] = useState('All');
  const [query, setQuery] = useState('');

  const heroImageUrl = pp.heroImage ? urlFor(pp.heroImage).width(1600).url() : null;

  // Only offer chips for sectors that actually have partners behind them.
  const sectors = useMemo(() => {
    const present = new Set(partners.map((p) => p.sector).filter(Boolean));
    return ['All', ...SECTORS.filter((s) => present.has(s))];
  }, [partners]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return partners.filter(
      (p) =>
        (sector === 'All' || p.sector === sector) &&
        (!q || p.name.toLowerCase().includes(q))
    );
  }, [partners, sector, query]);

  const count = `${partners.length}+`;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="min-h-[520px] md:h-[620px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: heroImageUrl
            ? `url('${heroImageUrl}')`
            : 'linear-gradient(180deg, #8a8f9e, #cfd3da)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-navy-950/10" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[55px] pt-32 pb-12 md:pb-[60px] md:h-full flex flex-col justify-end text-white">
          <div className="text-xs text-white/70 mb-5 flex items-center">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/placements" className="hover:text-white">Placement</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white">Recruiting Partners</span>
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90 mb-4">
            {pp.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-[56px] md:leading-[1.12] font-semibold mb-5 max-w-2xl">
            {count}
            <br />
            {pp.heroTitle}
          </h1>
          <p className="max-w-lg text-sm text-white/85 leading-relaxed mb-7">
            {count} {pp.heroDescription}
          </p>
          <a
            href={pp.heroCtaUrl}
            className="bg-sky-600 hover:bg-teal-600 transition-colors text-white font-medium px-5 py-3 rounded-md w-fit"
          >
            {pp.heroCtaLabel}
          </a>
        </div>
      </section>

      {/* Partner grid */}
      <section className="bg-navy-950 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-white">
            {pp.gridEyebrow}
          </span>
          <TitleWithHighlight
            prefix={count}
            text={pp.gridTitle}
            highlight={pp.gridTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-5 mb-4"
          />
          <p className="text-sm text-white/70 leading-relaxed max-w-lg mb-8">{pp.gridSubtitle}</p>

          {/* Filter chips + search, one row above the grid */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {sectors.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSector(s)}
                aria-pressed={s === sector}
                className={`text-sm px-4 py-2 rounded-md transition-colors ${
                  s === sector
                    ? 'bg-sky-600 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {s}
              </button>
            ))}

            <div className="relative ml-auto w-full sm:w-64">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={pp.searchPlaceholder}
                aria-label="Search recruiting partners"
                className="w-full bg-white/[0.06] border border-white/15 rounded-md pl-9 pr-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {visible.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {visible.map((p, i) => {
                const logoUrl = p.logo ? urlFor(p.logo).width(200).url() : null;
                return (
                  <div
                    key={p._id || `${p.name}-${i}`}
                    title={p.sector ? `${p.name} · ${p.sector}` : p.name}
                    className="h-[92px] rounded-md border border-white/15 bg-white/[0.03] hover:bg-white/10 hover:border-white/30 transition-colors flex items-center justify-center px-2"
                  >
                    {logoUrl ? (
                      <img src={logoUrl} alt={p.name} className="max-h-9 max-w-full object-contain" />
                    ) : (
                      <span className="text-[11px] text-white/70 text-center leading-tight">
                        {p.name}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-white/60 py-8">
              No partners match that search{sector !== 'All' ? ` in ${sector}` : ''}.
            </p>
          )}
        </div>
      </section>

      {/* Join CTA */}
      <section className="bg-navy-900 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-white">
            {pp.ctaEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-5 mb-4">{pp.ctaTitle}</h2>
          <p className="text-sm text-white/75 mb-8">{pp.ctaSubtitle}</p>
          <div className="flex flex-wrap gap-3">
            {ctaButtons.map((b) => (
              <a
                key={b.label}
                href={b.url || '#'}
                className={`text-sm font-medium px-4 py-2.5 rounded-md transition-colors ${
                  b.primary
                    ? 'bg-sky-600 hover:bg-teal-600 text-white'
                    : 'bg-white hover:bg-gray-100 text-navy-900'
                }`}
              >
                {b.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
