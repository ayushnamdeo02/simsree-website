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
import { committeeHref } from '../lib/committeeHref';
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
    'Each committee runs a real domain with real accountability - the full student-leadership directory.',
  heroButtons: [
    { label: 'Email to Chairperson', url: 'mailto:placements@simsree.org', primary: true },
    { label: 'Email to General Secretary', url: 'mailto:placements@simsree.org', primary: false },
  ],
  stats: [
    { label: 'GS portfolios', value: '4', dark: true },
    { label: 'Chairs', value: '{{committeeCount}}', dark: false },
    { label: 'Year of leadership', value: '2', dark: true },
    { label: 'Elected', value: '100%', dark: false },
  ],
  orgEyebrow: 'SMA Hierarchy',
  orgTitle: 'Student Body Structure',
  orgSubtitle: 'Explore the structure of the Sydenham Management Association (SMA) and the 13 committees that drive it forward.',
  orgTopTitle: 'Director',
  orgTopSubtitle: 'General Secretary',
  orgLeft: 'Placement Committee',
  orgRight: 'Sydenham Management Association',
  orgMiddle: 'Chairperson',
  calloutTitle: 'Student Body Structure - what is this page?',
  calloutBody:
    'This page is the organisational chart for all 13 student-run committees at SIMSREE - showing how committees report into the General Secretary structure, with each committee’s chairperson, members, and mandate. Use this to understand how the student body is organised. For a directory-style grid of each committee’s landing page, see All Committees.',
  filterEyebrow: 'Filter',
  filterTitle: 'Pick a category',
  filterSubtitle: 'Filter by type - academic, corporate, cultural, social, leadership.',
  cardCtaLabel: 'See what they run',
  ladderEyebrow: 'From Student to Leader',
  ladderTitle: 'Your two-year leadership track.',
  ladderTitleHighlight: 'two-year',
  ladderSubtitle:
    'Every SIMSREE student follows the same arc - arriving as a learner, leaving as a proven leader with 24 months of hands-on management experience.',
  ladderSteps: [
    { title: 'Induction', description: 'Orientation & committee selection process.' },
    { title: 'Join a Committee', description: 'Apply for committee roles via internal selection.' },
    { title: 'Lead Projects', description: 'Run real events, deals, and campaigns.' },
    { title: 'Take Chairpership', description: 'Year 2 · senior students lead committees.' },
    { title: 'Join Council', description: 'Cross-committee strategy & coordination.' },
    { title: 'Graduate Ready', description: 'Real management CV, not just a degree.' },
  ],
  ladderNoteTitle: 'What makes this rare',
  ladderNoteBody: 'Most management institutes teach about leadership. SIMSREE assigns it. The difference is everything.',
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

// Org chart boxes: navy (top), white (second tier), Eastern Blue (middle).
const ORG_BOX = {
  navy: 'bg-navy-900 text-white',
  white: 'bg-white text-navy-900 outline outline-1 -outline-offset-1 outline-black/10',
  blue: 'bg-teal-500 text-white',
};
function OrgBox({ title, subtitle, tone = 'white', className = '' }) {
  return (
    <div className={`rounded-xl px-6 py-4 md:px-8 md:py-5 text-center shadow-small ${ORG_BOX[tone]} ${className}`}>
      <p className="font-display font-medium text-[24px] md:text-[34px] leading-[120%] tracking-[-0.01em]">{title}</p>
      {subtitle && <p className="mt-1 text-xs md:text-sm leading-[150%] opacity-80">{subtitle}</p>}
    </div>
  );
}
const VLine = () => <span className="block mx-auto w-px h-8 md:h-10 bg-black/20" aria-hidden="true" />;

