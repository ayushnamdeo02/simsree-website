import PageHero, { HeroButton } from './PageHero';
import TestimonialCarousel from './TestimonialCarousel';
import StatCard from './StatCard';
import { Section, SectionTitle, Heading } from './ui';
import { urlFor } from '../lib/sanity';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';

// The Figma "Campus Life & Facilities New" / "Life @ SIMSREE" layout — both pages
// share it; each passes its own content. `numbers` picks the design's hairline
// tiles ('tiles', Campus Life) or StatCards ('stats', Life).

// Sanity image → URL; fallback entries already carry a /images path.
function imgUrl(image, width) {
  if (!image) return undefined;
  if (typeof image === 'string') return image;
  try {
    return urlFor(image).width(width).auto('format').url();
  } catch {
    return undefined;
  }
}

// Figma "Component": 1280 row, 600x640 photo, 80 gap, 600 copy column.
function PhotoRow({ image, children }) {
  const img = imgUrl(image, 1200);
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
      <div
        className="h-[335px] lg:h-[640px] bg-navy-50 bg-cover bg-center"
        style={img ? { backgroundImage: `url('${img}')` } : undefined}
      />
      <div className="min-w-0 flex flex-col gap-6">{children}</div>
    </div>
  );
}

function Paragraphs({ text = '' }) {
  return (
    <div className="text-base md:text-lg leading-[150%] text-black whitespace-pre-line">
      {text.split('\n\n').map((para, i) => (
        <p key={i} className={i > 0 ? 'mt-[1.5em]' : undefined}>
          {para}
        </p>
      ))}
    </div>
  );
}

export default function CampusStory({
  cp,
  features,
  facilities,
  testimonials,
  heroFallback,
  breadcrumb,
  numbers = 'tiles',
}) {
  return (
    <div>
      <PageHero
        align="center"
        image={heroImage(cp.heroImage, heroFallback, { stretch: true })}
        breadcrumb={breadcrumb}
        eyebrow={cp.heroEyebrow}
        eyebrowUpper
        title={[cp.heroTitle, cp.heroTitleLine2].filter(Boolean).join('\n')}
        titleWidth={640}
        description={cp.heroSubtitle}
        descriptionWidth={569}
        mobileOverlay="gradient-tint"
      />

      {/* The Numbers — Figma "Layout / 141 /": two 600 columns, 80 gap; 284x190
          hairline stat tiles, value H2 52 over a 16 SemiBold label. */}
      <Section width={1280}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <SectionTitle
            tagline={cp.numbersEyebrow}
            title={composeTitle(cp.numbersTitle, cp.numbersTitleHighlight)}
            highlight={cp.numbersTitleHighlight}
            titleClass="text-black"
            body={cp.numbersBody}
            width={600}
          />
          {numbers === 'stats' ? (
            // Life: a 2x2 of StatCards, already in checkerboard order in the data.
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              {(cp.numbersStats || []).map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>
          ) : (
          <div className="grid grid-cols-2 gap-4 md:gap-8">
              {(cp.numbersStats || []).map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col justify-center gap-4 min-h-[150px] md:h-[190px] p-4 md:p-8 bg-white outline outline-1 -outline-offset-1 outline-black/20"
                >
                  <div className="font-display font-medium text-[36px] leading-[130%] md:text-[52px] md:leading-[120%] tracking-[-0.01em] text-black">
                    {s.value}
                  </div>
                  <div className="text-base leading-[150%] font-semibold uppercase text-black">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* Feature rows — Figma "Layout / 218 /": rows 80 apart; 48px numbered circle,
          H2 52 in black, 18/150 copy. */}
      <Section width={1280} className="border-t border-white/20">
        <div className="flex flex-col gap-20">
          {features.map((f) => (
            <PhotoRow key={f._id || f.number} image={f.image}>
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white outline outline-1 -outline-offset-1 outline-navy-900 shadow-[inset_0_1px_2px_rgb(255_255_255/0.25)] text-lg leading-[150%] text-navy-900">
                {f.number}
              </span>
              <Heading text={f.title} className="text-black" as="h3" />
              <Paragraphs text={f.body} />
            </PhotoRow>
          ))}
        </div>
      </Section>

      {/* The Facilities — Figma "Testimonial / 12 /" on #eaeaf1: centred 570 title,
          then photo rows 80 apart. */}
      <Section bg="bg-navy-50" width={1280}>
        <SectionTitle
          center
          width={570}
          tagline={cp.facilitiesEyebrow}
          title={composeTitle(cp.facilitiesTitle, cp.facilitiesTitleHighlight)}
          highlight={cp.facilitiesTitleHighlight}
        />
        <div className="mt-20 flex flex-col gap-20">
          {facilities.map((f) => (
            <PhotoRow key={f._id || f.title} image={f.image}>
              <Heading text={f.title} className="text-black" as="h3" />
              <Paragraphs text={f.description} />
            </PhotoRow>
          ))}
        </div>
      </Section>

      {/* Testimonials — centred 573 title, carousel. */}
      <Section width={1280}>
        <SectionTitle
          center
          width={573}
          tagline={cp.testimonialsEyebrow}
          title={composeTitle(cp.testimonialsTitle, cp.testimonialsTitleHighlight)}
          highlight={cp.testimonialsTitleHighlight}
        />
        <div className="mt-20">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </Section>

      {/* Plan Your Visit — navy "CTA / 57 /": centred 768 column, 32 gaps. */}
      <Section bg="bg-navy-900" width={768} className="text-center">
        <SectionTitle center dark tagline={cp.ctaEyebrow} title={cp.ctaTitle} body={cp.ctaSubtitle} />
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <HeroButton label={cp.ctaPrimaryLabel} to={cp.ctaPrimaryUrl} primary />
          <HeroButton label={cp.ctaSecondaryLabel} to={cp.ctaSecondaryUrl} />
        </div>
      </Section>
    </div>
  );
}
