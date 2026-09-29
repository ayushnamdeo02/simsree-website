export default function PageStub({ title }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <span className="text-xs font-semibold tracking-widest uppercase text-navy-700">Coming Up</span>
      <h1 className="font-display text-3xl font-semibold text-ink-900 mt-2 mb-3">{title}</h1>
      <p className="text-ink-600">
        This page is scaffolded and routed - the detailed layout for this section will be built once we go
        through its Figma design.
      </p>
    </div>
  );
}
