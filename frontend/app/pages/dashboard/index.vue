<script setup lang="ts">
definePageMeta({
    layout: "sidebar",
    pageTitle: "Обзор",
});

const seoTitle = "Обзор // Ядро";
const seoDescription =
    "Внутренний дашборд Ядро для быстрого обзора проблем, задач в работе, последних инцидентов и статистики по категориям.";

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
    keywords: "Ядро, dashboard, обзор, проблемы, инциденты, решения, задачи, мониторинг",
});

useHead({
    htmlAttrs: {
        lang: "ru",
    },
    meta: [{ name: "theme-color", content: "#101012" }],
});
</script>

<template>
    <DashboardStats />
    <DashboardOverview />
</template>
