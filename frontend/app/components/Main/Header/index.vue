<script setup lang="ts">
import { LogOutIcon } from "@lucide/vue";
import { padding } from "~/data/dynamicStyles";
import { visibleNavigation } from "~/config/navigation";

const authClient = useAuth();
const session = authClient.useSession();
const isMenuOpen = ref(false);

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
    <header class="flex items-center justify-between pt-6.5 px-4">
        <NuxtLink class="duration-300 transition-all active:scale-105" to="/">
            <IconsLogosFull />
        </NuxtLink>
        <div class="flex items-center gap-4 min-h-11">
            <NuxtLink to="//github.com/j0u1/yadro-frontend" target="_blank">
                <IconsGitHub
                    class="fill-gray hover:fill-light-gray duration-300 transition-all hover:scale-105 active:105 size-6"
                />
            </NuxtLink>
            <div class="relative">
                <UIButton v-if="!session.data" variant="login" />
                <template v-else>
                    <UserAvatar
                        @click="isMenuOpen = !isMenuOpen"
                        :src="session.data.user.image ?? undefined"
                        class="size-8 cursor-pointer"
                    />
                    <UIDropDown v-model="isMenuOpen" :session="session" />
                </template>
            </div>
        </div>
    </header>
</template>
