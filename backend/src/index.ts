import { Context, Elysia } from "elysia";
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
      origin: ["http://localhost:3001", "https://localhost:3001"],
      credentials: true,
    }),
  )
  .all("/api/auth/*", betterAuthView)
  .use(tickets)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
