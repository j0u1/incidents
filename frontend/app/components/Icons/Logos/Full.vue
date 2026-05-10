<script setup lang="ts">
import Mini from "./Mini.vue";
import { projectName } from "~/data/project";

const props = withDefaults(
  defineProps<{
    size?: number;
    centered?: boolean;
  }>(),
  {
    size: 6.5,
    centered: false,
  },
);

const logoSize = computed(() => {
  const size = 4 * Number(props.size) + "px";

  return size;
});
</script>

<template>
  <div
    class="flex items-center text-lg duration-180 transition-all"
    :class="centered ? 'ml-1.25 gap-0' : 'gap-2.5'"
  >
    <Mini :style="{ width: logoSize, height: logoSize }" />
    <div class="duration-280 transition-all origin-left" :class="centered ? 'scale-0 opacity-0 w-0' : 'scale-100 opacity-100'">
      <span>{{ projectName }}</span>
      <span class="sr-only">{{ projectName }}</span>
    </div>
  </div>
</template>