// SMA hierarchy: Director, then Placement Committee | Sydenham Management
// Association, then Chairperson, then the committee pills (each links to its page).
function OrgChart({ bp, committees }) {
  const pills = committees.filter((c) => !['placement', 'chairpersons-council'].includes(slugOf(c)));
  return (
    <div className="flex flex-col items-center">
      <OrgBox tone="navy" title={bp.orgTopTitle} subtitle={bp.orgTopSubtitle} />
      <VLine />
      {/* Branch: a rule across both columns with a drop to each box (desktop). */}
      <div className="w-full max-w-[1100px] grid md:grid-cols-2 gap-6 md:gap-10 relative">
        <span className="hidden md:block absolute top-0 left-1/4 right-1/4 h-px bg-black/20" aria-hidden="true" />
        <div className="flex flex-col items-center">
          <span className="hidden md:block w-px h-10 bg-black/20" aria-hidden="true" />
          <OrgBox title={bp.orgLeft} className="w-full md:max-w-[400px]" />
        </div>
        <div className="flex flex-col items-center">
          <span className="hidden md:block w-px h-10 bg-black/20" aria-hidden="true" />
          <OrgBox title={bp.orgRight} className="w-full md:max-w-[520px]" />
        </div>
      </div>
      {/* From the Association down to the Chairperson. */}
      <div className="w-full max-w-[1100px] relative h-8 md:h-16">
        <span className="hidden md:block absolute left-3/4 top-0 h-8 w-px bg-black/20" aria-hidden="true" />
        <span className="hidden md:block absolute left-1/2 right-1/4 top-8 h-px bg-black/20" aria-hidden="true" />
        <span className="absolute left-1/2 top-0 md:top-8 h-8 w-px bg-black/20" aria-hidden="true" />
      </div>
      <OrgBox tone="blue" title={bp.orgMiddle} className="w-full max-w-[380px]" />
      <VLine />
      <ul className="m-0 p-0 list-none max-w-[1000px] flex flex-wrap justify-center gap-3 md:gap-4">
        {pills.map((c) => (
          <li key={slugOf(c) || c.name}>
            <Link
              to={committeeHref(slugOf(c))}
              className="block rounded-xl bg-white px-5 py-3 md:px-6 md:py-4 font-display font-medium text-base md:text-lg leading-[140%] text-navy-900 outline outline-1 -outline-offset-1 outline-black/10 shadow-small hover:bg-navy-50 transition-colors"
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Figma card: 284x456 hairline box, 284 square photo, 16-padded copy: category tag
// (radius 16), H6 22 black name, "See what they run ↗".
function CommitteeTile({ c, ctaLabel }) {
  const slug = slugOf(c);
  const photo = c.image ? urlFor(c.image).width(568).height(568).fit('crop').auto('format').url() : slug && `/images/committees/body-${slug}.webp`;
  const href = committeeHref(slug) || c.linkUrl;
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
        eyebrow={`${committees.length} ${bp.heroEyebrow}`}
        eyebrowUpper
        title={heroTitle}
        description={bp.heroDescription}
        descriptionWidth={628}
        actions={heroButtons.map((b) => ({ label: b.label, href: b.url, primary: b.primary }))}
      />

      <section className="px-5 py-12 md:px-16 md:py-20">
        <StatGrid stats={bp.stats} />
      </section>

      {/* SMA hierarchy + info banner — #eaeaf1 band: centred title, org chart, then a
          white hairline box with a 3px Eastern Blue bar, chat icon + H6 title. */}
      {(bp.orgTitle || bp.calloutTitle) && (
        <section className="bg-navy-50 px-5 py-12 md:px-16 md:py-20">
          <div className="max-w-[1280px] mx-auto flex flex-col gap-12 md:gap-16">
            {bp.orgTitle && (
              <div className="flex flex-col gap-10 md:gap-14">
                <SectionTitle center tagline={bp.orgEyebrow} title={bp.orgTitle} body={bp.orgSubtitle} />
                <OrgChart bp={bp} committees={committees} />
              </div>
            )}
            {bp.calloutTitle && (
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
            )}
          </div>
        </section>
      )}

      {/* Directory — left title, radius-4 tabs, 4-up 284 cards (48 gaps). */}
      <Section width={1280}>
        <SectionTitle tagline={bp.filterEyebrow} title={bp.filterTitle} body={bp.filterSubtitle} />
        <div className="mt-10 md:mt-12 flex flex-wrap">
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

      {/* Leadership track — on #eaeaf1: title + photo | numbered navy discs joined by
          hairlines (title, short copy; optional stage / cohort lines), then a note. */}
      <Section id="ladder" bg="bg-navy-50" width={1280} className="scroll-mt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="flex flex-col gap-10">
            <SectionTitle
              tagline={bp.ladderEyebrow}
              title={composeTitle(bp.ladderTitle, bp.ladderTitleHighlight)}
              highlight={bp.ladderTitleHighlight}
              body={bp.ladderSubtitle}
              width={600}
            />
            <div className="h-[260px] lg:h-[360px] bg-navy-100 bg-cover bg-center" style={{ backgroundImage: `url('${ladderImageUrl}')` }} />
          </div>
          <ol className="list-none m-0 p-0 flex flex-col">
            {ladderSteps.map((s, i) => (
              <li key={s.title} className="flex gap-6 md:gap-8">
                <div className="flex flex-col items-center shrink-0">
                  <span className="w-11 h-11 rounded-full bg-navy-900 flex items-center justify-center text-sm leading-[150%] text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {i < ladderSteps.length - 1 && <span className="flex-1 w-px min-h-10 bg-black/20" aria-hidden="true" />}
                </div>
                <div className={`flex-1 min-w-0 flex flex-col gap-3 text-black pt-1.5 ${i < ladderSteps.length - 1 ? 'pb-8' : ''}`}>
                  {s.stage && <span className="text-base leading-[150%] uppercase">{s.stage}</span>}
                  <div className="flex flex-col gap-2">
                    <H6 as="h3" className="text-navy-900">
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
        {bp.ladderNoteTitle && (
          <AccentCard className="mt-12 md:mt-16 [&>div]:py-6">
            <H6 as="p" className="text-navy-900">
              {bp.ladderNoteTitle}
            </H6>
            {bp.ladderNoteBody && <p className="mt-2 text-sm md:text-base leading-[150%] text-black">{bp.ladderNoteBody}</p>}
          </AccentCard>
        )}
      </Section>
    </div>
  );
}
