import { ArrowUpRight, ChevronDown, Info } from 'lucide-react';
import { useAdmissionsData } from '../lib/useAdmissionsData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackPage = {
  heroEyebrow: 'AY 2026-27 · Cycles Open',
  heroTitle: 'Apply to SIMSREE.',
  heroDescription:
    'Five programmes. One week in a fully documented step-by-step guide. All five always know where your path is. No management quota. No agents. Just merit.',
  heroButtons: [
    { label: 'Pick your programme', url: '#programmes', primary: true },
    { label: 'Get the forms & affidavits', url: '/admissions/downloads', primary: false },
    { label: 'See 2026 key dates', url: '#dates', primary: false },
  ],

  alertLabel: 'Important:',
  alertText:
    'SIMSREE has zero management quota · no reserved seats · no payment seats of any kind. MMS admissions are routed strictly through the {{cetCellName}}. Reject any agent who claims otherwise.',

  programmesEyebrow: 'All Five Programmes',
  programmesTitle: 'Pick your programme.',
  programmesSubtitle: 'Open any card for its full admission guide.',
  extraCards: [
    {
      eyebrow: 'PDFs',
      title: 'Downloads & Affidavits',
      summary: 'Anti-ragging affidavit · gap certificate · documents required · fee details.',
      url: '/admissions/downloads',
    },
  ],

  eligibilityEyebrow: 'Eligibility · Side-by-side',
  eligibilityTitle: 'See where you qualify.',
  eligibilitySubtitle:
    'Compare eligibility, admission path, and requirements across all five programmes.',

  datesEyebrow: 'AY 2026-27 · Key Dates',
  datesTitle: 'When does each cycle run?',
  datesTitleHighlight: 'cycle run?',
  datesSubtitle:
    'Tentative dates below — each programme notification PDF has the exact ones.',

  reasonsEyebrow: 'Why SIMSREE',
  reasonsTitle: 'Five reasons you will choose us too.',
  reasonsTitleHighlight: 'choose us too.',
  reasonsSubtitle: 'What the notification PDF will not tell you.',
  reasons: [
    {
      title: '{{placementRate}} placement',
      description: 'Get hired — {{recruiterCount}} recruiters · {{avgCtc}} avg CTC · transparent salary data.',
    },
    {
      title: 'Churchgate location',
      description: "Study steps from the BSE, RBI, and India's corporate core.",
    },
    {
      title: 'Student-driven',
      description: 'Practise real management — {{committeeCount}} active committees, run by students.',
    },
    {
      title: '{{noQuotaShort}}',
      description: 'Pure merit · no paid seats · no agents.',
    },
    {
      title: '40+ years',
      description: "Mumbai's premier management institute since {{foundedYear}}.",
    },
    {
      title: '{{alumniCount}} alumni',
      description: 'Tap an active alumni network — mentor pairings and referrals.',
    },
  ],

  faqEyebrow: 'Frequently Asked',
  faqTitle: 'Your admission questions, answered.',
  faqTitleHighlight: 'admission',
  faqSubtitle: 'Find detailed FAQs on each programme guide.',

  ctaEyebrow: 'Take the Next Step',
  ctaTitle: 'Three ways to get going',
  ctaSubtitle:
    'Pick your programme guide · download the brochure · or talk to a current student.',
  ctaButtons: [
    { label: 'Open the MMS guide', url: '/admissions/mms', primary: true },
    { label: 'Download forms & affidavits', url: '/admissions/downloads', primary: false },
    { label: 'Talk to a student', url: '/contact', primary: false },
  ],
};

