<script lang="ts" setup>
import { LogInIcon } from "@lucide/vue";
import { useAuthClient } from "~/composables/useAuthClient";
import { padding } from "~/data/dynamicStyles";
import { pages } from "~/data/pages";

const route = useRoute();
const isCollapsed = ref(false);
const authClient = useAuthClient();
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

function signOut() {
    return authClient.signOut();
}

let clickCollapsed = () => {
    isCollapsed.value = !isCollapsed.value;
};
</script>

<template>
    <aside
        class="relative h-screen flex flex-col gap-4 duration-300 transition-all border-r border-border"
        :class="[isCollapsed ? 'w-19.75' : 'w-2/12 min-w-56']"
    >
        <div @click="clickCollapsed" class="absolute right-0 h-full w-1 cursor-col-resize" />
        <UISidebarHead :isCollapsed="isCollapsed" @toggle="clickCollapsed" />
        <hr class="h-0.5 w-full border-border" />
        <div class="space-y-3.5 px-3" :class="[isCollapsed && 'w-fit']">
            <NuxtLink
                v-for="page in pages"
                :key="page.title"
                :to="page.path"
                class="flex items-center gap-2 text-gray rounded-lg font-medium duration-200 transition-all whitespace-nowrap relative border"
                :class="[
                    route.path === page.path
                        ? 'border-transparent bg-secondary text-light-gray cursor-default'
                        : 'border-secondary hover:border-primary hover:text-primary',
                    isCollapsed ? 'size-12.75' : '',
                    padding,
                ]"
            >
                <component
                    :is="page.icon"
                    class="shrink-0 duration-300 transition-all"
                    :class="[isCollapsed ? 'size-5 mx-auto my-2' : 'size-4.5', route.path === page.path && 'delay-100']"
                />
                <span
                    class="duration-200 transition-all origin-left"
                    :class="[isCollapsed ? 'scale-0 absolute opacity-0' : 'relative scale-100']"
                >
                    {{ page.title }}
                </span>
            </NuxtLink>
        </div>
        <div
            class="absolute border border-border rounded-lg flex items-center gap-2.5 duration-300 transition-all"
            :class="[padding, isCollapsed ? 'bottom-4 left-1/2 -translate-x-1/2 size-12.5' : 'bottom-4 left-4 right-4']"
        >
            <button
                v-if="!session.data"
                type="button"
                class="flex items-center gap-1.5 text-sm text-light-gray hover:text-primary size-full cursor-pointer duration-300 transition-all"
                @click="signInWithGithub"
            >
                <LogInIcon class="size-4.5" />
                Войти
            </button>

            <div v-else class="flex items-center gap-2.5">
                <UserAvatar :src="session.data.user.image ?? undefined" :class="isCollapsed ? 'size-6' : 'size-10'" />
                <div v-if="!isCollapsed">
                    <p>{{ session.data.user.name }}</p>
                    <p class="text-sm text-light-gray">{{ session.data.user.email }}</p>
                </div>
                <!-- <button @click="signOut" type="button" class="text-sm text-light-gray hover:text-primary">Выйти</button> -->
            </div>
        </div>
    </aside>
</template>
