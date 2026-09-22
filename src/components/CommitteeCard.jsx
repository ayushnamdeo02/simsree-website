import { Link } from 'react-router-dom';
import { urlFor } from '../lib/sanity';

// Figma tag colours per committee category.
const CATEGORY_TAG = {
  Corporate: 'bg-navy-50 text-navy-900',
  Academic: 'bg-[#1fc16b]/10 text-[#1fc16b]',
  Cultural: 'bg-sky-50 text-teal-500',
  Social: 'bg-sky-50 text-teal-500',
  Leadership: 'bg-[#ffdb43]/10 text-[#dfb400]',
};

function photoUrl(c) {
  if (c.image) {
    try {
      return urlFor(c.image).width(568).height(568).fit('crop').auto('format').url();
    } catch {
      /* fall through to the Figma photo */
    }
  }
  const slug = c.slug?.current || c.slug;
  return slug ? `/images/committees/card-${slug}.webp` : undefined;
}

// Figma committee directory card: 284 wide, 284 square photo, 24 gap, then a
// category tag, Inter SemiBold 22/150 name and 18/150 description (16 gap).
export default function CommitteeCard({ committee: c, className = '' }) {
  const slug = c.slug?.current || c.slug;
  const img = photoUrl(c);
  return (
    <Link to={slug ? `/students/committees/${slug}` : '#'} className={`group flex flex-col gap-6 ${className}`}>
      <div
        className="aspect-square bg-navy-50 bg-cover bg-center transition-opacity group-hover:opacity-90"
        style={img ? { backgroundImage: `url('${img}')` } : undefined}
      />
      <div className="flex flex-col gap-4">
        <span
          className={`w-fit px-2.5 py-1 rounded-2xl text-sm leading-[150%] uppercase ${
            CATEGORY_TAG[c.category] || CATEGORY_TAG.Corporate
          }`}
        >
          {c.category}
        </span>
        <div className="text-black">
          <p className="text-[22px] leading-[150%] font-semibold group-hover:underline underline-offset-4">{c.name}</p>
          <p className="text-base md:text-lg leading-[150%]">{c.description}</p>
        </div>
      </div>
    </Link>
  );
}
