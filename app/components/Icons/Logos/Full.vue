<script setup>
import Mini from "./Mini.vue";

const projectName = "Ядро";
</script>

<template>
    <div class="flex items-center gap-2 font-medium text-lg">
        <Mini class="size-6" />
        <span class="mt-0.5">{{ projectName }}</span>
        <span class="sr-only">{{ projectName }}</span>
    </div>
</template>
