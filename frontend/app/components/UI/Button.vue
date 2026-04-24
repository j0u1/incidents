<script setup lang="ts">
import { LogInIcon } from "@lucide/vue";
import { padding } from "~/data/dynamicStyles";

const props = withDefaults(
    defineProps<{
        variant?: "login" | "filled";
        long?: boolean;
    }>(),
    {
        long: false,
    },
);
</script>

<template>
    <!-- Кнопка логина -->
    <NuxtLink
        v-if="variant === 'login'"
        href="/login"
        class="border border-border rounded-lg flex items-center gap-2.5 text-light-gray fill-light-gray duration-300 transition-all hover:border-primary hover:text-primary hover:fill-primary cursor-pointer select-none"
        :class="padding"
    >
        <LogInIcon class="size-4.5" />
        {{ long ? "Войти в аккаунт" : "Войти" }}
    </NuxtLink>

    <!-- Заполненная кнопка -->
    <button
        v-else-if="variant === 'filled'"
        type="submit"
        class="bg-secondary rounded-lg text-light-gray flex items-center gap-2.5 justify-center cursor-pointer outline outline-transparent hover:outline-primary transition-all duration-300 pointer-events-auto hover:text-primary"
        :class="padding"
    >
        <LogInIcon class="size-4.5" />
        <slot />
    </button>

    <!-- Обычная, полая кнопка -->
    <button
        v-else
        class="border border-border rounded-lg flex items-center gap-2.5 text-light-gray fill-light-gray duration-300 transition-all hover:border-primary hover:text-primary hover:fill-primary cursor-pointer select-none bg-bg justify-center"
        :class="padding"
    >
        <slot />
    </button>
</template>
