<script setup lang="ts">
import Mini from "./Mini.vue";
import { projectName } from "~/data/project.ts";

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
    <div class="flex items-center gap-2 font-medium text-lg">
        <Mini :style="{ width: logoSize, height: logoSize }" />
        <span class="mt-0.5">{{ projectName }}</span>
        <span class="sr-only">{{ projectName }}</span>
    </div>
</template>
