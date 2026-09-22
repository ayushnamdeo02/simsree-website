import {
  Briefcase,
  ChevronRight,
  GraduationCap,
  Handshake,
  IdCard,
  Newspaper,
} from 'lucide-react';
import { StatGrid } from '../components/StatCard';
import PageHero, { HeroButton } from '../components/PageHero';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { Section, SectionTitle, H5, H6 } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { useStudentsData } from '../lib/useStudentsData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const PATH_ICONS = {
  prospective: IdCard,
  recruiter: Briefcase,
  student: GraduationCap,
  press: Newspaper,
  partner: Handshake,
};

const fallbackPage = {
  heroEyebrow: 'The Student-Driven Institute',
  heroTitle: "Students don't just attend. They run it.",
  heroTitleItalic: 'attend.',
  heroTitleBreakAfter: 'attend.',
  heroDescription:
    'Everything you see at SIMSREE — Simerations, Mrudgandha, the Placement Cell — is conceived, funded and delivered by students. Welcome to where leadership is practised, not taught.',
  heroButtons: [
    { label: "See who's in the batch", url: '/students/batch-profile', primary: true },
    { label: 'See all {{committeeCount}} committees', url: '/students/body-structure', primary: false },
    { label: 'How it Works', url: '/about/student-driven-system', primary: false },
  ],
  stats: [
    { label: 'Committees', value: '{{committeeCount}}', dark: true },
    { label: 'MMS Batch', value: '120', dark: false },
    { label: 'Student-run', value: '100%', dark: true },
    { label: 'Years', value: '40+', dark: false },
  ],
  pathsEyebrow: "I'm here as...",
  pathsTitle: 'Pick a path',
  pathsSubtitle: 'Pick your role · we surface the page built for you.',
  exploreEyebrow: 'Explore',
  exploreTitle: 'places to start',
  exploreSubtitle: 'Every card opens a full page — dive into what matters to you.',
  voicesEyebrow: 'Voices',
  voicesTitle: '"It wasn’t extracurricular. It was the curriculum."',
  voicesTitleHighlight: 'curriculum',
  voicesSubtitle:
    'Three current students share what running a SIMSREE committee actually taught them.',
  ctaTitle: 'Apply to SIMSREE.',
  ctaSubtitle:
    'MMS 2026-28 admissions are open — via Maharashtra CET, {{noQuotaShort}}.',
  ctaButtons: [
    { label: 'Start your MMS application', url: '/admissions/mms', primary: true },
    { label: 'Talk to a Student', url: '/contact', primary: false },
    { label: 'See the batch profile', url: '/students/batch-profile', primary: false },
  ],
};

const fallbackPaths = [
  {
    title: 'Prospective Student',
    description: 'See campus life, real wins, and how to join a committee.',
    icon: 'prospective',
    url: '/students/life',
    order: 1,
  },
  {
    title: 'Recruiter',
    description: 'Pull the Batch Profile — diversity, work-ex, specialisations.',
    icon: 'recruiter',
    url: '/students/batch-profile',
    order: 2,
  },
  {
    title: 'Current Student / Alumnus',
    description: 'Reach GS, Chairs, committee contacts and mentorship.',
    icon: 'student',
    url: '/students/leadership',
    order: 3,
  },
  {
    title: 'Press / Media',
    description: 'Get the press kit, achievements and official statements.',
    icon: 'press',
    url: '/contact',
    order: 4,
  },
  {
    title: 'Partner',
    description: 'Sponsor an event, run a guest lecture, back a live project.',
    icon: 'partner',
    url: '/placements/recruiter-engagement',
    order: 5,
  },
];

