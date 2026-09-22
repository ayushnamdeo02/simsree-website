import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { StatGrid } from '../components/StatCard';
import PageHero from '../components/PageHero';
import { Section, SectionTitle, H6 } from '../components/ui';
import { useAlumniPageData } from '../lib/useAlumniPageData';
import { urlFor } from '../lib/sanity';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
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
    "Register on the Alumni Gateway · update your career milestones · attend Batchmeet · mentor a current student. We'd love to feature you on this page next.",
  ctaCards: [
    {
      title: 'Alumni Gateway',
      description: 'Register / update profile\nSIMAA portal · find batchmates · log milestones',
      linkLabel: 'Open gateway',
      linkUrl: '/alumni-portal',
    },
    {
      title: 'Batchmeet',
      description: 'Annual reunion\nEvery November at Churchgate · all batches welcome',
      linkLabel: 'View calendar',
      linkUrl: '/events',
    },
    {
      title: 'Mentor',
      description: 'Give back to the next cohort\n1:1 mentoring · live sessions · case clinics',
      linkLabel: 'Become a mentor',
      linkUrl: '/contact',
    },
  ],
};

const fallbackHallOfFame = [
  {
    tags: ['Finance', 'International'],
    quote: 'SIMSREE taught me to read both the spreadsheet and the room. That second skill is what got me here.',
    name: 'Aarav Mehta',
    role: 'Managing Director, Global Markets',
    company: 'Barclays Capital · London',
    batch: 'MMS · Batch 2008',
    photo: '/images/alumni/hof-1.webp',
  },
  {
    tags: ['Consulting', 'Partner'],
    quote: "Every committee I ran at Churchgate was a case study before I'd even read one. That muscle never went away.",
    name: 'Aditya Verma',
    role: 'Partner, Financial Services',
    company: 'McKinsey & Company · Mumbai',
    batch: 'MMS · Batch 2009',
    photo: '/images/alumni/hof-2.webp',
  },
  {
    tags: ['Public Service', 'IAS'],
    quote: 'The institute drilled rigour into us, and the city drilled urgency. You need both in policy.',
    name: 'Dr. Neha Gupta',
    role: 'Joint Secretary,\nDepartment of Economic Affairs',
    company: 'Ministry of Finance · Government of India',
    batch: 'MMS · Batch 2001',
    photo: '/images/alumni/hof-3.webp',
  },
];

// The 24 profiles and photos from the Figma directory, in its order.
const fallbackProfiles = [
  ['Aarav Mehta', 'MD, Global Markets', 'Barclays · London', "MMS '08", 'Finance'],
  ['Priya Sharma', 'Chief Financial Officer', 'ICICI Bank · Mumbai', "MFM '02", 'Finance'],
  ['Rohit Joshi', 'Executive Director, IB', 'Morgan Stanley · Hong Kong', "MMS '11", 'Finance'],
  ['Ananya Kapoor', 'VP, Wealth Management', 'Citi Private Bank · Singapore', "MMS '13", 'Finance'],
  ['Vikram Iyer', 'Head of Trading, APAC', 'Deutsche Bank · Mumbai', "MMS '06", 'Finance'],
  ['Rishi Bhatnagar', 'Director, Risk', 'HDFC Bank · Mumbai', "MFM '09", 'Finance'],
  ['Sneha Patel', 'Chief Marketing Officer', 'Hindustan Unilever · Mumbai', "MMM '10", 'Marketing'],
  ['Karthik Rao', 'Brand Director, Asia', 'Procter & Gamble · Singapore', "MMM '07", 'Marketing'],
  ['Tanvi Sharma', 'VP Marketing', 'Nestlé India · Gurugram', "MMS '12", 'Marketing'],
  ['Rajesh Kulkarni', 'Head, Consumer Insights', 'Godrej Group · Mumbai', "MMM '04", 'Marketing'],
  ['Aditya Verma', 'Partner, Financial Services', 'McKinsey & Co · Mumbai', "MMS '09", 'Consulting'],
  ['Meera Nair', 'Principal', 'BCG · Mumbai', "MMS '14", 'Consulting'],
  ['Siddharth Rao', 'Senior Manager', 'Deloitte Consulting · Bengaluru', "MMS '11", 'Consulting'],
  ['Pooja Desai', 'Director, Strategy', 'EY-Parthenon · Mumbai', "MMM '08", 'Consulting'],
  ['Arjun Khanna', 'CEO', 'Star India Sports · Mumbai', "MMS '03", 'Media'],
  ['Riya Chopra', 'Chief Operating Officer', 'Network18 · Mumbai', "MMM '06", 'Media'],
  ['Nikhil Banerjee', 'Head of Content Strategy', 'Disney+ Hotstar · Mumbai', "MMS '12", 'Media'],
  ['Kavya Singh', 'Co-founder & CEO', 'FinSure (fintech) · Bengaluru', "MMS '15", 'Entrepreneurship'],
  ['Aryan Saxena', 'Founder', 'GreenLogic Ventures · Pune', "MMM '10", 'Entrepreneurship'],
  ['Ishaan Modi', 'Co-founder', 'Numara Health · Mumbai', "MMS '17", 'Entrepreneurship'],
  ['Dr. Neha Gupta', 'IAS · Joint Secretary', 'Ministry of Finance · New Delhi', "MMS '01", 'Public Sector'],
  ['Capt. Manoj Pandey', 'Director, Investments', 'National Investment & Infra Fund', "MFM '99", 'Public Sector'],
  ['Aman Khurana', 'Partner, Tax Advisory', 'KPMG India · Mumbai', "MMS '10", 'Consulting'],
  ['Pranav Iyer', 'CEO', 'Brick & Beam Realty Advisors', "MMS '08", 'Entrepreneurship'],
].map(([name, role, company, batch, sector], i) => ({
  name,
  role,
  company,
  batch,
  sector,
  photo: `/images/alumni/profile-${String(i + 1).padStart(2, '0')}.webp`,
}));

