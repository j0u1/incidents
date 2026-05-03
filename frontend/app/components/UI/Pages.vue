<script setup lang="ts">
import { visibleNavigation } from "~/config/navigation";
import { padding } from "~/data/dynamicStyles";

const props = withDefaults(defineProps<{
  dropDown: boolean;
  muted?: boolean;
}>(), {
    dropDown: false,
    muted: false,
});
</script>

<template>
    <UIButtonBase variant="outline" as="a" position="left" v-for="page in visibleNavigation" :href="page.path" :icon="page.icon" :page="page" :muted="props?.muted">
        {{ page.title }}
    </UIButtonBase>
    <template v-if="props.dropDown">
        <hr class="border-border w-full" />
        <UIButton variant="logout" />
    </template>
</template>
