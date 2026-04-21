<script setup lang="ts">
import { LogInIcon, LogOutIcon, PanelsTopLeftIcon } from "@lucide/vue";
import { padding } from "~/data/dynamicStyles";

const dropDown = ref(false);
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

async function signOut() {
    await authClient.signOut();
    window.location.replace("/");
}
</script>

<template>
    <header class="flex items-center justify-between pt-6.75 px-4 max-h-16.75">
        <NuxtLink class="duration-300 transition-all active:scale-105" to="/">
            <IconsLogosFull />
        </NuxtLink>
        <div class="flex items-center gap-4">
            <NuxtLink to="//github.com/j0u1/yadro-frontend" target="_blank">
                <IconsGitHub class="fill-gray hover:fill-light-gray duration-300 transition-all hover:scale-105 active:105 size-6" />
            </NuxtLink>
            <div class="relative">
                <button
                    v-if="!session.data"
                    type="button"
                    class="flex items-center gap-1.5 text-sm text-light-gray hover:text-primary size-full cursor-pointer duration-300 transition-all border border-border rounded-lg"
                    :class="[padding]"
                    @click="signInWithGithub"
                >
                    <LogInIcon class="size-4.5" />
                    Войти
                </button>
                <UserAvatar
                    @click="session.data && (dropDown = !dropDown)"
                    v-else
                    :src="session.data.user.image ?? undefined"
                    class="size-8 cursor-pointer"
                />
                <div
                    class="absolute border border-border rounded-lg flex flex-col items-center gap-2.5 duration-400 transition-all bg-secondary origin-top-right w-56 right-0"
                    :class="[!session.data ? 'opacity-0' : 'opacity-100', padding, dropDown ? 'top-12 scale-100' : 'top-8 scale-0']"
                >
                    <NuxtLink
                        href="/dashboard"
                        class="text-sm text-light-gray border border-border rounded-lg flex items-center gap-1.5 w-full bg-bg hover:border-primary hover:text-primary duratiom-300 transition-all cursor-pointer"
                        :class="padding"
                    >
                        <PanelsTopLeftIcon class="size-4.5" />
                        Обзор
                    </NuxtLink>
                    <button
                        @click="signOut"
                        type="button"
                        class="text-sm text-light-gray border border-border rounded-lg flex items-center gap-1.5 w-full bg-bg hover:border-red hover:text-red duratiom-300 transition-all cursor-pointer"
                        :class="padding"
                    >
                        <LogOutIcon class="size-4.5" />
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    </header>
    <slot />
    <footer class="pb-6.75 mx-auto w-fit text-light-gray">
        by <NuxtLink class="text-primary hover:brightness-110 duration-300 transition-all" href="//d1yy.ru" target="_blank">diy</NuxtLink>
    </footer>
</template>
