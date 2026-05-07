<script setup lang="ts">
import { padding } from "~/data/dynamicStyles";
import {
    MailIcon,
    LockIcon,
    ArrowRightIcon,
    LogInIcon,
    TypeIcon,
} from "@lucide/vue";

definePageMeta({
    layout: "auth",
});

const error = ref("");
const showPassword = ref(false);

const name = ref("");
const email = ref("");
const password = ref("");
const retryPassword = ref("");

const authClient = useAuth();

async function signUp() {
    if (password.value !== retryPassword.value) {
        error.value = "Пароли не совпадают";
        return;
    }
    error.value = "";

    const { data, error: signUpError } = await authClient.signUp.email({
        name: name.value,
        email: email.value,
        password: password.value,
        callbackURL: "/",
    });

    if (signUpError) {
        if (signUpError.message === "Password too short") {
            error.value = "Пароль слишком короткий";
        } else if (
            signUpError.message === "[body.email] Invalid email address"
        ) {
            error.value = "Не правильный вид почты";
        } else if (
            signUpError.message ===
            "[body.email] Invalid email address; [body.password] Too small: expected string to have >=1 characters"
        ) {
            error.value = "Не оставляйте поля с почтой или паролем пустыми";
        } else error.value = "Ошибка регистрации: " + signUpError.message;
        return;
    }

    navigateTo("/");
}
</script>

<template>
    <section class="mx-auto max-w-md h-dvh flex flex-col gap-6 justify-center">
        <div class="mx-auto flex gap-2 items-center">
            <NuxtLink to="/">
                <IconsLogosFull />
            </NuxtLink>
            <ArrowRightIcon class="size-4.5 text-gray" />
            <p class="text-light-gray">Регистрация аккаунта</p>
        </div>
        <div
            class="rounded-xl outline outline-border p-6 flex flex-col gap-6 bg-bg"
        >
            <form
                @submit.prevent="signUp"
                class="flex flex-col gap-4 w-full h-fit"
            >
                <div class="flex flex-col gap-2">
                    <label
                        >Имя
                        <span class="text-gray text-sm">(логин)</span></label
                    >
                    <div
                        class="relative outline outline-border rounded-lg flex items-center text-gray focus-within:text-primary duration-300 transition-all focus-within:outline-primary"
                    >
                        <TypeIcon
                            class="absolute left-4 size-4.5 pointer-events-none"
                        />
                        <input
                            v-model="name"
                            class="pl-12 w-full bg-transparent outline-none text-light-gray"
                            :class="padding"
                            type="text"
                            placeholder="Ваше имя"
                        />
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <label>Почта</label>
                    <div
                        class="relative outline outline-border rounded-lg flex items-center text-gray focus-within:text-primary duration-300 transition-all focus-within:outline-primary"
                    >
                        <MailIcon
                            class="absolute left-4 size-4.5 pointer-events-none"
                        />
                        <input
                            v-model="email"
                            class="pl-12 w-full bg-transparent outline-none text-light-gray"
                            :class="padding"
                            type="email"
                            placeholder="Ваша почта"
                        />
                    </div>
                </div>

                <div class="flex flex-col gap-2">
                    <div class="flex justify-between">
                        <label>Пароль</label>
                        <div
                            @click="showPassword = !showPassword"
                            class="flex items-center gap-1.5 text-gray text-sm hover:text-primary duration-300 transition-all cursor-pointer"
                        >
                            {{
                                !showPassword
                                    ? "Показать пароли"
                                    : "Скрыть пароли"
                            }}
                        </div>
                    </div>
                    <div
                        class="relative outline outline-border rounded-lg flex items-center text-gray focus-within:text-primary duration-300 transition-all focus-within:outline-primary"
                    >
                        <LockIcon
                            class="absolute left-4 size-4.5 pointer-events-none"
                        />
                        <input
                            v-model="password"
                            class="pl-12 w-full bg-transparent outline-none text-light-gray"
                            :class="padding"
                            :type="showPassword ? 'text' : 'password'"
                            placeholder="Ваш пароль"
                        />
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <label>Подтверждения пароля</label>
                    <div
                        class="relative outline outline-border rounded-lg flex items-center text-gray focus-within:text-primary duration-300 transition-all focus-within:outline-primary"
                    >
                        <LockIcon
                            class="absolute left-4 size-4.5 pointer-events-none"
                        />
                        <input
                            v-model="retryPassword"
                            class="pl-12 w-full bg-transparent outline-none text-light-gray"
                            :class="padding"
                            :type="showPassword ? 'text' : 'password'"
                            placeholder="Ещё раз пароль"
                        />
                    </div>
                </div>
                <hr class="border-border w-full" />
                <UIButton type="submit" variant="filled"
                    >Зарегистрироваться</UIButton
                >
            </form>
        </div>
        <div class="relative text-center">
            <NuxtLink
                class="text-sm text-gray duration-300 transition-all mx-auto group/reg"
                to="/login"
            >
                Уже есть аккаунт?
                <span
                    class="text-light-gray group-hover/reg:text-primary duration-300 transition-all"
                    >Войти</span
                >
            </NuxtLink>
            <p
                class="absolute top-6 inset-x-0 text-sm duration-300 origin-top transition-all"
                :class="[
                    error
                        ? 'text-red-500 scale-100'
                        : 'text-light-gray scale-0',
                ]"
            >
                {{ error }}
            </p>
        </div>
    </section>
</template>
