import Image from "next/image";
import { COMPANY } from "@/lib/constants";

export default function MedicalFooter() {
  return (
    <footer className="bg-med-navy text-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          <div>
            <Image src="/logo.png" alt={COMPANY.name} width={100} height={40} className="h-9 w-auto" />
            <p className="text-sm text-white/60 mt-3">North Shore&apos;s trusted real estate partner.</p>
            <a href={`tel:${COMPANY.phoneClean}`} className="block text-sm text-white/80 mt-4 hover:text-white">{COMPANY.phone}</a>
            <a href={`mailto:${COMPANY.email}`} className="block text-sm text-white/60 mt-1 hover:text-white">{COMPANY.email}</a>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">Developer</h4>
            <p className="text-sm text-white/60">Cascadia Green Development</p>
            <p className="text-sm text-white/60 mt-1">North Vancouver, BC</p>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4 mt-6">Architect</h4>
            <p className="text-sm text-white/60">SHAPE Architecture</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">Marketed By</h4>
            <p className="text-sm text-white/60">Royal LePage Sussex</p>
            <p className="text-sm text-white/60 mt-1">2397 Marine Drive</p>
            <p className="text-sm text-white/60">West Vancouver, BC V7V 1K9</p>
            <p className="text-sm text-white/60 mt-1">604.493.3002</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">Contact Agents</h4>
            <p className="text-sm text-white/60">Raman Bayanzadeh</p>
            <a href="tel:+17788967592" className="text-sm text-white/60 hover:text-white">778.896.7592</a>
            <p className="text-sm text-white/60 mt-3">Pouria Nikravan</p>
            <a href="tel:+16047830380" className="text-sm text-white/60 hover:text-white">604.783.0380</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 py-5">
          <p className="text-xs text-white/40 text-center max-w-[800px] mx-auto">
            This page is for discussion and general information purposes only and does not constitute an offering for sale. The Project is exempt from the Real Estate Development Marketing Act (British Columbia) pursuant to Section 3 of the Real Estate Development Marketing Regulation.
          </p>
          <div className="flex justify-center gap-4 mt-3">
            <a href="#" className="text-xs text-white/40 hover:text-white/60">Privacy Policy</a>
            <a href="#" className="text-xs text-white/40 hover:text-white/60">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
