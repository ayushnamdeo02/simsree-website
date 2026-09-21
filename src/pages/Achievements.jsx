import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Award,
  BookOpen,
  FileText,
  Lightbulb,
  Plus,
  Trophy,
} from 'lucide-react';
import { useAchievementsData } from '../lib/useAchievementsData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const CATEGORIES = [
  'Case Competitions',
  'Scholarships',
  'Publications',
  'Sports',
  'External Recognition',
];

const SUBMIT_ICONS = {
  case: Lightbulb,
  scholarship: Award,
  publication: BookOpen,
  sports: Trophy,
  external: FileText,
};

const fallbackPage = {
  heroEyebrow: 'The Scoreboard',
  heroTitle: 'Where our students win.',
  heroTitleItalic: 'win.',
  heroDescription:
    'Fresh wins every month — competitions, scholarships, publications, sports, external recognitions.',
  heroButtons: [
    { label: 'Submit your achievement', url: '#submit', primary: true },
    { label: 'Browse by year', url: '#list', primary: false },
  ],

  filterEyebrow: 'Filter',
  filterTitle: 'Pick a category',
  filterSubtitle: 'Tap a category to filter instantly.',

  pageSize: 6,
  loadMoreLabel: 'Load more achievements',

  submitEyebrow: 'Submit',
  submitTitle: 'Won something? Tell us.',
  submitTitleHighlight: 'Tell us.',
  submitDescription:
    'Marketing & Media reviews submissions within 5 days. The achievement appears on this page + the home-page news feed within 24 hours of review.',
  submitCtaLabel: 'Add your achievement',
  submitCtaUrl: '/contact',
  submitListTitle: 'What you can submit',
  submitStats: [
    { value: '127', label: 'Submissions this AY' },
    { value: '94%', label: 'Approved' },
    { value: '3.2d', label: 'Avg review time' },
  ],
};

const fallbackAchievements = [
  {
    title: "L'Oreal Brandstorm National Winners 2025",
    badge: 'Case · Winner',
    category: 'Case Competitions',
    summary: 'Team SIMSREE-Mavericks · MMS 2024-26 · ₹3L + Global Final invite',
    detail:
      'Team SIMSREE-Mavericks (3 MMS 2024-26 students) won L’Oreal Brandstorm National finals 2025 in Mumbai. Their pitch: a refillable haircare line targeting Tier-2 Indian salons. Beating 240+ teams nationally, they secured a ₹3L prize and invitations to the Global Final in Paris (June 2026).',
    metaRows: [
      { label: 'Team', value: 'Aarav · Priya · Rohit' },
      { label: 'Prize', value: '₹3L + Global Final' },
      { label: 'Beat', value: '240+ teams' },
    ],
    year: '2025',
    order: 1,
  },
  {
    title: 'Aditya Birla Scholarship 2025',
    badge: 'Scholarship · Awarded',
    category: 'Scholarships',
    summary: 'Recipient · MMS 2024-26 · ₹4L per year',
    year: '2025',
    order: 2,
  },
  {
    title: 'ESG Disclosure in Indian Banks',
    badge: 'Publication',
    category: 'Publications',
    summary: 'R&C Club · IIMB Management Review · Aug 2025',
    year: '2025',
    order: 3,
  },
  {
    title: 'Inter B-School Cricket Runners-Up',
    badge: 'Sports',
    category: 'Sports',
    summary: 'Indore · Feb 2026',
    year: '2026',
    order: 4,
  },
  {
    title: 'FPSB India · Best Institutional Partner 2025',
    badge: 'External',
    category: 'External Recognition',
    summary: 'Awarded · Hyderabad · Nov 2025',
    year: '2025',
    order: 5,
  },
  {
    title: 'McKinsey Mantra Top 10 Nationally',
    badge: 'Case · Finalist',
    category: 'Case Competitions',
    summary: '2 teams qualified · Mumbai finals · Oct 2025',
    year: '2025',
    order: 6,
  },
];

