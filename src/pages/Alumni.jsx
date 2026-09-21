import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import { useAlumniPageData } from '../lib/useAlumniPageData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackAlumniPage = {
  heroEyebrow: 'Sourced from SIMAA · Updated quarterly',
  heroTitle: 'Leaders who carry the SIMSREE spirit.',
  heroDescription:
    'For four decades, SIMSREE graduates have climbed to the highest levels of banking, finance, media, consulting, entrepreneurship, and public life.',
  heroPrimaryCtaLabel: 'See the alumni network',
  heroPrimaryCtaUrl: '#directory',
  heroSecondaryCtaLabel: 'Visit the Alumni Gateway',
  heroSecondaryCtaUrl: '/alumni-portal',

  stats: [
    { label: 'Alumni Worldwide', value: '{{alumniCount}}', dark: true },
    { label: 'CXO & Senior Roles', value: '200+', dark: false },
    { label: 'Years of Legacy', value: '40+', dark: true },
    { label: 'Companies Represented', value: '120+', dark: false },
  ],

  hofEyebrow: 'Hall of Fame',
  hofTitle: 'A few who set the bar.',
  hofTitleHighlight: 'set the bar.',
  hofSubtitle:
    'From global trading floors to the corridors of policy — a snapshot of where the SIMSREE story has reached.',

  directoryEyebrow: 'Alumni Directory',
  directoryTitle: 'featured profiles',
  directorySubtitle: 'Filter by sector or search by name, company, or batch. Data curated by SIMAA.',

  testimonialEyebrow: 'In Their Own Words',
  testimonialTitle: 'What SIMSREE made of us.',
  testimonialTitleHighlight: 'made of us.',

  employersEyebrow: 'Where Our Alumni Work',
  employersTitle: "Across India's leading firms.",
  employersTitleHighlight: 'Across',
  employersSubtitle: 'A sampling of organisations SIMSREE alumni currently hold senior roles at.',

  ctaEyebrow: 'Are you a SIMSREE alumnus?',
  ctaTitle: 'Stay connected.',
  ctaTitleHighlight: 'connected.',
  ctaSubtitle:
    'Register on the Alumni Gateway · update your career milestones · attend Batchmeet · mentor a current student. We would love to feature you on this page next.',
  ctaCards: [
    {
      title: 'Alumni Gateway',
      description: 'Register · update profile · SIMAA portal · find batchmates · log milestones',
      linkLabel: 'Open gateway',
      linkUrl: '/alumni-portal',
    },
    {
      title: 'Batchmeet',
      description: 'Annual reunion · Every November at Churchgate · all batches welcome',
      linkLabel: 'View calendar',
      linkUrl: '/events',
    },
    {
      title: 'Mentor',
      description: 'Give back to the next cohort · 1:1 mentoring · live sessions · case clinics',
      linkLabel: 'Become a mentor',
      linkUrl: '/contact',
    },
  ],
};

const fallbackHallOfFame = [
  {
    tags: ['Finance', 'International'],
    quote:
      'SIMSREE taught me to read both the spreadsheet and the room. That second skill is what got me here.',
    name: 'Aarav Mehta',
    role: 'Managing Director, Global Markets',
    company: 'Barclays Capital · London',
    batch: 'MMS · Batch 2008',
  },
  {
    tags: ['Consulting', 'Partner'],
    quote:
      'Every committee I ran at Churchgate was a case study before I even read one. That muscle never went away.',
    name: 'Aditya Verma',
    role: 'Partner, Financial Services',
    company: 'McKinsey & Company · Mumbai',
    batch: 'MMS · Batch 2009',
  },
  {
    tags: ['Public Service'],
    quote:
      'The institute drilled rigour into us, and the city drilled urgency. You need both in policy.',
    name: 'Dr. Neha Gupta',
    role: 'Joint Secretary, Department of Economic Affairs',
    company: 'Ministry of Finance · Government of India',
    batch: 'MMS · Batch 2001',
  },
];

