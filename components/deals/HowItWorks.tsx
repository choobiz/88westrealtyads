interface Step {
  title: string;
  desc: string;
}

export default function HowItWorks({ steps }: { steps: Step[] }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[600px] mx-auto px-5">
        <h2 className="text-med-navy text-[22px] md:text-[28px] font-bold text-center mb-10">
          How It Works
        </h2>
        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-med-teal flex items-center justify-center shrink-0">
                <span className="text-white text-[17px] font-bold">{i + 1}</span>
              </div>
              <div className="pt-1">
                <h3 className="text-med-navy text-[16px] font-semibold mb-1">{step.title}</h3>
                <p className="text-text-secondary text-[13px] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
