import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import { useLifeData } from '../lib/useLifeData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackPage = {
  heroEyebrow: 'Campus Life · SIMSREE 2025',
  heroTitle: "It's not a building. It's a rhythm.",
  heroTitleBreakAfter: 'building.',
  heroDescription:
    '9am through a 9pm fest at Churchgate — from turnout to course time to microlit committee lunches in the canteen.',

  numbersEyebrow: 'The Numbers',
  numbersTitle: 'A campus that punches above its postcode.',
  numbersTitleHighlight: 'above its',
  numbersBody:
    'SIMSREE sits inside a 1936 heritage block of Sydenham College — 2.4 acres in Churchgate, walking distance from the BSE, NSE, RBI, and the head offices of half the Nifty 50.',
  stats: [
    { label: 'Founded', value: '{{foundedYear}}', dark: true },
    { label: 'Campus', value: '2.4ac', dark: false },
    { label: 'Houses', value: '9', dark: false },
    { label: 'To BSE', value: '5min', dark: true },
  ],

  facilitiesEyebrow: 'The Facilities',
  facilitiesTitle: 'spaces, each one a different mode.',
  facilitiesTitleHighlight: 'each one a',

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
    name: 'Shea Mehta',
    programme: 'MMS',
    meta: 'Batch 2023-25',
    role: 'Now · Associate, Bain & Co',
    order: 1,
  },
  {
    quote:
      '"You can be in a guest lecture with a CXO at 1pm and at the BSE for a live market visit at 3pm. That collapse of distance — that’s the campus’s real magic."',
    name: 'Aniket Kapoor',
    programme: 'MFM',
    meta: 'Batch 2022-25',
    role: 'Treasurer · Finance Forum',
    order: 2,
  },
  {
    quote:
      '"The canteen has fed every Sydenham batch since my grandfather’s. There’s a metaphor in there about institutions that change without losing themselves."',
    name: 'Neha Suri',
    programme: 'MMS',
    meta: 'Batch 2023-25',
    role: 'Chair · SSR Committee',
    order: 3,
  },
];

function TitleWithHighlight({ text = '', highlight, className, prefix }) {
  const idx = highlight ? text.indexOf(highlight) : -1;
  const body =
    idx === -1 ? (
      text
    ) : (
      <>
        {text.slice(0, idx)}
        <span className="text-teal-500">{highlight}</span>
        {text.slice(idx + highlight.length)}
      </>
    );
  return (
    <h2 className={className}>
      {prefix && <>{prefix} </>}
      {body}
    </h2>
  );
}

