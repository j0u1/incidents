<script setup lang="ts">
import type { NuxtError } from "#app";
import { ArrowLeft, House, RefreshCw, TriangleAlert } from "@lucide/vue";

const props = defineProps({
    error: Object as () => NuxtError,
});

const statusCode = computed(() => props.error?.statusCode || 500);
const isNotFound = computed(() => statusCode.value === 404);

const title = computed(() => {
    if (isNotFound.value) return "Страница не найдена";
    if (statusCode.value === 403) return "Доступ ограничен";
    return "Что-то пошло не так";
});

const description = computed(() => {
    if (isNotFound.value) {
        return "Похоже, адрес изменился или нужная страница больше недоступна. Вернитесь в обзор и продолжите работу оттуда.";
    }

    return "Ошибка могла возникнуть временно во время загрузки данных или рендера страницы. Попробуйте восстановить экран или перейти в безопасный раздел.";
});

const statusMessage = computed(() => {
    return props.error?.statusMessage || props.error?.message || "Внутренняя ошибка приложения";
});

const technicalMessage = computed(() => {
    const rawMessage = props.error?.message?.trim();

    if (!rawMessage || rawMessage === statusMessage.value) return "";

    return rawMessage;
});

const handlePrimaryAction = async () => {
    if (isNotFound.value) {
        await clearError({ redirect: "/dashboard" });
        return;
    }

    await clearError();
};

const handleBack = async () => {
    if (import.meta.client && window.history.length > 1) {
        await clearError();
        window.history.back();
        return;
    }

    await clearError({ redirect: "/dashboard" });
};

const handleSafeRedirect = async () => {
    await clearError({ redirect: "/dashboard" });
};
</script>

<template>
    <div class="relative min-h-screen overflow-hidden bg-bg text-text">
        <div class="pointer-events-none absolute inset-0">
            <div
                class="absolute -left-24 -top-16 h-72 w-72 rounded-full blur-3xl"
                style="background: rgba(135, 194, 250, 0.16)"
            />
            <div
                class="absolute right-[-4rem] top-20 h-80 w-80 rounded-full blur-3xl"
                style="background: rgba(224, 59, 59, 0.1)"
            />
            <div
                class="absolute bottom-[-5rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
                style="background: rgba(38, 162, 73, 0.08)"
            />
            <div
                class="absolute inset-0 opacity-40"
                style="background-image: linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px); background-size: 56px 56px; mask-image: radial-gradient(circle at center, black, transparent 78%)"
            />
        </div>

        <main class="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-6 sm:px-6 lg:px-8">
            <div class="grid w-full gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
                <section class="relative overflow-hidden rounded-3xl border border-border bg-secondary/55 p-6 sm:p-8 lg:p-10">
                    <div class="mb-10 flex items-center justify-between gap-4">
                        <div class="rounded-2xl border border-border bg-bg/70 px-4 py-3">
                            <IconsLogosFull />
                        </div>

                        <div class="flex items-center gap-2 rounded-full border border-border bg-bg/60 px-3 py-2 text-sm text-light-gray">
                            <div class="h-2 w-2 rounded-full bg-red" />
                            Системная ошибка
                        </div>
                    </div>

                    <div class="mb-6 flex items-center gap-4">
                        <div class="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-bg/80 text-primary">
                            <TriangleAlert class="size-7" />
                        </div>

                        <div class="flex flex-wrap items-center gap-3">
                            <div class="rounded-full border border-border bg-bg/80 px-4 py-2 text-sm text-light-gray">
                                Код {{ statusCode }}
                            </div>
                            <div class="rounded-full border border-border bg-bg/80 px-4 py-2 text-sm text-light-gray break-words">
                                {{ statusMessage }}
                            </div>
                        </div>
                    </div>

                    <div class="max-w-2xl space-y-4">
                        <p class="text-4xl font-medium tracking-tight sm:text-5xl">
                            {{ title }}
                        </p>

                        <p class="max-w-xl text-base leading-7 text-light-gray sm:text-lg">
                            {{ description }}
                        </p>

                        <p
                            v-if="technicalMessage"
                            class="rounded-2xl border border-border bg-bg/75 px-4 py-3 text-sm leading-6 text-light-gray"
                        >
                            {{ technicalMessage }}
                        </p>
                    </div>

                    <div class="mt-10 flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            class="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-medium text-bg transition-all hover:opacity-90 cursor-pointer"
                            @click="handlePrimaryAction"
                        >
                            <RefreshCw class="size-4" />
                            {{ isNotFound ? "Открыть обзор" : "Попробовать снова" }}
                        </button>

                        <button
                            type="button"
                            class="flex items-center justify-center gap-2 rounded-2xl border border-border bg-bg/70 px-5 py-3 font-medium text-text transition-all hover:border-primary hover:text-primary cursor-pointer"
                            @click="handleBack"
                        >
                            <ArrowLeft class="size-4" />
                            Назад
                        </button>

                        <button
                            type="button"
                            class="flex items-center justify-center gap-2 rounded-2xl border border-border bg-transparent px-5 py-3 font-medium text-light-gray transition-all hover:border-primary hover:text-primary cursor-pointer"
                            @click="handleSafeRedirect"
                        >
                            <House class="size-4" />
                            В обзор
                        </button>
                    </div>
                </section>

                <aside class="flex flex-col gap-4">
                    <div class="rounded-3xl border border-border bg-bg/75 p-6">
                        <p class="mb-4 text-sm uppercase tracking-[0.18em] text-gray">Что можно сделать</p>
                        <div class="space-y-3">
                            <div class="rounded-2xl border border-border bg-secondary/70 p-4">
                                <p class="mb-1 text-sm font-medium">Перезагрузить состояние</p>
                                <p class="text-sm leading-6 text-light-gray">
                                    Нажмите «Попробовать снова», если ошибка возникла во время загрузки или обновления данных.
                                </p>
                            </div>
                            <div class="rounded-2xl border border-border bg-secondary/70 p-4">
                                <p class="mb-1 text-sm font-medium">Вернуться на предыдущий экран</p>
                                <p class="text-sm leading-6 text-light-gray">
                                    Если вы пришли по ссылке или из списка задач, шаг назад часто сразу возвращает в рабочий поток.
                                </p>
                            </div>
                            <div class="rounded-2xl border border-border bg-secondary/70 p-4">
                                <p class="mb-1 text-sm font-medium">Открыть безопасный раздел</p>
                                <p class="text-sm leading-6 text-light-gray">
                                    Кнопка «В обзор» отправит вас в основной раздел дашборда и сбросит текущее состояние ошибки.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="rounded-3xl border border-border bg-secondary/45 p-6">
                        <p class="mb-3 text-sm uppercase tracking-[0.18em] text-gray">Сводка</p>
                        <div class="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                            <div class="rounded-2xl border border-border bg-bg/70 p-4">
                                <p class="text-sm text-gray">Код</p>
                                <p class="mt-2 text-3xl font-medium">{{ statusCode }}</p>
                            </div>
                            <div class="rounded-2xl border border-border bg-bg/70 p-4">
                                <p class="text-sm text-gray">Тип</p>
                                <p class="mt-2 text-lg font-medium">{{ isNotFound ? "Навигация" : "Выполнение" }}</p>
                            </div>
                            <div class="rounded-2xl border border-border bg-bg/70 p-4">
                                <p class="text-sm text-gray">Статус</p>
                                <p class="mt-2 text-lg font-medium text-light-gray">
                                    {{ props.error?.fatal ? "Критическая" : "Перехвачена экраном ошибки" }}
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    </div>
</template>
