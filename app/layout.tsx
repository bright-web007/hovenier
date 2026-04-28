import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Script from "next/script";
import AdSenseScript from "./components/AdSenseScript";
import GoogleAnalytics from "./components/GoogleAnalytics";
import PerformanceInitializer from "./components/PerformanceInitializer";
import { env } from "@/lib/env";

const sansFont = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "fallback",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://hovenier.frl'),
  title: {
    default: 'Hovenier.frl - Betrouwbare Hoveniers in Friesland | Gratis Offertes',
    template: '%s | Hovenier.frl'
  },
  description: 'Vind de beste hovenier in Friesland ✓ Tuinonderhoud ✓ Tuinontwerp ✓ Groendaken ✓ Vergelijk offertes ✓ Gratis & vrijblijvend ✓ 18 gemeenten',
  keywords: [
    'hovenier friesland',
    'tuinonderhoud',
    'tuinontwerp', 
    'groendaken',
    'leeuwarden',
    'heerenveen',
    'hovenier vergelijken',
    'gratis offerte',
    'nederlands'
  ],
  authors: [{ name: 'Hovenier.frl' }],
  creator: 'Hovenier.frl',
  publisher: 'Hovenier.frl',
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: 'en_US',
    url: 'https://hovenier.frl',
    siteName: 'Hovenier.frl',
    title: 'Hovenier.frl - Betrouwbare Hoveniers in Friesland',
    description: 'Vind de beste hovenier in Friesland. Tuinonderhoud, tuinontwerp en groendaken. Vergelijk offertes gratis en vrijblijvend.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hovenier.frl - Professionele hoveniers in Friesland',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hovenier_frl',
    creator: '@hovenier_frl',
    title: 'Hovenier.frl - Betrouwbare Hoveniers in Friesland',
    description: 'Vind de beste hovenier in Friesland. Tuinonderhoud, tuinontwerp en groendaken.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://hovenier.frl',
    languages: {
      'nl-NL': 'https://hovenier.frl',
      'en-US': 'https://hovenier.frl/en',
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
    other: {
      'msvalidate.01': process.env.BING_VERIFICATION || '',
    }
  },
  category: 'business',
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Detect locale from the x-locale header set by proxy.ts
  const headersList = await headers();
  const lang = headersList.get('x-locale') || 'nl';

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Hovenier Leeuwarden" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2d5016" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#4f7829" />
        
        {/* Apple Touch Icons - using fallback */}
        <link rel="apple-touch-icon" href="/assets/logo-app-icon.svg" />
        
        {/* Regular Icons */} 
        <link rel="icon" type="image/svg+xml" href="/assets/logo-favicon.svg" />
        <link rel="icon" type="image/svg+xml" sizes="32x32" href="/favicon-32x32.svg" />
        <link rel="shortcut icon" href="/assets/logo-favicon.svg" />
        
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* Google Tag Manager */}
        {env.NEXT_PUBLIC_GTM_ID && (
          <script dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${env.NEXT_PUBLIC_GTM_ID}');`
          }} />
        )}
        {/* End Google Tag Manager */}

      </head>
      <body className={`${sansFont.variable}`}>
        {/* Google Tag Manager (noscript) */}
        {env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {/* End Google Tag Manager (noscript) */}

        {env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID && (
          <Script
            id="microsoft-clarity"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID}");
              `,
            }}
          />
        )}
        <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || ''} />
        <AdSenseScript clientId={env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || ''} />
        <PerformanceInitializer />
        {children}
      </body>
    </html>
  );
}
