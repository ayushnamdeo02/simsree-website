import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { useCampusPageData } from '../lib/useCampusPageData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackCampusPage = {
  heroEyebrow: 'Campus Life · A SIMSREE Story',
  heroTitle: "It's not a building.",
  heroTitleLine2: "It's a rhythm.",
  heroSubtitle: 'A day inside the SIMSREE campus at Churchgate — Room by room, hour by hour.',

  numbersEyebrow: 'The Numbers',
  numbersTitle: 'A campus that punches above its postcode.',
  numbersTitleHighlight: 'above its',
  numbersBody: 'SIMSREE sits inside a 1936 heritage block of Sydenham College — 2.4 acres in Churchgate, walking distance from the BSE, NSE, RBI, and the head offices of half the Nifty 50.',
  numbersStats: [
    { value: '1983', label: 'Founded' },
    { value: '2.4ac', label: 'Campus' },
    { value: '9', label: 'Facilities' },
    { value: '5min', label: 'To BSE' },
  ],

  facilitiesEyebrow: 'The Facilities',
  facilitiesTitle: 'Nine spaces, each one a different mode.',
  facilitiesTitleHighlight: 'each one a',

  testimonialsEyebrow: 'In Their Words',
  testimonialsTitle: 'What the cohort actually remembers.',
  testimonialsTitleHighlight: 'actually',

  ctaEyebrow: 'Plan Your Visit',
  ctaTitle: 'See it for yourself.',
  ctaSubtitle: 'Campus tours run every Saturday during admission season. 30-minute slots.',
  ctaPrimaryLabel: 'Schedule a campus tour',
  ctaPrimaryUrl: '/contact',
  ctaSecondaryLabel: 'Apply to MMS',
  ctaSecondaryUrl: '/admissions/mms',
};

const fallbackFeatures = [
  {
    number: '01',
    title: 'Inside the financial mile.',
    body: "The placement committee doesn't just schedule interviews — they'll walk a recruiter's exec 4 minutes from B-Road, Churchgate, to the Nifty area, then the NSE, BSE within 10 minutes on foot.\n\nThat isn't a backdrop. It's the curriculum. Monday-night live briefs from the CFO who walked over from Nariman Point come from a case study that's still fresh from the boardroom.",
  },
  {
    number: '02',
    title: 'A 1936 heritage block.',
    body: 'SIMSREE shares its building with Sydenham College of Commerce — India\'s oldest heritage college, built 1873 and standing since 1936. Grade II heritage listing. Stone facades, arches, mosaic flooring, four riveted ceilings.\n\nThe 2.4-acre campus is fully walkable in 8 minutes. Inside: 14 classrooms, ten seminar rooms, a library, the placement floor, three labs, two canteens.',
  },
  {
    number: '03',
    title: 'Five minutes to the sea.',
    body: "Walk out the back gate, cross one signal, and you're at the Queen's Necklace — three kilometres of unbroken Arabian Sea promenade, 6am runs, 11pm walks. The commonplace chamber of SIMSREE.\n\nApproximately every successive piece of student work since {{foundedYear}} has cited a class discussion that took shape on that promenade.",
  },
];

const fallbackFacilities = [
  { title: 'The Library.', description: '32,000 volumes · 240 journal subscriptions · Bloomberg + Refinitiv terminals · open till midnight during placement season. Quiet wing and the loud, group-discussion wing on the west side.' },
  { title: 'The Auditorium.', description: '320-seat heritage auditorium with original 1936 acoustic geometry. Hosts the Wednesday guest lecture, every TEDxSIMSREE edition, and the annual Simerations finals.' },
  { title: 'The Labs.', description: 'Three labs: a 60-seat trading lab with Bloomberg feeds, a marketing analytics lab with Tableau + Power BI licences, and an operations lab with simulation software for supply-chain modelling.' },
  { title: 'The Canteen.', description: "Run by the original family that's served Sydenham since 1962. Cutting chai at ₹10, the single most-cited memory of SIMSREE's information network." },
  { title: 'The Courtyard.', description: 'Open central courtyard with banyan trees, stone benches, and old ironwork everywhere. Where committee meets meet and impromptu strategy debates happen between class, before registration.' },
];

const fallbackTestimonials = [
  { quote: 'The smell of the library at open during placement season. The wood, the old books, the rain through the broken window. I still miss it.', name: 'Tanmay Thomare', meta: 'MMS · Batch 2022' },
  { quote: "You can be a good lecturer with a CXO at 3pm and at the BSE for a live market visit at 4pm. That's the school's magic.", name: 'Priya Kadam', meta: 'MFM · Batch 2023' },
  { quote: 'The canteen has fed every Sydenham batch since ninety-two. There\'s a metaphor in there about tradition that changes without losing itself.', name: 'Anusha Rao', meta: 'MMS · Batch 2024' },
];

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
  const before = text.slice(0, idx);
  const after = text.slice(idx + highlight.length);
  return (
    <h2 className={className}>
      {before}
      <span className={highlightClassName}>{highlight}</span>
      {after}
    </h2>
  );
}

