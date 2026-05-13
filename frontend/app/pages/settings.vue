<script setup lang="ts">
import { SaveIcon } from "@lucide/vue";
import { projectName } from "~/data/project";

definePageMeta({
  layout: "sidebar",
  pageTitle: "Настройки",
});

const seoTitle = "Настройки — " + projectName;
const seoDescription = "Настройки " + projectName + " сервиса инциденты";
const { getStatuses, statuses } = useStatuses();
await getStatuses();

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogType: "website",
  ogSiteName: projectName,
  ogLocale: "ru_RU",
  twitterCard: "summary",
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
  robots: "noindex, nofollow, noarchive",
  keywords:
    projectName +
    ", dashboard, обзор, проблемы, инциденты, решения, задачи, мониторинг, Настройки, настройки",
});

const form = reactive({
  status: statuses.value[0]?.id ?? "",
});
</script>

<template>
  <!-- Нужно добавить функционал :))) -->
  <div class="grid gap-4 max-w-sm">
    <div class="grid gap-2">
      <UIInputLabel label="Статус по-умолчанию" />
      <select
        v-model="form.status"
        class="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option
          v-for="status in statuses"
          :key="status.id"
          :value="status.id"
          class="flex items-center gap-2"
        >
          <div class="size-4 rounded-full shrink-0" :style="{ backgroundColor: status.color }" />
          {{ status.name }}
        </option>
      </select>
    </div>
    <UIButtonBase :icon="SaveIcon" variant="filled">Сохранить</UIButtonBase>
  </div>
</template>
