import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { StatGrid } from '../components/StatCard';
import PageHero from '../components/PageHero';
import { Section, SectionTitle, H6, AccentCard } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { useBodyStructureData } from '../lib/useBodyStructureData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';
import { fallbackCommittees } from '../data/committees';

const CATEGORIES = ['Academic', 'Corporate', 'Cultural', 'Social', 'Leadership'];

// Figma tag colours per category.
const CATEGORY_STYLES = {
  Academic: 'bg-[#1fc16b]/10 text-[#1fc16b]',
  Corporate: 'bg-navy-50 text-navy-900',
  Cultural: 'bg-sky-50 text-teal-500',
  Social: 'bg-sky-50 text-teal-500',
  Leadership: 'bg-sky-50 text-teal-500',
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

// Figma card order and photos for the committee grid.
const FIGMA_ORDER = [
  'placement', 'chairpersons-council', 'alumni', 'corporate-relations', 'course-coordinators',
  'entrepreneurship-cell', 'events', 'finance-forum', 'infra-tech', 'marketing-media',
  'hrudaya-ops', 'research-consulting', 'ssr',
];
const slugOf = (c) => c.slug?.current || c.slug;
const figmaRank = (c) => {
  const i = FIGMA_ORDER.indexOf(slugOf(c));
  return i === -1 ? FIGMA_ORDER.length : i;
};

// Figma card: 284x456 hairline box, 284 square photo, 16-padded copy: category tag
// (radius 16), H6 22 black name, "See what they run ↗".
function CommitteeTile({ c, ctaLabel }) {
  const slug = slugOf(c);
  const photo = c.image ? urlFor(c.image).width(568).height(568).fit('crop').auto('format').url() : slug && `/images/committees/body-${slug}.webp`;
  const href = slug ? `/students/committees/${slug}` : c.linkUrl;
  const inner = (
    <>
      <div className="aspect-square bg-navy-50 bg-cover bg-center" style={photo ? { backgroundImage: `url('${photo}')` } : undefined} />
      <div className="flex-1 flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-2">
          {c.category && (
            <span className={`w-fit px-2.5 py-1 rounded-2xl text-sm leading-[150%] uppercase ${CATEGORY_STYLES[c.category] || CATEGORY_STYLES.Corporate}`}>
              {c.category}
            </span>
          )}
          <H6 as="h3" className="text-black">
            {c.name}
          </H6>
        </div>
        {href && (
          <span className="flex items-center gap-2 w-fit text-base leading-[150%] text-black group-hover:underline underline-offset-2">
            {ctaLabel} <ArrowUpRight size={24} strokeWidth={1.5} />
          </span>
        )}
      </div>
    </>
  );
  const cls = 'rounded-xl overflow-hidden rounded-xl overflow-hidden group flex flex-col bg-white outline outline-1 -outline-offset-1 outline-black/20';
  return href ? (
    <Link to={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export default function BodyStructure() {
  const facts = useKeyFacts();
  const { data } = useBodyStructureData();
  const bp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const committees = fillFactsDeep(data?.committees?.length ? data.committees : fallbackCommittees, facts)
    .slice()
    .sort((a, b) => figmaRank(a) - figmaRank(b));
  const heroButtons = fillFactsDeep(bp.heroButtons?.length ? bp.heroButtons : fallbackPage.heroButtons, facts);
  const ladderSteps = fillFactsDeep(bp.ladderSteps?.length ? bp.ladderSteps : fallbackPage.ladderSteps, facts);

  const [category, setCategory] = useState('All');
  const ladderImageUrl = bp.ladderImage ? urlFor(bp.ladderImage).width(1200).auto('format').url() : '/images/student-system/track.webp';

  const chips = [
    { label: 'All', display: `All ${committees.length}` },
    ...CATEGORIES.map((c) => ({ label: c, display: c })),
  ];
  const visible = useMemo(
    () => (category === 'All' ? committees : committees.filter((c) => c.category === category)),
    [committees, category],
  );

  const title = bp.heroTitle || '';
  const brk = bp.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;
  const heroTitle = bIdx === -1 ? title : `${title.slice(0, bIdx + brk.length)}\n${title.slice(bIdx + brk.length).trim()}`;

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(bp.heroImage, '/images/students/body-hero.webp', { stretch: true })}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: "Student's Corner", to: '/students' }, { label: 'Student Body Structure' }]}
        eyebrow={`${committees.length} ${bp.heroEyebrow}`}
        eyebrowUpper
        title={heroTitle}
        description={bp.heroDescription}
        descriptionWidth={628}
        actions={heroButtons.map((b) => ({ label: b.label, href: b.url, primary: b.primary }))}
      />

      <section className="px-5 py-16 md:p-16">
        <StatGrid stats={bp.stats} />
      </section>

      {/* Info banner — #eaeaf1 band, 64 padding; white hairline box with a 3px
          Eastern Blue bar, chat icon + H6 title, 14/150 body. */}
      {bp.calloutTitle && (
        <section className="bg-navy-50 px-5 py-10 md:p-16">
          <div className="max-w-[1280px] mx-auto">
            <AccentCard className="[&>div]:py-6 [&>div]:pl-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <MessageSquare size={32} strokeWidth={1.5} className="shrink-0 text-black" />
                  <H6 as="p" className="text-black">
                    {bp.calloutTitle}
                  </H6>
                </div>
                <p className="text-sm leading-[150%] text-black">{bp.calloutBody}</p>
              </div>
            </AccentCard>
          </div>
        </section>
      )}

      {/* Directory — left title, radius-4 tabs, 4-up 284 cards (48 gaps). */}
      <Section width={1280}>
        <SectionTitle tagline={bp.filterEyebrow} title={bp.filterTitle} body={bp.filterSubtitle} />
        <div className="mt-16 flex flex-wrap">
          {chips.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => setCategory(c.label)}
              aria-pressed={c.label === category}
              className={`h-11 px-4 rounded text-base leading-[150%] transition-colors ${
                c.label === category ? 'bg-navy-900 text-white font-medium outline outline-1 -outline-offset-1 outline-black/20' : 'text-black hover:bg-navy-50'
              }`}
            >
              {c.display}
            </button>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {visible.map((c) => (
            <CommitteeTile key={c._id || c.name} c={c} ctaLabel={bp.cardCtaLabel} />
          ))}
        </div>
      </Section>

      {/* Leadership ladder — 600 title + 600 photo | steps with 48px outlined circles
          and 2px connectors: stage, H6 title, copy, hairline, 14/150 cohort. */}
      <Section id="ladder" width={1280} className="scroll-mt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col gap-[52px]">
            <SectionTitle
              tagline={bp.ladderEyebrow}
              title={composeTitle(bp.ladderTitle, bp.ladderTitleHighlight)}
              highlight={bp.ladderTitleHighlight}
              body={bp.ladderSubtitle}
              width={600}
            />
            <div className="h-[300px] lg:h-[600px] bg-navy-50 bg-cover bg-center" style={{ backgroundImage: `url('${ladderImageUrl}')` }} />
          </div>
          <ol className="list-none m-0 p-0 flex flex-col gap-8">
            {ladderSteps.map((s, i) => (
              <li key={s.title} className="flex gap-6 md:gap-10">
                <div className="flex flex-col items-center gap-4 shrink-0">
                  <span className="w-12 h-12 rounded-full bg-white outline outline-1 -outline-offset-1 outline-navy-900 flex items-center justify-center text-lg leading-[150%] text-navy-900">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {i < ladderSteps.length - 1 && <span className="flex-1 w-0.5 min-h-14 bg-black/20" aria-hidden="true" />}
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-4 text-black">
                  {s.stage && <span className="text-base leading-[150%] uppercase">{s.stage}</span>}
                  <div className="flex flex-col gap-2">
                    <H6 as="h3" className="text-black">
                      {s.title}
                    </H6>
                    {s.description && <p className="text-base leading-[150%]">{s.description}</p>}
                  </div>
                  {s.cohort && <p className="pt-2 border-t border-black/20 text-sm leading-[150%]">{s.cohort}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </div>
  );
}
