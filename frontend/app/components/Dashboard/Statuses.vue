<script setup lang="ts">
const ticket = useTicketsStore();
const { statuses, getStatuses } = useStatuses();
const isLoading = ref(true);

onMounted(async () => {
  await getStatuses();
  isLoading.value = false;
});

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
  <Transition name="statuses" mode="out-in">
    <div
      v-if="isLoading"
      class="flex items-center justify-center text-sm text-gray border border-border w-full min-h-29.5 rounded-3xl"
    >
      Идёт загрузка статусов...
    </div>
    <div
      v-else-if="statuses.length > 0"
      class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 duration-300 transition-all"
    >
      <div
        v-for="ps in statuses"
        :key="ps.id"
        class="relative rounded-lg border border-border py-3 px-3.5 gap-2.5 group/status min-h-29.5"
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
