FROM node:18-alpine AS deps
ENV TZ=Asia/Jakarta
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json ./
COPY ./postcss.config.js ./
RUN rm -rf yarn.lock
RUN  npm install --production --ignore-scripts --frozen-lockfile --force

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN rm -rf yarn.lock

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:18-alpine AS runner
ENV TZ=Asia/Jakarta
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env.production ./.env.production

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
