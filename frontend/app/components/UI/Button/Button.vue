<script setup lang="ts">
import { LogInIcon, LogOutIcon } from "@lucide/vue";
import { padding } from "~/data/dynamicStyles";
const { signOut } = useAuth();

withDefaults(
    defineProps<{
        variant?: "login" | "filled" | "logout";
        long?: boolean;
        position?: "left" | "right" | "center";
    }>(),
    {
        long: false,
        position: "center",
    },
);
</script>

<template>
    <!-- Логин -->
    <NuxtLink
        v-if="variant === 'login'"
        href="/login"
        class="border border-border rounded-lg flex items-center gap-2.5 text-light-gray fill-light-gray duration-300 transition-all hover:border-primary hover:text-primary hover:fill-primary cursor-pointer select-none"
        :class="padding"
    >
        <LogInIcon class="size-4.5" />
        {{ long ? "Войти в аккаунт" : "Войти" }}
    </NuxtLink>

    <!-- Заполненный логин -->
    <button
        v-else-if="variant === 'filled'"
        type="submit"
        class="bg-secondary rounded-lg text-light-gray flex items-center gap-2.5 justify-center cursor-pointer outline outline-transparent hover:outline-primary transition-all duration-300 pointer-events-auto hover:text-primary"
        :class="padding"
    >
        <LogInIcon class="size-4.5" />
        <slot />
    </button>

    <!-- Выход -->
    <button
        v-else-if="variant === 'logout'"
        @click="signOut"
        type="button"
        class="text-sm text-light-gray border border-border rounded-lg flex items-center gap-1.5 w-full bg-bg hover:border-red hover:text-red duration-300 transition-all cursor-pointer"
        :class="padding"
    >
        <LogOutIcon class="size-4.5" />
        Выйти
    </button>

    <!-- Полая  -->
    <button
        v-else
        class="border border-border rounded-lg flex items-center gap-2.5 text-light-gray fill-light-gray duration-300 transition-all hover:border-primary hover:text-primary hover:fill-primary cursor-pointer select-none bg-bg justify-center"
        :class="padding"
    >
        <slot />
    </button>
</template>
