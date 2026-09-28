import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight, Play } from 'lucide-react';
import { useTedxData } from '../lib/useTedxData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';
import CountUp from '../components/CountUp';

const fallbackPage = {
  heroEyebrow: 'TEDxSIMSREE',
  heroTitle: 'Ideas worth spreading.',
  heroTitleItalic: 'spreading.',
  heroDescription:
    'TEDxSIMSREE discovers and spreads ideas that spark conversation, deepen understanding, and drive meaningful change. We curate one afternoon a year where speakers from Mumbai, India and beyond share the questions they cannot stop thinking about.',
  heroButtons: [
    { label: 'Watch the latest talks', url: '#talks', primary: true },
    { label: 'Nominate a speaker', url: '#involved', primary: false },
  ],

  factStrip: [
    'Ideas Worth Spreading',
    'Since 2017',
    'Seven Editions',
    '11.4M YouTube Views',
    '320-Seat Auditorium',
  ],

  whatEyebrow: 'What We Do',
  whatTitle: 'Three things, done seriously.',
  whatCards: [
    {
      title: 'The annual event',
      description:
        'One afternoon every November · six speakers · a 320-seat auditorium · livestream to 4,000 more on YouTube. Curated, rehearsed and produced by a 22-person student crew.',
      linkLabel: 'Past editions',
      linkUrl: '#editions',
    },
    {
      title: 'Speaker curation',
      description:
        '2000+ nominations a year, narrowed to 6. We rehearse each speaker for 8-12 weeks, give script feedback, and refuse to let anyone read off a deck. Talks are about ideas, not companies.',
      linkLabel: 'Nominate a voice',
      linkUrl: '#involved',
    },
    {
      title: 'A year-round community',
      description:
        'Salons, watch parties, idea circles · all year. We host conversations on campus and in Mumbai cafes where the talks of the year are taken apart, argued at, and built on.',
      linkLabel: 'Join us',
      linkUrl: '#involved',
    },
  ],

  editionsEyebrow: 'Programme Spotlight',
  editionsTitle: 'editions · seven conversations.',
  editionsSubtitle:
    'Each year we pick a single word that holds the year’s question. The talks live forever on YouTube; the conversations they started live in people.',
  editionsCtaLabel: 'Browse all 42 talks',
  editionsCtaUrl: '#talks',

  reachEyebrow: 'Our Impact',
  reachTitle: 'Small room. Long shadow.',
  reachSubtitle:
    'In a city that does not stop, an afternoon of stillness, sharp thinking and one good question lingers longer than it should.',
  reachStats: [
    { value: '42', label: 'Speakers since 2017', note: 'From founders to filmmakers to public-health researchers · students to senators.' },
    { value: '11.4M', label: 'Cumulative YouTube views', note: 'From founders to filmmakers to public-health researchers · students to senators.' },
    { value: '2,240', label: 'In-room attendees', note: '320 seats × 7 editions · plus livestream rooms hosted across 14 partner colleges.' },
    { value: '7', label: 'Editions delivered', note: '2017 · 2018 · 2019 · 2021 · 2022 · 2023 · 2025. Unbroken since 2017.' },
  ],

  themesEyebrow: 'Programme Spotlight',
  themesTitle: 'Ideas change three things at a time.',
  themeCards: [
    {
      badge: 'People',
      title: 'Ideas change people',
      description:
        'A student in row 12 hears a founder describe failure honestly and stops being afraid of their own.',
      meta: 'Gallery · Winners',
      linkLabel: 'See the workshop',
      linkUrl: '#talks',
    },
    {
      badge: 'Campus',
      title: 'Ideas change campus',
      description:
        'Three of SIMSREE’s student committees trace their founding to a question first raised on this stage.',
      meta: 'See the workshop',
      linkLabel: 'See the workshop',
      linkUrl: '#talks',
    },
    {
      badge: 'Mumbai',
      title: 'Ideas change cities',
      description:
        'Some April 2023 talk on Mumbai flood-plain design is now reference material in a BMC-adjacent policy note.',
      meta: 'Track the plan',
      linkLabel: 'Track the plan',
      linkUrl: '#talks',
    },
  ],

  talksEyebrow: 'The Talks',
  talksTitle: 'talks worth your afternoon.',
  talksSubtitle: 'A curated start. The full library lives on YouTube @TEDxSIMSREE.',

  involvedEyebrow: 'Get Involved',
  involvedTitle: 'Three ways to be part of this.',
  involvedCards: [
    {
      title: 'Nominate a speaker',
      description:
        'Know someone with an idea you cannot shake? Nominate them. We read every submission. The 2025 closing speaker came to us via an Instagram DM.',
      linkLabel: 'Submit a nomination',
      linkUrl: '/contact',
    },
    {
      title: 'Apply to volunteer',
      description:
        'A tight crew runs this: curation, speaker coaching, production, design, social. Applications open every March for the November event.',
      linkLabel: 'See open roles',
      linkUrl: '/contact',
    },
    {
      title: 'Become a partner',
      description:
        'Brand partners cover production · enable livestream · sponsor scholarships for the visiting-student delegates. Real budgets, real association.',
      linkLabel: 'Partnership deck',
      linkUrl: '/contact',
    },
  ],

  historyEyebrow: 'History',
  historyTitle: 'From a hostel room in 2016 to the auditorium today.',
  historyTitleBreakAfter: '2016',

  licenceEyebrow: 'Who We Are',
  licenceTitle: 'A student-run TEDx, independently organized, in Mumbai.',
  licenceTitleHighlight: 'independently organized,',
  licenceBody:
    'TEDxSIMSREE is operated under licence from TED. The licence is held by the SIMSREE Student Council; the work is done by a 22-person committee that turns over every academic year. No faculty advisor curates the talks. No one gets paid. The standard we hold ourselves to is the same TED holds itself to: curiosity, respect, warmth, and the pursuit of knowledge — without an agenda.',
  licenceRows: [
    { label: 'Licence year', value: '2017' },
    { label: 'Licence type', value: 'University · Standard' },
    { label: 'Capacity', value: '320 (in-room)' },
    { label: 'Operator', value: 'SIMSREE Student Council' },
  ],

  ctaEyebrow: 'Stay Looped',
  ctaTitle: 'An idea found you? Bring it back.',
  ctaTitleHighlight: 'Bring it back.',
  ctaSubtitle:
    'Nominate · attend · partner · or just sit in the auditorium next November and let someone else’s idea change yours.',
  ctaButtons: [
    { label: 'Start conversation now', url: '/contact', primary: true },
    { label: 'Get in touch', url: '/contact', primary: false },
  ],
};

