FROM node:17-alpine as base

RUN npm install -g pnpm

WORKDIR /app
COPY Caddyfile package.json pnpm-lock.yaml tsconfig.json vite.config.ts index.html /app/
COPY ./public public
COPY ./src src

RUN pnpm install
RUN pnpm build

FROM caddy:2.4.6-alpine

COPY --from=base /app/dist /app/
COPY --from=base /app/Caddyfile /etc/caddy/Caddyfile