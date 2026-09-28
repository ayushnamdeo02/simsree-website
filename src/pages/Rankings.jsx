import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { StatGrid } from '../components/StatCard';
import PageHero from '../components/PageHero';
import { Section, SectionTitle, H5, H6, Tag, AccentCard } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { useRankingsPageData } from '../lib/useRankingsPageData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

// Figma: every framework card uses the Colour/Eastern Blue/Base bar, weight 3.
const ACCENT_BG = {
  navy: 'bg-teal-500',
  sky: 'bg-teal-500',
  teal: 'bg-teal-500',
};

// Figma photos for the two honour cards, until images are set in the Studio.
const HONOUR_FALLBACK = ['/images/rankings/honour-fpsb.webp', '/images/rankings/honour-hbsu.webp'];

const fallbackRankingsPage = {
  heroEyebrow: 'Independently Verified',
  heroTitle: 'Ranked, accredited, and verifiable — proof you can show a recruiter.',
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

  honoursEyebrow: 'Awards & Recognition',
  honoursTitle: 'Recent honours',
  honoursTitleHighlight: 'honours',
  honoursSubtitle: 'Independent recognition from industry bodies and government.',

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
    description: 'Listed under the National Institutional Ranking Framework — Government of India. Annual public ranking based on teaching, learning, graduation outcomes, outreach, and perception.',
    actionLabel: 'Download NIRF Report',
    isDownload: true,
  },
  {
    tag: '#25',
    accentColor: 'sky',
    title: 'IIRF National Rank #25',
    description: "Indian Institutional Ranking Framework — among India's top-25 management institutes based on placement, academic excellence, faculty quality, and research output.",
    actionLabel: 'View framework',
  },
  {
    tag: 'UoM',
    accentColor: 'teal',
    title: 'Mumbai University Affiliated',
    description: "Affiliated with the University of Mumbai — one of India's oldest and most respected universities. Degrees conferred under UoM authority.",
    actionLabel: 'University details',
  },
];

const fallbackHonours = [
  {
    date: 'Nov 2025',
    title: 'Best Authorised Institutional Partner 2025',
    description: 'Awarded by the Financial Planning Standards Board India — ceremony held in Hyderabad — recognising SIMSREE\'s role as FPSB\'s institutional partner in financial planning education.',
    linkLabel: 'View citation',
  },
  {
    date: '2024',
    title: 'Dr Homi Bhabha State University Integration',
    description: "Cabinet-approved integration into Dr Homi Bhabha State University — advancing SIMSREE's institutional framework while preserving its identity.",
    linkLabel: 'View notification',
  },
];

const fallbackAccreditations = [
  { icon: 'FileCheck', title: 'AICTE Approved', description: 'All India Council for Technical Education · Government of India. Mandatory technical education approval.' },
  { icon: 'GraduationCap', title: 'University of Mumbai', description: "Affiliated and accredited under Mumbai University's quality framework." },
  { icon: 'ShieldCheck', title: 'Proactive Disclosure', description: 'Compliant with Government of Maharashtra Proactive Disclosure directive.' },
  { icon: 'ExternalLink', title: 'Direct Verify', description: 'Real-time degree verification at simsree.directverify.in for recruiters and graduate schools.' },
];

const fallbackVerificationDocs = [
  { tag: 'NIRF', title: 'NIRF data sheet 2025', detail: 'Ministry of Education · 2.4 MB', actionLabel: 'Download NIRF data sheet' },
  { tag: 'AICTE', title: 'AICTE Approval Certificate', detail: '2025-26 · 1.1 MB', actionLabel: 'Download AICTE certificate' },
  { tag: 'Verify', title: 'Verify a degree', detail: 'Real-time portal · Direct Verify', actionLabel: 'Open portal', isExternal: true },
];

function imgUrl(image, width) {
  if (!image) return undefined;
  try {
    return urlFor(image).width(width).auto('format').url();
  } catch {
    return undefined;
  }
}

