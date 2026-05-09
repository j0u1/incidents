<script setup lang="ts">
import { PlusIcon, XIcon } from "@lucide/vue";
import { padding } from "~/data/dynamicStyles";

const openModal = ref(false)
const error = ref("")
const createTicket = useTickets().createTicket
const form = reactive({
    title: "",
    description: "",
})

const handleCreate = async () => {
    if (!form.title && !form.description) {
        error.value = "Пожалуйста, заполните все поля"
        return
    }

    await createTicket(form.title, form.description)
    openModal.value = false
}

withDefaults(
    defineProps<{
        title?: string;
    }>(),
    {
        title: "Обзор",
    },
);
</script>

<template>
    <div class="flex items-end justify-between px-5 h-18.25">
        <h1 class="text-3xl font-medium">{{ title }}</h1>
        <!-- <div
            class="flex items-center gap-2 text-sm text-light-gray rounded-xl whitespace-nowrap select-none border border-border"
            :class="padding"
        >
            <div class="size-2 rounded-full bg-green" />
            Мало проблем
        </div> -->
        <UIButtonBase :icon="PlusIcon" @click="openModal = !openModal">
            Добавить проблему
        </UIButtonBase>
    </div>
    <Transition name="modal">
        <div v-if="openModal" class="absolute flex items-center justify-center top-0 left-0 size-full bg-black/20 backdrop-blur-sm z-10">
            <XIcon class="absolute top-5 right-5 cursor-pointer" @click="openModal = false" />

            <div class="border border-border bg-secondary rounded-2xl p-4">
                <h3 class="text-2xl font-medium mb-4">Новая проблема</h3>
                <div class="flex flex-col gap-4">
                    <input v-model="form.title" type="text" placeholder="Название проблемы" class="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary" />
                    <textarea v-model="form.description" placeholder="Описание проблемы" class="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary" />
                    <UIButtonBase @click="handleCreate">
                        Создать
                    </UIButtonBase>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.32s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>