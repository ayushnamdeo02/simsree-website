import PageHero from '../components/PageHero';
import { Section, Heading } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { urlFor } from '../lib/sanity';
import { useCareerCatalystData } from '../lib/useCareerCatalystData';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

// Built-in copy, used until (and wherever) the Studio page is empty.
const fallbackPage = {
  heroTitle: 'Career Catalyst Program',
  heroDescription: 'Learning from experienced industry professionals to build career-ready skills.',
  introTitle: 'Learning from',
  introTitleHighlight: 'Industry Leaders.',
  introLead:
    "The institute has started the 'Career Catalyst Program', an initiative aimed at providing our students with invaluable insights from distinguished industry experts.",
  introBody:
    "The program's primary objective is to offer students a profound understanding of an expert's approach to work, thereby enhancing their professional perspectives. Maximum emphasis is provided by having a detailed workshop oriented approach where esteemed individuals share their lifelong learnings with the batch without any filter and get into the nitty gritty aspects of building successful businesses. Simarthan foundation (an alumni body of the institute) played an instrumental role in helping us shape this program. We were honored to host esteemed guests as part of this initiative, including Mr. Rajesh Srivastava and Mr. Manish Agarwal, who generously shared their wealth of knowledge and experience.",
  momentsTitle: 'Moments from the',
  momentsTitleHighlight: 'Career Catalyst Program.',
  momentsBody:
    "Mr. Rajesh Srivastava, a distinguished graduate from IIM Bangalore with over three decades of corporate and academic expertise, played a pivotal role in creating some of India's most recognized alcohol brands. His session, titled 'How to Create Winning Brands in India', provided our students with valuable insights into brand creation and management. Mr. Manish Agarwal, co-founder of AskHow and a visiting faculty at various esteemed institutions, brought over 25 years of infrastructure sector consulting experience to his session. His session on 'Making sense of a Connected World - An introduction to System Thinking, illustrated through the Economy-Energy-Emission system' provided a holistic understanding of complex public policy issues. The sessions were structured to include the experts' sharing of their diverse corporate experiences, providing invaluable guidance to students in their respective domains. The wide range of knowledge shared during these sessions has allowed our students to gain profound insights into their career-building paths.",
};

// Placeholder photos from the site's own library until real ones are uploaded.
const HERO_FALLBACK = '/images/events/dev-mdp.webp';
const INTRO_FALLBACK = [
  '/images/events/prog-1.webp',
  '/images/placements/engagement-hero.webp',
  '/images/events/prog-3.webp',
  '/images/placements/partners-hero.webp',
];
const MOMENTS_FALLBACK = '/images/events/dev-hero.webp';

function imgUrl(image, width) {
  if (!image) return undefined;
  try {
    return urlFor(image).width(width).auto('format').url();
  } catch {
    return undefined;
  }
}

export default function CareerCatalyst() {
  const facts = useKeyFacts();
  const { data } = useCareerCatalystData();
  const cp = fillFactsDeep({ ...fallbackPage, ...(data || {}) }, facts);
  const introImages = INTRO_FALLBACK.map((src, i) => imgUrl(cp.introImages?.[i], 640) || src);
  const momentsImage = imgUrl(cp.momentsImage, 1300) || MOMENTS_FALLBACK;

  return (
    <div>
      <PageHero
        image={heroImage(cp.heroImage, HERO_FALLBACK, { stretch: true })}
        title={cp.heroTitle}
        titleWidth={1100}
        description={cp.heroDescription}
        descriptionWidth={628}
      />

      {/* Learning from Industry Leaders — copy column beside a 2x2 photo grid. */}
      <Section width={1280}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-6">
            <Heading text={`${cp.introTitle}\n${cp.introTitleHighlight}`} highlight={cp.introTitleHighlight} />
            <p className="font-display font-medium text-[20px] md:text-[22px] leading-[140%] tracking-[-0.01em] text-black">
              {cp.introLead}
            </p>
            <p className="text-base leading-[150%] text-black whitespace-pre-line">{cp.introBody}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {introImages.map((src, i) => (
              <div
                key={i}
                className="aspect-[0.95] rounded-2xl bg-navy-50 bg-cover bg-center"
                style={{ backgroundImage: `url('${src}')` }}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Moments — one framed card: a large photo beside the session write-up. */}
      <Section width={1280}>
        <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden outline outline-1 -outline-offset-1 outline-black/15 shadow-small">
          <div
            className="h-[320px] lg:h-auto lg:min-h-[640px] lg:w-[48%] shrink-0 bg-navy-50 bg-cover bg-center"
            style={{ backgroundImage: `url('${momentsImage}')` }}
          />
          <div className="flex flex-col justify-center gap-6 p-6 md:p-10 lg:p-12">
            <Heading text={`${cp.momentsTitle}\n${cp.momentsTitleHighlight}`} highlight={cp.momentsTitleHighlight} />
            <p className="text-base leading-[150%] text-black whitespace-pre-line">{cp.momentsBody}</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
