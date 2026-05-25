<script setup lang="ts">
import { XIcon } from "@lucide/vue";
</script>

<template>
  <div
    class="absolute top-5 right-5 z-2 text-light-gray flex flex-col items-center border border-border px-2.5 rounded-lg py-1.5 hover:text-primary duration-300 transition-all cursor-pointer gap-0.5 hover:border-primary bg-bg"
  >
    <XIcon class="size-5" />
    <span class="text-sm cursor-pointer select-none">esc</span>
  </div>
</template>