const fallbackCards = [
  {
    title: 'Student Achievements',
    description: 'Filter wins by type — competitions, scholarships, publications, sports.',
    badge: 'Enhanced',
    ctaLabel: 'Open',
    url: '/students/achievements',
    order: 1,
  },
  {
    title: 'Batch Profile',
    description: 'See the academic split, work-ex and diversity — download the PDF.',
    badge: 'Enhanced',
    ctaLabel: 'View',
    url: '/students/batch-profile',
    order: 2,
  },
  {
    title: 'Student Body Structure',
    description: 'Browse all {{committeeCount}} committees, filter by type, take the match quiz.',
    badge: 'Enhanced',
    ctaLabel: 'Open',
    url: '/students/body-structure',
    order: 3,
  },
  {
    title: 'General Secretaries',
    description: "Meet this year's GS team — the apex student leadership.",
    badge: 'Enhanced',
    ctaLabel: 'Meet GS',
    url: '/students/leadership',
    order: 4,
  },
  {
    title: 'Chairperson',
    description: 'See the Year-2 leaders, the current cohort, and how they’re selected.',
    badge: 'Enhanced',
    ctaLabel: 'Open',
    url: '/students/leadership',
    order: 5,
  },
  {
    title: 'Life @ SIMSREE',
    description: 'See a day on campus — fests, facilities, student voices.',
    badge: 'Enhanced',
    ctaLabel: 'Explore',
    url: '/students/life',
    order: 6,
  },
  {
    title: 'How SIMSREE Really Works',
    description: 'The Student-Driven System — 2-year leadership track explained.',
    badge: 'Enhanced',
    ctaLabel: 'Read',
    url: '/about/student-driven-system',
    wide: true,
    order: 7,
  },
];

const fallbackTestimonials = [
  {
    quote:
      '"The degree gave me knowledge. The committee gave me a career. By the time I walked into my first day at work, I had already done this job."',
    name: 'Tanmay Thomare',
    programme: 'MMS',
    meta: 'Batch 2022-24',
    role: 'Chairperson, Placement Committee',
    order: 1,
  },
  {
    quote:
      '"Running Simerations is the closest thing to running a real company I’ve done in college. P&L, deadlines, escalations, the lot."',
    name: 'Priya Kulkarni',
    programme: 'MMS',
    meta: 'Batch 2023-25',
    role: 'Chair, Events Committe',
    order: 2,
  },
  {
    quote:
      '"We delivered a market-entry deck for a fintech client in March. They used 80% of it. That’s the bar."',
    name: 'Anushka Rao',
    programme: 'MMS',
    meta: 'Batch 2023-25',
    role: 'Co-lead, R&C Club',
    order: 3,
  },
];

// Figma photos for the seven explore cards (in order) and the three voices.
const CARD_PHOTOS = [1, 2, 3, 4, 5, 6, 7].map((n) => `/images/students/card-${n}.webp`);
const VOICE_PHOTOS = [1, 2, 3].map((n) => `/images/campus/voice-${n}.webp`);

const img = (image, fallback, w) => (image ? urlFor(image).width(w).auto('format').url() : fallback);

// Explore card — Figma: 405x506 hairline card, 270px photo, 24 padding: a
// square-cornered #eaeaf1 tag, H5 28 black title, 16/150 copy, chevron link.
function ExploreCard({ c, image, wide = false }) {
  return (
    <a
      href={c.url || '#'}
      className={`group flex bg-white outline outline-1 -outline-offset-1 outline-black/20 hover:outline-navy-300 transition-colors ${
        wide ? 'flex-col md:flex-row' : 'flex-col'
      }`}
    >
      <div
        className={`bg-navy-50 bg-cover bg-center shrink-0 ${wide ? 'h-[270px] md:h-auto md:w-1/2 md:min-h-[334px]' : 'h-[270px]'}`}
        style={image ? { backgroundImage: `url('${image}')` } : undefined}
      />
      <div className={`flex-1 flex flex-col gap-6 p-6 ${wide ? 'md:justify-center' : ''}`}>
        <div className="flex flex-col gap-4">
          {c.badge && (
            <span className="w-fit px-2.5 py-1 rounded bg-navy-50 outline outline-1 -outline-offset-1 outline-black/20 text-sm leading-[150%] uppercase text-navy-900">
              {c.badge}
            </span>
          )}
          <div className="flex flex-col gap-2">
            <H5 as="h3" className="text-black">
              {c.title}
            </H5>
            <p className="text-base leading-[150%] text-black">{c.description}</p>
          </div>
        </div>
        <span className="flex items-center gap-2 w-fit text-base leading-[150%] text-black group-hover:underline underline-offset-2">
          {c.ctaLabel || 'Open'} <ChevronRight size={24} strokeWidth={1.5} />
        </span>
      </div>
    </a>
  );
}

