import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { StatGrid } from '../components/StatCard';
import PageHero, { HeroButton } from '../components/PageHero';
import { Section, SectionTitle, Tagline, Heading, H5, Tag } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { useAboutPageData } from '../lib/useAboutPageData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackAboutPage = {
  heroEyebrow: 'About SIMSREE · Established 1983',
  heroTitle: 'Forty years of distinctive management education.',
  heroDescription: "SIMSREE was born in 1983 from a conviction that great management education belongs at the centre of commerce — not on its periphery. Located at Churchgate, in the heart of Mumbai's financial district, that belief has shaped everything we do.",
  heroPrimaryCtaLabel: 'Read our history',
  heroPrimaryCtaUrl: '/about/history',
  heroDirectorLinkLabel: "Read the Director's message",
  heroDirectorLinkUrl: '/about/directors-message',
  heroSecondaryCtaLabel: 'See how we work',
  heroSecondaryCtaUrl: '/about/student-driven-system',
  heroStats: [
    { label: 'Founded', value: '1983', dark: true },
    { label: 'Years', value: '40+', dark: false },
    { label: 'Committees', value: '13', dark: true },
    { label: 'Alumni', value: '{{alumniCount}}', dark: false },
  ],

  storyEyebrow: 'Our Story',
  storyTitle: 'A legacy built over',
  storyTitleHighlight: 'four decades.',
  storyBody: "Founded in 1983 as a natural extension of Sydenham College of Commerce — one of Mumbai's most celebrated institutions — the Sydenham Institute of Management Studies, Research and Entrepreneurship Education (SIMSREE) inherited a proven tradition of high-quality education.\n\nAt Churchgate, in the heart of India's financial capital, SIMSREE draws the finest industry talent and eminent faculty — and gives students unparalleled access to corporate India.\n\nFour decades on, SIMSREE ranks among India's premier management institutes — still driven by its founding commitment to academic rigour, entrepreneurial spirit, and a student driven culture.",
  storyLinkLabel: 'Read the full history',
  storyLinkUrl: '/about/history',

  leadershipEyebrow: 'Leadership',
  leadershipTitle: 'From the',
  leadershipTitleHighlight: "Director's",
  leadershipTitleSuffix: 'desk.',
  leadershipQuote: 'SIMSREE has always stood for something beyond a degree — for character forged through initiative, responsibility, and a deep engagement with the world of business.',
  leadershipName: 'Dr. Shriniwas Dhure',
  leadershipRole: 'Director, SIMSREE',
  leadershipLinkLabel: 'Read the full message',
  leadershipLinkUrl: '/about/directors-message',

  recognitionEyebrow: 'Recognition',
  recognitionTitle: 'Rankings',
  recognitionTitleHighlight: '&',
  recognitionTitleSuffix: 'accreditations you can verify.',
  recognitionBody: 'Listed under NIRF · approved by AICTE · affiliated with University of Mumbai · Cabinet approved integration into Dr Homi Bhabha State University (2024) · awarded Best Authorised Institutional Partner 2025 by FPSB India.',
  recognitionLinkLabel: 'See where we rank',
  recognitionLinkUrl: '/about/rankings',

  campusEyebrow: 'Campus & Culture',
  campusTitle: 'Where learning goes',
  campusTitleHighlight: 'beyond the classroom.',
  campusBody: "The campus isn't a backdrop — it's part of the curriculum. From day one you lead, organise, connect, and create, with 13 student run committees running the institute.",

  alumniEyebrow: 'Alumni Network',
  alumniTitle: '5,000+ alumni worldwide.',
  alumniBody: 'From senior bankers to founders and public servants, thousands of SIMSREE alumni across India and the world carry the institute’s values — initiative, rigour, and integrity — into every role.',

  newsEyebrow: 'News & Announcements',
  newsTitle: 'Just',
  newsTitleHighlight: 'announced.',
  newsSubtitle: 'Latest from the admissions, awards, and government notifications.',
  newsLinkLabel: 'View all announcements',

  contactEyebrow: 'Get in Touch',
  contactTitle: 'Want to visit campus?',
  contactBody: 'B Road, Churchgate, Mumbai 400 020 · Mon–Sat · 11am–7pm. Two minutes from Churchgate station.',
  contactPrimaryCtaLabel: 'Book a campus visit',
  contactPrimaryCtaUrl: '/contact',
  contactSecondaryCtaLabel: 'Find your programme',
  contactSecondaryCtaUrl: '/academics',
};

