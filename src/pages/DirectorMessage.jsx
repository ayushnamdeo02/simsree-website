import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useDirectorPageData } from '../lib/useDirectorPageData';
import PageHero from '../components/PageHero';
import { Section, Heading, Highlighted } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { keepTogether } from '../lib/text';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackDirectorPage = {
  heroEyebrow: 'Office of the Director · Since 2021',
  heroTitle: 'A word from the Director.',
  heroTitleHighlight: 'Director.',
  heroDescription: 'Dr. Shriniwas Dhure on what SIMSREE stands for, the character it forges, and where the institution is heading next.',
  heroName: 'Dr. Shriniwas Dhure',
  heroRole: 'Director · SIMSREE',
  heroStats: [
    { value: '22 yrs', label: 'In Management Education' },
    { value: 'PhD', label: 'Management Studies' },
  ],
  heroPrimaryCtaLabel: 'Read the message',
  heroPrimaryCtaUrl: '#message',
  heroSecondaryCtaLabel: "Email Director's office",
  heroSecondaryCtaUrl: 'mailto:director@simsree.org',

  quoteText: 'SIMSREE has always stood for something beyond a degree - for character forged through initiative, responsibility, and a deep engagement with the world of business.',
  quoteHighlight: 'beyond a degree',
  quoteName: 'Dr. Shriniwas Dhure',
  quoteMeta: 'Director, SIMSREE · 2021–present',

  portraitName: 'Dr. Shriniwas Dhure',
  portraitRole: 'Director, SIMSREE · Churchgate, Mumbai',
  portraitPhone: "Reach the Director's office · 022 6151 0700",
  portraitEmail: 'director@simsree.org',

  contactEyebrow: "Reach the Director's Office",
  contactTitle: 'Get in touch.',
  contactTitleHighlight: 'touch.',
  contactSubtitle: "For institutional matters, partnerships, recruiter relationships, and campus visits - the Director's office is here.",
  contactCallNumber: '022 6151 0700',
  contactCallLabel: 'PA to Director · Mon–Sat · 11am–7pm',
  contactEmailAddress: 'director@simsree.org',
  contactEmailLabel: 'Institutional matters · partnerships · visits',
  contactVisitAddress: 'B-Road, Churchgate',
  contactVisitLabel: '2 min from Churchgate station · Mumbai 400 020',
};

const fallbackSections = [
  {
    number: '01',
    title: 'A privilege.',
    titleHighlight: 'privilege.',
    body: "SIMSREE has always stood for something beyond a degree. It stands for character - the kind that is forged through initiative, responsibility, and a deep engagement with the world of business.\n\nIt is a privilege to lead an institution that has spent four decades earning the trust of students, industry, and society. SIMSREE's address at Churchgate is not incidental - it reflects our belief that the best management education happens at the intersection of academia and real commerce.",
  },
  {
    number: '02',
    title: 'Character first.',
    titleHighlight: 'first.',
    body: "Since {{foundedYear}}, we have been guided by a single ambition: to produce managers who are not just capable, but principled. Professionals who combine technical rigour with the human qualities - empathy, integrity, collaboration - that lasting leadership demands.\n\nAt SIMSREE, the curriculum is only half the story. The other half is what students do alongside it - running committees, organising flagship events, managing the placement process, leading social initiatives. By the time they graduate, they have not just studied management.",
    boldClosing: 'They have practised it.',
  },
  {
    number: '03',
    title: 'Our people.',
    titleHighlight: 'people.',
    body: 'None of this happens without the people who make SIMSREE what it is. Our faculty bring scholarship and industry experience in equal measure. Our alumni give back generously - as mentors, recruiters, and advocates. And our students, above all, carry the spirit of the institution forward each year.',
    pills: ['Faculty · scholar-practitioners', 'Alumni · 5,000+ worldwide', 'Students · 13 committees'],
  },
  {
    number: '04',
    title: 'Our programmes.',
    titleHighlight: 'programmes.',
    body: "At SIMSREE, we offer full-time master's programmes with specialisations in Finance, HR, Marketing, Operations, and Systems - supported by an active placement cell and a network that extends across India's leading organisations.\n\nOur executive programmes (MFM and MMM) serve working professionals seeking to deepen their expertise. Our doctoral programme produces original research that bridges scholarship and practice.",
  },
  {
    number: '05',
    title: 'An invitation.',
    titleHighlight: 'invitation.',
    body: "We are proud of our past. We are more excited about what comes next. Whether you are a prospective student weighing your options, a recruiter looking for India's most distinctive management graduates, or an alumnus returning home - I invite you to be part of the SIMSREE story.",
  },
];

