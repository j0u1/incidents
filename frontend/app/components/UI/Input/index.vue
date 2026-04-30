<script setup lang="ts">
import { padding } from "~/data/dynamicStyles";
import type { LucideIcon } from "@lucide/vue";

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
        <UIInputLabel :label="label" :additionalText="additionalText" />
        <div
            class="relative outline outline-border rounded-lg flex items-center text-gray focus-within:text-primary duration-300 transition-all focus-within:outline-primary"
        >
            <component
                :is="icon"
                class="absolute left-4 size-4.5 pointer-events-none"
            />
            <input
                class="pl-12 w-full bg-transparent outline-none text-light-gray"
                :class="padding"
                :type="type"
                :placeholder="placeholder"
                :value="modelValue"
                @input="
                    emit(
                        'update:modelValue',
                        ($event.target as HTMLInputElement).value,
                    )
                "
            />
        </div>
    </div>
</template>
