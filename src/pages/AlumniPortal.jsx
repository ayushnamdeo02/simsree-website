import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Mail, MapPin, Phone } from 'lucide-react';
import { StatGrid } from '../components/StatCard';
import PageHero, { HeroButton } from '../components/PageHero';
import { Section, SectionTitle, Tagline, Heading, H5, H6 } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { useAlumniPortalData } from '../lib/useAlumniPortalData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackPage = {
  heroEyebrow: 'SIMAA · Est. 1985 · 5,000+ members',
  heroTitle: 'Alumni Portal.',
  heroDescription:
    'Stay connected, give back, keep growing. Your official home for batchmeets, mentorship, city chapters, and everything SIMAA runs.',
  heroPrimaryCtaLabel: 'Register on Gateway',
  heroPrimaryCtaUrl: '#register',
  heroSecondaryCtaLabel: 'Browse member services',
  heroSecondaryCtaUrl: '#services',
  heroTertiaryCtaLabel: 'Find your chapter',
  heroTertiaryCtaUrl: '#chapters',

  stats: [
    { label: 'Registered Alumni', value: '{{alumniCount}}', dark: true },
    { label: 'Years of SIMAA', value: '40+', dark: false },
    { label: 'City Chapters', value: '6', dark: true },
    { label: 'Active Mentors', value: '280+', dark: false },
  ],

  calendarEyebrow: 'Upcoming for Alumni',
  calendarTitle: "What's on the SIMAA calendar.",
  calendarTitleHighlight: 'SIMAA calendar.',
  calendarSubtitle: 'Batchmeets, sector panels, mentorship sessions - open to all registered alumni.',

  servicesEyebrow: 'SIMAA · The Official Body',
  servicesTitle: 'services for SIMSREE alumni.',
  servicesSubtitle: 'Filter by category. Every service is included with your SIMAA registration.',

  chaptersEyebrow: 'City Chapters',
  chaptersTitle: 'Find your chapter convener.',
  chaptersTitleHighlight: 'chapter convener.',
  chaptersSubtitle: 'Six active city chapters · run by elected alumni conveners on rotating two-year terms.',
  chaptersCtaLabel: 'Browse all 12 cities',
  chaptersCtaUrl: '#chapters',

  giveBackEyebrow: 'Four Ways to Give Back',
  giveBackTitle: 'Plug in. Pay it forward.',
  giveBackTitleHighlight: 'Pay it forward.',
  giveBackSubtitle:
    'Every SIMSREE alumnus has at least one of these to give: time, network, expertise, or capital.',
  giveBackCards: [
    {
      label: 'Mentor',
      title: 'Become a 1:1 mentor',
      description:
        'Senior matched with a current student. 30 minutes once a month. The most under-rated programme we run.',
      linkLabel: 'Volunteer',
      linkUrl: '/contact',
    },
    {
      label: 'Recruit',
      title: 'Hire a SIMSREE student',
      description:
        'Open hiring at your firm. Refer JDs. Connect with the Placement Committee directly.',
      linkLabel: 'Open hiring',
      linkUrl: '/placements',
    },
    {
      label: 'Speak',
      title: 'Guest lecture',
      description:
        'Go deeper on a domain. Deliver a single lecture, share industry frontline war stories, sit on a panel.',
      linkLabel: 'Apply',
      linkUrl: '/contact',
    },
    {
      label: 'Fund',
      title: 'Fund a scholarship',
      description:
        'Need-based scholarships routed via Simarthan. 100% of capital goes to the student, audited annually.',
      linkLabel: 'Contribute',
      linkUrl: '/about/simarthan',
    },
  ],

  voicesEyebrow: 'The Voices',
  voicesTitle: 'Eight talks worth your afternoon.',
  voicesSubtitle: 'A curated start. The full library lives at YouTube/@TEDxSIMSREE',

  ctaEyebrow: 'Become a SIMAA member',
  ctaTitle: 'Register on the Gateway.',
  ctaTitleHighlight: 'Gateway.',
  ctaSubtitle:
    'Free for life. Two minutes to register. Unlocks every service on this page - events, mentorship, referrals, masterclasses, and the alumni directory.',
  ctaPrimaryLabel: 'Register now',
  ctaPrimaryUrl: '#register',
  ctaSecondaryLabel: 'Email SIMAA office',
  ctaSecondaryUrl: 'mailto:simaa@simsree.org',
  ctaFacts: [
    { value: '2 min', label: 'to register' },
    { value: '₹0', label: 'membership cost' },
    { value: '12', label: 'member services unlocked' },
  ],
  ctaContact: [
    '{{address}}',
    'simaa@simsree.org',
    '+91 22 6151 0700',
  ],
};

