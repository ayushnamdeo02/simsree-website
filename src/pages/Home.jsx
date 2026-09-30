import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Play, GraduationCap, Briefcase, BookOpen, FileSearch } from 'lucide-react';
import StatCard from '../components/StatCard';
import NewsCard from '../components/NewsCard';
import EventCard from '../components/EventCard';
import SectionHeading from '../components/SectionHeading';
import { useHomepageData } from '../lib/useHomepageData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const ICONS = { GraduationCap, Briefcase, BookOpen, FileSearch };

const fallbackStats = [
  { label: 'Years of Excellence', value: '40+', dark: true },
  { label: 'IIRF National Rank', value: '#25', dark: false },
  { label: 'Alumni Worldwide', value: '10000+', dark: true },
  { label: 'Recruiters', value: '100+', dark: false },
];

const fallbackNews = [
  { tag: 'Admission', title: 'MMM & MFM Executive AY 2026–27 Round 4 Notification', date: 'March 2026', isDownload: true, actionLabel: 'Download PDF' },
  { tag: 'Award', title: 'SIMSREE awarded Best Authorised Institutional Partner 2025 by FPSB India', date: 'November 2026', actionLabel: 'Read Story' },
  { tag: 'Results', title: 'Ph.D Results AY 2025–26 announced', date: 'March 2026' },
  { tag: 'Admission', title: 'Final allotment list · MMS ACAP AY 2025-26', date: 'March 2026' },
];

const fallbackCourses = [
  { icon: 'GraduationCap', title: 'Full-Time', description: 'MMS · M.Sc Finance · 2 years on Churchgate campus' },
  { icon: 'Briefcase', title: 'Executive Programmes', description: 'MFM & MMM · weekends · for working professionals' },
  { icon: 'FileSearch', title: 'Doctoral · Ph.D', description: 'Original research across management disciplines' },
];

const fallbackFactors = [
  { tag: 'Academic Rigour', title: 'Excellence in every classroom.', description: "No matter what you study, the future demands both depth and breadth. So does SIMSREE. Our programmes push students beyond theory into practice - case-based teaching, live projects, and a curriculum refreshed against industry every two years.", linkLabel: 'Explore academics', linkUrl: '/academics' },
  { tag: 'Industry-Led Learning', title: 'Practitioners, not just professors.', description: "Learn from the people who do the work - SIMSREE brings in the best minds from India's corporate world, week after week. CXO guest lectures, live consulting briefs, and corporate visits aren't extras. They're the curriculum.", linkLabel: 'Meet our faculty', linkUrl: '/academics/faculty' },
  { tag: 'Outcomes', title: 'Careers prepared for, not promised.', description: "Top recruiters. Strong alumni network. An active placement cell that connects your skills to the right opportunities - from internship to offer. The Placement Committee, like every committee here, is run by students themselves.", linkLabel: 'Placement Outcomes', linkUrl: '/placements' },
];

const fallbackEvents = [
  { day: 'Fri', date: '06', month: 'May', year: '2024', title: 'Guest Lecture · ESG @ Indian Banks', meta: 'Corporate Relations · 3pm Auditorium', cta: 'Reserve a seat' },
  { day: 'Fri', date: '14', month: 'May', year: '2024', title: 'MDP · Data-Driven Decision Making', meta: '3-day · ₹15,000 · Hybrid', cta: 'Apply to attend', solidCta: true },
  { day: 'Fri', date: '22', month: 'May', year: '2024', title: 'Finance Forum Quarterly', meta: 'Finance Forum · markets recap', cta: 'See event details' },
  { day: 'Fri', date: '30', month: 'May', year: '2024', title: 'MDP · Negotiation Skills', meta: '2-day · ₹12,000', cta: 'Apply', solidCta: true },
];

