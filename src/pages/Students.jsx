import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  ChevronRight,
  GraduationCap,
  Handshake,
  IdCard,
  Newspaper,
} from 'lucide-react';
import StatCard from '../components/StatCard';
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

export default function Students() {
  const facts = useKeyFacts();
  const { data } = useStudentsData();
  const sp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const paths = fillFactsDeep(data?.paths?.length ? data.paths : fallbackPaths, facts);
  const cards = fillFactsDeep(data?.cards?.length ? data.cards : fallbackCards, facts);
  const testimonials = fillFactsDeep(
    data?.testimonials?.length ? data.testimonials : fallbackTestimonials,
    facts
  );
  const heroButtons = fillFactsDeep(
    sp.heroButtons?.length ? sp.heroButtons : fallbackPage.heroButtons,
    facts
  );
  const ctaButtons = fillFactsDeep(
    sp.ctaButtons?.length ? sp.ctaButtons : fallbackPage.ctaButtons,
    facts
  );

  const heroImageUrl = sp.heroImage ? urlFor(sp.heroImage).width(1600).url() : null;

  // Carousel shows three at a time on desktop; page through the rest.
  const PER_PAGE = 3;
  const pageCount = Math.max(1, Math.ceil(testimonials.length / PER_PAGE));
  const [slide, setSlide] = useState(0);
  const visibleQuotes = useMemo(
    () => testimonials.slice(slide * PER_PAGE, slide * PER_PAGE + PER_PAGE),
    [testimonials, slide]
  );
  const go = (dir) => setSlide((s) => (s + dir + pageCount) % pageCount);

  const wideCards = cards.filter((c) => c.wide);
  const gridCards = cards.filter((c) => !c.wide);

  // Hero title: italic on one phrase, forced break after another.
  const title = sp.heroTitle || '';
  const brk = sp.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;
  const line1 = bIdx === -1 ? title : title.slice(0, bIdx + brk.length);
  const line2 = bIdx === -1 ? '' : title.slice(bIdx + brk.length).trim();
  const renderLine = (line) => {
    const it = sp.heroTitleItalic;
    const iIdx = it ? line.indexOf(it) : -1;
    if (iIdx === -1) return line;
    return (
      <>
        {line.slice(0, iIdx)}
        <span className="italic">{it}</span>
        {line.slice(iIdx + it.length)}
      </>
    );
  };

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
          <div className="text-xs text-white/70 mb-5 flex items-center">
            <a href="/" className="hover:text-white">Home</a>
            <span className="mx-1.5">/</span>
            <span className="text-white">Student&apos;s Corner</span>
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90 mb-4">
            {sp.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-[52px] md:leading-[1.14] font-semibold mb-5">
            {renderLine(line1)}
            {line2 && (
              <>
                <br />
                {renderLine(line2)}
              </>
            )}
          </h1>
          <p className="max-w-lg text-sm text-white/85 leading-relaxed mb-7">
            {sp.heroDescription}
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
          {(sp.stats || []).map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Pick a path */}
      <section className="bg-navy-900 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-10">
            <span className="text-xs text-white/70">{sp.pathsEyebrow}</span>
            <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-4 mb-3">
              {sp.pathsTitle}
            </h2>
            <p className="text-sm text-white/70">{sp.pathsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {paths.map((p) => {
              const Icon = PATH_ICONS[p.icon] || IdCard;
              return (
                <a
                  key={p.title}
                  href={p.url || '#'}
                  className="border border-white/20 hover:border-white/50 hover:bg-white/5 transition-colors rounded-sm p-6 flex flex-col"
                >
                  <Icon size={22} className="text-white mb-6" />
                  <h3 className="font-display text-lg font-semibold mb-2">{p.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed">{p.description}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explore */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {sp.exploreEyebrow}
            </span>
            <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3">
              {cards.length} {sp.exploreTitle}
            </h2>
            <p className="text-sm text-ink-600">{sp.exploreSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {gridCards.map((c) => {
              const imgUrl = c.image ? urlFor(c.image).width(700).url() : null;
              return (
                <a
                  key={c.title}
                  href={c.url || '#'}
                  className="border border-navy-100 rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                >
                  <div
                    className="h-[180px] bg-gray-200 bg-cover bg-center"
                    style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                  />
                  <div className="p-6 flex flex-col flex-1">
                    {c.badge && (
                      <span className="inline-block w-fit text-[9px] font-semibold tracking-widest uppercase text-navy-900 bg-navy-50 px-2.5 py-1 rounded mb-4">
                        {c.badge}
                      </span>
                    )}
                    <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
                      {c.title}
                    </h3>
                    <p className="text-sm text-ink-600 leading-relaxed mb-5">{c.description}</p>
                    <span className="text-xs font-medium text-navy-900 inline-flex items-center gap-1 mt-auto">
                      {c.ctaLabel || 'Open'} <ChevronRight size={13} />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Wide cards sit below the grid, image beside the text */}
          {wideCards.map((c) => {
            const imgUrl = c.image ? urlFor(c.image).width(900).url() : null;
            return (
              <a
                key={c.title}
                href={c.url || '#'}
                className="mt-6 lg:mt-8 border border-navy-100 rounded-lg overflow-hidden flex flex-col md:flex-row max-w-[820px] mx-auto hover:shadow-md transition-shadow"
              >
                <div
                  className="h-[180px] md:h-auto md:w-[45%] shrink-0 bg-gray-200 bg-cover bg-center"
                  style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                />
                <div className="p-6 flex flex-col flex-1">
                  {c.badge && (
                    <span className="inline-block w-fit text-[9px] font-semibold tracking-widest uppercase text-navy-900 bg-navy-50 px-2.5 py-1 rounded mb-4">
                      {c.badge}
                    </span>
                  )}
                  <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
                    {c.title}
                  </h3>
                  <p className="text-sm text-ink-600 leading-relaxed mb-5">{c.description}</p>
                  <span className="text-xs font-medium text-navy-900 inline-flex items-center gap-1 mt-auto">
                    {c.ctaLabel || 'Read'} <ChevronRight size={13} />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Voices */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {sp.voicesEyebrow}
          </span>
          <TitleWithHighlight
            text={sp.voicesTitle}
            highlight={sp.voicesTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3"
          />
          <p className="text-sm text-ink-600 mb-10">{sp.voicesSubtitle}</p>

          <div
            aria-live="polite"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 border-t border-navy-100 pt-8"
          >
            {visibleQuotes.map((t) => {
              const photoUrl = t.photo ? urlFor(t.photo).width(120).url() : null;
              return (
                <figure key={t.name} className="m-0 flex flex-col">
                  <blockquote className="text-sm text-navy-900 leading-relaxed mb-6 flex-1">
                    {t.quote}
                  </blockquote>
                  <figcaption className="flex items-center gap-3 pt-4 border-t border-navy-100">
                    <span
                      className="w-9 h-9 rounded-full bg-navy-100 bg-cover bg-center shrink-0"
                      style={photoUrl ? { backgroundImage: `url('${photoUrl}')` } : undefined}
                    />
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-navy-900">
                        {t.name}
                        {t.programme && (
                          <span className="font-normal text-ink-400"> ({t.programme})</span>
                        )}
                      </span>
                      <span className="block text-[11px] text-ink-400">{t.meta}</span>
                      <span className="block text-[11px] text-ink-400">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          {pageCount > 1 && (
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {Array.from({ length: pageCount }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSlide(i)}
                    aria-label={`Show testimonials ${i + 1} of ${pageCount}`}
                    aria-current={i === slide ? 'true' : undefined}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === slide ? 'bg-navy-900' : 'bg-navy-100 hover:bg-navy-300'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous testimonials"
                  className="w-9 h-9 rounded-md border border-navy-100 hover:bg-navy-50 transition-colors flex items-center justify-center"
                >
                  <ArrowLeft size={15} className="text-navy-900" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next testimonials"
                  className="w-9 h-9 rounded-md border border-navy-100 hover:bg-navy-50 transition-colors flex items-center justify-center"
                >
                  <ArrowRight size={15} className="text-navy-900" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Apply CTA */}
      <section className="bg-navy-900 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0 text-center">
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mb-4">{sp.ctaTitle}</h2>
          <p className="text-sm text-white/75 mb-8 max-w-xl mx-auto">{sp.ctaSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {ctaButtons.map((b) => (
              <a
                key={b.label}
                href={b.url || '#'}
                className={`text-sm font-medium px-4 py-2.5 rounded-md transition-colors flex items-center gap-2 ${
                  b.primary
                    ? 'bg-sky-600 hover:bg-teal-600 text-white'
                    : 'bg-white hover:bg-gray-100 text-navy-900'
                }`}
              >
                {b.label}
                {b.primary && <ArrowUpRight size={14} />}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
