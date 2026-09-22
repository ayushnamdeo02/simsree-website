import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { StatGrid } from '../components/StatCard';
import PageHero, { HeroButton } from '../components/PageHero';
import CommitteeCard from '../components/CommitteeCard';
import { Section, SectionTitle, Tagline, Heading, H6, AccentCard } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { useStudentSystemData } from '../lib/useStudentSystemData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';
import { fallbackCommittees } from '../data/committees';

const fallbackPage = {
  heroEyebrow: 'How SIMSREE really works',
  heroTitle: 'Run by students.',
  heroTitleLine2: 'Built for leaders.',
  heroDescription:
    'Thirteen student-run committees handle placements, flagship events, and industry relations. Not as extracurriculars — as the operational core of the institute.',
  heroPrimaryCtaLabel: 'See all 13 committees',
  heroPrimaryCtaUrl: '#directory',
  heroSecondaryCtaLabel: 'Meet student leaders',
  heroSecondaryCtaUrl: '/students/leadership',

  stats: [
    { label: 'Active Committees', value: '13', dark: true },
    { label: 'Years Student-Led', value: '40+', dark: false },
    { label: 'Student-Organised Events', value: '100%', dark: true },
    { label: 'Where It Began', value: '1983', dark: false },
  ],

  philosophyEyebrow: 'The SIMSREE Philosophy',
  philosophyQuote: "Tell me and I'll forget. Show me and I may remember. Involve me and I'll understand.",
  philosophyAttribution: 'Chinese Proverb',
  philosophyMeta: 'The guiding philosophy at SIMSREE since {{foundedYear}}',

  systemEyebrow: 'The System',
  systemTitle: 'Not a student body. An engine.',
  systemTitleHighlight: 'An engine.',
  systemBody:
    'SIMSREE runs largely on student initiative. Committees are not clubs — they are the operational core of the institute.\n\nStudents negotiate with corporates, manage real budgets, coordinate large-scale events, and drive the entire placement process. By the time SIMSREE students graduate, they have not just studied management. They have practised it — for two full years, at scale, with real consequences.\n\nThis is what makes the SIMSREE graduate different. Other MBA programmes teach about leadership. SIMSREE assigns it.',
  systemPrimaryCtaLabel: 'See all committees',
  systemPrimaryCtaUrl: '#directory',
  systemSecondaryCtaLabel: 'How to get involved',
  systemSecondaryCtaUrl: '/students',

  trackEyebrow: 'From Student to Leader',
  trackTitle: 'Your two-year leadership track.',
  trackTitleHighlight: 'two-year',
  trackBody:
    'Every student at SIMSREE follows the same arc — arriving as a learner, leaving as a proven leader with 24 months of hands-on management experience.',
  trackSteps: [
    { title: 'Induction', description: 'Orientation & committee selection process.' },
    { title: 'Join a Committee', description: 'Apply for committee roles via internal selection.' },
    { title: 'Lead Projects', description: 'Run real events, deals, and campaigns.' },
    { title: 'Take Chairpersonship', description: 'Year 2 · senior students lead committees.' },
    { title: 'Join Council', description: 'Cross-committee strategy & coordination.' },
    { title: 'Graduate Ready', description: 'Real management CV, not just a degree.' },
  ],
  trackCalloutTitle: 'What makes this rare',
  trackCalloutBody:
    'Most management institutes teach about leadership. SIMSREE assigns it. The difference is everything.',

  directoryEyebrow: 'The Committee Directory',
  directoryTitle: 'active committees',
  directorySubtitle:
    'Each one runs a real domain with real accountability. Click any to open its dedicated page.',

  spotlightEyebrow: 'Spotlight',
  spotlightTitle: 'What committees actually do.',
  spotlightTitleHighlight: 'actually do.',
  spotlightSubtitle: 'Three signature committees · three real stakes.',
  spotlightCards: [
    {
      label: 'Spotlight 01',
      title: 'Placement Committee',
      description:
        'The Placement Committee does not just schedule interviews. It manages the entire student-to-recruiter pipeline — JD curation, company relations, offer tracking, salary data. Students who run this committee graduate with negotiation, project management, and stakeholder management skills that most MBAs only learn in their first job.',
      linkLabel: 'Meet the Placement Committee',
      linkUrl: '/placements',
    },
    {
      label: 'Spotlight 02',
      title: 'Entrepreneurship Cell',
      description:
        'Ideas are cheap. Execution is the curriculum. The E-Cell runs pitch competitions, startup bootcamps, and connects student founders with industry mentors. It is the reason SIMSREE has been called an institute that does not just teach entrepreneurship — it creates entrepreneurs.',
      linkLabel: 'See E-Cell activities',
      linkUrl: '/events',
    },
    {
      label: 'Spotlight 03',
      title: 'SSR Committee',
      description:
        'Social managers understand more than markets. SIMSREE SSR Committee runs Mrudgandha and other community initiatives, ensuring that every student develops a social conscience alongside a professional one.',
      linkLabel: 'See SSR initiatives',
      linkUrl: '/students',
    },
  ],

  impactEyebrow: 'Impact Numbers',
  impactTitle: 'What student leadership looks like at scale.',
  impactTitleHighlight: 'at scale.',
  impactSubtitle: 'The numbers that matter.',
  impactStats: [
    { value: '13', label: 'Committees', description: 'Covering every domain from placements to social responsibility.' },
    { value: '100+', label: 'Events per year', description: 'Planned, executed, and delivered entirely by students.' },
    { value: '24', label: 'Months', description: 'Of real hands-on leadership before graduation.' },
    { value: '0', label: 'Management quota', description: 'Leadership is earned. Merit only, always.' },
  ],

  ctaEyebrow: 'Ready to lead, not just learn?',
  ctaTitle: 'Apply to MMS 2026–28.',
  ctaTitleHighlight: 'MMS 2026–28.',
  ctaSubtitle:
    'Committee selection happens during induction week. Your first responsibility starts sooner than you think — that is the point.',
  ctaPrimaryLabel: 'Start your application',
  ctaPrimaryUrl: '/admissions/mms',
  ctaSecondaryLabel: 'Talk to a current student',
  ctaSecondaryUrl: '/contact',
  ctaTertiaryLabel: 'Download the brochure (PDF)',
  ctaTertiaryUrl: '/brochure',
};


