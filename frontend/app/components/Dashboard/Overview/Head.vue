<script setup lang="ts">
import { Grid2X2Icon, SearchIcon } from "@lucide/vue";

const search = ref("");

defineProps<{
  isGrid: boolean;
}>();
</script>

<template>
  <div class="flex items-center justify-between">
    <UIInput
      :icon="SearchIcon"
      placeholder="Поиск по инцидентам"
      type="search"
      :modelValue="search"
      class="w-full max-w-141.5"
    />
    <button
      @click="isGrid = !isGrid"
      type="button"
      class="flex items-center gap-2.5 duration-300 transition-all cursor-pointer w-fit active:scale-95"
      :class="isGrid ? 'text-primary' : 'text-gray hover:text-primary'"
    >
      <Grid2X2Icon class="size-4.5 shrink-0" />
      Сетка
    </button>
  </div>
</template>