const fallbackEditions = [
  { year: '2025', theme: 'Unstoppable', description: 'Six speakers, one afternoon. Movement, momentum, and what refuses to stop.', wide: true, order: 1 },
  { year: '2024', theme: 'Threshold', description: 'The line worth crossing — and what is on the other side.', order: 2 },
  { year: '2023', theme: 'Fault Lines', description: 'Where things crack, and who does the repair.', order: 3 },
  { year: '2022', theme: 'Re-Sound', description: 'What gets heard when the noise drops.', order: 4 },
  { year: '2021', theme: 'Lighthouse', description: 'Fixed points in an unfixed year.', order: 5 },
  { year: '2019', theme: 'Untangled', description: 'Complexity, made legible.', order: 6 },
  { year: '2018', theme: 'First Light', description: 'The inaugural year — six untested voices.', order: 7 },
];

const fallbackTalks = [
  { speaker: 'Dr. Aanya Mehrotra', edition: 'TEDxSIMSREE · 2025', role: 'Behavioural Economist', title: 'The economics of small decisions', summary: 'Why the smallest choice compounds.', order: 1 },
  { speaker: 'Rohan Iyer', edition: 'TEDxSIMSREE · 2025', role: 'Climate Solutions Architect', title: 'What if we designed cities for monsoons?', summary: 'Water as infrastructure, not emergency.', order: 2 },
  { speaker: 'Saira Bhatt', edition: 'TEDxSIMSREE · 2024', role: 'Documentary Filmmaker', title: '“This businesses, India’s real economy”', summary: 'Who the numbers leave out.', order: 3 },
  { speaker: 'Arjun Krishnamurthy', edition: 'TEDxSIMSREE · 2024', role: 'Filmmaker', title: 'The frame outside is standing at', summary: 'What a camera refuses to see.', order: 4 },
  { speaker: 'Priya Goswami', edition: 'TEDxSIMSREE · 2023', role: 'Public Health Researcher', title: '“Mumbai’s lungs · time to breathe”', summary: 'Air, data, and what a city owes.', order: 5 },
  { speaker: 'Vikram Singh', edition: 'TEDxSIMSREE · 2023', role: 'Data Scientist', title: '“What the bar cannot repair”', summary: 'The smallest world that ever mattered.', order: 6 },
  { speaker: 'Tanvi Rao', edition: 'TEDxSIMSREE · 2022', role: 'Systems Thinker', title: 'The smallest world that ever mattered', summary: 'Scale, and its discontents.', order: 7 },
  { speaker: 'Kabir Nair', edition: 'TEDxSIMSREE · 2022', role: 'Author', title: 'Re-reading a city', summary: 'Familiar streets, unfamiliar questions.', order: 8 },
];

