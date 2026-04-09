import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { TRACKING } from "@/lib/constants";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://go.88westrealty.com"),
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-CA" className={poppins.variable}>
      <head>
        {/* Consent defaults — deny until user accepts */}
        <Script
          id="consent-defaults"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
window.gtag=gtag;`,
          }}
        />
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${TRACKING.gtmId}');`,
          }}
        />
        <Script
          id="tracking-cookies"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var D=90;
  function s(n,v){document.cookie=n+'='+encodeURIComponent(v)+';max-age='+(D*86400)+';path=/;SameSite=Lax'}
  function g(n){var m=document.cookie.match(new RegExp('(?:^|; )'+n+'=([^;]*)'));return m?decodeURIComponent(m[1]):null}
  var p=new URLSearchParams(location.search);
  ['gclid','utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(function(k){
    var v=p.get(k);if(v)s('_lp_'+k,v);
  });
  window.__getTrackingCookie=g;
})();`,
          }}
        />
      </head>
      <body className={poppins.className}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${TRACKING.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
