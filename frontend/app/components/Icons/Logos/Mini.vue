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
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    fill="none"
    :style="{ width: logoSize, height: logoSize }"
  >
    <path fill="#60a5fa" d="M13 9.75a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5" />
    <path
      fill="#60a5fa"
      fill-rule="evenodd"
      d="M17.333 0A8.667 8.667 0 0 1 26 8.667v8.666A8.667 8.667 0 0 1 17.333 26H8.667A8.667 8.667 0 0 1 0 17.333V8.667A8.667 8.667 0 0 1 8.667 0zM13 4.875a8.125 8.125 0 1 0 0 16.25 8.125 8.125 0 0 0 0-16.25"
      clip-rule="evenodd"
    />
  </svg>
</template>
