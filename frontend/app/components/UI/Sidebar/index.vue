<script lang="ts" setup>
import { LogInIcon, LogOutIcon, ChevronDownIcon } from "@lucide/vue";
import { onClickOutside } from "@vueuse/core";
import { useAuth } from "~/composables/useAuthClient";
import { padding } from "~/data/dynamicStyles";
import { visibleNavigation } from "~/config/navigation";

const route = useRoute();
const isCollapsed = ref(false);
const dropDownRef = ref(null);
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
    window.location.href = `${window.location.origin}/`;
}

let clickCollapsed = () => {
    isCollapsed.value = !isCollapsed.value;
};

onClickOutside(dropDownRef, () => {
    dropDown.value = false;
});
</script>

<template>
    <aside
        class="relative h-screen flex flex-col gap-4 duration-300 transition-all border-r border-border"
        :class="[isCollapsed ? 'w-19.75' : 'w-3/14 min-w-56']"
    >
        <div
            @click="clickCollapsed"
            class="absolute -right-1 h-full w-2 cursor-col-resize"
        />
        <UISidebarHead :isCollapsed="isCollapsed" @toggle="clickCollapsed" />
        <hr class="h-0.5 w-full border-border" />
         <div class="space-y-3.5 px-3" :class="[isCollapsed && 'w-fit']">
             <UIPages :muted="true" :noText="isCollapsed ? true : false" />
        </div>
        <div
            ref="dropDownRef"
            @click="session.data ? (dropDown = !dropDown) : ''"
            class="absolute flex border items-center gap-2.5 duration-200 transition-all cursor-pointer z-1 group"
            :class="[
                isCollapsed
                    ? 'bottom-4 left-1/2 -translate-x-1/2 border-transparent rounded-none'
                    : ['bottom-4 left-4 right-4 border border-border rounded-lg', padding],
                dropDown ? 'bg-secondary' : 'bg-bg',
            ]"
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

            <div
                v-else
                class="relative flex items-center gap-2.5 w-full select-none"
            >
                <UIAvatar
                    :src="session.data.user.image ?? undefined"
                    class="aspect-1/1"
                    :class="isCollapsed ? 'size-8.5' : 'size-10'"
                />
                <div v-if="!isCollapsed">
                    <p>{{ session.data.user.name }}</p>
                    <p class="text-sm text-light-gray">
                        {{ session.data.user.email }}
                    </p>
                </div>
                <ChevronDownIcon
                    class="absolute right-0 size-4.5 text-gray shrink-0 duration-300 transition-all"
                    :class="[dropDown ? 'rotate-180' : 'group-hover:rotate-90', isCollapsed ? 'opacity-0 scale-0' : 'opacity-100 scale-100']"
                />
            </div>
        </div>
        <div
            class="absolute left-4 right-4 border border-border rounded-lg flex flex-col items-center gap-2.5 duration-200 transition-all bg-secondary origin-bottom"
            :class="[
                !session.data ? 'opacity-0' : 'opacity-100',
                padding,
                dropDown ? 'bottom-24 scale-100' : 'bottom-4 scale-0',
            ]"
        >
            <button
                @click="signOut"
                type="button"
                class="text-sm text-light-gray border border-border rounded-lg flex items-center gap-1.5 w-full bg-bg hover:border-red hover:text-red duratiom-300 transition-300 cursor-pointer"
                :class="padding"
            >
                <LogOutIcon class="size-4.5" />
                Выйти
            </button>
        </div>
    </aside>
</template>