// Admissions-facing view of each programme. In the CMS these live on the
// programme document itself, so the table and the programme pages cannot drift.
const fallbackProgrammes = [
  {
    shortName: 'MMS',
    admissionCardEyebrow: 'Maharashtra CET',
    admissionCardTitle: 'MMS Admissions',
    admissionCardSummary: 'Full-time · 2 years · 120 seats · CET process · GD + PI · ~₹4.5L.',
    admissionGuideUrl: '/admissions/mms',
    eligibility: "Bachelor's · min 50% (45% reserved)",
    entranceSelection: 'Maharashtra CET / CMAT / CAP / ACAP',
    workExNeeded: 'Not required',
    keyDatesLabel: 'Full-time',
    keyDates: [
      { label: 'Notification', value: 'Apr 2026' },
      { label: 'Applications', value: 'May-Jun 2026' },
      { label: 'Merit lists', value: 'Aug 2026' },
    ],
    order: 1,
  },
  {
    shortName: 'M.Sc. Finance',
    admissionCardEyebrow: 'SIMSREE Entrance',
    admissionCardTitle: 'M.Sc. Finance Admissions',
    admissionCardSummary:
      'Full-time · 2 years · 40 seats · entrance + GD + PI · ~₹3.8L · CFP® pathway',
    admissionGuideUrl: '/admissions/msc-finance',
    eligibility: "Bachelor's with Maths / Stats / Econ / Commerce / Engineering · min 50%",
    entranceSelection: 'SIMSREE entrance + GD + PI',
    workExNeeded: 'Not required',
    keyDatesLabel: 'Full-time',
    keyDates: [
      { label: 'Notification', value: 'May 2026' },
      { label: 'Applications', value: 'Jun 2026' },
      { label: 'Merit lists', value: 'Aug 2026' },
    ],
    order: 2,
  },
  {
    shortName: 'MFM (Exec)',
    admissionCardEyebrow: 'Executive',
    admissionCardTitle: 'MFM Executive Admissions',
    admissionCardSummary: '3 yrs · weekends · 60 seats · 2 yr finance work-ex · Round 4 live.',
    admissionGuideUrl: '/admissions/mfm',
    eligibility: "Bachelor's · employer NOC",
    entranceSelection: 'SIMSREE entrance + interview',
    workExNeeded: 'Min 2 yrs in finance',
    keyDatesLabel: 'Live now',
    keyDatesName: 'MFM / MMM',
    keyDates: [
      { label: 'Stage', value: 'Round 4 live' },
      { label: 'Closes', value: '30 Jun 2026' },
      { label: 'Result', value: 'Jul 2026' },
    ],
    order: 3,
  },
  {
    shortName: 'MMM (Exec)',
    admissionCardEyebrow: 'Executive',
    admissionCardTitle: 'MMM Executive Admissions',
    admissionCardSummary: '3 yrs · weekends · 60 seats · 2 yr marketing work-ex · Round 4 live.',
    admissionGuideUrl: '/admissions/mmm',
    eligibility: "Bachelor's · employer NOC",
    entranceSelection: 'SIMSREE entrance + interview',
    workExNeeded: 'Min 2 yrs in marketing',
    order: 4,
  },
  {
    shortName: 'PhD',
    admissionCardEyebrow: 'Doctoral',
    admissionCardTitle: 'PhD Admissions',
    admissionCardSummary:
      '3-5 yrs · 8-12 seats · PET + research proposal · ~₹1.5L/yr · Result AY 25-26 announced.',
    admissionGuideUrl: '/admissions/phd',
    eligibility: "Master's in relevant discipline · min 55%",
    entranceSelection: 'PET + research proposal + interview',
    workExNeeded: 'Preferred · not required',
    keyDatesLabel: 'Doctoral',
    keyDates: [
      { label: 'Next cycle', value: 'TBA Aug 2026' },
      { label: 'Applications', value: 'Announced Sep 2026' },
      { label: 'Annual fees', value: '~₹1.5L/yr' },
    ],
    order: 5,
  },
];

const fallbackFaqs = [
  {
    question: 'Is there any management quota or paid seat?',
    answer:
      'No. SIMSREE has zero management quota · no reserved seats · no payment seats of any kind. All MMS admissions are routed through the {{cetCellName}}, strictly on merit. Report any agent who claims otherwise.',
    order: 1,
  },
  { question: 'Where do I find the latest notification?', answer: '', order: 2 },
  { question: 'What documents do I need?', answer: '', order: 3 },
  { question: 'Who do I call for help?', answer: '', order: 4 },
  { question: 'Can I visit campus before applying?', answer: '', order: 5 },
];

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

