<script setup lang="ts">
import { visibleNavigation } from "~/config/navigation";
import { padding } from "~/data/dynamicStyles";
import { LogOutIcon } from "@lucide/vue";

const { signOut } = useAuth();
const props = withDefaults(
    defineProps<{
        dropDown?: boolean;
        muted?: boolean;
    }>(),
    {
        dropDown: false,
        muted: false,
    },
);
</script>

<template>
    <UIButtonBase
        variant="filled"
        as="a"
        position="left"
        v-for="page in visibleNavigation"
        :href="page.path"
        :icon="page.icon"
        :page="page"
        :muted="props?.muted"
    >
        {{ page.title }}
    </UIButtonBase>
    <template v-if="props.dropDown">
        <hr class="border-border w-full" />
        <UIButtonBase
            variant="filled"
            position="left"
            @click="signOut"
            :icon="LogOutIcon"
            color="red"
        >
            Выйти
        </UIButtonBase>
    </template>
</template>
