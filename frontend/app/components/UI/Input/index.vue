<script setup lang="ts">
import { padding } from "~/data/dynamicStyles";
import { type LucideIcon } from "@lucide/vue";

const showPassword = ref(false);

defineProps<{
  label: string;
  additionalText?: string;
  placeholder: string;
  icon?: LucideIcon;
  type: string;
  modelValue: string | undefined;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between">
      <UIInputLabel :label="label" :additionalText="additionalText" />
      <div
        v-if="type === 'password'"
        @click="showPassword = !showPassword"
        class="flex items-center gap-1.5 text-gray text-sm hover:text-primary duration-300 transition-all cursor-pointer"
      >
        {{ !showPassword ? "Показать пароль" : "Скрыть пароль" }}
      </div>
    </div>
    <div
      class="relative outline outline-border rounded-lg flex items-center text-gray focus-within:text-primary duration-300 transition-all focus-within:outline-primary"
    >
      <component :is="icon" class="absolute left-4 size-4.5 pointer-events-none" />
      <input
        class="pl-12 w-full bg-transparent outline-none text-light-gray"
        :class="padding"
        :type="type === 'password' ? (showPassword ? 'text' : 'password') : type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>
