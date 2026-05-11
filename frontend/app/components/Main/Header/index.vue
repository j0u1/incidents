<script setup lang="ts">
import { NuxtLink } from "#components";
import { LogInIcon } from "@lucide/vue";

const authClient = useAuth();
const session = authClient.useSession();
const isMenuOpen = ref(false);
</script>

<template>
  <header class="flex items-center justify-between pt-4.75 px-6">
    <NuxtLink class="duration-300 transition-all active:scale-105" to="/">
      <IconsLogosFull />
    </NuxtLink>
    <div class="flex items-center gap-4 min-h-11">
      <NuxtLink to="https://github.com/j0u1/incidents" target="_blank">
        <IconsGitHub
          class="fill-gray hover:fill-light-gray duration-300 transition-all hover:scale-105 active:105 size-6"
        />
      </NuxtLink>
      <div class="relative">
        <UIButtonBase
          v-if="!session.data?.session"
          :as="NuxtLink"
          href="/login"
          variant="filled"
          :icon="LogInIcon"
        >
          Войти
        </UIButtonBase>
        <template v-else>
          <UIAvatar
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
