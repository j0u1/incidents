<script setup lang="ts">
const props = defineProps<{
    size?: number | string;
    src?: string | undefined;
}>();

const normalizedSize = computed(() => {
    const size = Number(props.size);

    return Number.isFinite(size) && size > 0 ? size : 14;
});

const boxSize = computed(() => `calc(var(--spacing) * ${normalizedSize.value})`);
</script>

<template>
    <NuxtImg
        class="select-none bg-primary text-black font-medium text-xl flex items-center justify-center rounded-full shrink-0 duration-300 transition-all"
        :src="src"
    />
</template>