function imgUrl(image, width) {
  if (!image) return undefined;
  try {
    return urlFor(image).width(width).auto('format').url();
  } catch {
    return undefined;
  }
}

function TitleWithHighlight({ text, highlight, className, highlightClassName = 'text-teal-400 italic' }) {
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

// Figma: wifi_calling_bar_1 — exported vector, filled path on a 19x19 viewBox.
function PhoneCalling({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-2.4 -2.4 23.8 23.8"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M13.9065 7.54675C13.6113 7.54675 13.3649 7.4475 13.1673 7.249C12.9696 7.0505 12.8707 6.8045 12.8707 6.511C12.8707 6.214 12.9692 5.96708 13.166 5.77025C13.3628 5.57342 13.6087 5.475 13.9035 5.475C14.1968 5.475 14.4423 5.57342 14.64 5.77025C14.8377 5.96708 14.9365 6.213 14.9365 6.508C14.9365 6.80283 14.8377 7.04967 14.6403 7.2485C14.4429 7.44733 14.1983 7.54675 13.9065 7.54675ZM17.0365 18.305C15.0788 18.305 13.087 17.8343 11.061 16.893C9.03483 15.9517 7.15642 14.6157 5.42575 12.885C3.69525 11.1545 2.35833 9.27517 1.415 7.247C0.471667 5.219 0 3.22817 0 1.2745C0 0.912666 0.121417 0.609832 0.36425 0.365999C0.606917 0.121999 0.908333 0 1.2685 0H4.7685C5.06967 0 5.3225 0.0963333 5.527 0.289C5.7315 0.4815 5.87308 0.734665 5.95175 1.0485L6.625 4.09375C6.6675 4.38092 6.66192 4.63725 6.60825 4.86275C6.55458 5.08842 6.44325 5.28175 6.27425 5.44275L3.756 7.92625C4.17333 8.62758 4.61575 9.283 5.08325 9.8925C5.55058 10.5018 6.06992 11.0819 6.64125 11.6327C7.24208 12.2541 7.86917 12.8162 8.5225 13.3192C9.176 13.8224 9.85783 14.262 10.568 14.638L12.9727 12.1702C13.1674 11.9589 13.3902 11.8159 13.6412 11.7412C13.8924 11.6667 14.1458 11.6541 14.4012 11.7032L17.2565 12.3355C17.5703 12.422 17.8235 12.5816 18.016 12.8142C18.2087 13.0469 18.305 13.3173 18.305 13.6255V17.0365C18.305 17.3988 18.1829 17.7008 17.9387 17.9425C17.6946 18.1842 17.3938 18.305 17.0365 18.305ZM2.9045 6.38375L4.9235 4.3755L4.3545 1.70925H1.71525C1.74458 2.38542 1.851 3.10092 2.0345 3.85575C2.218 4.61058 2.508 5.45325 2.9045 6.38375ZM12.1473 15.4827C12.8108 15.7914 13.5335 16.0437 14.3155 16.2397C15.0977 16.4357 15.8577 16.5524 16.5957 16.5898V13.9397L14.1102 13.4255L12.1473 15.4827Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Figma: stacked_email — exported vector, filled path on a 48x48 viewBox.
function StackedEmail({ size = 48, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M11.5496 35.9293C10.6263 35.9293 9.82578 35.583 9.14811 34.8903C8.47011 34.198 8.13111 33.4048 8.13111 32.5108V9.0723C8.13111 8.1493 8.47011 7.3488 9.14811 6.6708C9.82578 5.99313 10.6263 5.6543 11.5496 5.6543H42.8681C43.7881 5.6543 44.5858 5.99313 45.2611 6.6708C45.9368 7.3488 46.2746 8.1493 46.2746 9.0723V32.5108C46.2746 33.4048 45.9368 34.198 45.2611 34.8903C44.5858 35.583 43.7881 35.9293 42.8681 35.9293H11.5496ZM26.1571 24.8183L11.5496 12.7488V32.5108H42.8681V12.7488L28.2606 24.8183C27.9513 25.0676 27.5979 25.1923 27.2006 25.1923C26.8036 25.1923 26.4558 25.0676 26.1571 24.8183ZM27.2031 21.7398L42.6181 9.0723H11.7996L27.2031 21.7398ZM5.13111 42.3358C4.21111 42.3358 3.41344 41.9896 2.73811 41.2973C2.06244 40.605 1.72461 39.8156 1.72461 38.9293V12.8258C1.72461 12.3451 1.88911 11.9411 2.21811 11.6138C2.54711 11.2861 2.95328 11.1223 3.43661 11.1223C3.91994 11.1223 4.32311 11.2861 4.64611 11.6138C4.96944 11.9411 5.13111 12.3451 5.13111 12.8258V38.9293H39.4281C39.9088 38.9293 40.3128 39.0938 40.6401 39.4228C40.9674 39.7518 41.1311 40.158 41.1311 40.6413C41.1311 41.1243 40.9674 41.5275 40.6401 41.8508C40.3128 42.1741 39.9088 42.3358 39.4281 42.3358H5.13111Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Figma: location_city — exported vector, filled path on a 48x48 viewBox.
function LocationCity({ size = 48, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M5.59375 39.0009V17.1009C5.59375 16.1525 5.92525 15.3457 6.58825 14.6804C7.25125 14.015 8.05525 13.6824 9.00025 13.6824H17.9438V10.7629C17.9438 10.3002 18.0268 9.85903 18.1928 9.43936C18.3588 9.01936 18.6116 8.66019 18.9513 8.36186L21.6133 5.78786C22.2633 5.14153 23.0578 4.81836 23.9967 4.81836C24.9361 4.81836 25.7329 5.14153 26.3873 5.78786L29.0373 8.33786C29.3769 8.65219 29.6338 9.02219 29.8078 9.44786C29.9818 9.87386 30.0688 10.3202 30.0688 10.7869V21.9824H39.0003C39.9486 21.9824 40.7554 22.315 41.4207 22.9804C42.0861 23.6457 42.4188 24.4525 42.4188 25.4009V39.0009C42.4188 39.9459 42.0861 40.7499 41.4207 41.4129C40.7554 42.0759 39.9486 42.4074 39.0003 42.4074H9.00025C8.05525 42.4074 7.25125 42.0759 6.58825 41.4129C5.92525 40.7499 5.59375 39.9459 5.59375 39.0009ZM9.00025 39.0009H14.3003V33.7009H9.00025V39.0009ZM9.00025 30.7009H14.3003V25.4009H9.00025V30.7009ZM9.00025 22.4009H14.3003V17.1009H9.00025V22.4009ZM21.3503 39.0009H26.6503V33.7009H21.3503V39.0009ZM21.3503 30.7009H26.6503V25.4009H21.3503V30.7009ZM21.3503 22.4009H26.6503V17.1009H21.3503V22.4009ZM21.3503 14.1009H26.6503V8.80086H21.3503V14.1009ZM33.7003 39.0009H39.0003V33.7009H33.7003V39.0009ZM33.7003 30.7009H39.0003V25.4009H33.7003V30.7009Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Figma: mail_unread — envelope with a filled notification dot (24x24).
function MailUnread({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 10.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9.5" />
      <path d="m3 7 8.6 5.4a2 2 0 0 0 2.1 0L18 9.8" />
      <circle cx="19" cy="5" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

// One numbered part of the letter. Figma "Content Left": padding 32, 16 gap —
// a 12/150 white pill, an H2 52 title in #EAEAF1 with an italic Eastern Blue Light
// highlight, then 18/150 white copy (24 gap). The first part opens with a teal 52px
// drop cap and a Playfair H6 22 lead paragraph.
function DirectorSection({ number, title, titleHighlight, body, boldClosing, pills, lead = false }) {
  const paras = (body || '').split('\n\n');
  const first = paras[0] || '';
  const rest = lead ? paras.slice(1) : paras;
  return (
    <div className="p-6 md:p-8 flex flex-col gap-4">
      <span className="inline-flex w-fit items-center rounded-2xl bg-white px-2.5 py-1 text-navy-900 text-xs leading-[150%]">
        {number}
      </span>
      <div className="flex flex-col gap-6">
        <Heading
          text={title}
          highlight={titleHighlight}
          className="text-navy-50"
          highlightClass="text-teal-400 italic"
        />
        {lead && first && (
          <p className="font-display font-medium text-[22px] leading-[140%] tracking-[-0.01em] text-white">
            {/* Enlarged first letter sits inside the first word, so only the
                first line carries it and later lines start at the margin. */}
            <span className="text-[52px] leading-none text-teal-400">{first[0]}</span>
            {first.slice(1)}
          </p>
        )}
        {(rest.length > 0 || boldClosing) && (
          <div className="text-base md:text-lg leading-[150%] text-white">
            {rest.map((para, i) => (
              <p key={i} className={i > 0 ? 'mt-[1.5em]' : undefined}>
                {para}
              </p>
            ))}
            {boldClosing && <p className="font-semibold">{boldClosing}</p>}
          </div>
        )}
        {pills?.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {pills.map((pl) => (
              <span key={pl} className="bg-navy-50 text-navy-900 text-xs md:text-sm leading-[150%] px-4 md:px-5 py-2 rounded-full uppercase whitespace-nowrap">
                {pl}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Figma: 405.33x222 card, radius 16, padding 32; icon sits beside the label,
// inner stack 341.33x137 with a 16px gap.
function ContactCard({ icon, label, value, meta, actionLabel, href, to, breakAll }) {
  const action = (
    <>
      {actionLabel} <ArrowRight size={16} />
    </>
  );
  return (
    <div className="bg-navy-900 outline outline-1 outline-white/20 rounded-2xl p-8 flex items-start gap-4">
      {icon}
      {/* Figma: 277.33-wide stack beside the icon, 16px gap. */}
      <div className="min-w-0 flex flex-col gap-4">
        {/* Figma: Body small Normal 14/150, Colour/Eastern Blue/Lightest. */}
        <span className="text-sm leading-[150%] uppercase text-teal-100">{label}</span>
        {/* Figma: Heading/H6 22/140, Colour/Neutral/White. */}
        <p className={`font-display text-xl md:text-[22px] md:leading-[140%] text-white ${breakAll ? 'break-all' : ''}`}>
          {value}
        </p>
        {/* Figma: Text/Small/Normal 14/150, Colour/Neutral/Lightest. */}
        <p className="text-sm leading-[150%] text-ink-50">{meta}</p>
        {to ? (
          <Link to={to} className="text-base leading-[150%] font-medium text-white flex items-center gap-2 w-fit">
            {action}
          </Link>
        ) : (
          <a href={href} className="text-base leading-[150%] font-medium text-white flex items-center gap-2 w-fit">
            {action}
          </a>
        )}
      </div>
    </div>
  );
}

export default function DirectorMessage() {
  const facts = useKeyFacts();
  const { data } = useDirectorPageData();

  const dp = fillFactsDeep({ ...fallbackDirectorPage, ...(data?.directorPage || {}) }, facts);
  const sections = fillFactsDeep(data?.sections?.length ? data.sections : fallbackSections, facts);

  const quotePhotoUrl = imgUrl(dp.quotePhoto, 192) || '/images/director/avatar.webp';
  const portraitImageUrl = imgUrl(dp.portraitImage, 1216) || '/images/director/portrait.webp';
  const signatureUrl = imgUrl(dp.signatureImage, 390);

  return (
    <div>
      <PageHero
        image={heroImage(dp.heroImage, '/images/director/hero.webp')}
        eyebrow={dp.heroEyebrow}
        eyebrowStyle="rule-left"
        title={keepTogether(dp.heroTitle, 'the Director.')}
        titleWidth={649}
        description={dp.heroDescription}
        descriptionWidth={649}
        details={
          // Figma: 649 wide, white/70 rules above and below (12 gap), three columns
          // split by white/70 rules with 20 gaps; H6 22 / H5 28 in Eastern Blue
          // Lightest over 14/150 uppercase labels.
          <div className="w-fit max-w-full flex flex-col gap-3">
            <div className="h-px bg-white/70" aria-hidden="true" />
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex flex-col gap-2">
                <p className="font-display font-medium text-[22px] leading-[140%] tracking-[-0.01em] text-sky-50">{dp.heroName}</p>
                <p className="text-sm leading-[150%] uppercase">{dp.heroRole}</p>
              </div>
              {(dp.heroStats || []).map((st, i) => (
                <div key={st.label} className="flex items-center gap-5">
                  <span className="self-stretch w-px min-h-[81px] bg-white/70" aria-hidden="true" />
                  <div className="flex flex-col gap-2">
                    <p
                      className={`font-display font-medium tracking-[-0.01em] text-sky-50 ${
                        i === 0 ? 'text-[28px] leading-[140%]' : 'text-[22px] leading-[140%]'
                      }`}
                    >
                      {st.value}
                    </p>
                    <p className="text-sm leading-[150%] uppercase">{st.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-px bg-white/70" aria-hidden="true" />
          </div>
        }
        actions={[
          { label: dp.heroPrimaryCtaLabel, href: dp.heroPrimaryCtaUrl, primary: true },
          { label: dp.heroSecondaryCtaLabel, href: dp.heroSecondaryCtaUrl },
        ]}
        height="h-[960px] md:h-[767px]"
        mobileOverlay="dark"
        mobileTitle="text-[40px] leading-[120%]"
        mobileActions="full"
      />

      {/* Pull quote — Figma: navy, 112 padding, 768 column, 32 gap; quote H4 36/130,
          96px avatar, H6 22 name over 16/150 meta. */}
      <Section bg="bg-navy-900" width={768} className="text-center text-white">
        <blockquote className="font-display font-medium text-[28px] leading-[140%] md:text-[36px] md:leading-[130%] tracking-[-0.01em]">
          &ldquo;
          <Highlighted
            text={keepTogether(dp.quoteText, 'something beyond', 'degree -')}
            highlight={keepTogether(dp.quoteHighlight || '', 'something beyond')}
            highlightClass="text-teal-400"
          />
          &rdquo;
        </blockquote>
        <div className="mt-8 flex flex-col items-center gap-4">
          <div
            className="w-24 h-24 rounded-full bg-white/20 bg-cover bg-center"
            style={{ backgroundImage: `url('${quotePhotoUrl}')` }}
          />
          <div>
            <p className="font-display font-medium text-[22px] leading-[140%] tracking-[-0.01em]">{dp.quoteName}</p>
            <p className="text-base leading-[150%]">{dp.quoteMeta}</p>
          </div>
        </div>
      </Section>

      {/* Portrait + letter — Figma "Blog / 36 /" on #eaeaf1. A 1280 row (608 photo,
          64 gap, 608 content padded 32), then the navy letter card, pulled up 154px
          so it overlaps the portrait. */}
      <Section bg="bg-navy-50" width={1280}>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div
            className="h-[420px] lg:h-[702px] rounded-2xl bg-cover bg-top"
            style={{ backgroundImage: `url('${portraitImageUrl}')` }}
          />
          <div className="flex flex-col gap-4 p-2 lg:p-8 lg:pb-[186px]">
            {signatureUrl && (
              <img src={signatureUrl} alt="" className="w-[195px] h-[130px] object-contain object-left" />
            )}
            <div className="flex flex-col gap-3">
              <p className="font-display font-medium text-[36px] leading-[130%] tracking-[-0.01em] text-navy-900">
                {dp.portraitName}
              </p>
              <p className="text-lg md:text-[22px] leading-[150%] text-black">{dp.portraitRole}</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm leading-[150%] text-black">
              <p className="flex items-center gap-4">
                <PhoneCalling size={24} className="text-navy-900 shrink-0" /> {dp.portraitPhone}
              </p>
              <p className="flex items-center gap-4">
                <MailUnread size={24} className="text-navy-900 shrink-0" /> {dp.portraitEmail}
              </p>
            </div>
          </div>
        </div>

        <div id="message" className="relative z-10 mt-8 lg:-mt-[154px] bg-navy-900 rounded-2xl flex flex-col gap-6">
          {sections.map((sec, i) => (
            <DirectorSection key={sec._id || sec.number} {...sec} lead={i === 0} />
          ))}
        </div>
      </Section>

      {/* Get in Touch — 1280 section, 80px gap, 405.33x222 cards (Figma) */}
      <section className="bg-navy-800 py-12 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0 flex flex-col gap-12 md:gap-16">
          <div className="text-center max-w-[768px] mx-auto">
            {/* Figma: Heading/Tagline 16/150, Colour/Neutral/White. */}
            <span className="text-base leading-[150%] font-semibold uppercase text-white">{dp.contactEyebrow}</span>
            <TitleWithHighlight
              text={dp.contactTitle}
              highlight={dp.contactTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-medium text-white mt-6 mb-6"
              highlightClassName="text-teal-400 italic"
            />
            {/* Figma: Text/Medium/Normal 18/150, Color Scheme 3/Text. */}
            <p className="text-lg leading-[150%] text-white">{dp.contactSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ContactCard
              icon={<PhoneCalling size={48} className="text-white shrink-0" />}
              label="Call"
              value={dp.contactCallNumber}
              meta={dp.contactCallLabel}
              actionLabel="Call now"
              href={`tel:${(dp.contactCallNumber || '').replace(/\s/g, '')}`}
            />
            <ContactCard
              icon={<StackedEmail size={48} className="text-white shrink-0" />}
              label="Email"
              value={dp.contactEmailAddress}
              meta={dp.contactEmailLabel}
              actionLabel="Compose email"
              href={`mailto:${dp.contactEmailAddress}`}
              breakAll
            />
            <ContactCard
              icon={<LocationCity size={48} className="text-white shrink-0" />}
              label="Visit"
              value={dp.contactVisitAddress}
              meta={dp.contactVisitLabel}
              actionLabel="Schedule a visit"
              to="/contact"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
