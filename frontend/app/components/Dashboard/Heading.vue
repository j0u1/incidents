<script setup lang="ts">
import { padding } from "~/data/dynamicStyles";

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
    <div class="flex items-end justify-between px-5 h-16.75">
        <h1 class="text-3xl font-medium">{{ title }}</h1>
        <div
            class="flex items-center gap-2 text-sm text-light-gray rounded-xl whitespace-nowrap select-none border border-border"
            :class="padding"
        >
            <div class="size-2 rounded-full bg-green" />
            Мало проблем
        </div>
    </div>
</template>
