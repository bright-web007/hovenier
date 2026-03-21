import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { locales, defaultLocale } from "../i18n";
import { notFound } from "next/navigation";
import GoogleAnalytics from "./components/GoogleAnalytics";
import PerformanceInitializer from "./components/PerformanceInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://hovenier.frl'),
  title: {
    default: 'Hovenier.frl - Betrouwbare Hoveniers in Friesland | Gratis Offertes',
    template: '%s | Hovenier.frl'
  },
  description: 'Vind de beste hovenier in Friesland ✓ Tuinonderhoud ✓ Tuinontwerp ✓ Groendaken ✓ Vergelijk offertes ✓ Gratis & vrijblijvend ✓ 11 gemeenten',
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
      'nl-NL': 'https://hovenier.frl/nl',
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

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <head>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || ''} />
        
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
        <link rel="shortcut icon" href="/assets/logo-favicon.svg" />
        
        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Prefetch next page resources */}
        <link rel="prefetch" href="/services/tuinonderhoud" />
        <link rel="prefetch" href="/gemeente/leeuwarden" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PerformanceInitializer />
        {children}
      </body>
    </html>
  );
}
