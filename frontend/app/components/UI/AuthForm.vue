<script setup lang="ts">
import { ArrowRightIcon, LockIcon, LogInIcon, MailIcon, type LucideIcon } from "@lucide/vue";
import GitHub from "~/components/Icons/GitHub.vue";

const { signIn } = useAuth();
const authError = ref("");

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

const props = withDefaults(
  defineProps<{
    isLogin: boolean;
    inputs?: Inputs[];
  }>(),
  {
    inputs: () => [
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
    ],
  },
);

type Form = {
  email: string;
  password: string;
};

const form = reactive<Form>({
  email: "",
  password: "",
});

async function handleSignIn() {
  const { error } = await signIn.email({
    email: form.email.trim(),
    password: form.password,
    callbackURL: "/",
  });

  if (error) {
    if (error.code === "INVALID_EMAIL_OR_PASSWORD" || error.message === "Invalid email") {
      authError.value = "Неверный логин или пароль";
    } else {
      authError.value = "Ошибка входа: " + error.message;
    }
    return;
  }
  navigateTo("/dashboard");
}
</script>

<template>
  <section class="mx-auto max-w-sm w-full h-dvh flex flex-col gap-6 justify-center">
    <div class="mx-auto flex gap-2 items-center">
      <NuxtLink to="/">
        <IconsLogosFull />
      </NuxtLink>
      <ArrowRightIcon class="size-4.5 text-gray" />
      <p class="text-light-gray">
        {{ isLogin ? "Вход в систему" : "Регистрация" }}
      </p>
    </div>
    <div class="rounded-xl outline outline-border p-6 flex flex-col gap-6 bg-bg">
      <form @submit.prevent="handleSignIn" class="flex flex-col gap-4 w-full">
        <UIInput
          v-for="input in inputs"
          :key="input.key"
          v-model="form[input.key as keyof Form]"
          :label="input.label"
          :type="input.type"
          :icon="input.icon"
          :placeholder="input.placeholder"
        />
        <hr class="border-border w-full" />
        <div class="grid grid-cols-2 gap-4">
          <UIButtonBase type="submit" :icon="LogInIcon">
            {{ isLogin ? "Войти" : "Зарегистрироваться" }}
          </UIButtonBase>
          <UIButtonBase @click="signInWithGithub" :icon="GitHub" class="w-full" type="button">
            GitHub
          </UIButtonBase>
        </div>
      </form>
    </div>

    <div class="relative text-center">
      <NuxtLink
        class="text-sm text-gray duration-300 transition-all mx-auto group/reg"
        to="/register"
      >
        Нет аккаунта?
        <span class="text-light-gray group-hover/reg:text-primary duration-300 transition-all">
          Зарегистрироваться
        </span>
      </NuxtLink>
      <p
        class="absolute -bottom-6 inset-x-0 text-sm duration-300 origin-top transition-all"
        :class="[authError ? 'text-red-500 scale-100' : 'text-light-gray scale-0']"
      >
        {{ authError }}
      </p>
    </div>
  </section>
</template>
