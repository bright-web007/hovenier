FROM node:lts-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

FROM base AS builder
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Set build-time environment variables with defaults 
ENV NEXT_PUBLIC_BASE_URL=https://hovenier.frl
ENV SENTRY_DSN=""
# Public environment variables (safe to bake into image)
ENV NEXT_PUBLIC_SENTRY_DSN=""  
ENV NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-PLACEHOLDER
ENV NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=0x4placeholder_turnstile_site_key

# Non-sensitive service URLs (safe to bake into image)
ENV MUSE_GRAPHQL_URL=https://api.placeholder.com/graphql
ENV PROMETHEUS_GRAPHQL_URL=https://api.placeholder.com/graphql
ENV MERCURY_GRAPHQL_URL=https://api.placeholder.com/graphql

# Sensitive variables removed from ENV - pass at runtime or build-time
# MERCURY_TOKEN_URL - pass as --build-arg or runtime env var
# NEXUS_PROJECT_API_KEY - pass as --build-arg or runtime env var  
# NEXUS_PROJECT_API_SECRET - pass as --build-arg or runtime env var
# CLOUDFLARE_TURNSTILE_SECRET_KEY - pass as runtime env var
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
