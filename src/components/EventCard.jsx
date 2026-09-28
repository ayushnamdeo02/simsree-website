import { Link } from 'react-router-dom';

// Date badge carries day / date / "MONTH YEAR"; the CTA sits under the meta line (Figma).
export default function EventCard({ day, date, month, year, title, meta, cta, link, solidCta = false }) {
  const ctaClasses = solidCta
    ? 'bg-sky-600 hover:bg-teal-600 text-white'
    : 'border border-navy-100 hover:bg-navy-50 text-navy-900';

  return (
    // Figma: 624x191 card, radius 0, stroke Border Outside 1, small shadow, padding 32, gap 32.
    <div className="rounded-xl flex items-start gap-8 bg-white outline outline-1 outline-black/15 shadow-sm p-8 min-w-0">
      <div className="bg-navy-900 text-white rounded-2xl w-[104px] py-4 flex flex-col items-center justify-center shrink-0">
        <span className="text-base leading-[150%]">{day}</span>
        {/* Figma: Heading/H4 36/130, Colour/Neutral/White. */}
        <span className="font-display text-4xl leading-[130%] font-semibold">{date}</span>
        <span className="text-base leading-[150%] uppercase whitespace-nowrap">
          {month}
          {year ? ` ${year}` : ''}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        {/* Figma: Heading/H6 22/140, Color Scheme 1/Text. */}
        <h4 className="font-display text-xl md:text-[22px] md:leading-[140%] font-medium text-black">{title}</h4>
        {/* Figma: Text/Medium/Normal 18/150, Color Scheme 1/Text. */}
        <p className="text-lg leading-[150%] text-black mt-2">{meta}</p>
        {cta && (
          <Link
            to={link || '/events'}
            className={`inline-block text-base leading-[150%] font-medium px-6 py-2.5 rounded-md mt-4 transition-colors ${ctaClasses}`}
          >
            {cta}
          </Link>
        )}
      </div>
    </div>
  );
}