// Figma: exported 48x48 vectors for the accreditation cards.
function AccIcon({ d, size = 48, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d={d} fill="currentColor" />
    </svg>
  );
}

// Maps each accreditation's `icon` field to its exported Figma vector.
const ACC_ICON = {
  GraduationCap: 'school',
  FileCheck: 'order',
  ShieldCheck: 'disc',
  ExternalLink: 'arrow',
};

const ACC_PATHS = {
  school: 'M11.0948 35.0922C10.5564 34.7935 10.1276 34.3769 9.80828 33.8422C9.48928 33.3079 9.32978 32.7175 9.32978 32.0712V22.1222L4.52078 19.4922C4.21678 19.3052 3.98961 19.0879 3.83928 18.8402C3.68861 18.5922 3.61328 18.3169 3.61328 18.0142C3.61328 17.7112 3.68911 17.4325 3.84078 17.1782C3.99245 16.9242 4.21911 16.7052 4.52078 16.5212L22.3078 6.76469C22.5651 6.61535 22.8323 6.51185 23.1093 6.45419C23.3863 6.39619 23.6666 6.36719 23.9503 6.36719C24.2343 6.36719 24.5144 6.39802 24.7908 6.45969C25.0668 6.52169 25.3374 6.62335 25.6028 6.76469L45.3548 17.4907C45.6511 17.6744 45.8764 17.8997 46.0308 18.1667C46.1851 18.4337 46.2623 18.7182 46.2623 19.0202V32.3507C46.2623 32.813 46.1046 33.2005 45.7893 33.5132C45.4736 33.8259 45.0826 33.9822 44.6163 33.9822C44.1526 33.9822 43.7653 33.8259 43.4543 33.5132C43.1429 33.2005 42.9873 32.813 42.9873 32.3507V19.9062L38.5808 22.1187V32.0712C38.5808 32.7175 38.4191 33.3079 38.0958 33.8422C37.7728 34.3769 37.3421 34.7935 36.8038 35.0922L25.5908 41.2127C25.3334 41.37 25.0666 41.4757 24.7903 41.5297C24.5139 41.5837 24.2334 41.6107 23.9488 41.6107C23.6644 41.6107 23.3841 41.5837 23.1078 41.5297C22.8318 41.4757 22.5651 41.37 22.3078 41.2127L11.0948 35.0922ZM23.9493 26.4212L39.3643 18.0007L23.9493 9.73019L8.63428 18.0007L23.9493 26.4212ZM23.9493 38.4092L35.2938 32.1432V24.0777L25.5908 29.2867C25.3334 29.428 25.0701 29.5297 24.8008 29.5917C24.5318 29.6534 24.2479 29.6842 23.9493 29.6842C23.6506 29.6842 23.3751 29.6534 23.1228 29.5917C22.8701 29.5297 22.6151 29.428 22.3578 29.2867L12.6048 23.9777V32.1432L23.9493 38.4092Z',
  order: 'M35.0927 36.8711L34.3022 36.0691C33.9848 35.7531 33.6062 35.5971 33.1662 35.6011C32.7265 35.6051 32.3487 35.7651 32.0327 36.0811C31.7087 36.4051 31.5467 36.7771 31.5467 37.1971C31.5467 37.6168 31.7095 37.9894 32.0352 38.3151L34.1852 40.4646C34.4398 40.7219 34.7437 40.8506 35.0967 40.8506C35.4497 40.8506 35.7548 40.7219 36.0122 40.4646L41.0512 35.5136C41.3758 35.1896 41.5382 34.8093 41.5382 34.3726C41.5382 33.9356 41.3762 33.5551 41.0522 33.2311C40.7365 32.9151 40.3583 32.7571 39.9177 32.7571C39.477 32.7571 39.0987 32.9151 38.7827 33.2311L35.0927 36.8711ZM13.6107 17.1311H34.3897C34.8167 17.1311 35.1738 16.9866 35.4612 16.6976C35.7488 16.4083 35.8927 16.0499 35.8927 15.6226C35.8927 15.1949 35.7488 14.8394 35.4612 14.5561C35.1738 14.2728 34.8167 14.1311 34.3897 14.1311H13.6107C13.1837 14.1311 12.8265 14.2758 12.5392 14.5651C12.2515 14.8541 12.1077 15.2124 12.1077 15.6401C12.1077 16.0674 12.2515 16.4228 12.5392 16.7061C12.8265 16.9894 13.1837 17.1311 13.6107 17.1311ZM36.5177 46.1411C33.9343 46.1411 31.726 45.2181 29.8927 43.3721C28.0593 41.5261 27.1427 39.3324 27.1427 36.7911C27.1427 34.1844 28.0592 31.9578 29.8922 30.1111C31.7252 28.2644 33.942 27.3411 36.5427 27.3411C39.1093 27.3411 41.3177 28.2644 43.1677 30.1111C45.0177 31.9578 45.9427 34.1844 45.9427 36.7911C45.9427 39.3324 45.0177 41.5261 43.1677 43.3721C41.3177 45.2181 39.101 46.1411 36.5177 46.1411ZM5.70117 9.13111C5.70117 8.19444 6.03467 7.39244 6.70167 6.72511C7.36901 6.05811 8.17101 5.72461 9.10767 5.72461H38.8927C39.8327 5.72461 40.6373 6.05811 41.3067 6.72511C41.9763 7.39244 42.3112 8.19444 42.3112 9.13111V23.5071C42.3112 23.9964 42.1443 24.3943 41.8107 24.7006C41.4767 25.0073 41.0685 25.1606 40.5862 25.1606C40.1035 25.1606 39.7005 24.9969 39.3772 24.6696C39.0542 24.3423 38.8927 23.9381 38.8927 23.4571V9.13111H9.10767V38.8541H24.3567C24.4073 39.2911 24.48 39.7054 24.5747 40.0971C24.6693 40.4888 24.8072 40.8911 24.9882 41.3041C25.2962 42.1418 25.1175 42.7801 24.4522 43.2191C23.7865 43.6584 23.183 43.6114 22.6417 43.0781L21.5742 42.0136C21.3998 41.8309 21.1927 41.7396 20.9527 41.7396C20.7127 41.7396 20.5053 41.8309 20.3307 42.0136L18.5142 43.8181C18.3422 44.0008 18.1377 44.0921 17.9007 44.0921C17.6633 44.0921 17.4533 44.0008 17.2707 43.8181L15.4667 42.0136C15.2923 41.8309 15.0852 41.7396 14.8452 41.7396C14.6052 41.7396 14.3978 41.8309 14.2232 42.0136L12.3947 43.8181C12.2227 44.0008 12.0182 44.0921 11.7812 44.0921C11.5438 44.0921 11.3338 44.0008 11.1512 43.8181L9.35867 42.0136C9.18034 41.8309 8.97217 41.7396 8.73417 41.7396C8.49617 41.7396 8.28601 41.8309 8.10367 42.0136L5.70117 44.4396V9.13111ZM13.6112 33.9161H23.6347C24.062 33.9161 24.4195 33.7714 24.7072 33.4821C24.9945 33.1931 25.1382 32.8348 25.1382 32.4071C25.1382 31.9798 24.9945 31.6244 24.7072 31.3411C24.4195 31.0578 24.062 30.9161 23.6347 30.9161H13.6112C13.1838 30.9161 12.8265 31.0606 12.5392 31.3496C12.2515 31.6389 12.1077 31.9973 12.1077 32.4246C12.1077 32.8523 12.2515 33.2078 12.5392 33.4911C12.8265 33.7744 13.1838 33.9161 13.6112 33.9161ZM13.6117 25.5236H28.2502C28.6782 25.5236 29.0358 25.3789 29.3232 25.0896C29.6108 24.8006 29.7547 24.4423 29.7547 24.0146C29.7547 23.5873 29.6108 23.2319 29.3232 22.9486C29.0358 22.6653 28.6782 22.5236 28.2502 22.5236H13.6117C13.184 22.5236 12.8265 22.6681 12.5392 22.9571C12.2515 23.2464 12.1077 23.6048 12.1077 24.0321C12.1077 24.4598 12.2515 24.8153 12.5392 25.0986C12.8265 25.3819 13.184 25.5236 13.6117 25.5236Z',
  disc: 'M23.9647 32.5005C26.3277 32.5005 28.3342 31.6735 29.9842 30.0195C31.6342 28.3655 32.4592 26.3571 32.4592 23.9945C32.4592 21.6318 31.6322 19.6255 29.9782 17.9755C28.3242 16.3255 26.3158 15.5005 23.9532 15.5005C21.5905 15.5005 19.5842 16.3275 17.9342 17.9815C16.2842 19.6355 15.4592 21.6438 15.4592 24.0065C15.4592 26.3691 16.286 28.3755 17.9397 30.0255C19.5937 31.6755 21.602 32.5005 23.9647 32.5005ZM23.9592 26.0005C23.4002 26.0005 22.9272 25.8088 22.5402 25.4255C22.1528 25.0421 21.9592 24.5671 21.9592 24.0005C21.9592 23.4338 22.1528 22.9588 22.5402 22.5755C22.9272 22.1921 23.4002 22.0005 23.9592 22.0005C24.5258 22.0005 25.0008 22.1921 25.3842 22.5755C25.7675 22.9588 25.9592 23.4338 25.9592 24.0005C25.9592 24.5671 25.7675 25.0421 25.3842 25.4255C25.0008 25.8088 24.5258 26.0005 23.9592 26.0005ZM23.9472 44.2995C21.1435 44.2995 18.5057 43.7658 16.0337 42.6985C13.5617 41.6311 11.4125 40.1851 9.58616 38.3605C7.75949 36.5358 6.31516 34.3886 5.25316 31.919C4.19116 29.4493 3.66016 26.8105 3.66016 24.0025C3.66016 21.1945 4.19232 18.5555 5.25666 16.0855C6.32066 13.6155 7.76782 11.4645 9.59816 9.63245C11.4282 7.80079 13.5775 6.35245 16.0462 5.28745C18.5148 4.22212 21.1525 3.68945 23.9592 3.68945C27.7345 3.68945 31.1927 4.63978 34.3337 6.54045C37.4743 8.44145 39.9567 10.9966 41.7807 14.206C42.0207 14.6123 42.0743 15.0506 41.9417 15.521C41.809 15.991 41.5307 16.3276 41.1067 16.531C40.6843 16.7296 40.2452 16.7583 39.7892 16.617C39.3335 16.4756 38.9652 16.2016 38.6842 15.795C37.0898 13.18 35.0045 11.0785 32.4282 9.49045C29.8515 7.90212 27.0285 7.10795 23.9592 7.10795C19.2452 7.10795 15.2512 8.74495 11.9772 12.019C8.70349 15.2926 7.06666 19.2865 7.06666 24.0005C7.06666 28.7145 8.70349 32.7083 11.9772 35.982C15.2512 39.256 19.2452 40.893 23.9592 40.893C25.8692 40.893 27.6892 40.5795 29.4192 39.9525C31.1492 39.3258 32.7617 38.4483 34.2567 37.32C34.654 37.0533 35.0888 36.9403 35.5612 36.981C36.0335 37.0216 36.415 37.2178 36.7057 37.5695C36.9963 37.9211 37.1193 38.325 37.0747 38.781C37.03 39.2366 36.8298 39.5978 36.4742 39.8645C34.7062 41.3088 32.752 42.409 30.6117 43.165C28.4713 43.9213 26.2498 44.2995 23.9472 44.2995ZM42.4002 36.6505C41.9355 36.6505 41.5488 36.4941 41.2402 36.1815C40.9318 35.8688 40.7777 35.4813 40.7777 35.019V21.932C40.7777 21.4696 40.9353 21.0821 41.2507 20.7695C41.5663 20.4568 41.9573 20.3005 42.4237 20.3005C42.89 20.3005 43.278 20.4568 43.5877 20.7695C43.8977 21.0821 44.0527 21.4696 44.0527 21.932V35.019C44.0527 35.4813 43.8942 35.8688 43.5772 36.1815C43.2605 36.4941 42.8682 36.6505 42.4002 36.6505ZM42.5587 43.83C42.0403 43.83 41.606 43.6546 41.2557 43.304C40.905 42.9533 40.7297 42.5188 40.7297 42.0005C40.7297 41.4821 40.905 41.0476 41.2557 40.697C41.6063 40.3463 42.0408 40.171 42.5592 40.171C43.0775 40.171 43.512 40.3463 43.8627 40.697C44.213 41.0476 44.3882 41.4821 44.3882 42.0005C44.3882 42.5188 44.2128 42.9533 43.8622 43.304C43.5115 43.6546 43.077 43.83 42.5587 43.83Z',
  arrow: 'M32.5805 15.6024L13.389 34.8059C13.0413 35.1455 12.6415 35.3154 12.1895 35.3154C11.7378 35.3154 11.342 35.1415 11.002 34.7939C10.6543 34.4459 10.4805 34.046 10.4805 33.5944C10.4805 33.1427 10.6543 32.7429 11.002 32.3949L30.1935 13.2039H13.2955C12.8068 13.2039 12.3988 13.0392 12.0715 12.7099C11.7441 12.3809 11.5805 11.9747 11.5805 11.4914C11.5805 11.0084 11.7441 10.6052 12.0715 10.2819C12.3988 9.95854 12.8068 9.79688 13.2955 9.79688H34.2955C34.7765 9.79688 35.1806 9.96071 35.508 10.2884C35.8353 10.6157 35.999 11.0197 35.999 11.5004V32.5004C35.999 32.981 35.8345 33.385 35.5055 33.7124C35.1765 34.04 34.7703 34.2039 34.287 34.2039C33.7956 34.2039 33.3883 34.04 33.065 33.7124C32.742 33.385 32.5805 32.981 32.5805 32.5004V15.6024Z',
};

