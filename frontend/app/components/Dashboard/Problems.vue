<script setup lang="ts">
import { TrashIcon } from "@lucide/vue";

const { tickets, deleteTicket, getTickets } = useTickets();
await getTickets();

const { getStatuses } = useStatuses();
await getStatuses();

const handleDelete = async (id: string) => {
  await deleteTicket(id);
};
</script>

<template>
  <Transition name="problems" mode="out-in">
    <div v-if="tickets.length > 0" class="flex flex-col gap-2.5">
      <NuxtLink
        v-for="ticket in tickets"
        :key="ticket.id"
        :to="`/dashboard/problems/${ticket.id}`"
        class="relative flex justify-between border border-border rounded-lg group p-4"
      >
        <div class="flex gap-4 items-center w-full">
          <div class="flex items-center gap-3.5 w-fit">
            <div class="h-4.5 w-1.25 rounded-lg" :class="`bg-${ticket.status?.color || 'gray'}`" />

            <div class="flex items-center gap-2.5 w-fit">
              <UIAvatar class="size-6.5" :src="ticket.createdBy?.image ?? undefined" />
              <p class="whitespace-nowrap text-gray min-w-19">
                {{ ticket.number ? "ИНЦ-" + ticket.number : "Нет номера" }}
              </p>
            </div>
          </div>
          <p class="text-light-gray flex-1 min-w-0 truncate">
            {{ ticket?.title || "Нет названия" }}
          </p>
        </div>

        <div class="inline-flex items-center gap-2">
          <TrashIcon
            class="size-4.5 text-gray opacity-0 group-hover:opacity-100 duration-300 transition-all hover:text-red cursor-pointer"
            @click="() => handleDelete(ticket.id)"
          />
          <p class="text-gray">
            {{ new Date(ticket.date).toLocaleDateString("ru-Ru") }}
          </p>
        </div>
      </NuxtLink>
    </div>
    <p v-else class="text-light-gray">Все проблемы решены! Отличная работа!</p>
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
