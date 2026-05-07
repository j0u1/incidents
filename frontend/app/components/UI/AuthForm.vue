<script setup lang="ts">
import type { LucideIcon } from '@lucide/vue';
import { padding } from '~/data/dynamicStyles';

const { signIn } = useAuth()

async function signInWithGithub() {
    const callbackURL = `${window.location.origin}/dashboard`;
    const { data, error } = await signIn.social({
        provider: "github",
        callbackURL,
        disableRedirect: true,
    });

    if (error) {
        console.error("GitHub sign-in failed", error);
        return;
    }

    if (data?.url) {
        window.location.href = data.url;
    }
}

interface Inputs {
    key: string;
    label: string;
    type: string;
    placeholder: string;
    icon: LucideIcon;
}

defineProps<{
    isLogin: boolean;
    inputs: Inputs[];
}>();
</script>

<template>
    <section class="mx-auto max-w-md h-dvh flex flex-col gap-6 justify-center">
        <div class="mx-auto flex gap-2 items-center">
            <NuxtLink to="/">
                <IconsLogosFull />
            </NuxtLink>
            <ArrowRightIcon class="size-4.5 text-gray" />
            <p class="text-light-gray">
                {{ isLogin ? "Вход в систему" : "Регистрация" }}
            </p>
        </div>
        <div
            class="rounded-xl outline outline-border p-6 flex flex-col gap-6 bg-bg"
        >
            <form @submit.prevent="signIn" class="flex flex-col gap-4 w-full">
                <UIInput
                    v-for="input in inputs"
                    :key="input.key"
                    v-model="form[input.key]"
                    :label="input.label"
                    :type="input.type"
                    :icon="input.icon"
                    :placeholder="input.placeholder"
                />
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
                        v-if="isLogin"
                        type="button"
                        class="bg-secondary rounded-lg text-light-gray fill-light-gray flex items-center gap-2.5 justify-center w-full cursor-pointer"
                        :class="padding"
                        @click="signInWithGithub"
                    >
                        <IconsGitHub class="size-4.5" />
                        GitHub
                    </button>
                </div>
            </form>
        </div>

        <div class="relative text-center">
            <NuxtLink
                class="text-sm text-gray duration-300 transition-all mx-auto group/reg"
                to="/register"
            >
                Нет аккаунта?
                <span
                    class="text-light-gray group-hover/reg:text-primary duration-300 transition-all"
                >
                    Зарегистрироваться
                </span>
            </NuxtLink>
            <p
                class="absolute -bottom-6 inset-x-0 text-sm duration-300 origin-top transition-all"
                :class="[
                    authError
                        ? 'text-red-500 scale-100'
                        : 'text-light-gray scale-0',
                ]"
            >
                {{ authError }}
            </p>
        </div>
    </section>
</template>
