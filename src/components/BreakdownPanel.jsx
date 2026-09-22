// Horizontal magnitude bars — Figma "Card" (By sector / By role): 32 padding, a
// hairline box, H4 36 title, then rows of 16/150 label · 48 gap · 7px bar on an
// #eaeaf1 track (radius 16) · value. Bars alternate the design's navy gradient and
// Eastern Blue by row, and every bar is labelled with its value, so identity never
// rests on colour alone. Bar length is the value relative to the largest row.
//
// `dark` renders on navy with a lighter pair, since #238bbc reaches only 2.95:1 there.
export default function BreakdownPanel({ title, rows = [], accent = false, dark = false, titleClass, className = '' }) {
  const max = Math.max(...rows.map((r) => r.value), 1);

  const series = dark
    ? ['var(--color-chart-dark-1)', 'var(--color-chart-dark-2)']
    : ['linear-gradient(90deg, #24295c, #2e3474)', '#238bbc'];

  return (
    <figure
      className={`m-0 p-8 flex flex-col gap-6 outline outline-1 -outline-offset-1 ${
        dark ? 'bg-navy-900 outline-white/20' : 'bg-white outline-black/20'
      } ${accent ? 'border-l-[3px] border-l-teal-500' : ''} ${className}`}
    >
      {title && (
        <figcaption
          className={`font-display font-medium text-[28px] leading-[140%] md:text-[36px] md:leading-[130%] tracking-[-0.01em] pb-4 border-b ${
            dark ? 'text-white border-white/20' : `${titleClass || 'text-black'} border-transparent`
          }`}
        >
          {title}
        </figcaption>
      )}
      <div className="flex flex-col gap-4">
        {rows.map((r, i) => (
          <div key={r.label} className="flex items-center gap-6 md:gap-12" title={`${r.label}: ${r.value}%`}>
            <span className={`shrink-0 text-base leading-[150%] ${dark ? 'text-white' : 'text-black'}`}>{r.label}</span>
            <div
              className="flex-1 h-[7px] rounded-2xl overflow-hidden"
              style={{ backgroundColor: dark ? 'var(--color-chart-dark-track)' : '#eaeaf1' }}
            >
              <div
                className="h-full rounded-2xl transition-[width] duration-500"
                style={{ width: `${(r.value / max) * 100}%`, background: series[i % 2] }}
              />
            </div>
            <span className={`shrink-0 text-base leading-[150%] tabular-nums ${dark ? 'text-white' : 'text-black'}`}>
              {r.value}%
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
}
