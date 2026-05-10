<script setup lang="ts">
import { projectName } from "~/data/project";

definePageMeta({
  layout: "sidebar",
  pageTitle: "Проблема №2",
});

const seoTitle = "Проблема №2 — " + projectName;
const seoDescription =
  "Раздел " +
  projectName +
  " с актуальными проблемами, статусами, приоритетами и последними инцидентами для быстрой работы команды.";

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
</script>

<template>
  <div class="flex gap-4 h-full">
    <p>
      Типа описание проблемы №2. Тут будет подробная информация о проблеме, ее статусе, приоритете,
      связанных инцидентах и возможных решениях. Это просто пример страницы для демонстрации
      структуры и SEO оптимизации. В реальной жизни здесь будет динамический контент, загружаемый из
      базы данных или API.
    </p>
    <hr class="h-full border-transparent border-r border-r-border w-1.5" />
    <div class="w-full max-w-72">
      <div>
        <p>
          Статус:
          <span class="text-gray">Не решена</span>
        </p>
        <p>
          Создал:
          <span class="text-gray">Иван Иванов</span>
        </p>
        <p>
          Выполняет:
          <span class="text-gray">Иван Иванов</span>
        </p>
      </div>
    </div>
  </div>
</template>
