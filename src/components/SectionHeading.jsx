export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  highlight,
  // Force a line break just before the highlighted word (desktop only), so the
  // heading wraps exactly as designed instead of following font metrics.
  breakBeforeHighlight = false,
}) {
  // The highlighted word may sit inside the title ("...other B-schools can't give you.")
  // or be appended to it; split in place when it's found.
  const idx = highlight ? title.indexOf(highlight) : -1;
  const heading =
    idx === -1 ? (
      <>
        {title}
        {highlight && <span className="text-teal-500"> {highlight}</span>}
      </>
    ) : (
      <>
        {title.slice(0, idx).trimEnd()}
        {breakBeforeHighlight ? <br className="hidden md:block" /> : ' '}
        <span className="text-teal-500">{highlight}</span>
        {title.slice(idx + highlight.length)}
      </>
    );

  return (
    <div className={center ? 'text-center max-w-[768px] mx-auto' : ''}>
      {/* Figma: Heading/Tagline 16/150, Color Scheme 1/Text. */}
      {eyebrow && (
        <span className="text-base leading-[150%] font-semibold uppercase text-black">{eyebrow}</span>
      )}
      <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-6">{heading}</h2>
      {/* Figma: Text/Medium/Normal 18/150, Color Scheme 1/Text. */}
      {subtitle && <p className="text-lg leading-[150%] text-black mt-6">{subtitle}</p>}
    </div>
  );
}
