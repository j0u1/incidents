import { auth } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import Elysia, { t } from "elysia";

export const settings = new Elysia({ prefix: "/api/settings" })

  .get("/", async () => {
    const settings = await prisma.settings.upsert({
      where: { id: "global" },
      update: {},
      create: { id: "global" },
      include: { defaultStatus: true },
    });

    return settings;
  })

  .patch(
    "/",
    async ({ body, request, set }) => {
      const session = await auth.api.getSession({ headers: request.headers });
      if (!session?.user.isAdmin) {
        set.status = 403;
        return { message: "Нет доступа" };
      }

      const settings = await prisma.settings.upsert({
        where: { id: "global" },
        update: { defaultStatusId: body.defaultStatusId },
        create: { id: "global", defaultStatusId: body.defaultStatusId },
        include: { defaultStatus: true },
      });
      return settings;
    },
    {
      body: t.Object({
        defaultStatusId: t.Nullable(t.String()),
      }),
    },
  );
