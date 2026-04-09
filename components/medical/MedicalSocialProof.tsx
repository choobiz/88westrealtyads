import { Building2, Users, TrendingUp, Calendar, DollarSign, AlertTriangle, Activity, Tag, Ruler, Hospital } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  building: Building2,
  users: Users,
  "trending-up": TrendingUp,
  calendar: Calendar,
  dollar: DollarSign,
  alert: AlertTriangle,
  chart: Activity,
  tag: Tag,
  ruler: Ruler,
  hospital: Hospital,
};

interface ProofItem {
  icon: string;
  text: string;
}

export default function MedicalSocialProof({ items }: { items: ProofItem[] }) {
  return (
    <section className="bg-med-navy py-5 md:py-6">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
          {items.map((item, i) => {
            const Icon = ICONS[item.icon] || Building2;
            return (
              <div key={i} className={`flex items-center justify-center gap-2.5 py-2 ${i < items.length - 1 ? "md:border-r md:border-white/15" : ""}`}>
                <Icon className="w-5 h-5 text-med-teal shrink-0" />
                <span className="text-white text-sm font-medium">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
