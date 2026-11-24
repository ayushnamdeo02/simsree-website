import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import { Section, Tagline, Heading } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { useDevProgrammesData } from '../lib/useDevProgrammesData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

// Development Programmes — the 10-day MDP for Indian Naval Dockyard officers,
// laid out as a programme story (Figma "Development Programmes" frame). Every
// block is edited in the Studio; this copy is the fallback.
const IMG = (name) => `/images/events/mdp/${name}.webp`;

const fallbackPage = {
  heroEyebrow: 'For Working Professionals',
  heroTitle: 'Development Programmes.',
  heroTitleItalic: 'Programmes.',
  heroDescription:
    '10-Day Executive Management Development Programme for Gazetted Officers of the Indian Naval Dockyard - connecting defence operational excellence with contemporary corporate strategy, finance and leadership.',
  heroButtons: [
    { label: 'See the MDP calendar', url: '/events#calendar', primary: true },
    { label: 'See Career Catalyst workshops', url: '/events/career-catalyst', primary: false },
  ],

  facts: [
    { value: '10 Days', label: 'Programme duration' },
    { value: '30 Officers', label: 'Delegate cohort' },
    { value: 'Applied & Experiential', label: 'Learning approach' },
    { value: 'Indian Naval Dockyard', label: 'Partner establishment' },
  ],

  overviewEyebrow: '01 / Executive Overview',
  overviewTitle: 'A strategic bridge between defence and business.',
  overviewTitleHighlight: 'bridge between defence and business.',
  overviewBody:
    'SIMSREE conceptualised and delivered a landmark 10-day Management Development Programme curated exclusively for 30 Gazetted Officers of the Indian Naval Dockyard.\n\nRooted in the institute’s legacy of academic rigour and public service, the engagement connected mission-critical defence administration with contemporary corporate management frameworks. The cohort brought together technical, engineering, logistics and administrative officers responsible for vital naval maintenance and maritime infrastructure operations.\n\nAcross intensive classroom sessions, analytical workshops and collaborative problem-solving, military precision met business agility. The programme created a forum to examine how strategic, financial and operational tools can strengthen institutional decision-making.',
  overviewQuote: '“An intellectual forum where military precision converged with business agility.”',
  overviewQuoteSource: 'Programme Vision · SIMSREE',

  curriculumEyebrow: '02 / Curriculum architecture',
  curriculumTitle: 'Six pillars. One integrated perspective.',
  curriculumTitleHighlight: 'perspective.',
  curriculumIntro:
    'An applied syllabus balanced management foundations with practical tools, real-world cases and experiential simulations tailored to the Dockyard’s operational context.',
  pillars: [
    { title: 'Corporate Strategy & Business Dynamics', description: 'Environmental scanning, strategic alignment, competitive positioning and long-range institutional planning.', methods: 'Interactive lectures · Strategic diagnostics' },
    { title: 'Financial Management & Capital Markets', description: 'Capital budgeting, cost optimisation, financial analysis, fiscal prudence and market structures.', methods: 'Analytical workshops · Project evaluation' },
    { title: 'Executive Leadership & Behaviour', description: 'Transformational leadership, high-performance culture, team synergy and change management.', methods: 'Leadership labs · Syndicate discussions' },
    { title: 'Strategic Negotiation & Stakeholders', description: 'Contract governance, conflict resolution, collaborative negotiation and vendor communication.', methods: 'Interactive lectures · Strategic diagnostics' },
    { title: 'Supply Chain & Operations Excellence', description: 'Logistics resilience, inventory optimisation, lean operations, quality control and turnaround management.', methods: 'Analytical workshops · Project evaluation' },
    { title: 'Business Simulations & Case Studies', description: 'Decision-making under uncertainty, cross-functional trade-offs and performance benchmarking.', methods: 'Leadership labs · Syndicate discussions' },
  ],

  experientialEyebrow: 'Experiential Learning & Classroom Synergy',
  experientialTitle: 'Beyond the lecture hall.',
  experientialTitleHighlight: 'lecture hall.',
  experientialBody:
    'Sessions evolved into dynamic leadership forums rather than one-way seminars. SIMSREE faculty and experienced industry speakers introduced contemporary corporate frameworks, which officers examined against the high-stakes realities of Naval Dockyard operations.\n\nLive business simulations and structured case studies gave participants an analytical environment in which to test strategic, financial and operational decisions. Discussions on capital markets, supply-chain bottlenecks, negotiation and corporate governance brought valuable operational perspectives into the classroom.',
  experientialTags: ['Faculty-led sessions', 'Industry perspectives', 'Live simulations', 'Case-based learning'],

  culminationEyebrow: '04 / Programme Culmination',
  culminationTitle: 'A fitting close to ten days of learning.',
  culminationTitleHighlight: 'ten days',
  culminationSubtitle:
    'The programme concluded with a formal valedictory session recognising the officers’ commitment and the strength of the institutional partnership.',
  milestones: [
    { label: '01 / Recognition', title: 'Certificates of Completion', description: 'All 30 Gazetted Officers received official Certificates of Completion and institutional mementos in recognition of their scholarly dedication, collaborative spirit and active participation.' },
    { label: '02 / Reflection', title: 'From insight to application', description: 'Valedictory addresses highlighted the practical relevance of the managerial, financial and supply-chain tools explored throughout the programme.' },
    { label: '03 / Partnership', title: 'Shared commitment to national excellence', description: 'The session celebrated a collaboration built on mutual respect, institutional camaraderie and a shared commitment to continuous capability development.' },
  ],

  picturesEyebrow: 'Programme in Pictures',
  picturesTitle: 'Learning, collaboration & shared moments.',
  picturesTitleHighlight: 'shared moments.',
  picturesSubtitle:
    'A visual record of the ten-day engagement, from classroom discussions to collaborative exercises and the closing ceremony.',

  peopleEyebrow: '05 / Institutional Patronage & Mentorship',
  peopleTitle: 'The people behind the programme.',
  peopleSubtitle:
    'The programme was made possible through institutional leadership, academic direction, expert teaching and coordinated student support.',
  peopleRows: [
    {
      heading: 'Institutional patronage & strategic leadership',
      entries: [
        { lead: 'Dr. Rupesh Raut', text: ' · Director, SIMSREE - provided institutional stewardship and administrative support.' },
        { lead: 'Captain Alok Lange', text: ' · Indian Naval Dockyard - championed the collaboration and entrusted SIMSREE with the officers’ executive capability development.' },
      ],
    },
    {
      heading: 'Academic direction & mentorship',
      entries: [
        { lead: 'Prof. Sangeeta Pandit', text: ' · Programme Mentor & Faculty Coordinator - guided the initiative from inception to completion through curriculum design, scheduling and continuous mentorship.' },
      ],
    },
    {
      heading: 'Academic faculty & guest experts',
      entries: [
        { lead: 'Distinguished faculty and industry speaker', text: ' · Programme delivered sessions and simulations across corporate finance, capital markets, leadership, negotiation, strategy and supply-chain management.' },
      ],
    },
    {
      heading: 'Student coordination & execution',
      entries: [
        { lead: 'Organising associates:', text: ' Sourav Shah, Atharva Neharkar, Swaraj Gadge, Harsh Pal, Purva Jadhav, Samiksha Rathod and Jayesh Thakur.' },
        { lead: '', text: 'The team coordinated delegate hospitality, academic sessions, simulation logistics, faculty liaison and the valedictory programme.' },
      ],
    },
  ],

  ctaEyebrow: '06 / Coordinator’s Reflection & Future Outlook',
  ctaTitle: 'A meaningful exchange. A foundation for what’s next.',
  ctaTitleHighlight: 'A foundation for what’s next.',
  ctaBody:
    'For the student coordinating committee, facilitating this programme was a defining highlight of the MMS journey at SIMSREE. Working alongside senior officers who help safeguard and sustain the nation’s naval fleet offered an enduring lesson in discipline, strategic clarity and humility.\n\nThis engagement sets a strong precedent for future defence and corporate training collaborations. By sharing actionable management insights with 30 Gazetted Officers - and bringing real operational perspectives into the institute - SIMSREE continues its mission of nurturing leaders who create lasting national impact.',
  ctaButtonLabel: 'Enquire about executive programmes',
  ctaButtonUrl: '/contact',
};

