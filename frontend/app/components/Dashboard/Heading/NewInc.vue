<script setup lang="ts">
import { PlusIcon } from "@lucide/vue";

const { statuses, getStatuses } = useStatuses();
await getStatuses();
const error = ref("");

const form = reactive({
  title: "",
  description: "",
  status: statuses.value[0]?.id ?? "",
});
const ticket = useTicketsStore();

const openModal = defineModel<boolean>("openModal", {
  default: false,
});

const handleCreate = async () => {
  if (!form.title) {
    error.value = "Пожалуйста, добавьте название";
    return;
  }

  await ticket.createTicket(form.title, form.description, form.status);
  openModal.value = false;
};

watch(openModal, (val) => {
  setTimeout(() => {
    if (!val) {
      form.title = "";
      form.description = "";
      form.status = statuses.value[0]?.id ?? "";
      error.value = "";
    }
  }, 300);
});
</script>

<template>
  <UIModal v-model:openModal="openModal" title="Новый инциндент">
    <div class="flex flex-col gap-2">
      <UIInputLabel label="Название инцидента*" />
      <input
        v-model="form.title"
        type="text"
        placeholder="Название инцидента"
        class="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
    <div class="flex flex-col gap-2">
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
    <div class="flex flex-col gap-2">
      <UIInputLabel label="Описание" />
      <textarea
        v-model="form.description"
        placeholder="Описание инцидента"
        class="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
    <UIButtonBase @click="handleCreate" :icon="PlusIcon"> Создать </UIButtonBase>
  </UIModal>
</template>
