import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import { useStudentSystemData } from '../lib/useStudentSystemData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';
import { fallbackCommittees } from '../data/committees';

const fallbackPage = {
  heroEyebrow: 'The SIMSREE study works',
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
  philosophyQuote:
    'Tell me and I will forget. Show me and I may remember. Involve me and I will understand.',
  philosophyAttribution: 'Chinese Proverb',
  philosophyMeta: 'The guiding philosophy of SIMSREE since {{foundedYear}}',

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

function TitleWithHighlight({ text, highlight, className, highlightClassName = 'text-sky-600' }) {
  if (!highlight) return <h2 className={className}>{text}</h2>;
  const idx = text.indexOf(highlight);
  if (idx === -1) return <h2 className={className}>{text}</h2>;
  return (
    <h2 className={className}>
      {text.slice(0, idx)}
      <span className={highlightClassName}>{highlight}</span>
      {text.slice(idx + highlight.length)}
    </h2>
  );
}

export default function StudentSystem() {
  const facts = useKeyFacts();
  const { data } = useStudentSystemData();

  const sp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const committees = fillFactsDeep(data?.committees?.length ? data.committees : fallbackCommittees, facts);

  const [category, setCategory] = useState('All');
  const visible = category === 'All' ? committees : committees.filter((c) => c.category === category);

  const heroImageUrl = imgUrl(sp.heroImage, 1600);
  const trackImageUrl = imgUrl(sp.trackImage, 800);

  return (
    <div>
      {/* Hero */}
      <section
        className="min-h-[600px] md:h-[767px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: heroImageUrl
            ? `url('${heroImageUrl}')`
            : 'linear-gradient(180deg, #8a8f9e, #cfd3da)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-navy-950/10" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[55px] pt-32 pb-12 md:pb-[72px] md:h-full flex flex-col justify-end text-white">
          <span className="inline-block w-fit bg-navy-900 text-white text-[18px] leading-[150%] px-4 py-2.5 rounded-full mb-9">
            {sp.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3 leading-tight">
            {sp.heroTitle}
            <br />
            {sp.heroTitleLine2}
          </h1>
          <p className="max-w-xl text-white/85 mb-9">{sp.heroDescription}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={sp.heroPrimaryCtaUrl}
              className="bg-sky-600 hover:bg-teal-600 transition-colors text-white font-medium px-5 py-3 rounded-md flex items-center gap-2 w-fit"
            >
              {sp.heroPrimaryCtaLabel} <ArrowUpRight size={16} />
            </a>
            <Link
              to={sp.heroSecondaryCtaUrl}
              className="bg-white hover:bg-gray-100 transition-colors text-navy-900 font-medium px-5 py-3 rounded-md w-fit"
            >
              {sp.heroSecondaryCtaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1408px] mx-auto px-6 lg:px-16 py-10 lg:py-16">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {(sp.stats || []).map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-navy-900 text-white py-16 lg:py-28">
        <div className="max-w-[768px] mx-auto px-6 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-white/70">
            {sp.philosophyEyebrow}
          </span>
          <blockquote className="font-display text-2xl md:text-3xl leading-relaxed mt-8 mb-10">
            "{sp.philosophyQuote}"
          </blockquote>
          <p className="font-medium">— {sp.philosophyAttribution}</p>
          <p className="text-sm text-white/70 mt-1">{sp.philosophyMeta}</p>
        </div>
      </section>

      {/* The System */}
      <section className="py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {sp.systemEyebrow}
            </span>
            <TitleWithHighlight
              text={sp.systemTitle}
              highlight={sp.systemTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-6"
            />
            {(sp.systemBody || '').split('\n\n').map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-ink-600 mb-4">
                {para}
              </p>
            ))}
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href={sp.systemPrimaryCtaUrl}
                className="bg-navy-900 hover:bg-navy-800 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md flex items-center gap-2"
              >
                {sp.systemPrimaryCtaLabel} <ArrowUpRight size={14} />
              </a>
              <Link
                to={sp.systemSecondaryCtaUrl}
                className="border border-navy-100 hover:bg-navy-50 transition-colors text-navy-900 text-sm font-medium px-5 py-3 rounded-md"
              >
                {sp.systemSecondaryCtaLabel}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => {
              const img = imgUrl(sp.systemImages?.[i], 400);
              return (
                <div
                  key={i}
                  className="h-48 bg-gray-200 rounded-xl bg-cover bg-center"
                  style={img ? { backgroundImage: `url('${img}')` } : undefined}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Track */}
      <section className="bg-navy-50 py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0 grid lg:grid-cols-2 gap-10 lg:gap-20">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {sp.trackEyebrow}
            </span>
            <TitleWithHighlight
              text={sp.trackTitle}
              highlight={sp.trackTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-6"
            />
            <p className="text-sm leading-relaxed text-ink-600 mb-8">{sp.trackBody}</p>
            <div
              className="h-64 bg-gray-200 rounded-xl bg-cover bg-center"
              style={trackImageUrl ? { backgroundImage: `url('${trackImageUrl}')` } : undefined}
            />
            <div className="bg-white border-l-2 border-l-sky-600 rounded-md p-5 mt-8">
              <p className="text-sm font-semibold text-navy-900 mb-1">{sp.trackCalloutTitle}</p>
              <p className="text-[13px] leading-relaxed text-ink-600">{sp.trackCalloutBody}</p>
            </div>
          </div>
          <ol className="flex flex-col gap-4">
            {(sp.trackSteps || []).map((step, i) => (
              <li key={step.title} className="flex items-start gap-4 bg-white rounded-xl p-5">
                <span className="w-8 h-8 shrink-0 rounded-full bg-navy-50 text-navy-900 text-xs font-semibold flex items-center justify-center">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{step.title}</p>
                  <p className="text-[13px] text-ink-600 mt-0.5">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Committee Directory */}
      <section id="directory" className="py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {sp.directoryEyebrow}
            </span>
            <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-6">
              <span className="text-sky-600">{committees.length}</span> {sp.directoryTitle}
            </h2>
            <p className="text-sm text-ink-600">{sp.directorySubtitle}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 lg:mb-16">
            <span className="text-xs font-medium text-ink-600 mr-2">Filter by</span>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`text-xs font-medium px-4 py-2 rounded-full border transition-colors ${
                  category === c
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'border-navy-100 text-navy-900 hover:bg-navy-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {visible.map((c) => {
              const img = imgUrl(c.image, 400);
              const card = (
                <div className="flex flex-col h-full">
                  <div
                    className="h-40 bg-gray-200 rounded-xl bg-cover bg-center mb-4"
                    style={img ? { backgroundImage: `url('${img}')` } : undefined}
                  />
                  <span className="inline-block w-fit text-[10px] uppercase tracking-wide text-teal-600 bg-sky-50 px-2 py-1 rounded font-semibold mb-2">
                    {c.category}
                  </span>
                  <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                  <p className="text-xs text-ink-600 mt-1">{c.description}</p>
                </div>
              );
              const href = c.slug?.current
                ? `/students/committees/${c.slug.current}`
                : c.linkUrl;
              return href ? (
                <Link key={c._id || c.name} to={href} className="group">
                  {card}
                </Link>
              ) : (
                <div key={c._id || c.name}>{card}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Spotlight */}
      <section className="bg-navy-900 text-white py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-10 lg:mb-20">
            <span className="text-xs font-semibold tracking-widest uppercase text-white/70">
              {sp.spotlightEyebrow}
            </span>
            <TitleWithHighlight
              text={sp.spotlightTitle}
              highlight={sp.spotlightTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-6 mb-6"
              highlightClassName="text-teal-400"
            />
            <p className="text-sm text-white/80">{sp.spotlightSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {(sp.spotlightCards || []).map((c) => (
              <div key={c.title} className="bg-white/[0.07] rounded-2xl p-6 flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-sky-300 font-semibold">
                  {c.label}
                </span>
                <h4 className="font-display text-lg font-semibold mt-2 mb-3">{c.title}</h4>
                <p className="text-[13px] leading-relaxed text-white/70 mb-4">{c.description}</p>
                <Link
                  to={c.linkUrl}
                  className="text-[13px] font-medium text-white flex items-center gap-1 w-fit mt-auto"
                >
                  {c.linkLabel} <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-10 lg:mb-20">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {sp.impactEyebrow}
            </span>
            <TitleWithHighlight
              text={sp.impactTitle}
              highlight={sp.impactTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-6"
            />
            <p className="text-sm text-ink-600">{sp.impactSubtitle}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {(sp.impactStats || []).map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl font-semibold text-navy-900">{s.value}</div>
                <p className="text-sm font-semibold text-navy-900 mt-2">{s.label}</p>
                <p className="text-xs text-ink-600 mt-1">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="bg-navy-800 text-white py-16 lg:py-28">
        <div className="max-w-[768px] mx-auto px-6 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-white/70">{sp.ctaEyebrow}</span>
          <TitleWithHighlight
            text={sp.ctaTitle}
            highlight={sp.ctaTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-6 mb-6"
            highlightClassName="text-teal-400"
          />
          <p className="text-sm text-white/80 mb-10">{sp.ctaSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to={sp.ctaPrimaryUrl}
              className="bg-sky-600 hover:bg-teal-600 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md"
            >
              {sp.ctaPrimaryLabel}
            </Link>
            <Link
              to={sp.ctaSecondaryUrl}
              className="bg-white hover:bg-gray-100 transition-colors text-navy-900 text-sm font-medium px-5 py-3 rounded-md"
            >
              {sp.ctaSecondaryLabel}
            </Link>
            <Link
              to={sp.ctaTertiaryUrl}
              className="border border-white/30 hover:bg-white/10 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md"
            >
              {sp.ctaTertiaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
