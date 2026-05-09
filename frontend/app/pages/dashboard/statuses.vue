<script setup lang="ts">
import { PenIcon, PlusIcon, XIcon } from "@lucide/vue";

definePageMeta({
  layout: "sidebar",
  pageTitle: "Статусы",
});

const { createStatus, statuses, getStatuses, updateStatus } = useStatuses();
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
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <div @click="openEdit(status)" v-for="status in statuses" :key="status.id" class="status">
      <div :style="{ backgroundColor: `var(--${status.color})` }" class="icon rounded-full" />
      {{ status.name }}
    </div>

    <!-- Создание статуса -->
    <div @click="openCreate" class="status">
      <PlusIcon class="icon" />
      Создать статус
    </div>
  </div>

  <Transition name="modal">
    <div
      v-if="openModal"
      class="absolute flex items-center justify-center top-0 left-0 size-full bg-black/20 backdrop-blur-sm z-10"
    >
      <XIcon class="absolute top-5 right-5 cursor-pointer" @click="openModal = false" />

      <div class="border border-border bg-secondary rounded-2xl p-4">
        <h3 class="text-2xl font-medium mb-4">
          {{ isEditing ? "Редактировать статус" : "Новый статус" }}
        </h3>
        <div class="flex flex-col gap-4">
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
          <UIButtonBase @click="handleSubmit" :icon="isEditing ? PenIcon : PlusIcon">
            {{ isEditing ? "Сохранить изменения" : "Создать" }}
          </UIButtonBase>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.status {
  @apply flex items-center gap-2 p-4 rounded-lg bg-secondary border border-border text-light-gray cursor-pointer hover:border-primary transition-all duration-300 hover:text-primary;
}
.status .icon {
  @apply size-4 aspect-square;
}
</style>
