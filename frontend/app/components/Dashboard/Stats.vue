<script setup lang="ts">
const problemsSection = [
    {
        title: "Всего проблем",
        count: 8,
        color: "primary",
    },
    {
        title: "Проблемы",
        count: 2,
        color: "red",
    },
    {
        title: "В работе",
        count: 4,
        color: "orange",
    },
    {
        title: "Всего решений",
        count: 12,
        color: "green",
    },
];
</script>

<template>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 duration-300 transition-all">
        <UICard v-for="ps in problemsSection" :key="ps.title">
            <div class="absolute -top-1 -left-1 size-3.5 rounded-full" :style="{ backgroundColor: `var(--${ps.color})` }" />
            <span class="text-5xl font-medium w-fit">{{ ps.count }}</span>
            <span class="text-sm text-gray">{{ ps.title }}</span>
        </UICard>
    </div>
</template>
