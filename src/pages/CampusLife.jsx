import PageHero, { HeroButton } from '../components/PageHero';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { Section, SectionTitle, Heading } from '../components/ui';
import { useCampusPageData } from '../lib/useCampusPageData';
import { urlFor } from '../lib/sanity';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

// Copy below is the Figma "Campus Life & Facilities New" frame, used until the
// page is filled in the Studio.
const fallbackCampusPage = {
  heroEyebrow: 'Campus Life · A SIMSREE Story',
  heroTitle: "It's not a building.",
  heroTitleLine2: "It's a rhythm.",
  heroSubtitle:
    'Scroll through a day in our life at Churchgate — from 6am laps at Marine Drive to midnight committee huddles in the canteen.',

  numbersEyebrow: 'The Numbers',
  numbersTitle: 'A campus that punches above its postcode.',
  numbersTitleHighlight: 'above its postcode.',
  numbersBody:
    'SIMSREE sits inside a 1936 heritage block of Sydenham College — 2.4 acres in Churchgate, walking distance from the BSE, NSE, RBI, and the head offices of half the Nifty 50.',
  numbersStats: [
    { value: '1983', label: 'Founded' },
    { value: '2.4ac', label: 'Campus' },
    { value: '9', label: 'Facilities' },
    { value: '5min', label: 'To BSE' },
  ],

  facilitiesEyebrow: 'The Facilities',
  facilitiesTitle: 'Nine spaces, each one a different mode.',
  facilitiesTitleHighlight: 'each one a different mode.',

  testimonialsEyebrow: 'In Their Words',
  testimonialsTitle: 'What the cohort actually remembers.',
  testimonialsTitleHighlight: 'actually',

  ctaEyebrow: 'Plan Your Visit',
  ctaTitle: 'See it for yourself.',
  ctaSubtitle:
    'Campus tours run every other Saturday during admission season. 90 minutes · 2-batch ambassadors · canteen tea included. Book a slot below or email visit@simsree.org.',
  ctaPrimaryLabel: 'Book a campus visit',
  ctaPrimaryUrl: '/contact',
  ctaSecondaryLabel: 'Apply to MMS',
  ctaSecondaryUrl: '/admissions/mms',
};

const fallbackFeatures = [
  {
    number: '01',
    title: 'Inside the financial mile.',
    image: '/images/campus/story-1.webp',
    body: "The address says it all: B-Road, Churchgate. From the front gate, it's a 4-minute walk to the BSE, 7 to the NSE, 9 to the RBI. Most of the Nifty 50 hold their head offices inside this single square mile.\n\nThis isn't a backdrop. It's the curriculum. The CFO you study on Monday might walk into the auditorium on Wednesday. The brand whose case you crack might call you for a live consult by month-end.",
  },
  {
    number: '02',
    title: 'A 1936 heritage block.',
    image: '/images/campus/story-2.webp',
    body: "SIMSREE shares its building with Sydenham College of Commerce — India's oldest commerce college (est. 1913) and one of Mumbai's listed Grade-II heritage structures. Stone arches, mosaic flooring, four-meter ceilings.\nThe 2.4-acre campus is fully walkable in 6 minutes. Inside: 14 classrooms, two auditoriums, a library, the placement floor, three labs, two canteens.",
  },
  {
    number: '03',
    title: 'Five minutes to the sea.',
    image: '/images/campus/story-3.webp',
    body: "Walk out the back gate, cross one signal, and you're at Marine Drive — the Queen's Necklace, three kilometres of unbroken Arabian Sea promenade. 6am runs. 11pm walks. The decompression chamber of SIMSREE.\n\nApproximately every successful piece of student work since 1983 has its conception story on that promenade.",
  },
];

const fallbackFacilities = [
  {
    title: 'The Library.',
    image: '/images/campus/library.webp',
    description:
      '32,000 volumes · 240 journal subscriptions · Bloomberg + Refinitiv terminals · open till midnight during placement season. Quiet wing on the east side, group-discussion wing on the west.',
  },
  {
    title: 'The Auditorium.',
    image: '/images/campus/auditorium.webp',
    description:
      '320-seat heritage auditorium with original 1936 acoustic geometry. Hosts the Wednesday guest lecture, every TEDxSIMSREE edition, and the annual Simerations finals.',
  },
  {
    title: 'The Labs.',
    image: '/images/campus/labs.webp',
    description:
      'Three labs: a 40-seat trading lab with live BSE/NSE feeds, a marketing-analytics lab with Tableau + Power BI licences, and an operations lab with simulation software for supply-chain modelling.',
  },
  {
    title: 'The Canteen.',
    image: '/images/campus/canteen.webp',
    description:
      "Run by the original family that's served Sydenham since 1962. Vada-pav at ₹15. Filter coffee at ₹20. The single most important node in SIMSREE's information network.",
  },
  {
    title: 'The Courtyard.',
    image: '/images/campus/courtyard.webp',
    description:
      'Open central courtyard with banyan trees, stone benches, and 4G everywhere. Where committees meet at 7pm, where strategy sessions happen between classes, where Simerations sets up its registration desk.',
  },
];

