import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
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
  heroDescription: 'Dr. Rupesh Raut on what SIMSREE stands for, the character it forges, and where the institution is heading next.',
  heroName: 'Dr. Rupesh Raut',
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
  quoteName: 'Dr. Rupesh Raut',
  quoteMeta: 'Director, SIMSREE',

  messageTitle: "Director's Message",
  messageTitleHighlight: 'Message',
  messageBody:
    "Welcome to the Sydenham Institute of Management Studies, Research and Entrepreneurship Education (SIMSREE).\n\nSince its inception in 1983, SIMSREE has proudly carried forward the distinguished “Sydenham Tradition” of academic excellence, professional rigour and industry-oriented management education. Over the decades, the institute has built a strong reputation for nurturing talented professionals who have contributed significantly to business, industry and society.\n\nLocated in Churchgate, at the heart of Mumbai's corporate and financial ecosystem, SIMSREE enjoys a distinctive advantage. Our students are surrounded by the dynamic world of business, finance, entrepreneurship and innovation, enabling us to create a meaningful connection between academic learning and professional practice.\n\nManagement education today is shaped by rapid technological change, artificial intelligence, digital transformation, globalization and evolving business models. At SIMSREE, we continuously adapt our academic approach to these developments while preserving the values and academic standards that define our institution.\n\nOur association as a primary constituent college of Dr. Homi Bhabha State University (HBSU) provides an opportunity to further strengthen interdisciplinary learning, research, innovation and industry engagement.",
  portraitName: 'Dr. Rupesh Raut',
  portraitRole: 'Director, SIMSREE',
  portraitPhone: "Reach the Director's office · 022 6151 0700",
  portraitEmail: 'director@simsree.org',

  contactEyebrow: "Reach the Director's Office",
  contactTitle: 'Get in touch.',
  contactTitleHighlight: 'touch.',
  contactSubtitle: "For institutional matters, partnerships, recruiter relationships, and campus visits - the Director's office is here.",
  contactLocation: "Director's office - 3rd Floor, SIMSREE",
  contactCallNumber: '022 6151 0700',
  contactCallLabel: 'PA to Director · Mon–Sat · 11am–7pm',
  contactEmailAddress: 'director@simsree.org',
  contactEmailLabel: 'Institutional matters · partnerships · visits',
};

