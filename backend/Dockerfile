FROM oven/bun:alpine AS build
WORKDIR /app

COPY package.json package.json
COPY bun.lock bun.lock

RUN bun install

COPY ./prisma ./prisma
COPY ./src ./src
COPY prisma.config.ts prisma.config.ts
ENV NODE_ENV=production

FROM oven/bun:alpine
WORKDIR /app
COPY --from=build /app /app
ENV NODE_ENV=production
EXPOSE 3000

CMD ["sh", "-c", "bun prisma:deploy && bun src/index.ts"]