function TestimonialCarousel({ testimonials }) {
  const [index, setIndex] = useState(0);
  const pageCount = Math.ceil(testimonials.length / 3);
  const page = Math.min(index, pageCount - 1);
  const visible = testimonials.slice(page * 3, page * 3 + 3);

  const goTo = (i) => setIndex(((i % pageCount) + pageCount) % pageCount);

  return (
    <div>
      {/* Figma: 426.67 x 285 quote blocks, gap 32, 48px bottom padding, no fill. */}
      <div className="grid md:grid-cols-3 gap-8">
        {visible.map((t) => {
          const photo = imgUrl(t.photo, 112);
          return (
            <div key={t._id || t.name} className="flex flex-col gap-8 pb-12">
              {/* Figma: Heading/H6 22/140, Color Scheme 1/Text. */}
              <p className="font-display text-xl md:text-[22px] md:leading-[140%] text-black flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              {/* Figma: Scheme 1/Border divider above the attribution. */}
              <div className="h-px bg-black/15" aria-hidden="true" />
              {/* Figma: 317 x 66 attribution, 16px gap. */}
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full bg-gray-200 bg-cover bg-center shrink-0"
                  style={photo ? { backgroundImage: `url('${photo}')` } : undefined}
                />
                <div>
                  <p className="text-lg leading-[150%] font-semibold text-black">{t.name}</p>
                  <p className="text-base leading-[150%] text-black">{t.meta}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Figma: 1280 x 48 bar — dots at the left, arrows at the right. */}
      {pageCount > 1 && (
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial page ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${i === page ? 'bg-black' : 'bg-black/20'}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => goTo(page - 1)}
              aria-label="Previous testimonials"
              className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={18} className="text-black" />
            </button>
            <button
              onClick={() => goTo(page + 1)}
              aria-label="Next testimonials"
              className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ArrowRight size={18} className="text-black" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CampusLife() {
  const facts = useKeyFacts();
  const { data } = useCampusPageData();

  const cp = fillFactsDeep({ ...fallbackCampusPage, ...(data?.campusPage || {}) }, facts);
  const features = fillFactsDeep(data?.features?.length ? data.features : fallbackFeatures, facts);
  const facilities = fillFactsDeep(data?.facilities?.length ? data.facilities : fallbackFacilities, facts);
  const testimonials = fillFactsDeep(data?.testimonials?.length ? data.testimonials : fallbackTestimonials, facts);

  const heroImageUrl = imgUrl(cp.heroImage, 1600);

  return (
    <div>
      {/* Hero — 1440x767, 64px padding, centred 569x349 content block (Figma) */}
      <section
        className="min-h-[600px] md:h-[767px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: heroImageUrl
            ? `url('${heroImageUrl}')`
            : "linear-gradient(180deg, #8a8f9e, #cfd3da)",
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
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-16 h-full flex flex-col items-center justify-end pb-[72px] text-white text-center">
          {/* Figma: breadcrumb sits inside the hero, centred above the block. */}
          <nav className="text-sm leading-[150%] text-white/80 mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/about" className="hover:text-white">About Us</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white">Campus Life &amp; Facilities</span>
          </nav>
          {/* Figma: 569x349 block, gap 16. */}
          <div className="flex flex-col items-center gap-4 max-w-[600px]">
            {/* Figma: Body medium Normal 18/150, Colour/Neutral/White. */}
            {cp.heroEyebrow && (
              <span className="text-lg leading-[150%] uppercase text-white">{cp.heroEyebrow}</span>
            )}
            {/* Figma: Heading/H1 72/120, H 172. */}
            <h1 className="font-display text-4xl md:text-[72px] md:leading-[120%] font-semibold">
              {cp.heroTitle}
              <br />
              {cp.heroTitleLine2}
            </h1>
            {/* Figma: Body medium Normal 18/150, W 568. */}
            {cp.heroSubtitle && (
              <p className="max-w-[568px] text-lg leading-[150%] text-white">{cp.heroSubtitle}</p>
            )}
          </div>
        </div>
      </section>

      {/* The Numbers */}
      {/* The Numbers — 1280 inner, 64/112 padding, two 600 columns, 80px gap (Figma) */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-0 py-16 lg:py-28 grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
        <div>
          {/* Figma: Inter Semi Bold 16/150, letter-spacing 0, Color Scheme 1/Text. */}
          <span className="text-base leading-[150%] font-semibold uppercase text-black">{cp.numbersEyebrow}</span>
          {/* Figma: Heading/H2 52/120, 600 Fill x 186. */}
          <TitleWithHighlight
            text={cp.numbersTitle}
            highlight={cp.numbersTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-6"
          />
          {/* Figma: Text/Medium/Normal 18/150, Color Scheme 1/Text. */}
          <p className="text-lg leading-[150%] text-black">{cp.numbersBody}</p>
        </div>
        {/* Figma: 600 Fill x 412 grid, 80px gap, 284x190 cards. */}
        <div className="grid grid-cols-2 gap-6 lg:gap-x-8 lg:gap-y-8">
          {(cp.numbersStats || []).map((s) => (
            <div
              key={s.label}
              className="outline outline-1 outline-black/15 p-8 lg:h-[190px] flex flex-col justify-center"
            >
              {/* Figma: Heading/H2 52/120, Color Scheme 1/Text. */}
              <div className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-black">{s.value}</div>
              {/* Figma: Body Regular Normal 16/150. */}
              <div className="text-base leading-[150%] uppercase text-black mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature rows — 1280 x 640, two 600 columns, 80px gap (Figma) */}
      {features.map((f) => {
        const img = imgUrl(f.image, 1200);
        return (
          <section key={f._id || f.number} className="max-w-[1280px] mx-auto px-6 lg:px-0 py-8 lg:py-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
              {/* Figma: 600 Fill x 640 image. */}
              <div
                className="h-64 lg:h-[640px] bg-gray-200 bg-cover bg-center"
                style={img ? { backgroundImage: `url('${img}')` } : undefined}
              />
              {/* Figma: 600 Fill x 374 content block, gap 32. */}
              <div className="min-w-0 flex flex-col gap-8">
                {/* Figma: 48x48 circle, white fill, Astronaut stroke. */}
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-navy-900 bg-white text-navy-900 text-base leading-[150%]">
                  {f.number}
                </span>
                <div className="flex flex-col gap-4">
                  {/* Figma: Heading/H2 52/120, Colour/Astronaut/Base. */}
                  <h3 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900">{f.title}</h3>
                  {/* Figma: Text/Medium/Normal 18/150, Color Scheme 1/Text. */}
                  {f.body.split('\n\n').map((para, j) => (
                    <p key={j} className="text-lg leading-[150%] text-black">{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* The Facilities */}
      <section className="bg-navy-50 py-16 lg:py-28">
        <div className="max-w-[768px] mx-auto px-6 lg:px-0 text-center mb-10 lg:mb-20">
          {/* Figma: Heading/Tagline 16/150, Color Scheme 1/Text, centred. */}
          <span className="text-base leading-[150%] font-semibold uppercase text-black">{cp.facilitiesEyebrow}</span>
          <TitleWithHighlight
            text={cp.facilitiesTitle}
            highlight={cp.facilitiesTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6"
          />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          {facilities.map((f) => {
            const img = imgUrl(f.image, 1200);
            // Figma: 1280 x 640 row, gap 80; 600x640 image; 600 content, gap 32.
            return (
              <div
                key={f._id || f.title}
                className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center py-8 lg:py-10"
              >
                <div
                  className="h-64 lg:h-[640px] bg-gray-200 bg-cover bg-center"
                  style={img ? { backgroundImage: `url('${img}')` } : undefined}
                />
                <div className="flex flex-col gap-8">
                  {/* Figma: Heading/H2 52/120, 600 x 62. */}
                  <h4 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-black">{f.title}</h4>
                  {/* Figma: Text/Medium/Normal 18/150, Color Scheme 1/Text. */}
                  <p className="text-lg leading-[150%] text-black">{f.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials — Scheme 1/Background, 64/112 padding, 80px gap (Figma) */}
      <section className="bg-white py-16 lg:py-28">
        <div className="max-w-[768px] mx-auto px-6 lg:px-0 text-center mb-10 lg:mb-20">
          {/* Figma: Heading/Tagline 16/150, Color Scheme 1/Text. */}
          <span className="text-base leading-[150%] font-semibold uppercase text-black">{cp.testimonialsEyebrow}</span>
          <TitleWithHighlight
            text={cp.testimonialsTitle}
            highlight={cp.testimonialsTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6"
          />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Plan Your Visit CTA */}
      {/* Plan Your Visit — 1440 x 496, 64/112 padding, 80px gap (Figma) */}
      <section className="bg-navy-900 text-white py-16 lg:py-28">
        <div className="max-w-[768px] mx-auto px-6 lg:px-0 text-center">
          {/* Figma: Heading/Tagline 16/150, Colour/Neutral/White. */}
          <span className="text-base leading-[150%] font-semibold uppercase text-white">{cp.ctaEyebrow}</span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-6 mb-6">{cp.ctaTitle}</h2>
          {/* Figma: Text/Medium/Normal 18/150, Color Scheme 3/Text, 768 x 54. */}
          <p className="text-lg leading-[150%] text-white mb-10">{cp.ctaSubtitle}</p>
          {/* Figma: 408 x 44 button row, 16px gap. */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={cp.ctaPrimaryUrl} className="bg-sky-600 outline outline-1 outline-sky-600 hover:bg-sky-500 transition-colors text-white text-base leading-[150%] font-medium px-6 py-2.5 rounded-md flex items-center gap-3">
              {cp.ctaPrimaryLabel} <ArrowUpRight size={16} />
            </Link>
            <Link to={cp.ctaSecondaryUrl} className="bg-white hover:bg-gray-100 transition-colors text-ink-900 text-base leading-[150%] font-medium px-6 py-2.5 rounded-md">
              {cp.ctaSecondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