const fallbackCampusCards = [
  { badge: 'New', title: 'Facilities', description: 'Auditorium · library · computer lab · seminar hall · cafeteria · recreation.', linkUrl: '/about/campus-life' },
  { badge: null, title: 'Student-Driven System', description: 'See how 13 committees actually run the institute · 2 year leadership ladder.', linkUrl: '/about/student-driven-system' },
  { badge: null, title: 'Life @ SIMSREE', description: 'A day in the life · gallery · student voices.', linkUrl: '/students/life' },
];

const fallbackAlumniCards = [
  { badge: 'New', title: 'Illustrious Alumni', description: 'Notable graduates across BFSI, media, consulting, public service.', linkUrl: '/about/alumni' },
  { badge: null, title: 'SIMAA', description: 'SIMSREE Management Alumni Association · Batchmeets · mentorship.', linkUrl: '/alumni-portal' },
  { badge: 'New', title: 'Alumni Gateway', description: 'Digital alumni portal · register · update milestones · find batchmates.', linkUrl: '/alumni-portal' },
  { badge: 'New', title: 'Simarthan', description: 'Independent not for profit · advancing education, research, scholarships.', linkUrl: '/about/simarthan' },
];

const fallbackNews = [
  { tag: 'Admission', title: 'MMM & MFM Executive · AY 2026-27 · Round 4 Notification', date: '6th May 2026', isDownload: true, actionLabel: 'PDF' },
  { tag: 'Award', title: 'SIMSREE awarded Best Authorised Institutional Partner 2025 by FPSB India', date: 'Nov 2025', actionLabel: 'Read' },
  { tag: 'Results', title: 'PhD Result AY 2025-26 announced', date: 'Sept 2025', isDownload: true, actionLabel: 'PDF' },
  { tag: 'Admission', title: 'Final allotment list · MMS ACAP AY 2025-26', date: 'Sept 2025', isDownload: true, actionLabel: 'PDF' },
];

function imgUrl(image, width) {
  if (!image) return undefined;
  try {
    return urlFor(image).width(width).auto('format').url();
  } catch {
    return undefined;
  }
}

// Campus & Culture card — Figma: 405x444, no radius, 1px black/20 hairline,
// 270px photo (223 on mobile), 24px padding, 8px gaps, H5 28 (H6 22 on mobile).
function CampusCard({ image, badge, title, description, linkUrl }) {
  const cardImg = imgUrl(image, 820);
  return (
    <Link
      to={linkUrl || '#'}
      className="flex flex-col bg-white outline outline-1 -outline-offset-1 outline-black/20 hover:outline-navy-300 transition-colors"
    >
      <div
        className="h-[223px] md:h-[270px] shrink-0 bg-navy-50 bg-cover bg-center"
        style={cardImg ? { backgroundImage: `url('${cardImg}')` } : undefined}
      />
      <div className="flex flex-col gap-2 p-6">
        {badge && <Tag className="w-fit bg-sky-50 text-teal-500 outline-0">{badge}</Tag>}
        <h3 className="font-display font-medium text-[22px] leading-[140%] md:text-[28px] tracking-[-0.01em] text-navy-900">
          {title}
        </h3>
        <p className="text-sm leading-[150%] text-black">{description}</p>
      </div>
    </Link>
  );
}

// Alumni Network card — Figma: 308 wide; a 463px photo card (radius 16 on top,
// hairline, "small" shadow) above 24px-padded copy, all inside a hairline frame
// rounded 16 at the bottom.
function AlumniCard({ image, badge, title, description, linkUrl }) {
  const cardImg = imgUrl(image, 640);
  return (
    <Link
      to={linkUrl || '#'}
      className="flex flex-col gap-4 bg-white rounded-b-2xl outline outline-1 -outline-offset-1 outline-black/20 hover:outline-navy-300 transition-colors"
    >
      <div
        className="h-[463px] shrink-0 rounded-t-2xl bg-navy-50 bg-cover bg-center outline outline-1 -outline-offset-1 outline-black/20 shadow-small"
        style={cardImg ? { backgroundImage: `url('${cardImg}')` } : undefined}
      />
      <div className="flex flex-col gap-2 p-6">
        {badge && <Tag className="w-fit bg-sky-50 text-teal-500 outline-0">{badge}</Tag>}
        <div className="flex flex-col gap-4">
          <H5 className="text-black">{title}</H5>
          <p className="text-base leading-[150%] text-black">{description}</p>
        </div>
      </div>
    </Link>
  );
}

