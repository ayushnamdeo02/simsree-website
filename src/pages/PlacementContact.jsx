import { Mail, Phone } from 'lucide-react';
import PageHero from '../components/PageHero';
import { Section, SectionTitle, H5, AccentCard } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { usePlacementContactData } from '../lib/usePlacementContactData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const telHref = (phone) => `tel:${(phone || '').replace(/[^\d+]/g, '')}`;

const fallbackPage = {
  heroEyebrow: 'Direct Line to the Cell',
  heroTitle: 'Reach the Placement Office.',
  heroTitleItalic: 'Placement Office.',
  heroDescription:
    'Two ways to reach us - call or WhatsApp the Placement Committee, or email the Placement Officer.',
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

// Figma photos, in card order, for people without a photo in the Studio.
const CONTACT_PHOTOS = [1, 2, 3, 4, 5].map((n) => `/images/placements/contact-${n}.webp`);
const MEMBER_PHOTOS = [1, 2, 3, 4, 5, 6].map((n) => `/images/placements/team-${n}.webp`);

const photo = (image, fallback, w) => (image ? urlFor(image).width(w).auto('format').url() : fallback);

export default function PlacementContact() {
  const facts = useKeyFacts();
  const { data } = usePlacementContactData();
  const cp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const contacts = fillFactsDeep(data?.contacts?.length ? data.contacts : fallbackContacts, facts);
  const members = fillFactsDeep(data?.members?.length ? data.members : fallbackMembers, facts);
  const channelCards = fillFactsDeep(cp.channelCards?.length ? cp.channelCards : fallbackPage.channelCards, facts);

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(cp.heroImage, '/images/placements/contact-hero.webp')}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Placement', to: '/placements' }, { label: 'Contact' }]}
        eyebrow={cp.heroEyebrow}
        eyebrowUpper
        title={cp.heroTitle}
        titleItalic={cp.heroTitleItalic}
        description={cp.heroDescription}
        descriptionWidth={628}
        actions={[
          { label: cp.heroPrimaryCtaLabel, href: cp.heroPrimaryCtaUrl, primary: true, icon: false },
          { label: cp.heroSecondaryCtaLabel, href: cp.heroSecondaryCtaUrl },
        ]}
        mobileOverlay="gradient-tint"
      />

      {/* Student contacts — left title; five 198px round portraits, SemiBold 22/150
          name, 18/150 role · number, centred. */}
      <Section width={1280}>
        <SectionTitle
          tagline={cp.contactsEyebrow}
          title={composeTitle(cp.contactsTitle, cp.contactsTitleHighlight)}
          highlight={cp.contactsTitleHighlight}
          body={cp.contactsSubtitle}
        />
        <div className="mt-10 md:mt-12 grid md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12">
          {contacts.map((c, i) => {
            const src = photo(c.photo, CONTACT_PHOTOS[i], 396);
            const line = c.phone ? `${c.role} · ${c.phone}` : `${c.email} · ${c.note}`;
            const href = c.phone ? telHref(c.phone) : `mailto:${c.email}`;
            return (
              <a key={c._id || c.name} href={href} className="group flex flex-col items-center gap-4 text-center">
                <div
                  className="w-[198px] h-[198px] rounded-full bg-navy-50 bg-cover bg-center"
                  style={src ? { backgroundImage: `url('${src}')` } : undefined}
                />
                <div className="text-black max-w-[198px]">
                  <p className="text-[22px] leading-[150%] font-semibold group-hover:underline underline-offset-4">{c.name}</p>
                  <p className="text-base md:text-lg leading-[150%] break-words">{line}</p>
                </div>
              </a>
            );
          })}
        </div>
      </Section>

      {/* Email vs WhatsApp — #eaeaf1, two 624x121 white bar cards (H5 + 14/150). */}
      <Section bg="bg-navy-50" width={1280}>
        <SectionTitle
          tagline={cp.channelsEyebrow}
          title={composeTitle(cp.channelsTitle, cp.channelsTitleHighlight)}
          highlight={cp.channelsTitleHighlight}
          body={cp.channelsSubtitle}
        />
        <div className="mt-10 md:mt-12 grid md:grid-cols-2 gap-8">
          {channelCards.map((c) => (
            <AccentCard key={c.title} className="[&>div]:py-4">
              <H5>{c.title}</H5>
              <p className="mt-2 text-sm leading-[150%] text-black">{c.description}</p>
            </AccentCard>
          ))}
        </div>
      </Section>

      {/* Team — centred title; 395 cards: 395 square photo, centred name, role,
          then email / phone rows with 24px icons. */}
      <Section width={1280}>
        <SectionTitle
          center
          tagline={cp.teamEyebrow}
          title={composeTitle(cp.teamTitle, cp.teamTitleHighlight)}
          highlight={cp.teamTitleHighlight}
          body={cp.teamSubtitle}
        />
        <div className="mt-10 md:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {members.map((m, i) => {
            const src = photo(m.photo, MEMBER_PHOTOS[i], 790);
            return (
              <div key={m._id || m.name} className="flex flex-col items-center gap-6 text-center text-black">
                <div
                  className="w-full aspect-square bg-navy-50 bg-cover bg-center"
                  style={src ? { backgroundImage: `url('${src}')` } : undefined}
                />
                <div>
                  <p className="text-[22px] leading-[150%] font-semibold">{m.name}</p>
                  <p className="text-lg leading-[150%]">{m.role}</p>
                </div>
                <div className="flex flex-col items-center gap-3 text-base md:text-lg leading-[150%]">
                  {m.email && (
                    <a href={`mailto:${m.email}`} className="flex items-center gap-4 hover:underline underline-offset-2">
                      <Mail size={24} strokeWidth={1.5} className="shrink-0" /> {m.email}
                    </a>
                  )}
                  {m.phone && (
                    <a href={telHref(m.phone)} className="flex items-center gap-4 hover:underline underline-offset-2">
                      <Phone size={24} strokeWidth={1.5} className="shrink-0" /> {m.phone}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