const fallbackSections = [
  {
    title: "Learning Beyond the Classroom",
    titleHighlight: "Classroom",
    body: "At SIMSREE, education extends beyond textbooks and examinations. We encourage our students to think critically, analyze deeply, communicate effectively and apply knowledge to real-world situations.\n\nOur programmes are enriched through industry interaction, experiential learning, research, entrepreneurship initiatives, live projects and professional engagement. Supported by our committed faculty, dedicated administration, vibrant student community and accomplished alumni network, we strive to provide an environment where curiosity is encouraged and ideas are translated into meaningful outcomes. Our educational philosophy is anchored in five enduring values:\n\nExcellence | Collaboration | Integrity | Wisdom | Empathy\nThese values encourage our students to combine professional competence with ethical responsibility and a broader understanding of their role in society.",
  },
  {
    title: "A Meaningful Partnership with Industry",
    titleHighlight: "with Industry",
    body: "Industry is an important part of the SIMSREE ecosystem. We value our corporate partners not only as recruiters, but as partners in learning and knowledge creation. Their participation through internships, live projects, guest sessions, industry interactions, research, mentoring and recruitment helps students understand contemporary business challenges and workplace expectations.\n\nAt the same time, our students bring fresh perspectives, analytical capabilities, enthusiasm and innovative ideas to organizations. We welcome deeper engagement with businesses and institutions that share our commitment to developing talent, exchanging knowledge and creating meaningful value.",
  },
  {
    title: "To Our Students",
    titleHighlight: "Students",
    body: "To our prospective students, I invite you to look beyond a management qualification. Use your time at SIMSREE to question, explore, experiment, collaborate and discover your strengths. Develop a strong foundation in management, but also cultivate curiosity, integrity, adaptability and the confidence to make informed decisions. The SIMSREE experience should equip you not only with knowledge, but with the perspective and capabilities to navigate diverse professional and social environments.",
  },
  {
    title: "To Our Alumni and Partners",
    titleHighlight: "and Partners",
    body: "Our alumni remain an important part of the Sydenham family. Their accomplishments across industries and geographies reflect the enduring value of the SIMSREE experience. We look forward to strengthening these relationships and creating greater opportunities for alumni to engage with our students and institution. To our corporate and academic partners, I extend an invitation to collaborate with us in education, research, innovation, talent development and knowledge exchange.",
  },
  {
    title: "Continuing the Sydenham Tradition",
    titleHighlight: "Sydenham Tradition",
    body: "As SIMSREE moves ahead, our commitment is clear: to preserve our heritage while continuously improving the quality and relevance of management education. We aspire to create an institution where:\nKnowledge meets application.\nIdeas meet opportunity.\nAcademia meets industry.\nAnd excellence is guided by values.\nI warmly invite you to become a part of the SIMSREE journey - whether as a student, corporate partner, academic collaborator or alumnus. Together, let us continue to strengthen the Sydenham legacy of excellence, integrity and achievement.\n\nDr. Rupesh Raut\nDirector, SIMSREE",
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

// One part of the letter (Figma "Content Left", no number badge): an H2 title in
// #EAEAF1 with an italic Eastern Blue highlight; the first part opens with a Playfair
// lead paragraph. Blank lines split paragraphs; single line breaks are kept.
function DirectorSection({ title, titleHighlight, body, lead }) {
  const paras = (body || '').split(/\n\s*\n/).filter(Boolean);
  const rest = lead ? paras.slice(1) : paras;
  return (
    <div className="p-6 md:p-8 flex flex-col gap-6">
      <Heading text={title} highlight={titleHighlight} className="text-navy-50" highlightClass="text-teal-400 italic" />
      {lead && paras[0] && (
        <p className="font-display font-medium text-[20px] md:text-[22px] leading-[140%] tracking-[-0.01em] text-white">{paras[0]}</p>
      )}
      <div className="flex flex-col gap-[1.5em] text-base md:text-lg leading-[150%] text-white">
        {rest.map((para, i) => (
          <p key={i} className="whitespace-pre-line">
            {para}
          </p>
        ))}
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

  const quotePhotoUrl = imgUrl(dp.quotePhoto, 192) || '/images/director/avatar-rupesh-raut.webp';
  const portraitImageUrl = imgUrl(dp.portraitImage, 1216) || '/images/director/portrait-rupesh-raut.webp';

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

      {/* Director's message — on #eaeaf1: one Eastern Blue hairline frame holding the
          portrait (rounded, left) and the letter: title, paragraphs, name and role. */}
      <Section bg="bg-navy-50" width={1280}>
        <div id="message" className="scroll-mt-32 grid lg:grid-cols-[minmax(0,420px)_1fr] gap-8 lg:gap-14 p-5 md:p-8 lg:p-10 bg-navy-50 outline outline-1 -outline-offset-1 outline-teal-500">
          <div
            className="h-[460px] md:h-[560px] lg:h-full lg:min-h-[640px] rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: `url('${portraitImageUrl}')` }}
            role="img"
            aria-label={dp.portraitName}
          />
          <div className="flex flex-col gap-8 lg:py-4">
            <Heading
              text={dp.messageTitle}
              highlight={dp.messageTitleHighlight}
              className="text-navy-900"
              highlightClass="text-teal-500 italic"
            />
            <div className="flex flex-col gap-[1.25em] text-base md:text-lg leading-[150%] text-black">
              {(dp.messageBody || '')
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-display font-medium text-[28px] md:text-[36px] leading-[130%] tracking-[-0.01em] text-navy-900">
                {dp.portraitName}
              </p>
              <p className="text-base md:text-lg leading-[150%] text-black">{dp.portraitRole}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-12 bg-navy-900 rounded-2xl flex flex-col gap-6 md:gap-10 py-2 md:py-4">
          {sections.map((sec, i) => (
            <DirectorSection key={sec._id || sec.title} {...sec} lead={i === 0} />
          ))}
        </div>
      </Section>

      {/* Get in Touch — 1280 section, 80px gap, two cards: Call | Email (Figma) */}
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
            {dp.contactLocation && (
              <p className="mt-6 flex items-center justify-center gap-3 text-base leading-[150%] text-white">
                <MapPin size={20} strokeWidth={1.5} className="shrink-0" /> {dp.contactLocation}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
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
          </div>
        </div>
      </section>
    </div>
  );
}
