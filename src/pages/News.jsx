import { useState } from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle2, ChevronDown, Loader2, Mail, MapPin } from 'lucide-react';
import { Breadcrumb, HeroButton } from '../components/PageHero';
import { SocialLinks } from '../components/Footer';
import { Section, SectionTitle, Tagline, Heading, H5, H6 } from '../components/ui';
import { useNewsData } from '../lib/useNewsData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';
import CountUp from '../components/CountUp';

const TAGS = ['Placements', 'Appointment', 'Awards', 'Alumni', 'Events', 'Partnerships'];

// Figma hero tag dots: navy, gold, red, Eastern Blue.
const TAG_DOTS = ['bg-navy-900', 'bg-[#dfb400]', 'bg-[#d00416]', 'bg-teal-500'];
// Mobile-only strip under the hero (Figma 375 frame).
const FACT_STRIP = ['SIMSREE Mumbai', 'Student-run since 1983', 'Eight fests · One year', 'Flagship events'];
// Figma photos (the hero collage repeats the Flagship Events one).
const HERO_PHOTOS = [1, 2, 3, 4].map((n) => `/images/flagship/hero-${n}.webp`);
const img = (image, fallback, w) => (image ? urlFor(image).width(w).auto('format').url() : fallback);

const fallbackPage = {
  heroTitle: 'From the SIMSREE newsroom.',
  heroTitleBreakAfter: 'the',
  heroTitleHighlight: 'newsroom.',
  heroDescription:
    'Press releases, awards, campus stories and the data behind one of India’s most decorated student-run B-schools. Updated by the Marketing & Media Committee every week.',
  heroTags: [
    'Founded {{foundedYear}}',
    'Autonomous · University of Mumbai',
    'Government-funded',
    '{{placementRate}} placements · 14 yrs running',
  ],

  featuredEyebrow: 'Featured Story',

  numbersTitle: 'SIMSREE in numbers',
  numbers: [
    { value: '42 yrs', label: 'Since {{foundedYear}}', note: 'Autonomous under University of Mumbai · government-funded' },
    { value: '{{placementRate}}', label: 'placements · 14 years running', note: '2025-26 batch · final report · July 2026' },
    { value: '₹38.4 LPA', label: 'highest CTC offered · MMS 2026', note: 'Median: ₹18.2 LPA · all-round average up 11% YoY' },
    { value: '8', label: 'flagship student-run programmes', note: 'Simerations · TEDxSIMSREE · Aikya · Sportzania · Pulse · others' },
    { value: '{{committeeCount}}', label: 'active student committees', note: 'Run the institute end-to-end · no faculty advisor curates fests' },
    { value: '12K +', label: 'alumni placed at Fortune 500 firms', note: 'McKinsey · Goldman · HUL · Asian Paints · Wipro · and more' },
  ],
  numbersFootnote:
    'Independent verification: placement data is annually audited by Crisil and published in the Placement Reports Hub. NIRF rankings filed in March 2026.',

  listEyebrow: 'Most Recent',
  listTitle: 'The latest SIMSREE news',
  filterLabel: 'Filter by',

  whyTitle: 'Why people choose SIMSREE',
  whyCards: [
    {
      title: 'Government-funded · zero tuition fee for MMS',
      description:
        'SIMSREE is an autonomous institute under the University of Mumbai. The MMS programme is fully government-funded; students pay only the standard university fee.',
    },
    {
      title: 'Student-driven system, since 1983',
      description:
        '42 years of student-run committees. Every fest, every guest lecture, every placement drive is conceived, funded and executed by 13 student committees.',
    },
    {
      title: 'Industry on campus, every week',
      description:
        'Weekly guest lectures from CXOs · monthly CFO panels · breakfast briefings · live consulting projects from sponsors like Asian Paints, Bajaj Finserv, Wipro, Citi.',
    },
    {
      title: 'Top-tier placements at a top-tier ROI',
      description:
        '{{placementRate}} placements for 14 consecutive years. Highest 2026 CTC: ₹38.4 LPA. Median: ₹18.2 LPA. Compare against the tuition fee and the picture sharpens.',
    },
  ],

  recognitionTitle: 'Recognised by those who notice.',
  recognitionTitleHighlight: 'those who notice.',

  pressEyebrow: 'Press Contact',
  pressTitle: 'Contact the SIMSREE press team',
  pressSubtitle: 'Please direct all press enquiries to:',
  pressEmail: 'press@simsree.org',
  pressAddress: '{{address}}',
  pressConsentLabel:
    'By submitting this form, you’re agreeing to receive periodic news releases from SIMSREE. You can unsubscribe at any time. Your information will be used in accordance with our Privacy Policy.',
  pressSubmitLabel: 'Submit',
  organisationOptions: ['Newspaper', 'Magazine', 'Digital publication', 'Television', 'Radio', 'Other'],
};

