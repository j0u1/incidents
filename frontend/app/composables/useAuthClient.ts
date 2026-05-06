import { createAuthClient } from "better-auth/vue";

export function useAuth() {
  const config = useRuntimeConfig();
  const headers = import.meta.server ? useRequestHeaders(["cookie"]) : undefined;
  return createAuthClient({
    baseURL: config.public.authBaseURL,
    fetchOptions: { headers },
  });
}
