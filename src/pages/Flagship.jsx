import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Breadcrumb, HeroButton } from '../components/PageHero';
import { Section, Tagline, Heading, H5 } from '../components/ui';
import { useFlagshipData } from '../lib/useFlagshipData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';
import CountUp from '../components/CountUp';

const fallbackPage = {
  heroEyebrow: 'Flagship Events',
  heroTitle: 'Eight fests. One campus. One year.',
  heroTitleBreakAfter: '.',
  heroDescription:
    'Every one of them planned, produced and run by a student committee. Twelve thousand attendees across the calendar. Four decades deep. Nobody gets paid.',
  heroCtaLabel: 'Events calendar',
  heroCtaUrl: '/events',
  heroStats: [
    { value: '42', label: 'Years' },
    { value: '8', label: 'Flagships' },
    { value: '12K', label: 'Attendees/yr' },
  ],

  factStrip: [
    'Sydenham Mumbai',
    'Student run since 1983',
    'Eight fests · One year',
    'Flagship events',
    'Sydenham Mumbai',
    'Student run since 1983',
  ],

  partnersLabel: 'Partnered with',

  promiseEyebrow: 'Promise',
  promiseTitle: 'WE’RE TRUE TO THE WORK.',
  promiseTitleHighlight: 'TRUE',
  promiseBody:
    'A B-school fest is not a B-school fest. Eight flagships, eight personalities. Simerations is finance + ego. Aikya is heart. TEDx is a quiet ego trip. Sportzania is shouting. Wakeup is the first time you stop pretending to know what you are doing. Each one is run by a different committee. Each one means something specific to someone. The standard is not "campus event" — the standard is the live industry around us.',
  promiseCtaLabel: 'Events calendar',
  promiseCtaUrl: '/events',

  featuredTitle: 'Featured fests',
  featuredCtaLabel: 'Browse all 42 talks',
  featuredCtaUrl: '#lineup',

  lineupTitle: 'The full lineup',

  creativeTitle: 'Creative that slaps.',
  creativeTitleItalic: 'slaps.',
  creativeBody:
    'Quality sits at the heart of every fest. We are not here to cut corners or ship rough. Each committee is rebuilt every year and the standard does not fall. No matter the format, the focus is on making sure the creative absolutely slaps.',
  creativeCtaLabel: 'Get involved',
  creativeCtaUrl: '/contact',

  processTitle: 'How we run a fest',
  processSteps: [
    {
      title: 'Ideate',
      description:
        'Twelve sprints · 8 partner brands to buy in August. A 3-week proposal cycle with 6-person votes. Direction settled before a single venue is booked.',
    },
    {
      title: 'Create',
      description:
        'Six tracks to partner · production · design · marketing · ops · partnerships build in parallel from September. Weekly all-hands. Slack for everything else.',
    },
    {
      title: 'Deliver',
      description:
        'Five days · ten activities · the first taste of the minute. Aftermovie hits YouTube the following Tuesday. Post-event report goes out the same week.',
    },
  ],

  testimonialsTitle: 'What they say',

  ledgerEyebrow: 'About the Student Body',
  ledgerTitle: 'Eight teams. One campus ledger.',
  ledgerTitleHighlight: 'campus',
  ledgerBody:
    'Each flagship is owned by a dedicated student committee. The lineage runs back 30+ editions for the older fests. Every August, the second-years hand the binder to the first-years. Budgets, vendor contacts, sponsor relationships, the run-of-show, the things that went wrong — all of it. We treat the institutional memory as the asset, not the individual brilliance.',
  ledgerCtaLabel: 'See the student body',
  ledgerCtaUrl: '/students/body-structure',

  ctaTitle: "LET'S RUN SOMETHING GREAT.",
  ctaSubtitle: 'Partner with us · sponsor a track · bring your brand to campus.',
  ctaButtons: [
    { label: 'Partner with us', url: '/contact', primary: true },
    { label: 'Get in touch', url: '/contact', primary: false },
  ],
};

