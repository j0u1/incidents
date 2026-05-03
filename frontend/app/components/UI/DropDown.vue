<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

const dropDownRef = ref(null);
const isOpen = defineModel<boolean>();

onClickOutside(dropDownRef, () => {
    isOpen.value = false;
});

const props = defineProps<{
    session: { data: any }
}>()
</script>

<template>
    <div
        ref="dropDownRef"
        class="absolute border border-border rounded-xl flex flex-col items-center gap-2.5 duration-200 transition-all bg-secondary origin-top-right w-56 right-0 p-2.5"
        :class="[
            props.session.data ? 'opacity-100' : 'opacity-0',
            isOpen ? 'top-12 scale-100 opacity-100' : 'top-8 scale-0 opacity-0'
        ]"
    >
        <UIPages dropDown />
    </div>
</template>
