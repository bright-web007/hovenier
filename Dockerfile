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
ENV SENTRY_DSN=https://d965e01199456b90991949398b8207d0@sentry.wazobia.tech/23
# Public environment variables (safe to bake into image)
ENV NEXT_PUBLIC_SENTRY_DSN=https://d965e01199456b90991949398b8207d0@sentry.wazobia.tech/23
ENV NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-WZ41C9EYC0
ENV NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=0x4AAAAAACuIFK9BaNa9z817

# Non-sensitive service URLs (safe to bake into image)
ENV MUSE_GRAPHQL_URL=https://muse.hivedeck.com/graphql
ENV PROMETHEUS_GRAPHQL_URL=https://prometheus.hivedeck.com/graphql
ENV MERCURY_GRAPHQL_URL=https://mercury.hivedeck.com/graphql

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
ENV INDEXNOW_KEY=27b83659df554b2990b9aa2591489179

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
