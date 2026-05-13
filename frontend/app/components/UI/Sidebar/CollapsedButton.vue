<script setup lang="ts">
import { ChevronLeftIcon } from "@lucide/vue";

defineProps<{
  isCollapsed: boolean;
}>();
</script>

<template>
  <button
    class="absolute -right-4 top-1/2 -translate-y-1/2 bg-bg border border-border rounded-full p-1.5 hover:bg-secondary duration-300 transition-all cursor-pointer"
  >
    <ChevronLeftIcon
      class="size-4.5 text-gray duration-300 transition-all"
      :class="[isCollapsed ? 'rotate-180' : 'rotate-0']"
    />
  </button>
</template>
