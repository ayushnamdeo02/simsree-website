import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import StatCard from '../components/StatCard';
import { useBodyStructureData } from '../lib/useBodyStructureData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';
import { fallbackCommittees } from '../data/committees';

const CATEGORIES = ['Academic', 'Corporate', 'Cultural', 'Social', 'Leadership'];

const CATEGORY_STYLES = {
  Academic: 'bg-emerald-50 text-emerald-700',
  Corporate: 'bg-navy-50 text-navy-900',
  Cultural: 'bg-violet-50 text-violet-700',
  Social: 'bg-amber-50 text-amber-700',
  Leadership: 'bg-sky-50 text-sky-700',
};

const fallbackPage = {
  heroEyebrow: 'Committees · One Direction',
  heroTitle: 'Every committee. Every page.',
  heroTitleBreakAfter: 'committee.',
  heroDescription:
    'Each committee runs a real domain with real accountability — the full student-leadership directory.',
  heroButtons: [
    { label: 'Email GS team', url: 'mailto:placements@simsree.org', primary: true },
    { label: 'Email Chairs', url: 'mailto:placements@simsree.org', primary: false },
    { label: 'Election process', url: '#ladder', primary: false },
  ],
  stats: [
    { label: 'GS portfolios', value: '4', dark: true },
    { label: 'Chairs', value: '{{committeeCount}}', dark: false },
    { label: 'Year of leadership', value: '2', dark: true },
    { label: 'Elected', value: '100%', dark: false },
  ],
  calloutTitle: 'Student Body Structure — what is this page?',
  calloutBody:
    'This page is the organisational chart for all 13 student-run committees at SIMSREE — showing how committees report into the General Secretary structure, with each committee’s chairperson, members, and mandate. Use this to understand how the student body is organised. For a directory-style grid of each committee’s landing page, see All Committees.',
  filterEyebrow: 'Filter',
  filterTitle: 'Pick a category',
  filterSubtitle: 'Filter by type — academic, corporate, cultural, social, leadership.',
  cardCtaLabel: 'See what they run',
  ladderEyebrow: 'The Leadership Ladder',
  ladderTitle: 'From member to GS',
  ladderTitleHighlight: 'GS',
  ladderSubtitle:
    'Every student starts as a member. Two years later, the top end up as Chairpersons, Council members, or GS.',
  ladderSteps: [
    {
      stage: 'Step 1',
      title: 'Year 1 · Member',
      description:
        'Apply during induction · execute under chair guidance · learn the rhythm of your committee.',
      cohort: 'Cohort: ~110 / batch',
    },
    {
      stage: 'Step 2',
      title: 'Year 2 · Chair',
      description:
        'Lead a committee · own outcomes · mentor juniors · run the budget & calendar end-to-end.',
      cohort: 'Cohort: 13 chairs / batch',
    },
    {
      stage: 'Step 3',
      title: 'Year 2 · Council',
      description: 'Coordinate across committees · shape institute strategy.',
      cohort: 'Cohort: 5 council seats',
    },
    {
      stage: 'Apex',
      title: 'Year 2 · General Secretary',
      description:
        'Elected by the batch · the apex student leader · represents SIMSREE to industry, alumni, faculty.',
      cohort: 'Cohort: 1 GS / batch',
    },
  ],
};

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

