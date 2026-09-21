import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import { useAlumniPortalData } from '../lib/useAlumniPortalData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackPage = {
  heroEyebrow: "SIMAA · Est. 1989 · 5,000+ members",
  heroTitle: 'Alumni Portal.',
  heroDescription:
    'Stay connected, give back, keep growing. Your official home for batchmeets, mentorship, city chapters, and everything SIMAA runs.',
  heroPrimaryCtaLabel: 'Register on Gateway',
  heroPrimaryCtaUrl: '#register',
  heroSecondaryCtaLabel: 'Browse member services',
  heroSecondaryCtaUrl: '#services',
  heroTertiaryCtaLabel: 'Find your chapter',
  heroTertiaryCtaUrl: '#chapters',

  stats: [
    { label: 'Registered Alumni', value: '{{alumniCount}}', dark: true },
    { label: 'Years of SIMAA', value: '40+', dark: false },
    { label: 'City Chapters', value: '6', dark: true },
    { label: 'Active Mentors', value: '280+', dark: false },
  ],

  calendarEyebrow: 'Upcoming for Alumni',
  calendarTitle: 'What is on the SIMAA calendar.',
  calendarTitleHighlight: 'SIMAA calendar.',
  calendarSubtitle: 'Batchmeets, sector panels, mentorship sessions — open to all registered alumni.',

  servicesEyebrow: 'SIMAA · The Official Body',
  servicesTitle: 'services for SIMSREE alumni.',
  servicesSubtitle: 'Filter by category. Every service is included with your SIMAA registration.',

  chaptersEyebrow: 'City Chapters',
  chaptersTitle: 'Find your chapter convener.',
  chaptersTitleHighlight: 'chapter convener.',
  chaptersSubtitle: 'Six active city chapters · run by elected alumni conveners on rotating two-year terms.',
  chaptersCtaLabel: 'Browse all 12 cities',
  chaptersCtaUrl: '#chapters',

  giveBackEyebrow: 'Four Ways to Give Back',
  giveBackTitle: 'Plug in. Pay it forward.',
  giveBackTitleHighlight: 'Pay it forward.',
  giveBackSubtitle:
    'Every SIMSREE alumnus has at least one of these to give: time, network, expertise, or capital.',
  giveBackCards: [
    {
      label: 'Mentor',
      title: 'Become a 1:1 mentor',
      description:
        'Senior matched with a current student. 30 minutes once a month. The most under-rated programme we run.',
      linkLabel: 'Volunteer',
      linkUrl: '/contact',
    },
    {
      label: 'Recruit',
      title: 'Hire a SIMSREE student',
      description:
        'Open hiring at your firm. Refer JDs. Connect with the Placement Committee directly.',
      linkLabel: 'Open hiring',
      linkUrl: '/placements',
    },
    {
      label: 'Speak',
      title: 'Guest lecture',
      description:
        'Go deeper on a domain. Deliver a single lecture, share industry frontline war stories, sit on a panel.',
      linkLabel: 'Apply',
      linkUrl: '/contact',
    },
    {
      label: 'Fund',
      title: 'Fund a scholarship',
      description:
        'Need-based scholarships routed via Simarthan. 100% of capital goes to the student, audited annually.',
      linkLabel: 'Contribute',
      linkUrl: '/about/simarthan',
    },
  ],

  voicesEyebrow: 'The Voices',
  voicesTitle: 'Eight talks worth your afternoon.',
  voicesSubtitle: 'A curated feed. The full library lives on YouTube @TEDxSIMSREE.',

  ctaEyebrow: 'Become a SIMAA member',
  ctaTitle: 'Register on the Gateway.',
  ctaTitleHighlight: 'Gateway.',
  ctaSubtitle:
    'Free for life. Two minutes to register. Unlocks every service on this page — events, mentorship, referrals, masterclasses, and the alumni directory.',
  ctaPrimaryLabel: 'Register now',
  ctaPrimaryUrl: '#register',
  ctaSecondaryLabel: 'Email SIMAA office',
  ctaSecondaryUrl: 'mailto:simaa@simsree.org',
  ctaFacts: [
    { value: '2 min', label: 'to register' },
    { value: '₹0', label: 'membership cost' },
    { value: '12', label: 'member services unlocked' },
  ],
  ctaContact: [
    '{{address}}',
    'simaa@simsree.org',
    '+91 22 6151 0700',
  ],
};

