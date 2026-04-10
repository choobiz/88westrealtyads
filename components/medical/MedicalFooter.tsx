import Image from "next/image";

const SERVICES = [
  { name: "88West Realty", href: "https://88westrealty.com/" },
  { name: "Buy Property", href: "https://88westrealty.com/buy/" },
  { name: "Sell Property", href: "https://88westrealty.com/sell/" },
  { name: "Property Management", href: "https://88westrealtypm.com/" },
];

export default function MedicalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-med-navy text-white">
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Image src="/logo.png" alt="88 West Realty" width={120} height={48} className="h-14 w-auto" />
              <p className="text-white/90 text-sm leading-relaxed max-w-sm">
                Elevating the standard of real estate in British Columbia through
                expert service, strategic mentorship, and community leadership.
              </p>

              {/* Contact Info */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#C5A880] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 01-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0116 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-white/80">970 Marine Drive, North Vancouver, BC V7P 1R9</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#C5A880] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+16042811828" className="text-white/80 hover:text-[#C5A880] transition-colors">
                    (604) 281-1828
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#C5A880] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m22 7-8.991 5.727a2 2 0 01-2.009 0L2 7" />
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                  </svg>
                  <a href="mailto:shirin@88westrealty.com" className="text-white/80 hover:text-[#C5A880] transition-colors">
                    shirin@88westrealty.com
                  </a>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-4 pt-2">
                <a href="https://www.linkedin.com/in/shirin-saleh/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C5A880] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="https://www.youtube.com/@88westrealty88" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C5A880] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span className="sr-only">YouTube</span>
                </a>
                <a href="https://www.instagram.com/shirinssaleh" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C5A880] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="flex flex-col gap-3">
                {SERVICES.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-[#C5A880] transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="/medical" className="text-white/90 hover:text-[#C5A880] transition-colors">
                    North Vancouver&apos;s First Medical Strata
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-white/50">
                &copy; {currentYear} Apex Medical Realty | Powered by 88West Realty | All rights reserved.
              </p>
            </div>
            <p className="text-xs text-white/30 mt-4 text-center md:text-left">
              The information contained herein is provided for general informational purposes only.
              All information is provided in good faith, however we make no representation or warranty
              of any kind regarding the accuracy or completeness of any information.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