const fallbackProfiles = [
  { name: 'Priya Sharma', role: 'Chief Financial Officer', company: 'ICICI Bank · Mumbai', batch: "MFM '02", sector: 'Finance' },
  { name: 'Rohit Joshi', role: 'Executive Director, IB', company: 'Morgan Stanley · Hong Kong', batch: "MMS '11", sector: 'Finance' },
  { name: 'Ananya Kapoor', role: 'VP, Wealth Management', company: 'Citi Private Bank · Singapore', batch: "MMS '13", sector: 'Finance' },
  { name: 'Vikram Iyer', role: 'Head of Trading, APAC', company: 'Deutsche Bank · Mumbai', batch: "MMS '06", sector: 'Finance' },
  { name: 'Rishi Bhatnagar', role: 'Director, Risk', company: 'HDFC Bank · Mumbai', batch: "MFM '09", sector: 'Finance' },
  { name: 'Siddharth Rao', role: 'Senior Manager', company: 'Deloitte Consulting · Bengaluru', batch: "MMS '11", sector: 'Consulting' },
  { name: 'Pooja Desai', role: 'Director, Strategy', company: 'EY-Parthenon · Mumbai', batch: "MMM '08", sector: 'Consulting' },
  { name: 'Arjun Khanna', role: 'CEO', company: 'Star India Sports · Mumbai', batch: "MMS '03", sector: 'Media' },
  { name: 'Riya Chopra', role: 'Chief Operating Officer', company: 'Network18 · Mumbai', batch: "MMM '06", sector: 'Media' },
  { name: 'Nikhil Menon', role: 'Head of Content', company: 'Disney+ Hotstar · Mumbai', batch: "MMS '10", sector: 'Media' },
];

const fallbackEmployers = [
  { name: 'Barclays' }, { name: 'McKinsey' }, { name: 'ICICI Bank' }, { name: 'Morgan Stanley' },
  { name: 'Citi' }, { name: 'Deutsche Bank' }, { name: 'HDFC Bank' }, { name: 'Deloitte' },
  { name: 'EY-Parthenon' }, { name: 'Star India' }, { name: 'Network18' }, { name: 'Disney+ Hotstar' },
];

const fallbackVoices = [
  {
    quote:
      'The committees taught me ownership before any boardroom ever did. By the time I was running my first trading desk, the muscle memory was already there.',
    name: 'Aarav Mehta',
    meta: "MD, Barclays Capital · MMS '08",
  },
];

const SECTORS = ['All', 'Finance', 'Media', 'Entrepreneurship', 'Consulting', 'Public Sector'];

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