// Announcement row — Figma "Accordion Item": 80 tall, hairline box, 20/32 padding,
// 80 gaps; teal SemiBold date, 16/150 title, navy 40px button. Stacks on mobile.
function NewsRow({ date, title, isDownload, actionLabel, fileUrl, url }) {
  const label = actionLabel || (isDownload ? 'PDF' : 'Read');
  const href = fileUrl || url;
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-20 min-h-20 px-8 py-5 outline outline-1 -outline-offset-1 outline-black/20">
      <span className="md:w-28 shrink-0 text-base leading-[150%] font-semibold uppercase text-teal-500">{date}</span>
      <p className="flex-1 min-w-0 text-base leading-[150%] text-black">{title}</p>
      <a
        href={href || '/events/news'}
        className="inline-flex items-center gap-2 w-fit h-[37px] md:h-10 px-5 rounded-md bg-navy-900 outline outline-1 -outline-offset-1 outline-black/20 text-white text-sm md:text-base leading-[150%] md:font-medium hover:bg-navy-800 transition-colors shrink-0"
      >
        {label} <ArrowUpRight size={20} strokeWidth={1.5} />
      </a>
    </div>
  );
}

// "Event / 4 /" block: tagline, H2, copy and a button inside a 32px-padded column.
// Figma: 32 gaps desktop (24 mobile), 24 between title and copy; mobile insets 8.
function StoryBlock({ tagline, children, action }) {
  return (
    <section className="px-5 py-16 md:px-16 md:py-28">
      <div className="max-w-[1312px] mx-auto px-2 py-8 md:p-8 flex flex-col gap-6 md:gap-8">
        <Tagline>{tagline}</Tagline>
        <div className="flex flex-col gap-6">{children}</div>
        {action}
      </div>
    </section>
  );
}

// Figma Heading/H6 22/140 Playfair — the lead paragraph under each story title.
const lead = 'font-display font-medium text-[22px] leading-[140%] tracking-[-0.01em] text-black whitespace-pre-line';
const outlineBtn =
  'inline-flex items-center gap-2 w-fit h-11 px-6 rounded-md outline outline-1 -outline-offset-1 outline-black/20 text-black text-base leading-[150%] font-medium hover:bg-navy-50 transition-colors';
const navyBtn =
  'inline-flex items-center gap-3 w-fit h-11 px-6 rounded-md bg-navy-900 text-white text-base leading-[150%] font-medium hover:bg-navy-800 transition-colors';

