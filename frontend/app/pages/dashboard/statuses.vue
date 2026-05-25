<script setup lang="ts">
import { PenIcon, PlusIcon, SaveIcon, TrashIcon, XIcon } from "@lucide/vue";

definePageMeta({
  layout: "sidebar",
  pageTitle: "Статусы",
});

const { createStatus, statuses, getStatuses, updateStatus, deleteStatus } = useStatuses();
await getStatuses();

const openModal = ref(false);
const error = ref("");
const isEditing = ref(false);
const editingId = ref("");

const form = reactive({
  name: "",
  color: "",
  description: "",
});

const openCreate = () => {
  isEditing.value = false;
  editingId.value = "";
  form.name = "";
  form.color = "";
  form.description = "";
  openModal.value = true;
};

const openEdit = (status: (typeof statuses.value)[0]) => {
  isEditing.value = true;
  editingId.value = status.id;
  form.name = status.name;
  form.color = status.color;
  form.description = status.description ?? "";
  openModal.value = true;
};

const handleSubmit = async () => {
  if (!form.name || !form.color) {
    error.value = "Пожалуйста, заполните обязательные поля";
    return;
  }
  if (isEditing.value) {
    await updateStatus(editingId.value, form.name, form.color, form.description);
  } else {
    await createStatus(form.name, form.color, form.description);
  }
  openModal.value = false;
};

const colors = ["red", "orange", "green", "primary", "gray", "purple", "blue", "yellow", "pink"];

const handleDelete = async (id: string) => {
  await deleteStatus(id);
  await getStatuses();
  openModal.value = false;
};
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <UIButtonBase
      @click="openEdit(status)"
      v-for="status in statuses"
      :key="status.id"
      position="left"
      variant="filled"
      class="group relative"
    >
      <div :style="{ backgroundColor: `var(--${status.color})` }" class="icon rounded-full" />
      {{ status.name }}

      <div
        class="absolute right-3.5 flex items-center gap-2 opacity-0 group-hover:opacity-100 duration-300 transition-all text-light-gray"
      >
        <PenIcon class="icon hover:text-primary" @click.stop="openEdit(status)" />
        <TrashIcon class="icon hover:text-red" @click.stop="handleDelete(status.id)" />
      </div>
    </UIButtonBase>

    <UIButtonBase @click="openCreate" :icon="PlusIcon" position="left"> Создать </UIButtonBase>
  </div>

  <UIModal
    v-model:openModal="openModal"
    :title="isEditing ? 'Редактировать статус' : 'Новый статус'"
  >
    <input
      v-model="form.name"
      type="text"
      placeholder="Название статуса"
      class="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <div class="flex gap-2">
      <div
        v-for="color in colors"
        :key="color"
        @click="form.color = color"
        :style="{ backgroundColor: `var(--${color})` }"
        class="size-6 rounded-full cursor-pointer transition-all"
        :class="form.color === color ? 'ring-2 ring-offset-2 ring-white' : ''"
      />
    </div>
    <textarea
      v-model="form.description"
      placeholder="Описание статуса"
      class="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <div class="flex gap-2 w-full">
      <UIButtonBase @click="handleSubmit" :icon="isEditing ? SaveIcon : PlusIcon" class="w-full">
        {{ isEditing ? "Сохранить" : "Создать" }}
      </UIButtonBase>
      <UIButtonBase
        v-if="isEditing"
        @click.stop="handleDelete(editingId)"
        :icon="TrashIcon"
        class="w-full"
      >
        Удалить
      </UIButtonBase>
    </div>
  </UIModal>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.status {
  @apply flex items-center gap-2 p-4 rounded-lg bg-secondary border border-border text-light-gray cursor-pointer hover:border-primary transition-all duration-300 hover:text-primary justify-between;
}
.icon {
  @apply size-4.5 aspect-square;
}
</style>
