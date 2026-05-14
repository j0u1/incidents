<script setup lang="ts">
const route = useRoute();
const ticket = useTicketsStore();

await ticket.getTickets();
</script>

<template>
  <NuxtRouteAnnouncer class="absolute" />
  <NuxtLayout class="hidden lg:flex">
    <NuxtPage />
  </NuxtLayout>
  <div
    v-if="route.name !== 'index'"
    class="flex items-center justify-center h-screen lg:hidden duration-300 transition-all text-gray"
  >
    Доступная только компьютерная версия
  </div>
</template>
