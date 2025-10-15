export default function InsightsCard({ title, children, className = "" }) {
  return (
    <section
      className={`bg-white rounded-2xl border border-gray-200 shadow-sm transition hover:shadow-md ${className}`}
    >
      <header className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}