export default function AboutUs() {
  const facts = useKeyFacts();
  const { data } = useAboutPageData();

  const ap = fillFactsDeep({ ...fallbackAboutPage, ...(data?.aboutPage || {}) }, facts);
  const campusCards = fillFactsDeep(data?.campusCards?.length ? data.campusCards : fallbackCampusCards, facts);
  const alumniCards = fillFactsDeep(data?.alumniCards?.length ? data.alumniCards : fallbackAlumniCards, facts);
  const news = fillFactsDeep(data?.news?.length ? data.news : fallbackNews, facts);

  const [storyLead, ...storyRest] = (ap.storyBody || '').split('\n\n');

  return (
    <div>
      <PageHero
        image={heroImage(ap.heroImage, '/images/about/hero.webp', { stretch: true })}
        eyebrow={ap.heroEyebrow}
        eyebrowStyle="pill"
        title={ap.heroTitle}
        titleWidth={1000}
        description={ap.heroDescription}
        actions={[
          { label: ap.heroPrimaryCtaLabel, to: ap.heroPrimaryCtaUrl, primary: true },
          { label: ap.heroDirectorLinkLabel, to: ap.heroDirectorLinkUrl, mobileLast: true },
          { label: ap.heroSecondaryCtaLabel, to: ap.heroSecondaryCtaUrl },
        ]}
        mobileOverlay="dark"
        mobileTitle="text-[40px] leading-[120%]"
        mobileActions="grid"
      />

      {/* Stats — Figma "Layout / 396": 64 padding, 296x300 cards, 32 gap (2x2 on mobile). */}
      <section className="px-5 py-16 md:p-16">
        <StatGrid stats={ap.heroStats} />
      </section>

      <StoryBlock
        tagline={ap.storyEyebrow}
        action={
          <Link to={ap.storyLinkUrl} className={navyBtn}>
            {ap.storyLinkLabel} <ArrowUpRight size={24} strokeWidth={1.5} />
          </Link>
        }
      >
        <Heading text={composeTitle(ap.storyTitle, ap.storyTitleHighlight)} highlight={ap.storyTitleHighlight} />
        <p className={lead}>{storyLead}</p>
        {storyRest.length > 0 && (
          <div className="text-base md:text-lg leading-[150%] text-black whitespace-pre-line">
            {storyRest.map((para, i) => (
              <p key={i} className={i > 0 ? 'mt-[1.5em]' : undefined}>
                {para}
              </p>
            ))}
          </div>
        )}
      </StoryBlock>

      <StoryBlock
        tagline={ap.leadershipEyebrow}
        action={
          <Link to={ap.leadershipLinkUrl} className={outlineBtn}>
            {ap.leadershipLinkLabel}
          </Link>
        }
      >
        <Heading
          text={composeTitle(ap.leadershipTitle, ap.leadershipTitleHighlight, ap.leadershipTitleSuffix)}
          highlight={ap.leadershipTitleHighlight}
        />
        <blockquote className={lead}>&ldquo;{ap.leadershipQuote}&rdquo;</blockquote>
        <p className="text-lg leading-[150%] text-black">
          — {ap.leadershipName} · {ap.leadershipRole}
        </p>
      </StoryBlock>

      <StoryBlock
        tagline={ap.recognitionEyebrow}
        action={
          <Link to={ap.recognitionLinkUrl} className={outlineBtn}>
            {ap.recognitionLinkLabel}
          </Link>
        }
      >
        <Heading
          text={composeTitle(ap.recognitionTitle, ap.recognitionTitleHighlight, ap.recognitionTitleSuffix)}
          highlight={ap.recognitionTitleHighlight}
        />
        <p className={lead}>{ap.recognitionBody}</p>
      </StoryBlock>

      {/* Campus & Culture — Figma "Blog / 36 /" on #eaeaf1: centred 768 title, 3 cards, 32 gap. */}
      <Section bg="bg-navy-50" width={1280}>
        <SectionTitle
          center
          tagline={ap.campusEyebrow}
          title={composeTitle(ap.campusTitle, ap.campusTitleHighlight)}
          highlight={ap.campusTitleHighlight}
          body={ap.campusBody}
        />
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {campusCards.map((c) => (
            <CampusCard key={c._id || c.title} {...c} />
          ))}
        </div>
      </Section>

      {/* Alumni Network — white "Blog / 36 /": centred title (678 body), four 308 cards, 16 gap. */}
      <Section width={1280}>
        <SectionTitle center tagline={ap.alumniEyebrow} title={ap.alumniTitle} />
        <p className="mt-5 md:mt-6 max-w-[678px] mx-auto text-center text-base md:text-lg leading-[150%] text-black">
          {ap.alumniBody}
        </p>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {alumniCards.map((c) => (
            <AlumniCard key={c._id || c.title} {...c} />
          ))}
        </div>
      </Section>

      {/* News — Figma "FAQ / 1 /": 768 title (centred on mobile), 8px-gapped rows, navy CTA. */}
      <Section width={1280} className="border-t border-white/20">
        <SectionTitle
          className="text-center md:text-left"
          tagline={ap.newsEyebrow}
          title={composeTitle(ap.newsTitle, ap.newsTitleHighlight)}
          highlight={ap.newsTitleHighlight}
          body={ap.newsSubtitle}
        />
        <div className="mt-20 flex flex-col gap-2">
          {news.map((n) => (
            <NewsRow key={n._id || n.title} {...n} />
          ))}
        </div>
        <Link to="/events/news" className={`${navyBtn} mt-20 mx-auto md:mx-0`}>
          {ap.newsLinkLabel} <ArrowUpRight size={24} strokeWidth={1.5} />
        </Link>
      </Section>

      {/* Get in touch — Figma "CTA / 57 /" navy: centred 768 column, 32 gap to buttons. */}
      <Section bg="bg-navy-900" width={768} className="text-center">
        <SectionTitle center dark tagline={ap.contactEyebrow} title={ap.contactTitle} body={ap.contactBody} />
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <HeroButton label={ap.contactPrimaryCtaLabel} to={ap.contactPrimaryCtaUrl} primary />
          <HeroButton label={ap.contactSecondaryCtaLabel} to={ap.contactSecondaryCtaUrl} />
        </div>
      </Section>
    </div>
  );
}
