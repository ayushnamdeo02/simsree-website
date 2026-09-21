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
      {value}
    </span>
  );

  return (
    // Figma card: 300 tall (220 on mobile), radius 16, padding 32 (16 on mobile), 16px label/value gap, content
    // bottom-anchored; 1px hairline (white/20 on navy, black/20 on white) + "small" shadow.
    <div
      className={`relative rounded-2xl p-4 md:p-8 h-[220px] md:h-[300px] flex flex-col justify-end gap-4 shadow-small outline outline-1 -outline-offset-1 ${
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
