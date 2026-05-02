const SUB_BLOCKS: { h3: string; paragraphs: string[] }[] = [
  {
    h3: "What a Judicial Sale Is",
    paragraphs: [
      `In British Columbia, a "foreclosure" is technically a judicial sale — a court-supervised process that lets a lender recover its loan when the borrower can't pay. Every step requires a judge's sign-off. That matters because it gives buyers something Ontario's power-of-sale process doesn't: a clear title at closing.`,
      `The mechanics: the lender files for foreclosure, the court orders the property listed with a regular MLS realtor, an offer is accepted subject to court approval, and a hearing date is set in BC Supreme Court (Vancouver registry, usually 4–6 weeks out). The judge reviews the offer, hears any competing bids in person, and awards the sale.`,
      `What you're buying is the property "as is, where is" — meaning the court releases the lender and former owner from any responsibility for the property's condition. That release is the document called Schedule A. We'll get to it in a minute.`,
    ],
  },
  {
    h3: "How the Court Date Can Outbid You",
    paragraphs: [
      `This is the risk no one explains until it's happening to you.`,
      `Once your offer is accepted, you have 4–6 weeks until the court hearing. During that window, the listing stays public. Other buyers can show up at the courthouse on the hearing day with a higher, subject-free offer in hand. The judge usually awards the sale to the highest bid. If two offers are close, the judge can use time-of-first-offer to break the tie — but that's the judge's call, not the seller's.`,
      `Practical translation: if you're not prepared to walk into the courtroom and improve your bid in the moment, you can lose a property you've already paid for inspections and a lawyer on. We attend the hearing on your behalf, with a pre-authorized improvement ceiling you set in writing. Most buyers without a foreclosure-experienced broker don't know this is coming.`,
    ],
  },
  {
    h3: "The Possession Risk Reality",
    paragraphs: [
      `Court approval transfers the title to you. It does not, by itself, remove people from the property.`,
      `In a small share of court-ordered sales, the former owner or a tenant is still living in the home on possession day. Sometimes they leave willingly when title transfers. Sometimes they don't, and the new owner has to go through the BC Residential Tenancy Branch or, for former owners, a writ of possession through the court. That can take 30–90 days and modest legal fees.`,
      `This risk is small but real. Before you submit an offer, we drive by the property, look for signs of occupation, ask the listing realtor on the record, and flag every property in your shortlist as "vacant," "owner-occupied," or "tenanted — [number]-day notice." Investors usually accept this risk for the right price. Owner-occupiers usually want to start with vacant listings, and we screen accordingly.`,
    ],
  },
  {
    h3: "Financing on a Court-Ordered Sale",
    paragraphs: [
      `Yes, you can get a mortgage on a BC court-ordered sale. Most major Canadian banks finance them at standard rates and amortizations. A few B-lenders refuse, which is why your mortgage broker matters more than usual on these files.`,
      `Two operational details to know:`,
      `First, your offer typically needs to go in subject-free at the court date. That means your financing has to be fully approved — not just pre-approved — before subject removal, which compresses the timeline. We introduce you to three Vancouver-area mortgage brokers who close court-ordered files weekly and know the lenders that don't blink at Schedule A.`,
      `Second, appraisals on foreclosed homes can come in low if the property is in rough condition. That's a real risk on detached homes in particular. We help you build a contingency plan — extra deposit, a stretch on the down payment, or a different lender — before you walk into court.`,
    ],
  },
];

export default function ProcessExplainer() {
  return (
    <section id="process" className="bg-eightyw-light py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-eightyw-blue mb-6">
            How BC Court-Ordered Sales Actually Work.
          </h2>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            BC&apos;s foreclosure process isn&apos;t the one you&apos;ve seen on American TV.
            There are no auctions on courthouse steps, no sheriff&apos;s hammer, no
            seizure-and-sell. Every sale is supervised by the BC Supreme Court,
            the title is clean at closing, and the buyer&apos;s rules are specific
            enough to either save or lose you money depending on whether you
            know them. Five minutes of reading here is worth more than a year
            of YouTube.
          </p>
        </div>

        <div className="space-y-10">
          {SUB_BLOCKS.map((block, i) => (
            <article key={i} className="bg-white rounded-2xl border border-eightyw-border p-6 md:p-8">
              <h3 className="text-eightyw-blue text-xl md:text-2xl font-bold mb-4">
                {block.h3}
              </h3>
              <div className="space-y-3 text-text-secondary text-sm md:text-base leading-relaxed">
                {block.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
