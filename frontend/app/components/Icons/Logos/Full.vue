<script setup lang="ts">
import Mini from "./Mini.vue";
import { projectName } from "~/data/project";

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
  <div class="flex items-center gap-2.5 text-lg">
    <Mini :style="{ width: logoSize, height: logoSize }" />
    <span>{{ projectName }}</span>
    <span class="sr-only">{{ projectName }}</span>
  </div>
</template>
