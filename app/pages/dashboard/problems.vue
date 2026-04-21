<script lang="ts" setup>
import { PlusIcon } from "@lucide/vue";

definePageMeta({
    layout: "sidebar",
    pageTitle: "Проблемы",
});

const seoTitle = "Проблемы // Ядро";
const seoDescription = "Раздел Ядро с актуальными проблемами, статусами, приоритетами и последними инцидентами для быстрой работы команды.";

useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    ogTitle: seoTitle,
    ogDescription: seoDescription,
    ogType: "website",
    ogSiteName: "Ядро",
    ogLocale: "ru_RU",
    twitterCard: "summary",
    twitterTitle: seoTitle,
    twitterDescription: seoDescription,
    robots: "noindex, nofollow, noarchive",
    keywords: "Ядро, проблемы, инциденты, тикеты, статусы, приоритеты, решения, dashboard, support, task management",
});

useHead({
    htmlAttrs: {
        lang: "ru",
    },
    meta: [{ name: "theme-color", content: "#101012" }],
});
</script>

<template>
    <UICard :button="{ boolean: true, text: 'Добавить новую проблему' }" :icon="PlusIcon" :noBorder="true">
        <DashboardProblems />
    </UICard>
</template>
