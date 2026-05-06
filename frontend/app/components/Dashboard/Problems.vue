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
            <div v-for="(ticket, i) in tickets.slice(0, 4)"
                    :key="i"
                class="relative flex justify-between border border-border rounded-lg group"
                :class="padding"
            >
                <div class="flex gap-4 items-center">
                    <div class="relative inline-flex items-center gap-2 group/avatar">
                        <UIAvatar class="size-6.5" :src="ticket.createdBy?.image ?? undefined" />
                        <p class="absolute -bottom-14 -left-3.5 py-2 px-4 bg-secondary rounded-lg group-hover/avatar:opacity-100 opacity-0 transition-opacity duration-300 text-sm whitespace-nowrap text-gray border border-border">
                            {{ ticket.createdBy?.name ?? "Неизвестный пользователь" }}
                        </p>
                    </div>
                    <p class="uppercase text-gray min-w-24 max-w-24 truncate">{{ ticket?.title }}</p>
                   <p class="text-light-gray text-sm">
                        {{ ticket.description || "Нет описания" }}
                    </p>
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