export default function BodyStructure() {
  const facts = useKeyFacts();
  const { data } = useBodyStructureData();
  const bp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const committees = fillFactsDeep(
    data?.committees?.length ? data.committees : fallbackCommittees,
    facts
  );
  const heroButtons = fillFactsDeep(
    bp.heroButtons?.length ? bp.heroButtons : fallbackPage.heroButtons,
    facts
  );
  const ladderSteps = fillFactsDeep(
    bp.ladderSteps?.length ? bp.ladderSteps : fallbackPage.ladderSteps,
    facts
  );

  const [category, setCategory] = useState('All');

  const heroImageUrl = bp.heroImage ? urlFor(bp.heroImage).width(1600).url() : null;
  const ladderImageUrl = bp.ladderImage ? urlFor(bp.ladderImage).width(900).url() : null;

  // Only offer chips for categories that actually have committees.
  const chips = useMemo(() => {
    const present = new Set(committees.map((c) => c.category).filter(Boolean));
    return [
      { label: 'All', display: `All ${committees.length}` },
      ...CATEGORIES.filter((c) => present.has(c)).map((c) => ({ label: c, display: c })),
    ];
  }, [committees]);

  const visible = useMemo(
    () => (category === 'All' ? committees : committees.filter((c) => c.category === category)),
    [committees, category]
  );

  const title = bp.heroTitle || '';
  const brk = bp.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;
  const line1 = bIdx === -1 ? title : title.slice(0, bIdx + brk.length);
  const line2 = bIdx === -1 ? '' : title.slice(bIdx + brk.length).trim();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="min-h-[400px] md:h-[470px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: heroImageUrl
            ? `url('${heroImageUrl}')`
            : 'linear-gradient(180deg, #8a8f9e, #cfd3da)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-navy-950/10" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[55px] pt-32 pb-10 md:pb-[48px] md:h-full flex flex-col justify-end text-white">
          <div className="text-xs text-white/70 mb-4 flex items-center">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/students" className="hover:text-white">Student&apos;s Corner</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white">Student Body Structure</span>
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90 mb-3">
            {committees.length} {bp.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            {line1}
            {line2 && (
              <>
                <br />
                {line2}
              </>
            )}
          </h1>
          <p className="max-w-md text-sm text-white/85 leading-relaxed mb-7">
            {bp.heroDescription}
          </p>
          <div className="flex flex-wrap gap-3">
            {heroButtons.map((b) => (
              <a
                key={b.label}
                href={b.url || '#'}
                className={`text-sm font-medium px-5 py-3 rounded-md transition-colors flex items-center gap-2 w-fit ${
                  b.primary
                    ? 'bg-sky-600 hover:bg-teal-600 text-white'
                    : 'bg-white hover:bg-gray-100 text-navy-900'
                }`}
              >
                {b.label}
                {b.primary && <ArrowUpRight size={15} />}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1408px] mx-auto px-6 lg:px-16 py-10 lg:py-14">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {(bp.stats || []).map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Info callout */}
      {bp.calloutTitle && (
        <section className="bg-navy-50 py-10">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
            <div className="bg-white rounded-lg px-7 py-6 flex items-start gap-4">
              <MessageSquare size={18} className="shrink-0 mt-0.5 text-navy-900" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-navy-900 mb-2">{bp.calloutTitle}</p>
                <p className="text-xs text-ink-600 leading-relaxed">{bp.calloutBody}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Directory */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {bp.filterEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3">
            {bp.filterTitle}
          </h2>
          <p className="text-sm text-ink-600 mb-8">{bp.filterSubtitle}</p>

          <div className="flex flex-wrap items-center gap-2 mb-10">
            {chips.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => setCategory(c.label)}
                aria-pressed={c.label === category}
                className={`text-xs px-4 py-2 rounded-md transition-colors ${
                  c.label === category
                    ? 'bg-navy-900 text-white'
                    : 'text-ink-600 hover:text-navy-900 hover:bg-navy-50'
                }`}
              >
                {c.display}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visible.map((c) => {
              const imgUrl = c.image ? urlFor(c.image).width(600).url() : null;
              const href = c.slug?.current
                ? `/students/committees/${c.slug.current}`
                : c.linkUrl;
              const card = (
                <>
                  <div
                    className="h-[150px] bg-gray-200 bg-cover bg-center"
                    style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                  />
                  <div className="p-5">
                    {c.category && (
                      <span
                        className={`inline-block text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded mb-3 ${
                          CATEGORY_STYLES[c.category] || CATEGORY_STYLES.Corporate
                        }`}
                      >
                        {c.category}
                      </span>
                    )}
                    <h3 className="font-display text-lg font-semibold text-navy-900 mb-3">
                      {c.name}
                    </h3>
                    {href && (
                      <span className="text-xs font-medium text-navy-900 inline-flex items-center gap-1.5">
                        {bp.cardCtaLabel} <ArrowUpRight size={12} />
                      </span>
                    )}
                  </div>
                </>
              );
              return href ? (
                <Link
                  key={c._id || c.name}
                  to={href}
                  className="border border-navy-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  {card}
                </Link>
              ) : (
                <div
                  key={c._id || c.name}
                  className="border border-navy-100 rounded-lg overflow-hidden"
                >
                  {card}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership ladder */}
      <section id="ladder" className="py-16 lg:py-24 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                {bp.ladderEyebrow}
              </span>
              <TitleWithHighlight
                text={bp.ladderTitle}
                highlight={bp.ladderTitleHighlight}
                className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4"
              />
              <p className="text-sm text-ink-600 leading-relaxed max-w-md mb-8">
                {bp.ladderSubtitle}
              </p>
              <div
                className="h-[300px] rounded-lg bg-gray-200 bg-cover bg-center"
                style={ladderImageUrl ? { backgroundImage: `url('${ladderImageUrl}')` } : undefined}
              />
            </div>

            <ol className="list-none m-0 p-0">
              {ladderSteps.map((s, i) => (
                <li key={s.title} className="flex gap-5 pb-8 last:pb-0">
                  <div className="flex flex-col items-center shrink-0">
                    <span className="w-9 h-9 rounded-full border border-navy-100 flex items-center justify-center text-[11px] font-semibold text-navy-600">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {i < ladderSteps.length - 1 && (
                      <span className="flex-1 w-px bg-navy-100 mt-2" aria-hidden="true" />
                    )}
                  </div>
                  <div className="min-w-0 pb-2">
                    {s.stage && (
                      <span className="block text-[10px] font-semibold tracking-widest uppercase text-ink-400 mb-1.5">
                        {s.stage}
                      </span>
                    )}
                    <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
                      {s.title}
                    </h3>
                    {s.description && (
                      <p className="text-sm text-ink-600 leading-relaxed mb-3">{s.description}</p>
                    )}
                    {s.cohort && (
                      <p className="text-[11px] text-ink-400 pt-3 border-t border-navy-100">
                        {s.cohort}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
