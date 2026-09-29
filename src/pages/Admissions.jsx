import { Link } from 'react-router-dom';
import { AlertCircle, ArrowUpRight, ChevronDown } from 'lucide-react';
import PageHero, { HeroButton } from '../components/PageHero';
import { Section, SectionTitle, Tagline, Heading, H5, H6, AccentCard } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { useAdmissionsData } from '../lib/useAdmissionsData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackPage = {
  heroEyebrow: 'AY 2026-27 · Cycles Open',
  heroTitle: 'Apply to SIMSREE.',
  heroDescription:
    'Five programmes, five ways in - every cycle documented step-by-step, so you always know where you stand. No management quota. No agents. No payment seats. Merit only.',
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
    'Tentative dates below - each programme notification PDF has the exact ones.',

  reasonsEyebrow: 'Why SIMSREE',
  reasonsTitle: 'Five reasons you will choose us too.',
  reasonsTitleHighlight: 'choose us too.',
  reasonsSubtitle: 'What the notification PDF will not tell you.',
  reasons: [
    {
      title: '{{placementRate}} placement',
      description: 'Get hired - {{recruiterCount}} recruiters · {{avgCtc}} avg CTC · transparent salary data.',
    },
    {
      title: 'Churchgate location',
      description: "Study steps from the BSE, RBI, and India's corporate core.",
    },
    {
      title: 'Student-driven',
      description: 'Practise real management - {{committeeCount}} active committees, run by students.',
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
      description: 'Tap an active alumni network - mentor pairings and referrals.',
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

// Figma card photos, in card order (five programmes, then Downloads).
const CARD_PHOTOS = [1, 2, 3, 4, 5, 6].map((n) => `/images/admissions/card-${n}.webp`);
// Figma key-date tag colours by card position.
const DATE_TAGS = ['bg-[#fffbec] text-navy-900', 'bg-[#fffbec] text-navy-900', 'bg-sky-50 text-teal-500', 'bg-navy-50 text-navy-900'];

// Figma admission card: 405x744, radius 16, hairline + shadow; 490px photo
// (radius 16 on top), then 24/32 padded copy: tag, H5 title, 18/150, teal link.
function AdmissionCard({ image, eyebrow, title, summary, url }) {
  return (
    <div className="hover-card flex flex-col rounded-2xl bg-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small overflow-hidden">
      <div
        className="h-[490px] bg-navy-50 bg-cover bg-center rounded-t-2xl"
        style={image ? { backgroundImage: `url('${image}')` } : undefined}
      />
      <div className="flex-1 flex flex-col gap-6 px-8 py-6">
        <span className="w-fit px-4 py-1 rounded-2xl bg-[#fffbec] text-navy-900 text-sm leading-[150%] uppercase">{eyebrow}</span>
        <div className="flex flex-col gap-3">
          <H5>{title}</H5>
          <p className="text-base md:text-lg leading-[150%] text-black">{summary}</p>
        </div>
        <Link
          to={url || '#'}
          className="mt-auto flex items-center gap-2 w-fit text-base leading-[150%] text-teal-500 hover:underline underline-offset-2"
        >
          Open guide <ArrowUpRight size={24} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
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

  const faqImageUrl = ap.faqImage ? urlFor(ap.faqImage).width(864).auto('format').url() : '/images/history/location.webp';

  // Only programmes that carry admissions content appear in each section.
  const admissionCards = programmes.filter((p) => p.admissionCardTitle);
  const eligibilityRows = programmes.filter((p) => p.eligibility);
  const dateCards = programmes.filter((p) => p.keyDatesLabel && p.keyDates?.length);
  const cardImg = (image, i) => (image ? urlFor(image).width(810).auto('format').url() : CARD_PHOTOS[i]);

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(ap.heroImage, '/images/admissions/hero.webp', { stretch: true })}
        eyebrow={ap.heroEyebrow}
        eyebrowStyle="pill"
        title={ap.heroTitle}
        description={ap.heroDescription}
        descriptionWidth={628}
        actions={heroButtons.map((b) => ({ label: b.label, href: b.url, primary: b.primary }))}
        mobileOverlay="gradient-tint"
      />

      {/* Notice + programme cards — Figma: navy 102px notice (radius 16, padding 24),
          80 gap, title, then 3-up 405 cards 32 apart. */}
      <Section id="programmes" width={1280} className="scroll-mt-24">
        {ap.alertText && (
          <div role="note" className="flex items-start gap-3 p-6 rounded-2xl bg-navy-900 text-white outline outline-1 -outline-offset-1 outline-black/20">
            <AlertCircle size={24} strokeWidth={1.5} className="shrink-0" />
            <p className="text-base leading-[150%]">
              <span className="font-medium">{ap.alertLabel}</span> {ap.alertText}
            </p>
          </div>
        )}
        <SectionTitle className={ap.alertText ? 'mt-10 md:mt-12' : ''} tagline={ap.programmesEyebrow} title={ap.programmesTitle} body={ap.programmesSubtitle} />
        <div className="mt-10 md:mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {admissionCards.map((p, i) => (
            <AdmissionCard
              key={p._id || p.shortName}
              image={cardImg(p.admissionCardImage, i)}
              eyebrow={p.admissionCardEyebrow}
              title={p.admissionCardTitle}
              summary={p.admissionCardSummary}
              url={p.admissionGuideUrl}
            />
          ))}
          {extraCards.map((c, i) => (
            <AdmissionCard
              key={c.title}
              image={cardImg(c.image, admissionCards.length + i)}
              eyebrow={c.eyebrow}
              title={c.title}
              summary={c.summary}
              url={c.url}
            />
          ))}
        </div>
      </Section>

      {/* Eligibility — #eaeaf1; navy header row, 64px zebra rows. */}
      <Section bg="bg-navy-50" width={1280}>
        <SectionTitle tagline={ap.eligibilityEyebrow} title={ap.eligibilityTitle} body={ap.eligibilitySubtitle} />
        <div className="mt-12 overflow-x-auto rounded-lg">
          <table className="w-full min-w-[820px] border-collapse text-left">
            <thead>
              <tr className="bg-navy-900 text-hero h-16">
                {['Programme', 'Eligibility', 'Entrance / Selection', 'Work-ex needed'].map((h) => (
                  <th key={h} scope="col" className="px-4 first:pl-6 text-base leading-[150%] font-semibold uppercase whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {eligibilityRows.map((p, i) => (
                <tr key={p._id || p.shortName} className={`h-16 text-black ${i % 2 ? 'bg-navy-50' : 'bg-white'}`}>
                  <th scope="row" className="pl-6 pr-4 text-base leading-[150%] font-medium whitespace-nowrap">
                    {p.shortName}
                  </th>
                  <td className="px-4 text-sm leading-[150%]">{p.eligibility}</td>
                  <td className="px-4 text-sm leading-[150%]">{p.entranceSelection}</td>
                  <td className="px-4 text-sm leading-[150%] whitespace-nowrap">{p.workExNeeded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Key dates — four 296x273 bar cards: tag, H5 name, 14/150 label/value rows. */}
      <Section id="dates" width={1280} className="scroll-mt-24">
        <SectionTitle
          tagline={ap.datesEyebrow}
          title={composeTitle(ap.datesTitle, ap.datesTitleHighlight)}
          highlight={ap.datesTitleHighlight}
          body={ap.datesSubtitle}
        />
        <div className="mt-10 md:mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dateCards.map((p, i) => (
            <AccentCard key={p._id || p.shortName}>
              <div className="flex flex-col gap-4">
                <span className={`w-fit px-2.5 py-1 rounded-2xl text-xs leading-[150%] uppercase ${DATE_TAGS[i] || DATE_TAGS[0]}`}>
                  {p.keyDatesLabel}
                </span>
                <div className="flex flex-col gap-3">
                  <H5>{p.keyDatesName || p.shortName}</H5>
                  <dl className="flex flex-col gap-4">
                    {p.keyDates.map((d, j, all) => (
                      <div
                        key={d.label}
                        className={`flex justify-between gap-4 text-sm leading-[150%] pb-1.5 ${j < all.length - 1 ? 'border-b border-black/20' : ''}`}
                      >
                        <dt className="uppercase text-ink-400">{d.label}</dt>
                        <dd className="text-black text-right">{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </AccentCard>
          ))}
        </div>
      </Section>

      {/* Reasons — #eaeaf1, six white bar cards (H5 + 14/150). */}
      <Section bg="bg-navy-50" width={1280}>
        <SectionTitle
          tagline={ap.reasonsEyebrow}
          title={composeTitle(ap.reasonsTitle, ap.reasonsTitleHighlight)}
          highlight={ap.reasonsTitleHighlight}
          body={ap.reasonsSubtitle}
        />
        <div className="mt-10 md:mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r) => (
            <AccentCard key={r.title}>
              <H5>{r.title}</H5>
              <p className="mt-4 text-sm leading-[150%] text-black">{r.description}</p>
            </AccentCard>
          ))}
        </div>
      </Section>

      {/* FAQ — accordion (H6 22 questions, 1px rules) beside a 432x461 photo. */}
      <Section width={1280}>
        <SectionTitle
          tagline={ap.faqEyebrow}
          title={composeTitle(ap.faqTitle, ap.faqTitleHighlight)}
          highlight={ap.faqTitleHighlight}
          body={ap.faqSubtitle}
        />
        <div className="mt-12 grid lg:grid-cols-[1fr_432px] gap-12 lg:gap-20 items-start">
          <div className="border-y border-black/20">
            {faqs.map((f, i) => (
              <details key={f._id || f.question} open={i === 0} className="group border-b border-black/20 last:border-b-0">
                <summary className="flex items-center justify-between gap-6 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <H6 as="span" className="text-black">
                    {f.question}
                  </H6>
                  <ChevronDown size={32} strokeWidth={1.5} className="shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                {f.answer && <p className="text-sm leading-[150%] text-black pb-4 pr-8">{f.answer}</p>}
              </details>
            ))}
          </div>
          <div className="h-[300px] lg:h-[461px] rounded-2xl bg-navy-50 bg-cover bg-center" style={{ backgroundImage: `url('${faqImageUrl}')` }} />
        </div>
      </Section>

      {/* Closing CTA — navy, left column, Eastern Blue tagline. */}
      <Section bg="bg-navy-900" width={1280} className="text-white border-t border-white/20">
        <Tagline className="text-teal-400">{ap.ctaEyebrow}</Tagline>
        <Heading text={ap.ctaTitle} className="text-white mt-4" />
        <p className="mt-6 max-w-[504px] text-base md:text-lg leading-[150%]">{ap.ctaSubtitle}</p>
        <div className="mt-8 flex flex-col md:flex-row gap-3.5">
          {ctaButtons.map((b) => (
            <HeroButton key={b.label} label={b.label} href={b.url} primary={b.primary} />
          ))}
        </div>
      </Section>
    </div>
  );
}
