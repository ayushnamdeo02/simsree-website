// Horizontal magnitude bars — Figma "Card" (By sector / By role / Academic
// background): 32 padding, a hairline box, H4 36 title, then rows of 16/150 label ·
// 48 gap · 7px bar on an #eaeaf1 track (radius 16) · value. Every bar is labelled
// with its value, so identity never rests on colour alone. Bar length is the value
// relative to the largest row.
//
// Colour: by default bars alternate the navy gradient and Eastern Blue by row (Why
// Recruit, Reports). `mono` uses one series per panel as Batch Profile does: the
// navy gradient on white, and on `dark` (navy) panels an Eastern Blue gradient.
const NAVY = 'linear-gradient(90deg, #24295c, #2e3474)';
const TEAL = 'linear-gradient(90deg, #238bbc, #65add0)';

export default function BreakdownPanel({
  title,
  rows = [],
  accent = false,
  dark = false,
  mono = false,
  upperLabels = false,
  titleClass,
  className = '',
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  const fill = (i) => (mono ? (dark ? TEAL : NAVY) : dark ? ['var(--color-chart-dark-1)', 'var(--color-chart-dark-2)'][i % 2] : [NAVY, '#238bbc'][i % 2]);
  const track = dark && !mono ? 'var(--color-chart-dark-track)' : '#eaeaf1';
  const text = dark ? 'text-white' : 'text-black';

  return (
    <figure
      className={`rounded-xl m-0 p-8 flex flex-col gap-6 outline outline-1 -outline-offset-1 outline-black/20 ${dark ? 'bg-navy-900' : 'bg-white'} ${
        accent ? 'border-l-[3px] border-l-teal-500' : ''
      } ${className}`}
    >
      {title && (
        <figcaption
          className={`font-display font-medium text-[28px] leading-[140%] md:text-[36px] md:leading-[130%] tracking-[-0.01em] pb-4 border-b ${
            dark ? 'text-white border-white/20' : `${titleClass || 'text-black'} border-black/20`
          }`}
        >
          {title}
        </figcaption>
      )}
      <div className="flex flex-col gap-4">
        {rows.map((r, i) => (
          <div key={r.label} className="flex items-center gap-6 md:gap-12" title={`${r.label}: ${r.value}%`}>
            <span className={`shrink-0 text-base leading-[150%] ${upperLabels ? 'uppercase' : ''} ${text}`}>{r.label}</span>
            <div className="flex-1 h-[7px] rounded-2xl overflow-hidden" style={{ backgroundColor: track }}>
              <div
                className="h-full rounded-2xl transition-[width] duration-500"
                style={{ width: `${(r.value / max) * 100}%`, background: fill(i) }}
              />
            </div>
            <span className={`shrink-0 text-base leading-[150%] tabular-nums ${text}`}>{r.value}%</span>
          </div>
        ))}
      </div>
    </figure>
  );
}