const fallbackNews = [
  {
    tag: 'Placements',
    featured: true,
    featuredBadge: 'Placements 2026',
    title: 'SIMSREE crosses {{placementRate}} placement for the 14th consecutive year - highest CTC ₹38.4 LPA, median ₹18.2 LPA.',
    date: 'May 2, 2026',
    summary:
      '84 recruiters on campus over a 12-day window. Final report drops mid-July with the full break-down by sector, role-type, and pre-placement-offer conversions. Crisil-audited · published with permission of the Placement Committee.',
    featuredRows: [
      { label: 'Filed', value: '2 May 2026' },
      { label: 'Filed by', value: 'Placement Committee · Marketing & Media' },
      { label: 'Coverage', value: 'Times of India · Mint · Hindu BusinessLine' },
    ],
    order: 1,
  },
  {
    tag: 'Placements',
    title: 'SIMSREE crosses {{placementRate}} placement for the 14th consecutive year',
    date: 'May 2, 2026',
    summary:
      'Highest CTC of ₹38.4 LPA · median ₹18.2 LPA · 84 recruiters on campus over a 12-day window. Final report drops mid-July.',
    order: 2,
  },
  {
    tag: 'Appointment',
    title: 'SIMSREE Director Dr. K. R. Chari to chair MAHE’s ESG Education Advisory Board',
    date: 'April 28, 2026',
    summary:
      'A two-year appointment, effective June 2026. Dr. Chari will help design ESG curricula across 12 partner institutions in the network.',
    order: 3,
  },
  {
    tag: 'Awards',
    title: 'Three SIMSREE student teams shortlisted for the global HUL Hackathon finals',
    date: 'April 26, 2026',
    summary:
      'A two-year appointment, effective June 2026. Dr. Chari will help design ESG curricula across 12 partner institutions in the network.',
    order: 4,
  },
  {
    tag: 'Awards',
    title: 'Simerations 2025 named "Best B-school Fest in Western India" by The Hindu BusinessLine',
    date: 'April 28, 2026',
    summary:
      'A two-year appointment, effective June 2026. Dr. Chari will help design ESG curricula across 12 partner institutions in the network.',
    order: 5,
  },
  {
    tag: 'Alumni',
    title: 'Three SIMSREE student teams shortlisted for the global HUL Hackathon finals',
    date: 'April 28, 2026',
    summary:
      'A two-year appointment, effective June 2026. Dr. Chari will help design ESG curricula across 12 partner institutions in the network.',
    order: 6,
  },
  {
    tag: 'Events',
    title: 'Three SIMSREE student teams shortlisted for the global HUL Hackathon finals',
    date: 'April 28, 2026',
    summary:
      'A two-year appointment, effective June 2026. Dr. Chari will help design ESG curricula across 12 partner institutions in the network.',
    order: 7,
  },
  {
    tag: 'Partnerships',
    title: 'Three SIMSREE student teams shortlisted for the global HUL Hackathon finals',
    date: 'April 28, 2026',
    summary:
      'A two-year appointment, effective June 2026. Dr. Chari will help design ESG curricula across 12 partner institutions in the network.',
    order: 8,
  },
];

