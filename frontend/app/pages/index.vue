<script setup lang="ts">
import { LayoutIcon, LogInIcon } from "@lucide/vue";
import { padding } from "~/data/dynamicStyles";

const authClient = useAuth();
const session = authClient.useSession();

async function signInWithGithub() {
    const callbackURL = `${window.location.origin}/dashboard`;
    const { data, error } = await authClient.signIn.social({
        provider: "github",
        callbackURL,
        disableRedirect: true,
    });

    if (error) {
        console.error("GitHub sign-in failed", error);
        return;
    }

    if (data?.url) {
        window.location.href = data.url;
    }
}
</script>

<template>
    <main
        class="flex flex-col gap-16 items-center max-h-[90.2dvh] overflow-hidden border-b border-border"
    >
        <h1 class="text-6xl font-medium flex flex-col gap-2 text-center pt-10">
            <span>Проблемы случаются,</span>
            <span class="text-primary">Вы решите их быстрее</span>
        </h1>
        <UIButton v-if="!session.data?.session" variant="login" long />
        <NuxtLink
            v-else
            class="border border-border rounded-lg flex items-center gap-2.5 text-light-gray duration-300 transition-all hover:border-primary hover:text-primary"
            :class="padding"
            href="/dashboard"
        >
            <LayoutIcon class="size-4.5" />
            Перейти в Обзор
        </NuxtLink>
        <NuxtImg
            class="max-w-11/12 mx-auto rounded-2xl outline outline-border w-full"
            src="/images/preview.webp"
        />
    </main>
    <section class="flex flex-col px-20"></section>
</template>