const fallbackFests = [
  {
    name: 'Simerations',
    featured: true,
    dateBadge: '02 · Feb 2027',
    tagline: 'Five tracks · 2 days · 500+ delegates · ₹5L prize pool.',
    featuredMeta: 'Annual case competition fest',
    subtitle: 'Annual case competition festival',
    description:
      'Five tracks · 480 delegates from 38 B-schools · ₹5L prize pool · 30 editions deep.',
    ctaLabel: 'View 2027 edition',
    ctaUrl: '/events/simerations',
    order: 1,
  },
  {
    name: 'TEDxSIMSREE',
    featured: true,
    dateBadge: '05 · Nov 2026',
    tagline: 'Six speakers · 320 attendees · 11.4M cumulative YouTube views. Run under independent TEDx licence.',
    featuredMeta: 'Ideas worth spreading · since 2017',
    subtitle: 'Ideas worth spreading · since 2017',
    description:
      'Six speakers · one afternoon · 11.4M cumulative YouTube views. Run under independent TEDx licence.',
    ctaLabel: 'View 2026 edition',
    ctaUrl: '/events/tedxsimsree',
    order: 2,
  },
  {
    name: 'Akiya',
    featured: true,
    dateBadge: '08 · Feb 2027',
    tagline: 'Music · dance · spoken word · stand-up. 2,000 across campus and city audience. Marine Drive after-party.',
    featuredMeta: 'Cultural festival · 3 days',
    subtitle: 'Cultural festival · 3 days',
    description:
      'Music · dance · spoken word · stand-up. 2,000 strong campus and city audience. Marine Drive after-party.',
    ctaLabel: 'View the 2027 edition',
    ctaUrl: '#lineup',
    order: 3,
  },
  {
    name: 'Sportzania',
    featured: true,
    dateBadge: '02 · Nov 2026',
    tagline: 'Twelve sports · 8 partner colleges · 800 athletes · 4 days. The trophy that everyone wants back.',
    featuredMeta: 'Inter-college sports meet',
    subtitle: 'Inter-college sports meet',
    description:
      'Twelve sports · 8 partner colleges · 800 athletes · 4 days. The trophy that everyone wants back.',
    ctaLabel: 'View Jan 2027 edition',
    ctaUrl: '#lineup',
    order: 4,
  },
  {
    name: 'Founders Day',
    subtitle: 'Annual alumni homecoming',
    description:
      'Back-to-evening · 220 alumni · keynote by a graduating-year batch member who made it.',
    ctaLabel: 'View 2026 edition',
    ctaUrl: '#lineup',
    order: 5,
  },
  {
    name: 'Wakeup',
    subtitle: 'Induction week · MMS first-years',
    description:
      'Live trading sim · GYO panels · banking-day exits. Run by the Finance Committee for everyone outside it.',
    ctaLabel: 'View July 2026 edition',
    ctaUrl: '#lineup',
    order: 6,
  },
  {
    name: 'Pulse',
    subtitle: 'Marketing festival',
    description:
      'Brand challenges · live pitch · agency crit. Half the room is from B-schools we have never heard of.',
    ctaLabel: 'View Oct 2026 edition',
    ctaUrl: '#lineup',
    order: 7,
  },
  {
    name: 'Finance Forum',
    subtitle: 'Panels · Simulations · 3 days',
    description:
      'Show day. Doors open. Run of show is tight to the minute. Aftermovie hits YouTube the following Tuesday.',
    ctaLabel: 'View Dec 2026 edition',
    ctaUrl: '/students/committees/finance-forum',
    order: 8,
  },
];

const fallbackPartners = [
  'Webflow', 'Relume', 'Webflow', 'Relume', 'Webflow', 'Relume', 'Webflow', 'Relume',
].map((name, i) => ({ name, order: i + 1 }));

const fallbackTestimonials = [
  {
    quote:
      '"Sponsoring Simerations was the highest-ROI campus activation we ran in 2024. Three hires came directly from the case-comp finals."',
    name: 'Anjali Shanbe',
    role: 'CMO · Asian Paints',
    order: 1,
  },
  {
    quote:
      '"TEDxSIMSREE reached out harder than my publisher did. Eight weeks of rewrites. The talk landed because they refused to let me settle."',
    name: 'Priya Goswami',
    role: 'Author · 2023 speaker',
    order: 2,
  },
  {
    quote:
      '"My batch came in via Wakeup. I cried laughing on Day 2. I knew within a week these were my people. That induction is everything."',
    name: 'Rohit Sengupta',
    role: 'MMS 2023-27',
    order: 3,
  },
  {
    quote:
      '"Sportzania is the best-run inter-college meet in Western India. Run direct is sharper than most corporate events I attend."',
    name: 'Coach Anand',
    role: 'NMIMS · Mumbai',
    order: 4,
  },
];

