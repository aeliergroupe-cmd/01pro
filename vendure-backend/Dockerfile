FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat curl

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json* tsconfig.json ./
RUN npm ci
COPY src ./src
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 vendure

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
RUN mkdir -p static/assets static/email/test-emails
RUN chown -R vendure:nodejs /app

USER vendure
EXPOSE 3000

CMD ["node", "dist/index.js"]
