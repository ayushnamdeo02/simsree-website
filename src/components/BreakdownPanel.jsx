// Horizontal magnitude bars. Colour alternates across two series hues validated
// for CVD separation and contrast against the panel's own surface (see the
// --color-chart-* tokens in index.css); it is assigned by row position and never
// cycled beyond the pair. Every bar is also directly labelled with its value, so
// identity never rests on colour alone.
//
// `dark` swaps in the navy-surface pair — the light pair's #238bbc reaches only
// 2.95:1 on navy, below the 3:1 mark minimum.
export default function BreakdownPanel({
  title,
  rows = [],
  accent = false,
  dark = false,
  className = '',
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);

  const series = dark
    ? ['var(--color-chart-dark-1)', 'var(--color-chart-dark-2)']
    : ['var(--color-chart-1)', 'var(--color-chart-2)'];

  return (
    <figure
      className={`rounded-lg p-8 m-0 border ${
        dark ? 'bg-navy-900 border-navy-900' : 'border-navy-100'
      } ${accent ? 'border-l-2 border-l-sky-600' : ''} ${className}`}
    >
      {title && (
        <figcaption
          className={`font-display text-2xl font-semibold mb-6 pb-4 border-b ${
            dark ? 'text-white border-white/15' : 'text-navy-900 border-navy-100'
          }`}
        >
          {title}
        </figcaption>
      )}
      <div className="flex flex-col gap-4">
        {rows.map((r, i) => (
          <div
            key={r.label}
            className="flex items-center gap-4"
            title={`${r.label}: ${r.value}%`}
          >
            <span
              className={`w-[150px] shrink-0 text-[10px] uppercase tracking-wide truncate ${
                dark ? 'text-white/70' : 'text-ink-600'
              }`}
            >
              {r.label}
            </span>
            <div
              className="flex-1 h-1.5 rounded-full overflow-hidden"
              style={{
                backgroundColor: dark
                  ? 'var(--color-chart-dark-track)'
                  : 'var(--color-chart-track)',
              }}
            >
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{
                  width: `${(r.value / max) * 100}%`,
                  backgroundColor: series[i % 2],
                }}
              />
            </div>
            <span
              className={`w-10 shrink-0 text-right text-xs font-medium tabular-nums ${
                dark ? 'text-white' : 'text-navy-900'
              }`}
            >
              {r.value}%
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
}
