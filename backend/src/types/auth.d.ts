import type { auth } from "../libs/auth";

declare module "better-auth" {
  interface Session {
    user: typeof auth.$Infer.Session.user & {
      isAdmin: boolean;
    };
  }
}