export default function Life() {
  const facts = useKeyFacts();
  const { data } = useLifeData();
  const lp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const features = fillFactsDeep(
    data?.features?.length ? data.features : fallbackFeatures,
    facts
  );
  const facilities = fillFactsDeep(
    data?.facilities?.length ? data.facilities : fallbackFacilities,
    facts
  );
  const voices = fillFactsDeep(data?.voices?.length ? data.voices : fallbackVoices, facts);
  const ctaButtons = fillFactsDeep(
    lp.ctaButtons?.length ? lp.ctaButtons : fallbackPage.ctaButtons,
    facts
  );

  const heroImageUrl = lp.heroImage ? urlFor(lp.heroImage).width(1600).url() : null;

  // Voices show three at a time; page through the rest.
  const PER_PAGE = 3;
  const pageCount = Math.max(1, Math.ceil(voices.length / PER_PAGE));
  const [slide, setSlide] = useState(0);
  const visibleVoices = useMemo(
    () => voices.slice(slide * PER_PAGE, slide * PER_PAGE + PER_PAGE),
    [voices, slide]
  );
  const go = (dir) => setSlide((s) => (s + dir + pageCount) % pageCount);

  const title = lp.heroTitle || '';
  const brk = lp.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;
  const line1 = bIdx === -1 ? title : title.slice(0, bIdx + brk.length);
  const line2 = bIdx === -1 ? '' : title.slice(bIdx + brk.length).trim();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="min-h-[380px] md:h-[440px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: heroImageUrl
            ? `url('${heroImageUrl}')`
            : 'linear-gradient(180deg, #8a8f9e, #cfd3da)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-navy-950/10" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[55px] pt-32 pb-10 md:pb-[44px] md:h-full flex flex-col justify-end text-white">
          <div className="text-xs text-white/70 mb-4 flex items-center">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/students" className="hover:text-white">Student&apos;s Corner</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white">Life @ SIMSREE</span>
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90 mb-3">
            {lp.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            {line1}
            {line2 && (
              <>
                <br />
                {line2}
              </>
            )}
          </h1>
          <p className="max-w-md text-sm text-white/85 leading-relaxed">{lp.heroDescription}</p>
        </div>
      </section>

      {/* The numbers */}
      <section className="bg-navy-50 py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                {lp.numbersEyebrow}
              </span>
              <TitleWithHighlight
                text={lp.numbersTitle}
                highlight={lp.numbersTitleHighlight}
                className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-5 max-w-sm"
              />
              <p className="text-sm text-ink-600 leading-relaxed max-w-md">{lp.numbersBody}</p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {(lp.stats || []).map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Numbered feature rows */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0 flex flex-col gap-14 lg:gap-20">
          {features.map((f, i) => {
            const imgUrl = f.image ? urlFor(f.image).width(900).url() : null;
            return (
              <div
                key={f._id || f.title}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
              >
                <div
                  className="h-[260px] lg:h-[320px] rounded-lg bg-gray-200 bg-cover bg-center"
                  style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                />
                <div>
                  <span className="inline-flex w-9 h-9 rounded-full border border-navy-100 items-center justify-center text-[11px] font-semibold text-navy-600 mb-5">
                    {String(f.order ?? i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-navy-900 mb-5">
                    {f.title}
                  </h2>
                  <div className="space-y-4">
                    {(f.body || []).map((para, pi) => (
                      <p key={pi} className="text-sm text-ink-600 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Facilities */}
      <section className="bg-navy-50 py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-12 lg:mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {lp.facilitiesEyebrow}
            </span>
            <TitleWithHighlight
              prefix={facilities.length}
              text={lp.facilitiesTitle}
              highlight={lp.facilitiesTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5"
            />
          </div>

          <div className="flex flex-col gap-12 lg:gap-16">
            {facilities.map((f, i) => {
              const imgUrl = f.image ? urlFor(f.image).width(900).url() : null;
              const flip = i % 2 === 1;
              return (
                <div
                  key={f._id || f.title}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
                >
                  <div
                    className={`h-[240px] lg:h-[300px] rounded-lg bg-gray-200 bg-cover bg-center ${
                      flip ? 'lg:order-2' : ''
                    }`}
                    style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                  />
                  <div className={flip ? 'lg:order-1' : ''}>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-navy-900 mb-4">
                      {f.title}
                    </h3>
                    <p className="text-sm text-ink-600 leading-relaxed max-w-md">
                      {f.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Voices */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {lp.voicesEyebrow}
            </span>
            <TitleWithHighlight
              text={lp.voicesTitle}
              highlight={lp.voicesTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5"
            />
          </div>

          <div aria-live="polite" className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {visibleVoices.map((v) => {
              const photoUrl = v.photo ? urlFor(v.photo).width(120).url() : null;
              return (
                <figure
                  key={v.name}
                  className="m-0 flex flex-col border border-navy-100 rounded-lg p-6"
                >
                  <blockquote className="text-sm text-navy-900 leading-relaxed mb-6 flex-1">
                    {v.quote}
                  </blockquote>
                  <figcaption className="flex items-center gap-3 pt-4 border-t border-navy-100">
                    <span
                      className="w-9 h-9 rounded-full bg-navy-100 bg-cover bg-center shrink-0"
                      style={photoUrl ? { backgroundImage: `url('${photoUrl}')` } : undefined}
                    />
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-navy-900">
                        {v.name}
                        {v.programme && (
                          <span className="font-normal text-ink-400"> ({v.programme})</span>
                        )}
                      </span>
                      <span className="block text-[11px] text-ink-400">{v.meta}</span>
                      <span className="block text-[11px] text-ink-400">{v.role}</span>
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
                    aria-label={`Show voices ${i + 1} of ${pageCount}`}
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
                  aria-label="Previous voices"
                  className="w-9 h-9 rounded-md border border-navy-100 hover:bg-navy-50 transition-colors flex items-center justify-center"
                >
                  <ArrowLeft size={15} className="text-navy-900" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next voices"
                  className="w-9 h-9 rounded-md border border-navy-100 hover:bg-navy-50 transition-colors flex items-center justify-center"
                >
                  <ArrowRight size={15} className="text-navy-900" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Visit CTA */}
      <section className="bg-navy-900 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-sky-500">
            {lp.ctaEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-5 mb-4">
            {lp.ctaTitle}
          </h2>
          <p className="text-sm text-white/75 mb-8 max-w-xl mx-auto leading-relaxed">
            {lp.ctaSubtitle}
          </p>
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
