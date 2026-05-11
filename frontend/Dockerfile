
    FROM oven/bun:alpine AS build
    WORKDIR /app

    COPY package.json bun.lock ./
    RUN bun install --frozen-lockfile --ignore-scripts

    COPY . .

    ENV NITRO_PRESET=bun
    RUN bun --bun run build

    FROM oven/bun:alpine AS production
    WORKDIR /app

    COPY --from=build /app/.output /app

    ENV HOST=0.0.0.0
    ENV PORT=3000
    EXPOSE 3000/tcp
    ENTRYPOINT [ "bun", "--bun", "run", "/app/server/index.mjs" ]
    