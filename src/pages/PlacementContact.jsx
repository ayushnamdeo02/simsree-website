import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { usePlacementContactData } from '../lib/usePlacementContactData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const telHref = (phone) => `tel:${(phone || '').replace(/[^\d+]/g, '')}`;

const fallbackPage = {
  heroEyebrow: 'Direct Line to the Cell',
  heroTitle: 'Reach the Placement Office.',
  heroTitleItalic: 'Placement Office.',
  heroDescription:
    'Two ways to reach us — call or WhatsApp the Placement Committee, or email the Placement Officer.',
  heroPrimaryCtaLabel: 'Call Paras Surve',
  heroPrimaryCtaUrl: 'tel:+918830532100',
  heroSecondaryCtaLabel: 'Email the placement cell',
  heroSecondaryCtaUrl: 'mailto:placements@simsree.org',

  contactsEyebrow: 'Placement Committee · Student Contacts',
  contactsTitle: 'Call · WhatsApp · Email',
  contactsTitleHighlight: 'WhatsApp',
  contactsSubtitle: 'Every number below is current',

  channelsEyebrow: 'What to Send When',
  channelsTitle: 'Email vs. WhatsApp',
  channelsTitleHighlight: 'vs.',
  channelsSubtitle: 'Match the right channel to the right need.',
  channelCards: [
    {
      title: 'Email Placement Officer',
      description:
        'Email for: JDs · institutional MoUs · joint engagement · brand collaborations · invoicing.',
    },
    {
      title: 'WhatsApp student committee',
      description:
        'WhatsApp for: scheduling · day-of logistics · quick PPT swaps · access · last-minute changes.',
    },
  ],

  teamEyebrow: 'Meet the Team',
  teamTitle: 'Placement Committee · 2025-26.',
  teamTitleHighlight: '2025-26.',
  teamSubtitle:
    'Student-led · faculty-mentored · always reachable. Reach out for partner enquiries, JD distribution, or campus visits.',
};

const fallbackContacts = [
  { name: 'Paras Surve', role: 'Placement Committee', phone: '+91 8830 532 100', order: 1 },
  { name: 'Sahil Sawant', role: 'Placement Committee', phone: '+91 8097 251 728', order: 2 },
  { name: 'Piyush Bhutada', role: 'Placement Committee', phone: '+91 9422 559 702', order: 3 },
  { name: 'Pranay Kapshikar', role: 'Placement Committee', phone: '+91 9821 940 015', order: 4 },
  {
    name: 'Placement Officer',
    email: '{{placementEmail}}',
    note: 'institutional queries',
    order: 5,
  },
];