const fallbackRecognitions = [
  { year: '2025', title: 'Best B-school Fest', source: 'The Hindu BusinessLine', order: 1 },
  { year: '2024', title: 'Top 10 ROI', source: 'Outlook India', order: 2 },
  { year: '2024', title: 'NIRF Tier-1', source: 'MoE India', order: 3 },
  { year: '2025', title: '{{placementRate}} Placement Year', source: '14 yrs running', order: 4 },
];

const PRESS_FIELDS = [
  { name: 'firstName', label: 'First name', required: true },
  { name: 'lastName', label: 'Last name', required: true },
  { name: 'email', label: 'Email address', type: 'email', required: true },
  { name: 'phone', label: 'Phone number', type: 'tel' },
  { name: 'organisation', label: 'Organisation', type: 'select', required: true, full: true },
  { name: 'message', label: 'What are you covering?', type: 'textarea', rows: 5, placeholder: 'Type your message...', required: true, full: true },
];

const EMPTY = Object.fromEntries(PRESS_FIELDS.map((f) => [f.name, '']));

function validate(values, consent) {
  const errors = {};
  for (const f of PRESS_FIELDS) {
    if (f.required && !values[f.name].trim()) errors[f.name] = 'Required';
  }
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address';
  }
  if (!consent) errors.consent = 'Required';
  return errors;
}