const fallbackFlagships = [
  { tag: 'National Fest', title: 'Simerations', description: "SIMSREE's flagship national management fest. 5 tracks, 500+ delegates, 30+ partner colleges every February.", linkLabel: 'Register your team', linkUrl: '/events/simerations' },
  { tag: 'Ideas Worth Spreading', title: 'TEDxSIMSREE', description: 'Student-curated TED talks since 2017. Speaker applications open each May; eight ideas chosen for the September stage.', linkLabel: 'See TEDxSIMSREE', linkUrl: '/events/tedxsimsree' },
  { tag: 'Annual Conclave', title: 'Aikya', description: 'The annual alumni-and-industry conclave - keynotes, panels, and the SIMSREE reunion night every November.', linkLabel: 'See lineup', linkUrl: '/events/flagship' },
];

const fallbackRecruiters = [
  { name: 'Wells Fargo' }, { name: 'Barclays' }, { name: 'Piramal' }, { name: 'Morgan Stanley' },
  { name: 'Citi' }, { name: 'Godrej' }, { name: 'Godrej & Boyce' }, { name: 'Deutsche Bank' },
  { name: 'GEP' }, { name: 'Deloitte' }, { name: 'D. E. Shaw & Co.' }, { name: 'Arcesium' },
];

const fallbackHomepage = {
  heroBadge: "Mumbai's Premier Management Institute · Since {{foundedYear}}",
  heroTitle: 'More than ready.',
  heroSubtitle: 'SIMSREE ready.',
  heroDescription: "Forty years in India's financial capital. Get an education that doesn't just prepare you for the business world - it prepares you to shape it.",
  heroPrimaryCtaLabel: 'See why SIMSREE',
  heroPrimaryCtaUrl: '/about',
  heroSecondaryCtaLabel: 'Start your application',
  heroSecondaryCtaUrl: '/admissions',
  admissionAlertText: 'MMS admissions for AY 2026-27 are open - apply via {{cetCellName}}.',
  admissionAlertLinkLabel: 'See MMS 2026-27 dates',
  admissionAlertLinkUrl: '/admissions/mms',
  locationEyebrow: 'Location Advantage',
  locationTitle: 'Anchored in',
  locationLine2: "Mumbai's",
  locationHighlight: 'financial core.',
  locationDescription: "Located at Churchgate - steps from the Bombay Stock Exchange, the Reserve Bank of India, and hundreds of corporate headquarters - SIMSREE doesn't just teach business. It practices it.\n\nYour address becomes your advantage - guest lectures with CFOs, internships at trading desks, and careers at the firms you studied in class.",
  testimonialQuote: "SIMSREE isn't just an education - it's an investment in your future. Their curriculum and career guidance equip you to reach new heights in your chosen field.",
  testimonialName: 'Tanmay Thomare',
  testimonialMeta: 'MMS · Batch 2022–24',
};

function imgUrl(image, width) {
  if (!image) return undefined;
  try {
    return urlFor(image).width(width).auto('format').url();
  } catch {
    return undefined;
  }
}

