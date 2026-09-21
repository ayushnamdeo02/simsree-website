import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe, Mail, Building2 } from 'lucide-react';
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

function TitleWithHighlight({ text, highlight, className }) {
  const idx = highlight ? (text || '').indexOf(highlight) : -1;
  if (idx === -1) return <h2 className={className}>{text}</h2>;
  return (
    <h2 className={className}>
      {text.slice(0, idx)}
      <span className="text-teal-500">{highlight}</span>
      {text.slice(idx + highlight.length)}
    </h2>
  );
}

export default function Simarthan() {
  const facts = useKeyFacts();
  const { data } = useSimarthanData();
  const sp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const activities = fillFactsDeep(data?.activities?.length ? data.activities : fallbackActivities, facts);
  const body = fillFactsDeep(sp.whyBody?.length ? sp.whyBody : fallbackPage.whyBody, facts);
  const eq = sp.whyEquation || fallbackPage.whyEquation;
  const contactCards = fillFactsDeep(sp.contactCards?.length ? sp.contactCards : fallbackPage.contactCards, facts);

  const heroImageUrl = sp.heroImage ? urlFor(sp.heroImage).width(1600).url() : null;
  const whyImageUrl = sp.whyImage ? urlFor(sp.whyImage).width(1400).url() : null;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="min-h-[560px] md:h-[660px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: heroImageUrl
            ? `url('${heroImageUrl}')`
            : 'linear-gradient(180deg, #8a8f9e, #cfd3da)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-navy-950/10" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[55px] pt-32 pb-12 md:pb-[72px] md:h-full flex flex-col justify-end text-white">
          <div className="text-xs text-white/70 mb-6 flex items-center">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/about" className="hover:text-white">About Us</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white">Simarthan</span>
          </div>
          <p className="text-sm text-white/85 mb-4">{sp.heroEyebrow}</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-5">{sp.heroTitle}</h1>
          <p className="max-w-xl text-sm text-white/85 leading-relaxed mb-8">{sp.heroDescription}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={sp.heroPrimaryCtaUrl}
              className="bg-sky-600 hover:bg-teal-600 transition-colors text-white font-medium px-5 py-3 rounded-md flex items-center gap-2 w-fit"
            >
              {sp.heroPrimaryCtaLabel} <ArrowUpRight size={16} />
            </a>
            <a
              href={sp.heroSecondaryCtaUrl}
              className="bg-white hover:bg-gray-100 transition-colors text-navy-900 font-medium px-5 py-3 rounded-md w-fit"
            >
              {sp.heroSecondaryCtaLabel}
            </a>
          </div>
        </div>
      </section>

      {/* Why Simarthan exists */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {sp.whyEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-8">
            {sp.whyTitle}
          </h2>
          <div className="space-y-5 mb-10">
            {body.map((p, i) => (
              <p key={i} className="text-sm text-ink-600 leading-relaxed max-w-[1100px]">{p}</p>
            ))}
          </div>

          {/* Name equation */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-14">
            <div className="flex-1 border border-navy-100 border-l-2 border-l-teal-500 rounded-md px-5 py-4 text-sm text-navy-900">
              {eq.first}
            </div>
            <span className="text-navy-600 text-lg text-center shrink-0">+</span>
            <div className="flex-1 border border-navy-100 border-l-2 border-l-teal-500 rounded-md px-5 py-4 text-sm text-navy-900">
              {eq.second}
            </div>
            <span className="text-navy-600 text-lg text-center shrink-0">=</span>
            <div className="flex-[1.4] border border-navy-100 border-l-2 border-l-teal-500 rounded-md px-5 py-4 text-sm text-navy-900">
              {eq.result}
            </div>
          </div>

          {/* Section image */}
          <div
            className="h-[280px] md:h-[420px] rounded-xl bg-gray-200 bg-cover bg-center"
            style={whyImageUrl ? { backgroundImage: `url('${whyImageUrl}')` } : undefined}
          />
        </div>
      </section>

      {/* What Simarthan does */}
      <section className="bg-navy-900 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-white">
            {sp.doesEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-6 mb-4">{sp.doesTitle}</h2>
          <p className="text-sm text-white/75 mb-12">{sp.doesSubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {activities.map((a, i) => (
              <div key={a._id || a.title} className="bg-white rounded-xl p-6 flex flex-col">
                <span className="w-9 h-9 rounded-full border border-navy-100 flex items-center justify-center text-xs font-semibold text-navy-600 mb-5">
                  {String(a.order ?? i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl font-semibold text-navy-900 mb-4">{a.title}</h3>
                <span className="block h-px bg-navy-100 mb-4" />
                <p className="text-sm text-ink-600 leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get in touch */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {sp.contactEyebrow}
            </span>
            <TitleWithHighlight
              text={sp.contactTitle}
              highlight={sp.contactTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6 mb-4"
            />
            <p className="text-sm text-ink-600">{sp.contactSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {contactCards.map((c) => {
              const Icon = ICONS[c.icon] || Globe;
              const inner = (
                <>
                  <Icon size={22} className="text-white mb-8" />
                  <h3 className="font-display text-xl font-semibold text-white mb-2">{c.title}</h3>
                  <p className="text-sm text-white/75">{c.value}</p>
                </>
              );
              const cls =
                'bg-navy-900 border-l-2 border-l-sky-500 rounded-sm p-6 h-[150px] flex flex-col justify-center';
              return c.url ? (
                <a key={c.title} href={c.url} className={`${cls} hover:bg-navy-800 transition-colors`}>
                  {inner}
                </a>
              ) : (
                <div key={c.title} className={cls}>{inner}</div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
