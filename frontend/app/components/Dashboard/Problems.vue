<script setup lang="ts">
import { padding } from "~/data/dynamicStyles";
</script>

<template>
    <div class="flex flex-col gap-4">
        <div
            class="flex justify-between border border-border rounded-lg"
            :class="padding"
        >
            <div class="flex gap-4 items-center">
                <span class="uppercase text-gray">прб-0042</span>
                <p class="text-light-gray max-w-100 truncate text-sm">
                    Не работает внутренний прокси, после обновления Windows
                </p>
            </div>
        </div>
    </div>
</template>