const fallbackCategories = [
  {
    title: 'Case competitions',
    examples: "L'Oreal Brandstorm · ITC Interrobang · Bain CoLab · McKinsey TLP · TATA Crucible",
    icon: 'case',
    order: 1,
  },
  {
    title: 'Scholarships',
    examples: 'Aditya Birla · Tata · OP Jindal · Dhirubhai Ambani · merit + need based',
    icon: 'scholarship',
    order: 2,
  },
  {
    title: 'Publications',
    examples: 'IIMB Management Review · Vikalpa · The Hindu Business Line · industry whitepapers',
    icon: 'publication',
    order: 3,
  },
  {
    title: 'Sports & cultural',
    examples: 'Inter-B-school tournaments · TEDx talks · podcasts · public-speaking podiums',
    icon: 'sports',
    order: 4,
  },
  {
    title: 'External recognition',
    examples: 'Awards · keynote invitations · advisory-board appointments · public mentions',
    icon: 'external',
    order: 5,
  },
];

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

// Native <details> so the row expands with keyboard and without JS.
function AchievementRow({ a, defaultOpen }) {
  const imgUrl = a.image ? urlFor(a.image).width(400).url() : null;
  return (
    <details
      open={defaultOpen}
      className="group border border-navy-100 rounded-lg overflow-hidden bg-white"
    >
      <summary className="flex items-stretch gap-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <div
          className="w-[110px] md:w-[150px] shrink-0 bg-gray-200 bg-cover bg-center min-h-[104px]"
          style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
        />
        <div className="flex-1 min-w-0 py-5">
          {a.badge && (
            <span className="inline-block text-[9px] font-semibold tracking-widest uppercase text-navy-900 bg-navy-50 px-2.5 py-1 rounded mb-2.5">
              {a.badge}
            </span>
          )}
          <h3 className="font-display text-lg font-semibold text-navy-900 mb-1">{a.title}</h3>
          <p className="text-xs text-ink-600">{a.summary}</p>
        </div>
        <span className="shrink-0 self-center pr-5 text-ink-400 transition-transform group-open:rotate-45">
          <Plus size={18} />
        </span>
      </summary>

      {(a.detail || a.metaRows?.length > 0) && (
        <div className="pl-[110px] md:pl-[150px]">
          <div className="px-5 pb-5">
            {a.detail && (
              <p className="text-sm text-ink-600 leading-relaxed mb-4">{a.detail}</p>
            )}
            {a.metaRows?.length > 0 && (
              <dl className="flex flex-wrap gap-x-6 gap-y-2 m-0">
                {a.metaRows.map((m) => (
                  <div key={m.label} className="flex items-center gap-1.5 text-[11px]">
                    <dt className="text-ink-400">{m.label}:</dt>
                    <dd className="text-navy-900 m-0">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      )}
    </details>
  );
}

export default function Achievements() {
  const facts = useKeyFacts();
  const { data } = useAchievementsData();
  const ap = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const achievements = fillFactsDeep(
    data?.achievements?.length ? data.achievements : fallbackAchievements,
    facts
  );
  const categories = fillFactsDeep(
    data?.categories?.length ? data.categories : fallbackCategories,
    facts
  );
  const heroButtons = fillFactsDeep(
    ap.heroButtons?.length ? ap.heroButtons : fallbackPage.heroButtons,
    facts
  );
  const submitStats = fillFactsDeep(
    ap.submitStats?.length ? ap.submitStats : fallbackPage.submitStats,
    facts
  );

  const pageSize = ap.pageSize || 6;
  const [category, setCategory] = useState('All');
  const [shown, setShown] = useState(pageSize);

  const heroImageUrl = ap.heroImage ? urlFor(ap.heroImage).width(1600).url() : null;

  // Only offer chips for categories that actually have entries.
  const chips = useMemo(() => {
    const present = new Set(achievements.map((a) => a.category).filter(Boolean));
    return ['All', ...CATEGORIES.filter((c) => present.has(c))];
  }, [achievements]);

  const filtered = useMemo(
    () => (category === 'All' ? achievements : achievements.filter((a) => a.category === category)),
    [achievements, category]
  );
  const visible = filtered.slice(0, shown);
  const hasMore = filtered.length > shown;

  const pickCategory = (c) => {
    setCategory(c);
    setShown(pageSize); // reset paging when the filter changes
  };

  // Render the collage layout even before images exist, so the page keeps its
  // shape; tiles fall back to the grey placeholder used elsewhere.
  const collage = ap.collage?.length ? ap.collage : [null, null, null, null, null];

  const italic = ap.heroTitleItalic;
  const iIdx = italic ? (ap.heroTitle || '').indexOf(italic) : -1;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="min-h-[380px] md:h-[440px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
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
            <span className="text-white">Achievements</span>
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90 mb-3">
            {ap.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            {iIdx === -1 ? (
              ap.heroTitle
            ) : (
              <>
                {ap.heroTitle.slice(0, iIdx)}
                <span className="italic">{italic}</span>
                {ap.heroTitle.slice(iIdx + italic.length)}
              </>
            )}
          </h1>
          <p className="max-w-md text-sm text-white/85 leading-relaxed mb-7">
            {ap.heroDescription}
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

      {/* Filter + list */}
      <section id="list" className="py-16 lg:py-20 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {ap.filterEyebrow}
            </span>
            <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3">
              {ap.filterTitle}
            </h2>
            <p className="text-sm text-ink-600">{ap.filterSubtitle}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => pickCategory(c)}
                aria-pressed={c === category}
                className={`text-xs px-4 py-2 rounded-md transition-colors ${
                  c === category
                    ? 'bg-navy-900 text-white'
                    : 'text-ink-600 hover:text-navy-900 hover:bg-navy-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {visible.length > 0 ? (
            <div className="max-w-[980px] mx-auto flex flex-col gap-4">
              {visible.map((a, i) => (
                <AchievementRow key={a._id || a.title} a={a} defaultOpen={i === 0} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-600 text-center py-8">
              No achievements in this category yet.
            </p>
          )}

          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                type="button"
                onClick={() => setShown((s) => s + pageSize)}
                className="bg-navy-900 hover:bg-navy-800 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md inline-flex items-center gap-2"
              >
                {ap.loadMoreLabel} <ArrowUpRight size={14} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Submit band */}
      <section id="submit" className="bg-navy-900 text-white py-16 lg:py-24 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-white/70">
                {ap.submitEyebrow}
              </span>
              <TitleWithHighlight
                text={ap.submitTitle}
                highlight={ap.submitTitleHighlight}
                className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-5 mb-4"
              />
              <p className="text-sm text-white/75 leading-relaxed max-w-md mb-8">
                {ap.submitDescription}
              </p>
              <a
                href={ap.submitCtaUrl || '#'}
                className="bg-sky-600 hover:bg-teal-600 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md inline-flex items-center gap-2 mb-12"
              >
                {ap.submitCtaLabel} <ArrowUpRight size={14} />
              </a>

              <div className="grid grid-cols-3 gap-6 max-w-md">
                {submitStats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-3xl font-semibold mb-1">{s.value}</p>
                    <p className="text-[10px] uppercase tracking-wide text-white/50">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl font-semibold mb-7">{ap.submitListTitle}</h3>
              <div className="flex flex-col">
                {categories.map((c) => {
                  const Icon = SUBMIT_ICONS[c.icon] || Lightbulb;
                  return (
                    <div
                      key={c.title}
                      className="flex gap-4 py-5 border-b border-white/10 last:border-b-0"
                    >
                      <span className="shrink-0 w-9 h-9 rounded-full border border-white/25 flex items-center justify-center">
                        <Icon size={15} className="text-white" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium mb-1">{c.title}</p>
                        <p className="text-xs text-white/55 leading-relaxed">{c.examples}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo collage */}
      {collage.length > 0 && (
        <section className="pb-16 lg:pb-24 pt-16 lg:pt-24">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:h-[420px]">
              <div
                className="col-span-2 row-span-2 rounded-lg bg-gray-200 bg-cover bg-center min-h-[220px]"
                style={
                  collage[0]
                    ? { backgroundImage: `url('${urlFor(collage[0]).width(900).url()}')` }
                    : undefined
                }
              />
              {collage.slice(1, 5).map((img, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-gray-200 bg-cover bg-center min-h-[130px]"
                  style={
                    img ? { backgroundImage: `url('${urlFor(img).width(500).url()}')` } : undefined
                  }
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
