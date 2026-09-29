import { useFigmaWrap } from '../lib/useFigmaWrap';

// Shared building blocks taken 1:1 from the Figma design system, so every page
// uses the same measurements. Desktop values first, mobile in the comments.

// Section frame: 80 top/bottom (tightened from Figma's 112), 64 sides on the 1440
// frame; 48/20 on 375.
// `width` is the inner content width on desktop (1312 = 1440 - 2*64, 1280 for
// the centred "Container" sections).
export function Section({ bg = 'bg-white', width = 1312, className = '', innerClassName = '', id, children }) {
  return (
    <section id={id} className={`${bg} px-5 py-12 md:px-16 md:py-20 ${className}`}>
      <div className={`mx-auto ${innerClassName}`} style={{ maxWidth: width }}>
        {children}
      </div>
    </section>
  );
}

// Figma "Heading/Tagline": Inter SemiBold 16/150, uppercase.
export function Tagline({ children, className = 'text-black', as: Tag = 'span' }) {
  return <Tag className={`block text-base leading-[150%] font-semibold uppercase ${className}`}>{children}</Tag>;
}

// Colours `highlight` teal inside `text`; appends it if it isn't part of the text.
// Matching ignores the difference between plain and non-breaking spaces.
const normSpaces = (s) => s.replace(/\u00a0/g, ' ');
export function Highlighted({ text = '', highlight, highlightClass = 'text-teal-500' }) {
  const idx = highlight ? normSpaces(text).indexOf(normSpaces(highlight)) : -1;
  if (!highlight) return text;
  if (idx === -1)
    return (
      <>
        {text} <span className={highlightClass}>{highlight}</span>
      </>
    );
  return (
    <>
      {text.slice(0, idx)}
      <span className={highlightClass}>{highlight}</span>
      {text.slice(idx + highlight.length)}
    </>
  );
}

// Figma "Heading H2": Playfair Medium 52/120, -1% tracking; H4 36/130 on mobile.
export function Heading({ text, highlight, className = 'text-navy-900', as: Tag = 'h2', highlightClass }) {
  const figmaWrap = useFigmaWrap();
  return (
    <Tag
      className={`font-display font-medium text-[36px] leading-[130%] md:text-[52px] md:leading-[120%] tracking-[-0.01em] whitespace-pre-line ${className}`}
    >
      <Highlighted text={figmaWrap(text)} highlight={highlight} highlightClass={highlightClass} />
    </Tag>
  );
}

// Figma "Heading H5": Playfair Medium 28/140, -1% tracking.
export function H5({ children, className = 'text-navy-900', as: Tag = 'h3' }) {
  return (
    <Tag className={`font-display font-medium text-[28px] leading-[140%] tracking-[-0.01em] ${className}`}>
      {children}
    </Tag>
  );
}

// Figma "Heading/H6": Playfair Medium 22/140, -1% tracking.
export function H6({ children, className = 'text-navy-900', as: Tag = 'h4' }) {
  return (
    <Tag className={`font-display font-medium text-[22px] leading-[140%] tracking-[-0.01em] ${className}`}>
      {children}
    </Tag>
  );
}

// Tagline + H2 + optional body, the header most sections open with.
// Figma: 16 (tagline→title; 12 on mobile) and 24 (title→body; 20 on mobile).
// Body is Text/Medium 18/150 on desktop and 16/150 on mobile.
export function SectionTitle({
  tagline,
  title,
  highlight,
  body,
  center = false,
  dark = false,
  taglineClass,
  titleClass,
  bodyClass,
  width = 768,
  className = '',
}) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} ${className}`} style={{ maxWidth: width }}>
      {tagline && <Tagline className={taglineClass ?? (dark ? 'text-white' : 'text-black')}>{tagline}</Tagline>}
      <Heading
        text={title}
        highlight={highlight}
        className={`${tagline ? 'mt-3 md:mt-4' : ''} ${titleClass ?? (dark ? 'text-white' : 'text-navy-900')}`}
      />
      {body && (
        <p
          className={`mt-5 md:mt-6 text-base md:text-lg leading-[150%] whitespace-pre-line ${
            bodyClass ?? (dark ? 'text-white' : 'text-black')
          }`}
        >
          {body}
        </p>
      )}
    </div>
  );
}

// Card with a 3px coloured bar down its left edge (Figma "Frame 2147229900"):
// 1px black/20 hairline, "small" shadow, content inset 32 from the bar.
export function AccentCard({ accent = 'bg-teal-500', bg = 'bg-white', className = '', children }) {
  return (
    <div className={`rounded-lg overflow-hidden relative flex ${bg} outline outline-1 -outline-offset-1 outline-black/20 shadow-small ${className}`}>
      <span className={`w-[3px] shrink-0 ${accent}`} aria-hidden="true" />
      <div className="flex-1 min-w-0 py-8 pl-8 pr-8">{children}</div>
    </div>
  );
}

// Figma "Tag": 29 tall, padding 4/10, radius 16, 1px black/20 hairline, Inter 14/150 navy.
export function Tag({ children, className = 'bg-white text-navy-900' }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-2xl outline outline-1 -outline-offset-1 outline-black/20 text-sm leading-[150%] ${className}`}
    >
      {children}
    </span>
  );
}
