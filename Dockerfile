# Multi-stage Dockerfile for CarHub
# Stage 1: Dependencies
FROM node:24-alpine AS deps

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Disable pnpm supply-chain policy checks in Docker builds
ENV PNPM_CONFIG_IGNORE_SCRIPTS=true

RUN npm install -g pnpm

COPY pnpm-lock.yaml package.json .npmrc ./

RUN pnpm install --no-frozen-lockfile

# Stage 2: Builder
FROM node:24-alpine AS builder

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Disable pnpm supply-chain policy checks in Docker builds
ENV PNPM_CONFIG_IGNORE_SCRIPTS=true

RUN npm install -g pnpm

COPY pnpm-lock.yaml package.json .npmrc ./

RUN pnpm install --no-frozen-lockfile

COPY . .

# Build the application
RUN pnpm build

# Stage 3: Runtime (Production)
FROM node:24-alpine AS runtime

WORKDIR /app

RUN npm install -g pnpm

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy package files
COPY package.json pnpm-lock.yaml .npmrc ./

# Set environment for production install
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV PNPM_CONFIG_IGNORE_SCRIPTS=true

# Install production dependencies only
RUN pnpm install --prod --no-frozen-lockfile

# Copy built application from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# Switch to non-root user
USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["node_modules/.bin/next", "start"]
