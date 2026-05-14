<script setup lang="ts">
import { getPercent } from "~/data/categoriesStats";

const { statuses, getStatuses } = useStatuses();
const ticket = useTicketsStore();

await getStatuses();

const ticketCountByStatus = computed(() => {
  const counts: Record<string, number> = {};
  for (const tk of ticket.tickets) {
    const status = statuses.value.find((s) => s.id === tk.status?.id);
    if (status) {
      counts[status.name] = (counts[status.name] || 0) + 1;
    }
  }
  return counts;
});
</script>

<template>
  <UICard class="min-h-67 w-1/2" title="Статистика по статусам">
    <div class="flex flex-col gap-4">
      <div
        v-for="st in statuses"
        :key="st.name"
        class="text-sm flex justify-between p-4 border border-border rounded-lg"
      >
        <div class="flex items-center justify-items-center gap-4 w-full">
          <span class="uppercase text-gray w-38 truncate">{{ st.name }}</span>
          <div class="w-full rounded-full h-2 bg-secondary overflow-hidden">
            <div
              class="h-full bg-gray rounded-full"
              :style="{ width: getPercent(ticketCountByStatus[st.name] || 0) }"
            />
          </div>
          <span>{{ ticketCountByStatus[st.name] || 0 }}</span>
        </div>
      </div>
    </div>
  </UICard>
</template>
