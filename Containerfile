FROM node:17-alpine as base

RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml tsconfig.json vite.config.ts index.html /app/
COPY ./public public
COPY ./src src

RUN pnpm install
RUN pnpm build

EXPOSE 5000
CMD pnpm preview
