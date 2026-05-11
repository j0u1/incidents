
FROM oven/bun AS build

WORKDIR /app

COPY package.json package.json
COPY bun.lock bun.lock

RUN bun install

COPY ./prisma ./prisma
COPY ./src ./src

ENV NODE_ENV=production

RUN bunx prisma generate 

RUN bun build         --compile         --minify-whitespace         --minify-syntax         --outfile server         src/index.ts

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 3000
