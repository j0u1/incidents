<script setup lang="ts">
import type { LucideIcon } from "@lucide/vue";
import { padding } from "~/data/dynamicStyles";
import { NuxtLink } from '#components'

const route = useRoute();
const props = defineProps<{
    variant?: "primary" | "secondary" | "filled";
    icon?: LucideIcon;
    as?: "button" | typeof NuxtLink;
    href?: string;
    position?: "left" | "right" | "center";
    page?: { path: string };
    muted?: boolean;
}>();

const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    filled: "btn-filled",
} as const;

const isActive = computed(() => {
    return props.page?.path === route.path;
});
</script>

<template>
    <component
        :is="isActive ? 'button' : (props.as ?? 'button')"
        class="btn"
        :class="[
            variants[props.variant ?? 'primary'],
            padding,
            props.position ?? 'center',
            isActive && 'active',
            props.muted && 'btn-muted',
        ]"
        :href="props.href && props.as === NuxtLink ? props.href : '/'"
    >
        <component
            v-if="props.icon"
            :is="props.icon"
            class="size-4.5 shrink-0"
        />
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

.btn.active {
    @apply text-primary outline-primary;
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

.btn-filled {
    @apply border border-border bg-secondary rounded-lg flex gap-2.5 transition-all hover:border-primary;
}

.btn-filled.active {
    @apply bg-secondary border-transparent cursor-default;
}

.btn-filled:not(.active):hover {
    @apply text-primary;
}
</style>
