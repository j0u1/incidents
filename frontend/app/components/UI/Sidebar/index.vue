<script lang="ts" setup>
import { LogInIcon, LogOutIcon, ChevronLeftIcon } from "@lucide/vue";
import { onClickOutside } from "@vueuse/core";
import { useAuth } from "~/composables/useAuthClient";
import { padding } from "~/data/dynamicStyles";

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
  <aside class="fixed h-screen p-2.5 pr-0 duration-300 transition-all">
    <div
      class="relative border border-border p-2.5 rounded-lg space-y-0 bg-bg duration-500 transition-all"
      :class="[isCollapsed ? 'w-19.75' : 'w-3/14 min-w-56']"
    >
      <div class="m-2.5 pb-3">
        <NuxtLink to="/">
          <IconsLogosFull />
        </NuxtLink>
        <button
          @click="clickCollapsed"
          class="absolute -right-3 top-1/2 -translate-y-1/2 bg-bg border border-border rounded-full p-1.5 hover:bg-secondary duration-300 transition-all cursor-pointer"
        >
          <ChevronLeftIcon
            class="size-4.5 text-gray duration-300 transition-all"
            :class="[!isCollapsed ? 'rotate-180' : 'rotate-0']"
          />
        </button>
      </div>
      <div class="space-y-2" :class="[isCollapsed && 'w-full']">
        <UIPages :muted="true" :noText="isCollapsed ? true : false" />
      </div>

      <div
        ref="dropDownRef"
        @click="session.data ? (dropDown = !dropDown) : ''"
        class="absolute bottom-2.5 inset-x-2.5 p-2.5 border border-border rounded-lg flex items-center gap-2.5 duration-200 transition-all cursor-pointer"
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
          <UIAvatar
            :src="session.data.user.image ?? undefined"
            class="aspect-square"
            :class="isCollapsed ? 'size-8.5' : 'size-10'"
          />
          <div v-if="!isCollapsed">
            <p>{{ session.data.user.name }}</p>
            <p class="text-sm text-light-gray">
              {{ session.data.user.email }}
            </p>
          </div>
        </div>
        <div
          class="absolute inset-x-0 border border-border rounded-lg flex flex-col items-center gap-2.5 duration-200 transition-all bg-secondary origin-bottom"
          :class="[
            !session.data ? 'opacity-0' : 'opacity-100',
            padding,
            dropDown ? 'bottom-19 scale-100' : 'bottom-16 scale-0',
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
      </div>
    </div>
  </aside>
</template>
