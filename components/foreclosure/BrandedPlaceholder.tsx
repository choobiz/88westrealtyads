import { Home, Building2, Building, Trees } from "lucide-react";

// Reusable 88 West-branded image placeholder for listings without a photo.
// Rendered by InventoryPreview + ForeclosureListExplorer whenever image === "".
// No third-party imagery — just the brand mark, property type, and area.

const ICON: Record<string, typeof Home> = {
  House: Home,
  Condo: Building2,
  Townhouse: Building,
  Land: Trees,
};

export default function BrandedPlaceholder({
  type,
  area,
  size = "card",
}: {
  type: string;
  area?: string;
  size?: "card" | "row";
}) {
  const Icon = ICON[type] ?? Home;

  if (size === "row") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-black">
        <Icon className="w-5 h-5 text-white/70 mb-1" />
        <span className="text-white font-bold text-[10px] tracking-tight leading-none">
          88<span className="text-brand-red">WEST</span>
        </span>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1A1A1A] via-[#141414] to-black text-center px-4">
      <Icon className="w-9 h-9 text-white/55 mb-2" strokeWidth={1.5} />
      <span className="text-white font-extrabold text-lg tracking-tight leading-none">
        88<span className="text-brand-red"> WEST</span>
      </span>
      <span className="text-white/45 text-[9px] font-semibold uppercase tracking-[3px] mt-2">
        {type} · Court-Ordered
      </span>
      <span className="text-white/70 text-[11px] font-medium mt-2 max-w-[88%] truncate">
        {area || "Photo on intro call"}
      </span>
    </div>
  );
}
