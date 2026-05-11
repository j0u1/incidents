FROM oven/bun AS build
WORKDIR /app
COPY package.json package.json
COPY bun.lock bun.lock
RUN bun install
COPY ./prisma ./prisma
COPY ./src ./src
ENV NODE_ENV=production

FROM oven/bun:slim
WORKDIR /app
COPY --from=build /app /app
ENV NODE_ENV=production
EXPOSE 3000
CMD ["sh", "-c", "bun prisma:deploy && bun src/index.ts"]