<script setup lang="ts">
import { NuxtLink } from "#components";
import { LayoutIcon, LoaderIcon as Loader2Icon, LogInIcon } from "@lucide/vue";

const authClient = useAuth();
const session = authClient.useSession();
</script>

<template>
  <main
    class="flex flex-col gap-16 items-center max-h-[87.5dvh] overflow-hidden border-b border-border"
  >
    <h1 class="text-6xl font-medium flex flex-col gap-2 text-center pt-18">
      <span>Инциденты случаются,</span>
      <span class="text-primary">Вы решите их быстрее</span>
    </h1>
    <UIButtonBase
      v-if="!session.data?.session"
      :as="NuxtLink"
      href="/login"
      variant="filled"
      :icon="LogInIcon"
      :isLoading="session.isPending"
    >
      {{ session.isPending ? "Загрузка..." : "Войти в систему" }}
    </UIButtonBase>
    <UIButtonBase v-else :as="NuxtLink" href="/dashboard" variant="filled" :icon="LayoutIcon">
      Перейти в Обзор
    </UIButtonBase>
    <NuxtImg
      class="max-w-11/12 mx-auto rounded-t-2xl outline outline-border w-full"
      src="/images/preview.webp"
      preload
      fetchpriority="high"
      :placeholder="[1280, 570, 10, 20]"
    />
  </main>
</template>
