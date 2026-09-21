import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, Mail, MapPin } from 'lucide-react';
import { useNewsData } from '../lib/useNewsData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const TAGS = ['Placements', 'Appointment', 'Awards', 'Alumni', 'Events', 'Partnerships'];

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
    { value: '8', label: 'flagship student-run programmes', note: 'Simerations · TEDxSIMSREE · Akiya · Sportzania · Pulse · others' },
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
      title: 'Government-funded · zero tuition for MMS',
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
    title: 'SIMSREE crosses {{placementRate}} placement for the 14th consecutive year — highest CTC ₹38.4 LPA, median ₹18.2 LPA.',
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

function TitleWithHighlight({ text = '', highlight, className }) {
  const idx = highlight ? text.indexOf(highlight) : -1;
  if (idx === -1) return <h2 className={className}>{text}</h2>;
  return (
    <h2 className={className}>
      {text.slice(0, idx)}
      <span className="text-teal-500">{highlight}</span>
      {text.slice(idx + highlight.length)}
    </h2>
  );
}

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

  const collage = np.heroCollage?.length ? np.heroCollage : [null, null, null, null];
  // Real news documents may predate the `featured` field, so fall back to the
  // drafted featured story until an editor flags one. Live items always fill
  // the list below it.
  const featured =
    news.find((n) => n.featured) || fillFactsDeep(fallbackNews.find((n) => n.featured), facts);
  const listItems = news.filter((n) => !n.featured);

  const present = new Set(listItems.map((n) => n.tag).filter(Boolean));
  const chips = ['All', ...TAGS.filter((t) => present.has(t))];
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
            <span className="text-navy-900">News</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-navy-900 mb-5">
                {renderLine(line1)}
                {line2 && (
                  <>
                    <br />
                    {renderLine(line2)}
                  </>
                )}
              </h1>
              <p className="text-xs text-ink-600 leading-relaxed max-w-md mb-5">
                {np.heroDescription}
              </p>
              <div className="flex flex-wrap gap-2">
                {heroTags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] text-navy-900 border border-navy-100 rounded px-2.5 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {collage.map((img, i) => (
                <div
                  key={i}
                  className="h-[110px] rounded bg-gray-200 bg-cover bg-center"
                  style={img ? { backgroundImage: `url('${urlFor(img).width(500).url()}')` } : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured story */}
      {featured && (
        <section className="pb-12 lg:pb-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-ink-400 mb-4">
              {np.featuredEyebrow}
            </p>
            <div className="border border-navy-100 rounded-lg overflow-hidden flex flex-col lg:flex-row">
              <div
                className="lg:w-[38%] shrink-0 h-[220px] lg:h-auto bg-gray-200 bg-cover bg-center"
                style={
                  featured.image
                    ? { backgroundImage: `url('${urlFor(featured.image).width(800).url()}')` }
                    : undefined
                }
              />
              <div className="flex-1 min-w-0 p-7">
                {featured.featuredBadge && (
                  <span className="inline-block text-[9px] font-semibold tracking-widest uppercase text-navy-900 bg-navy-50 px-2.5 py-1 rounded mb-4">
                    {featured.featuredBadge}
                  </span>
                )}
                <h2 className="font-display text-2xl font-semibold text-navy-900 mb-4 leading-snug">
                  {featured.title}
                </h2>
                <p className="text-xs text-ink-600 leading-relaxed mb-5">{featured.summary}</p>
                {featured.featuredRows?.length > 0 && (
                  <dl className="m-0 border-t border-navy-100 pt-4">
                    {featured.featuredRows.map((r) => (
                      <div key={r.label} className="flex gap-3 text-[11px] py-1">
                        <dt className="text-navy-900 font-medium w-[70px] shrink-0">{r.label}</dt>
                        <dd className="text-ink-600 m-0">{r.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SIMSREE in numbers */}
      <section className="pb-12 lg:pb-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="bg-navy-900 text-white rounded-lg p-8 lg:p-10">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-8">
              {np.numbersTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
              {numbers.map((n) => (
                <div key={n.label} className="border-t border-white/20 pt-4">
                  <p className="font-display text-3xl font-semibold mb-1">{n.value}</p>
                  <p className="text-[11px] font-medium mb-2">{n.label}</p>
                  <p className="text-[10px] text-white/55 leading-relaxed">{n.note}</p>
                </div>
              ))}
            </div>
            {np.numbersFootnote && (
              <p className="text-[10px] text-white/45 leading-relaxed mt-8 pt-6 border-t border-white/15">
                {np.numbersFootnote}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* News list */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[900px] mx-auto px-6 lg:px-0">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-ink-400 mb-3 pb-3 border-b border-navy-100">
            {np.listEyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mb-6">
            {np.listTitle}
          </h2>

          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-[11px] text-ink-400 mr-1">{np.filterLabel}</span>
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setTag(c)}
                aria-pressed={c === tag}
                className={`text-[11px] px-3.5 py-1.5 rounded transition-colors ${
                  c === tag
                    ? 'bg-navy-900 text-white'
                    : 'text-ink-600 hover:text-navy-900 hover:bg-navy-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {visible.map((n) => (
              <article
                key={n._id || `${n.title}-${n.order}`}
                className="border border-navy-100 border-l-2 border-l-sky-600 rounded-sm px-6 py-5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[9px] font-semibold tracking-widest uppercase text-navy-900 bg-navy-50 px-2 py-1 rounded">
                    {n.tag}
                  </span>
                  <span className="text-[10px] text-ink-400">{n.date}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-navy-900 mb-2 leading-snug">
                  {n.title}
                </h3>
                {n.summary && (
                  <p className="text-[11px] text-ink-600 leading-relaxed">{n.summary}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why people choose */}
      <section className="bg-navy-900 text-white py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mb-10">{np.whyTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyCards.map((c, i) => (
              <div key={c.title} className="border-t border-white/20 pt-4">
                <span className="text-[10px] text-white/45 mb-2 block">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-base font-semibold mb-3">{c.title}</h3>
                <p className="text-[11px] text-white/60 leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="text-center mb-10">
            <TitleWithHighlight
              text={np.recognitionTitle}
              highlight={np.recognitionTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900"
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {recognitions.map((r) => (
              <div
                key={r._id || `${r.title}-${r.year}`}
                className="border border-navy-100 rounded-sm px-6 py-5"
              >
                <p className="font-display text-xl font-semibold text-sky-600 mb-3">{r.year}</p>
                <p className="text-sm font-medium text-navy-900 mb-1">{r.title}</p>
                <p className="text-[11px] text-ink-600">{r.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press contact */}
      <section className="bg-navy-50 py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-ink-400 mb-4 block">
                {np.pressEyebrow}
              </span>
              <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mb-5">
                {np.pressTitle}
              </h2>
              <p className="text-xs text-ink-600 mb-6">{np.pressSubtitle}</p>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${np.pressEmail}`}
                  className="text-xs text-navy-900 hover:text-sky-600 transition-colors flex items-center gap-2.5"
                >
                  <Mail size={14} className="shrink-0" /> {np.pressEmail}
                </a>
                <p className="text-xs text-ink-600 flex items-center gap-2.5">
                  <MapPin size={14} className="shrink-0" /> {np.pressAddress}
                </p>
              </div>
            </div>

            {status === 'success' ? (
              <div
                role="status"
                className="border border-emerald-200 bg-emerald-50 rounded-lg p-8 self-start"
              >
                <div className="flex items-start gap-3 mb-5">
                  <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-lg font-semibold text-navy-900 mb-1">
                      Enquiry sent.
                    </h3>
                    <p className="text-xs text-ink-600">
                      The press team replies within 1 business day.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="border border-navy-100 bg-white hover:bg-navy-50 transition-colors text-navy-900 text-xs font-medium px-4 py-2.5 rounded-md"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {status === 'fail' && (
                  <div
                    role="alert"
                    className="border border-red-200 bg-red-50 rounded-lg p-5 mb-6 flex items-start gap-3"
                  >
                    <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-ink-600 mb-2">
                        That didn’t go through — your details are still here.
                      </p>
                      <a
                        href={mailtoHref()}
                        className="text-xs font-medium text-sky-600 hover:text-teal-600"
                      >
                        Email {np.pressEmail} instead
                      </a>
                    </div>
                  </div>
                )}

                <fieldset disabled={sending} className="border-0 p-0 m-0 disabled:opacity-60">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                    {PRESS_FIELDS.map((f) => {
                      const err = fieldError(f.name);
                      const base = `w-full bg-white border rounded px-3.5 py-2.5 text-xs text-navy-900 placeholder:text-ink-400 focus:outline-none transition-colors ${
                        err ? 'border-red-400 focus:border-red-500' : 'border-navy-100 focus:border-sky-600'
                      }`;
                      return (
                        <div key={f.name} className={f.full ? 'md:col-span-2' : ''}>
                          <label htmlFor={`p-${f.name}`} className="block text-[11px] text-navy-900 mb-1.5">
                            {f.label}
                            {f.required && <span className="text-red-500 ml-0.5">*</span>}
                          </label>
                          {f.type === 'select' ? (
                            <select
                              id={`p-${f.name}`}
                              value={values[f.name]}
                              onChange={(e) => setField(f.name, e.target.value)}
                              onBlur={() => handleBlur(f.name)}
                              aria-invalid={!!err}
                              className={`${base} ${values[f.name] ? '' : 'text-ink-400'}`}
                            >
                              <option value="">Select one...</option>
                              {orgOptions.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                          ) : f.type === 'textarea' ? (
                            <textarea
                              id={`p-${f.name}`}
                              rows={f.rows}
                              value={values[f.name]}
                              onChange={(e) => setField(f.name, e.target.value)}
                              onBlur={() => handleBlur(f.name)}
                              placeholder={f.placeholder}
                              aria-invalid={!!err}
                              className={`${base} resize-y`}
                            />
                          ) : (
                            <input
                              id={`p-${f.name}`}
                              type={f.type || 'text'}
                              value={values[f.name]}
                              onChange={(e) => setField(f.name, e.target.value)}
                              onBlur={() => handleBlur(f.name)}
                              aria-invalid={!!err}
                              className={base}
                            />
                          )}
                          {err && <p className="text-[10px] text-red-500 mt-1">{err}</p>}
                        </div>
                      );
                    })}
                  </div>

                  <label className="flex items-start gap-2.5 mt-5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        if (e.target.checked) setErrors((er) => ({ ...er, consent: undefined }));
                      }}
                      onBlur={() => handleBlur('consent')}
                      aria-invalid={!!fieldError('consent')}
                      className="mt-0.5 w-3.5 h-3.5 shrink-0 accent-navy-900"
                    />
                    <span className="text-[10px] text-ink-600 leading-relaxed">
                      {np.pressConsentLabel}
                    </span>
                  </label>
                  {fieldError('consent') && (
                    <p className="text-[10px] text-red-500 mt-1">Please accept to continue.</p>
                  )}

                  <button
                    type="submit"
                    className="mt-5 bg-navy-900 hover:bg-navy-800 transition-colors text-white text-xs font-medium px-5 py-2.5 rounded inline-flex items-center gap-2"
                  >
                    {sending && <Loader2 size={13} className="animate-spin" />}
                    {sending ? 'Sending…' : np.pressSubmitLabel}
                    {!sending && <ArrowUpRight size={13} />}
                  </button>
                </fieldset>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
