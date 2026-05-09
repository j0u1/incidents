import { auth } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import Elysia, { t } from "elysia";

const bodyFunc = {
  body: t.Object({
    name: t.String(),
    color: t.String(),
  }),
};

export const statuses = new Elysia({ prefix: "/api/statuses" })
  .post(
    "/",
    async ({ body, request, set }) => {
      const section = await auth.api.getSession({ headers: request.headers });
      if (!section) {
        set.status = 401;
        return { message: "Не авторизирован" };
      }

      const status = await prisma.statuses.create({
        data: {
          name: body.name,
          color: body.color,
        },
      });
      return status;
    },
    bodyFunc,
  )

  .get("/", async () => {
    const status = await prisma.statuses.findMany();
    return status;
  })

  .get("/:id", async ({ params, set }) => {
    const status = await prisma.statuses.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!status) {
      set.status = 404;
      return { message: "Не найдено" };
    }
    return status;
  })

  .patch(
    "/:id",
    async ({ params, body }) => {
      const status = await prisma.statuses.update({
        where: { id: params.id },
        data: body,
      });
      return status;
    },
    bodyFunc,
  )

  .delete("/:id", async ({ params }) => {
    const status = await prisma.statuses.delete({
      where: { id: params.id },
    });
    return status;
  });