const fallbackMilestones = [
  { title: 'The licence arrives.', description: 'Three-four years apply for a TEDx licence after attending TEDxGateway. They get it on the second try. No money. No venue. A boardroom deadline.', order: 1 },
  { title: 'The first edition · “Unbound”.', description: 'Six speakers · 180 seats sold · slick corporate sponsors. Filmed free a friend with one camera. The opening talk got 400k views in 18 months.', order: 2 },
  { title: 'The skipped year.', description: 'No initial car to hold a chair before during lockdown — NO wrong. We came back in 2021 with “Lighthouse”, streamed only, from a closed auditorium.', order: 3 },
  { title: 'The seventh · “Unstoppable”.', description: '320 seats sold out in 70 minutes · livestream rooms in 14 partner colleges · cumulative watch past 11M YouTube views. The standard we chase now is our own.', order: 4 },
];

function TitleWithHighlight({ text = '', highlight, className, prefix }) {
  const idx = highlight ? text.indexOf(highlight) : -1;
  const body =
    idx === -1 ? (
      text
    ) : (
      <>
        {text.slice(0, idx)}
        <span className="text-teal-500">{highlight}</span>
        {text.slice(idx + highlight.length)}
      </>
    );
  return (
    <h2 className={className}>
      {prefix && <>{prefix} </>}
      {body}
    </h2>
  );
}

