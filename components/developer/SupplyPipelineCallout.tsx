export default function SupplyPipelineCallout() {
  return (
    <section className="bg-eightyw-blue py-14 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 via-transparent to-brand-red/5 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <p className="text-brand-red text-[13px] font-semibold uppercase tracking-[2px] mb-4">
          THE WINDOW IS OPEN — AND CLOSING
        </p>
        <p className="text-white text-2xl md:text-4xl font-bold leading-tight mb-4">
          5,458 unsold condos. Only 64 new pre-sales launched in February.
        </p>
        <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Today&apos;s incentive stacks exist because of today&apos;s standing inventory. Once it
          clears — and supply three years out is already shrinking — the stacks come off and the
          supply cliff hits.
        </p>
        <p className="text-white/40 text-xs mt-5">
          Sources: CMHC absorption data; BCREA Q1 2026 forecast.
        </p>
      </div>
    </section>
  );
}
