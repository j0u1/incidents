<script setup lang="ts">
import { ChevronLeftIcon, PenIcon, SaveIcon, TrashIcon, XIcon } from "@lucide/vue";
import { features } from "~/config/features";
import { projectName } from "~/data/project";

const route = useRoute();
const { id } = route.params;
const { statuses, getStatuses } = useStatuses();
await getStatuses();
const ticket = useTicketsStore();

definePageMeta({
  layout: "sidebar",
  pageTitle: "Загрузка...",
});

const tk = ref(await ticket.getTicketById(id as string));
route.meta.pageTitle = `INC-${tk.value.number}: ${tk.value.title}`;

const seoTitle = `INC-${tk.value.number}: ${tk.value.title} — ` + projectName;
const seoDescription =
  "Раздел " +
  projectName +
  " с актуальными инцидентами, статусами, приоритетами и последними инцидентами для быстрой работы команды.";

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
  await ticket.deleteTicket(id as string);
  history.back();
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
    form.title = tk.value.title;
    form.description = tk.value.description || "";
    form.status = tk.value.status?.id || statuses.value[0]?.id || "";
  }
});

const handleEdit = async () => {
  if (!form.title && !form.description) {
    error.value = "Пожалуйста, заполните все поля";
    return;
  }

  await ticket.updateTicket(id as string, {
    title: form.title,
    description: form.description,
    statusId: form.status,
  });
  tk.value = await ticket.getTicketById(id as string);
  openModal.value = false;
};

const returnToProblems = () => {
  navigateTo("/dashboard/problems");
};
</script>

<template>
  <div class="flex gap-4 h-full">
    <div class="flex flex-col gap-2 w-3/4">
      <UIButtonBase @click="returnToProblems" :icon="ChevronLeftIcon" class="w-fit">
        Вернуться к списку инцидентов
      </UIButtonBase>
      <p class="text-light-gray">
        {{ tk.description || "Нет описания" }}
      </p>
    </div>
    <hr class="h-full border-transparent border-r border-r-border w-1.5" />

    <div class="w-full max-w-72 gap-4 flex flex-col">
      <div>
        <p v-if="features.statuses">
          Статус: <span class="text-gray">{{ tk.status?.name || "Нет статуса" }}</span>
        </p>
        <p>
          Создал: <span class="text-gray">{{ tk.createdBy?.name || "Нет создателя" }}</span>
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

  <UIModal v-model:openModal="openModal" title="Редактировать инцидент">
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
    <UIButtonBase @click="handleEdit" :icon="SaveIcon"> Сохранить </UIButtonBase>
    <UIButtonBase @click="handleDelete" :icon="TrashIcon"> Удалить </UIButtonBase>
  </UIModal>
</template>
