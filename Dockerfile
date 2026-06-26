# Multi-stage Dockerfile for CarHub
# Stage 1: Dependencies
FROM node:24-alpine AS deps

WORKDIR /app

RUN npm install -g pnpm

# Create .npmrc to disable policy checks for recently-published packages
RUN echo "policy-entries=null" > ~/.npmrc

COPY pnpm-lock.yaml package.json ./

RUN pnpm install --no-frozen-lockfile --ignore-scripts

# Stage 2: Builder
FROM node:24-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

# Create .npmrc to disable policy checks for recently-published packages
RUN echo "policy-entries=null" > ~/.npmrc

COPY pnpm-lock.yaml package.json ./

RUN pnpm install --no-frozen-lockfile --ignore-scripts

COPY . .

# Build the application
RUN pnpm build

# Stage 3: Runtime (Production)
FROM node:24-alpine AS runtime

WORKDIR /app

RUN npm install -g pnpm

# Create .npmrc to disable policy checks for recently-published packages
RUN echo "policy-entries=null" > ~/.npmrc

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --prod --no-frozen-lockfile --ignore-scripts

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