export default function Rankings() {
  const facts = useKeyFacts();
  const { data } = useRankingsPageData();

  const rp = fillFactsDeep({ ...fallbackRankingsPage, ...(data?.rankingsPage || {}) }, facts);
  const frameworks = fillFactsDeep(data?.frameworks?.length ? data.frameworks : fallbackFrameworks, facts);
  const honours = fillFactsDeep(data?.honours?.length ? data.honours : fallbackHonours, facts);
  const accreditations = fillFactsDeep(data?.accreditations?.length ? data.accreditations : fallbackAccreditations, facts);
  const verificationDocs = fillFactsDeep(data?.verificationDocs?.length ? data.verificationDocs : fallbackVerificationDocs, facts);

  return (
    <div>
      <PageHero
        image={heroImage(rp.heroImage, '/images/rankings/hero.webp')}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About Us', to: '/about' }, { label: 'Rankings' }]}
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

      <section className="px-5 py-16 md:p-16">
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
        <div className="mt-20 grid md:grid-cols-3 gap-8 items-start">
          {frameworks.map((f) => (
            <AccentCard key={f._id || f.title} accent={ACCENT_BG[f.accentColor] || 'bg-teal-500'}>
              <div className="flex flex-col gap-12">
                <Tag className="w-fit bg-navy-900 text-white outline-0">{f.tag}</Tag>
                <div className="flex flex-col gap-4">
                  {/* H5 28 / 16 on desktop, H6 22 / 14 on mobile (Figma). */}
                  <H5 className="text-navy-900 max-md:text-[22px]">{f.title}</H5>
                  <p className="text-sm md:text-base leading-[150%] text-black">{f.description}</p>
                </div>
                {f.actionLabel && (
                  <a
                    href={f.actionUrl || '#'}
                    className="inline-flex items-center gap-3 w-fit h-11 px-6 rounded-md bg-white outline outline-1 -outline-offset-1 outline-black/20 text-sm md:text-base leading-[150%] md:font-medium text-black hover:bg-navy-50 transition-colors"
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

      {/* Recent Honours — #eaeaf1, left-aligned title, two 624x808 cards: 560x490
          photo, 24 gaps, yellow-tint date tag, H5 28 + 18/150 copy, teal link. */}
      <Section bg="bg-navy-50" width={1280}>
        <SectionTitle
          tagline={rp.honoursEyebrow}
          title={composeTitle(rp.honoursTitle, rp.honoursTitleHighlight)}
          highlight={rp.honoursTitleHighlight}
        />
        <p className="mt-5 md:mt-6 max-w-[678px] text-base md:text-lg leading-[150%] text-black">{rp.honoursSubtitle}</p>
        <div className="mt-20 grid md:grid-cols-2 gap-8">
          {honours.map((h, i) => {
            const img = imgUrl(h.image, 1120) || HONOUR_FALLBACK[i];
            return (
              <div
                key={h._id || h.title}
                // On mobile the card box drops away and the photo runs full width (Figma).
                className="flex flex-col gap-6 md:p-8 md:rounded-2xl md:outline md:outline-1 md:-outline-offset-1 md:outline-black/20 md:shadow-small"
              >
                <div
                  className="h-[490px] rounded-2xl bg-navy-100 bg-cover bg-center shrink-0"
                  style={img ? { backgroundImage: `url('${img}')` } : undefined}
                />
                <Tag className="w-fit bg-[#fffbec] text-navy-900 text-xs outline-0">{h.date}</Tag>
                <div className="flex flex-col gap-3">
                  <H5>{h.title}</H5>
                  <p className="text-base md:text-lg leading-[150%] text-black">{h.description}</p>
                </div>
                {h.linkLabel && (
                  <a
                    href={h.linkUrl || '#'}
                    className="flex items-center gap-2 w-fit text-base leading-[150%] text-teal-500 hover:underline underline-offset-2"
                  >
                    {h.linkLabel} <ArrowUpRight size={24} strokeWidth={1.5} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* Accreditations — four 296x251 navy cards, 3px Eastern Blue bar, 48px icon. */}
      <Section id="accreditations" width={1280}>
        <SectionTitle
          center
          tagline={rp.accreditationsEyebrow}
          title={composeTitle(rp.accreditationsTitle, rp.accreditationsTitleHighlight)}
          highlight={rp.accreditationsTitleHighlight}
        />
        <p className="mt-5 md:mt-6 max-w-[678px] mx-auto text-center text-base md:text-lg leading-[150%] text-black">
          {rp.accreditationsSubtitle}
        </p>
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {accreditations.map((a) => (
            <a
              key={a._id || a.title}
              href={a.linkUrl || '#'}
              className="rounded-xl overflow-hidden rounded-xl overflow-hidden flex min-h-[251px] bg-navy-900 text-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small hover:bg-navy-800 transition-colors"
            >
              <span className="w-[3px] shrink-0 bg-teal-500" aria-hidden="true" />
              <span className="flex flex-col gap-4 py-8 pl-8 pr-8">
                <AccIcon d={ACC_PATHS[ACC_ICON[a.icon] || 'order']} size={48} className="text-white shrink-0" />
                <span className="flex flex-col gap-2">
                  <H6 as="span" className="text-white">
                    {a.title}
                  </H6>
                  <span className="text-sm leading-[150%] text-navy-50">{a.description}</span>
                </span>
              </span>
            </a>
          ))}
        </div>
      </Section>

      {/* Verification & Documents — #24295c, centred title, three 405x201 navy cards. */}
      <Section bg="bg-navy-800" width={1280} className="border-t border-white/20">
        <SectionTitle center dark tagline={rp.verifyEyebrow} title={rp.verifyTitle} body={rp.verifySubtitle} />
        <div className="mt-20 grid md:grid-cols-3 gap-8">
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
