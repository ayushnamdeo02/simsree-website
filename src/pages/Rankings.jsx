import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { StatGrid } from '../components/StatCard';
import PageHero from '../components/PageHero';
import { Section, SectionTitle, H5, H6, Tag, AccentCard } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { useRankingsPageData } from '../lib/useRankingsPageData';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

// Figma: every framework card uses the Colour/Eastern Blue/Base bar, weight 3.
const ACCENT_BG = {
  navy: 'bg-teal-500',
  sky: 'bg-teal-500',
  teal: 'bg-teal-500',
};

const fallbackRankingsPage = {
  heroEyebrow: 'Independently Verified',
  heroTitle: 'Ranked, accredited, and verifiable - proof you can show a recruiter.',
  heroTitleHighlight: 'proof you can show a recruiter.',
  heroDescription: "SIMSREE's consistent performance across national ranking frameworks reflects the quality of our programmes, faculty, placements, and student outcomes.",
  heroPrimaryCtaLabel: 'Download the NIRF report (PDF)',
  heroPrimaryCtaUrl: '#',
  heroSecondaryCtaLabel: 'See all accreditations',
  heroSecondaryCtaUrl: '#accreditations',

  stats: [
    { label: 'IIRF National', value: '#25', dark: true },
    { label: 'Years', value: '40+', dark: false },
    { label: 'Latest FPSB Award', value: '2025', dark: true },
    { label: 'Homi Bhabha SU Approval', value: '2024', dark: false },
  ],

  frameworksEyebrow: 'National Rankings',
  frameworksTitle: 'Where we stand',
  frameworksTitleHighlight: 'stand',
  frameworksSubtitle: "Year-on-year position across India's most respected ranking frameworks.",

  accreditationsEyebrow: 'Accreditations',
  accreditationsTitle: 'Officially recognised.',
  accreditationsTitleHighlight: 'recognised.',
  accreditationsSubtitle: 'Approvals, accreditations, and compliance standards.',

  verifyEyebrow: 'Verification & Documents',
  verifyTitle: 'Download every ranking PDF',
  verifySubtitle: 'Public access to NIRF data sheets, accreditation certificates, and award citations.',
};

const fallbackFrameworks = [
  {
    tag: 'NIRF',
    accentColor: 'navy',
    title: 'NIRF Ranked Institute',
    description: 'Listed under the National Institutional Ranking Framework - Government of India. Annual public ranking based on teaching, learning, graduation outcomes, outreach, and perception.',
    actionLabel: 'Download NIRF Report',
    isDownload: true,
  },
  {
    tag: '#25',
    accentColor: 'sky',
    title: 'IIRF National Rank #25',
    description: "Indian Institutional Ranking Framework - among India's top-25 management institutes based on placement, academic excellence, faculty quality, and research output.",
    actionLabel: 'View framework',
  },
  {
    tag: 'UoM',
    accentColor: 'teal',
    title: 'Mumbai University Affiliated',
    description: "Affiliated with the University of Mumbai - one of India's oldest and most respected universities. Degrees conferred under UoM authority.",
    actionLabel: 'University details',
  },
];

const fallbackAccreditations = [
  { highlight: '25th', title: 'IIRF Ranking 2024', description: 'Ranked 25th in India by the Indian Institutional Ranking Framework, with an overall score of 819.5.' },
  { highlight: '26th', title: 'The Week Ranking', description: 'Ranked 26th by The Week, recognising our commitment to excellence and resilience in management education.' },
  { highlight: '35th', title: 'BT-MDRA Ranking 2023', description: 'Secured the 35th position in the BT-MDRA rankings, achieving an overall score of 717.77.' },
  { highlight: 'Academic Excellence', title: 'A Legacy of Achievement', description: 'Continuously advancing quality management education through academic excellence, institutional growth, and future-focused learning.' },
];

const fallbackVerificationDocs = [
  { tag: 'NIRF', title: 'NIRF data sheet 2025', detail: 'Ministry of Education · 2.4 MB', actionLabel: 'Download NIRF data sheet' },
  { tag: 'AICTE', title: 'AICTE Approval Certificate', detail: '2025-26 · 1.1 MB', actionLabel: 'Download AICTE certificate' },
  { tag: 'Verify', title: 'Verify a degree', detail: 'Real-time portal · Direct Verify', actionLabel: 'Open portal', isExternal: true },
];

