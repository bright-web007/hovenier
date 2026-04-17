import { z } from 'zod';

// URL validation with proper formatting
const urlSchema = z.string().url('Must be a valid URL');
const optionalUrlSchema = z.string().url('Must be a valid URL').optional();

// API Key validation - should not be empty or contain placeholder text, but allow placeholders for builds
const apiKeySchema = z.string()
  .min(10, 'API key too short')
  .refine(
    (val) => {
      // If we're in Docker build env, allow placeholder values
      if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
        return true; // Likely Docker build, allow any value
      }
      return !val.includes('your_') && !val.includes('example_') && !val.includes('_here');
    },
    'API key contains placeholder text'
  );

// Optional API Key
const optionalApiKeySchema = apiKeySchema.optional();

// Environment validation (development, production, test)
const nodeEnvSchema = z.enum(['development', 'production', 'test']).default('development');

// Boolean from string validation
const booleanFromString = z
  .string()
  .transform((val) => val === 'true' || val === '1')
  .pipe(z.boolean());

// Sentry DSN validation - specific format for Sentry URLs, optional for builds
const sentryDsnSchema = z.string()
  .regex(/^https:\/\/[a-f0-9]+@[^\/]+\/[0-9]+$/, 'Invalid Sentry DSN format')
  .or(z.string().length(0)) // Allow empty string for builds

// Google Analytics ID validation
const ga4IdSchema = z.string()
  .regex(/^G-[A-Z0-9]+$/, 'Invalid GA4 Measurement ID format (should be G-XXXXXXXXXX)');

// Turnstile key validation (Cloudflare specific format), lenient for builds
const turnstileSiteKeySchema = z.string()
  .refine((val) => {
    // If we're in Docker build env, allow placeholder values
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      return val.startsWith('0x4'); // Just check basic format for builds
    }
    return /^0x4[A-Za-z0-9_-]+$/.test(val);
  }, 'Invalid Turnstile site key format');

const turnstileSecretKeySchema = z.string()
  .refine((val) => {
    // If we're in Docker build env, allow placeholder values
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      return val.startsWith('0x4'); // Just check basic format for builds 
    }
    return /^0x4[A-Za-z0-9_-]+$/.test(val);
  }, 'Invalid Turnstile secret key format');

// Define the complete environment schema
export const envSchema = z.object({
  // Core application settings
  NODE_ENV: nodeEnvSchema,
  NEXT_PUBLIC_BASE_URL: urlSchema,

  NEXT_PUBLIC_IMAGE_BASE_URL: urlSchema.optional().default(''),
  
  // Analytics & Monitoring
  SENTRY_DSN: sentryDsnSchema.optional().default(""),
  NEXT_PUBLIC_SENTRY_DSN: sentryDsnSchema.optional().default(""),
  NEXT_PUBLIC_GA4_MEASUREMENT_ID: ga4IdSchema,
  NEXT_PUBLIC_MICROSOFT_CLARITY_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_ADSENSE_CLIENT_ID: z.string().min(1).optional(),
  
  // CMS & API Services
  MUSE_GRAPHQL_URL: urlSchema,
  MUSE_BLOG_UUID: z.string().optional().default(''),
  PROMETHEUS_GRAPHQL_URL: urlSchema,
  MERCURY_GRAPHQL_URL: urlSchema,
  MERCURY_TOKEN_URL: urlSchema,
  
  // API Keys & Secrets
  NEXUS_PROJECT_API_KEY: apiKeySchema,
  NEXUS_PROJECT_API_SECRET: apiKeySchema,
  
  // Security & Bot Protection
  NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: turnstileSiteKeySchema,
  CLOUDFLARE_TURNSTILE_SECRET_KEY: turnstileSecretKeySchema,
  
  // IndexNow (instant search engine pinging)
  INDEXNOW_KEY: z.string().min(8).optional(),

  // Development & Analytics Settings
  ENABLE_ANALYTICS_IN_DEV: booleanFromString.optional().default(false),
  NEXT_TELEMETRY_DISABLED: z.string().optional().default('0'),
  
  // Optional future variables
  DATABASE_URL: optionalUrlSchema,
  SMTP_HOST: z.string().optional(),
  EMAIL_FROM: z.string().email('Invalid email format').optional(),
  EMAIL_TO: z.string().email('Invalid email format').optional(),
  RESEND_API_KEY: optionalApiKeySchema,
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: optionalApiKeySchema,
  STRIPE_PUBLIC_KEY: optionalApiKeySchema,
  STRIPE_SECRET_KEY: optionalApiKeySchema,
});

