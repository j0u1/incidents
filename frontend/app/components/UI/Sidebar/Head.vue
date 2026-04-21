<script setup>
import { PanelLeftClose, PanelLeftOpen } from "@lucide/vue";

defineProps({
    isCollapsed: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["toggle"]);
</script>

<template>
    <div class="relative flex justify-between items-center duration-300 transition-all">
        <NuxtLink
            class="duration-300 transition-all active:scale-105"
            :class="[isCollapsed ? 'mx-auto pt-6.5 pb-4' : 'mx-4 pt-6.75 pb-2.5']"
            to="/"
        >
            <IconsLogosFull v-if="!isCollapsed" />
            <IconsLogosMini class="size-6 max-h-6 shrink-0" v-else />
        </NuxtLink>
        <button
            @click="emit('toggle')"
            class="absolute -right-4 -bottom-8 bg-bg border border-border p-1.5 rounded-full text-gray hover:scale-102 cursor-pointer shrink-0 active:text-primary"
        >
            <PanelLeftClose v-if="!isCollapsed" class="size-4.5" />
            <PanelLeftOpen v-if="isCollapsed" class="size-4.5" />
        </button>
    </div>
</template>