const fallbackEmployers = [
  { name: 'Barclays' }, { name: 'McKinsey' }, { name: 'ICICI Bank' }, { name: 'Morgan Stanley' },
  { name: 'Citi' }, { name: 'Deutsche Bank' }, { name: 'HDFC Bank' }, { name: 'Deloitte' },
  { name: 'EY-Parthenon' }, { name: 'Star India' }, { name: 'Network18' }, { name: 'Disney+ Hotstar' },
  { name: 'Hindustan Unilever' }, { name: 'Procter & Gamble' }, { name: 'BCG' }, { name: 'KPMG' },
];

// An alumnus's voice (Figma), not the student voices used on the Home page.
const fallbackVoices = [
  {
    quote:
      'The committees taught me ownership before any boardroom ever did. By the time I was running my first trading desk, the muscle memory was already there.',
    name: 'Aarav Mehta',
    meta: "MD, Barclays Capital · MMS '08",
    photoUrl: '/images/alumni/voice-1.webp',
  },
];

const SECTORS = ['All', 'Finance', 'Media', 'Entrepreneurship', 'Consulting', 'Public Sector'];

function imgUrl(image, width) {
  if (!image) return undefined;
  if (typeof image === 'string') return image;
  try {
    return urlFor(image).width(width).auto('format').url();
  } catch {
    return undefined;
  }
}

// Figma "Card" in the directory: 284 wide, 284 square photo, 24 gap, then a
// centred tag (#eaeaf1), Inter SemiBold 22/150 name and 18/150 details.
function ProfileCard({ p }) {
  const photo = imgUrl(p.photo, 568);
  return (
    <div className="w-[284px] shrink-0 flex flex-col items-center gap-6 text-center">
      <div
        className="w-full h-[284px] bg-navy-50 bg-cover bg-center"
        style={photo ? { backgroundImage: `url('${photo}')` } : undefined}
      />
      <div className="flex flex-col items-center gap-4">
        <span className="w-fit px-2.5 py-1 rounded-2xl bg-navy-50 text-navy-900 text-sm leading-[150%]">{p.sector}</span>
        <div className="text-black">
          <p className="text-[22px] leading-[150%] font-semibold">{p.name}</p>
          <p className="text-lg leading-[150%]">{p.role}</p>
          <p className="text-lg leading-[150%]">{p.company}</p>
          <p className="text-lg leading-[150%]">{p.batch}</p>
        </div>
      </div>
    </div>
  );
}

// One directory row: a full-bleed horizontal scroller. Figma lets the rows run
// off both edges; the first card starts at x = -405 on the 1440 frame, so the
// scroller opens scrolled to that position.
function ProfileRow({ profiles, offset }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (el && window.innerWidth >= 1024) el.scrollLeft = offset;
  }, [offset, profiles.length]);
  return (
    <div ref={ref} className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-12 w-max px-5">
        {profiles.map((p, i) => (
          <ProfileCard key={p._id || `${p.name}-${i}`} p={p} />
        ))}
      </div>
    </div>
  );
}

