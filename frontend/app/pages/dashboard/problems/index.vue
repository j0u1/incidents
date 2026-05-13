<script lang="ts" setup>
import { PlusIcon } from "@lucide/vue";
import { projectName } from "~/data/project";

definePageMeta({
  layout: "sidebar",
  pageTitle: "Инциденты",
});

const seoTitle = "Инциденты — " + projectName;
const seoDescription =
  "Раздел " +
  projectName +
  " с актуальными инцидентами, статусами, приоритетами и последними инцидентами для быстрой работы команды.";

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
    ", проблемы, инциденты, тикеты, статусы, приоритеты, решения, dashboard, support, task management",
});

useHead({
  htmlAttrs: {
    lang: "ru",
  },
  meta: [{ name: "theme-color", content: "#101012" }],
});
</script>

<template>
  <DashboardProblems />
</template>
