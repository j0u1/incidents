import Elysia, { t } from "elysia";
import { prisma } from "../libs/prisma";
import { auth } from "../libs/auth";

export const tickets = new Elysia({ prefix: "/api/tickets" })
  .post(
    "/",
    async ({ body, request, set }) => {
      const section = await auth.api.getSession({ headers: request.headers });
      if (!section) {
        set.status = 401;
        return { message: "Не авторизован" };
      }

      const ticket = await prisma.tickets.create({
        data: {
          title: body.title,
          description: body.description,
          date: new Date(),
          createdById: section.user.id,
        },
      });

      return ticket;
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.Optional(t.String()),
      }),
    },
  )

  .get("/", async () => {
    const tickets = await prisma.tickets.findMany({
      include: {
        status: true,
        category: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            isAdmin: true,
          },
        },
        assigmentTo: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            isAdmin: true,
          },
        },
      },
    });
    return tickets;
  })

  .get("/:id", async ({ params }) => {
    const ticket = await prisma.tickets.findUnique({
      where: { id: params.id },
      include: {
        status: true,
        category: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            isAdmin: true,
          },
        },
        assigmentTo: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            isAdmin: true,
          },
        },
      },
    });
    return ticket;
  })

  .patch(
    "/:id",
    async ({ params, body }) => {
      const ticket = await prisma.tickets.update({
        where: { id: params.id },
        data: body,
      });

      return ticket;
    },
    {
      body: t.Object({
        title: t.Optional(t.String()),
        description: t.Optional(t.String()),
      }),
    },
  )

  .delete("/:id", async ({ params }) => {
    const ticket = await prisma.tickets.delete({
      where: { id: params.id },
    });
    return ticket;
  });
