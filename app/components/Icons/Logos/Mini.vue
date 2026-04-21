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
    <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        :style="{ width: logoSize, height: logoSize }"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M24 18C27.3137 18 30 20.6863 30 24C30 27.3137 27.3137 30 24 30C20.6863 30 18 27.3137 18 24C18 20.6863 20.6863 18 24 18Z"
            fill="#87C2FA"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M32 0C40.8366 0 48 7.16344 48 16V32C48 40.8366 40.8366 48 32 48H16C7.16344 48 2.5772e-07 40.8366 0 32V16C0 7.16344 7.16344 2.5772e-07 16 0H32ZM24 9C15.7157 9 9 15.7157 9 24C9 32.2843 15.7157 39 24 39C32.2843 39 39 32.2843 39 24C39 15.7157 32.2843 9 24 9Z"
            fill="#87C2FA"
        />
    </svg>
</template>
