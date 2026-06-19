<script setup lang="ts">
import { features } from "~/config/features";

const isGrid = ref(false);
</script>

<template>
  <DashboardOverviewHead v-model:isGrid="isGrid" />
  <div class="flex flex-col xl:flex-row duration-300 transition-all gap-6">
    <DashboardProblems v-model:isGrid="isGrid" isShort v-if="features.problems" />
    <DashboardOverviewStats v-if="features.stats" />
  </div>
</template>
