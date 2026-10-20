import { urlFor } from '../lib/sanity';

// Recruiting-partner tile for the navy logo grids (Placements, Recruiting Partners):
// white-hairline cell, logo in white; hover brings the tile up to white with the
// logo in its own colours. `keepLogoColour` keeps badge logos (e.g. Wells Fargo) in colour.
export default function PartnerTile({ partner: p, className = '' }) {
  const logo = p.logo ? urlFor(p.logo).height(192).auto('format').url() : null;
  return (
    <div
      title={p.sector ? `${p.name} · ${p.sector}` : p.name}
      className={`group rounded-xl outline outline-1 -outline-offset-1 outline-white flex items-center justify-center text-center transition-colors duration-300 hover:bg-white ${className}`}
    >
      {logo ? (
        <img
          src={logo}
          alt={p.name}
          loading="lazy"
          className={`w-full max-h-[72px] object-contain ${p.keepLogoColour ? '' : 'brightness-0 invert transition-[filter] duration-300 group-hover:filter-none'}`}
        />
      ) : (
        <span className="text-xs lg:text-sm leading-[150%] text-white transition-colors duration-300 group-hover:text-navy-900">{p.name}</span>
      )}
    </div>
  );
}
