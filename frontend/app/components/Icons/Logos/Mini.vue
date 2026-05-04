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
        width="24"
        height="24"
        viewBox="0 0 24 24"
        :style="{ width: logoSize, height: logoSize }"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12.0934 19.2798V4.60983C12.0934 3.91096 11.2484 3.56096 10.7542 4.05514L0.554693 14.2547C0.248344 14.561 0.248346 15.0577 0.554694 15.3641L6.2358 21.0452C6.43397 21.2433 6.72281 21.3207 6.99352 21.2482L11.5119 20.0375C11.8549 19.9456 12.0934 19.6348 12.0934 19.2798Z"
            fill="#E7E7EF"
        />
        <path
            d="M14.0328 19.0158V5.54783C14.0328 4.74628 15.0932 4.46076 15.4957 5.15394L23.3158 18.6219C23.6195 19.1449 23.2421 19.8003 22.6374 19.8003H14.8173C14.384 19.8003 14.0328 19.4491 14.0328 19.0158Z"
            fill="#E7E7EF"
        />
    </svg>
</template>
