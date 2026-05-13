<script setup lang="ts">
import { CheckIcon, Clock10Icon, TrashIcon, TriangleAlertIcon } from "@lucide/vue";

const { tickets, getTickets } = useTickets();
await getTickets();

const { statuses, getStatuses, deleteStatus } = useStatuses();
await getStatuses();

const ticketCountByStatus = computed(() => {
  const counts: Record<string, number> = {};
  for (const ticket of tickets.value) {
    const status = statuses.value.find((s) => s.id === ticket.status?.id);
    if (status) {
      counts[status.name] = (counts[status.name] || 0) + 1;
    }
  }
  return counts;
});
</script>

<template>
  <Transition name="statuses" mode="out-in">
    <div
      v-if="statuses.length > 0"
      class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 duration-300 transition-all"
    >
      <div
        v-for="ps in statuses"
        :key="ps.id"
        class="relative rounded-lg border border-border py-3 px-3.5 gap-2.5 group/status"
      >
        <div
          class="absolute -top-1 -left-1 size-3.5 rounded-full"
          :style="{ backgroundColor: `var(--${ps.color})` }"
        />
        <div class="flex items-center gap-3.5">
          <p class="text-5xl font-medium w-fit">
            {{ ticketCountByStatus[ps.name] ?? 0 }}
          </p>
        </div>
        <div class="text-light-gray">{{ ps.name }}</div>
        <div class="text-sm text-gray">
          {{ ps.description || "Нет описания" }}
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex items-center justify-center text-gray border border-border p-4 py-14 rounded-lg"
    >
      <span> Сейчас статусов нет. Создайте новые </span>
    </div>
  </Transition>
</template>
