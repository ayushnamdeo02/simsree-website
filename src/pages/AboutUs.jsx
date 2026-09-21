import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import StatCard from '../components/StatCard';
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

function TitleWithHighlight({ text, highlight, suffix, className }) {
  // Editors sometimes type the whole sentence into the title field and fill the
  // highlight field too. Colour the phrase in place rather than repeating it.
  const base = text || '';
  const idx = highlight ? base.indexOf(highlight) : -1;

  if (idx !== -1) {
    const tail = base.slice(idx + highlight.length);
    // The title already carries the whole sentence, so only append a suffix that
    // isn't part of it already.
    const showSuffix = suffix && !base.includes(suffix);
    return (
      <h2 className={className}>
        {base.slice(0, idx)}
        <span className="text-teal-500">{highlight}</span>
        {tail}
        {showSuffix ? <> {suffix}</> : null}
      </h2>
    );
  }

  return (
    <h2 className={className}>
      {base}{' '}
      <span className="text-teal-500">{highlight}</span>
      {suffix ? <> {suffix}</> : null}
    </h2>
  );
}

// imageHeight varies by section: Campus & Culture uses 289, Alumni Network 470 (Figma)
function LinkCard({ image, badge, title, description, linkUrl, imageHeight = 'h-[289px]', titleClass, rounded = false }) {
  const cardImg = imgUrl(image, 400);
  return (
    <Link
      to={linkUrl || '#'}
      className={`flex flex-col bg-white overflow-hidden outline outline-1 outline-black/15 hover:outline-navy-300 transition-colors ${
        rounded ? 'rounded-2xl' : ''
      }`}
    >
      <div
        className={`${imageHeight} shrink-0 bg-gray-200 bg-cover bg-center`}
        style={cardImg ? { backgroundImage: `url('${cardImg}')` } : undefined}
      />
      <div className="flex flex-col flex-1 p-6">
        {/* Figma: 51x29 badge, radius 16, padding 10/4, Eastern Blue/Lightest fill. */}
        {badge && (
          <span className="inline-block w-fit text-sm leading-[150%] text-teal-500 bg-sky-50 px-2.5 py-1 rounded-2xl mb-2">
            {badge}
          </span>
        )}
        {/* Figma: Heading/H6 22/140, Colour/Astronaut/Base (H5 28/140 Neutral/Darkest on alumni). */}
        <h4
          className={
            titleClass ||
            'font-display text-xl md:text-[22px] md:leading-[140%] font-medium text-navy-900 mb-2'
          }
        >
          {title}
        </h4>
        {/* Figma: Body small Normal 14/150, Color Scheme 1/Text. */}
        <p className="text-sm leading-[150%] text-black">{description}</p>
      </div>
    </Link>
  );
}

// Teal date, title, then a solid navy action button with an arrow (Figma).
function NewsRow({ date, title, isDownload, actionLabel }) {
  // Figma: 1280 x 80 row, hairline divider between rows.
  return (
    <div className="flex items-center gap-6 h-[80px] border-b border-black/15 last:border-0">
      <span className="text-lg leading-[150%] uppercase text-teal-500 w-40 shrink-0">{date}</span>
      <h4 className="text-lg leading-[150%] text-black flex-1 min-w-0">{title}</h4>
      <span className="inline-flex items-center gap-2 text-sm font-medium bg-navy-900 text-white px-4 py-2 rounded-md shrink-0">
        {actionLabel || (isDownload ? 'PDF' : 'Read')} <ArrowUpRight size={14} />
      </span>
    </div>
  );
}

