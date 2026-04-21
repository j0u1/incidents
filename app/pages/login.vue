<script setup lang="ts">
import { padding } from "~/data/dynamicStyles";
import { MailIcon, LockIcon, ArrowRightIcon, LogInIcon } from "@lucide/vue";

definePageMeta({
    layout: "auth",
});

const email = ref("");
const password = ref("");
</script>

<template>
    <section class="mx-auto max-w-md h-dvh flex flex-col gap-6 justify-center">
        <div class="mx-auto flex gap-2 items-center">
            <NuxtLink to="/">
                <IconsLogosFull />
            </NuxtLink>
            <ArrowRightIcon class="size-4.5 text-gray" />
            <p class="text-light-gray">Вход в систему</p>
        </div>
        <div class="rounded-xl outline outline-border p-6 flex flex-col gap-6 bg-bg">
            <form class="flex flex-col gap-4 w-full">
                <div class="flex flex-col gap-2">
                    <label>Логин <span class="text-gray text-sm">(почта или никнейм)</span></label>
                    <div
                        class="relative outline outline-border rounded-lg flex items-center text-gray focus-within:text-primary duration-300 transition-all focus-within:outline-primary"
                    >
                        <MailIcon class="absolute left-4 size-4.5 pointer-events-none" />
                        <input
                            v-model="email"
                            class="pl-12 w-full bg-transparent outline-none text-light-gray"
                            :class="padding"
                            type="email"
                            placeholder="Ваш логин"
                        />
                    </div>
                </div>

                <div class="flex flex-col gap-2">
                    <label>Пароль</label>
                    <div
                        class="relative outline outline-border rounded-lg flex items-center text-gray focus-within:text-primary duration-300 transition-all focus-within:outline-primary"
                    >
                        <LockIcon class="absolute left-4 size-4.5 pointer-events-none" />
                        <input
                            v-model="password"
                            class="pl-12 w-full bg-transparent outline-none text-light-gray"
                            :class="padding"
                            type="password"
                            placeholder="Ваш пароль"
                        />
                    </div>
                </div>
                <hr class="border-border w-full" />
                <div class="flex items-center gap-4">
                    <button
                        type="submit"
                        class="bg-secondary rounded-lg text-light-gray flex items-center gap-2.5 justify-center w-full cursor-pointer"
                        :class="padding"
                    >
                        <LogInIcon class="size-4.5" />
                        Войти
                    </button>
                    <button
                        type="submit"
                        class="bg-secondary rounded-lg text-light-gray fill-light-gray flex items-center gap-2.5 justify-center w-full cursor-pointer"
                        :class="padding"
                    >
                        <IconsGitHub class="size-4.5" />
                        GitHub
                    </button>
                </div>
            </form>
        </div>
        <NuxtLink class="text-sm text-gray duration-300 transition-all mx-auto group/reg" to="/register">
            Нет аккаунта? <span class="text-light-gray group-hover/reg:text-primary duration-300 transition-all">Зарегистрироваться</span>
        </NuxtLink>
    </section>
</template>
