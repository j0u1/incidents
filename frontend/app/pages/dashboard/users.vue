<script lang="ts" setup>
import { PlusIcon } from "@lucide/vue";
import { padding } from "~/data/dynamicStyles";
import { userStats } from "~/data/user";
import { projectName } from "~/data/project";

definePageMeta({
    layout: "sidebar",
    pageTitle: "Участники",
});

const seoTitle = "Участники // " + projectName;
const seoDescription =
    "Раздел " +
    projectName +
    " с участниками команды, ролями, зонами ответственности и текущей загрузкой для удобного распределения задач.";

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
        ", участники, команда, сотрудники, пользователи, роли, ответственность, загрузка, dashboard, team",
});

useHead({
    htmlAttrs: {
        lang: "ru",
    },
    meta: [{ name: "theme-color", content: "#101012" }],
});
</script>

<template>
    <UICard
        :button="{ boolean: true, text: 'Добавить нового участника' }"
        :icon="PlusIcon"
        :noBorder="true"
    >
        <div class="flex flex-col xl:flex-row gap-3.5">
            <div
                class="border rounded-lg border-border w-full flex flex-col lg:flex-row justify-between"
                :class="padding"
            >
                <div class="flex gap-4">
                    <div
                        class="select-none bg-primary size-14 text-black font-medium text-xl flex items-center justify-center rounded-full shrink-0"
                    >
                        Д
                    </div>
                    <div>
                        <div class="flex items-center gap-4">
                            <h3 class="text-light-gray font-medium">
                                Дмитрий Иванов
                            </h3>
                            <div
                                class="text-green flex items-center gap-1.5 text-sm"
                            >
                                <div
                                    class="size-2 bg-[currentColor] rounded-full"
                                />
                                <p class="font-medium">На сайте</p>
                            </div>
                        </div>
                        <p class="text-gray text-sm h-4">Сетевой отдел</p>
                        <NuxtLink
                            class="text-primary hover:brightness-110 duration-300 transition-all"
                            to="mailto:d.ivanov@example.com"
                        >
                            d.ivanov@example.com
                        </NuxtLink>
                        <p class="text-gray text-sm h-4.5">
                            Решает текущие проблемы
                        </p>
                    </div>
                </div>
                <div class="flex flex-col items-end">
                    <div class="flex flex-col items-end justify-between h-full">
                        <p class="text-light-gray">
                            <span class="text-gray">В команде с:</span> 18 май
                            2024 г.
                        </p>
                        <div class="flex gap-2.5">
                            <div
                                v-for="us in userStats"
                                :key="us.title"
                                class="flex flex-col items-center border border-border rounded-md w-fit px-2 py-1 min-w-20"
                            >
                                <span class="text-light-gray text-lg">
                                    {{ us.value }}
                                </span>
                                <span class="text-sm h-4 text-gray -mt-1">
                                    {{ us.title }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </UICard>
</template>
