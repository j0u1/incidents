<script setup lang="ts">
import { padding } from "~/data/dynamicStyles";

const { createTicket, getTickets } = useTickets()
const tickets = await getTickets()
</script>

<template>
    <div class="flex flex-col gap-2.5">
        <div v-for="(ticket, i) in tickets.slice(0, 4)"
                :key="i"
            class="flex justify-between border border-border rounded-lg"
            :class="padding"
        >
            <div class="flex gap-4 items-center">
                <div class="inline-flex items-center gap-2">
                    <UIAvatar class="size-6.5" :src="ticket.createdBy?.image ?? undefined" />
                    {{ ticket.createdBy?.name ?? "Неизвестный пользователь" }}
                </div>
                <p class="uppercase text-gray max-w-24 truncate">{{ ticket?.title }}</p>
                <p class="text-light-gray text-sm">
                    {{ ticket.description ?? "Нет описания" }}
                </p>
            </div>
                <p class="text-gray">
                    {{ new Date(ticket.date).toLocaleDateString("ru-Ru", ) }}
                </p>
        </div>
    </div>
</template>
