import { createAuthClient } from "better-auth/vue";

type AuthClient = ReturnType<typeof createAuthClient>;
let cachedAuthClient: AuthClient | null = null;

export function useAuth(): AuthClient {
    if (!cachedAuthClient) {
        const config = useRuntimeConfig();

        cachedAuthClient = createAuthClient({
            baseURL: config.public.authBaseURL,
        });
    }

    return cachedAuthClient;
}
