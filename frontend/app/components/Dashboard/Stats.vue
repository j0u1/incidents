<script setup lang="ts">
import { CheckIcon, Clock10Icon, TriangleAlertIcon } from '@lucide/vue';


const { tickets, getTickets } = useTickets()
await getTickets()
const problemsSection = computed(() => [
    {
        title: "Нерешённых проблем",
        count: tickets.value.length,
        color: "red",
        icon: TriangleAlertIcon,
    },
    {
        title: "В работе",
        count: 4,
        color: "orange",
        icon: Clock10Icon
    },
    {
        title: "Всего решений",
        count: 12,
        color: "green",
        icon: CheckIcon
    },
]);
</script>

<template>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 duration-300 transition-all">
        <div v-for="ps in problemsSection" :key="ps.title" class="relative rounded-lg border border-border py-3 px-3.5 gap-2.5">
            <div class="absolute -top-1 -left-1 size-3.5 rounded-full" :style="{ backgroundColor: `var(--${ps.color})` }" />
            <div class="flex items-center gap-3.5">
                <component :is="ps.icon" class="text-gray size-6.5" />
                <span class="text-5xl font-medium w-fit">{{ ps.count }}</span>
            </div>
            <span class="text-sm text-gray">{{ ps.title }}</span>
        </div>
    </div>
</template>