const fallbackEvents = [
  { day: 'Sat', date: '22', month: 'Feb 2026', category: 'Flagship', title: 'SIMAA Annual Batchmeet 2026', description: 'Cross-batch reunion · Churchgate campus · all batches welcome · drinks, panels, awards.', ctaLabel: 'RSVP' },
  { day: 'Sat', date: '08', month: 'Mar 2026', category: 'Networking · Chapter', title: 'BFSI Networking Evening · Whitefield', description: 'Open bar · 60+ alumni confirmed · SIMAA address shared on RSVP.', ctaLabel: 'RSVP' },
  { day: 'Sat', date: '02', month: 'Jun 2026', category: 'Mentorship', title: 'Mock GDPI Panel for MMS 2026 cohort', description: 'Volunteer slot · 2-hour commitment · panel materials provided.', ctaLabel: 'Volunteer' },
  { day: 'Sat', date: '14', month: 'Aug 2026', category: 'Sector · Panel', title: 'Independence-eve dinner · Khan Market', description: 'Casual evening · spouses welcome · pay reservation closes 10 Aug.', ctaLabel: 'RSVP' },
  { day: 'Sat', date: '28', month: 'Sep 2026', category: 'Sector evening', title: 'Consulting Sector Roundtable', description: 'Partners + Principals from MBB, Big Four, boutique firms · invite only.', ctaLabel: 'Apply' },
  { day: 'Sat', date: '12', month: 'Nov 2026', category: 'Recognition', title: 'Alumnus of the Year Awards', description: 'Annual recognition night · nominations close 30 Sep · black tie.', ctaLabel: 'Nominate' },
];

const fallbackServices = [
  { title: 'Annual Batchmeets', description: 'Cross-batch reunions in Mumbai, Bengaluru, Delhi, Pune, Hyderabad, Singapore. November every year.', meta: '6 cities · Free for SIMAA members', category: 'Networking' },
  { title: 'Sector Evenings', description: 'Industry-specific networking nights — BFSI, Consulting, FMCG, Media, Tech, Public Service.', meta: '6 sector tracks · 2-4 per year each', category: 'Networking' },
  { title: 'City Chapter Meetups', description: 'Hyper-local meet-ups run by city chapter conveners · monthly evenings, casual format.', meta: 'Run by chapter conveners', category: 'Networking' },
  { title: 'Referral Network', description: 'Internal job board · 120+ alumni companies post openings · referrals prioritised.', meta: 'Avg 24 open roles at any time', category: 'Careers' },
  { title: 'Resume + LinkedIn clinics', description: 'Quarterly clinics with senior alumni recruiters · feedback on profile, positioning, talking points.', meta: 'Open to MBA 15 onwards', category: 'Careers' },
  { title: 'Reverse mentoring', description: 'Younger alumni offer current-tools mentorship to senior alumni navigating digital-first transitions.', meta: 'Pairs · 60 alumni per quarter', category: 'Mentorship' },
  { title: 'Faculty Masterclasses', description: 'Faculty-led deep-dives · finance, analytics, strategy · alumni only · livestream + replay.', meta: '1 masterclass a month', category: 'Learning' },
  { title: 'Library + JSTOR access', description: 'Lifetime library card · digital JSTOR + EBSCO access · alumni log-in via Gateway.', meta: 'Lifetime · free', category: 'Learning' },
  { title: 'Mock GDPI Panels', description: 'Volunteer to sit on selection panels for the incoming cohort · 2-hour panels each Saturday in October.', meta: '120 alumni volunteers', category: 'Mentorship' },
  { title: '1:1 Student Mentorship', description: 'Sector-matched pairs · alumni mentor pairs with a current student · 30 min/month commitment.', meta: '290 active mentor pairings', category: 'Mentorship' },
  { title: 'Student Scholarships', description: 'Alumni-funded need-based scholarships · 12 students every year routed via Simarthan trust.', meta: '₹0 disbursed in 2025', category: 'Recognition' },
  { title: 'Recognition Awards', description: 'Alumni-funded student of the year, best assembly, and research thesis awards.', meta: 'Awarded · Convocation Day', category: 'Recognition' },
];