const CATEGORIES = ['All', 'Academic', 'Corporate', 'Cultural', 'Social', 'Leadership'];

function imgUrl(image, width) {
  if (!image) return undefined;
  try {
    return urlFor(image).width(width).auto('format').url();
  } catch {
    return undefined;
  }
}

// Figma photos for "Not a student body" (2x2 grid) and the leadership track.
const ENGINE_FALLBACK = [1, 2, 3, 4].map((n) => `/images/student-system/engine-${n}.webp`);

const outlineBtn =
  'inline-flex items-center gap-2 h-11 px-6 rounded-md bg-white outline outline-1 -outline-offset-1 outline-black/20 text-base leading-[150%] font-medium text-black hover:bg-navy-50 transition-colors';
const navyBtn =
  'inline-flex items-center gap-3 h-11 px-6 rounded-md bg-navy-900 text-white text-base leading-[150%] font-medium hover:bg-navy-800 transition-colors';

export default function StudentSystem() {
  const facts = useKeyFacts();
  const { data } = useStudentSystemData();

  const sp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const committees = fillFactsDeep(data?.committees?.length ? data.committees : fallbackCommittees, facts);

  const [category, setCategory] = useState('All');
  const visible = category === 'All' ? committees : committees.filter((c) => c.category === category);

  const trackImageUrl = imgUrl(sp.trackImage, 1232) || '/images/student-system/track.webp';
  const engineImages = (sp.systemImages?.length ? sp.systemImages.map((im) => imgUrl(im, 600)) : ENGINE_FALLBACK).slice(0, 4);
  const [systemLead, ...systemRest] = (sp.systemBody || '').split('\n\n');

  return (
    <div>
      <PageHero
        image={heroImage(sp.heroImage, '/images/student-system/hero.webp')}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About Us', to: '/about' }, { label: 'Student-Driven' }]}
        eyebrow={sp.heroEyebrow}
        title={[sp.heroTitle, sp.heroTitleLine2].filter(Boolean).join('\n')}
        titleWidth={900}
        description={sp.heroDescription}
        descriptionWidth={628}
        actions={[
          { label: sp.heroPrimaryCtaLabel, href: sp.heroPrimaryCtaUrl, primary: true },
          { label: sp.heroSecondaryCtaLabel, to: sp.heroSecondaryCtaUrl },
        ]}
      />

      <section className="px-5 py-16 md:p-16">
        <StatGrid stats={sp.stats} />
      </section>

      {/* Philosophy — navy, centred 768: H2 52 quote, 96px portrait, H6 name, 16 meta. */}
      <Section bg="bg-navy-900" width={768} className="text-center text-white">
        <Tagline className="text-white">{sp.philosophyEyebrow}</Tagline>
        <blockquote className="mt-4 font-display font-medium text-[36px] leading-[130%] md:text-[52px] md:leading-[120%] tracking-[-0.01em]">
          &ldquo;{sp.philosophyQuote}&rdquo;
        </blockquote>
        <div className="mt-4 flex flex-col items-center gap-4">
          <div
            className="w-24 h-24 rounded-full bg-white/20 bg-cover bg-center"
            style={{ backgroundImage: `url('${imgUrl(sp.philosophyPhoto, 192) || '/images/alumni/voice-1.webp'}')` }}
          />
          <div className="max-w-[300px]">
            <H6 as="p" className="text-white">
              — {sp.philosophyAttribution}
            </H6>
            <p className="text-base leading-[150%]">{sp.philosophyMeta}</p>
          </div>
        </div>
      </Section>

      {/* The System — 616 copy column (padded 32) beside a 2x2 grid of 300x317
          photos (radius 16, 16 gaps), 80 apart. */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="p-2 md:p-8 flex flex-col gap-8">
            <Tagline>{sp.systemEyebrow}</Tagline>
            <div className="flex flex-col gap-6">
              <Heading text={composeTitle(sp.systemTitle, sp.systemTitleHighlight)} highlight={sp.systemTitleHighlight} />
              <p className="font-display font-medium text-[22px] leading-[140%] tracking-[-0.01em] text-black">{systemLead}</p>
              <div className="text-base md:text-lg leading-[150%] text-black whitespace-pre-line">{systemRest.join('\n')}</div>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-8">
              <a href={sp.systemPrimaryCtaUrl} className={navyBtn}>
                {sp.systemPrimaryCtaLabel} <ArrowUpRight size={24} strokeWidth={1.5} />
              </a>
              <Link to={sp.systemSecondaryCtaUrl} className={outlineBtn}>
                {sp.systemSecondaryCtaLabel}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {engineImages.map((src, i) => (
              <div
                key={i}
                className="h-[200px] md:h-[317px] rounded-2xl bg-navy-50 bg-cover bg-center"
                style={src ? { backgroundImage: `url('${src}')` } : undefined}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Leadership track — #eaeaf1: title + 616x362 photo beside a numbered timeline
          (48px navy circles, 2px black/20 connectors, H6 22 steps); callout below. */}
      <Section bg="bg-navy-50">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col gap-[52px]">
            <SectionTitle
              tagline={sp.trackEyebrow}
              title={composeTitle(sp.trackTitle, sp.trackTitleHighlight)}
              highlight={sp.trackTitleHighlight}
              body={sp.trackBody}
              width={616}
            />
            <div
              className="h-[220px] md:h-[362px] bg-navy-100 bg-cover bg-center"
              style={{ backgroundImage: `url('${trackImageUrl}')` }}
            />
          </div>
          <ol className="flex flex-col gap-1">
            {(sp.trackSteps || []).map((step, i, all) => (
              <li key={step.title} className="flex gap-10">
                <div className="flex flex-col items-center gap-4 shrink-0">
                  <span className="w-12 h-12 rounded-full bg-navy-900 text-white flex items-center justify-center text-lg leading-[150%]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {i < all.length - 1 && <span className="w-0.5 h-14 bg-black/20" aria-hidden="true" />}
                </div>
                <div className="flex flex-col gap-2 pt-0">
                  <H6 as="h3">{step.title}</H6>
                  <p className="text-base leading-[150%] text-black">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-20">
          <AccentCard className="[&>div]:py-4">
            <div className="flex flex-col gap-2 py-4">
              <H6 as="h3">{sp.trackCalloutTitle}</H6>
              <p className="text-base leading-[150%] text-black">{sp.trackCalloutBody}</p>
            </div>
          </AccentCard>
        </div>
      </Section>

      {/* Directory — centred teal title, 45px filters, 4-up 284 cards (48 gaps). */}
      <Section id="directory" width={1280} className="border-t border-white/20">
        <SectionTitle
          center
          tagline={sp.directoryEyebrow}
          title={`${committees.length} ${sp.directoryTitle}`}
          titleClass="text-teal-500"
          body={sp.directorySubtitle}
        />
        <div className="mt-20 flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <span className="text-base leading-[150%] font-semibold text-[#292929]">Filter by:</span>
          <div className="flex flex-wrap items-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`h-[45px] px-3 text-sm leading-[150%] outline outline-1 -outline-offset-1 outline-black/20 transition-colors ${
                  category === cat ? 'bg-navy-900 text-hero' : 'bg-white text-black hover:bg-navy-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {/* Mobile: one sideways-scrolling row of 284 cards (Figma); desktop: 4-up grid. */}
        <div className="mt-20 -mx-5 px-5 lg:mx-0 lg:px-0 flex lg:grid lg:grid-cols-4 gap-12 overflow-x-auto lg:overflow-visible snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {visible.map((c) => (
            <CommitteeCard
              key={c._id || c.slug?.current || c.name}
              committee={c}
              className="w-[284px] shrink-0 snap-start lg:w-auto"
            />
          ))}
        </div>
      </Section>

      {/* Spotlight — #24295c, three 405x348 navy cards. */}
      <Section bg="bg-navy-800" width={1280} className="border-t border-white/20">
        <SectionTitle
          center
          dark
          tagline={sp.spotlightEyebrow}
          title={composeTitle(sp.spotlightTitle, sp.spotlightTitleHighlight)}
          highlight={sp.spotlightTitleHighlight}
          body={sp.spotlightSubtitle}
          titleClass="text-white [&_span]:text-teal-400"
        />
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {(sp.spotlightCards || []).map((c) => (
            <div
              key={c.title}
              className="flex flex-col justify-center gap-4 min-h-[348px] p-8 rounded-2xl bg-navy-900 text-white outline outline-1 -outline-offset-1 outline-white/20 shadow-small"
            >
              <span className="text-sm leading-[150%] text-teal-100">{c.label}</span>
              <div className="flex flex-col gap-2">
                <H6 as="h3" className="text-white">
                  {c.title}
                </H6>
                <p className="text-sm leading-[150%] text-ink-50">{c.description}</p>
              </div>
              <Link to={c.linkUrl} className="flex items-center gap-2 w-fit text-sm leading-[150%] hover:underline underline-offset-2">
                {c.linkLabel} <ArrowRight size={24} strokeWidth={1.5} />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Impact numbers — centred title (teal), four 296 columns split by hairlines:
          H2 52 value + 18/150 uppercase label on one line, 14/150 note under it. */}
      <Section width={1280}>
        <SectionTitle
          center
          tagline={sp.impactEyebrow}
          title={composeTitle(sp.impactTitle, sp.impactTitleHighlight)}
          highlight={sp.impactTitleHighlight}
          body={sp.impactSubtitle}
        />
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:flex gap-8 lg:gap-4">
          {(sp.impactStats || []).map((s, i) => (
            <div key={s.label} className="flex lg:flex-1 gap-4">
              {i > 0 && <span className="hidden lg:block w-px self-stretch bg-black/20" aria-hidden="true" />}
              <div className="flex-1 flex flex-col items-center gap-6 text-center">
                <div className="flex items-end justify-center gap-3">
                  <span className="font-display font-medium text-[52px] leading-[120%] tracking-[-0.01em] text-navy-900">{s.value}</span>
                  <span className="pb-2 text-lg leading-[150%] uppercase text-black">{s.label}</span>
                </div>
                <p className="max-w-[236px] text-sm leading-[150%] text-black">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Apply — navy "CTA / 57 /": 64 padding, left 613 column, Eastern Blue tagline. */}
      <section className="bg-navy-900 text-white px-5 py-16 md:p-16 border-t border-white/20">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-[613px]">
            <Tagline className="text-teal-400">{sp.ctaEyebrow}</Tagline>
            <Heading
              text={composeTitle(sp.ctaTitle, sp.ctaTitleHighlight)}
              highlight={sp.ctaTitleHighlight}
              className="text-white mt-4"
              highlightClass="text-teal-400"
            />
            <p className="mt-6 max-w-[504px] text-base md:text-lg leading-[150%]">{sp.ctaSubtitle}</p>
          </div>
          <div className="mt-8 flex flex-col md:flex-row gap-3.5">
            <HeroButton label={sp.ctaPrimaryLabel} to={sp.ctaPrimaryUrl} primary icon={false} />
            <HeroButton label={sp.ctaSecondaryLabel} to={sp.ctaSecondaryUrl} />
            <HeroButton label={sp.ctaTertiaryLabel} href={sp.ctaTertiaryUrl} />
          </div>
        </div>
      </section>
    </div>
  );
}