// Figma photos used when an entry has no Sanity image.
const HERO_PHOTOS = [1, 2, 3, 4].map((n) => `/images/flagship/hero-${n}.webp`);
const FEATURED_PHOTOS = [1, 2, 3, 4].map((n) => `/images/flagship/feat-${n}.webp`);
const FEST_PHOTOS = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/images/flagship/fest-${n}.webp`);
const VOICE_PHOTOS = [1, 2, 3, 4].map((n) => `/images/flagship/voice-${n}.webp`);

const img = (image, fallback, w) => (image ? urlFor(image).width(w).auto('format').url() : fallback);
const pad = (n) => String(n).padStart(2, '0');

// Figma "Featured fests (04)": H2 navy + a 44px Eastern Blue count, 28 apart.
function CountedTitle({ text, count, className = '' }) {
  return (
    <h2 className={`flex flex-wrap items-center gap-x-7 font-display font-medium tracking-[-0.01em] ${className}`}>
      <span className="text-[36px] leading-[130%] md:text-[52px] md:leading-[120%] text-navy-900">{text}</span>
      <span className="text-[36px] leading-[130%] md:text-[44px] md:leading-[120%] text-teal-500">({pad(count)})</span>
    </h2>
  );
}

// Figma pill tag: #e9f3f8, Eastern Blue 14/150, radius 16.
function BlueTag({ children }) {
  return (
    <span className="w-fit px-2.5 py-1 rounded-2xl bg-sky-50 text-sm leading-[150%] uppercase text-sky-600">{children}</span>
  );
}

// Infinite horizontal strip (items repeated so the loop has no gap).
function Marquee({ items, render, gap = 'gap-20', className = '' }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`flex w-max animate-marquee ${gap}`}>
        {[...items, ...items].map((it, i) => (
          <div key={i} className="shrink-0" aria-hidden={i >= items.length ? 'true' : undefined}>
            {render(it)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Flagship() {
  const facts = useKeyFacts();
  const { data } = useFlagshipData();
  const fp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const fests = fillFactsDeep(data?.fests?.length ? data.fests : fallbackFests, facts);
  const partners = fillFactsDeep(data?.partners?.length ? data.partners : fallbackPartners, facts);
  const testimonials = fillFactsDeep(data?.testimonials?.length ? data.testimonials : fallbackTestimonials, facts);
  const pick = (k) => fillFactsDeep(fp[k]?.length ? fp[k] : fallbackPage[k], facts);
  const heroStats = pick('heroStats');
  const factStrip = pick('factStrip');
  const processSteps = pick('processSteps');
  const ctaButtons = pick('ctaButtons');

  const collage = [0, 1, 2, 3].map((i) => img(fp.heroCollage?.[i], HERO_PHOTOS[i], 900));
  const featured = fests.filter((f) => f.featured);

  // Hero title: one sentence per line, the middle one Eastern Blue (Figma).
  const brk = fp.heroTitleBreakAfter || '.';
  const heroLines = (fp.heroTitle || '')
    .split(brk)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s + brk);

  const cItalic = fp.creativeTitleItalic;
  const cIdx = cItalic ? (fp.creativeTitle || '').indexOf(cItalic) : -1;

  // Figma lineup rows: three cards, then two wider ones on the last row.
  const lastRow = fests.length % 3 === 2 ? fests.length - 2 : fests.length;
  const festSpan = (i) => (i >= lastRow ? 'lg:col-span-3' : 'lg:col-span-2');

  return (
    <div className="bg-white">
      {/* Hero — white. 628 copy column (tag, 72px three-line title, 18/150 body,
          button + 36px stats) | 647 collage of four photos in two 12-gapped rows. */}
      <section className="px-5 md:px-[55px] pt-[222px] lg:pt-[204px] pb-[72px]">
        <div className="max-w-[1330px] mx-auto grid lg:grid-cols-[647px_647px] justify-between gap-9 items-center">
          <div className="flex flex-col gap-4">
            <Breadcrumb
              items={[{ label: 'Home', to: '/' }, { label: 'Events', to: '/events' }, { label: 'Flagship Events' }]}
              className="!text-black"
            />
            <div className="mt-10 max-lg:px-6 max-w-[628px] flex flex-col gap-4">
              <BlueTag>{fp.heroEyebrow}</BlueTag>
              <h1 className="font-display font-medium text-[36px] leading-[130%] md:text-[72px] md:leading-[120%] tracking-[-0.01em] text-navy-900">
                {heroLines.map((l, i) => (
                  <span key={l} className={`block ${i === 1 ? 'text-teal-500' : ''}`}>
                    {l}
                  </span>
                ))}
              </h1>
              <p className="mt-2 text-base md:text-lg leading-[150%] text-black">{fp.heroDescription}</p>
              <div className="mt-4 flex flex-col md:flex-row md:items-center gap-8 md:gap-[57px]">
                <HeroButton label={fp.heroCtaLabel} href={fp.heroCtaUrl} primary className="w-fit" />
                <dl className="m-0 grid grid-cols-2 gap-x-2 gap-y-4 md:flex md:gap-4">
                  {heroStats.map((s) => (
                    <div key={s.label} className="md:min-w-[105px] flex flex-col-reverse gap-2">
                      <dt className="text-base leading-[150%] md:font-semibold uppercase text-black">{s.label}</dt>
                      <dd className="m-0 font-display font-medium text-[28px] leading-[140%] md:text-[36px] md:leading-[130%] tracking-[-0.01em] text-black">
                        <CountUp value={s.value} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 md:grid-cols-[194fr_441fr] gap-3 h-[304px]">
              <div className="bg-navy-50 bg-cover bg-center" style={{ backgroundImage: `url('${collage[0]}')` }} />
              <div className="bg-navy-50 bg-cover bg-center" style={{ backgroundImage: `url('${collage[1]}')` }} />
            </div>
            <div className="grid grid-cols-[129fr_194fr] md:grid-cols-[441fr_194fr] gap-3 h-[291px]">
              <div className="bg-navy-50 bg-cover bg-center" style={{ backgroundImage: `url('${collage[2]}')` }} />
              <div className="bg-navy-50 bg-cover bg-center" style={{ backgroundImage: `url('${collage[3]}')` }} />
            </div>
          </div>
        </div>
      </section>

      {/* Navy fact strip — 16/150 white uppercase, 80 apart, scrolling. */}
      {factStrip.length > 0 && (
        <Marquee
          className="bg-navy-900 py-8"
          items={factStrip}
          render={(f) => <span className="text-base leading-[150%] uppercase text-white whitespace-nowrap">{f}</span>}
        />
      )}

      {/* Partners — 80 padding, 18 bold label, 200x56 logo slots 24 apart. */}
      <section className="py-16 md:py-20 flex flex-col gap-12">
        <p className="px-5 text-center text-lg leading-[150%] font-bold uppercase text-black">{fp.partnersLabel}</p>
        <Marquee
          gap="gap-6"
          items={partners}
          render={(p) => {
            const logoUrl = p.logo ? urlFor(p.logo).height(112).auto('format').url() : null;
            return (
              <div className="w-[200px] h-14 flex items-center justify-center gap-2 text-black">
                {logoUrl ? (
                  <img src={logoUrl} alt={p.name} className="max-h-9 max-w-[135px] object-contain" />
                ) : (
                  <span className="font-display text-2xl font-semibold whitespace-nowrap">{p.name}</span>
                )}
              </div>
            );
          }}
        />
      </section>

      {/* Promise + featured fests — 662 title | 538 body (80 apart), then the
          2x2 grid of 463-tall photo cards (32 gaps) and the "Browse" button. */}
      <Section width={1280}>
        <div className="flex flex-col gap-20">
          <div className="grid lg:grid-cols-[662px_1fr] gap-12 lg:gap-20">
            <div className="flex flex-col gap-4">
              <BlueTag>{fp.promiseEyebrow}</BlueTag>
              <Heading text={fp.promiseTitle} highlight={fp.promiseTitleHighlight} className="text-navy-900 max-w-[408px]" />
            </div>
            <div className="flex flex-col gap-10 lg:gap-20 items-start">
              <p className="text-base md:text-lg leading-[150%] text-black">{fp.promiseBody}</p>
              <HeroButton label={fp.promiseCtaLabel} href={fp.promiseCtaUrl} primary />
            </div>
          </div>

          {featured.length > 0 && (
            <>
              <CountedTitle text={fp.featuredTitle} count={featured.length} />
              <div className="grid lg:grid-cols-2 gap-8">
                {featured.map((f, i) => (
                  <div
                    key={f._id || f.name}
                    className="relative h-[463px] rounded-2xl overflow-hidden bg-navy-900 bg-cover bg-center outline outline-1 -outline-offset-1 outline-black/20 shadow-small"
                    style={{ backgroundImage: `url('${img(f.image, FEATURED_PHOTOS[i % 4], 1248)}')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />
                    <div className="relative h-full p-6 flex flex-col justify-end gap-3 text-white">
                      {f.dateBadge && (
                        <span className="w-fit h-11 px-4 inline-flex items-center rounded-[32px] bg-navy-900 outline outline-1 -outline-offset-1 outline-black/20 text-base leading-[150%] font-medium uppercase">
                          {f.dateBadge}
                        </span>
                      )}
                      <div className="flex flex-col gap-1">
                        <H5 as="h3" className="text-white">
                          {f.name}
                        </H5>
                        <p className="text-base leading-[150%]">{f.tagline}</p>
                      </div>
                      {f.featuredMeta && (
                        <Link
                          to={f.ctaUrl || '#lineup'}
                          className="w-fit inline-flex items-center gap-2 text-base leading-[150%] uppercase hover:underline underline-offset-2"
                        >
                          {f.featuredMeta} <ChevronRight size={24} strokeWidth={1.5} />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {fp.featuredCtaLabel && <HeroButton label={fp.featuredCtaLabel} href={fp.featuredCtaUrl} primary className="w-fit" />}
            </>
          )}
        </div>
      </Section>

      {/* Full lineup — centred counted title; cards (16 gaps) with a 463 photo,
          24-padded number, H5 + navy 16 semibold subtitle, copy over a hairline,
          and a navy "View … edition →" link. */}
      <Section id="lineup" width={1280} className="scroll-mt-24">
        <CountedTitle text={fp.lineupTitle} count={fests.length} className="justify-center text-center" />
        <div className="mt-20 grid lg:grid-cols-6 gap-8 lg:gap-4">
          {fests.map((f, i) => (
            <div
              key={f._id || f.name}
              className={`flex flex-col gap-4 rounded-b-2xl outline outline-1 -outline-offset-1 outline-black/20 ${festSpan(i)}`}
            >
              <div
                className="h-[463px] rounded-t-2xl bg-navy-50 bg-cover bg-center shadow-small"
                style={{ backgroundImage: `url('${img(f.image, FEST_PHOTOS[i % 8], 1264)}')` }}
              />
              <div className="flex-1 p-6 flex flex-col gap-6">
                <div className="flex-1 flex flex-col gap-4">
                  <Tagline>{pad(f.order ?? i + 1)}</Tagline>
                  <div className="flex-1 pb-4 border-b border-black/20 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <H5 as="h3" className="text-black">
                        {f.name}
                      </H5>
                      {f.subtitle && <p className="text-base leading-[150%] font-semibold text-navy-900">{f.subtitle}</p>}
                    </div>
                    <p className="text-base leading-[150%] text-black">{f.description}</p>
                  </div>
                </div>
                {f.ctaLabel && (
                  <Link
                    to={f.ctaUrl || '#'}
                    className="w-fit inline-flex items-center gap-2 text-base leading-[150%] uppercase text-navy-900 hover:underline underline-offset-2"
                  >
                    {f.ctaLabel} <ArrowRight size={24} strokeWidth={1.5} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Creative band — navy, 64 padding, centred; "slaps." italic Eastern Blue. */}
      <section className="bg-navy-900 px-5 py-16 md:p-16">
        <div className="max-w-[768px] mx-auto flex flex-col items-center gap-8 text-center text-white">
          <div className="flex flex-col gap-6">
            <h2 className="font-display font-medium text-[36px] leading-[130%] md:text-[52px] md:leading-[120%] tracking-[-0.01em]">
              {cIdx === -1 ? (
                fp.creativeTitle
              ) : (
                <>
                  {fp.creativeTitle.slice(0, cIdx)}
                  <span className="italic text-teal-500">{cItalic}</span>
                  {fp.creativeTitle.slice(cIdx + cItalic.length)}
                </>
              )}
            </h2>
            <p className="max-w-[603px] mx-auto text-base md:text-lg leading-[150%]">{fp.creativeBody}</p>
          </div>
          <HeroButton label={fp.creativeCtaLabel} href={fp.creativeCtaUrl} primary />
        </div>
      </section>

      {/* Process — centred title, three 405 hairline cards: navy number, H5, copy. */}
      <Section width={1280}>
        <Heading text={fp.processTitle} className="text-navy-900 text-center" />
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {processSteps.map((s, i) => (
            <div key={s.title} className="rounded-lg p-6 flex flex-col gap-2 bg-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small">
              <H5 as="span">{pad(i + 1)}</H5>
              <H5 as="h3" className="text-black">
                {s.title}
              </H5>
              <p className="text-base leading-[150%] text-black">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials — #eaeaf1; 2x2 quotes split by hairlines: 22px Playfair quote,
          560 rule, 66px avatar + name / role. */}
      <Section bg="bg-navy-50" width={1280}>
        <CountedTitle text={fp.testimonialsTitle} count={testimonials.length} />
        <div className="mt-20 grid md:grid-cols-2">
          {testimonials.map((t, i) => (
            <figure
              key={t._id || t.name}
              className={`m-0 flex flex-col gap-8 md:pr-12 border-black/20 ${
                i % 2 === 1 ? 'md:pl-8 md:border-l' : 'md:pr-[80px]'
              } ${i >= 2 ? 'md:pt-12 md:mt-0' : 'md:pb-12'} ${i < 2 ? 'md:border-b' : ''} max-md:py-8 max-md:border-b max-md:last:border-b-0`}
            >
              <blockquote className="m-0 max-w-[560px] font-display font-medium text-[22px] leading-[140%] tracking-[-0.01em] text-black">
                {t.quote}
              </blockquote>
              <figcaption className="max-w-[560px] pt-8 border-t border-black/20 flex items-center gap-4">
                <span
                  className="w-[66px] h-[66px] rounded-full bg-navy-100 bg-cover bg-center shrink-0"
                  style={{ backgroundImage: `url('${img(t.photo, VOICE_PHOTOS[i % 4], 132)}')` }}
                />
                <span>
                  <span className="block text-base leading-[150%] font-semibold text-black">{t.name}</span>
                  <span className="block text-sm leading-[150%] text-black">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Ledger — 616 photo (657 tall) | 616 copy, 80 apart. */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
            className="h-[335px] lg:h-[657px] bg-navy-50 bg-cover bg-center"
            style={{ backgroundImage: `url('${img(fp.ledgerImage, '/images/flagship/ledger.webp', 1232)}')` }}
          />
          <div className="flex flex-col gap-6 items-start">
            <BlueTag>{fp.ledgerEyebrow}</BlueTag>
            <Heading text={fp.ledgerTitle} highlight={fp.ledgerTitleHighlight} className="text-black" />
            <p className="text-base md:text-lg leading-[150%] text-black">{fp.ledgerBody}</p>
            <HeroButton label={fp.ledgerCtaLabel} to={fp.ledgerCtaUrl} primary className="mt-2" />
          </div>
        </div>
      </Section>

      {/* Closing CTA — navy, 64 padding, centred. */}
      <section className="bg-navy-900 px-5 py-16 md:p-16">
        <div className="max-w-[768px] mx-auto flex flex-col items-center gap-8 text-center text-white">
          <h2 className="font-display font-medium text-[36px] leading-[130%] md:text-[52px] md:leading-[120%] tracking-[-0.01em]">
            {fp.ctaTitle}
          </h2>
          {fp.ctaSubtitle && <p className="-mt-2 text-base md:text-lg leading-[150%]">{fp.ctaSubtitle}</p>}
          <div className="flex flex-wrap justify-center gap-4">
            {ctaButtons.map((b) => (
              <HeroButton key={b.label} label={b.label} href={b.url} primary={b.primary} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
