<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        size?: number;
    }>(),
    {
        size: 6.5,
    },
);

const logoSize = computed(() => {
    const size = 4 * Number(props.size) + "px";

    return size;
});
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :style="{ width: logoSize, height: logoSize }" fill="none" viewBox="0 0 48 48">
        <path fill="#87c2fa" d="M24 18a6 6 0 1 1 0 12 6 6 0 0 1 0-12" />
        <path
            fill="#87c2fa"
            fill-rule="evenodd"
            d="M24 0c13.255 0 24 10.745 24 24S37.255 48 24 48 0 37.255 0 24 10.745 0 24 0m0 9C15.716 9 9 15.716 9 24s6.716 15 15 15 15-6.716 15-15S32.284 9 24 9"
            clip-rule="evenodd"
        />
    </svg>
</template>
