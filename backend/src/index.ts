import { Context, Elysia } from "elysia";
import "dotenv/config";
import { env } from "prisma/config";
import { pingPong } from "./module/ping";
import cors from "@elysiajs/cors";
import { auth } from "./libs/auth";
import { tickets } from "./module/tickets";

const betterAuthView = (context: Context) => {
  if (["POST", "GET"].includes(context.request.method)) {
    return auth.handler(context.request);
  }
  context.set.status = 405;
  return "Method Not Allowed";
};

const app = new Elysia()
  .use(pingPong)
  .use(
    cors({
      origin: env("TRUSTED_URL"),
      credentials: true,
    }),
  )
  .all("/api/auth/*", betterAuthView)
  .use(tickets)
  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
