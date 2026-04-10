interface StatItem {
  value: string;
  label: string;
}

export default function StatsBar({ items }: { items: StatItem[] }) {
  return (
    <section className="bg-med-teal py-4 md:py-5">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className={`grid grid-cols-${Math.min(items.length, 2)} md:grid-cols-${items.length} gap-4 md:gap-0`}>
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center py-2 ${
                i < items.length - 1 ? "md:border-r md:border-white/15" : ""
              }`}
            >
              <span className="text-white text-[17px] md:text-[20px] font-bold">{item.value}</span>
              <span className="text-white/70 text-[10px] md:text-[11px]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
