import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import { H5, H6 } from './ui';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const ordinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

// Date-block labels from an ISO `date`, or the explicit dayName / dayNum /
// monthLabel / pill fields when the content spells them out.
function dateParts(s) {
  if (s.dayNum) {
    return { dayName: s.dayName, dayNum: s.dayNum, month: s.monthLabel, pill: s.pill || `${s.dayNum} ${s.monthLabel}` };
  }
  const [y, m, d] = (s.date || '').split('-').map(Number);
  if (!y) return { dayName: '', dayNum: '', month: '', pill: '' };
  return {
    dayName: DAYS[new Date(y, m - 1, d).getDay()],
    dayNum: String(d).padStart(2, '0'),
    month: `${MONTHS[m - 1]} ${y}`,
    pill: `${ordinal(d)} ${MONTHS_LONG[m - 1]}`,
  };
}

/**
 * Figma event / session card (Events calendar list, Industry Events Hub).
 * Desktop: 32 padding, 168-wide navy date block (radius 16) with day / 36px
 * number / month, H5 title + 14/150 meta, a 32px plus (minus when open).
 *   compact — open, a 168 square photo sits left of the body, details and button.
 *   wide    — open, a hairline, then body/details/button left of a 380x250 photo.
 * Mobile (both): a small "6th May" date pill, 22px title, a hairline, then the
 * details and a full-width 250px photo. `desktopShadow` off drops the desktop
 * "small" shadow (the Events calendar list has none).
 */
export default function SessionCard({ s, defaultOpen, wide = false, fallbackImage, desktopShadow = true }) {
  const { dayName, dayNum, month, pill } = dateParts(s);
  const photo = s.imageUrl || fallbackImage;
  const hasDetail = s.description || s.detailRows?.length > 0 || s.ctaLabel;

  const body = (
    <div className={`flex-1 min-w-0 flex flex-col gap-4 ${wide ? 'lg:justify-center' : 'lg:py-3.5'}`}>
      {s.description && <p className={`text-base leading-[150%] text-black ${wide ? 'lg:max-w-[549px]' : ''}`}>{s.description}</p>}
      {s.detailRows?.length > 0 && (
        <dl className="m-0 flex flex-col lg:flex-row lg:flex-wrap gap-4 lg:gap-x-12">
          {s.detailRows.map((r) => (
            <div key={r.label} className="text-sm leading-[150%] text-black">
              <dt className="inline font-semibold">{r.label}:</dt> <dd className="inline m-0">{r.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {s.ctaLabel && (
        <a
          href={s.ctaUrl || '#'}
          className="w-fit h-10 px-5 rounded-md bg-navy-900 hover:bg-navy-800 outline outline-1 -outline-offset-1 outline-black/20 text-white text-base leading-[150%] font-medium inline-flex items-center gap-2 transition-colors"
        >
          {s.ctaLabel} <ArrowUpRight size={24} strokeWidth={1.5} />
        </a>
      )}
    </div>
  );
  const image = photo && (
    <div
      className={`h-[250px] shrink-0 rounded-2xl bg-navy-50 bg-cover bg-center ${wide ? 'lg:w-[380px]' : 'lg:w-[168px] lg:h-[168px]'}`}
      style={{ backgroundImage: `url('${photo}')` }}
    />
  );

  return (
    <details
      open={defaultOpen}
      className={`rounded-xl group bg-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small ${desktopShadow ? '' : 'lg:shadow-none'} px-4 py-6 lg:p-8`}
    >
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        {/* Mobile header */}
        <div className="lg:hidden flex flex-col gap-4">
          <div className="flex justify-between gap-4">
            <span className="p-2 rounded-lg bg-navy-900 text-xs leading-[150%] text-white">{pill}</span>
            <Plus size={24} strokeWidth={1.5} className="shrink-0 transition-transform group-open:rotate-45" />
          </div>
          <div className="flex flex-col gap-2">
            <H6 as="h3" className="text-black">
              {s.title}
            </H6>
            {s.meta && <p className="text-sm leading-[150%] text-black">{s.meta}</p>}
          </div>
        </div>
        {/* Desktop header */}
        <div className="max-lg:hidden flex items-center gap-8">
          <div className="w-[168px] shrink-0 min-h-[127px] p-4 rounded-2xl bg-navy-900 text-white flex flex-col items-center justify-center text-center">
            <span className="text-base leading-[150%]">{dayName}</span>
            <span className="font-display font-medium text-[36px] leading-[130%] tracking-[-0.01em]">{dayNum}</span>
            <span className="text-base leading-[150%]">{month}</span>
          </div>
          <div className="flex-1 min-w-0 py-8 flex flex-col gap-2">
            <H5 as="h3" className="text-black">
              {s.title}
            </H5>
            {s.meta && <p className="text-sm leading-[150%] text-black">{s.meta}</p>}
          </div>
          <span className="shrink-0">
            <Plus size={32} strokeWidth={1.5} className="group-open:hidden" />
            <Minus size={32} strokeWidth={1.5} className="hidden group-open:block" />
          </span>
        </div>
      </summary>

      {hasDetail && (
        <div
          className={`mt-8 pt-8 border-t border-black/20 flex flex-col gap-8 ${
            wide ? 'lg:flex-row lg:items-center' : 'lg:pt-0 lg:border-t-0 lg:flex-row'
          }`}
        >
          {wide ? (
            <>
              {body}
              {image}
            </>
          ) : (
            <>
              <div className="order-last lg:order-first">{image}</div>
              {body}
            </>
          )}
        </div>
      )}
    </details>
  );
}
