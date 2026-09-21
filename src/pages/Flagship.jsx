import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { useFlagshipData } from '../lib/useFlagshipData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

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
    'A B-school fest is not a B-school fest. Eight flagships, eight personalities. Simerations is finance + ego. Akiya is heart. TEDx is a quiet ego trip. Sportzania is shouting. Wakeup is the first time you stop pretending to know what you are doing. Each one is run by a different committee. Each one means something specific to someone. The standard is not "campus event" — the standard is the live industry around us.',
  promiseCtaLabel: 'Events calendar',
  promiseCtaUrl: '/events',

  featuredTitle: 'Featured fests',
  featuredCtaLabel: 'Browse all 42 talks',
  featuredCtaUrl: '#lineup',

  lineupTitle: 'The full lineup',

  creativeTitle: 'Creative that slaps.',
  creativeTitleItalic: 'slaps.',
  creativeBody:
    'Quality sits at the heart of every fest. We are not here to cut corners or strip tough. Each committee is rebuilt every year and the standard does not fall. No matter the thing, its focus is on making sure the creative absolutely stays.',
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

function TitleWithHighlight({ text = '', highlight, className, suffix }) {
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
      {body}
      {suffix && <span className="text-ink-400 font-normal"> {suffix}</span>}
    </h2>
  );
}

