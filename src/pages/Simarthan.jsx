import { Globe, Mail, Building2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import { Section, SectionTitle, Tagline, Heading, H5, H6 } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { useSimarthanData } from '../lib/useSimarthanData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const ICONS = { website: Globe, email: Mail, office: Building2 };

const fallbackPage = {
  heroEyebrow: 'Advancing education. Empowering futures.',
  heroTitle: 'Simarthan.',
  heroDescription:
    "An independent, not-for-profit organisation advancing education, training, and research. As SIMSREE's committed institutional partner, Simarthan makes sure the institute's mission endures, grows, and reaches further.",
  heroPrimaryCtaLabel: 'Visit simarthan.org',
  heroPrimaryCtaUrl: 'https://simarthan.org',
  heroSecondaryCtaLabel: 'Email Simarthan',
  heroSecondaryCtaUrl: 'mailto:simarthan@simsree.org',

  whyEyebrow: 'Purpose Before Profit',
  whyTitle: 'Why Simarthan exists',
  whyBody: [
    'Founded by SIMSREE alumni and well-wishers who recognised the need for a dedicated body to champion the institute beyond government and university structures.',
    'The name reflects that purpose. Simarthan combines SIMSREE with arthan (Sanskrit for purpose). Simarthan operates independently with a single focus: strengthening SIMSREE and its students.',
  ],
  whyEquation: {
    first: 'SIMSREE The institute',
    second: 'अर्थन् arthan Sanskrit · purpose',
    result: 'Simarthan SIMSREE with purpose',
  },

  doesEyebrow: 'Purpose Before Profit',
  doesTitle: 'What Simarthan does',
  doesSubtitle: "Aligned to SIMSREE's mission.",

  contactEyebrow: 'Get In Touch',
  contactTitle: 'Partner with Simarthan',
  contactTitleHighlight: 'Simarthan',
  contactSubtitle: 'For partnerships, sponsorship, research co-funding.',
  contactCards: [
    { icon: 'website', title: 'Website', value: 'simarthan.org', url: 'https://simarthan.org' },
    { icon: 'email', title: 'Email', value: 'simarthan@simsree.org', url: 'mailto:simarthan@simsree.org' },
    { icon: 'office', title: 'Office', value: 'Churchgate, Mumbai' },
  ],
};

const fallbackActivities = [
  { title: 'Advance education', description: 'Improving the quality and reach of management education at SIMSREE.', order: 1 },
  { title: 'Fund scholarships', description: 'Student awards, research, academic prizes through alumni contributions.', order: 2 },
  { title: 'Industry links', description: 'Internships, live projects, placement infrastructure.', order: 3 },
  { title: 'Infrastructure', description: 'Technology, facilities, learning resource upgrades.', order: 4 },
  { title: 'Alumni ties', description: 'Bridging current students with the wider alumni network.', order: 5 },
  { title: 'Events', description: 'Seminars, MDPs, conferences alongside academic calendar.', order: 6 },
];

// One term of the name equation — Figma: 64px hairline box, 3px Eastern Blue bar,
// 32 inset, H6 22 navy.
function EqBox({ children, className = '' }) {
  return (
    <div className={`rounded overflow-hidden rounded overflow-hidden flex items-center min-h-16 outline outline-1 -outline-offset-1 outline-black/20 shadow-small ${className}`}>
      <span className="w-[3px] self-stretch shrink-0 bg-teal-500" aria-hidden="true" />
      <span className="px-8 py-4 font-display font-medium text-[22px] leading-[140%] tracking-[-0.01em] text-navy-900">
        {children}
      </span>
    </div>
  );
}

const EqSign = ({ children }) => (
  <span className="font-display font-medium text-[52px] leading-[120%] text-navy-900 text-center shrink-0" aria-hidden="true">
    {children}
  </span>
);

export default function Simarthan() {
  const facts = useKeyFacts();
  const { data } = useSimarthanData();
  const sp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const activities = fillFactsDeep(data?.activities?.length ? data.activities : fallbackActivities, facts);
  const body = fillFactsDeep(sp.whyBody?.length ? sp.whyBody : fallbackPage.whyBody, facts);
  const eq = sp.whyEquation || fallbackPage.whyEquation;
  const contactCards = fillFactsDeep(sp.contactCards?.length ? sp.contactCards : fallbackPage.contactCards, facts);

  const whyImageUrl = sp.whyImage ? urlFor(sp.whyImage).width(1400).auto('format').url() : '/images/simarthan/campus.webp';

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(sp.heroImage, '/images/simarthan/hero.webp')}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About Us', to: '/about' }, { label: 'Simarthan' }]}
        eyebrow={sp.heroEyebrow}
        title={sp.heroTitle}
        description={sp.heroDescription}
        descriptionWidth={628}
        actions={[
          { label: sp.heroPrimaryCtaLabel, href: sp.heroPrimaryCtaUrl, primary: true },
          { label: sp.heroSecondaryCtaLabel, href: sp.heroSecondaryCtaUrl },
        ]}
      />

      {/* Why Simarthan exists — 1312 column (32 gaps): tagline, title + body, second
          paragraph, the name equation, then a 1312x449 photo 80 below. */}
      <Section>
        <div className="flex flex-col gap-8">
          <Tagline>{sp.whyEyebrow}</Tagline>
          <div className="flex flex-col gap-6">
            <Heading text={sp.whyTitle} />
            {body[0] && <p className="text-base md:text-lg leading-[150%] text-black">{body[0]}</p>}
          </div>
          {body.slice(1).map((p, i) => (
            <p key={i} className="text-base md:text-lg leading-[150%] text-black">
              {p}
            </p>
          ))}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <EqBox>{eq.first}</EqBox>
              <EqSign>+</EqSign>
              <EqBox>{eq.second}</EqBox>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4 lg:flex-1">
              <EqSign>=</EqSign>
              <EqBox className="lg:flex-1">{eq.result}</EqBox>
            </div>
          </div>
        </div>
        <div
          className="mt-20 h-[240px] md:h-[449px] rounded-2xl bg-navy-50 bg-cover bg-center"
          style={{ backgroundImage: `url('${whyImageUrl}')` }}
        />
      </Section>

      {/* What Simarthan does — navy; 405x255 white cards (radius 16, padding 24):
          48px numbered circle, H5 28, #eaeaf1 rule, 16/150 copy; 48 gaps. */}
      <Section bg="bg-navy-900">
        <SectionTitle dark tagline={sp.doesEyebrow} title={sp.doesTitle} body={sp.doesSubtitle} width={1312} />
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {activities.map((a, i) => (
            <div key={a._id || a.title} className="flex flex-col gap-10 p-6 rounded-2xl bg-white">
              <div className="flex flex-col gap-4">
                <span className="w-12 h-12 rounded-full bg-white outline outline-1 -outline-offset-1 outline-navy-900 flex items-center justify-center text-lg leading-[150%] text-navy-900">
                  {String(a.order ?? i + 1).padStart(2, '0')}
                </span>
                <H5>{a.title}</H5>
                <span className="block h-px bg-navy-50" aria-hidden="true" />
              </div>
              <p className="text-base leading-[150%] text-black">{a.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Partner — centred title (678 body), three 405x188 navy cards with a 3px
          Eastern Blue bar and 48px icon. */}
      <Section width={1280}>
        <SectionTitle
          center
          tagline={sp.contactEyebrow}
          title={composeTitle(sp.contactTitle, sp.contactTitleHighlight)}
          highlight={sp.contactTitleHighlight}
        />
        <p className="mt-5 md:mt-6 max-w-[678px] mx-auto text-center text-base md:text-lg leading-[150%] text-black">
          {sp.contactSubtitle}
        </p>
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {contactCards.map((c) => {
            const Icon = ICONS[c.icon] || Globe;
            const inner = (
              <>
                <span className="w-[3px] self-stretch shrink-0 bg-teal-500" aria-hidden="true" />
                <span className="flex flex-col gap-4 py-8 px-8">
                  <Icon size={48} strokeWidth={1.25} className="text-white" />
                  <span className="flex flex-col gap-2">
                    <H6 as="span" className="text-white">
                      {c.title}
                    </H6>
                    <span className="text-sm leading-[150%] text-navy-50">{c.value}</span>
                  </span>
                </span>
              </>
            );
            const cls =
              'rounded-lg overflow-hidden flex min-h-[188px] bg-navy-900 text-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small';
            return c.url ? (
              <a key={c.title} href={c.url} className={`${cls} hover:bg-navy-800 transition-colors`}>
                {inner}
              </a>
            ) : (
              <div key={c.title} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
