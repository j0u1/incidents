import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    experimental: {
        serverAppConfig: false,
    },
    modules: ["@nuxt/image"],
    css: ["./app/assets/css/main.css"],
    vite: {
        plugins: [tailwindcss()],
        optimizeDeps: {
          include: [
            '@vue/devtools-core',
            '@vue/devtools-kit',
            '@lucide/vue',
          ]
        },
    },
    runtimeConfig: {
        public: {
          authBaseURL: "http://localhost:3000",
        }
    },
    app: {
        head: {
           title: "Ядро — Проблемы случаются, Вы решаете их быстрее"
        }
    }
});