export default function Admissions() {
  const facts = useKeyFacts();
  const { data } = useAdmissionsData();
  const ap = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const programmes = fillFactsDeep(data?.programmes?.length ? data.programmes : fallbackProgrammes, facts);
  const faqs = fillFactsDeep(data?.faqs?.length ? data.faqs : fallbackFaqs, facts);
  const heroButtons = fillFactsDeep(ap.heroButtons?.length ? ap.heroButtons : fallbackPage.heroButtons, facts);
  const extraCards = fillFactsDeep(ap.extraCards?.length ? ap.extraCards : fallbackPage.extraCards, facts);
  const reasons = fillFactsDeep(ap.reasons?.length ? ap.reasons : fallbackPage.reasons, facts);
  const ctaButtons = fillFactsDeep(ap.ctaButtons?.length ? ap.ctaButtons : fallbackPage.ctaButtons, facts);

  const heroImageUrl = ap.heroImage ? urlFor(ap.heroImage).width(1600).url() : null;
  const faqImageUrl = ap.faqImage ? urlFor(ap.faqImage).width(800).url() : null;

  // Only programmes that carry admissions content appear in each section.
  const admissionCards = programmes.filter((p) => p.admissionCardTitle);
  const eligibilityRows = programmes.filter((p) => p.eligibility);
  const dateCards = programmes.filter((p) => p.keyDatesLabel && p.keyDates?.length);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="min-h-[440px] md:h-[520px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: heroImageUrl
            ? `url('${heroImageUrl}')`
            : 'linear-gradient(180deg, #8a8f9e, #cfd3da)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-navy-950/10" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[55px] pt-32 pb-12 md:pb-[56px] md:h-full flex flex-col justify-end text-white">
          <span className="inline-block w-fit bg-navy-900 text-white text-[11px] font-semibold tracking-widest uppercase px-4 py-2 rounded mb-6">
            {ap.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-5">{ap.heroTitle}</h1>
          <p className="max-w-lg text-sm text-white/85 leading-relaxed mb-8">{ap.heroDescription}</p>
          <div className="flex flex-wrap gap-3">
            {heroButtons.map((b) => (
              <a
                key={b.label}
                href={b.url || '#'}
                className={`font-medium px-5 py-3 rounded-md transition-colors flex items-center gap-2 w-fit ${
                  b.primary
                    ? 'bg-sky-600 hover:bg-teal-600 text-white'
                    : 'bg-white hover:bg-gray-100 text-navy-900'
                }`}
              >
                {b.label}
                {b.primary && <ArrowUpRight size={16} />}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Important notice */}
      {ap.alertText && (
        <section className="pt-12 lg:pt-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
            <div
              role="note"
              className="bg-navy-900 text-white rounded-lg px-6 py-5 flex items-start gap-3"
            >
              <Info size={18} className="shrink-0 mt-0.5 text-sky-500" />
              <p className="text-sm leading-relaxed">
                <span className="font-semibold">{ap.alertLabel}</span>{' '}
                <span className="text-white/85">{ap.alertText}</span>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Programme cards */}
      <section id="programmes" className="py-16 lg:py-24 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {ap.programmesEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4">
            {ap.programmesTitle}
          </h2>
          <p className="text-sm text-ink-600 mb-10">{ap.programmesSubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {admissionCards.map((p) => {
              const imgUrl = p.admissionCardImage
                ? urlFor(p.admissionCardImage).width(700).url()
                : null;
              return (
                <div
                  key={p._id || p.shortName}
                  className="border border-navy-100 rounded-lg overflow-hidden flex flex-col"
                >
                  <div
                    className="h-[180px] bg-gray-200 bg-cover bg-center"
                    style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-sky-600 mb-3">
                      {p.admissionCardEyebrow}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">
                      {p.admissionCardTitle}
                    </h3>
                    <p className="text-sm text-ink-600 leading-relaxed mb-5">
                      {p.admissionCardSummary}
                    </p>
                    <a
                      href={p.admissionGuideUrl || '#'}
                      className="text-sm font-medium text-navy-900 hover:text-sky-600 transition-colors inline-flex items-center gap-1.5 mt-auto"
                    >
                      Open guide <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              );
            })}

            {extraCards.map((c) => {
              const imgUrl = c.image ? urlFor(c.image).width(700).url() : null;
              return (
                <div
                  key={c.title}
                  className="border border-navy-100 rounded-lg overflow-hidden flex flex-col"
                >
                  <div
                    className="h-[180px] bg-gray-200 bg-cover bg-center"
                    style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-sky-600 mb-3">
                      {c.eyebrow}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">
                      {c.title}
                    </h3>
                    <p className="text-sm text-ink-600 leading-relaxed mb-5">{c.summary}</p>
                    <a
                      href={c.url || '#'}
                      className="text-sm font-medium text-navy-900 hover:text-sky-600 transition-colors inline-flex items-center gap-1.5 mt-auto"
                    >
                      Open guide <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Eligibility table */}
      <section className="bg-navy-50 py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {ap.eligibilityEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4">
            {ap.eligibilityTitle}
          </h2>
          <p className="text-sm text-ink-600 mb-10">{ap.eligibilitySubtitle}</p>

          {/* Wide table scrolls inside its own container, never the page */}
          <div className="overflow-x-auto rounded-lg border border-navy-100 bg-white">
            <table className="w-full min-w-[820px] border-collapse text-left">
              <thead>
                <tr className="bg-navy-900 text-white">
                  {['Programme', 'Eligibility', 'Entrance / Selection', 'Work-ex Needed'].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="text-[10px] font-semibold tracking-widest uppercase px-5 py-4 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {eligibilityRows.map((p) => (
                  <tr key={p._id || p.shortName} className="border-t border-navy-100">
                    <th
                      scope="row"
                      className="text-sm font-medium text-navy-900 px-5 py-4 whitespace-nowrap"
                    >
                      {p.shortName}
                    </th>
                    <td className="text-sm text-ink-600 px-5 py-4">{p.eligibility}</td>
                    <td className="text-sm text-ink-600 px-5 py-4">{p.entranceSelection}</td>
                    <td className="text-sm text-ink-600 px-5 py-4 whitespace-nowrap">
                      {p.workExNeeded}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Key dates */}
      <section id="dates" className="py-16 lg:py-24 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {ap.datesEyebrow}
          </span>
          <TitleWithHighlight
            text={ap.datesTitle}
            highlight={ap.datesTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4"
          />
          <p className="text-sm text-ink-600 mb-10">{ap.datesSubtitle}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dateCards.map((p) => (
              <div
                key={p._id || p.shortName}
                className="border border-navy-100 border-l-2 border-l-sky-600 rounded-sm p-6"
              >
                <span className="text-[10px] font-semibold tracking-widest uppercase text-ink-400">
                  {p.keyDatesLabel}
                </span>
                <h3 className="font-display text-xl font-semibold text-navy-900 mt-2 mb-5">
                  {p.keyDatesName || p.shortName}
                </h3>
                <dl className="space-y-0">
                  {p.keyDates.map((d) => (
                    <div
                      key={d.label}
                      className="flex items-center justify-between gap-3 py-2.5 border-b border-navy-100 last:border-b-0"
                    >
                      <dt className="text-[10px] uppercase tracking-wide text-ink-400">{d.label}</dt>
                      <dd className="text-xs font-medium text-navy-900 m-0 text-right">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five reasons */}
      <section className="bg-navy-50 py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {ap.reasonsEyebrow}
          </span>
          <TitleWithHighlight
            text={ap.reasonsTitle}
            highlight={ap.reasonsTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4 max-w-md"
          />
          <p className="text-sm text-ink-600 mb-10">{ap.reasonsSubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r) => (
              <div key={r.title} className="bg-white border border-navy-100 rounded-lg p-6">
                <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">{r.title}</h3>
                <p className="text-sm text-ink-600 leading-relaxed">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {ap.faqEyebrow}
          </span>
          <TitleWithHighlight
            text={ap.faqTitle}
            highlight={ap.faqTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4"
          />
          <p className="text-sm text-ink-600 mb-10">{ap.faqSubtitle}</p>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">
            {/* Native <details> — works with keyboard and without JS */}
            <div className="border-t border-navy-100">
              {faqs.map((f, i) => (
                <details
                  key={f._id || f.question}
                  open={i === 0}
                  className="group border-b border-navy-100"
                >
                  <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="text-sm font-medium text-navy-900">{f.question}</span>
                    <ChevronDown
                      size={16}
                      className="shrink-0 text-ink-400 transition-transform group-open:rotate-180"
                    />
                  </summary>
                  {f.answer && (
                    <p className="text-sm text-ink-600 leading-relaxed pb-5 pr-8">{f.answer}</p>
                  )}
                </details>
              ))}
            </div>

            <div
              className="h-[280px] rounded-lg bg-gray-200 bg-cover bg-center"
              style={faqImageUrl ? { backgroundImage: `url('${faqImageUrl}')` } : undefined}
            />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-navy-900 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-white/80">
            {ap.ctaEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-5 mb-4">
            {ap.ctaTitle}
          </h2>
          <p className="text-sm text-white/75 max-w-md mb-8">{ap.ctaSubtitle}</p>
          <div className="flex flex-wrap gap-3">
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
