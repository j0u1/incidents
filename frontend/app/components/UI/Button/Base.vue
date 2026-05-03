<script setup lang="ts">
import type { LucideIcon } from "@lucide/vue";
import { padding } from "~/data/dynamicStyles";

const route = useRoute();
const props = defineProps<{
    variant?: 'primary' | 'secondary' | 'outline';
    icon?: LucideIcon;
    as?: 'button' | 'a';
    href?: string;
    position?: "left" | "right" | "center";
    page?: { path: string };
    muted?: boolean;
  }>()

  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline",
  } as const

  const isActive = computed(() => {
    return props.page?.path === route.path;
  });
</script>

<template>
    <component :is="isActive ? 'button' : (props.as ?? 'button')" class="btn" :class="[variants[props.variant ?? 'primary'], padding, props.position ?? 'center', isActive && 'active', props.muted && 'btn-muted']" :href="props.href && props.as === 'a' ? props.href : '/'">
        <component v-if="props.icon"  :is="props.icon" class="size-4.5 shrink-0" />
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
        @apply bg-bg cursor-pointer text-light-gray items-center flex gap-2.5 transition-all duration-300;
    }

    .btn.active {
        @apply text-light-gray;
    }

    .btn-muted {
        @apply text-gray;
    }

    .btn-primary {
    @apply border border-border rounded-lg flex hover:border-primary hover:text-primary;
    }

    .btn-secondary {
    @apply bg-secondary rounded-lg flex gap-2.5 border border-transparent hover:border-primary transition-all hover:text-primary;
    }

    .btn-outline {
    @apply border border-border rounded-lg flex gap-2.5 transition-all hover:border-primary hover:text-primary;
    }

    .btn-outline.active {
        @apply bg-secondary border-transparent cursor-default;
    }
    .btn-outline.active:hover {
        @apply text-light-gray;
    }

</style>
