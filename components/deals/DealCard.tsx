import Image from "next/image";

export interface Deal {
  tag: string;
  tagColor: "red" | "teal" | "navy" | "green";
  project: string;
  location: string;
  unitType: string;
  originalPrice: string;
  currentPrice: string;
  saving: string;
  incentives: string[];
  completion: string;
  image?: string;
}

const TAG_COLORS = {
  red: "bg-brand-red",
  teal: "bg-med-teal",
  navy: "bg-med-navy",
  green: "bg-emerald-600",
};

export default function DealCard({ deal }: { deal: Deal }) {
  return (
    <a
      href="#register"
      className="block bg-white rounded-2xl border border-med-border overflow-hidden hover:border-med-teal/50 hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
    >
      {/* Image area */}
      <div className="relative h-[180px] bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
        {deal.image ? (
          <Image
            src={deal.image}
            alt={deal.project}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
            Project Photo
          </div>
        )}

        {/* Tag */}
        <span className={`absolute top-3 left-3 ${TAG_COLORS[deal.tagColor]} text-white text-[10px] font-bold tracking-wide uppercase px-3 py-1.5 rounded-lg`}>
          {deal.tag}
        </span>

        {/* Completion */}
        <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-medium px-2.5 py-1 rounded-lg">
          {deal.completion}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-med-navy text-[17px] font-bold mb-0.5">{deal.project}</h3>
        <p className="text-text-secondary text-[12px] mb-3">
          {deal.location} · {deal.unitType}
        </p>

        {/* Price row */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="text-med-navy text-[21px] font-bold">{deal.currentPrice}</span>
          <span className="text-text-muted text-[13px] line-through">{deal.originalPrice}</span>
          <span className="bg-emerald-50 text-med-teal text-[11px] font-semibold px-2 py-0.5 rounded-md">
            {deal.saving}
          </span>
        </div>

        {/* Incentive tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {deal.incentives.map((inc) => (
            <span
              key={inc}
              className="bg-med-light text-med-navy text-[11px] font-medium border border-med-border px-2 py-1 rounded-md"
            >
              {inc}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="w-full h-[42px] bg-brand-red text-white font-semibold rounded-full flex items-center justify-center text-[14px] group-hover:bg-brand-red-hover transition-colors">
          Get Details & Pricing →
        </div>
      </div>
    </a>
  );
}
