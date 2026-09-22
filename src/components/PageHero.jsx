import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

// The full-bleed photo hero every inner page opens with (Figma "Frame 2147229563").
//
// 1440 x 767 on desktop and 375 x 767 on mobile, with the transparent navbar laid
// over its top. Content is bottom-aligned with a 72px bottom margin, stacked as:
//   breadcrumb · 277px hairline · eyebrow · title · description · actions
// with 16px between the top items, 24px title→description, 32px →actions.

// Figma: a linear gradient layer at 30% over the photo, stops #000 0% / #333 51% /
// #666 99%. Its handles are fixed in frame-relative coordinates, so the CSS angle
// and stop positions differ between the 1440 and 375 wide frames.
const GRADIENT_DESKTOP =
  'linear-gradient(76deg, rgba(0,0,0,.3) 16.6%, rgba(51,51,51,.3) 56.7%, rgba(102,102,102,.3) 94.4%)';
const GRADIENT_MOBILE =
  'linear-gradient(46.5deg, rgba(0,0,0,.3) 28.5%, rgba(51,51,51,.3) 56.2%, rgba(102,102,102,.3) 82.3%)';

function Slash() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="shrink-0">
      <path d="M10 1.5 4 12.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-base leading-[150%] text-hero">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <Fragment key={`${item.label}-${i}`}>
            {i > 0 && <Slash />}
            {last || !item.to ? (
              <span className={last ? 'font-semibold' : undefined} aria-current={last ? 'page' : undefined}>
                {item.label}
              </span>
            ) : (
              <Link to={item.to} className="hover:underline underline-offset-2">
                {item.label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}

// One hero action. `to` is an in-app route, `href` an external/mailto/tel/PDF link.
// Figma: 44px tall, padding 10/24, radius 6, Inter Medium 16/24. Primary is Eastern
// Blue with a 12px icon gap and arrow; secondary is white with a 20% black hairline.
export function HeroButton({ label, to, href, primary = false, icon = primary, download, className = '' }) {
  const cls = `${className} inline-flex items-center justify-center h-11 px-6 rounded-md text-base leading-[150%] font-medium whitespace-nowrap transition-colors ${
    primary
      ? 'gap-3 bg-teal-500 outline outline-1 -outline-offset-1 outline-teal-500 text-white hover:bg-teal-600'
      : 'gap-2 bg-white outline outline-1 -outline-offset-1 outline-black/20 text-black hover:bg-navy-50'
  }`;
  const content = (
    <>
      {label}
      {icon && <ArrowUpRight size={24} strokeWidth={1.5} className="shrink-0" />}
    </>
  );
  if (to) return <Link to={to} className={cls}>{content}</Link>;
  const external = href && /^https?:/.test(href);
  return (
    <a
      href={href || '#'}
      className={cls}
      download={download}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {content}
    </a>
  );
}

/**
 * @param image        background photo URL (Sanity or /images/… fallback)
 * @param breadcrumb   [{label, to}] — last item is the current page
 * @param eyebrow      small line above the title
 * @param eyebrowStyle 'plain' (18/150) · 'pill' (navy pill) · 'rule' (16 semibold between 80px rules)
 * @param title        72px Playfair title; '\n' forces a line break
 * @param titleWidth   Figma text-box width for the title, so it wraps where the design does
 * @param description  18/150 body under the title
 * @param descriptionWidth Figma text-box width for the description
 * @param actions      [{label, to|href, primary}] — first is usually primary
 * @param children     extra content under the actions (e.g. the Director's credentials)
 * @param height       Tailwind height classes; defaults to the 767px frame
 * @param mobileOverlay how the mobile (375) frame darkens the photo: 'gradient' (the
 *                     desktop gradient), 'gradient-tint' (gradient + 20% black) or
 *                     'dark' (flat 40% black, used by About/History/Director)
 */
export default function PageHero({
  image,
  imagePosition = 'center',
  breadcrumb,
  eyebrow,
  eyebrowStyle = 'plain',
  title,
  titleWidth = 1330,
  description,
  descriptionWidth = 803,
  actions = [],
  // Extra block between the description and the actions (Director credentials).
  details,
  children,
  height = 'h-[767px]',
  mobileOverlay = 'gradient',
  // Mobile title size: most frames use H4 36/130, a few (About, History) use 40/120.
  mobileTitle = 'text-[36px] leading-[130%]',
  // Mobile buttons: 'stack' (one per row, natural width), 'full' (one per row,
  // full width) or 'grid' (two per row; mark one action mobileLast to give it the
  // last row to itself).
  mobileActions = 'stack',
}) {
  return (
    <section
      // mt-12: the photo starts below the 48px utility bar (Figma), while the
      // transparent main nav row still overlays its top.
      className={`relative mt-12 overflow-hidden bg-navy-950 bg-cover ${height}`}
      style={image ? { backgroundImage: `url('${image}')`, backgroundPosition: imagePosition } : undefined}
    >
      {mobileOverlay === 'dark' ? (
        <div className="absolute inset-0 md:hidden bg-black/40" />
      ) : (
        <div className="absolute inset-0 md:hidden" style={{ backgroundImage: GRADIENT_MOBILE }} />
      )}
      {mobileOverlay === 'gradient-tint' && <div className="absolute inset-0 md:hidden bg-black/20" />}
      <div className="absolute inset-0 hidden md:block" style={{ backgroundImage: GRADIENT_DESKTOP }} />

      <div className="relative h-full max-w-[1440px] mx-auto px-5 md:px-[55px] pb-[72px] flex flex-col justify-end text-hero">
        {breadcrumb?.length > 0 && (
          <>
            <Breadcrumb items={breadcrumb} />
            <div className="w-[277px] h-px bg-white/20 my-4" />
          </>
        )}

        {eyebrow &&
          (eyebrowStyle === 'pill' ? (
            <span className="w-fit bg-navy-900 outline outline-1 -outline-offset-1 outline-black/20 rounded-[32px] px-4 py-2.5 text-[10px] md:text-lg leading-[150%] uppercase mb-4">
              {eyebrow}
            </span>
          ) : eyebrowStyle === 'rule' ? (
            // Figma: 80px white rules either side of the tagline, 32px gaps.
            <span className="flex items-center gap-8 text-base leading-[150%] font-semibold uppercase mb-4">
              <span className="block w-11 md:w-20 h-px bg-white" />
              {eyebrow}
              <span className="block w-11 md:w-20 h-px bg-white" />
            </span>
          ) : eyebrowStyle === 'rule-left' ? (
            // Director: a single 80px rule before the tagline.
            <span className="flex items-center gap-8 text-base leading-[150%] font-semibold uppercase mb-4">
              <span className="block w-11 md:w-20 h-px bg-white shrink-0" />
              {eyebrow}
            </span>
          ) : (
            <span className="text-base md:text-lg leading-[150%] mb-4">{eyebrow}</span>
          ))}

        <h1
          className={`font-display font-medium ${mobileTitle} tracking-[-0.01em] md:text-[72px] md:leading-[120%] whitespace-pre-line`}
          style={{ maxWidth: titleWidth }}
        >
          {title}
        </h1>

        {description && (
          <p className="mt-6 text-base md:text-lg leading-[150%] whitespace-pre-line" style={{ maxWidth: descriptionWidth }}>
            {description}
          </p>
        )}

        {details && <div className="mt-8">{details}</div>}

        {actions.length > 0 && (
          <div
            className={`mt-8 gap-4 md:flex md:flex-row md:flex-wrap md:items-center ${
              mobileActions === 'grid'
                ? 'grid grid-cols-2 [&>*]:w-full md:[&>*]:w-auto'
                : mobileActions === 'full'
                  ? 'flex flex-col [&>*]:w-full md:[&>*]:w-auto'
                  : 'flex flex-col items-start'
            }`}
          >
            {actions.map(({ mobileLast, ...a }) => (
              <HeroButton
                key={a.label}
                {...a}
                className={mobileLast ? 'max-md:order-last max-md:col-span-2' : undefined}
              />
            ))}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}

