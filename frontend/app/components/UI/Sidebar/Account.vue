<script setup lang="ts">
import { LogInIcon, LogOutIcon, ChevronLeftIcon, SettingsIcon } from "@lucide/vue";
import { onClickOutside } from "@vueuse/core";
import { useAuth } from "~/composables/useAuthClient";
import { features } from "~/config/features";
import { padding } from "~/data/dynamicStyles";

const sidebar = useSidebarStore();
const isCollapsed = computed(() => !sidebar.isOpen);
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

onClickOutside(dropDownRef, () => {
  dropDown.value = false;
});
</script>

<template>
  <div
    @click="session.data ? (dropDown = !dropDown) : ''"
    class="absolute bottom-2.5 border rounded-md flex items-center gap-2.5 duration-200 transition-all cursor-pointer"
    :class="isCollapsed ? 'pb-2 border-transparent inset-x-4' : 'border-border p-2.5 inset-x-2.5'"
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

    <div v-else class="relative flex items-center gap-2.5 w-full select-none">
      <UIAvatar :src="session.data.user.image ?? undefined" class="aspect-square size-10" />
      <div v-if="!isCollapsed">
        <p>{{ session.data.user.name }}</p>
        <p class="text-sm text-light-gray">
          {{ session.data.user.email }}
        </p>
      </div>
    </div>
    <div
      class="absolute inset-x-0 border border-border rounded-lg flex flex-col items-center gap-2 transition-all origin-bottom duration-180"
      :class="[
        !session.data ? 'opacity-0' : 'opacity-100',
        !isCollapsed ? padding && 'bg-secondary p-1.5' : 'border-0 bg-transparent -mb-2',
        dropDown ? 'bottom-19 scale-100' : 'bottom-16 scale-0',
      ]"
    >
      <button
        @click="signOut"
        type="button"
        class="text-light-gray rounded-lg flex items-center gap-1.5 w-full bg-bg hover:border-red hover:text-red duratiom-300 cursor-pointer duration-300 transition-all"
        :class="[padding, isCollapsed && 'bg-transparent']"
      >
        <LogOutIcon class="size-4.5 shrink-0" />
        <span
          class="duration-300 transition-all"
          :class="isCollapsed ? 'w-0 text-[0px] opacity-0' : 'opacity-100 w-fit text-sm'"
        >
          Выйти
        </span>
      </button>

      <NuxtLink
        v-if="features.settings"
        to="/settings"
        class="text-light-gray rounded-lg flex items-center gap-1.5 w-full bg-bg hover:border-primary hover:text-primary duratiom-300 cursor-pointer duration-300 transition-all"
        :class="[padding, isCollapsed && 'bg-transparent']"
      >
        <SettingsIcon class="size-4.5 shrink-0" />
        <span
          class="duration-300 transition-all"
          :class="isCollapsed ? 'w-0 text-[0px] opacity-0' : 'opacity-100 w-fit text-sm'"
        >
          Настройки
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
