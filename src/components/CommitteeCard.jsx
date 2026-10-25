import { Link } from 'react-router-dom';
import { urlFor } from '../lib/sanity';
import { committeeHref } from '../lib/committeeHref';

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

// Committee logo: the Studio logo, or (on the code fallback, which has no _id) the
// local copy in /images/committees.
function logoUrl(c, slug) {
  if (c.logo) {
    try {
      return urlFor(c.logo).width(568).height(568).fit('max').auto('format').url();
    } catch {
      /* fall through */
    }
  }
  return !c._id && slug ? `/images/committees/logo-${slug}.webp` : null;
}

// Figma committee directory card: a 284-wide hairline box, the committee logo on a
// white square (or the photo when there is no logo), then the category tag, name
// and description, 16 padded.
export default function CommitteeCard({ committee: c, className = '' }) {
  const slug = c.slug?.current || c.slug;
  const logo = logoUrl(c, slug);
  const img = logo ? null : photoUrl(c);
  return (
    <Link
      to={committeeHref(slug) || '#'}
      className={`group flex flex-col rounded-lg bg-white overflow-hidden outline outline-1 -outline-offset-1 outline-black/10 shadow-small transition-shadow hover:shadow-medium ${className}`}
    >
      {logo ? (
        <div className="aspect-square bg-white p-4 flex items-center justify-center overflow-hidden">
          <img src={logo} alt={`${c.name} logo`} loading="lazy" className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
        </div>
      ) : (
        <div
          className="aspect-square bg-navy-50 bg-cover bg-center transition-opacity group-hover:opacity-90"
          style={img ? { backgroundImage: `url('${img}')` } : undefined}
        />
      )}
      <div className="flex-1 flex flex-col gap-4 p-4 pt-2">
        <span
          className={`w-fit px-2.5 py-1 rounded-2xl text-sm leading-[150%] uppercase ${
            CATEGORY_TAG[c.category] || CATEGORY_TAG.Corporate
          }`}
        >
          {c.category}
        </span>
        <div className="text-black">
          <p className="text-xl md:text-[22px] leading-[150%] font-semibold group-hover:underline underline-offset-4">{c.name}</p>
          <p className="text-base leading-[150%]">{c.description}</p>
        </div>
      </div>
    </Link>
  );
}
