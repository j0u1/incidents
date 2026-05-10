<script setup lang="ts">
import { visibleNavigation } from "~/config/navigation";
import { LogOutIcon } from "@lucide/vue";
import { NuxtLink } from "#components";

const { signOut } = useAuth();
const props = withDefaults(
  defineProps<{
    dropDown?: boolean;
    muted?: boolean;
    noText?: boolean;
    position?: "left" | "center" | "right";
  }>(),
  {
    dropDown: false,
    muted: false,
    noText: false,
  },
);
</script>

<template>
  <UIButtonBase
    variant="filled"
    :as="NuxtLink"
    :position="props.position || 'left'"
    v-for="page in visibleNavigation"
    :href="page.path"
    :icon="page.icon"
    :page="page"
    :muted="props?.muted"
    :class="position === 'center' && 'w-full'"
  >
    {{ !noText ? page.title : '' }}
  </UIButtonBase>
  <template v-if="props.dropDown">
    <hr class="border-border w-full" />
    <UIButtonBase variant="filled" position="left" @click="signOut" :icon="LogOutIcon" color="red">
      Выйти
    </UIButtonBase>
  </template>
</template>
