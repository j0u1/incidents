<script setup lang="ts">
const props = defineProps<{
    size?: number | string;
    src?: string | undefined;
}>();
</script>

<template>
    <NuxtImg
        class="select-none bg-gray text-black font-medium text-xl flex items-center justify-center rounded-full shrink-0 duration-300 transition-all"
        :src="src ? src : '/images/avatar.webp'"
    />
</template>
