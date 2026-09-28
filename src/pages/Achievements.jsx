import { useMemo, useState } from 'react';
import { ArrowUpRight, BadgeCheck, GraduationCap, Newspaper, Plus, Trophy, Medal, Lightbulb } from 'lucide-react';
import PageHero, { HeroButton } from '../components/PageHero';
import { Section, SectionTitle, Tagline, Heading, H5, H6 } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { useAchievementsData } from '../lib/useAchievementsData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';
import CountUp from '../components/CountUp';

const CATEGORIES = [
  'Case Competitions',
  'Scholarships',
  'Publications',
  'Sports',
  'External Recognition',
];

// Figma icons: trophy · school · news · sports · badge.
const SUBMIT_ICONS = {
  case: Trophy,
  scholarship: GraduationCap,
  publication: Newspaper,
  sports: Medal,
  external: BadgeCheck,
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

// Figma photos for the six achievement rows and the five-photo collage.
const ROW_PHOTOS = [1, 2, 3, 4, 5, 6].map((n) => `/images/students/achievement-${n}.webp`);
const COLLAGE_PHOTOS = [1, 2, 3, 4, 5].map((n) => `/images/students/collage-${n}.webp`);

const img = (image, fallback, w) =>
  !image ? fallback : typeof image === 'string' ? image : urlFor(image).width(w).auto('format').url();

// Native <details> so the row expands with keyboard and without JS.
// Figma "Card": 1280 wide, hairline, 192px photo, 32 padding; square #eaeaf1 tag
// (#d8d8d8 hairline), H5 28 black title, 16/150 summary, 32px plus.
function AchievementRow({ a, photo, defaultOpen }) {
  return (
    <details open={defaultOpen} className="rounded-lg overflow-hidden rounded-lg overflow-hidden group flex bg-white outline outline-1 -outline-offset-1 outline-black/20">
      <summary className="flex items-stretch cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <div
          className="w-[110px] md:w-48 shrink-0 min-h-[140px] md:min-h-48 bg-navy-50 bg-cover bg-center group-open:md:min-h-[329px]"
          style={photo ? { backgroundImage: `url('${photo}')` } : undefined}
        />
        <div className="flex-1 min-w-0 flex items-center gap-8 p-5 md:p-8">
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {a.badge && (
              <span className="w-fit px-2.5 py-1 rounded bg-navy-50 outline outline-1 -outline-offset-1 outline-[#d8d8d8] text-sm leading-[150%] uppercase text-navy-900">
                {a.badge}
              </span>
            )}
            <div className="flex flex-col gap-2">
              <H5 as="h3" className="text-black max-md:text-[22px]">
                {a.title}
              </H5>
              <p className="text-base leading-[150%] text-black">{a.summary}</p>
            </div>
            {(a.detail || a.metaRows?.length > 0) && (
              <div className="hidden group-open:flex flex-col gap-4 pt-6">
                {a.detail && <p className="text-base leading-[150%] text-black">{a.detail}</p>}
                {a.metaRows?.length > 0 && (
                  <dl className="m-0 flex flex-wrap items-center gap-2 text-sm leading-[150%] text-black">
                    {a.metaRows.map((m, i) => (
                      <div key={m.label} className="flex items-center gap-2">
                        {i > 0 && <span aria-hidden="true">•</span>}
                        <dt>{m.label}:</dt>
                        <dd className="m-0 text-ink-400">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            )}
          </div>
          <span className="shrink-0 self-start md:self-center transition-transform group-open:rotate-45">
            <Plus size={32} strokeWidth={1.5} />
          </span>
        </div>
      </summary>
    </details>
  );
}

export default function Achievements() {
  const facts = useKeyFacts();
  const { data } = useAchievementsData();
  const ap = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const achievements = fillFactsDeep(data?.achievements?.length ? data.achievements : fallbackAchievements, facts);
  const categories = fillFactsDeep(data?.categories?.length ? data.categories : fallbackCategories, facts);
  const heroButtons = fillFactsDeep(ap.heroButtons?.length ? ap.heroButtons : fallbackPage.heroButtons, facts);
  const submitStats = fillFactsDeep(ap.submitStats?.length ? ap.submitStats : fallbackPage.submitStats, facts);

  const pageSize = ap.pageSize || 6;
  const [category, setCategory] = useState('All');
  const [shown, setShown] = useState(pageSize);

  const filtered = useMemo(
    () => (category === 'All' ? achievements : achievements.filter((a) => a.category === category)),
    [achievements, category],
  );
  const visible = filtered.slice(0, shown);

  const pickCategory = (c) => {
    setCategory(c);
    setShown(pageSize); // reset paging when the filter changes
  };

  const collage = (ap.collage?.length ? ap.collage : COLLAGE_PHOTOS).map((c, i) => img(c, COLLAGE_PHOTOS[i], i === 0 ? 1248 : 592));

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(ap.heroImage, '/images/students/achievements-hero.webp', { stretch: true })}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: "Student's Corner", to: '/students' }, { label: 'Achievements' }]}
        eyebrow={ap.heroEyebrow}
        eyebrowUpper
        title={ap.heroTitle}
        titleItalic={ap.heroTitleItalic}
        description={ap.heroDescription}
        descriptionWidth={628}
        actions={heroButtons.map((b) => ({ label: b.label, href: b.url, primary: b.primary }))}
      />

      {/* Filter + list — centred title; 44px tab chips (navy when active, radius 4);
          1280 rows 32 apart; centred navy "load more". */}
      <Section id="list" width={1280} className="scroll-mt-24">
        <SectionTitle center tagline={ap.filterEyebrow} title={ap.filterTitle} body={ap.filterSubtitle} />
        <div className="mt-20 flex flex-wrap justify-center">
          {['All', ...CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => pickCategory(c)}
              aria-pressed={c === category}
              className={`h-11 px-4 rounded text-base leading-[150%] transition-colors ${
                c === category ? 'bg-navy-900 text-white font-medium outline outline-1 -outline-offset-1 outline-black/20' : 'text-black hover:bg-navy-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        {visible.length > 0 ? (
          <div className="mt-12 flex flex-col gap-8">
            {visible.map((a, i) => (
              <AchievementRow key={a._id || a.title} a={a} photo={img(a.image, ROW_PHOTOS[achievements.indexOf(a) % ROW_PHOTOS.length], 384)} defaultOpen={i === 0} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-base leading-[150%] text-black text-center">No achievements in this category yet.</p>
        )}
        <div className="mt-20 flex justify-center">
          <button
            type="button"
            onClick={() => setShown((s) => s + pageSize)}
            disabled={filtered.length <= shown}
            className="inline-flex items-center gap-3 h-11 px-6 rounded-md bg-navy-900 text-white text-base leading-[150%] font-medium hover:bg-navy-800 disabled:opacity-60 transition-colors"
          >
            {ap.loadMoreLabel} <ArrowUpRight size={24} strokeWidth={1.5} />
          </button>
        </div>
      </Section>

      {/* Submit — navy: 572 copy + stat tiles | 504 list with 48px white icon discs. */}
      <Section id="submit" bg="bg-navy-900" width={1280} className="text-white scroll-mt-24">
        <div className="grid lg:grid-cols-[704px_1fr] gap-12 lg:gap-[72px]">
          <div className="flex flex-col gap-20">
            <div className="flex flex-col gap-8 max-w-[572px]">
              <div className="flex flex-col gap-4">
                <Tagline className="text-white">{ap.submitEyebrow}</Tagline>
                <Heading
                  text={composeTitle(ap.submitTitle, ap.submitTitleHighlight)}
                  highlight={ap.submitTitleHighlight}
                  className="text-white"
                  highlightClass="text-teal-400"
                />
                <p className="text-base md:text-lg leading-[150%]">{ap.submitDescription}</p>
              </div>
              <div>
                <HeroButton label={ap.submitCtaLabel} href={ap.submitCtaUrl || '#'} primary />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {submitStats.map((s) => (
                <div key={s.label} className="flex flex-col gap-4 px-4 py-8">
                  <span className="font-display font-medium text-[36px] md:text-[44px] leading-[120%] tracking-[-0.01em]"><CountUp value={s.value} /></span>
                  <span className="text-sm leading-[150%] uppercase">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <h3 className="font-display font-medium text-[36px] leading-[130%] tracking-[-0.01em]">{ap.submitListTitle}</h3>
            <div className="flex flex-col gap-4">
              {categories.map((c, i, all) => {
                const Icon = SUBMIT_ICONS[c.icon] || Lightbulb;
                return (
                  <div key={c.title} className={`flex gap-10 pb-4 ${i < all.length - 1 ? 'border-b border-white/20' : ''}`}>
                    <span className="w-12 h-12 shrink-0 rounded-full bg-white text-navy-900 flex items-center justify-center">
                      <Icon size={24} strokeWidth={1.5} />
                    </span>
                    <div className="flex flex-col gap-4">
                      <H6 as="p" className="text-white">
                        {c.title}
                      </H6>
                      <p className="text-base leading-[150%]">{c.examples}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* Collage — one 624 square beside four 296 squares, 32 gaps. */}
      <Section width={1280}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          <div className="col-span-2 row-span-2 aspect-square bg-navy-50 bg-cover bg-center" style={{ backgroundImage: `url('${collage[0]}')` }} />
          {collage.slice(1, 5).map((src, i) => (
            <div key={i} className="aspect-square bg-navy-50 bg-cover bg-center" style={{ backgroundImage: `url('${src}')` }} />
          ))}
        </div>
      </Section>
    </div>
  );
}
