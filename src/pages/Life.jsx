import CampusStory from '../components/CampusStory';
import { useLifeData } from '../lib/useLifeData';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackPage = {
  heroEyebrow: 'Campus Life · A SIMSREE Story',
  heroTitle: "It's not a building. It's a rhythm.",
  heroTitleBreakAfter: 'building.',
  heroDescription:
    'Scroll through a day in our life at Churchgate — from 6am laps at Marine Drive to midnight committee huddles in the canteen.',

  numbersEyebrow: 'The Numbers',
  numbersTitle: 'A campus that punches above its postcode.',
  numbersTitleHighlight: 'above its postcode.',
  numbersBody:
    'SIMSREE sits inside a 1936 heritage block of Sydenham College — 2.4 acres in Churchgate, walking distance from the BSE, NSE, RBI, and the head offices of half the Nifty 50.',
  stats: [
    { label: 'Founded', value: '{{foundedYear}}', dark: true },
    { label: 'Campus', value: '2.4ac', dark: false },
    { label: 'Facilities', value: '9', dark: false },
    { label: 'To BSE', value: '5min', dark: true },
  ],

  facilitiesEyebrow: 'The Facilities',
  facilitiesTitle: 'Nine spaces, each one a different mode.',
  facilitiesTitleHighlight: 'each one a different mode.',

  voicesEyebrow: 'In Their Words',
  voicesTitle: 'What the cohort actually remembers.',
  voicesTitleHighlight: 'actually',

  ctaEyebrow: 'Plan Your Visit',
  ctaTitle: 'See it for yourself.',
  ctaSubtitle:
    'Campus tours run every Saturday during admission season. 90 minutes · 2 batch ambassadors · canteen tea included. Book a slot below or email visit@simsree.org.',
  ctaButtons: [
    { label: 'Book a campus visit', url: '/contact', primary: true },
    { label: 'Apply to MMS', url: '/admissions/mms', primary: false },
  ],
};

const fallbackFeatures = [
  {
    title: 'Inside the financial mile.',
    body: [
      'The placement committee doesn’t just schedule interviews. The address says it all: B-Road, Churchgate. From the front gate, it’s a 4-minute walk to the BSE, 7 to the NSE, 9 to the RBI. Most of the Nifty 50 hold their head offices inside this single square mile.',
      'This isn’t a backdrop. It’s the curriculum. The CFO you study on Monday might walk into the auditorium on Wednesday. The brand whose case you crack might call you for a live consult by month-end.',
    ],
    order: 1,
  },
  {
    title: 'A 1936 heritage block.',
    body: [
      'SIMSREE shares its building with Sydenham College of Commerce — India’s oldest commerce college (est. 1913) and one of Mumbai’s listed Grade-II heritage structures. Stone arches, mosaic flooring, four-metre ceilings.',
      'The 2.4-acre campus is fully walkable in 6 minutes: inside, 14 classrooms, two auditoriums, a library, the placement floor, three labs, two canteens.',
    ],
    order: 2,
  },
  {
    title: 'Five minutes to the sea.',
    body: [
      'Walk out the back gate, cross one signal, and you’re at Marine Drive — the Queen’s Necklace, three kilometres of unbroken Arabian Sea promenade. 6am runs. 11pm walks. The decompression chamber of SIMSREE.',
      'Approximately every successful piece of student work since 1983 has its conception story on that promenade.',
    ],
    order: 3,
  },
];

const fallbackFacilities = [
  {
    title: 'The Library.',
    description:
      '32,000 volumes · 240 journal subscriptions · Bloomberg + Refinitiv terminals · open till midnight during placement season. Quiet wing on the east side, group-discussion wing on the west.',
    order: 1,
  },
  {
    title: 'The Auditorium.',
    description:
      '320-seat heritage auditorium with original 1936 acoustic geometry. Hosts the Wednesday guest lecture, every TEDxSIMSREE edition, and the annual Simerations finals.',
    order: 2,
  },
  {
    title: 'The Labs.',
    description:
      'Three labs: a 40-seat trading lab with live BSE/NSE feeds, a marketing-analytics lab with Tableau + Power BI licences, and an operations lab with simulation software for supply-chain modelling.',
    order: 3,
  },
  {
    title: 'The Canteen.',
    description:
      'Run by the original family that’s served Sydenham since 1962. Vada-pav at ₹19, filter coffee at ₹25. The single most important node in SIMSREE’s information network.',
    order: 4,
  },
  {
    title: 'The Courtyard.',
    description:
      'Open central courtyard with banyan trees, stone benches, and 4G everywhere. Where committees meet at 1pm, where strategy sessions happen between classes, where Simerations sets up its registration desk.',
    order: 5,
  },
];