export default function AboutUs() {
  const facts = useKeyFacts();
  const { data } = useAboutPageData();

  const ap = fillFactsDeep({ ...fallbackAboutPage, ...(data?.aboutPage || {}) }, facts);
  const campusCards = fillFactsDeep(data?.campusCards?.length ? data.campusCards : fallbackCampusCards, facts);
  const alumniCards = fillFactsDeep(data?.alumniCards?.length ? data.alumniCards : fallbackAlumniCards, facts);
  const news = fillFactsDeep(data?.news?.length ? data.news : fallbackNews, facts);

  // The hero frame is landscape (1440x767) but the source may be portrait, so ask
  // Sanity to crop to the frame's ratio rather than letting bg-cover overscale it.
  // fit=crop honours the image's hotspot, set in the Studio.
  const heroImageUrl = ap.heroImage
    ? (() => {
        try {
          return urlFor(ap.heroImage)
            .width(1600)
            .height(852)
            .fit('crop')
            .crop('focalpoint')
            .focalPoint(0.5, 0.58)
            .auto('format')
            .url();
        } catch {
          return undefined;
        }
      })()
    : undefined;

  return (
    <div>
      {/* Hero */}
      <section>
        <div
          className="min-h-[600px] md:h-[767px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: heroImageUrl
              ? `url('${heroImageUrl}')`
              : "linear-gradient(180deg, #8a8f9e, #cfd3da)",
          }}
        >
          {/* Figma: a linear gradient layer at 30% opacity over the image —
              stops #000 at 0%, #333 at 51%, #666 at 99%, run on a diagonal from
              the bottom-left. Each stop carries the layer's 30% as its alpha. */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(25deg, rgba(0,0,0,0.3) 0%, rgba(51,51,51,0.3) 51%, rgba(102,102,102,0.3) 99%)',
            }}
          />
          {/* pt clears the fixed header; pb-[72px] + 36px gaps match the Figma content frame */}
          {/* Figma: 1440x767 frame, 64px padding. */}
          <div className="relative max-w-[1440px] mx-auto px-6 lg:px-16 pt-32 pb-12 md:pb-16 md:h-full flex flex-col justify-end text-white">
            <span className="inline-block w-fit bg-navy-900 text-white text-[18px] leading-[150%] px-4 py-2.5 rounded-full mb-9">
              {ap.heroEyebrow}
            </span>
            {/* Figma: H1 72/120. The measured line is ~807px, so cap the column
                below the 1251px that "…distinctive management" would need — that
                keeps the design's break after "distinctive". */}
            <h1 className="font-display text-4xl md:text-[72px] md:leading-[120%] font-semibold mb-3 max-w-[900px]">{ap.heroTitle}</h1>
            {/* Figma: Body medium Normal 18/150, W 803. */}
            <p className="max-w-[803px] text-lg leading-[150%] text-white mb-9">{ap.heroDescription}</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link to={ap.heroPrimaryCtaUrl} className="bg-sky-600 outline outline-1 outline-sky-600 hover:bg-sky-500 transition-colors text-white text-base leading-[150%] font-medium px-6 py-2.5 rounded-md flex items-center gap-3">
                {ap.heroPrimaryCtaLabel} <ArrowUpRight size={16} />
              </Link>
              <Link to={ap.heroDirectorLinkUrl} className="bg-white hover:bg-gray-100 transition-colors text-ink-900 text-base leading-[150%] font-medium px-6 py-2.5 rounded-md">
                {ap.heroDirectorLinkLabel}
              </Link>
              {/* Figma: white fill, radius 6, Opacity/Neutral Darkest stroke, gap 8. */}
              <Link to={ap.heroSecondaryCtaUrl} className="bg-white outline outline-1 outline-black/15 hover:bg-gray-100 transition-colors text-ink-900 text-base leading-[150%] font-medium px-6 py-2.5 rounded-md flex items-center gap-2">
                {ap.heroSecondaryCtaLabel}
              </Link>
            </div>
          </div>
        </div>

        {/* Stat cards below hero — 1408 frame, 64px padding, 1280 row, 32px gap (Figma) */}
        <div className="max-w-[1408px] mx-auto px-6 lg:px-16 py-10 lg:py-16">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {(ap.heroStats || []).map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Story — 1312 card, 32px padding, 24px content gap (Figma) */}
      <section className="py-16 lg:py-28">
        <div className="max-w-[1312px] mx-auto px-6 lg:px-0">
          <div className="p-6 lg:p-8">
            {/* Figma: Heading/Tagline 16/150, Color Scheme 1/Text. */}
            <span className="text-base leading-[150%] font-semibold uppercase text-black">{ap.storyEyebrow}</span>
            <TitleWithHighlight
              text={ap.storyTitle}
              highlight={ap.storyTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-6"
            />
            {(ap.storyBody || '').split('\n\n').map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? 'font-display text-xl md:text-[22px] md:leading-[140%] text-black mb-6'
                    : 'text-lg leading-[150%] text-black mb-6 last:mb-8'
                }
              >
                {para}
              </p>
            ))}
            <Link
              to={ap.storyLinkUrl}
              className="inline-flex items-center gap-3 bg-navy-900 hover:bg-navy-800 transition-colors text-white text-base leading-[150%] font-medium px-6 py-2.5 rounded-md w-fit"
            >
              {ap.storyLinkLabel} <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Leadership — 1312 card, 32px padding, quote not italic, outlined button (Figma) */}
      <section className="py-16 lg:py-28">
        <div className="max-w-[1312px] mx-auto px-6 lg:px-0">
          <div className="p-6 lg:p-8">
            {/* Figma: Inter Semi Bold 16/150, letter-spacing 0, Color Scheme 1/Text. */}
            <span className="text-base leading-[150%] font-semibold uppercase text-black">{ap.leadershipEyebrow}</span>
            <TitleWithHighlight
              text={ap.leadershipTitle}
              highlight={ap.leadershipTitleHighlight}
              suffix={ap.leadershipTitleSuffix}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-6"
            />
            {/* Figma: Heading/H6 22/140, Color Scheme 1/Text. */}
            <blockquote className="font-display text-xl md:text-[22px] md:leading-[140%] text-black mb-6">
              "{ap.leadershipQuote}"
            </blockquote>
            {/* Figma: Text/Medium/Normal 18/150, Color Scheme 1/Text. */}
            <p className="text-lg leading-[150%] text-black mb-8">— {ap.leadershipName} · {ap.leadershipRole}</p>
            <Link
              to={ap.leadershipLinkUrl}
              className="inline-flex items-center gap-2 outline outline-1 outline-black/15 hover:bg-navy-50 transition-colors text-ink-900 text-base leading-[150%] font-medium px-6 py-2.5 rounded-md w-fit"
            >
              {ap.leadershipLinkLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Recognition — 1312 card, left-aligned, white bg, outlined button (Figma) */}
      <section className="py-16 lg:py-28">
        <div className="max-w-[1312px] mx-auto px-6 lg:px-0">
          <div className="p-6 lg:p-8">
            {/* Figma: Heading/Tagline 16/150, Color Scheme 1/Text. */}
            <span className="text-base leading-[150%] font-semibold uppercase text-black">{ap.recognitionEyebrow}</span>
            <TitleWithHighlight
              text={ap.recognitionTitle}
              highlight={ap.recognitionTitleHighlight}
              suffix={ap.recognitionTitleSuffix}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-6"
            />
            {/* Figma: Heading/H6 22/140, Color Scheme 1/Text. */}
            <p className="font-display text-xl md:text-[22px] md:leading-[140%] text-black mb-8">{ap.recognitionBody}</p>
            <Link
              to={ap.recognitionLinkUrl}
              className="inline-flex items-center gap-2 outline outline-1 outline-black/15 hover:bg-navy-50 transition-colors text-ink-900 text-base leading-[150%] font-medium px-6 py-2.5 rounded-md w-fit"
            >
              {ap.recognitionLinkLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Campus & Culture — grey bg, centred heading, 1280 inner, 405.33 cards (Figma) */}
      <section className="bg-navy-50 py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-10 lg:mb-20">
            {/* Figma: Heading/Tagline 16/150, Color Scheme 1/Text. */}
            <span className="text-base leading-[150%] font-semibold uppercase text-black">{ap.campusEyebrow}</span>
            <TitleWithHighlight
              text={ap.campusTitle}
              highlight={ap.campusTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-6"
            />
            {/* Figma: Text/Medium/Normal 18/150, Color Scheme 1/Text. */}
            <p className="text-lg leading-[150%] text-black">{ap.campusBody}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {campusCards.map((c) => (
              <LinkCard key={c._id || c.title} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Network — white bg, centred heading, 308px cards, 16px gap (Figma) */}
      <section className="py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-10 lg:mb-20">
            {/* Figma: Heading/Tagline 16/150, Color Scheme 1/Text. */}
            <span className="text-base leading-[150%] font-semibold uppercase text-black">{ap.alumniEyebrow}</span>
            <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-6">{ap.alumniTitle}</h2>
            {/* Figma: Text/Medium/Normal 18/150, Color Scheme 1/Text, W 678. */}
            <p className="max-w-[678px] mx-auto text-lg leading-[150%] text-black">{ap.alumniBody}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {alumniCards.map((c) => (
              <LinkCard
                key={c._id || c.title}
                {...c}
                imageHeight="h-[463px]"
                rounded
                titleClass="font-display text-2xl md:text-[28px] md:leading-[140%] font-medium text-ink-900 mb-2"
              />
            ))}
          </div>
        </div>
      </section>

      {/* News & Announcements — 1280 inner, 112px padding, outlined CTA (Figma) */}
      <section className="py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="mb-10 lg:mb-20">
            {/* Figma: Heading/Tagline 16/150, Color Scheme 1/Text. */}
            <span className="text-base leading-[150%] font-semibold uppercase text-black">{ap.newsEyebrow}</span>
            <TitleWithHighlight
              text={ap.newsTitle}
              highlight={ap.newsTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6"
            />
            {/* Figma: Text/Medium/Normal 18/150, Color Scheme 1/Text, 768 x H 27. */}
            <p className="max-w-[768px] text-lg leading-[150%] text-black mt-6">{ap.newsSubtitle}</p>
          </div>
          <div className="mb-10 lg:mb-20">
            {news.map((n) => (
              <NewsRow key={n._id || n.title} {...n} />
            ))}
          </div>
          <Link
            to="/events/news"
            className="inline-flex items-center gap-3 bg-navy-900 outline outline-1 outline-navy-900 hover:bg-navy-800 transition-colors text-white text-base leading-[150%] font-medium px-6 py-2.5 rounded-md"
          >
            {ap.newsLinkLabel} <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* Get in Touch */}
      <section className="bg-navy-900 text-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          {/* Figma: Heading/Tagline 16/150, Colour/Neutral/White. */}
          <span className="text-base leading-[150%] font-semibold uppercase text-white">{ap.contactEyebrow}</span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-6 mb-6">{ap.contactTitle}</h2>
          {/* Figma: Text/Medium/Normal 18/150, Colour/Neutral/White. */}
          <p className="max-w-[768px] mx-auto text-lg leading-[150%] text-white mb-8">{ap.contactBody}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to={ap.contactPrimaryCtaUrl}
              className="bg-sky-600 outline outline-1 outline-sky-600 hover:bg-sky-500 transition-colors text-white text-base leading-[150%] font-medium px-6 py-2.5 rounded-md inline-flex items-center gap-3"
            >
              {ap.contactPrimaryCtaLabel} <ArrowUpRight size={16} />
            </Link>
            {/* Figma: Color/White text on the white button. */}
            <Link
              to={ap.contactSecondaryCtaUrl}
              className="bg-white hover:bg-gray-100 transition-colors text-ink-900 text-base leading-[150%] font-medium px-6 py-2.5 rounded-md"
            >
              {ap.contactSecondaryCtaLabel}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
