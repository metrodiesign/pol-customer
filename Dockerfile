# syntax=docker/dockerfile:1

FROM node:22-alpine AS deps
WORKDIR /app
# node:22-alpine bundles npm 10.x; this lock file was written by npm 11 (host) and
# `npm ci` rejects it under npm 10's stricter optional-peer resolution (picomatch).
RUN npm install -g npm@11
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* vars are inlined at build time, not read at container runtime —
# pass them as --build-arg / ARG here if this app ever needs one.
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5400
ENV HOSTNAME=0.0.0.0

COPY --from=builder --chown=node:node /app/public ./public

# Prerender/ISR cache dir must be writable by the non-root `node` user.
RUN mkdir .next && chown node:node .next

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 5400

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT}/" || exit 1

CMD ["node", "server.js"]
