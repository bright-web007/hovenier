import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow external dev access — comma-separated IPs/hostnames via ALLOWED_DEV_ORIGINS env var
  ...(process.env.ALLOWED_DEV_ORIGINS && {
    allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS.split(',').map(o => o.trim()),
  }),
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Security headers
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection', 
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // GA4 scripts and tag manager
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.googletagmanager.com https://*.google-analytics.com https://challenges.cloudflare.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https://*.hivedeck.com https://*.unsplash.com https://*.google-analytics.com https://*.googletagmanager.com https://*.gstatic.com",
              // GA4 collect endpoints - explicit regional coverage for all possible domains
              "connect-src 'self' https://*.google-analytics.com https://region1.google-analytics.com https://region1.analytics.google.com https://www.google-analytics.com https://analytics.google.com https://ssl.google-analytics.com https://*.googletagmanager.com https://*.analytics.google.com https://*.doubleclick.net https://stats.g.doubleclick.net https://www.google.com https://www.google.nl https://challenges.cloudflare.com https://vitals.vercel-analytics.com",
              "frame-src 'self' https://challenges.cloudflare.com",
            ].join('; ')
          }
        ]
      },
      {
        // HSTS for production (will be overridden by hosting provider typically)
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          }
        ]
      }
    ];
  },

  // I18n configuration
  trailingSlash: false,

  // Redirects for SEO and legacy URLs
  async redirects() {
    return [
      // Old WordPress category redirects (based on GSC crawled URLs)
      {
        source: '/category/tuinverlichting/:path*',
        destination: '/diensten/tuinverlichting',
        permanent: true,
      },
      {
        source: '/category/schutting/:path*',
        destination: '/diensten/schutting-plaatsen',
        permanent: true,
      },
      {
        source: '/category/bloemen/:path*', 
        destination: '/diensten/bloembollen-planten',
        permanent: true,
      },
      {
        source: '/category/moestuin/:path*',
        destination: '/diensten/moestuin-aanleggen',
        permanent: true,
      },
      {
        source: '/category/internet-diensten/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/category/interieur/:path*',
        destination: '/',
        permanent: true,
      },
      // Old WordPress blog post redirects  
      {
        source: '/hovenier-nieuws/:path*',
        destination: '/artikelen',
        permanent: true,
      },
      {
        source: '/schutting/duurzame-schuttingen/:path*',
        destination: '/diensten/schutting-plaatsen',
        permanent: true,
      },
      {
        source: '/bloemen/wat-is-een-bloemist/:path*',
        destination: '/diensten/bloembollen-planten', 
        permanent: true,
      },
      // RSS feeds - return 410 Gone
      {
        source: '/category/:category/feed/:path*',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/feed/:path*',
        destination: '/404', 
        permanent: false,
      },
    ];
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [], // Add external image domains here if needed
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['@sentry/nextjs'],
  },

  // Production optimization
  output: 'standalone',

  // Bundle analyzer (uncomment for analysis)
  // bundleAnalyzer: {
  //   enabled: process.env.ANALYZE === 'true',
  // },
};

export default nextConfig;
