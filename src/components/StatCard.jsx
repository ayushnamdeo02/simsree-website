import CountUp from './CountUp';

export default function StatCard({ label, value, dark = false }) {
  // Figma: Body Regular Normal · 16/150 — Neutral/Lightest on navy, Neutral/Base on white.
  const labelEl = (
    <span className={`text-base leading-[150%] uppercase ${dark ? 'text-ink-50' : 'text-ink-400'}`}>
      {label}
    </span>
  );
  // Figma: Heading H2 · Playfair Medium 52/120, -0.5 tracking.
  const valueEl = (
    <span
      className={`font-display text-[36px] leading-[130%] md:text-[52px] md:leading-[120%] tracking-[-0.01em] font-medium ${
        dark ? 'text-white' : 'text-navy-900'
      }`}
    >
      <CountUp value={value} />
    </span>
  );

  return (
    // Figma card, shortened to a landscape rectangle: the 300px (220 mobile)
    // frame left a lot of empty space above the number. min-h keeps every card
    // in a row the same height while long labels can still grow the row.
    <div
      className={`relative rounded-2xl p-4 md:p-8 min-h-[140px] md:min-h-[190px] flex flex-col justify-end gap-2 md:gap-4 shadow-small outline outline-1 -outline-offset-1 ${
        dark ? 'bg-navy-900 text-white outline-white/20' : 'bg-white outline-black/20'
      }`}
    >
      <span
        className={`absolute top-4 right-4 md:top-8 md:right-8 w-4 h-4 rounded-full ${dark ? 'bg-[#D9D9D9]' : 'bg-navy-900'}`}
      />
      {/* Navy cards read label -> value; white cards read value -> label (Figma) */}
      {dark ? (
        <>
          {labelEl}
          {valueEl}
        </>
      ) : (
        <>
          {valueEl}
          {labelEl}
        </>
      )}
    </div>
  );
}

// The four-card stats row. Figma: 1280 row, 32 gap on desktop; on mobile a 2x2
// grid with 16 gap whose colours checkerboard (navy/white, white/navy), so the
// third and fourth cards trade places below lg.
export function StatGrid({ stats = [], className = '' }) {
  return (
    <div
      className={`max-w-[1280px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-lg:[&>*:nth-child(3)]:order-last ${className}`}
    >
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
}