const FALLBACK_IMAGES = {
  overview: IMG('overview'),
  experiential: IMG('experiential'),
  gallery: [1, 2, 3, 4, 5].map((n) => IMG(`mosaic-${n}`)),
  pictures: [1, 2, 3].map((n) => IMG(`picture-${n}`)),
};

const imgUrl = (image, width, fallback) => {
  if (!image?.asset) return fallback;
  try {
    return urlFor(image).width(width).auto('format').url();
  } catch {
    return fallback;
  }
};

const paragraphs = (text = '') => text.split(/\n\s*\n/).filter(Boolean);

// Photo tile: rounded corners optional, gentle zoom on hover like the other cards.
function Photo({ src, alt = '', className = '' }) {
  return (
    <div className={`overflow-hidden bg-navy-50 ${className}`}>
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.65,0.3,1)] motion-safe:hover:scale-[1.04]"
        />
      )}
    </div>
  );
}

export default function DevProgrammes() {
  const facts = useKeyFacts();
  const { data } = useDevProgrammesData();
  const page = data?.page || {};
  // Lists fall back as a whole, so a half-filled Studio list never mixes with the copy here.
  const merged = Object.fromEntries(
    Object.entries({ ...fallbackPage, ...page }).map(([k, v]) => [k, Array.isArray(v) && !v.length ? fallbackPage[k] : v]),
  );
  const dp = fillFactsDeep(merged, facts);

  const overviewImg = imgUrl(dp.overviewImage, 1200, FALLBACK_IMAGES.overview);
  const experientialImg = imgUrl(dp.experientialImage, 1300, FALLBACK_IMAGES.experiential);
  const gallery = (dp.gallery?.length ? dp.gallery : FALLBACK_IMAGES.gallery).map((g, i) =>
    typeof g === 'string' ? { src: g } : { src: imgUrl(g, i === 0 ? 1300 : 700, FALLBACK_IMAGES.gallery[i]), alt: g.alt },
  );
  const pictures = (dp.pictures?.length ? dp.pictures : FALLBACK_IMAGES.pictures).map((g, i) =>
    typeof g === 'string' ? { src: g } : { src: imgUrl(g, 900, FALLBACK_IMAGES.pictures[i]), alt: g.alt },
  );

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(dp.heroImage, IMG('hero'))}
        eyebrow={dp.heroEyebrow}
        eyebrowUpper
        title={dp.heroTitle}
        titleItalic={dp.heroTitleItalic}
        titleWidth={845}
        description={dp.heroDescription}
        descriptionWidth={628}
        actions={(dp.heroButtons || []).map((b) => ({ label: b.label, href: b.url, primary: b.primary }))}
      />

      {/* Key facts — four bar cards (3px Eastern Blue edge), widths follow the copy. */}
      <Section width={1312}>
        <div className="grid grid-cols-2 lg:flex gap-4 md:gap-8">
          {(dp.facts || []).map((f) => (
            <div
              key={f.label}
              className="lg:flex-auto flex bg-white outline outline-1 -outline-offset-1 outline-black/15 shadow-small"
            >
              <span className="w-[3px] shrink-0 bg-teal-500" aria-hidden="true" />
              <div className="min-w-0 px-4 py-5 md:px-8 md:py-9 flex flex-col gap-2 md:gap-3">
                <p className="font-display font-medium text-[22px] md:text-[28px] leading-[130%] tracking-[-0.01em] text-navy-900">{f.value}</p>
                <p className="text-sm md:text-base leading-[150%] text-black">{f.label}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 01 Executive overview — copy | rounded photo, then a quote bar. */}
      <Section bg="bg-navy-50" width={1312}>
        <div className="grid lg:grid-cols-[1fr_600px] gap-10 lg:gap-16 items-start">
          <div className="lg:px-8 lg:pt-24 flex flex-col gap-6 md:gap-8">
            <Tagline>{dp.overviewEyebrow}</Tagline>
            <Heading text={dp.overviewTitle} highlight={dp.overviewTitleHighlight} />
            <div className="flex flex-col gap-6 text-base md:text-lg leading-[150%] text-black">
              {paragraphs(dp.overviewBody).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <Photo src={overviewImg} className="rounded-2xl aspect-[600/837] max-lg:aspect-[4/3]" />
        </div>
        {dp.overviewQuote && (
          <div className="mt-10 md:mt-12 flex bg-white outline outline-1 -outline-offset-1 outline-black/15 shadow-small">
            <span className="w-[3px] shrink-0 bg-teal-500" aria-hidden="true" />
            <div className="flex-1 px-5 py-5 md:px-8 md:py-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-9">
              <p className="font-display text-xl md:text-[22px] leading-[140%] text-navy-900">{dp.overviewQuote}</p>
              {dp.overviewQuoteSource && <p className="text-sm md:text-base leading-[150%] uppercase text-black shrink-0">{dp.overviewQuoteSource}</p>}
            </div>
          </div>
        )}
      </Section>

      {/* 02 Curriculum — pill eyebrow, title | intro, then six hairline cards. */}
      <Section width={1280}>
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-end">
          <div className="flex flex-col items-start gap-4">
            <span className="px-2.5 py-1 rounded-2xl bg-sky-50 text-sm leading-[150%] text-teal-500">{dp.curriculumEyebrow}</span>
            <Heading text={dp.curriculumTitle} highlight={dp.curriculumTitleHighlight} />
          </div>
          <p className="text-base md:text-lg leading-[150%] text-black lg:max-w-[540px] lg:justify-self-end">{dp.curriculumIntro}</p>
        </div>
        <div className="mt-10 md:mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(dp.pillars || []).map((p, i) => (
            <div
              key={p.title}
              className="hover-card rounded-2xl p-6 flex flex-col gap-4 bg-white outline outline-1 -outline-offset-1 outline-black/15"
            >
              <span className="text-base leading-[150%] font-semibold text-black">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display font-medium text-[24px] md:text-[28px] leading-[140%] tracking-[-0.01em] text-black">{p.title}</h3>
              <p className="flex-1 text-base leading-[150%] text-black">{p.description}</p>
              {p.methods && <p className="pt-4 border-t border-black/15 text-base leading-[150%] text-teal-500">{p.methods}</p>}
            </div>
          ))}
        </div>
      </Section>

      {/* Experiential learning — photo | copy and pill tags. */}
      <Section bg="bg-navy-50" width={1312}>
        <div className="grid lg:grid-cols-[616px_1fr] gap-10 lg:gap-20 items-center">
          <Photo src={experientialImg} className="aspect-[616/657] max-lg:aspect-[4/3]" />
          <div className="flex flex-col gap-6 md:gap-8">
            <Tagline>{dp.experientialEyebrow}</Tagline>
            <Heading text={dp.experientialTitle} highlight={dp.experientialTitleHighlight} />
            <div className="flex flex-col gap-6 text-base md:text-lg leading-[150%] text-black">
              {paragraphs(dp.experientialBody).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            {dp.experientialTags?.length > 0 && (
              <ul className="m-0 p-0 list-none flex flex-wrap gap-3 md:gap-4">
                {dp.experientialTags.map((t) => (
                  <li key={t} className="px-2.5 py-1 rounded-2xl bg-white text-xs leading-[150%] text-teal-500">
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Section>

      {/* 04 Culmination — title, three hairline rows, then a photo mosaic. */}
      <Section width={1280}>
        <div className="max-w-[780px] flex flex-col gap-4 md:gap-6">
          <Tagline>{dp.culminationEyebrow}</Tagline>
          <Heading text={dp.culminationTitle} highlight={dp.culminationTitleHighlight} />
          <p className="text-base md:text-lg leading-[150%] text-black">{dp.culminationSubtitle}</p>
        </div>
        <div className="mt-10 md:mt-20 border-t border-black/15">
          {(dp.milestones || []).map((m) => (
            <div
              key={m.title}
              className="grid md:grid-cols-[289px_1fr] gap-3 md:gap-0 items-center py-6 md:py-8 border-b border-black/15"
            >
              <p className="font-display text-[24px] md:text-[30px] leading-[130%] text-teal-500">{m.label}</p>
              <div className="flex flex-col gap-3 md:gap-6">
                <h3 className="font-display font-medium text-[22px] md:text-[28px] leading-[140%] tracking-[-0.01em] text-navy-900">{m.title}</h3>
                <p className="text-base leading-[150%] text-black">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      {gallery.length > 0 && (
        <section className="px-5 pb-12 md:px-16 md:pb-20">
          <div className="mx-auto max-w-[1312px] grid grid-cols-2 lg:grid-cols-[640fr_304fr_304fr] lg:grid-rows-2 gap-3 md:gap-8">
            {gallery.map((g, i) => (
              <Photo
                key={g.src + i}
                src={g.src}
                alt={g.alt}
                className={`aspect-square ${i === 0 ? 'col-span-2 lg:col-span-1 lg:row-span-2' : ''}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Programme in pictures — #eaeaf1, title, three photos. */}
      <Section bg="bg-navy-50" width={1312}>
        <div className="flex flex-col gap-4 md:gap-6">
          <Tagline>{dp.picturesEyebrow}</Tagline>
          <Heading text={dp.picturesTitle} highlight={dp.picturesTitleHighlight} />
          <p className="text-base md:text-lg leading-[150%] text-black">{dp.picturesSubtitle}</p>
        </div>
        <div className="mt-10 md:mt-20 grid sm:grid-cols-3 gap-3">
          {pictures.map((g, i) => (
            <Photo key={g.src + i} src={g.src} alt={g.alt} className="aspect-[429/458] max-sm:aspect-[4/3]" />
          ))}
        </div>
      </Section>

      {/* 05 People — title, then hairline rows: Eastern Blue heading | entries. */}
      <Section width={1280}>
        <div className="max-w-[780px] flex flex-col gap-4 md:gap-6">
          <Tagline>{dp.peopleEyebrow}</Tagline>
          <Heading text={dp.peopleTitle} highlight={dp.peopleTitleHighlight} />
          <p className="text-base md:text-lg leading-[150%] text-black">{dp.peopleSubtitle}</p>
        </div>
        <div className="mt-10 md:mt-20 border-t border-black/15">
          {(dp.peopleRows || []).map((r) => (
            <div
              key={r.heading}
              className="grid md:grid-cols-[1fr_560px] gap-4 md:gap-16 items-center py-6 md:py-8 border-b border-black/15"
            >
              <p className="font-display text-[24px] md:text-[30px] leading-[130%] text-teal-500">{r.heading}</p>
              <div className="flex flex-col gap-6 text-base leading-[150%] text-black">
                {(r.entries || []).map((e, i) => (
                  <p key={i}>
                    {e.lead && <span className="font-medium">{e.lead}</span>}
                    {e.text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 06 Reflection — navy band, title with a light Eastern Blue second sentence, CTA. */}
      <Section bg="bg-navy-900" width={1312}>
        <div className="flex flex-col gap-6 md:gap-8">
          <Tagline className="text-white">{dp.ctaEyebrow}</Tagline>
          <Heading text={dp.ctaTitle} highlight={dp.ctaTitleHighlight} className="text-white" highlightClass="text-teal-400" />
          <div className="flex flex-col gap-6 text-base md:text-lg leading-[150%] text-white">
            {paragraphs(dp.ctaBody).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          {dp.ctaButtonLabel && (
            <div className="max-sm:[&>*]:w-full">
              {/* Eastern Blue on navy, per the design (HeroButton turns white inside navy bands). */}
              <Link
                to={dp.ctaButtonUrl || '/contact'}
                className="inline-flex items-center justify-center gap-3 min-h-11 px-6 py-2.5 rounded-md bg-teal-500 hover:bg-teal-600 text-white text-base leading-[150%] font-medium transition-colors"
              >
                {dp.ctaButtonLabel} <ArrowUpRight size={24} strokeWidth={1.5} className="shrink-0" />
              </Link>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