const fallbackChapters = [
  { city: 'Mumbai', memberCount: '2,400+ alumni', convener: "Convener · Karan Mehta · MMS '09", meetInfo: 'Next meetup · 14 Feb 2026 · Bandra Kurla Complex' },
  { city: 'Bengaluru', memberCount: '1,400+ alumni', convener: "Convener · Nisha Rao · MMS '12", meetInfo: 'Next meetup · 08 Mar 2026 · Whitefield' },
  { city: 'Delhi NCR', memberCount: '1,100+ alumni', convener: "Convener · Aditya Nair · MFM '10", meetInfo: 'Next meetup · 14 Aug 2026 · Khan Market' },
  { city: 'Pune', memberCount: '550+ alumni', convener: "Convener · Sneha Kulkarni · MMM '14", meetInfo: 'Next meetup · 21 Jun 2026 · Koregaon Park' },
  { city: 'Hyderabad', memberCount: '480+ alumni', convener: "Convener · Rahul Iyer · MMS '11", meetInfo: 'Next meetup · 05 Jul 2026 · HITEC City' },
  { city: 'Singapore', memberCount: '180+ alumni', convener: "Convener · Priya Menon · MMS '08", meetInfo: 'Next meetup · 19 Sep 2026 · Raffles Place' },
];

const fallbackTalks = [
  { name: 'Kavya Singh', tag: 'Founder · Funding', meta: "MMS '15 · 21 minutes", description: 'Fintech closed its Series A · R&D vs led by Lightbox · grateful to the SIMSREE network for early intros.' },
  { name: 'Rohit Joshi', tag: 'Founder · Funding', meta: "MMS '11 · 18 minutes", description: 'Fintech closed its Series A · R&D vs led by Lightbox · grateful to the SIMSREE network for early intros.' },
  { name: 'Sneha Patel', tag: 'Founder · Funding', meta: "MMS '13 · 24 minutes", description: 'Fintech closed its Series A · R&D vs led by Lightbox · grateful to the SIMSREE network for early intros.' },
  { name: 'Ishaan Modi', tag: 'Founder · Funding', meta: "MMS '16 · 19 minutes", description: 'Fintech closed its Series A · R&D vs led by Lightbox · grateful to the SIMSREE network for early intros.' },
];

const SERVICE_CATEGORIES = ['All', 'Networking', 'Mentorship', 'Learning', 'Recognition', 'Careers'];

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

