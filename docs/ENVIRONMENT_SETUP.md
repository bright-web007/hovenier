# Environment Setup Guide - Hovenier.frl

This guide helps you set up all required environment variables for the Hovenier.frl project.

## Quick Start

1. **Copy the template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in the required values** (see sections below)

3. **Test your setup:**
   ```bash
   npm run dev
   ```

## 🔧 Required Variables (Sprint 1-2)

### Core Application
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # Development
# NEXT_PUBLIC_BASE_URL=https://hovenier.frl  # Production
```

### Error Monitoring (Sentry)
```bash
SENTRY_DSN=https://abc123@o123456.ingest.sentry.io/123456
```
**How to get:** [Sentry.io](https://sentry.io) → Create Project → Settings → Client Keys

### Analytics (Google Analytics 4)
```bash
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-ABC123DEF4
```
**How to get:** Google Analytics → Admin → Data Streams → Web → Measurement ID

### CMS Integration (Muse CMS)
```bash
MUSE_CMS_API_URL=https://api.musecms.io/graphql
MUSE_CMS_API_KEY=your_muse_api_key
MUSE_CMS_USERNAME=your_muse_username
MUSE_CMS_PASSWORD=your_muse_password
```
**How to get:** Contact Muse CMS support for API credentials

## 🛡️ Sprint 3 Requirements

### Form Protection (Cloudflare Turnstile)
```bash
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=0x4AAAAAAA...
CLOUDFLARE_TURNSTILE_SECRET_KEY=0x4AAAAAAA...
```
**How to get:** [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) → Create Site → Get Keys

### Email Service (Resend - Recommended)
```bash
RESEND_API_KEY=re_12345...
EMAIL_FROM=noreply@hovenier.frl
EMAIL_TO=leads@hovenier.frl
```
**How to get:** [Resend.com](https://resend.com) → API Keys → Create API Key

## 📂 Optional Variables (Future Sprints)

### Database (Lead Storage)
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/hovenier_db
```

### Google Maps (Location Features)
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Payment Processing (Sprint 8)
```bash
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## 🔐 Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Use different keys** for development vs production
3. **Rotate API keys** regularly (quarterly recommended)
4. **Enable 2FA** on all service accounts
5. **Use least-privilege access** for service accounts

## 🧪 Development Setup

For quick development setup, you can start with minimal variables:

```bash
# .env.local - Minimal setup
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000
SKIP_EMAIL_SENDING=true
DEBUG_MODE=true

# Add these as you implement features:
# SENTRY_DSN=your_sentry_dsn
# NEXT_PUBLIC_GA4_MEASUREMENT_ID=your_ga4_id
# MUSE_CMS_API_KEY=your_cms_key
```

## 🚀 Production Checklist

Before deploying to production:

- [ ] All API keys are production-ready (not test keys)
- [ ] `NEXT_PUBLIC_BASE_URL` points to your domain
- [ ] Email settings are configured and tested
- [ ] Sentry DSN is configured for error monitoring
- [ ] Database URL points to production database
- [ ] All security keys are properly set
- [ ] Environment variables are set in hosting platform
- [ ] API rate limits are appropriate for production traffic

## 📞 Support

If you need help getting any of these API keys or services:

1. **Sentry**: Free tier available, excellent Next.js documentation
2. **Google Analytics**: Free, part of Google Marketing Platform
3. **Resend**: Free tier (3,000 emails/month), excellent Next.js integration
4. **Cloudflare Turnstile**: Free alternative to reCAPTCHA
5. **Muse CMS**: Contact their support for API access

## 🔄 Environment Sync

Keep your environments in sync:

```bash
# Development → Staging
cp .env.local .env.staging

# Update production-specific values
sed -i 's/localhost:3000/hovenier.frl/g' .env.staging
```

Remember: Different environments should use different API keys and database connections for security and data separation.