import Elysia from "elysia";

export const pingPong = new Elysia()
  .get("/", () => "pong")
