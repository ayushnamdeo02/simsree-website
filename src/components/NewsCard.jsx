import { Download, ArrowRight } from 'lucide-react';

// Figma: 624 x 328 card, radius 0, no padding, stroke #000 at 15%, small shadow.
// The 192px image column is flush to the edge and fills the full card height.
export default function NewsCard({ tag, title, date, image, actionLabel = 'Read more', download = false }) {
  return (
    <div className="group rounded-lg flex bg-white border border-black/15 shadow-sm overflow-hidden md:h-[328px]">
      <div className="w-28 md:w-[192px] shrink-0 bg-gray-100 overflow-hidden">
        {image && <img src={image} alt="" className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.65,0.3,1)] motion-safe:group-hover:scale-[1.06]" />}
      </div>
      <div className="flex-1 min-w-0 px-8 py-7 flex flex-col justify-center">
        {/* Figma: 88x26 pill, padding 10/4, radius 16, Astronaut/Light fill */}
        <span className="inline-block w-fit text-xs uppercase tracking-wide text-navy-800 bg-navy-50 px-2.5 py-1 rounded-2xl mb-4">
          {tag}
        </span>
        <h4 className="font-display text-2xl md:text-[28px] md:leading-[130%] font-semibold text-navy-900">
          {title}
        </h4>
        {/* Figma: Text/Small/Normal 14/150, Color Scheme 1/Text */}
        <p className="text-sm leading-[150%] text-black mt-3">{date}</p>
        {/* Figma: Text/Regular/Medium 16/150, Color/Neutral Darkest */}
        <button className="flex items-center gap-2 text-base leading-[150%] font-medium text-black border border-black/15 rounded-md px-5 py-3 mt-6 w-fit hover:bg-gray-50 transition-colors">
          {actionLabel}
          {download ? <Download size={16} /> : <ArrowRight size={16} />}
        </button>
      </div>
    </div>
  );
}
