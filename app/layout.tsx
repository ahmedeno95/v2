import type { ReactNode } from "react"
import { Suspense } from "react"
import type { Metadata } from "next"
import Script from "next/script"

import "./globals.css"
import PixelTracker from "./pixel-tracker"

export const metadata: Metadata = {
  title: "أكاديمية أمة مسلمة | Ummah Muslimah Academy",
  description:
    "أكاديمية أمة مسلمة لتعليم القرآن والتجويد أونلاين للأطفال والكبار، مع معلمين ومعلمات مجازين وبرامج تربوية مميزة.",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-PFiwOQmUO2XqQEdFh8evsswZet7bO5.png",
    shortcut:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-PFiwOQmUO2XqQEdFh8evsswZet7bO5.png",
    apple:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-PFiwOQmUO2XqQEdFh8evsswZet7bO5.png",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* ✅ Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1311578010618135');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1311578010618135&ev=PageView&noscript=1"
          />
        </noscript>
        {/* ✅ End Meta Pixel Code */}

        {/* ✅ Snap Pixel Code */}
        <Script id="snap-pixel" strategy="afterInteractive">
          {`
            (function(e,t,n){
              if(e.snaptr)return;
              var a=e.snaptr=function(){
                a.handleRequest ? a.handleRequest.apply(a,arguments) : a.queue.push(arguments)
              };
              a.queue=[];
              var s='script';
              var r=t.createElement(s);
              r.async=!0;
              r.src=n;
              var u=t.getElementsByTagName(s)[0];
              u.parentNode.insertBefore(r,u);
            })(window,document,'https://sc-static.net/scevent.min.js');

            snaptr('init', '66f28459-fee4-4cd2-ac92-3af31523e31d', {});
            snaptr('track', 'PAGE_VIEW');
          `}
        </Script>
        {/* ✅ End Snap Pixel Code */}
      </head>
      <body className="antialiased bg-[#fff6f2]">
        <Suspense fallback={null}>
          <PixelTracker />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
