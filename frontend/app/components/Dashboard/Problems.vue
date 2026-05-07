<script setup lang="ts">
import { TrashIcon } from "@lucide/vue";
import { padding } from "~/data/dynamicStyles";

const { tickets, deleteTicket, getTickets } = useTickets()
await getTickets()

const handleDelete = async (id: string) => {
    await deleteTicket(id)
}
</script>

<template>
    <Transition name="problems" mode="out-in">
        <div v-if="tickets.length > 0" class="flex flex-col gap-2.5">
            <div v-for="(ticket, i) in tickets"
                    :key="i"
                class="relative flex justify-between border border-border rounded-lg group p-4"
            >
                <div class="flex gap-4 items-center">
                    <div class="inline-flex items-center gap-2.5">
                        <UIAvatar class="size-6.5" :src="ticket.createdBy?.image ?? undefined" />
                        <p class="whitespace-nowrap text-gray">
                            {{ "ИНЦ-" + ticket.number || "Нет номера"}}
                        </p>
                    </div>
                    <p class="text-light-gray w-full max-w-62 truncate">{{ ticket?.title || "Нет названия" }}</p>
                   <!-- <p class="text-light-gray text-sm">
                        {{ ticket.description || "Нет описания" }}
                    </p> -->
                </div>
                <div class="inline-flex items-center gap-2">
                    <TrashIcon class="size-4.5 text-gray opacity-0 group-hover:opacity-100 duration-300 transition-all hover:text-red cursor-pointer" @click="() => handleDelete(ticket.id)" />
                    <p class="text-gray">
                        {{ new Date(ticket.date).toLocaleDateString("ru-Ru", ) }}
                    </p>
                </div>
            </div>
        </div>
        <p v-else class="text-light-gray">
            Все проблемы решены! Отличная работа!
        </p>
    </Transition>
</template>

<style scoped>
.problems-enter-active, .problems-leave-active {
  transition: opacity 0.32s ease;
}
.problems-enter-from, .problems-leave-to {
  opacity: 0;
}
</style>