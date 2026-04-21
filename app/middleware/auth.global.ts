import { defineNuxtRouteMiddleware } from "nuxt/app";

const PUBLIC_ROUTES = ["/", "/login", "/register"];

export default defineNuxtRouteMiddleware(async (to) => {
    const authClient = useAuth();
    const session = await authClient.getSession()

    if (!session.data && !PUBLIC_ROUTES.includes(to.path)) {
      return navigateTo("/dashboard")
    }
})