export default function News() {
  const facts = useKeyFacts();
  const { data } = useNewsData();
  const np = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const news = fillFactsDeep(data?.news?.length ? data.news : fallbackNews, facts);
  const recognitions = fillFactsDeep(
    data?.recognitions?.length ? data.recognitions : fallbackRecognitions,
    facts
  );
  const pick = (k) => fillFactsDeep(np[k]?.length ? np[k] : fallbackPage[k], facts);
  const heroTags = pick('heroTags');
  const numbers = pick('numbers');
  const whyCards = pick('whyCards');
  const orgOptions = pick('organisationOptions');

  const [tag, setTag] = useState('All');
  const [values, setValues] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const collage = [0, 1, 2, 3].map((i) => img(np.heroCollage?.[i], HERO_PHOTOS[i], 900));
  // Real news documents may predate the `featured` field, so fall back to the
  // drafted featured story until an editor flags one. Live items always fill
  // the list below it.
  const featured =
    news.find((n) => n.featured) || fillFactsDeep(fallbackNews.find((n) => n.featured), facts);
  const listItems = news.filter((n) => !n.featured);

  // Figma lists these categories whether or not a story is filed under one yet.
  const chips = ['All', ...TAGS.filter((t) => t !== 'Appointment')];
  const visible = tag === 'All' ? listItems : listItems.filter((n) => n.tag === tag);

  const sending = status === 'sending';

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const handleBlur = (name) => {
    setTouched((t) => ({ ...t, [name]: true }));
    const next = validate(values, consent);
    setErrors((e) => ({ ...e, [name]: next[name] }));
  };

  const mailtoHref = () => {
    const lines = PRESS_FIELDS.filter((f) => values[f.name].trim()).map(
      (f) => `${f.label}: ${values[f.name].trim()}`
    );
    const body = `${lines.join('\n')}\n\nSent from the SIMSREE press contact form.`;
    return `mailto:${np.pressEmail}?subject=${encodeURIComponent('Press enquiry')}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = validate(values, consent);
    setErrors(next);
    setTouched(Object.fromEntries([...PRESS_FIELDS.map((f) => [f.name, true]), ['consent', true]]));
    if (Object.values(next).some(Boolean)) return;

    // No endpoint configured — hand the enquiry to the journalist's mail client.
    if (!np.pressEndpointUrl) {
      window.location.href = mailtoHref();
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(np.pressEndpointUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, consent }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('success');
      setValues(EMPTY);
      setConsent(false);
      setTouched({});
    } catch {
      setStatus('fail');
    }
  };

  const fieldError = (name) => touched[name] && errors[name];

  const title = np.heroTitle || '';
  const brk = np.heroTitleBreakAfter;
  const bIdx = brk ? title.indexOf(brk) : -1;
  const line1 = bIdx === -1 ? title : title.slice(0, bIdx + brk.length);
  const line2 = bIdx === -1 ? '' : title.slice(bIdx + brk.length).trim();
  const renderLine = (line) => {
    const h = np.heroTitleHighlight;
    const i = h ? line.indexOf(h) : -1;
    if (i === -1) return line;
    return (
      <>
        {line.slice(0, i)}
        <span className="text-teal-500">{h}</span>
        {line.slice(i + h.length)}
      </>
    );
  };

  // Figma: 48px bordered inputs, 16/150 labels 8 above.
  const inputCls = (err) =>
    `w-full rounded bg-white border px-3 text-base leading-[150%] text-black placeholder:text-black/60 focus:outline-none focus:ring-2 focus:ring-teal-500/40 ${
      err ? 'border-red-500' : 'border-black'
    }`;

  return (
    <div className="bg-white">
      {/* Hero — white. 674 copy column (72px title, 18/150 body, dot tags) | 532
          collage of four photos in two 12-gapped rows. */}
      <section className="px-5 md:px-[55px] pt-[222px] lg:pt-[204px] pb-[72px]">
        <div className="max-w-[1330px] mx-auto grid lg:grid-cols-[762px_532px] justify-between gap-9 items-center">
          <div className="flex flex-col gap-4">
            <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Events', to: '/events' }, { label: 'News' }]} className="!text-black" />
            <div className="mt-6 lg:mt-10 max-w-[674px] flex flex-col gap-6 lg:gap-8">
              <div className="flex flex-col gap-6">
                <h1 className="font-display font-medium text-[36px] leading-[130%] md:text-[72px] md:leading-[120%] tracking-[-0.01em] text-navy-900">
                  {/* Desktop breaks after "the"; the mobile frame just wraps. */}
                  {renderLine(line1)}
                  {line2 && (
                    <>
                      <br className="max-md:hidden" /> {renderLine(line2)}
                    </>
                  )}
                </h1>
                <p className="text-base md:text-lg leading-[150%] text-black">{np.heroDescription}</p>
              </div>
              <ul className="list-none m-0 p-0 flex flex-wrap gap-4 max-w-[640px]">
                {heroTags.map((t, i) => (
                  <li
                    key={t}
                    className="flex items-center gap-2 px-2.5 py-1 rounded-2xl bg-white outline outline-1 -outline-offset-1 outline-black/20 text-sm leading-[150%] text-navy-900"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${TAG_DOTS[i % TAG_DOTS.length]}`} aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 md:grid-cols-[194fr_326fr] gap-3 h-[304px]">
              <div className="bg-navy-50 bg-cover bg-center" style={{ backgroundImage: `url('${collage[0]}')` }} />
              <div className="bg-navy-50 bg-cover bg-center" style={{ backgroundImage: `url('${collage[1]}')` }} />
            </div>
            <div className="grid grid-cols-[129fr_194fr] md:grid-cols-[326fr_194fr] gap-3 h-[291px]">
              <div className="bg-navy-50 bg-cover bg-center" style={{ backgroundImage: `url('${collage[2]}')` }} />
              <div className="bg-navy-50 bg-cover bg-center" style={{ backgroundImage: `url('${collage[3]}')` }} />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile only (Figma 375 frame): the navy fact strip under the hero. */}
      <div className="md:hidden bg-navy-900 py-8 overflow-hidden">
        <div className="flex w-max gap-20 animate-marquee">
          {[...FACT_STRIP, ...FACT_STRIP].map((f, i) => (
            <span key={i} aria-hidden={i >= FACT_STRIP.length ? 'true' : undefined} className="text-base leading-[150%] uppercase text-white whitespace-nowrap">
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Featured story + numbers — one 112/64 layout: tagline over a hairline, the
          1312 story card (632 photo | 32-padded copy), then the navy numbers card. */}
      <section className="px-5 py-12 md:px-16 md:py-20">
        <div className="max-w-[1312px] mx-auto flex flex-col gap-12 md:gap-16">
          {featured && (
            <div className="flex flex-col gap-12">
              <div className="max-w-[972px] w-full mx-auto flex items-center gap-8">
                <Tagline className="shrink-0 text-black">{np.featuredEyebrow}</Tagline>
                <span className="flex-1 h-px bg-black/20" aria-hidden="true" />
              </div>
              <article className="hover-card flex flex-col lg:flex-row lg:items-center gap-12 rounded-2xl outline outline-1 -outline-offset-1 outline-black/20 shadow-small">
                <div
                  className="h-[357px] lg:h-[674px] lg:w-[632px] shrink-0 rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl bg-navy-50 bg-cover bg-center"
                  style={{ backgroundImage: `url('${img(featured.image, '/images/news/featured.webp', 1264)}')` }}
                />
                <div className="flex-1 min-w-0 px-4 pb-8 lg:p-8 flex flex-col gap-6">
                  {featured.featuredBadge && (
                    <span className="w-fit px-2.5 py-1 rounded-2xl bg-navy-900 text-sm leading-[150%] uppercase text-white">
                      {featured.featuredBadge}
                    </span>
                  )}
                  <Heading as="h2" text={featured.title} className="text-navy-900" />
                  <p className="text-base md:text-lg leading-[150%] text-black">{featured.summary}</p>
                  {featured.featuredRows?.length > 0 && (
                    <dl className="m-0 pt-6 border-t border-black/20 flex flex-wrap gap-x-12 gap-y-3 text-sm leading-[150%] text-black">
                      {featured.featuredRows.map((r) => (
                        <div key={r.label}>
                          <dt className="inline">{r.label}:</dt> <dd className="inline m-0">{r.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </article>
            </div>
          )}

          {/* Numbers — navy radius-16 card; 3-up rows split by #eaeaf1 rules:
              72px value, 16 semibold label, 18/150 note. */}
          <div className="rounded-2xl bg-navy-900 text-white px-6 py-28 md:px-16">
            <Heading text={np.numbersTitle} className="text-white" />
            <div className="mt-10 md:mt-12 flex flex-col gap-12">
              {[numbers.slice(0, 3), numbers.slice(3, 6)].filter((r) => r.length).map((row, ri) => (
                <div key={ri} className={`grid lg:grid-cols-3 gap-8 ${ri ? 'pt-12 border-t border-navy-50' : ''}`}>
                  {row.map((n, i) => (
                    <div
                      key={n.label}
                      className={`flex flex-col gap-4 ${i ? 'max-lg:pt-8 max-lg:border-t lg:pl-8 lg:border-l border-navy-50' : ''}`}
                    >
                      <span className="font-display font-medium text-[48px] leading-[120%] md:text-[72px] tracking-[-0.01em]"><CountUp value={n.value} /></span>
                      <div className="flex flex-col gap-6">
                        <span className="text-base leading-[150%] font-semibold">{n.label}</span>
                        <p className="text-base md:text-lg leading-[150%]">{n.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {np.numbersFootnote && <p className="mt-10 md:mt-12 text-sm leading-[150%]">{np.numbersFootnote}</p>}
          </div>
        </div>
      </section>

      {/* News list — 768 header (tagline over a hairline, H2, "Filter by" + tabs),
          then 1026 bar cards: outline tag + date, H5 title, 16/150 summary. */}
      <section className="px-5 py-12 md:px-16 md:py-20">
        <div className="max-w-[1026px] mx-auto flex flex-col gap-12">
          <div className="max-w-[768px] w-full mx-auto flex flex-col gap-8">
            <div className="flex items-center gap-8">
              <Tagline className="shrink-0 text-black">{np.listEyebrow}</Tagline>
              <span className="flex-1 h-px bg-black/20" aria-hidden="true" />
            </div>
            <Heading text={np.listTitle} className="text-navy-900" />
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <span className="text-sm leading-[150%] font-semibold uppercase text-black">{np.filterLabel}:</span>
              <div className="flex flex-wrap">
                {chips.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setTag(c)}
                    aria-pressed={c === tag}
                    className={`h-11 px-4 rounded text-base leading-[150%] transition-colors ${
                      c === tag ? 'bg-navy-900 text-white font-medium outline outline-1 -outline-offset-1 outline-black/20' : 'text-black hover:bg-navy-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {visible.length > 0 ? (
              visible.map((n) => {
                const inner = (
                  <>
                    <span className="w-[3px] shrink-0 bg-teal-500" aria-hidden="true" />
                    <div className="flex-1 min-w-0 py-8 pr-4 md:pr-0 flex flex-col gap-4">
                      <div className="flex flex-wrap items-center gap-4 text-sm leading-[150%] font-semibold text-black">
                        {n.tag && <span className="px-2.5 py-1 rounded outline outline-1 -outline-offset-1 outline-black/20 uppercase">{n.tag}</span>}
                        <span>{n.date}</span>
                      </div>
                      <div className="flex flex-col gap-4">
                        <H5 as="h3" className="text-black max-md:text-[22px]">
                          {n.title}
                        </H5>
                        {n.summary && <p className="text-base leading-[150%] text-black">{n.summary}</p>}
                      </div>
                    </div>
                  </>
                );
                const cls = 'rounded-lg overflow-hidden rounded-lg overflow-hidden flex gap-4 md:gap-8 bg-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small';
                return n.linkUrl ? (
                  <a key={n._id || n.title + n.order} href={n.linkUrl} className={`${cls} hover:shadow-medium transition-shadow`}>
                    {inner}
                  </a>
                ) : (
                  <article key={n._id || n.title + n.order} className={cls}>
                    {inner}
                  </article>
                );
              })
            ) : (
              <p className="text-base leading-[150%] text-black">No stories in this category yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Why people choose — navy band; four 272 columns split by #eaeaf1 rules. */}
      <section className="bg-navy-900 text-white px-5 py-12 md:px-16 md:py-20">
        <div className="max-w-[1280px] mx-auto">
          <Heading text={np.whyTitle} className="text-white" />
          <div className="mt-10 md:mt-12 pt-12 border-t border-navy-50 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyCards.map((c, i) => (
              <div
                key={c.title}
                className={`flex flex-col gap-4 ${i ? 'max-md:pt-8 max-md:border-t lg:pl-8 lg:border-l border-navy-50' : ''}`}
              >
                <Tagline className="text-white">{String(i + 1).padStart(2, '0')}</Tagline>
                <H6 as="h3" className="text-white">
                  {c.title}
                </H6>
                <p className="text-base md:text-lg leading-[150%]">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition — centred H2, four 296 hairline cards: navy year, black title. */}
      <Section width={1280}>
        <Heading text={np.recognitionTitle} highlight={np.recognitionTitleHighlight} className="text-navy-900 text-center" />
        <div className="mt-10 md:mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recognitions.map((r) => (
            <div key={r._id || r.title + r.year} className="rounded-lg min-h-[212px] p-6 flex flex-col gap-2 bg-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small">
              <H5 as="span">{r.year}</H5>
              <H5 as="h3" className="text-black">
                {r.title}
                {r.source && (
                  <>
                    <br />
                    {r.source}
                  </>
                )}
              </H5>
            </div>
          ))}
        </div>
      </Section>

      {/* Press contact — #eaeaf1; 600 copy (title, mail + address rows, socials) | 600 form. */}
      <Section bg="bg-navy-50" width={1280}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionTitle tagline={np.pressEyebrow} title={np.pressTitle} body={np.pressSubtitle} width={600} />
            <div className="py-2 flex flex-col gap-4 text-base leading-[150%] text-black">
              <a href={`mailto:${np.pressEmail}`} className="flex items-center gap-4 hover:underline underline-offset-2">
                <Mail size={24} strokeWidth={1.5} className="shrink-0" /> {np.pressEmail}
              </a>
              <p className="flex items-center gap-4">
                <MapPin size={24} strokeWidth={1.5} className="shrink-0" /> {np.pressAddress}
              </p>
            </div>
            <SocialLinks className="text-black" />
          </div>

          {status === 'success' ? (
            <div role="status" className="rounded-xl self-start bg-white p-8 outline outline-1 -outline-offset-1 outline-black/20 flex flex-col gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={24} className="text-emerald-600 shrink-0" />
                <div>
                  <H6 as="h3" className="text-black">
                    Enquiry sent.
                  </H6>
                  <p className="text-base leading-[150%] text-black">The press team replies within 1 business day.</p>
                </div>
              </div>
              <HeroButton label="Send another" onClick={() => setStatus('idle')} className="w-fit" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {status === 'fail' && (
                <div role="alert" className="rounded-lg mb-6 p-5 bg-white outline outline-1 -outline-offset-1 outline-red-300 flex items-start gap-3">
                  <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                  <div className="text-base leading-[150%] text-black">
                    <p>That didn’t go through - your details are still here.</p>
                    <a href={mailtoHref()} className="text-navy-900 underline underline-offset-2">
                      Email {np.pressEmail} instead
                    </a>
                  </div>
                </div>
              )}
              <fieldset disabled={sending} className="border-0 p-0 m-0 disabled:opacity-60">
                <div className="grid md:grid-cols-2 gap-6">
                  {PRESS_FIELDS.map((f) => {
                    const err = fieldError(f.name);
                    return (
                      <div key={f.name} className={`flex flex-col gap-2 ${f.full ? 'md:col-span-2' : ''}`}>
                        <label htmlFor={`p-${f.name}`} className="text-base leading-[150%] text-black">
                          {f.label}
                          {f.required && '*'}
                        </label>
                        {f.type === 'select' ? (
                          <div className="relative">
                            <select
                              id={`p-${f.name}`}
                              value={values[f.name]}
                              onChange={(e) => setField(f.name, e.target.value)}
                              onBlur={() => handleBlur(f.name)}
                              aria-invalid={!!err}
                              className={`${inputCls(err)} h-12 pr-10 appearance-none`}
                            >
                              <option value="">Select one...</option>
                              {orgOptions.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                            <ChevronDown size={24} strokeWidth={1.5} className="pointer-events-none absolute right-3 top-3" />
                          </div>
                        ) : f.type === 'textarea' ? (
                          <textarea
                            id={`p-${f.name}`}
                            value={values[f.name]}
                            onChange={(e) => setField(f.name, e.target.value)}
                            onBlur={() => handleBlur(f.name)}
                            placeholder={f.placeholder}
                            aria-invalid={!!err}
                            className={`${inputCls(err)} h-[180px] py-3 resize-y`}
                          />
                        ) : (
                          <input
                            id={`p-${f.name}`}
                            type={f.type || 'text'}
                            value={values[f.name]}
                            onChange={(e) => setField(f.name, e.target.value)}
                            onBlur={() => handleBlur(f.name)}
                            aria-invalid={!!err}
                            className={`${inputCls(err)} h-12`}
                          />
                        )}
                        {err && <p className="text-sm text-red-600">{err}</p>}
                      </div>
                    );
                  })}
                </div>

                <label className="mt-6 pb-4 flex items-start gap-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (e.target.checked) setErrors((er) => ({ ...er, consent: undefined }));
                    }}
                    onBlur={() => handleBlur('consent')}
                    aria-invalid={!!fieldError('consent')}
                    className="mt-1 w-[18px] h-[18px] shrink-0 accent-navy-900"
                  />
                  <span className="text-base leading-[150%] text-black">{np.pressConsentLabel}</span>
                </label>
                {fieldError('consent') && <p className="text-sm text-red-600">Please accept to continue.</p>}

                <button
                  type="submit"
                  className="mt-6 h-11 px-6 rounded-md bg-navy-900 hover:bg-navy-800 outline outline-1 -outline-offset-1 outline-navy-900 text-white text-base leading-[150%] font-medium inline-flex items-center gap-3 transition-colors"
                >
                  {sending && <Loader2 size={20} className="animate-spin" />}
                  {sending ? 'Sending…' : np.pressSubmitLabel}
                  {!sending && <ArrowUpRight size={24} strokeWidth={1.5} />}
                </button>
              </fieldset>
            </form>
          )}
        </div>
      </Section>
    </div>
  );
}
