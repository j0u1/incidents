<script lang="ts" setup>
import { ChevronLeftIcon } from "@lucide/vue";
import { onClickOutside } from "@vueuse/core";

const { isOpen, toggle } = useSidebar();
const isCollapsed = computed(() => !isOpen.value);
const clickCollapsed = toggle;
const dropDownRef = ref(null);
const dropDown = ref(false);

onClickOutside(dropDownRef, () => {
  dropDown.value = false;
});
</script>

<template>
  <aside class="fixed h-screen p-2.5 pr-0 duration-300 transition-all">
    <div
      class="relative border border-border p-2.5 rounded-lg space-y-0 bg-bg duration-200 transition-all"
      :class="[isCollapsed ? 'min-w-19.75' : 'w-3/14 min-w-56']"
    >
      <div class="m-2.5 pb-3">
        <NuxtLink to="/">
          <IconsLogosFull :centered="isCollapsed" />
        </NuxtLink>
        <button
          @click="clickCollapsed"
          class="absolute -right-3 top-1/2 -translate-y-1/2 bg-bg border border-border rounded-full p-1.5 hover:bg-secondary duration-300 transition-all cursor-pointer"
        >
          <ChevronLeftIcon
            class="size-4.5 text-gray duration-300 transition-all"
            :class="[isCollapsed ? 'rotate-180' : 'rotate-0']"
          />
        </button>
      </div>
      <div class="space-y-2" :class="[isCollapsed && 'w-full']">
        <UIPages
          :muted="true"
          :noText="isCollapsed ? true : false"
          :position="isCollapsed ? 'center' : 'left'"
        />
      </div>

      <UISidebarAccount ref="dropDownRef" />
    </div>
  </aside>
</template>
