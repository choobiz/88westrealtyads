const SAMPLE_LISTINGS: {
  type: string;
  area: string;
  street: string;
  beds: string;
  baths: string;
  sqft: string;
  listed: string;
  assessed: string;
  courtDate: string;
  daysOnMarket: number;
  tag: string;
}[] = [
  {
    type: "Detached",
    area: "Vancouver (Hastings-Sunrise)",
    street: "████ E 26th Ave, Vancouver",
    beds: "4 bed", baths: "2 bath", sqft: "1,820 sqft",
    listed: "$1.28M", assessed: "$1.42M", courtDate: "Jul 15",
    daysOnMarket: 142, tag: "Schedule A required",
  },
  {
    type: "Townhouse",
    area: "Burnaby (Highgate)",
    street: "████ Marlborough Ave, Burnaby",
    beds: "3 bed", baths: "2.5 bath", sqft: "1,510 sqft",
    listed: "$898K", assessed: "$964K", courtDate: "Jun 28",
    daysOnMarket: 87, tag: "Vacant — easy showings",
  },
  {
    type: "Condo",
    area: "Richmond (Brighouse)",
    street: "████ No. 3 Rd, Richmond",
    beds: "2 bed", baths: "2 bath", sqft: "905 sqft",
    listed: "$649K", assessed: "$702K", courtDate: "Jul 8",
    daysOnMarket: 113, tag: "Owner-occupier friendly",
  },
  {
    type: "Detached",
    area: "North Vancouver (Lynn Valley)",
    street: "████ Mountain Hwy, North Vancouver",
    beds: "5 bed", baths: "3 bath", sqft: "2,640 sqft",
    listed: "$1.80M", assessed: "$1.95M", courtDate: "Aug 12",
    daysOnMarket: 168, tag: "Tenanted — 60-day notice",
  },
  {
    type: "Condo",
    area: "Vancouver (Mount Pleasant)",
    street: "████ Quebec St, Vancouver",
    beds: "1 bed + den", baths: "1 bath", sqft: "712 sqft",
    listed: "$568K", assessed: "$612K", courtDate: "Jun 18",
    daysOnMarket: 96, tag: "First-time buyer eligible",
  },
  {
    type: "Half-duplex",
    area: "Burnaby (East Burnaby)",
    street: "████ 14th Ave, Burnaby",
    beds: "4 bed", baths: "3 bath", sqft: "2,180 sqft",
    listed: "$1.15M", assessed: "$1.24M", courtDate: "Jul 22",
    daysOnMarket: 124, tag: "Schedule A required",
  },
];

export default function InventoryPreview() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-eightyw-blue mb-4">
            This Week&apos;s Greater Vancouver Court-Ordered Sample.
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Six current listings from the Sheet. Addresses are masked until you subscribe —
            court files are public, but we don&apos;t run a billboard. The full list lands in
            your inbox every business morning.
          </p>
        </div>

        <p className="text-center text-xs text-text-muted mb-8">
          Sample data refreshed weekly. Full list — including unmasked addresses,
          photos, court file numbers, and BC Assessment deltas — emailed every business morning to subscribers.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {SAMPLE_LISTINGS.map((l, i) => (
            <article
              key={i}
              className="bg-white border border-eightyw-border rounded-2xl p-5 hover:shadow-lg hover:border-eightyw-cta/40 transition-all"
            >
              <div className="flex items-start justify-between mb-3 gap-3">
                <div>
                  <p className="text-xs font-semibold text-eightyw-cta uppercase tracking-wider">
                    {l.type}
                  </p>
                  <p className="text-eightyw-blue font-bold text-base mt-0.5">{l.area}</p>
                </div>
                <span className="px-2 py-1 bg-eightyw-light text-eightyw-blue text-[10px] font-semibold rounded-full whitespace-nowrap">
                  {l.daysOnMarket} DOM
                </span>
              </div>
              <p className="text-text-secondary text-sm mb-3 font-mono">{l.street}</p>
              <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-eightyw-border">
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">Beds</p>
                  <p className="text-eightyw-blue font-semibold text-sm">{l.beds}</p>
                </div>
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">Baths</p>
                  <p className="text-eightyw-blue font-semibold text-sm">{l.baths}</p>
                </div>
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">Size</p>
                  <p className="text-eightyw-blue font-semibold text-sm">{l.sqft}</p>
                </div>
              </div>
              <div className="space-y-1.5 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Listed</span>
                  <span className="text-eightyw-blue font-bold">{l.listed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Last assessed</span>
                  <span className="text-eightyw-blue font-semibold">{l.assessed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Court date</span>
                  <span className="text-brand-red font-semibold">{l.courtDate}</span>
                </div>
              </div>
              <span className="inline-block px-3 py-1 bg-brand-red/10 text-brand-red text-[11px] font-semibold rounded-full">
                {l.tag}
              </span>
            </article>
          ))}
        </div>

        <div className="bg-eightyw-light border border-eightyw-border rounded-2xl p-6 mb-10">
          <h3 className="text-eightyw-blue font-bold text-sm uppercase tracking-wider mb-3">Card legend</h3>
          <dl className="space-y-3 text-sm text-text-secondary">
            <div>
              <dt className="font-semibold text-eightyw-blue">Court date</dt>
              <dd>The BC Supreme Court hearing where the lender&apos;s lawyer applies for sale approval. Other buyers can submit competing offers that day; the judge usually awards to the highest bid.</dd>
            </div>
            <div>
              <dt className="font-semibold text-eightyw-blue">Listed vs. last assessed</dt>
              <dd>The spread between the current ask and the most recent BC Assessment value. Useful as a sanity check, not a guarantee — assessments lag the market by 6–18 months.</dd>
            </div>
            <div>
              <dt className="font-semibold text-eightyw-blue">Schedule A</dt>
              <dd>The lender/court addendum that releases the lender from any condition or warranty responsibility. Every BC court-ordered offer requires it. We draft it line-by-line with you.</dd>
            </div>
          </dl>
        </div>

        <div className="text-center">
          <a
            href="#register"
            className="inline-flex items-center justify-center h-[52px] px-8 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-0.5 gap-2 text-[15px] shadow-[0_10px_30px_rgba(197,34,4,0.3)]"
          >
            See all current listings — get the Sheet →
          </a>
        </div>
      </div>
    </section>
  );
}
