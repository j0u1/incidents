<script setup lang="ts">
import { PenIcon, TrashIcon, XIcon } from "@lucide/vue";
import { projectName } from "~/data/project";

const route = useRoute();
const { id } = route.params;
const { statuses, getStatuses } = useStatuses();
await getStatuses();
const { getTicketById, deleteTicket, updateTicket } = useTickets();

definePageMeta({
  layout: "sidebar",
  pageTitle: "Загрузка...",
});

const ticket = ref(await getTicketById(id as string));
route.meta.pageTitle = `ИНЦ-${ticket.value.number}: ${ticket.value.title}`;

const seoTitle = `ИНЦ-${ticket.value.number}: ${ticket.value.title} — ` + projectName;
const seoDescription =
  "Раздел " +
  projectName +
  " с актуальными проблемами, статусами, приоритетами и последними инцидентами для быстрой работы команды.";

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogType: "website",
  ogSiteName: projectName,
  ogLocale: "ru_RU",
  twitterCard: "summary",
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
  robots: "noindex, nofollow, noarchive",
  keywords:
    projectName +
    ", проблемы, инциденты, тикеты, статусы, приоритеты, решения, dashboard, support, task management",
});

const handleDelete = async () => {
  await deleteTicket(id as string);
  navigateTo("/dashboard/problems");
};

const openModal = ref(false);
const error = ref("");
const form = reactive({
  title: "",
  description: "",
  status: statuses.value[0]?.id ?? "",
});

watch(openModal, (val) => {
  if (val) {
    form.title = ticket.value.title;
    form.description = ticket.value.description || "";
    form.status = ticket.value.status?.id || statuses.value[0]?.id || "";
  }
});

const handleEdit = async () => {
  if (!form.title && !form.description) {
    error.value = "Пожалуйста, заполните все поля";
    return;
  }

  await updateTicket(id as string, {
    title: form.title,
    description: form.description,
    statusId: form.status,
  });
  ticket.value = await getTicketById(id as string);
  openModal.value = false;
};
</script>

<template>
  <div class="flex gap-4 h-full">
    <p class="w-3/4 text-light-gray">
      {{ ticket.description }}
    </p>
    <hr class="h-full border-transparent border-r border-r-border w-1.5" />

    <div class="w-full max-w-72 gap-4 flex flex-col">
      <div>
        <p>
          Статус: <span class="text-gray">{{ ticket.status?.name || "Нет статуса" }}</span>
        </p>
        <p>
          Создал: <span class="text-gray">{{ ticket.createdBy?.name || "Нет создателя" }}</span>
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <UIButtonBase @click="openModal = true" :icon="PenIcon" position="center">
          Редактировать
        </UIButtonBase>
        <UIButtonBase @click="handleDelete" :icon="TrashIcon" position="center">
          Удалить
        </UIButtonBase>
      </div>
    </div>
  </div>

  <Transition name="modal">
    <div
      v-if="openModal"
      class="absolute flex items-center justify-center top-0 left-0 size-full bg-black/20 backdrop-blur-sm z-10"
    >
      <XIcon class="absolute top-5 right-5 cursor-pointer" @click="openModal = false" />

      <div class="border border-border bg-secondary rounded-2xl p-4">
        <h3 class="text-2xl font-medium mb-4">Редактировать проблему</h3>
        <div class="flex flex-col gap-4">
          <input
            v-model="form.title"
            type="text"
            placeholder="Название проблемы"
            class="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            v-model="form.status"
            class="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option v-for="status in statuses" :key="status.id" :value="status.id">
              {{ status.name }}
            </option>
          </select>
          <textarea
            v-model="form.description"
            placeholder="Описание проблемы"
            class="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <UIButtonBase @click="handleEdit" :icon="PenIcon"> Сохранить </UIButtonBase>
          <UIButtonBase @click="handleDelete" :icon="TrashIcon"> Удалить </UIButtonBase>
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
