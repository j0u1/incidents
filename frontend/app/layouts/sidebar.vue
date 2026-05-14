<script setup lang="ts">
const route = useRoute();

const pageTitle = computed(() => {
  return typeof route.meta.pageTitle === "string" ? route.meta.pageTitle : "Обзор";
});

const sidebar = useSidebarStore();
const isCollapsed = computed(() => !sidebar.isOpen);
</script>

<template>
  <div class="flex">
    <UISidebar class="flex" />

    <div
      class="flex flex-col gap-5 w-full duration-200 transition-all"
      :class="isCollapsed ? 'ml-22' : 'ml-58'"
    >
      <DashboardHeading :title="pageTitle" />
      <hr class="h-0.5 w-full border-border" />
      <section class="px-4 lg:px-5 duration-300 transition-all size-full flex flex-col gap-5">
        <slot />
      </section>
    </div>
  </div>
</template>
