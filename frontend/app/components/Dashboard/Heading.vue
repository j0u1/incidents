<script setup lang="ts">
import { PlusIcon, XIcon } from "@lucide/vue";
const { statuses, getStatuses } = useStatuses();
await getStatuses();

const openModal = ref(false);
const error = ref("");
const ticket = useTicketsStore();
const form = reactive({
  title: "",
  description: "",
  status: statuses.value[0]?.id ?? "",
});

const handleCreate = async () => {
  if (!form.title && !form.description) {
    error.value = "Пожалуйста, заполните все поля";
    return;
  }

  await ticket.createTicket(form.title, form.description, form.status);
  openModal.value = false;
};

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
  <div class="flex items-end justify-between px-5 max-h-fit mt-5">
    <h1 class="text-3xl font-medium">{{ title }}</h1>
    <UIButtonBase :icon="PlusIcon" @click="openModal = !openModal">
      Добавить инцидент
    </UIButtonBase>
  </div>
  <Transition name="modal">
    <div
      v-if="openModal"
      class="absolute flex items-center justify-center top-0 left-0 size-full bg-black/20 backdrop-blur-sm z-10"
    >
      <XIcon class="absolute top-5 right-5 cursor-pointer" @click="openModal = false" />

      <div class="border border-border bg-secondary rounded-2xl p-4">
        <h3 class="text-2xl font-medium mb-4">Новый инцидент</h3>
        <div class="flex flex-col gap-4">
          <input
            v-model="form.title"
            type="text"
            placeholder="Название инцидента"
            class="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div class="grid gap-2">
            <UIInputLabel label="Статус критичности" />
            <select
              v-model="form.status"
              class="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option v-for="status in statuses" :key="status.id" :value="status.id">
                {{ status.name }}
              </option>
            </select>
          </div>
          <textarea
            v-model="form.description"
            placeholder="Описание инцидента"
            class="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <UIButtonBase @click="handleCreate" :icon="PlusIcon"> Создать </UIButtonBase>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.32s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