// `meta` lines render one per row under the name (Figma: batch, then role).
const fallbackTestimonials = [
  {
    quote:
      "The smell of the library at 11pm during placement season. The wood, the old books, the rain through the window. That's a memory you don't get from a glass-walled MBA.",
    name: 'Tanmay Thomare',
    programme: 'MMS',
    meta: 'Batch 2022-24\nChairperson, Placement Committee',
    photo: '/images/campus/voice-1.webp',
  },
  {
    quote:
      "You can be in a guest lecture with a CXO at 3pm and at the BSE for a live market visit at 5pm. That collapse of distance — that's the campus's real magic.",
    name: 'Priya Kulkarni',
    programme: 'MMS',
    meta: 'Batch 2023-25\nChair, Events Committee',
    photo: '/images/campus/voice-2.webp',
  },
  {
    quote:
      "The canteen has fed every Sydenham batch since my grandfather's. There's a metaphor in there about institutions that change without losing themselves.",
    name: 'Anushka Rao',
    programme: 'MMS',
    meta: 'Batch 2023-25\nCo-lead, R&C Club',
    photo: '/images/campus/voice-3.webp',
  },
];

// Sanity image → URL; fallback entries already carry a /images path.
function imgUrl(image, width) {
  if (!image) return undefined;
  if (typeof image === 'string') return image;
  try {
    return urlFor(image).width(width).auto('format').url();
  } catch {
    return undefined;
  }
}

// Figma "Component": 1280 row, 600x640 photo, 80 gap, 600 copy column.
function PhotoRow({ image, children }) {
  const img = imgUrl(image, 1200);
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
      <div
        className="h-[335px] lg:h-[640px] bg-navy-50 bg-cover bg-center"
        style={img ? { backgroundImage: `url('${img}')` } : undefined}
      />
      <div className="min-w-0 flex flex-col gap-6">{children}</div>
    </div>
  );
}

function Paragraphs({ text = '' }) {
  return (
    <div className="text-base md:text-lg leading-[150%] text-black whitespace-pre-line">
      {text.split('\n\n').map((para, i) => (
        <p key={i} className={i > 0 ? 'mt-[1.5em]' : undefined}>
          {para}
        </p>
      ))}
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

  return (
    <div>
      <PageHero
        align="center"
        image={heroImage(cp.heroImage, '/images/campus/hero.webp', { stretch: true })}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About Us', to: '/about' }, { label: 'Campus Life & Facilities' }]}
        eyebrow={cp.heroEyebrow}
        eyebrowUpper
        title={[cp.heroTitle, cp.heroTitleLine2].filter(Boolean).join('\n')}
        titleWidth={640}
        description={cp.heroSubtitle}
        descriptionWidth={569}
        mobileOverlay="gradient-tint"
      />

      {/* The Numbers — Figma "Layout / 141 /": two 600 columns, 80 gap; 284x190
          hairline stat tiles, value H2 52 over a 16 SemiBold label. */}
      <Section width={1280}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <SectionTitle
            tagline={cp.numbersEyebrow}
            title={composeTitle(cp.numbersTitle, cp.numbersTitleHighlight)}
            highlight={cp.numbersTitleHighlight}
            titleClass="text-black"
            body={cp.numbersBody}
            width={600}
          />
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {(cp.numbersStats || []).map((s) => (
              <div
                key={s.label}
                className="flex flex-col justify-center gap-4 min-h-[150px] md:h-[190px] p-4 md:p-8 bg-white outline outline-1 -outline-offset-1 outline-black/20"
              >
                <div className="font-display font-medium text-[36px] leading-[130%] md:text-[52px] md:leading-[120%] tracking-[-0.01em] text-black">
                  {s.value}
                </div>
                <div className="text-base leading-[150%] font-semibold uppercase text-black">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Feature rows — Figma "Layout / 218 /": rows 80 apart; 48px numbered circle,
          H2 52 in black, 18/150 copy. */}
      <Section width={1280} className="border-t border-white/20">
        <div className="flex flex-col gap-20">
          {features.map((f) => (
            <PhotoRow key={f._id || f.number} image={f.image}>
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white outline outline-1 -outline-offset-1 outline-navy-900 shadow-[inset_0_1px_2px_rgb(255_255_255/0.25)] text-lg leading-[150%] text-navy-900">
                {f.number}
              </span>
              <Heading text={f.title} className="text-black" as="h3" />
              <Paragraphs text={f.body} />
            </PhotoRow>
          ))}
        </div>
      </Section>

      {/* The Facilities — Figma "Testimonial / 12 /" on #eaeaf1: centred 570 title,
          then photo rows 80 apart. */}
      <Section bg="bg-navy-50" width={1280}>
        <SectionTitle
          center
          width={570}
          tagline={cp.facilitiesEyebrow}
          title={composeTitle(cp.facilitiesTitle, cp.facilitiesTitleHighlight)}
          highlight={cp.facilitiesTitleHighlight}
        />
        <div className="mt-20 flex flex-col gap-20">
          {facilities.map((f) => (
            <PhotoRow key={f._id || f.title} image={f.image}>
              <Heading text={f.title} className="text-black" as="h3" />
              <Paragraphs text={f.description} />
            </PhotoRow>
          ))}
        </div>
      </Section>

      {/* Testimonials — centred 573 title, carousel. */}
      <Section width={1280}>
        <SectionTitle
          center
          width={573}
          tagline={cp.testimonialsEyebrow}
          title={composeTitle(cp.testimonialsTitle, cp.testimonialsTitleHighlight)}
          highlight={cp.testimonialsTitleHighlight}
        />
        <div className="mt-20">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </Section>

      {/* Plan Your Visit — navy "CTA / 57 /": centred 768 column, 32 gaps. */}
      <Section bg="bg-navy-900" width={768} className="text-center">
        <SectionTitle center dark tagline={cp.ctaEyebrow} title={cp.ctaTitle} body={cp.ctaSubtitle} />
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <HeroButton label={cp.ctaPrimaryLabel} to={cp.ctaPrimaryUrl} primary />
          <HeroButton label={cp.ctaSecondaryLabel} to={cp.ctaSecondaryUrl} />
        </div>
      </Section>
    </div>
  );
}