const fallbackMembers = [
  {
    name: 'Aarav Mehta',
    role: 'Placement Chairperson',
    email: 'placement.chair@simsree.org',
    phone: '+91 98765 43210',
    order: 1,
  },
  {
    name: 'Priya Iyer',
    role: 'Final Placements Lead',
    email: 'final.placement@simsree.org',
    phone: '+91 98765 43210',
    order: 2,
  },
  {
    name: 'Rohit Sharma',
    role: 'Summer Internships Lead',
    email: 'summer.internship@simsree.org',
    phone: '+91 98765 43210',
    order: 3,
  },
  {
    name: 'Sneha Reddy',
    role: 'Recruiter Relations',
    email: 'partners@simsree.org',
    phone: '+91 98765 43210',
    order: 4,
  },
  {
    name: 'Dr Anand Kulkarni',
    role: 'Faculty Advisor · Placements',
    email: 'placement.faculty@simsree.org',
    order: 5,
  },
  {
    name: 'Prof. Meera Joshi',
    role: 'Faculty · Corporate Relations',
    email: 'corp.relations@simsree.org',
    order: 6,
  },
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

export default function PlacementContact() {
  const facts = useKeyFacts();
  const { data } = usePlacementContactData();
  const cp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const contacts = fillFactsDeep(data?.contacts?.length ? data.contacts : fallbackContacts, facts);
  const members = fillFactsDeep(data?.members?.length ? data.members : fallbackMembers, facts);
  const channelCards = fillFactsDeep(cp.channelCards?.length ? cp.channelCards : fallbackPage.channelCards, facts);

  const heroImageUrl = cp.heroImage ? urlFor(cp.heroImage).width(1600).url() : null;

  const italic = cp.heroTitleItalic;
  const iIdx = italic ? (cp.heroTitle || '').indexOf(italic) : -1;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="min-h-[480px] md:h-[560px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: heroImageUrl
            ? `url('${heroImageUrl}')`
            : 'linear-gradient(180deg, #8a8f9e, #cfd3da)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-navy-950/10" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[55px] pt-32 pb-12 md:pb-[60px] md:h-full flex flex-col justify-end text-white">
          <div className="text-xs text-white/70 mb-5 flex items-center">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/placements" className="hover:text-white">Placement</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white">Contact</span>
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90 mb-4">
            {cp.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-5">
            {iIdx === -1 ? (
              cp.heroTitle
            ) : (
              <>
                {cp.heroTitle.slice(0, iIdx)}
                <span className="italic">{italic}</span>
                {cp.heroTitle.slice(iIdx + italic.length)}
              </>
            )}
          </h1>
          <p className="max-w-md text-sm text-white/85 leading-relaxed mb-7">{cp.heroDescription}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={cp.heroPrimaryCtaUrl}
              className="bg-sky-600 hover:bg-teal-600 transition-colors text-white font-medium px-5 py-3 rounded-md w-fit"
            >
              {cp.heroPrimaryCtaLabel}
            </a>
            <a
              href={cp.heroSecondaryCtaUrl}
              className="bg-white hover:bg-gray-100 transition-colors text-navy-900 font-medium px-5 py-3 rounded-md w-fit"
            >
              {cp.heroSecondaryCtaLabel}
            </a>
          </div>
        </div>
      </section>

      {/* Quick contacts */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {cp.contactsEyebrow}
          </span>
          <TitleWithHighlight
            text={cp.contactsTitle}
            highlight={cp.contactsTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4"
          />
          <p className="text-sm text-ink-600 mb-12">{cp.contactsSubtitle}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {contacts.map((c) => {
              const photoUrl = c.photo ? urlFor(c.photo).width(400).url() : null;
              return (
                <div key={c._id || c.name} className="flex flex-col items-center text-center">
                  <div
                    className="w-[92px] h-[92px] rounded-full bg-gray-200 bg-cover bg-center mb-5"
                    style={photoUrl ? { backgroundImage: `url('${photoUrl}')` } : undefined}
                  />
                  <p className="font-semibold text-navy-900 mb-1">{c.name}</p>
                  {c.role && <p className="text-xs text-ink-600">{c.role} ·</p>}
                  {c.phone && (
                    <a
                      href={telHref(c.phone)}
                      className="text-xs text-ink-600 hover:text-sky-600 transition-colors"
                    >
                      {c.phone}
                    </a>
                  )}
                  {c.email && (
                    <a
                      href={`mailto:${c.email}`}
                      className="text-xs text-ink-600 hover:text-sky-600 transition-colors break-all"
                    >
                      {c.email}
                    </a>
                  )}
                  {c.note && <p className="text-xs text-ink-600">· {c.note}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Email vs WhatsApp */}
      <section className="bg-navy-50 py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {cp.channelsEyebrow}
          </span>
          <TitleWithHighlight
            text={cp.channelsTitle}
            highlight={cp.channelsTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4"
          />
          <p className="text-sm text-ink-600 mb-10">{cp.channelsSubtitle}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {channelCards.map((c) => (
              <div
                key={c.title}
                className="bg-white border border-navy-100 border-l-2 border-l-sky-600 rounded-sm px-6 py-5"
              >
                <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">{c.title}</h3>
                <p className="text-sm text-ink-600 leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the team */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {cp.teamEyebrow}
            </span>
            <TitleWithHighlight
              text={cp.teamTitle}
              highlight={cp.teamTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4"
            />
            <p className="text-sm text-ink-600">{cp.teamSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {members.map((m) => {
              const photoUrl = m.photo ? urlFor(m.photo).width(700).url() : null;
              return (
                <div key={m._id || m.name} className="flex flex-col">
                  <div
                    className="h-[260px] bg-gray-200 bg-cover bg-center mb-5"
                    style={photoUrl ? { backgroundImage: `url('${photoUrl}')` } : undefined}
                  />
                  <p className="font-semibold text-navy-900 text-center mb-1">{m.name}</p>
                  <p className="text-xs text-ink-600 text-center mb-4">{m.role}</p>
                  {m.email && (
                    <a
                      href={`mailto:${m.email}`}
                      className="text-xs text-ink-600 hover:text-sky-600 transition-colors flex items-center justify-center gap-2 mb-2"
                    >
                      <Mail size={13} className="shrink-0" />
                      <span className="break-all">{m.email}</span>
                    </a>
                  )}
                  {m.phone && (
                    <a
                      href={telHref(m.phone)}
                      className="text-xs text-ink-600 hover:text-sky-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone size={13} className="shrink-0" />
                      {m.phone}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
