<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

const dropDownRef = ref(null);
const isOpen = defineModel<boolean>();

onClickOutside(dropDownRef, () => {
  isOpen.value = false;
});

const props = defineProps<{
  session: { data: any };
}>();
</script>

<template>
  <div
    ref="dropDownRef"
    class="absolute border border-border rounded-xl flex flex-col items-center gap-2.5 duration-200 transition-all bg-secondary origin-top-right w-56 right-0 p-2.5"
    :class="[
      isOpen ? 'top-12 scale-100 opacity-100' : 'top-7.5 scale-30 opacity-0',
    ]"
  >
    <UIPages dropDown />
  </div>
</template>