export default function Tedx() {
  const facts = useKeyFacts();
  const { data } = useTedxData();
  const tp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const editions = fillFactsDeep(data?.editions?.length ? data.editions : fallbackEditions, facts);
  const talks = fillFactsDeep(data?.talks?.length ? data.talks : fallbackTalks, facts);
  const milestones = fillFactsDeep(
    data?.milestones?.length ? data.milestones : fallbackMilestones,
    facts
  );
  const pick = (k) => fillFactsDeep(tp[k]?.length ? tp[k] : fallbackPage[k], facts);
  const heroButtons = pick('heroButtons');
  const factStrip = pick('factStrip');
  const whatCards = pick('whatCards');
  const reachStats = pick('reachStats');
  const themeCards = pick('themeCards');
  const involvedCards = pick('involvedCards');
  const licenceRows = pick('licenceRows');
  const ctaButtons = pick('ctaButtons');

  const heroImageUrl = tp.heroImage ? urlFor(tp.heroImage).width(1200).url() : null;
  const licenceImageUrl = tp.licenceImage ? urlFor(tp.licenceImage).width(900).url() : null;

  const italic = tp.heroTitleItalic;
  const iIdx = italic ? (tp.heroTitle || '').indexOf(italic) : -1;

  const hTitle = tp.historyTitle || '';
  const hBrk = tp.historyTitleBreakAfter;
  const hIdx = hBrk ? hTitle.indexOf(hBrk) : -1;
  const hLine1 = hIdx === -1 ? hTitle : hTitle.slice(0, hIdx + hBrk.length);
  const hLine2 = hIdx === -1 ? '' : hTitle.slice(hIdx + hBrk.length).trim();

  return (
    <div className="bg-white">
      {/* Hero — two-column, not a photo hero */}
      <section className="bg-white pt-32 pb-12 lg:pt-36 lg:pb-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="text-xs text-ink-400 mb-6 flex items-center">
            <Link to="/" className="hover:text-navy-900">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/events" className="hover:text-navy-900">Events</Link>
            <span className="mx-1.5">/</span>
            <span className="text-navy-900">TEDxSIMSREE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="text-[11px] font-semibold tracking-widest uppercase text-navy-900 mb-4 block">
                {tp.heroEyebrow}
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-navy-900 mb-5">
                {iIdx === -1 ? (
                  tp.heroTitle
                ) : (
                  <>
                    {tp.heroTitle.slice(0, iIdx)}
                    <span className="italic">{italic}</span>
                    {tp.heroTitle.slice(iIdx + italic.length)}
                  </>
                )}
              </h1>
              <p className="text-sm text-ink-600 leading-relaxed max-w-md mb-7">
                {tp.heroDescription}
              </p>
              <div className="flex flex-wrap gap-3">
                {heroButtons.map((b) => (
                  <a
                    key={b.label}
                    href={b.url || '#'}
                    className={`text-sm font-medium px-5 py-3 rounded-md transition-colors flex items-center gap-2 w-fit ${
                      b.primary
                        ? 'bg-navy-900 hover:bg-navy-800 text-white'
                        : 'border border-navy-100 text-navy-900 hover:bg-navy-50'
                    }`}
                  >
                    {b.label}
                    {b.primary && <ArrowUpRight size={15} />}
                  </a>
                ))}
              </div>
            </div>

            <div
              className="h-[260px] lg:h-[320px] rounded-lg bg-gray-200 bg-cover bg-center"
              style={heroImageUrl ? { backgroundImage: `url('${heroImageUrl}')` } : undefined}
            />
          </div>
        </div>
      </section>

      {/* Navy fact strip */}
      {factStrip.length > 0 && (
        <section className="bg-navy-900 text-white py-4">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-0 flex flex-wrap items-center gap-x-8 gap-y-2">
            {factStrip.map((f) => (
              <span key={f} className="text-[10px] font-semibold tracking-widest uppercase">
                {f}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* What we do */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {tp.whatEyebrow}
            </span>
            <TitleWithHighlight
              text={tp.whatTitle}
              highlight={tp.whatTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whatCards.map((c, i) => {
              const imgUrl = c.image ? urlFor(c.image).width(600).url() : null;
              return (
                <div
                  key={c.title}
                  className="border border-navy-100 rounded-lg overflow-hidden flex flex-col"
                >
                  <div
                    className="h-[150px] bg-gray-200 bg-cover bg-center"
                    style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[11px] font-semibold text-ink-400 mb-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-navy-900 mb-3">
                      {c.title}
                    </h3>
                    <p className="text-xs text-ink-600 leading-relaxed mb-4">{c.description}</p>
                    {c.linkLabel && (
                      <a
                        href={c.linkUrl || '#'}
                        className="text-xs font-medium text-navy-900 inline-flex items-center gap-1 mt-auto"
                      >
                        {c.linkLabel} <ChevronRight size={13} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editions */}
      <section id="editions" className="py-16 lg:py-20 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {tp.editionsEyebrow}
            </span>
            <TitleWithHighlight
              prefix={editions.length === 7 ? 'Seven' : editions.length}
              text={tp.editionsTitle}
              highlight={tp.editionsTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4"
            />
            <p className="text-sm text-ink-600">{tp.editionsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {editions.map((e) => {
              const imgUrl = e.image ? urlFor(e.image).width(800).url() : null;
              return (
                <div
                  key={e._id || e.year}
                  className={`relative h-[220px] rounded-lg overflow-hidden bg-gray-300 bg-cover bg-center ${
                    e.wide ? 'sm:col-span-2' : ''
                  }`}
                  style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent" />
                  <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-white/70 mb-1">
                      {e.year}
                    </span>
                    <h3 className="font-display text-xl font-semibold mb-1">{e.theme}</h3>
                    <p className="text-[11px] text-white/75 leading-relaxed">{e.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {tp.editionsCtaLabel && (
            <div className="flex justify-center mt-10">
              <a
                href={tp.editionsCtaUrl || '#'}
                className="border border-navy-100 hover:bg-navy-50 transition-colors text-navy-900 text-sm font-medium px-5 py-3 rounded-md inline-flex items-center gap-2"
              >
                {tp.editionsCtaLabel} <ArrowUpRight size={14} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Reach */}
      <section className="bg-navy-900 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-white/70">
              {tp.reachEyebrow}
            </span>
            <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-5 mb-4">
              {tp.reachTitle}
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">{tp.reachSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {reachStats.map((s) => (
              <div key={s.label} className="border-t border-white/20 pt-5">
                <p className="font-display text-4xl font-semibold mb-2"><CountUp value={s.value} /></p>
                <p className="text-xs font-medium mb-2">{s.label}</p>
                <p className="text-[11px] text-white/55 leading-relaxed">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Themes */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {tp.themesEyebrow}
            </span>
            <TitleWithHighlight
              text={tp.themesTitle}
              highlight={tp.themesTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {themeCards.map((c) => {
              const imgUrl = c.image ? urlFor(c.image).width(700).url() : null;
              return (
                <div
                  key={c.title}
                  className="relative h-[280px] rounded-lg overflow-hidden bg-gray-300 bg-cover bg-center"
                  style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-navy-950/10" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    {c.badge && (
                      <span className="inline-block w-fit text-[9px] font-semibold tracking-widest uppercase bg-white/20 px-2.5 py-1 rounded mb-3">
                        {c.badge}
                      </span>
                    )}
                    <h3 className="font-display text-lg font-semibold mb-2">{c.title}</h3>
                    <p className="text-[11px] text-white/75 leading-relaxed mb-3">
                      {c.description}
                    </p>
                    {c.linkLabel && (
                      <a
                        href={c.linkUrl || '#'}
                        className="text-[11px] font-medium text-white inline-flex items-center gap-1"
                      >
                        {c.linkLabel} <ChevronRight size={12} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Talks */}
      <section id="talks" className="py-16 lg:py-20 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {tp.talksEyebrow}
            </span>
            <TitleWithHighlight
              prefix={talks.length === 8 ? 'Eight' : talks.length}
              text={tp.talksTitle}
              highlight={tp.talksTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4"
            />
            <p className="text-sm text-ink-600">{tp.talksSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {talks.map((t) => {
              const photoUrl = t.photo ? urlFor(t.photo).width(500).url() : null;
              return (
                <div key={t._id || t.speaker} className="flex flex-col">
                  <div
                    className="h-[180px] rounded-lg bg-gray-200 bg-cover bg-center mb-4"
                    style={photoUrl ? { backgroundImage: `url('${photoUrl}')` } : undefined}
                  />
                  <span className="text-[9px] font-semibold tracking-widest uppercase text-ink-400 mb-1.5">
                    {t.edition}
                  </span>
                  <h3 className="font-display text-base font-semibold text-navy-900 mb-1">
                    {t.speaker}
                  </h3>
                  <p className="text-[11px] text-ink-400 mb-2">{t.role}</p>
                  <p className="text-[11px] text-ink-600 leading-relaxed mb-3">{t.title}</p>
                  {t.watchLabel !== null && (
                    <a
                      href={t.watchUrl || '#'}
                      className="text-[11px] font-medium text-navy-900 inline-flex items-center gap-1 mt-auto"
                    >
                      <Play size={11} /> {t.watchLabel || 'Watch the talk'}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Get involved */}
      <section id="involved" className="py-16 lg:py-20 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="max-w-[768px] mx-auto text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
              {tp.involvedEyebrow}
            </span>
            <TitleWithHighlight
              text={tp.involvedTitle}
              highlight={tp.involvedTitleHighlight}
              className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {involvedCards.map((c, i) => (
              <div key={c.title} className="border border-navy-100 rounded-lg p-6 flex flex-col">
                <span className="text-[11px] font-semibold text-ink-400 mb-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg font-semibold text-navy-900 mb-3">
                  {c.title}
                </h3>
                <p className="text-xs text-ink-600 leading-relaxed mb-4">{c.description}</p>
                {c.linkLabel && (
                  <a
                    href={c.linkUrl || '#'}
                    className="text-xs font-medium text-navy-900 inline-flex items-center gap-1 mt-auto"
                  >
                    {c.linkLabel} <ChevronRight size={13} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="bg-navy-900 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-white/70">
            {tp.historyEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-5 mb-12 max-w-2xl">
            {hLine1}
            {hLine2 && (
              <>
                <br />
                {hLine2}
              </>
            )}
          </h2>

          <ol className="list-none m-0 p-0 max-w-3xl">
            {milestones.map((m, i) => (
              <li key={m._id || m.title} className="flex gap-5 pb-10 last:pb-0">
                <div className="flex flex-col items-center shrink-0">
                  <span className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-[11px] font-semibold">
                    {String(m.order ?? i + 1).padStart(2, '0')}
                  </span>
                  {i < milestones.length - 1 && (
                    <span className="flex-1 w-px bg-white/20 mt-2" aria-hidden="true" />
                  )}
                </div>
                <div className="min-w-0 pb-2">
                  <h3 className="font-display text-lg font-semibold mb-2">{m.title}</h3>
                  <p className="text-xs text-white/65 leading-relaxed">{m.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Licence */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                {tp.licenceEyebrow}
              </span>
              <TitleWithHighlight
                text={tp.licenceTitle}
                highlight={tp.licenceTitleHighlight}
                className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-5"
              />
              <p className="text-xs text-ink-600 leading-relaxed">{tp.licenceBody}</p>
            </div>

            <div
              className="h-[280px] rounded-lg bg-gray-200 bg-cover bg-center"
              style={licenceImageUrl ? { backgroundImage: `url('${licenceImageUrl}')` } : undefined}
            />
          </div>

          {licenceRows.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10 pt-8 border-t border-navy-100">
              {licenceRows.map((r) => (
                <div key={r.label}>
                  <p className="text-[9px] font-semibold tracking-widest uppercase text-ink-400 mb-1.5">
                    {r.label}
                  </p>
                  <p className="text-sm text-navy-900">{r.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-navy-900 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-white/70">
            {tp.ctaEyebrow}
          </span>
          <TitleWithHighlight
            text={tp.ctaTitle}
            highlight={tp.ctaTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-5 mb-4"
          />
          <p className="text-sm text-white/75 mb-8 max-w-xl mx-auto leading-relaxed">
            {tp.ctaSubtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {ctaButtons.map((b) => (
              <a
                key={b.label}
                href={b.url || '#'}
                className={`text-sm font-medium px-4 py-2.5 rounded-md transition-colors ${
                  b.primary
                    ? 'bg-sky-600 hover:bg-teal-600 text-white'
                    : 'bg-white hover:bg-gray-100 text-navy-900'
                }`}
              >
                {b.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
