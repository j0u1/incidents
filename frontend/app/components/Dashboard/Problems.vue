<script setup lang="ts">
import { TrashIcon } from "@lucide/vue";
import { features } from "~/config/features";

const ticket = useTicketsStore();

const { getStatuses } = useStatuses();
await getStatuses();

const handleDelete = async (id: string) => {
  await ticket.deleteTicket(id);
};

defineProps<{
  isShort?: boolean;
  isGrid?: boolean;
}>();
</script>

<template>
  <Transition name="problems" mode="out-in">
    <div
      v-if="ticket.tickets.length > 0"
      class="gap-2.5 w-full lg:pb-6"
      :class="isGrid ? 'grid xl:grid-cols-2' : 'flex flex-col'"
    >
      <NuxtLink
        v-for="tk in isShort
          ? isGrid
            ? ticket.tickets.slice(0, 19)
            : ticket.tickets.slice(0, 8)
          : ticket.tickets"
        :key="tk.id"
        :to="`/dashboard/problems/${tk.id}`"
        class="relative flex justify-between border border-border rounded-lg group p-4 gap-4"
      >
        <div class="flex gap-4 items-center w-full">
          <div class="flex items-center gap-3.5 w-fit">
            <div
              v-if="features.statuses"
              class="h-4.5 w-1.25 rounded-lg"
              :class="`bg-${tk.status?.color || 'gray'}`"
              :style="{
                backgroundColor: `var(--${tk.status?.color || 'gray'})`,
              }"
            />

            <div class="flex items-center gap-2.5 w-fit">
              <UIAvatar class="size-6.5" :src="tk.createdBy?.image ?? undefined" />
              <p class="whitespace-nowrap text-gray min-w-19">
                {{ tk.number ? "INC-" + tk.number : "Нет номера" }}
              </p>
              <p class="text-light-gray flex-1 min-w-0 truncate">
                {{ tk?.title || "Нет названия" }}
              </p>
            </div>
          </div>
        </div>

        <div class="inline-flex items-center gap-2">
          <TrashIcon
            class="size-4.5 text-gray opacity-0 group-hover:opacity-100 duration-300 transition-all hover:text-red cursor-pointer"
            @click.prevent="() => handleDelete(tk.id)"
          />
          <p class="text-gray">
            {{ new Date(tk.date).toLocaleDateString("ru-Ru") }}
          </p>
        </div>
      </NuxtLink>
    </div>
    <div
      v-else
      class="w-full flex justify-center items-center p-4"
      :class="isShort && 'max-w-1/2 border border-border rounded-lg'"
    >
      <p class="text-gray">Все инциденты решены! Отличная работа!</p>
    </div>
  </Transition>
</template>

<style scoped>
.problems-enter-active,
.problems-leave-active {
  transition: opacity 0.32s ease;
}
.problems-enter-from,
.problems-leave-to {
  opacity: 0;
}
</style>