// Slider controls — Figma: 8px dots 8 apart; 48px white square arrows, radius 4.
function SliderBar({ count, index, onChange, dark = false }) {
  return (
    <div className="flex items-center justify-between h-12">
      <div className="flex items-center gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            aria-label={`Show item ${i + 1}`}
            className={`w-2 h-2 rounded-full ${
              dark ? (i === index ? 'bg-white' : 'bg-white/20') : i === index ? 'bg-black' : 'bg-black/20'
            }`}
          />
        ))}
      </div>
      <div className="flex items-center gap-4">
        {[
          { Icon: ArrowLeft, label: 'Previous', to: index - 1 },
          { Icon: ArrowRight, label: 'Next', to: index + 1 },
        ].map(({ Icon, label, to }) => (
          <button
            key={label}
            onClick={() => onChange((to + count) % count)}
            aria-label={label}
            className="w-12 h-12 rounded bg-white text-black outline outline-1 -outline-offset-1 outline-black/20 flex items-center justify-center hover:bg-navy-50 transition-colors"
          >
            <Icon size={24} strokeWidth={1.5} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Alumni() {
  const facts = useKeyFacts();
  const { data } = useAlumniPageData();

  const ap = fillFactsDeep({ ...fallbackAlumniPage, ...(data?.alumniPage || {}) }, facts);
  const hallOfFame = fillFactsDeep(data?.hallOfFame?.length ? data.hallOfFame : fallbackHallOfFame, facts);
  const profiles = fillFactsDeep(data?.profiles?.length ? data.profiles : fallbackProfiles, facts);
  const employers = fillFactsDeep(data?.employers?.length ? data.employers : fallbackEmployers, facts);
  const voices = fallbackVoices;

  const [sector, setSector] = useState('All');
  const [voiceIndex, setVoiceIndex] = useState(0);

  const visibleProfiles = sector === 'All' ? profiles : profiles.filter((p) => p.sector === sector);
  const half = Math.ceil(visibleProfiles.length / 2);
  const activeVoice = voices[Math.min(voiceIndex, voices.length - 1)];

  return (
    <div>
      <PageHero
        image={heroImage(ap.heroImage, '/images/alumni/hero.webp')}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About Us', to: '/about' }, { label: 'Illustrious' }]}
        eyebrow={ap.heroEyebrow}
        title={ap.heroTitle}
        titleWidth={900}
        description={ap.heroDescription}
        descriptionWidth={628}
        actions={[
          { label: ap.heroPrimaryCtaLabel, href: ap.heroPrimaryCtaUrl, primary: true },
          { label: ap.heroSecondaryCtaLabel, to: ap.heroSecondaryCtaUrl },
        ]}
        mobileOverlay="gradient-tint"
      />

      <section className="px-5 py-16 md:p-16">
        <StatGrid stats={ap.stats} />
      </section>

      {/* Hall of Fame — Figma "Testimonial / 12 /": centred title (teal), three 414
          columns: yellow-tint tags, H6 22 quote, hairline, 96px avatar with
          Inter SemiBold 22/150 name over 14/150 details. */}
      <Section width={1280}>
        <SectionTitle
          center
          tagline={ap.hofEyebrow}
          title={composeTitle(ap.hofTitle, ap.hofTitleHighlight)}
          highlight={ap.hofTitleHighlight}
          body={ap.hofSubtitle}
        />
        <div className="mt-20 grid md:grid-cols-3 gap-12 md:gap-5">
          {hallOfFame.map((h) => {
            const photo = imgUrl(h.photo, 192);
            return (
              <figure key={h._id || h.name} className="flex flex-col gap-8">
                <div className="flex flex-wrap gap-2">
                  {(h.tags || []).map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-2xl bg-[#fffbec] text-navy-900 text-xs leading-[150%]">
                      {t}
                    </span>
                  ))}
                </div>
                <blockquote className="flex-1 font-display font-medium text-[22px] leading-[140%] tracking-[-0.01em] text-black">
                  &ldquo;{h.quote}&rdquo;
                </blockquote>
                <div className="h-px bg-black/20 md:mr-4" aria-hidden="true" />
                <figcaption className="flex gap-4">
                  <div
                    className="w-24 h-24 rounded-full bg-navy-50 bg-cover bg-center shrink-0"
                    style={photo ? { backgroundImage: `url('${photo}')` } : undefined}
                  />
                  <div className="text-black">
                    <p className="text-[22px] leading-[150%] font-semibold">{h.name}</p>
                    <p className="text-sm leading-[150%] whitespace-pre-line">{h.role}</p>
                    <p className="text-sm leading-[150%]">{h.company}</p>
                    <p className="text-sm leading-[150%]">{h.batch}</p>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Section>

      {/* Directory — centred title with the count in teal, 45px filter buttons,
          then two full-bleed rows of 284 cards, 48 apart. */}
      <section id="directory" className="py-16 md:py-28 overflow-hidden">
        <div className="px-5 md:px-20">
          <SectionTitle
            center
            width={1280}
            tagline={ap.directoryEyebrow}
            title={`${profiles.length} ${ap.directoryTitle}`}
            highlight={String(profiles.length)}
            body={ap.directorySubtitle}
          />
          <div className="mt-20 flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <span className="text-base leading-[150%] font-semibold text-[#292929]">Filter by:</span>
            <div className="flex flex-wrap items-center gap-3">
              {SECTORS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSector(s)}
                  className={`h-[45px] px-3 text-sm leading-[150%] outline outline-1 -outline-offset-1 outline-black/20 transition-colors ${
                    sector === s ? 'bg-navy-900 text-hero' : 'bg-white text-black hover:bg-navy-50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-12">
          <ProfileRow profiles={visibleProfiles.slice(0, half)} offset={425} />
          {visibleProfiles.length > half && <ProfileRow profiles={visibleProfiles.slice(half)} offset={20} />}
        </div>
      </section>

      {/* In their own words — navy, centred title, H4 36 quote, 96px avatar,
          dots + arrows bar across the 1280 container. */}
      <Section bg="bg-navy-900" width={1280} className="text-white">
        <SectionTitle
          center
          dark
          tagline={ap.testimonialEyebrow}
          title={composeTitle(ap.testimonialTitle, ap.testimonialTitleHighlight)}
          highlight={ap.testimonialTitleHighlight}
          titleClass="text-white [&_span]:text-teal-400"
        />
        <figure className="mt-20 max-w-[768px] mx-auto flex flex-col items-center gap-8 text-center">
          <blockquote className="font-display font-medium text-[28px] leading-[140%] md:text-[36px] md:leading-[130%] tracking-[-0.01em]">
            &ldquo;{activeVoice.quote}&rdquo;
          </blockquote>
          <figcaption className="flex flex-col items-center gap-4">
            <div
              className="w-24 h-24 rounded-full bg-white/20 bg-cover bg-center"
              style={activeVoice.photoUrl ? { backgroundImage: `url('${activeVoice.photoUrl}')` } : undefined}
            />
            <div>
              <H6 as="p" className="text-white">
                {activeVoice.name}
              </H6>
              <p className="text-base leading-[150%]">{activeVoice.meta}</p>
            </div>
          </figcaption>
        </figure>
        <div className="mt-20">
          <SliderBar count={voices.length} index={voiceIndex} onChange={setVoiceIndex} dark />
        </div>
      </Section>

      {/* Where our alumni work — left title; Figma lays logos in 308x153 cells,
          5 per row with 24/24 gaps, no borders. Names stand in until logos are set. */}
      <Section width={1280}>
        <SectionTitle
          tagline={ap.employersEyebrow}
          title={composeTitle(ap.employersTitle, ap.employersTitleHighlight)}
          highlight={ap.employersTitleHighlight}
          body={ap.employersSubtitle}
        />
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {employers.map((e) => {
            const logo = imgUrl(e.logo, 400);
            return (
              <div key={e._id || e.name} className="h-[153px] rounded-[5px] bg-white flex items-center justify-center p-6">
                {logo ? (
                  <img src={logo} alt={e.name} className="max-h-20 max-w-full object-contain" />
                ) : (
                  <span className="font-display font-medium text-[28px] leading-[140%] tracking-[-0.01em] text-navy-900 text-center">
                    {e.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* Stay connected — #24295c, centred title, three 405 navy cards. */}
      <Section bg="bg-navy-800" width={1280} className="border-t border-white/20">
        <SectionTitle
          center
          dark
          tagline={ap.ctaEyebrow}
          title={composeTitle(ap.ctaTitle, ap.ctaTitleHighlight)}
          highlight={ap.ctaTitleHighlight}
          body={ap.ctaSubtitle}
          titleClass="text-white [&_span]:text-teal-400"
        />
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {(ap.ctaCards || []).map((c) => (
            <div
              key={c.title}
              className="flex flex-col justify-center gap-4 p-8 rounded-2xl bg-navy-900 text-white outline outline-1 -outline-offset-1 outline-white/20 shadow-small"
            >
              <div className="flex flex-col gap-2">
                <H6 as="h3" className="text-white">
                  {c.title}
                </H6>
                <p className="text-sm leading-[150%] text-ink-50 whitespace-pre-line">{c.description}</p>
              </div>
              <Link to={c.linkUrl} className="flex items-center gap-2 w-fit text-sm leading-[150%] hover:underline underline-offset-2">
                {c.linkLabel} <ArrowRight size={24} strokeWidth={1.5} />
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
