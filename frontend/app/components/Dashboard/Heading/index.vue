<script setup lang="ts">
import { PlusIcon } from "@lucide/vue";

const openModal = ref(false);

withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {
    title: "Обзор",
  },
);
</script>

<template>
  <div class="flex items-end justify-between px-5 max-h-fit mt-5">
    <h1 class="text-3xl font-medium">{{ title }}</h1>
    <UIButtonBase :icon="PlusIcon" @click="openModal = !openModal">
      Добавить инцидент
    </UIButtonBase>
  </div>
  <DashboardHeadingNewInc v-model:openModal="openModal" />
</template>