// Defaults below follow the Figma "Alumni Portal" frame (copy and photos).
const fallbackEvents = [
  { day: 'Sat', date: '22', month: 'Nov 2026', category: 'Flagship', title: 'SIMAA Annual Batchmeet 2026', description: 'Cross-batch reunion · Churchgate campus · all batches welcome · dinner, panels, awards.', ctaLabel: 'RSVP' },
  { day: 'Sat', date: '18', month: 'Jun 2026', category: 'Bengaluru chapter', title: 'BFSI Networking Evening · Whitefield', description: 'Open bar · 60+ alumni confirmed · UB City address shared on RSVP.', ctaLabel: 'RSVP' },
  { day: 'Sat', date: '02', month: 'Jul 2026', category: 'Mentorship', title: 'Mock GDPI Panel for MMS 2026 cohort', description: 'Volunteer slot · 2-hour panel · Churchgate · 30 alumni interviewers needed.', ctaLabel: 'Volunteer' },
  { day: 'Sat', date: '14', month: 'Aug 2026', category: 'Delhi NCR chapter', title: 'Independence-eve dinner · Khan Market', description: 'Casual evening · spouses welcome · pre-pay reservation closes 10 Aug.', ctaLabel: 'Reserve' },
  { day: 'Sat', date: '28', month: 'Sep 2026', category: 'Sector evening', title: 'Consulting Sector Roundtable', description: 'Partners + Principals from MBB, Big Four, boutique firms · invite-only.', ctaLabel: 'Apply' },
];

const fallbackServices = [
  ['Networking', 'Annual Batchmeets', 'Cross-batch reunions in Mumbai, Bangalore, Delhi, Pune, Hyderabad, Singapore. November every year.', '6 cities · Free for SIMAA members'],
  ['Networking', 'Sector Evenings', 'Industry-specific networking nights · BFSI, Consulting, FMCG, Media, Tech, Public Service.', '6 sector tracks · 2× a year per sector'],
  ['Networking', 'City Chapter Meetups', 'Hyper-local meet-ups run by city chapter conveners · monthly evenings, casual format.', 'Run by chapter conveners'],
  ['Career', 'Referral Network', 'Internal job board · 120+ alumni-companies post openings · referrals routed via Gateway.', 'Avg 24 open roles at any time'],
  ['Career', 'Resume + LinkedIn clinics', 'Quarterly clinics with senior alumni recruiters · feedback on profile, positioning, talking points.', "Open to MMS '13 onwards"],
  ['Career', 'Reverse mentoring', 'Younger alumni offer current-tools mentorship to senior alumni navigating digital-first transitions.', 'Pairs ~30 alumni per quarter'],
  ['Learning', 'Faculty Masterclasses', 'Faculty-led deep-dives · finance, marketing, ops · alumni-only · livestream + replay.', '1 masterclass a month'],
  ['Learning', 'Library + JSTOR access', 'Lifetime library card · digital JSTOR + EBSCO access · alumni log-in via Gateway.', 'Renewed annually'],
  ['Mentorship', 'Mock GDPI Panels', 'Alumni interview MMS aspirants · pre-placement rehearsal · 2-hour panels each Saturday in October.', '~120 alumni interviewers/yr'],
  ['Mentorship', '1:1 Student Mentorship', 'Sector-matched pairs · alumni mentor pairs with a current student · 30 min/month commitment.', '280 active mentor pairings'],
  ['Giving back', 'Student Scholarships', 'Alumni-funded need-based scholarships · 12 students every year · routed via Simarthan trust.', '₹6L disbursed in 2025'],
  ['Giving back', 'Recognition Awards', 'Alumni-funded student of the year, best committee, best research thesis awards.', '3 awards · Convocation Day'],
].map(([category, title, description, meta], i) => ({
  category,
  title,
  description,
  meta,
  image: `/images/alumni-portal/service-${String(i + 1).padStart(2, '0')}.webp`,
}));

