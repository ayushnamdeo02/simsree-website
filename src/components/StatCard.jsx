export default function StatCard({ label, value, dark = false }) {
  // Figma: Body Regular Normal · 16/150, Colour/Neutral/Base (#7f7f7f).
  const labelEl = (
    <span
      className={`text-base leading-[150%] uppercase ${
        dark ? 'text-ink-50' : 'text-ink-400'
      }`}
    >
      {label}
    </span>
  );
  // Figma: Heading H2 · 52/120, Colour/Neutral/White on navy cards.
  const valueEl = (
    <span
      className={`font-display text-[52px] leading-[120%] font-semibold ${
        dark ? 'text-white' : 'text-navy-900'
      }`}
    >
      {value}
    </span>
  );

  return (
    // 300px tall, 16px radius, 32px padding, content bottom-anchored (Figma)
    <div
      className={`relative rounded-2xl p-8 h-[300px] flex flex-col justify-end gap-2 shadow-md ${
        dark ? 'bg-navy-900 text-white' : 'bg-white'
      }`}
    >
      <span
        className={`absolute top-8 right-8 w-4 h-4 rounded-full ${
          dark ? 'bg-[#D9D9D9]' : 'bg-navy-900'
        }`}
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