export default function Rankings() {
  const facts = useKeyFacts();
  const { data } = useRankingsPageData();

  const rp = fillFactsDeep({ ...fallbackRankingsPage, ...(data?.rankingsPage || {}) }, facts);
  const frameworks = fillFactsDeep(data?.frameworks?.length ? data.frameworks : fallbackFrameworks, facts);
  const accreditations = fillFactsDeep(data?.accreditations?.length ? data.accreditations : fallbackAccreditations, facts);
  const verificationDocs = fillFactsDeep(data?.verificationDocs?.length ? data.verificationDocs : fallbackVerificationDocs, facts);

  return (
    <div>
      <PageHero
        image={heroImage(rp.heroImage, '/images/rankings/hero.webp')}
        eyebrow={rp.heroEyebrow}
        eyebrowUpper
        title={rp.heroTitle}
        titleWidth={1140}
        description={rp.heroDescription}
        descriptionWidth={628}
        actions={[
          { label: rp.heroPrimaryCtaLabel, href: rp.heroPrimaryCtaUrl, primary: true },
          { label: rp.heroSecondaryCtaLabel, href: rp.heroSecondaryCtaUrl },
        ]}
        mobileOverlay="gradient-tint"
      />

      <section className="px-5 py-12 md:px-16 md:py-20">
        <StatGrid stats={rp.stats} />
      </section>

      {/* National Rankings — centred title, three 405 cards with a 3px Eastern Blue
          bar, 48 gaps inside (tag · copy · button). */}
      <Section width={1280}>
        <SectionTitle
          center
          tagline={rp.frameworksEyebrow}
          title={composeTitle(rp.frameworksTitle, rp.frameworksTitleHighlight)}
          highlight={rp.frameworksTitleHighlight}
        />
        <p className="mt-5 md:mt-6 max-w-[678px] mx-auto text-center text-base md:text-lg leading-[150%] text-black">
          {rp.frameworksSubtitle}
        </p>
        {/* Cards stretch to the tallest one and the buttons sit on a shared baseline. */}
        <div className="mt-10 md:mt-12 grid md:grid-cols-3 gap-8">
          {frameworks.map((f) => (
            <AccentCard
              key={f._id || f.title}
              accent={ACCENT_BG[f.accentColor] || 'bg-teal-500'}
              className="[&>div:last-child]:flex [&>div:last-child]:flex-col"
            >
              <div className="flex flex-1 flex-col gap-12">
                <Tag className="w-fit bg-navy-900 text-white outline-0">{f.tag}</Tag>
                <div className="flex flex-col gap-4">
                  {/* H5 28 / 16 on desktop, H6 22 / 14 on mobile (Figma). */}
                  <H5 className="text-navy-900 max-md:text-[22px]">{f.title}</H5>
                  <p className="text-sm md:text-base leading-[150%] text-black">{f.description}</p>
                </div>
                {f.actionLabel && (
                  <a
                    href={f.actionUrl || '#'}
                    className="mt-auto inline-flex items-center gap-3 w-fit h-11 px-6 rounded-md bg-white outline outline-1 -outline-offset-1 outline-black/20 text-sm md:text-base leading-[150%] md:font-medium text-black hover:bg-navy-50 transition-colors"
                  >
                    {f.actionLabel}
                    {f.isDownload ? <Download size={24} strokeWidth={1.5} /> : <ArrowRight size={24} strokeWidth={1.5} />}
                  </a>
                )}
              </div>
            </AccentCard>
          ))}
        </div>
      </Section>

      {/* Officially recognised — four square navy cards with a 3px Eastern Blue bar (the
          last one wider): a large highlight ("25th"), a title and a short description. */}
      <Section id="accreditations" bg="bg-navy-50" width={1280}>
        <SectionTitle
          center
          tagline={rp.accreditationsEyebrow}
          title={composeTitle(rp.accreditationsTitle, rp.accreditationsTitleHighlight)}
          highlight={rp.accreditationsTitleHighlight}
        />
        <p className="mt-5 md:mt-6 max-w-[678px] mx-auto text-center text-base md:text-lg leading-[150%] text-black">
          {rp.accreditationsSubtitle}
        </p>
        <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.75fr] gap-6 lg:gap-8">
          {accreditations.map((a) => {
            const Card = a.linkUrl ? 'a' : 'div';
            return (
              <Card
                key={a._id || a.title}
                {...(a.linkUrl ? { href: a.linkUrl } : {})}
                className="flex bg-navy-900 text-white shadow-small"
              >
                <span className="w-[3px] shrink-0 bg-teal-500" aria-hidden="true" />
                <span className="flex flex-col gap-3 p-8">
                  <span className="font-display font-medium text-[36px] leading-[120%] tracking-[-0.01em] text-white">
                    {a.highlight}
                  </span>
                  <H6 as="span" className="text-white">
                    {a.title}
                  </H6>
                  <span className="text-sm leading-[150%] text-navy-50">{a.description}</span>
                </span>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Verification & Documents — #24295c, centred title, three 405x201 navy cards. */}
      <Section bg="bg-navy-800" width={1280} className="border-t border-white/20">
        <SectionTitle center dark tagline={rp.verifyEyebrow} title={rp.verifyTitle} body={rp.verifySubtitle} />
        <div className="mt-10 md:mt-12 grid md:grid-cols-3 gap-8">
          {verificationDocs.map((d) => (
            <div
              key={d._id || d.title}
              className="flex flex-col justify-center gap-4 min-h-[201px] p-8 rounded-2xl bg-navy-900 text-white outline outline-1 -outline-offset-1 outline-white/20 shadow-small"
            >
              <span className="text-sm leading-[150%] uppercase text-teal-100">{d.tag}</span>
              <div className="flex flex-col gap-2">
                <H6 as="h3" className="text-white">
                  {d.title}
                </H6>
                <p className="text-sm leading-[150%] text-ink-50">{d.detail}</p>
              </div>
              <a
                href={d.actionUrl || '#'}
                className="flex items-center gap-2 w-fit text-sm leading-[150%] hover:underline underline-offset-2"
              >
                {d.actionLabel}
                {d.isExternal ? <ArrowUpRight size={24} strokeWidth={1.5} /> : <Download size={24} strokeWidth={1.5} />}
              </a>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