const fallbackChapters = [
  ['Mumbai', '2,400+ alumni', "Aarav Mehta · MMS '08", 'Sat 12 Jul · BSE Café', 'mumbai'],
  ['Bengaluru', '2,400+ alumni', "Meera Nair · MMS '14", 'Wed 18 Jun · UB City', 'bengaluru'],
  ['Delhi NCR', '2,400+ alumni', "Tanvi Sharma · MMS '12", 'Thu 14 Aug · Khan Market', 'delhi-ncr'],
  ['Pune', '310+ alumni', "Aryan Saxena · MMM '10", 'Fri 25 Jul · Koregaon Park', 'pune'],
  ['Hyderabad', '180+ alumni', "Rishi Bhatnagar · MFM '09", 'Sat 09 Aug · HITEC City', 'hyderabad'],
  ['Singapore', '140+ alumni', "Ananya Kapoor · MMS '13", 'Sun 20 Jul · Marina One', 'singapore'],
].map(([city, memberCount, convener, meetInfo, slug]) => ({
  city,
  memberCount,
  convener: `Convener · ${convener}`,
  meetInfo: `Next meetup · ${meetInfo}`,
  image: `/images/alumni-portal/chapter-${slug}.webp`,
}));

const fallbackTalks = ['Kavya Singh', 'Rohit Joshi', 'Sneha Patel', 'Ishaan Modi'].map((name, i) => ({
  name,
  tag: 'Founder · Funding',
  meta: "MMS '15 · 2 weeks ago",
  description: 'FinSure closed its Series A · ₹40 cr led by Lightbox · grateful to the SIMSREE network for early intros.',
  image: `/images/alumni-portal/talk-${i + 1}.webp`,
}));

function imgUrl(image, width) {
  if (!image) return undefined;
  if (typeof image === 'string') return image;
  try {
    return urlFor(image).width(width).auto('format').url();
  } catch {
    return undefined;
  }
}

// "Label · rest" → bold label, as in the Figma chapter cards.
function LabelLine({ text = '' }) {
  const [label, ...rest] = text.split(' · ');
  return (
    <p className="text-base leading-[150%]">
      <span className="font-semibold">{label}</span>
      {rest.length > 0 && ` · ${rest.join(' · ')}`}
    </p>
  );
}