export default function Flagship() {
  const facts = useKeyFacts();
  const { data } = useFlagshipData();
  const fp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const fests = fillFactsDeep(data?.fests?.length ? data.fests : fallbackFests, facts);
  const partners = fillFactsDeep(
    data?.partners?.length ? data.partners : fallbackPartners,
    facts
  );
  const testimonials = fillFactsDeep(
    data?.testimonials?.length ? data.testimonials : fallbackTestimonials,
    facts
  );
  const pick = (k) => fillFactsDeep(fp[k]?.length ? fp[k] : fallbackPage[k], facts);
  const heroStats = pick('heroStats');
  const factStrip = pick('factStrip');
  const processSteps = pick('processSteps');
  const ctaButtons = pick('ctaButtons');

  const collage = fp.heroCollage?.length ? fp.heroCollage : [null, null, null, null];
  const ledgerImageUrl = fp.ledgerImage ? urlFor(fp.ledgerImage).width(900).url() : null;

  const featured = fests.filter((f) => f.featured);
  const pad = (n) => String(n).padStart(2, '0');

  // Hero title breaks after every sentence.
  const heroLines = (fp.heroTitle || '')
    .split(fp.heroTitleBreakAfter || '.')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s + (fp.heroTitleBreakAfter || '.'));

  const cItalic = fp.creativeTitleItalic;
  const cIdx = cItalic ? (fp.creativeTitle || '').indexOf(cItalic) : -1;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-32 pb-12 lg:pt-36 lg:pb-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="text-xs text-ink-400 mb-6 flex items-center">
            <Link to="/" className="hover:text-navy-900">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/events" className="hover:text-navy-900">Events</Link>
            <span className="mx-1.5">/</span>
            <span className="text-navy-900">Flagship Events</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <span className="text-[11px] font-semibold tracking-widest uppercase text-navy-900 mb-4 block">
                {fp.heroEyebrow}
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-navy-900 mb-5">
                {heroLines.map((l, i) => (
                  <span key={l}>
                    {i > 0 && <br />}
                    {l}
                  </span>
                ))}
              </h1>
              <p className="text-sm text-ink-600 leading-relaxed max-w-md mb-7">
                {fp.heroDescription}
              </p>
              <a
                href={fp.heroCtaUrl || '#'}
                className="bg-navy-900 hover:bg-navy-800 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md inline-flex items-center gap-2 mb-8"
              >
                {fp.heroCtaLabel} <ArrowUpRight size={15} />
              </a>

              <div className="flex gap-10">
                {heroStats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-3xl font-semibold text-navy-900">{s.value}</p>
                    <p className="text-[10px] uppercase tracking-wide text-ink-400 mt-1">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {collage.map((img, i) => (
                <div
                  key={i}
                  className={`rounded-lg bg-gray-200 bg-cover bg-center ${
                    i === 0 ? 'h-[130px]' : i === 1 ? 'h-[130px]' : 'h-[150px]'
                  }`}
                  style={img ? { backgroundImage: `url('${urlFor(img).width(600).url()}')` } : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navy fact strip */}
      {factStrip.length > 0 && (
        <section className="bg-navy-900 text-white py-3.5 overflow-hidden">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 max-w-[1280px] mx-auto px-6">
            {factStrip.map((f, i) => (
              <span key={`${f}-${i}`} className="text-[10px] font-semibold tracking-widest uppercase">
                {f}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Partner marquee */}
      <section className="py-10 border-b border-navy-100 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0 mb-6">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-ink-400">
            {fp.partnersLabel}
          </p>
        </div>
        <div className="flex w-max animate-marquee">
          {[...partners, ...partners].map((p, i) => {
            const logoUrl = p.logo ? urlFor(p.logo).width(200).url() : null;
            return (
              <div key={`${p.name}-${i}`} className="flex items-center gap-2 px-10 shrink-0">
                {logoUrl ? (
                  <img src={logoUrl} alt={p.name} className="h-6 object-contain" />
                ) : (
                  <>
                    <span className="w-4 h-4 rounded-full bg-navy-900" aria-hidden="true" />
                    <span className="font-display text-lg font-semibold text-navy-900">
                      {p.name}
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Promise */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <span className="inline-block text-[9px] font-semibold tracking-widest uppercase text-navy-900 bg-navy-50 px-2.5 py-1 rounded mb-5">
                {fp.promiseEyebrow}
              </span>
              <TitleWithHighlight
                text={fp.promiseTitle}
                highlight={fp.promiseTitleHighlight}
                className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900"
              />
            </div>
            <div>
              <p className="text-xs text-ink-600 leading-relaxed mb-6">{fp.promiseBody}</p>
              <a
                href={fp.promiseCtaUrl || '#'}
                className="bg-sky-600 hover:bg-teal-600 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md inline-flex items-center gap-2"
              >
                {fp.promiseCtaLabel} <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured fests */}
      {featured.length > 0 && (
        <section className="py-12 lg:py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
            <TitleWithHighlight
              text={fp.featuredTitle}
              suffix={`(${pad(featured.length)})`}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mb-8"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {featured.map((f) => {
                const imgUrl = f.image ? urlFor(f.image).width(800).url() : null;
                return (
                  <div
                    key={f._id || f.name}
                    className="relative h-[260px] rounded-lg overflow-hidden bg-gray-300 bg-cover bg-center"
                    style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-navy-950/10" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                      {f.dateBadge && (
                        <span className="absolute top-5 left-6 text-[9px] font-semibold tracking-widest uppercase bg-sky-600 px-2.5 py-1 rounded">
                          {f.dateBadge}
                        </span>
                      )}
                      <h3 className="font-display text-2xl font-semibold mb-2">{f.name}</h3>
                      <p className="text-[11px] text-white/80 leading-relaxed mb-3 max-w-sm">
                        {f.tagline}
                      </p>
                      {f.featuredMeta && (
                        <p className="text-[9px] font-semibold tracking-widest uppercase text-white/60 pt-3 border-t border-white/20">
                          {f.featuredMeta}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {fp.featuredCtaLabel && (
              <a
                href={fp.featuredCtaUrl || '#'}
                className="mt-8 bg-navy-900 hover:bg-navy-800 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md inline-flex items-center gap-2"
              >
                {fp.featuredCtaLabel} <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </section>
      )}

      {/* Full lineup */}
      <section id="lineup" className="py-16 lg:py-20 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="text-center mb-10">
            <TitleWithHighlight
              text={fp.lineupTitle}
              suffix={`(${pad(fests.length)})`}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fests.map((f, i) => {
              const imgUrl = f.image ? urlFor(f.image).width(700).url() : null;
              return (
                <div
                  key={f._id || f.name}
                  className="border border-navy-100 rounded-lg overflow-hidden flex flex-col"
                >
                  <div
                    className="h-[160px] bg-gray-200 bg-cover bg-center"
                    style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                  />
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-[11px] font-semibold text-ink-400 mb-2">
                      {pad(f.order ?? i + 1)}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-navy-900 mb-1">
                      {f.name}
                    </h3>
                    <p className="text-[11px] text-ink-400 mb-3">{f.subtitle}</p>
                    <p className="text-[11px] text-ink-600 leading-relaxed mb-4">
                      {f.description}
                    </p>
                    <Link
                      to={f.ctaUrl || '#'}
                      className="text-[10px] font-semibold tracking-widest uppercase text-navy-900 inline-flex items-center gap-1 mt-auto pt-3 border-t border-navy-100"
                    >
                      {f.ctaLabel} <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Creative band */}
      <section className="bg-navy-900 text-white py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0 text-center">
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mb-5">
            {cIdx === -1 ? (
              fp.creativeTitle
            ) : (
              <>
                {fp.creativeTitle.slice(0, cIdx)}
                <span className="italic">{cItalic}</span>
                {fp.creativeTitle.slice(cIdx + cItalic.length)}
              </>
            )}
          </h2>
          <p className="text-xs text-white/70 leading-relaxed max-w-xl mx-auto mb-7">
            {fp.creativeBody}
          </p>
          <a
            href={fp.creativeCtaUrl || '#'}
            className="bg-sky-600 hover:bg-teal-600 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md inline-flex items-center gap-2"
          >
            {fp.creativeCtaLabel} <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      {/* How we run a fest */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 text-center mb-10">
            {fp.processTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((s, i) => (
              <div key={s.title} className="border border-navy-100 rounded-lg p-6">
                <span className="text-[11px] font-semibold text-ink-400 mb-3 block">
                  {pad(i + 1)}
                </span>
                <h3 className="font-display text-lg font-semibold text-navy-900 mb-3">
                  {s.title}
                </h3>
                <p className="text-[11px] text-ink-600 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-navy-50 py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <TitleWithHighlight
            text={fp.testimonialsTitle}
            suffix={`(${pad(testimonials.length)})`}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((t) => {
              const photoUrl = t.photo ? urlFor(t.photo).width(120).url() : null;
              return (
                <figure
                  key={t._id || t.name}
                  className="bg-white border border-navy-100 rounded-lg p-6 m-0 flex flex-col"
                >
                  <blockquote className="text-xs text-navy-900 leading-relaxed mb-5 flex-1">
                    {t.quote}
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <span
                      className="w-9 h-9 rounded-full bg-navy-100 bg-cover bg-center shrink-0"
                      style={photoUrl ? { backgroundImage: `url('${photoUrl}')` } : undefined}
                    />
                    <span>
                      <span className="block text-xs font-semibold text-navy-900">{t.name}</span>
                      <span className="block text-[10px] text-ink-400">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* Student ledger */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div
              className="h-[280px] rounded-lg bg-gray-200 bg-cover bg-center"
              style={ledgerImageUrl ? { backgroundImage: `url('${ledgerImageUrl}')` } : undefined}
            />
            <div>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-ink-400 mb-4 block">
                {fp.ledgerEyebrow}
              </span>
              <TitleWithHighlight
                text={fp.ledgerTitle}
                highlight={fp.ledgerTitleHighlight}
                className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mb-5"
              />
              <p className="text-xs text-ink-600 leading-relaxed mb-6">{fp.ledgerBody}</p>
              <Link
                to={fp.ledgerCtaUrl || '#'}
                className="bg-sky-600 hover:bg-teal-600 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md inline-flex items-center gap-2"
              >
                {fp.ledgerCtaLabel} <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-navy-900 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4">{fp.ctaTitle}</h2>
          {fp.ctaSubtitle && (
            <p className="text-sm text-white/70 mb-8 max-w-xl mx-auto">{fp.ctaSubtitle}</p>
          )}
          <div className="flex flex-wrap justify-center gap-3">
            {ctaButtons.map((b) => (
              <a
                key={b.label}
                href={b.url || '#'}
                className={`text-sm font-medium px-4 py-2.5 rounded-md transition-colors ${
                  b.primary
                    ? 'bg-sky-600 hover:bg-teal-600 text-white'
                    : 'bg-white hover:bg-gray-100 text-navy-900'
                }`}
              >
                {b.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