export default function Alumni() {
  const facts = useKeyFacts();
  const { data } = useAlumniPageData();

  const ap = fillFactsDeep({ ...fallbackAlumniPage, ...(data?.alumniPage || {}) }, facts);
  const hallOfFame = fillFactsDeep(data?.hallOfFame?.length ? data.hallOfFame : fallbackHallOfFame, facts);
  const profiles = fillFactsDeep(data?.profiles?.length ? data.profiles : fallbackProfiles, facts);
  const employers = fillFactsDeep(data?.employers?.length ? data.employers : fallbackEmployers, facts);
  const voices = data?.voices?.length
    ? data.voices.map((v) => ({ ...v, photoUrl: imgUrl(v.photo, 96) }))
    : fallbackVoices;

  const [sector, setSector] = useState('All');
  const [voiceIndex, setVoiceIndex] = useState(0);

  const visibleProfiles = sector === 'All' ? profiles : profiles.filter((p) => p.sector === sector);
  const activeVoice = voices[Math.min(voiceIndex, voices.length - 1)];
  const heroImageUrl = imgUrl(ap.heroImage, 1600);

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
        {/* Figma: linear gradient layer at 30% over the image. */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(25deg, rgba(0,0,0,0.3) 0%, rgba(51,51,51,0.3) 51%, rgba(102,102,102,0.3) 99%)',
          }}
        />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-16 pt-32 pb-12 md:pb-[72px] md:h-full flex flex-col justify-end text-white">
          {/* Figma: 425-tall content block, gap 16. */}
          <div className="flex flex-col gap-4">
            <nav className="text-sm leading-[150%] text-white/80" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white">Home</Link>
              <span className="mx-1.5">/</span>
              <Link to="/about" className="hover:text-white">About Us</Link>
              <span className="mx-1.5">/</span>
              <span className="text-white">Illustrious</span>
            </nav>
            {/* Figma: 277px rule at #FFFFFF 20%, weight 1. */}
            <div className="h-px w-[277px] bg-white/20" aria-hidden="true" />
            {/* Figma: Body medium Normal 18/150, W 504. */}
            <span className="text-lg leading-[150%] text-white">{ap.heroEyebrow}</span>
            {/* Figma: Heading/H1 72/120, H 172. */}
            <h1 className="font-display text-4xl md:text-[72px] md:leading-[120%] font-semibold max-w-[1000px]">{ap.heroTitle}</h1>
            {/* Figma: Body medium Normal 18/150, W 628. */}
            <p className="max-w-[628px] text-lg leading-[150%] text-white">{ap.heroDescription}</p>
            {/* Figma: 433 x 44 button row, gap 16. */}
            <div className="flex flex-wrap gap-4">
              <a
                href={ap.heroPrimaryCtaUrl}
                className="bg-sky-600 outline outline-1 outline-sky-600 hover:bg-teal-600 transition-colors text-white text-base leading-[150%] font-medium px-6 py-2.5 rounded-md flex items-center gap-3 w-fit"
              >
                {ap.heroPrimaryCtaLabel} <ArrowUpRight size={16} />
              </a>
              <Link
                to={ap.heroSecondaryCtaUrl}
                className="bg-white hover:bg-gray-100 transition-colors text-ink-900 text-base leading-[150%] font-medium px-6 py-2.5 rounded-md w-fit"
              >
                {ap.heroSecondaryCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1408px] mx-auto px-6 lg:px-16 py-10 lg:py-16">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {(ap.stats || []).map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Hall of Fame */}
      <section className="py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-10 lg:mb-20">
            {/* Figma: Heading/Tagline 16/150, Color Scheme 1/Text. */}
            <span className="text-base leading-[150%] font-semibold uppercase text-black">{ap.hofEyebrow}</span>
            <TitleWithHighlight
              text={ap.hofTitle}
              highlight={ap.hofTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-6"
            />
            {/* Figma: Text/Medium/Normal 18/150, 768 x 54. */}
            <p className="text-lg leading-[150%] text-black">{ap.hofSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {hallOfFame.map((h) => {
              const photo = imgUrl(h.photo, 160);
              // Figma: 414 x 363 card, gap 32, no fill.
              return (
                <div key={h._id || h.name} className="flex flex-col gap-8">
                  {/* Figma: 65x26 tags, radius 16, padding 10/4, Yellow/Alpha/10. */}
                  <div className="flex flex-wrap gap-2">
                    {(h.tags || []).map((t) => (
                      <span
                        key={t}
                        className="text-sm leading-[150%] text-black bg-[#FFDB43]/10 px-2.5 py-1 rounded-2xl"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {/* Figma: Heading/H6 22/140, Color Scheme 1/Text. */}
                  <blockquote className="font-display text-xl md:text-[22px] md:leading-[140%] text-black flex-1">
                    &ldquo;{h.quote}&rdquo;
                  </blockquote>
                  {/* Figma: Scheme 1/Border divider above the attribution. */}
                  <div className="h-px bg-black/15" aria-hidden="true" />
                  <div className="flex items-center gap-4">
                    <div
                      className="w-20 h-20 rounded-full bg-gray-200 bg-cover bg-center shrink-0"
                      style={photo ? { backgroundImage: `url('${photo}')` } : undefined}
                    />
                    <div className="min-w-0">
                      {/* Figma: Text/Large/Semi Bold 22/150, 296 x 33. */}
                      <p className="text-xl md:text-[22px] md:leading-[150%] font-semibold text-black">{h.name}</p>
                      {/* Figma: Text/Medium/Normal 18/150. */}
                      <p className="text-lg leading-[150%] text-black">{h.role}</p>
                      <p className="text-lg leading-[150%] text-black">{h.company}</p>
                      <p className="text-lg leading-[150%] text-black">{h.batch}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Alumni Directory */}
      <section id="directory" className="py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-10">
            {/* Figma: Inter Semi Bold 16/150, letter-spacing 0, Color Scheme 1/Text. */}
            <span className="text-base leading-[150%] font-semibold uppercase text-black">
              {ap.directoryEyebrow}
            </span>
            <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-6">
              <span className="text-sky-600">{profiles.length}</span> {ap.directoryTitle}
            </h2>
            {/* Figma: Text/Medium/Normal 18/150, Color Scheme 1/Text. */}
            <p className="text-lg leading-[150%] text-black">{ap.directorySubtitle}</p>
          </div>

          {/* Figma: 1280 x 45 filter bar, 32px gap; 76x45 buttons, padding 12/12. */}
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8 mb-10 lg:mb-16">
            {/* Figma: Text/Medium/Normal 18/150, Color Scheme 1/Text. */}
            <span className="text-lg leading-[150%] text-black">Filter by:</span>
            {/* Figma: 12px gap between buttons. */}
            <div className="flex flex-wrap items-center gap-3">
              {SECTORS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSector(s)}
                  className={`text-base leading-[150%] px-3 py-3 border transition-colors ${
                    sector === s
                      ? 'bg-navy-900 text-white border-navy-900'
                      : 'border-black/15 text-black hover:bg-navy-50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Figma: two rows of 284x467 cards, gap 24, 48 between rows. Each row is
              its own full-bleed scroller so they move independently. */}
          <div className="flex flex-col gap-12">
            {[visibleProfiles.slice(0, Math.ceil(visibleProfiles.length / 2)),
              visibleProfiles.slice(Math.ceil(visibleProfiles.length / 2))].map((row, ri) => (
              <div
                key={ri}
                className="w-screen relative left-1/2 -translate-x-1/2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
              <div className="flex gap-6 w-max px-6 lg:pl-20">
            {row.map((p) => {
              const photo = imgUrl(p.photo, 568);
              return (
                <div key={p._id || p.name} className="w-[284px] shrink-0 flex flex-col items-center gap-6 text-center">
                  <div
                    className="w-full h-[300px] bg-gray-200 bg-cover bg-center"
                    style={photo ? { backgroundImage: `url('${photo}')` } : undefined}
                  />
                  <div className="flex flex-col items-center gap-2">
                    {/* Figma: 72x29 tag, radius 16, padding 10/4, Astronaut/Lightest. */}
                    <span className="inline-block w-fit text-sm leading-[150%] text-navy-900 bg-navy-50 px-2.5 py-1 rounded-2xl">
                      {p.sector}
                    </span>
                    {/* Figma: Text/Regular/Semi Bold 16/150, Color Scheme 1/Text. */}
                    <p className="text-base leading-[150%] font-semibold text-black">{p.name}</p>
                    {/* Figma: Text/Small/Normal 14/150. */}
                    <p className="text-sm leading-[150%] text-black">{p.role}</p>
                    <p className="text-sm leading-[150%] text-black">{p.company}</p>
                    <p className="text-sm leading-[150%] text-black">{p.batch}</p>
                  </div>
                </div>
              );
            })}
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {/* In Their Own Words — Astronaut/Base, 64/112 padding, 80px gap (Figma) */}
      <section className="bg-navy-900 text-white py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0 flex flex-col gap-20">
          <div className="max-w-[768px] mx-auto text-center flex flex-col gap-20">
            <div>
              {/* Figma: Heading/Tagline 16/150, Colour/Neutral/White. */}
              <span className="text-base leading-[150%] font-semibold uppercase text-white">
                {ap.testimonialEyebrow}
              </span>
              <TitleWithHighlight
                text={ap.testimonialTitle}
                highlight={ap.testimonialTitleHighlight}
                className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-6"
                highlightClassName="text-teal-400"
              />
            </div>
            <div className="flex flex-col gap-8">
              {/* Figma: Heading/H4 36/130, Color Scheme 3/Text, 768 x 188. */}
              <blockquote className="font-display text-3xl md:text-[36px] md:leading-[130%] text-white">
                &ldquo;{activeVoice.quote}&rdquo;
              </blockquote>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-12 h-12 rounded-full bg-white/20 bg-cover bg-center"
                  style={activeVoice.photoUrl ? { backgroundImage: `url('${activeVoice.photoUrl}')` } : undefined}
                />
                {/* Figma: Body Regular Normal 16/150, Color Scheme 3/Text. */}
                <p className="text-base leading-[150%] text-white">{activeVoice.name}</p>
                <p className="text-base leading-[150%] text-white">{activeVoice.meta}</p>
              </div>
            </div>
          </div>

          {/* Figma: 1280 x 48 bar — dots at the left, arrows at the right. */}
          {voices.length > 1 && (
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center gap-2">
                {voices.map((v, i) => (
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
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setVoiceIndex((voiceIndex - 1 + voices.length) % voices.length)}
                  aria-label="Previous testimonial"
                  className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  onClick={() => setVoiceIndex((voiceIndex + 1) % voices.length)}
                  aria-label="Next testimonial"
                  className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Employers */}
      <section className="py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="mb-10 lg:mb-16">
            {/* Figma: Heading/Tagline 16/150, Color Scheme 1/Text, 217 x 24. */}
            <span className="text-base leading-[150%] font-semibold uppercase text-black">
              {ap.employersEyebrow}
            </span>
            <TitleWithHighlight
              text={ap.employersTitle}
              highlight={ap.employersTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-6"
            />
            {/* Figma: Text/Medium/Normal 18/150, 768 x 27. */}
            <p className="max-w-[768px] text-lg leading-[150%] text-black">{ap.employersSubtitle}</p>
          </div>
          {/* Figma: 5-column grid, 307.8 x 153 cells, gap 24, radius 5. */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {employers.map((e) => {
              const logo = imgUrl(e.logo, 616);
              return (
                <div
                  key={e._id || e.name}
                  className="h-[153px] bg-white border border-black/15 rounded-[5px] flex items-center justify-center overflow-hidden px-6"
                >
                  {logo ? (
                    <img src={logo} alt={e.name} className="max-h-16 w-auto object-contain" />
                  ) : (
                    <span className="text-base leading-[150%] text-ink-400 text-center">{e.name}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stay Connected */}
      <section className="bg-navy-800 text-white py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0 flex flex-col gap-20">
          <div className="max-w-[768px] mx-auto text-center">
            {/* Figma: Heading/Tagline 16/150, Colour/Neutral/White. */}
            <span className="text-base leading-[150%] font-semibold uppercase text-white">{ap.ctaEyebrow}</span>
            <TitleWithHighlight
              text={ap.ctaTitle}
              highlight={ap.ctaTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-6 mb-6"
              highlightClassName="text-teal-400"
            />
            {/* Figma: Text/Medium/Normal 18/150, Color Scheme 3/Text. */}
            <p className="text-lg leading-[150%] text-white">{ap.ctaSubtitle}</p>
          </div>
          {/* Figma: Astronaut/Base cards, radius 16, outside stroke, padding 32. */}
          <div className="grid md:grid-cols-3 gap-8">
            {(ap.ctaCards || []).map((c) => (
              <div
                key={c.title}
                className="bg-navy-900 outline outline-1 outline-white/20 rounded-2xl p-8 flex flex-col gap-4"
              >
                {/* Figma: Heading/H6 22/140, Colour/Neutral/White. */}
                <h4 className="font-display text-xl md:text-[22px] md:leading-[140%] font-medium text-white">{c.title}</h4>
                {/* Figma: Text/Small/Normal 14/150, Colour/Neutral/Lightest. */}
                <p className="text-sm leading-[150%] text-ink-50 flex-1">{c.description}</p>
                <Link
                  to={c.linkUrl}
                  className="text-base leading-[150%] font-medium text-white flex items-center gap-2 w-fit hover:underline"
                >
                  {c.linkLabel} <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