export default function AlumniPortal() {
  const facts = useKeyFacts();
  const { data } = useAlumniPortalData();

  const pp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const events = fillFactsDeep(data?.events?.length ? data.events : fallbackEvents, facts);
  const services = fillFactsDeep(data?.services?.length ? data.services : fallbackServices, facts);
  const chapters = fillFactsDeep(data?.chapters?.length ? data.chapters : fallbackChapters, facts);
  const talks = fillFactsDeep(data?.talks?.length ? data.talks : fallbackTalks, facts);

  const contactIcons = [MapPin, Mail, Phone];

  return (
    <div>
      <PageHero
        image={heroImage(pp.heroImage, '/images/alumni-portal/hero.webp')}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About Us', to: '/about' }, { label: 'Alumni Portal' }]}
        eyebrow={pp.heroEyebrow}
        title={pp.heroTitle}
        description={pp.heroDescription}
        descriptionWidth={628}
        actions={[
          { label: pp.heroPrimaryCtaLabel, href: pp.heroPrimaryCtaUrl, primary: true },
          { label: pp.heroSecondaryCtaLabel, href: pp.heroSecondaryCtaUrl },
          { label: pp.heroTertiaryCtaLabel, href: pp.heroTertiaryCtaUrl },
        ]}
      />

      <section className="px-5 py-12 md:px-16 md:py-20">
        <StatGrid stats={pp.stats} />
      </section>

      {/* Calendar — centred title, five 230x466 hairline cards: 111x127 navy date
          tile, category, H6 title, 14/150 copy, outlined 37px button at the foot. */}
      <Section width={1280}>
        <SectionTitle
          center
          tagline={pp.calendarEyebrow}
          title={composeTitle(pp.calendarTitle, pp.calendarTitleHighlight)}
          highlight={pp.calendarTitleHighlight}
          body={pp.calendarSubtitle}
        />
        <div className="mt-12 flex lg:grid lg:grid-cols-5 gap-8 overflow-x-auto lg:overflow-visible -mx-5 px-5 lg:mx-0 lg:px-0 [scrollbar-width:none]">
          {events.map((e) => (
            <div
              key={e._id || e.title}
              className="rounded-xl w-[230px] shrink-0 lg:w-auto min-h-[466px] flex flex-col gap-8 px-8 py-4 bg-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small"
            >
              <div className="w-fit min-w-[106px] h-[127px] px-4 rounded-2xl bg-navy-900 text-white flex flex-col items-center justify-center text-center">
                <span className="text-base leading-[150%]">{e.day}</span>
                <span className="font-display font-medium text-[36px] leading-[130%] tracking-[-0.01em]">{e.date}</span>
                <span className="text-base leading-[150%] uppercase">{e.month}</span>
              </div>
              <div className="flex-1 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-4">
                  <span className="text-sm leading-[150%] text-navy-900">{e.category}</span>
                  <div className="flex flex-col gap-2">
                    <H6 as="h3" className="text-black">
                      {e.title}
                    </H6>
                    <p className="text-sm leading-[150%] text-black">{e.description}</p>
                  </div>
                </div>
                <a
                  href={e.ctaUrl || '#register'}
                  className="w-fit h-[37px] px-5 inline-flex items-center rounded-md bg-white outline outline-1 -outline-offset-1 outline-black/20 text-sm leading-[150%] text-navy-900 hover:bg-navy-50 transition-colors"
                >
                  {e.ctaLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Services — centred title with the count in teal; 405x623 cards: 341x320
          photo, yellow-tint tag, H5 28 navy, 18/150 copy, 14/150 navy footnote. */}
      <Section id="services" width={1280} className="scroll-mt-24">
        <SectionTitle
          center
          tagline={pp.servicesEyebrow}
          title={`${services.length} ${pp.servicesTitle}`}
          highlight={String(services.length)}
          body={pp.servicesSubtitle}
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
          {services.map((s) => {
            const img = imgUrl(s.image, 682);
            return (
              <div
                key={s._id || s.title}
                className="hover-card flex flex-col gap-6 p-6 md:p-8 rounded-2xl outline outline-1 -outline-offset-1 outline-black/20 shadow-small"
              >
                <div
                  className="h-[320px] rounded-2xl bg-navy-50 bg-cover bg-center"
                  style={img ? { backgroundImage: `url('${img}')` } : undefined}
                />
                <span className="w-fit px-2.5 py-1 rounded-2xl bg-[#fffbec] text-navy-900 text-xs leading-[150%]">{s.category}</span>
                <div className="flex flex-col gap-3">
                  <H5>{s.title}</H5>
                  <p className="text-base md:text-lg leading-[150%] text-black">{s.description}</p>
                  <p className="text-sm leading-[150%] text-navy-900">{s.meta}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* City chapters — 405x554 photo cards (radius 16), copy on a dark fade at
          the foot: navy member pill, H5 city, bold-label lines, contact link. */}
      <Section id="chapters" width={1280}>
        <SectionTitle
          center
          tagline={pp.chaptersEyebrow}
          title={composeTitle(pp.chaptersTitle, pp.chaptersTitleHighlight)}
          highlight={pp.chaptersTitleHighlight}
          body={pp.chaptersSubtitle}
        />
        <div className="mt-10 md:mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chapters.map((c) => {
            const img = imgUrl(c.image, 810);
            return (
              <div
                key={c._id || c.city}
                className="hover-card relative h-[554px] rounded-2xl overflow-hidden bg-navy-950 bg-cover bg-center outline outline-1 -outline-offset-1 outline-black/20 shadow-small"
                style={img ? { backgroundImage: `url('${img}')` } : undefined}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="relative h-full p-6 flex flex-col justify-end gap-3 text-white">
                  <span className="w-fit h-11 px-4 inline-flex items-center rounded-[32px] bg-navy-900 outline outline-1 -outline-offset-1 outline-black/20 text-base leading-[150%] font-medium">
                    {c.memberCount}
                  </span>
                  <div className="flex flex-col gap-1">
                    <H5 as="h3" className="text-white">
                      {c.city}
                    </H5>
                    <LabelLine text={c.convener} />
                    <LabelLine text={c.meetInfo} />
                  </div>
                  <a href={c.contactUrl || 'mailto:simaa@simsree.org'} className="flex items-center gap-2 w-fit text-base leading-[150%] hover:underline underline-offset-2">
                    Contact convener <ChevronRight size={24} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 flex justify-center">
          <HeroButton label={pp.chaptersCtaLabel} href={pp.chaptersCtaUrl} primary />
        </div>
      </Section>

      {/* Give back — #24295c, four 296x264 navy cards. */}
      <Section bg="bg-navy-800" width={1280} className="border-t border-white/20">
        <SectionTitle
          center
          dark
          tagline={pp.giveBackEyebrow}
          title={composeTitle(pp.giveBackTitle, pp.giveBackTitleHighlight)}
          highlight={pp.giveBackTitleHighlight}
          body={pp.giveBackSubtitle}
          titleClass="text-white [&_span]:text-teal-400"
        />
        <div className="mt-10 md:mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {(pp.giveBackCards || []).map((c) => (
            <div
              key={c.title}
              className="flex flex-col justify-center gap-4 min-h-[264px] p-8 rounded-2xl bg-navy-900 text-white outline outline-1 -outline-offset-1 outline-white/20 shadow-small"
            >
              <span className="text-sm leading-[150%] text-teal-100">{c.label}</span>
              <div className="flex flex-col gap-2">
                <H6 as="h3" className="text-white">
                  {c.title}
                </H6>
                <p className="text-sm leading-[150%] text-ink-50">{c.description}</p>
              </div>
              <Link to={c.linkUrl} className="flex items-center gap-2 w-fit text-sm leading-[150%] hover:underline underline-offset-2">
                {c.linkLabel} <ArrowRight size={24} strokeWidth={1.5} />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Talks — four 308 cards: 372px photo (radius 16 top) over 24-padded copy. */}
      <Section width={1280}>
        <SectionTitle center tagline={pp.voicesEyebrow} title={pp.voicesTitle} body={pp.voicesSubtitle} />
        <div className="mt-10 md:mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {talks.map((t) => {
            const img = imgUrl(t.image, 616);
            return (
              <div
                key={t._id || t.name}
                className="hover-card flex flex-col gap-4 rounded-b-2xl outline outline-1 -outline-offset-1 outline-black/20"
              >
                <div
                  className="h-[372px] rounded-t-2xl bg-navy-50 bg-cover bg-center outline outline-1 -outline-offset-1 outline-black/20 shadow-small"
                  style={img ? { backgroundImage: `url('${img}')` } : undefined}
                />
                <div className="flex flex-col gap-2 p-6 pt-2">
                  <span className="text-base leading-[150%] font-semibold text-black">{t.tag}</span>
                  <div className="flex flex-col gap-4 pb-4">
                    <div className="flex flex-col gap-1">
                      <H5 as="h3" className="text-black">
                        {t.name}
                      </H5>
                      <p className="text-base leading-[150%] text-ink-400">{t.meta}</p>
                    </div>
                    <p className="text-base leading-[150%] text-black">{t.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Register — navy, 64 padding: 567 copy column | facts split by 2px rules and
          contact lines with 16px icons, 80 apart. */}
      <section id="register" className="bg-navy-900 text-white px-5 py-12 md:px-16 md:py-20 border-t border-white/20 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-[567px_1fr] gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Tagline className="text-teal-400">{pp.ctaEyebrow}</Tagline>
              <Heading
                text={composeTitle(pp.ctaTitle, pp.ctaTitleHighlight)}
                highlight={pp.ctaTitleHighlight}
                className="text-white"
                highlightClass="text-teal-400"
              />
              <p className="max-w-[504px] text-base md:text-lg leading-[150%]">{pp.ctaSubtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3.5">
              <HeroButton label={pp.ctaPrimaryLabel} href={pp.ctaPrimaryUrl} primary icon={false} />
              <HeroButton label={pp.ctaSecondaryLabel} href={pp.ctaSecondaryUrl} />
            </div>
          </div>
          <div className="flex flex-col gap-10 lg:gap-20 lg:items-end">
            <div className="flex flex-wrap gap-[22px]">
              {(pp.ctaFacts || []).map((f, i) => (
                <div key={f.label} className="flex gap-[22px]">
                  {i > 0 && <span className="w-0.5 self-stretch min-h-[108px] bg-navy-50" aria-hidden="true" />}
                  <div className="flex flex-col gap-3">
                    <H5 as="p" className="text-white">
                      {f.value}
                    </H5>
                    <p className="text-lg leading-[150%]">{f.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <ul className="flex flex-col gap-2 lg:w-[528px]">
              {(pp.ctaContact || []).map((line, i) => {
                const Icon = contactIcons[i] || MapPin;
                return (
                  <li key={line} className="flex items-center gap-2 text-lg leading-[150%]">
                    <Icon size={16} className="shrink-0" /> {line}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