export default function Students() {
  const facts = useKeyFacts();
  const { data } = useStudentsData();
  const sp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const paths = fillFactsDeep(data?.paths?.length ? data.paths : fallbackPaths, facts);
  const cards = fillFactsDeep(data?.cards?.length ? data.cards : fallbackCards, facts);
  const testimonials = fillFactsDeep(data?.testimonials?.length ? data.testimonials : fallbackTestimonials, facts).map(
    (t, i) => ({
      ...t,
      meta: [t.meta, t.role].filter(Boolean).join('\n'),
      photo: t.photo || VOICE_PHOTOS[i % VOICE_PHOTOS.length],
    }),
  );
  const heroButtons = fillFactsDeep(sp.heroButtons?.length ? sp.heroButtons : fallbackPage.heroButtons, facts);
  const ctaButtons = fillFactsDeep(sp.ctaButtons?.length ? sp.ctaButtons : fallbackPage.ctaButtons, facts);

  const wideCards = cards.filter((c) => c.wide);
  const gridCards = cards.filter((c) => !c.wide);

  // Hero title: forced line break after one phrase, italic on another.
  const title = sp.heroTitle || '';
  const brk = sp.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;
  const heroTitle = bIdx === -1 ? title : `${title.slice(0, bIdx + brk.length)}\n${title.slice(bIdx + brk.length).trim()}`;

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(sp.heroImage, '/images/students/hero.webp', { stretch: true })}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: "Student's Corner" }]}
        eyebrow={sp.heroEyebrow}
        eyebrowUpper
        title={heroTitle}
        titleItalic={sp.heroTitleItalic}
        description={sp.heroDescription}
        descriptionWidth={628}
        actions={heroButtons.map((b) => ({ label: b.label, href: b.url, primary: b.primary }))}
      />

      <section className="px-5 py-16 md:p-16">
        <StatGrid stats={sp.stats} />
      </section>

      {/* Pick a path — navy; five 237x224 cards, 1px #f2f2f2 border, 48px icon. */}
      <Section bg="bg-navy-900" width={1280} className="text-white">
        <SectionTitle
          center
          dark
          tagline={sp.pathsEyebrow}
          taglineClass="text-white normal-case"
          title={sp.pathsTitle}
          body={sp.pathsSubtitle}
        />
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {paths.map((p) => {
            const Icon = PATH_ICONS[p.icon] || IdCard;
            return (
              <a
                key={p.title}
                href={p.url || '#'}
                className="flex flex-col justify-center gap-8 min-h-[224px] p-4 bg-navy-900 outline outline-1 -outline-offset-1 outline-ink-50 hover:bg-navy-800 transition-colors"
              >
                <Icon size={48} strokeWidth={1.25} />
                <span className="flex flex-col gap-2 text-hero">
                  <H6 as="span" className="text-hero">
                    {p.title}
                  </H6>
                  <span className="text-sm leading-[150%]">{p.description}</span>
                </span>
              </a>
            );
          })}
        </div>
      </Section>

      {/* Explore — centred title; 3-up 405x506 cards, then the wide card centred. */}
      <Section width={1280}>
        <SectionTitle center tagline={sp.exploreEyebrow} title={sp.exploreTitle} body={sp.exploreSubtitle} />
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridCards.map((c, i) => (
            <ExploreCard key={c.title} c={c} image={img(c.image, CARD_PHOTOS[i], 810)} />
          ))}
        </div>
        {wideCards.length > 0 && (
          <div className="mt-8 flex flex-col items-center gap-8">
            {wideCards.map((c, i) => (
              <div key={c.title} className="w-full max-w-[918px]">
                <ExploreCard c={c} image={img(c.image, CARD_PHOTOS[gridCards.length + i], 918)} wide />
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Voices — the Figma testimonial carousel. */}
      <Section width={1280}>
        <SectionTitle
          tagline={sp.voicesEyebrow}
          title={composeTitle(sp.voicesTitle, sp.voicesTitleHighlight)}
          highlight={sp.voicesTitleHighlight}
          body={sp.voicesSubtitle}
          width={1280}
        />
        <div className="mt-20">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </Section>

      {/* Apply — navy, centred 768 column. */}
      <Section bg="bg-navy-900" width={768} className="text-center">
        <SectionTitle center dark title={sp.ctaTitle} body={sp.ctaSubtitle} />
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {ctaButtons.map((b) => (
            <HeroButton key={b.label} label={b.label} href={b.url} primary={b.primary} />
          ))}
        </div>
      </Section>
    </div>
  );
}