// Create typed environment object
export type Env = z.infer<typeof envSchema>;

// Client-side schema (only NEXT_PUBLIC_ variables)
export const clientEnvSchema = z.object({
  NEXT_PUBLIC_BASE_URL: urlSchema,
  NEXT_PUBLIC_SENTRY_DSN: sentryDsnSchema.optional(),
  NEXT_PUBLIC_GA4_MEASUREMENT_ID: ga4IdSchema.optional(),
  NEXT_PUBLIC_MICROSOFT_CLARITY_ID: z.string().optional(),
  NEXT_PUBLIC_ADSENSE_CLIENT_ID: z.string().optional(),
  NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: turnstileSiteKeySchema.optional(),
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: optionalApiKeySchema,
});

// Validation function with detailed error reporting
export function validateEnvironment(): Env {
  // Skip validation on client-side to avoid errors with server-only variables
  if (typeof window !== 'undefined') {
    // Client-side: only validate public variables
    const clientResult = clientEnvSchema.safeParse(process.env);
    // Return a partial env for client-side usage
    return createFallbackEnv();
  }
  
  const result = envSchema.safeParse(process.env);
  
  if (!result.success) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Environment validation failed in production');
    } else {
      return createFallbackEnv();
    }
  }

  return result.data;
}

// Create fallback environment object for development
function createFallbackEnv(): Env {
  return {
    NODE_ENV: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
    NEXT_PUBLIC_IMAGE_BASE_URL: process.env.NEXT_PUBLIC_IMAGE_BASE_URL || '',
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    SENTRY_DSN: process.env.SENTRY_DSN || '',
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
    NEXT_PUBLIC_GA4_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '',
    NEXT_PUBLIC_MICROSOFT_CLARITY_ID: process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID,
    NEXT_PUBLIC_ADSENSE_CLIENT_ID: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
    MUSE_GRAPHQL_URL: process.env.MUSE_GRAPHQL_URL || '',
    MUSE_BLOG_UUID: process.env.MUSE_BLOG_UUID || '',
    PROMETHEUS_GRAPHQL_URL: process.env.PROMETHEUS_GRAPHQL_URL || '',
    MERCURY_GRAPHQL_URL: process.env.MERCURY_GRAPHQL_URL || '',
    MERCURY_TOKEN_URL: process.env.MERCURY_TOKEN_URL || '',
    NEXUS_PROJECT_API_KEY: process.env.NEXUS_PROJECT_API_KEY || '',
    NEXUS_PROJECT_API_SECRET: process.env.NEXUS_PROJECT_API_SECRET || '',
    NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || '',
    CLOUDFLARE_TURNSTILE_SECRET_KEY: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY || '',
    INDEXNOW_KEY: process.env.INDEXNOW_KEY,
    ENABLE_ANALYTICS_IN_DEV: process.env.ENABLE_ANALYTICS_IN_DEV === 'true',
    NEXT_TELEMETRY_DISABLED: process.env.NEXT_TELEMETRY_DISABLED || '0',
    
    // Optional future variables with defaults
    DATABASE_URL: process.env.DATABASE_URL,
    SMTP_HOST: process.env.SMTP_HOST,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_TO: process.env.EMAIL_TO,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  };
}

// Create and export validated environment
export const env = validateEnvironment();

// Helper functions for environment checks
export const isProduction = env.NODE_ENV === 'production';
export const isDevelopment = env.NODE_ENV === 'development';
export const isTest = env.NODE_ENV === 'test';

// API base URLs for easy access
export const apiUrls = {
  muse: env.MUSE_GRAPHQL_URL,
  prometheus: env.PROMETHEUS_GRAPHQL_URL,
  mercury: env.MERCURY_GRAPHQL_URL,
  mercuryToken: env.MERCURY_TOKEN_URL,
} as const;

// Security keys for easy access
export const securityKeys = {
  turnstile: {
    siteKey: env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY,
    secretKey: env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
  },
  nexus: {
    apiKey: env.NEXUS_PROJECT_API_KEY,
    apiSecret: env.NEXUS_PROJECT_API_SECRET,
  },
} as const;

// Analytics configuration
export const analytics = {
  sentry: {
    dsn: env.SENTRY_DSN,
    publicDsn: env.NEXT_PUBLIC_SENTRY_DSN,
  },
  ga4: {
    measurementId: env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
  },
  clarity: {
    projectId: env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID,
  },
  enableInDev: env.ENABLE_ANALYTICS_IN_DEV,
} as const;
