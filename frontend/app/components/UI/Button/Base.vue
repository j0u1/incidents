<script setup lang="ts">
import type { LucideIcon } from "@lucide/vue";
import { padding } from "~/data/dynamicStyles";
import { NuxtLink } from "#components";

const route = useRoute();
const props = defineProps<{
  variant?: "primary" | "secondary" | "filled";
  icon?: LucideIcon;
  as?: "button" | typeof NuxtLink;
  href?: string;
  position?: "left" | "right" | "center";
  page?: { path: string; exact?: boolean };
  muted?: boolean;
}>();

const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  filled: "btn-filled",
} as const;

const isActive = computed(() => {
  if (!props.page?.path) return false;
  const path = props.page.path;
  if (props.page.exact || path === "/") return route.path === path;
  return route.path === path || route.path.startsWith(path + "/");
});

const classes = computed(() => {
  return cn(
    "btn",
    unref(padding),
    variants[props.variant ?? "primary"],
    props.position ?? "center",
    isActive.value && "active",
    props.muted && "btn-muted",
  );
});
</script>

<template>
  <component
    :is="isActive ? 'button' : (props.as ?? 'button')"
    :class="classes"
    :href="props.as === NuxtLink ? (props.href ?? props.page?.path ?? '/') : undefined"
  >
    <component v-if="props.icon" :is="props.icon" class="size-4.5 shrink-0" />
    <slot />
  </component>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.center {
  @apply justify-center;
}

.left {
  @apply justify-start w-full;
}

.right {
  @apply justify-end w-full;
}

.btn {
  @apply bg-bg cursor-pointer text-light-gray items-center flex gap-2.5 transition-all duration-300 outline outline-transparent;
}

.btn-primary {
  @apply border border-border rounded-lg flex hover:border-primary hover:text-primary;
}

.btn-secondary {
  @apply bg-secondary rounded-lg flex gap-2.5 border border-transparent hover:border-primary transition-all hover:text-primary;
}

.btn-filled {
  @apply border border-border bg-secondary rounded-lg flex gap-2.5 transition-all hover:border-primary;
}

.btn.btn-muted:is(a) {
  @apply text-gray border-transparent bg-transparent hover:border-gray hover:text-light-gray;
}

.btn-filled.active {
  @apply text-primary bg-secondary border-primary/70 cursor-default;
}

.btn-filled:not(.active):hover {
  @apply text-primary;
}

.btn-primary.active {
  @apply border-primary text-primary cursor-default;
}

.btn-secondary.active {
  @apply border-primary text-primary cursor-default;
}
</style>