export default function Home() {
  const facts = useKeyFacts();
  const { data } = useHomepageData();

  const hp = fillFactsDeep({ ...fallbackHomepage, ...(data?.homepage || {}) }, facts);
  const stats = fillFactsDeep(data?.stats?.length ? data.stats : fallbackStats, facts);
  const news = fillFactsDeep(data?.news?.length ? data.news : fallbackNews, facts);
  const courses = fillFactsDeep(data?.courses?.length ? data.courses : fallbackCourses, facts);
  const factors = fillFactsDeep(data?.factors?.length ? data.factors : fallbackFactors, facts);
  const events = fillFactsDeep(data?.events?.length ? data.events : fallbackEvents, facts);
  const flagships = fillFactsDeep(data?.flagships?.length ? data.flagships : fallbackFlagships, facts);
  const recruiters = fillFactsDeep(data?.recruiters?.length ? data.recruiters : fallbackRecruiters, facts);
  // The recruiterCount key fact is the published figure staff maintain in one
  // place; the document count only stands in if that fact is ever cleared.
  const recruiterCountLabel = facts.recruiterCount || `${data?.recruiterCount || recruiters.length}+`;

  const heroImageUrl = imgUrl(hp.heroImage, 1600);
  const locationImageUrl = imgUrl(hp.locationImage, 1000);
  const testimonialPhotoUrl = imgUrl(hp.testimonialPhoto, 192);

  // Student Voices carousel. Falls back to the single legacy testimonial fields
  // on the homepage document when no studentVoice entries exist yet.
  const [voiceIndex, setVoiceIndex] = useState(0);
  const studentVoices = data?.studentVoices?.length
    ? data.studentVoices.map((v) => ({ ...v, photoUrl: imgUrl(v.photo, 192) }))
    : [
        {
          quote: hp.testimonialQuote,
          name: hp.testimonialName,
          meta: hp.testimonialMeta,
          photoUrl: testimonialPhotoUrl,
        },
      ];
  const activeVoice = studentVoices[Math.min(voiceIndex, studentVoices.length - 1)];

  return (
    <div>
      {/* Hero */}
      <section>
        <div
          className="min-h-[600px] md:h-[767px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: heroImageUrl
              ? `url('${heroImageUrl}')`
              : "linear-gradient(180deg, #8a8f9e, #cfd3da)",
          }}
        >
          {/* Figma stacks three fills over the hero image: a 30% linear gradient
              for bottom legibility, then a flat 20% black wash across the whole
              frame. The even wash is what keeps the logo readable at the top. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
          {/* Header scrim: the logo and nav sit over whatever photo is uploaded,
              so darken the top band rather than depending on the image. */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 to-transparent" />
          {/* pt clears the fixed header; pb-[72px] + 36px gaps match the Figma content frame */}
          <div className="relative max-w-[1440px] mx-auto px-6 lg:px-16 pt-32 pb-12 md:pb-[72px] md:h-full flex flex-col justify-end text-white">
            <span className="inline-block w-fit bg-navy-900 text-white text-[18px] leading-[150%] uppercase px-4 py-2.5 rounded-full mb-9">
              {hp.heroBadge}
            </span>
            <h1 className="font-display text-5xl md:text-[72px] md:leading-[120px] font-semibold text-hero mb-3">
              {hp.heroTitle}
            </h1>
            <p className="text-white/90 mb-1">{hp.heroSubtitle}</p>
            <p className="max-w-xl text-white/80 mb-9">{hp.heroDescription}</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                to={hp.heroPrimaryCtaUrl}
                className="bg-sky-600 outline outline-1 outline-sky-600 hover:bg-sky-500 hover:outline-sky-500 transition-colors text-white font-medium px-6 py-2.5 rounded-md flex items-center gap-3"
              >
                {hp.heroPrimaryCtaLabel} <ArrowUpRight size={16} />
              </Link>
              <Link
                to={hp.heroSecondaryCtaUrl}
                className="bg-white hover:bg-gray-100 transition-colors text-navy-900 font-medium px-6 py-2.5 rounded-md"
              >
                {hp.heroSecondaryCtaLabel}
              </Link>
              <button className="flex items-center gap-2 text-white/90 text-sm font-medium ml-2">
                <span className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center">
                  <Play size={14} />
                </span>
                Watch the film · 0:48
              </button>
            </div>
          </div>
        </div>

        {/* Stat cards below hero - 1408px frame, 80px padding like every section, 1280px row, 32px gap */}
        <div className="max-w-[1408px] mx-auto px-6 lg:px-16 py-12 lg:py-20">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((s) => (
              <StatCard key={s._id || s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* News & Announcements — 1280px inner, 112px vertical padding, 80px block gaps (Figma) */}
      <section className="bg-sky-50 py-12 lg:py-20">
        <div className="max-w-[1408px] mx-auto px-6 lg:px-16">
          <div className="mb-10 lg:mb-12">
            {/* Figma: Inter Semi Bold 16/150 */}
            <span className="text-base leading-[150%] font-semibold tracking-widest uppercase text-navy-700">
              Latest News &amp; Announcements
            </span>
            <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-2">
              News from Churchgate
            </h2>
            <p className="text-ink-600 mt-2 text-lg leading-[150%]">
              Straight from the institute · updated every business day.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-10 lg:mb-12">
            {news.map((n) => (
              <NewsCard
                key={n._id || n.title}
                {...n}
                download={n.isDownload}
                image={imgUrl(n.image, 480)}
              />
            ))}
          </div>
          <Link
            to="/events/news"
            className="inline-flex items-center gap-3 bg-navy-900 outline outline-1 outline-navy-900 hover:bg-navy-800 hover:outline-navy-800 transition-colors text-white text-base font-medium px-6 py-2.5 rounded-md"
          >
            See all news &amp; announcements <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* Courses Offered — 1280px inner, 112px vertical padding, 80px block gaps (Figma) */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="text-center mb-10 lg:mb-12">
            {/* Figma: Heading/Tagline 16/150, Color Scheme 1/Text */}
            <span className="text-base leading-[150%] font-semibold tracking-widest uppercase text-black">
              I&apos;m looking for…
            </span>
            {/* Figma: Heading H2 52/120, Colour/Astronaut/Base */}
            <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-2">
              Courses Offered
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10 lg:mb-12 text-left">
            {courses.map((c) => {
              const Icon = ICONS[c.icon] || GraduationCap;
              // Figma: card radius 0, gap 32 between icon and text
              return (
                <div key={c._id || c.title} className="rounded-lg border border-black/15 shadow-sm p-6 flex gap-5 items-start">
                  {/* Figma: 36x36 tile, radius 0 */}
                  <span className="shrink-0 w-9 h-9 bg-navy-50 flex items-center justify-center">
                    <Icon className="text-navy-900" size={22} strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0">
                    {/* Figma: Heading/H5 28/140, Colour/Astronaut/Base */}
                    <h4 className="font-display text-2xl md:text-[28px] md:leading-[140%] font-medium text-navy-900">
                      {c.title}
                    </h4>
                    <p className="text-base leading-[150%] text-ink-600 mt-2">{c.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* 1280 x 117, 24px padding, 16px radius, 1px inside border (Figma) */}
          <div className="rounded-lg bg-navy-900 border border-black/15 text-white p-6 flex flex-wrap items-center gap-8 justify-between text-left">
            <div className="flex flex-col items-start gap-[11px]">
              <span className="bg-navy-50 text-navy-900 text-sm px-5 py-2 rounded-full uppercase shrink-0">Admission Alert</span>
              {/* Figma: Body medium Normal 18/150 */}
              <p className="text-lg leading-[150%]">{hp.admissionAlertText}</p>
            </div>
            <Link to={hp.admissionAlertLinkUrl} className="text-sm font-medium flex items-center gap-1 shrink-0 hover:text-sky-300 transition-colors">
              {hp.admissionAlertLinkLabel} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why SIMSREE — Astronaut Light bg, 1280 inner, 112 padding, 80 gap (Figma) */}
      <section className="bg-navy-50 py-12 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="mb-10 lg:mb-12">
            <SectionHeading
              eyebrow="Why SIMSREE"
              title="What you'll get that other B-schools can't give you."
              highlight="B-schools"
              breakBeforeHighlight
              subtitle="Get academic rigour, real-world exposure, and the entrepreneurial spirit of India's financial capital - in one programme."
            />
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {factors.map((f) => {
              const factorImg = imgUrl(f.image, 500);
              // Figma: radius 0, stroke Color Scheme 1/Border, Position Outside, weight 1.
              return (
                <div key={f._id || f.title} className="hover-card rounded-xl flex flex-col bg-white outline outline-1 outline-black/15 overflow-hidden">
                  <div
                    className="h-[277px] bg-gray-200 bg-cover bg-center shrink-0"
                    style={factorImg ? { backgroundImage: `url('${factorImg}')` } : undefined}
                  />
                  <div className="flex flex-col flex-1 p-6">
                    {/* Figma: Heading/Tagline 16/150, Colour/Eastern Blue/Base. */}
                    <span className="text-base leading-[150%] uppercase text-teal-500">{f.tag}</span>
                    {/* Figma: Heading/H6 22/140, Colour/Astronaut/Base. */}
                    <h4 className="font-display text-xl md:text-[22px] md:leading-[140%] font-medium text-navy-900 mt-2 mb-3">{f.title}</h4>
                    {/* Figma: Body small Normal 14/150, Color Scheme 1/Text. */}
                    <p className="text-sm leading-[150%] text-black mb-6">{f.description}</p>
                    {f.linkLabel && (
                      <Link
                        to={f.linkUrl || '#'}
                        className="text-lg leading-[150%] text-teal-500 flex items-center gap-2 mt-auto w-fit hover:underline"
                      >
                        {f.linkLabel} <ArrowUpRight size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location Advantage — 1312 card (680 image + 632 content), 112px section padding (Figma) */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1312px] mx-auto px-6 lg:px-0">
          {/* Figma: radius 16, stroke #000 at 15% Inside, effect small, gap 48. */}
          <div className="bg-white rounded-2xl border border-black/15 shadow-sm overflow-hidden grid lg:grid-cols-[632px_1fr]">
            <div
              className="h-64 lg:h-[674px] bg-gray-200 bg-cover bg-center"
              style={locationImageUrl ? { backgroundImage: `url('${locationImageUrl}')` } : undefined}
            />
            <div className="flex flex-col justify-center gap-6 p-8 lg:px-8 lg:py-[57px]">
              {/* Figma: Inter Semi Bold 16/150, letter-spacing 0, Color Scheme 1/Text. */}
              <span className="text-base leading-[150%] font-semibold uppercase text-black">{hp.locationEyebrow}</span>
              <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900">
                {/* Figma breaks between the title and the highlighted phrase, so
                    "Mumbai's financial core." sits on line 2. */}
                {hp.locationTitle}
                <br className="hidden lg:block" />
                {hp.locationLine2 ? `${hp.locationLine2} ` : ''}
                <span className="text-teal-500">{hp.locationHighlight}</span>
              </h2>
              <div>
                {(hp.locationDescription || '').split('\n\n').map((para, i) => (
                  <p key={i} className="text-lg leading-[150%] text-black mb-4 last:mb-0">{para}</p>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/about/campus-life"
                  className="bg-navy-900 hover:bg-navy-800 transition-colors text-white text-base leading-[150%] font-medium px-5 py-3 rounded-md flex items-center gap-2"
                >
                  See a day on campus <ArrowUpRight size={16} />
                </Link>
                <Link
                  to="/about/campus-life"
                  className="border border-black/15 hover:bg-navy-50 transition-colors text-ink-900 text-base leading-[150%] font-medium px-5 py-3 rounded-md"
                >
                  Tour the facilities
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Voices — 1440x785 navy, 768px heading block, carousel (Figma) */}
      <section className="bg-navy-900 text-white py-12 lg:py-20">
        <div className="max-w-[768px] mx-auto px-6 text-center">
          {/* Figma: Heading/Tagline 16/150, Colour/Neutral/White. */}
          <span className="text-base leading-[150%] font-semibold uppercase text-white">Student Voices</span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-6">
            Life at SIMSREE,
            <br className="hidden md:block" /> in students' words.
          </h2>

          {/* Figma: Heading/H5 28/140, Color Scheme 3/Text (white). */}
          <blockquote className="font-display text-2xl md:text-[28px] md:leading-[140%] text-white mt-12">
            "{activeVoice.quote}"
          </blockquote>

          <div
            className="w-24 h-24 rounded-full bg-white/20 mx-auto mt-10 mb-4 bg-cover bg-center"
            style={
              activeVoice.photoUrl ? { backgroundImage: `url('${activeVoice.photoUrl}')` } : undefined
            }
          />
          <p className="text-base leading-[150%] font-semibold text-white">{activeVoice.name}</p>
          {/* Figma: Body Regular Normal 16/150, Color Scheme 3/Text (white). */}
          <p className="text-base leading-[150%] text-white">{activeVoice.meta}</p>

          {studentVoices.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {studentVoices.map((v, i) => (
                <button
                  key={v._id || i}
                  onClick={() => setVoiceIndex(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === voiceIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recruiting Partners — 1440x664, full-bleed logo marquee (Figma) */}
      <section className="py-12 lg:py-20 overflow-hidden">
        <div className="max-w-[768px] mx-auto px-6 text-center">
          {/* Figma: Heading/Tagline 16/150, Color Scheme 1/Text. */}
          <span className="text-base leading-[150%] font-semibold uppercase text-black">Our Recruiting Partners</span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6">
            {recruiterCountLabel} companies <span className="text-teal-500">hire here.</span>
          </h2>
          {/* Figma: Text/Medium/Normal 18/150, Color Scheme 1/Text. */}
          <p className="text-lg leading-[150%] text-black mt-6">
            From global investment banks to Indian unicorns · across BFSI, FMCG, Consulting, Tech, Pharma,
            Manufacturing and Media.
          </p>
        </div>

        {/* Full-bleed marquee: the track is duplicated so the loop is seamless */}
        <div className="mt-10 lg:mt-12 overflow-hidden">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((half) => (
              <div key={half} className="flex items-center shrink-0" aria-hidden={half === 1}>
                {recruiters.map((r) => {
                  // Logos are uploaded on a shared 5:2 transparent canvas, sized so each
                  // carries the same visual weight, so every slot renders the same box.
                  const logoUrl = imgUrl(r.logo, 480);
                  return (
                    <div key={`${half}-${r._id || r.name}`} className="px-3 lg:px-4 shrink-0">
                      {logoUrl ? (
                        <img src={logoUrl} alt={r.name} className="h-16 lg:h-20 aspect-[5/2] object-contain" />
                      ) : (
                        <span className="px-6 text-xl font-semibold text-navy-900 whitespace-nowrap">{r.name}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10 lg:mt-12">
          <Link
            to="/placements/partners"
            className="inline-block bg-navy-900 outline outline-1 outline-teal-500 hover:bg-navy-800 transition-colors text-white text-base leading-[150%] font-medium px-6 py-2.5 rounded-md"
          >
            See all {recruiterCountLabel} recruiters
          </Link>
        </div>
      </section>

      {/* Upcoming Events — 1280 inner, 112px padding, 32px card gap (Figma) */}
      <section className="bg-sky-50 py-12 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-10 lg:mb-12">
            {/* Figma: Inter Semi Bold 16/150, letter-spacing 0, Color Scheme 1/Text. */}
            <span className="text-base leading-[150%] font-semibold uppercase text-black">Always Something Happening</span>
            <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6">
              Upcoming on <span className="text-teal-500">campus.</span>
            </h2>
            {/* Figma: Text/Medium/Normal 18/150, Color Scheme 1/Text. */}
            <p className="text-lg leading-[150%] text-black mt-6">Guest lectures, MDPs, flagship events - see the full calendar.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-10 lg:mb-12">
            {events.map((e) => (
              <EventCard key={e._id || e.title} {...e} />
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 bg-navy-900 outline outline-1 outline-teal-500 hover:bg-navy-800 transition-colors text-white text-base leading-[150%] font-medium px-6 py-2.5 rounded-md"
            >
              See the full calendar <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Flagship Events — 1280 inner, 112px padding, cards w/ border + shadow (Figma) */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-10 lg:mb-12">
            {/* Figma: Heading/Tagline 16/150, Color Scheme 1/Text. */}
            <span className="text-base leading-[150%] font-semibold uppercase text-black">Flagship</span>
            <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6">
              SIMSREE's signature events
            </h2>
            {/* Figma: Text/Medium/Normal 18/150, Color Scheme 1/Text. */}
            <p className="text-lg leading-[150%] text-black mt-6">
              Three flagship platforms that the SIMSREE community builds, runs, and gathers around - year after year.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {flagships.map((f) => {
              const flagshipImg = imgUrl(f.image, 500);
              return (
                <div
                  key={f._id || f.title}
                  className="hover-card rounded-xl flex flex-col bg-white outline outline-1 outline-black/15 overflow-hidden"
                >
                  <div
                    className="h-[285px] bg-gray-200 bg-cover bg-center shrink-0"
                    style={flagshipImg ? { backgroundImage: `url('${flagshipImg}')` } : undefined}
                  />
                  <div className="flex flex-col flex-1 p-6">
                    {/* Figma: Heading/Tagline 16/150, Colour/Eastern Blue/Base. */}
                    <span className="text-base leading-[150%] uppercase text-teal-500">{f.tag}</span>
                    {/* Figma: Heading/H6 22/140, Colour/Astronaut/Base. */}
                    <h4 className="font-display text-xl md:text-[22px] md:leading-[140%] font-medium text-navy-900 mt-2 mb-3">{f.title}</h4>
                    {/* Figma: Body small Normal 14/150, Color Scheme 1/Text. */}
                    <p className="text-sm leading-[150%] text-black mb-6">{f.description}</p>
                    {f.linkLabel && (
                      <Link
                        to={f.linkUrl || '#'}
                        className="text-lg leading-[150%] text-teal-500 flex items-center gap-2 mt-auto w-fit hover:underline"
                      >
                        {f.linkLabel} <ArrowRight size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA + disclaimer — 1440x680, 64px padding, full-width disclaimer (Figma) */}
      <section className="bg-navy-900 text-white py-12 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center">
            {/* Figma: Heading/Tagline 16/150, Colour/Neutral/White. */}
            <span className="text-base leading-[150%] font-semibold uppercase text-white">Take the Next Step</span>
            <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-6">Ready to begin?</h2>
            {/* Figma: Text/Medium/Normal 18/150, Color Scheme 3/Text (white). */}
            <p className="text-lg leading-[150%] text-white mt-6">
              MMS admissions open via Maharashtra CET. M.Sc. Finance, MFM, MMM and PhD have their own cycles - check
              Admissions for current notifications.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Link
                to="/admissions"
                className="bg-sky-600 outline outline-1 outline-sky-600 hover:bg-teal-600 transition-colors text-white text-base leading-[150%] font-medium px-6 py-2.5 rounded-md flex items-center gap-3"
              >
                Apply Now <ArrowUpRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="bg-white hover:bg-gray-100 transition-colors text-ink-900 text-base leading-[150%] font-medium px-6 py-2.5 rounded-md"
              >
                Talk to a Student
              </Link>
              <Link
                to="/placements"
                className="bg-white hover:bg-gray-100 transition-colors text-ink-900 text-base leading-[150%] font-medium px-6 py-2.5 rounded-md"
              >
                Hire from SIMSREE
              </Link>
            </div>
          </div>

          {/* Figma: 1232x72 black bar, radius 0, Body Regular Normal 16/150 white. */}
          <div className="bg-ink-900 border border-black/15 rounded-2xl p-6 mt-12 lg:mt-16 text-base leading-[150%] text-white text-left">
            <strong className="text-white uppercase tracking-wide">Disclaimer</strong> · We would like to warn
            applicants about unscrupulous agencies that may put out misleading social media advertisements promising
            seats for various courses or programmes at SIMSREE. We have no agents, no middlemen, no management quota,
            no reserved seats or payment seats of any kind. Admissions for MMS are done through the State CET Cell and
            the Government of Maharashtra{' '}
            <strong className="text-white">ONLY ON MERIT BASIS.</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
