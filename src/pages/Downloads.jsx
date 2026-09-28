import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import PageHero, { HeroButton } from '../components/PageHero';
import { Section, SectionTitle, Tagline, Heading, H5, AccentCard } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { useDownloadsData } from '../lib/useDownloadsData';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const CATEGORIES = ['Affidavits', 'Documents', 'Fee', 'Notifications'];

const fallbackPage = {
  heroEyebrow: 'All Forms in One Place',
  heroTitle: 'Downloads & Affidavits.',
  heroDescription:
    'Get every mandatory PDF admitted students need — anti-ragging affidavit, gap certificate, documents required, fee structure · all current year.',
  heroCtaLabel: 'Back to admissions',
  heroCtaUrl: '/admissions',

  filterEyebrow: 'Filter',
  filterTitle: 'Filter by category',
  filterTitleHighlight: 'category',
  filterSubtitle: 'Tap any chip to filter.',
  filterLabel: 'Filter by:',

  filesEyebrow: 'All Files',
  filesTitle: 'Download the current-year PDFs',
  filesTitleHighlight: 'Download the current-year',
  filesSubtitle: 'Government of Maharashtra signs off most of these · updated annually.',

  ctaEyebrow: 'Need More Help?',
  ctaTitle: 'Talk to admissions.',
  ctaSubtitle: 'All forms in one place. Still stuck? Call us.',
  ctaButtons: [
    { label: 'Call admissions · {{admissionsPhone}}', url: 'tel:+912261510709', primary: true },
    { label: 'Email admissions', url: 'mailto:admissions@simsree.org', primary: false },
  ],
};

const fallbackFiles = [
  {
    title: 'Anti-Ragging Affidavit',
    description:
      'Every admitted student signs this UGC-mandated affidavit — zero tolerance, submit at induction.',
    category: 'Affidavits',
    ctaLabel: 'Download the affidavit',
    order: 1,
  },
  {
    title: 'Gap Certificate Affidavit',
    description: 'For any educational gap year between your qualifying degrees.',
    category: 'Affidavits',
    order: 2,
  },
  {
    title: 'Documents Required · MMS',
    description:
      'The complete MMS document list — academic, personal, and reservation · updated annually',
    category: 'Documents',
    order: 3,
  },
  {
    title: 'Documents Required · M.Sc. Finance',
    description: 'The complete M.Sc. Finance document list.',
    category: 'Documents',
    order: 4,
  },
  {
    title: 'Fee Payment Details',
    description:
      'How to pay — beneficiary account · IFSC · UPI · receipt format · updated each admission cycle.',
    category: 'Fee',
    order: 5,
  },
  {
    title: 'MMM & MFM Notification AY 2026-27 · Round 4',
    description:
      'Apply before it closes — latest notification · published May 2026 · closes 30 Jun 2026.',
    category: 'Notifications',
    order: 6,
  },
];

export default function Downloads() {
  const facts = useKeyFacts();
  const { data } = useDownloadsData();
  const dp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const files = fillFactsDeep(data?.files?.length ? data.files : fallbackFiles, facts);
  const ctaButtons = fillFactsDeep(dp.ctaButtons?.length ? dp.ctaButtons : fallbackPage.ctaButtons, facts);

  const [category, setCategory] = useState('All');

  // Only offer chips for categories that actually have files behind them.
  const chips = useMemo(() => {
    const present = new Set(files.map((f) => f.category).filter(Boolean));
    return ['All', ...CATEGORIES.filter((c) => present.has(c))];
  }, [files]);

  const visible = useMemo(
    () => (category === 'All' ? files : files.filter((f) => f.category === category)),
    [files, category]
  );

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(dp.heroImage, '/images/admissions/downloads-hero.webp', { stretch: true })}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Admissions', to: '/admissions' }, { label: 'Downloads' }]}
        eyebrow={dp.heroEyebrow}
        eyebrowStyle="pill"
        title={dp.heroTitle}
        description={dp.heroDescription}
        descriptionWidth={628}
        actions={[{ label: dp.heroCtaLabel, to: dp.heroCtaUrl }]}
      />

      {/* Filter + files — one "Blog / 36 /" section: filter title, 45px chips,
          files title, then 405x298 bar cards with a navy download button. */}
      <Section width={1280}>
        <SectionTitle
          tagline={dp.filterEyebrow}
          title={composeTitle(dp.filterTitle, dp.filterTitleHighlight)}
          highlight={dp.filterTitleHighlight}
          body={dp.filterSubtitle}
        />
        <div className="mt-20 flex flex-wrap items-center gap-4 md:gap-8">
          <span className="text-base leading-[150%] font-semibold text-[#292929]">{dp.filterLabel}</span>
          <div className="flex flex-wrap gap-3">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={c === category}
                className={`rounded h-[45px] px-3 text-sm leading-[150%] outline outline-1 -outline-offset-1 outline-black/20 transition-colors ${
                  c === category ? 'bg-navy-900 text-hero' : 'bg-white text-black hover:bg-navy-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <SectionTitle
          className="mt-20"
          tagline={dp.filesEyebrow}
          title={composeTitle(dp.filesTitle, dp.filesTitleHighlight)}
          highlight={dp.filesTitleHighlight}
          body={dp.filesSubtitle}
        />
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((f) => {
            const href = f.fileUrl || f.externalUrl;
            return (
              <AccentCard key={f._id || f.title} className="min-h-[298px] [&>div]:flex [&>div]:flex-col">
                <div className="flex-1 flex flex-col justify-between gap-6">
                  <div className="flex flex-col gap-4">
                    <H5 as="h3">{f.title}</H5>
                    <p className="text-base leading-[150%] text-black">{f.description}</p>
                  </div>
                  <a
                    href={href || '#'}
                    {...(f.fileUrl ? { download: '' } : {})}
                    className="inline-flex items-center gap-3 w-fit h-11 px-6 rounded-md bg-navy-900 text-white text-base leading-[150%] font-medium hover:bg-navy-800 transition-colors"
                  >
                    {f.ctaLabel || 'Download'} <Download size={24} strokeWidth={1.5} />
                  </a>
                </div>
              </AccentCard>
            );
          })}
        </div>
      </Section>

      {/* Help CTA — navy, left column, Eastern Blue tagline. */}
      <Section bg="bg-navy-900" width={1280} className="text-white border-t border-white/20">
        <Tagline className="text-teal-400">{dp.ctaEyebrow}</Tagline>
        <Heading text={dp.ctaTitle} className="text-white mt-4" />
        <p className="mt-6 max-w-[504px] text-base md:text-lg leading-[150%]">{dp.ctaSubtitle}</p>
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          {ctaButtons.map((b) => (
            <HeroButton key={b.label} label={b.label} href={b.url} primary={b.primary} icon={false} />
          ))}
        </div>
      </Section>
    </div>
  );
}
