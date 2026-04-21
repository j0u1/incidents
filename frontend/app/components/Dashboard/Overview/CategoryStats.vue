<script setup lang="ts">
import { getPercent, statisticsOfCategories } from "~/data/categoriesStats";
</script>

<template>
    <UICard class="min-h-67" title="Статистика по категориям">
        <div class="flex flex-col gap-4">
            <div
                v-for="category in statisticsOfCategories"
                :key="category.name"
                class="text-sm flex justify-between p-4 border border-border rounded-lg"
            >
                <div class="flex items-center justify-items-center gap-4 w-full">
                    <span class="uppercase text-gray w-38 truncate">{{ category.name }}</span>
                    <div class="w-full rounded-full h-2 bg-secondary overflow-hidden">
                        <div class="h-full bg-gray rounded-full" :style="{ width: getPercent(category.value) }" />
                    </div>
                    <span>{{ category.value }}</span>
                </div>
            </div>
        </div>
    </UICard>
</template>
