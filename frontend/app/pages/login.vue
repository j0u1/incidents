<script setup lang="ts">
import { padding } from "~/data/dynamicStyles";
import { MailIcon, LockIcon, ArrowRightIcon, LogInIcon } from "@lucide/vue";
import { onClickOutside } from "@vueuse/core";
import { useAuth } from "~/composables/useAuthClient";
import { pages } from "~/data/pages";

definePageMeta({
    layout: "auth",
});

const authError = ref("");
const dropDownRef = ref(null);

const authClient = useAuth();
const session = authClient.useSession();

async function signIn() {
    const { data, error: signInError } = await authClient.signIn.email({
        email: form.email,
        password: form.password,
        callbackURL: "/",
    });

    if (signInError) {
        if (signInError.code === "INVALID_EMAIL_OR_PASSWORD") {
            authError.value = "Неверный логин или пароль";
        } else if (signInError.message === "Invalid email") {
            authError.value = "Неправильный вид почты";
        } else {
            authError.value = "Ошибка входа: " + signInError.message;
        }
        return;
    }

    navigateTo("/");
}

async function signInWithGithub() {
    const callbackURL = `${window.location.origin}/dashboard`;

    const { data, error } = await authClient.signIn.social({
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

async function signOut() {
    await authClient.signOut();
    window.location.href = `${window.location.origin}/`;
}

let clickCollapsed = () => {
    isCollapsed.value = !isCollapsed.value;
};

onClickOutside(dropDownRef, () => {
    dropDown.value = false;
});

type Form = {
    email: string;
    password: string;
};

const form = reactive<Form>({
    email: "",
    password: "",
});

const inputs = [
    {
        key: "email",
        label: "Почта",
        type: "email",
        placeholder: "Введите ваш email",
        icon: MailIcon,
    },
    {
        key: "password",
        label: "Пароль",
        type: "password",
        placeholder: "Введите ваш пароль",
        icon: LockIcon,
    },
];
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