export default function AlumniPortal() {
  const facts = useKeyFacts();
  const { data } = useAlumniPortalData();

  const pp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const events = fillFactsDeep(data?.events?.length ? data.events : fallbackEvents, facts);
  const services = fillFactsDeep(data?.services?.length ? data.services : fallbackServices, facts);
  const chapters = fillFactsDeep(data?.chapters?.length ? data.chapters : fallbackChapters, facts);
  const talks = fillFactsDeep(data?.talks?.length ? data.talks : fallbackTalks, facts);

  const [category, setCategory] = useState('All');
  const visibleServices =
    category === 'All' ? services : services.filter((s) => s.category === category);

  const heroImageUrl = imgUrl(pp.heroImage, 1600);

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
          <div className="text-xs text-white/70 mb-6">
            <Link to="/about" className="hover:text-white">About Us</Link>
            <span className="mx-1.5">/</span>
            <span>Alumni Portal</span>
          </div>
          <span className="inline-block w-fit bg-navy-900 text-white text-[18px] leading-[150%] px-4 py-2.5 rounded-full mb-9">
            {pp.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3">{pp.heroTitle}</h1>
          <p className="max-w-xl text-white/85 mb-9">{pp.heroDescription}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={pp.heroPrimaryCtaUrl}
              className="bg-sky-600 hover:bg-teal-600 transition-colors text-white font-medium px-5 py-3 rounded-md flex items-center gap-2 w-fit"
            >
              {pp.heroPrimaryCtaLabel} <ArrowUpRight size={16} />
            </a>
            <a
              href={pp.heroSecondaryCtaUrl}
              className="bg-white hover:bg-gray-100 transition-colors text-navy-900 font-medium px-5 py-3 rounded-md w-fit"
            >
              {pp.heroSecondaryCtaLabel}
            </a>
            <a
              href={pp.heroTertiaryCtaUrl}
              className="border border-white/40 hover:bg-white/10 transition-colors text-white font-medium px-5 py-3 rounded-md w-fit"
            >
              {pp.heroTertiaryCtaLabel}
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1408px] mx-auto px-6 lg:px-16 py-10 lg:py-16">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {(pp.stats || []).map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* SIMAA Calendar */}
      <section className="py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-10 lg:mb-20">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {pp.calendarEyebrow}
            </span>
            <TitleWithHighlight
              text={pp.calendarTitle}
              highlight={pp.calendarTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-6"
            />
            <p className="text-sm text-ink-600">{pp.calendarSubtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {events.map((e) => (
              <div key={e._id || e.title} className="flex flex-col">
                <div className="bg-navy-900 text-white rounded-xl py-4 flex flex-col items-center mb-4">
                  <span className="text-[11px]">{e.day}</span>
                  <span className="text-2xl font-display font-semibold leading-tight">{e.date}</span>
                  <span className="text-[10px] uppercase tracking-wide">{e.month}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wide text-sky-600 font-semibold mb-1">
                  {e.category}
                </span>
                <p className="text-sm font-semibold text-navy-900">{e.title}</p>
                <p className="text-xs text-ink-600 mt-1 mb-3">{e.description}</p>
                {e.ctaLabel && (
                  <a
                    href={e.ctaUrl || '#'}
                    className="text-xs font-medium text-navy-900 flex items-center gap-1 w-fit mt-auto"
                  >
                    {e.ctaLabel} <ArrowRight size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {pp.servicesEyebrow}
            </span>
            <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-6">
              <span className="text-sky-600">{services.length}</span> {pp.servicesTitle}
            </h2>
            <p className="text-sm text-ink-600">{pp.servicesSubtitle}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 lg:mb-16">
            <span className="text-xs font-medium text-ink-600 mr-2">Filter by</span>
            {SERVICE_CATEGORIES.map((c) => (
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visibleServices.map((s) => {
              const img = imgUrl(s.image, 500);
              return (
                <div
                  key={s._id || s.title}
                  className="flex flex-col bg-white border border-navy-100 rounded-xl overflow-hidden"
                >
                  <div
                    className="h-40 bg-gray-200 bg-cover bg-center shrink-0"
                    style={img ? { backgroundImage: `url('${img}')` } : undefined}
                  />
                  <div className="flex flex-col flex-1 p-5">
                    <span className="text-[10px] uppercase tracking-wide text-sky-600 font-semibold">
                      {s.category}
                    </span>
                    <h4 className="font-display text-lg font-semibold text-navy-900 mt-1 mb-2">
                      {s.title}
                    </h4>
                    <p className="text-[13px] leading-relaxed text-ink-600 mb-3">{s.description}</p>
                    {s.meta && <p className="text-xs text-ink-400 mt-auto">{s.meta}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* City Chapters */}
      <section id="chapters" className="py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-10 lg:mb-20">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {pp.chaptersEyebrow}
            </span>
            <TitleWithHighlight
              text={pp.chaptersTitle}
              highlight={pp.chaptersTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-6"
            />
            <p className="text-sm text-ink-600">{pp.chaptersSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {chapters.map((c) => {
              const img = imgUrl(c.image, 600);
              return (
                <div
                  key={c._id || c.city}
                  className="relative h-64 rounded-xl overflow-hidden bg-gray-200 bg-cover bg-center"
                  style={img ? { backgroundImage: `url('${img}')` } : undefined}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-5 text-white">
                    {c.memberCount && (
                      <span className="absolute top-4 left-4 text-[10px] font-semibold bg-white/20 backdrop-blur px-2.5 py-1 rounded-full">
                        {c.memberCount}
                      </span>
                    )}
                    <p className="font-display text-xl font-semibold">{c.city}</p>
                    <p className="text-xs text-white/80 mt-1">{c.convener}</p>
                    <p className="text-xs text-white/60 mt-0.5">{c.meetInfo}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {pp.chaptersCtaLabel && (
            <div className="text-center mt-10 lg:mt-16">
              <a
                href={pp.chaptersCtaUrl || '#'}
                className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md"
              >
                {pp.chaptersCtaLabel} <ArrowRight size={14} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Give Back */}
      <section className="bg-navy-900 text-white py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-10 lg:mb-20">
            <span className="text-xs font-semibold tracking-widest uppercase text-white/70">
              {pp.giveBackEyebrow}
            </span>
            <TitleWithHighlight
              text={pp.giveBackTitle}
              highlight={pp.giveBackTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-6 mb-6"
              highlightClassName="text-teal-400"
            />
            <p className="text-sm text-white/80">{pp.giveBackSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {(pp.giveBackCards || []).map((c) => (
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

      {/* The Voices */}
      <section className="py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-10 lg:mb-20">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {pp.voicesEyebrow}
            </span>
            <TitleWithHighlight
              text={pp.voicesTitle}
              highlight={pp.voicesTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-6"
            />
            <p className="text-sm text-ink-600">{pp.voicesSubtitle}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {talks.map((t) => {
              const img = imgUrl(t.image, 500);
              return (
                <div key={t._id || t.name} className="flex flex-col">
                  <div
                    className="h-64 bg-gray-200 rounded-xl bg-cover bg-center mb-4"
                    style={img ? { backgroundImage: `url('${img}')` } : undefined}
                  />
                  <span className="text-[10px] uppercase tracking-wide text-sky-600 font-semibold">
                    {t.tag}
                  </span>
                  <p className="text-sm font-semibold text-navy-900 mt-1">{t.name}</p>
                  <p className="text-xs text-ink-400 mt-0.5">{t.meta}</p>
                  <p className="text-xs text-ink-600 mt-2">{t.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Register CTA */}
      <section id="register" className="bg-navy-800 text-white py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0 grid lg:grid-cols-2 gap-10 lg:gap-20">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-white/70">
              {pp.ctaEyebrow}
            </span>
            <TitleWithHighlight
              text={pp.ctaTitle}
              highlight={pp.ctaTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-6 mb-6"
              highlightClassName="text-teal-400"
            />
            <p className="text-sm text-white/80 mb-8">{pp.ctaSubtitle}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={pp.ctaPrimaryUrl || '#'}
                className="bg-sky-600 hover:bg-teal-600 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md"
              >
                {pp.ctaPrimaryLabel}
              </a>
              <a
                href={pp.ctaSecondaryUrl || '#'}
                className="border border-white/30 hover:bg-white/10 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md"
              >
                {pp.ctaSecondaryLabel}
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-3 gap-6">
              {(pp.ctaFacts || []).map((f) => (
                <div key={f.label}>
                  <div className="font-display text-2xl font-semibold">{f.value}</div>
                  <p className="text-xs text-white/70 mt-1">{f.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 border-t border-white/20 pt-6">
              {(pp.ctaContact || []).map((line) => (
                <p key={line} className="text-sm text-white/80">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