const fallbackVoices = [
  {
    quote:
      '"The smell of the library at 1am during placement season. The wood, the old books, the rain through the window. That’s a memory you don’t get from a glass-walled MBA."',
    name: 'Rhea Mehta',
    programme: 'MMS',
    meta: 'Batch 2022-24',
    role: 'Now · Associate, Bain & Co',
    order: 1,
  },
  {
    quote:
      '"You can be in a guest lecture with a CXO at 1pm and at the BSE for a live market visit at 3pm. That collapse of distance — that’s the campus’s real magic."',
    name: 'Aniket Kapoor',
    programme: 'MFM',
    meta: 'Batch 2023-25',
    role: 'Treasurer · Finance Forum',
    order: 2,
  },
  {
    quote:
      '"The canteen has fed every Sydenham batch since my grandfather’s. There’s a metaphor in there about institutions that change without losing themselves."',
    name: 'Neha Suri',
    programme: 'MMS',
    meta: 'Batch 2024-26',
    role: 'Chair · SSR Committee',
    order: 3,
  },
];

// Figma photos, shared with Campus Life (same frames in the design).
const FEATURE_PHOTOS = [1, 2, 3].map((n) => `/images/campus/story-${n}.webp`);
const FACILITY_PHOTOS = ['library', 'auditorium', 'labs', 'canteen', 'courtyard'].map((n) => `/images/campus/${n}.webp`);
const VOICE_PHOTOS = [1, 3, 2].map((n) => `/images/campus/voice-${n}.webp`);

export default function Life() {
  const facts = useKeyFacts();
  const { data } = useLifeData();

  const lp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const features = fillFactsDeep(data?.features?.length ? data.features : fallbackFeatures, facts);
  const facilities = fillFactsDeep(data?.facilities?.length ? data.facilities : fallbackFacilities, facts);
  const voices = fillFactsDeep(data?.voices?.length ? data.voices : fallbackVoices, facts);

  // The page's own field names, mapped onto the shared layout's.
  const title = lp.heroTitle || '';
  const brk = lp.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;
  const cp = {
    ...lp,
    heroTitle: bIdx === -1 ? title : title.slice(0, bIdx + brk.length),
    heroTitleLine2: bIdx === -1 ? '' : title.slice(bIdx + brk.length).trim(),
    heroSubtitle: lp.heroDescription,
    numbersStats: lp.stats,
    facilitiesTitle: lp.facilitiesTitle?.match(/^[A-Z0-9]/) ? lp.facilitiesTitle : `Nine ${lp.facilitiesTitle}`,
    testimonialsEyebrow: lp.voicesEyebrow,
    testimonialsTitle: lp.voicesTitle,
    testimonialsTitleHighlight: lp.voicesTitleHighlight,
    ctaPrimaryLabel: lp.ctaButtons?.[0]?.label,
    ctaPrimaryUrl: lp.ctaButtons?.[0]?.url,
    ctaSecondaryLabel: lp.ctaButtons?.[1]?.label,
    ctaSecondaryUrl: lp.ctaButtons?.[1]?.url,
  };

  return (
    <CampusStory
      cp={cp}
      numbers="stats"
      heroFallback="/images/students/life-hero.webp"
      breadcrumb={[{ label: 'Home', to: '/' }, { label: "Student's Corner", to: '/students' }, { label: 'Life @ SIMSREE' }]}
      features={features.map((f, i) => ({
        ...f,
        number: f.number || String(i + 1).padStart(2, '0'),
        body: Array.isArray(f.body) ? f.body.join('\n\n') : f.body,
        image: f.image || FEATURE_PHOTOS[i],
      }))}
      facilities={facilities.map((f, i) => ({ ...f, image: f.image || FACILITY_PHOTOS[i] }))}
      testimonials={voices.map((v, i) => ({
        ...v,
        meta: [v.meta, v.role].filter(Boolean).join('\n'),
        photo: v.photo || VOICE_PHOTOS[i % VOICE_PHOTOS.length],
      }))}
    />
  );
}
