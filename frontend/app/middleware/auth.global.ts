import { defineNuxtRouteMiddleware } from "nuxt/app";

const PUBLIC_ROUTES = ["/", "/about"]
const AUTH_ROUTES = ["/login", "/register"]

export default defineNuxtRouteMiddleware(async (to) => {
    if (import.meta.server) return

    const authClient = useAuth();
    const session = await authClient.getSession();

    if (!session.data && !PUBLIC_ROUTES.includes(to.path) && !AUTH_ROUTES.includes(to.path)) {
        return navigateTo("/")
    }

    if (session.data && AUTH_ROUTES.includes(to.path)) {
        return navigateTo("/dashboard")
    }
})
