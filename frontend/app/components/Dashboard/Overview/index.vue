<script setup lang="ts">
import { features } from "~/config/features";
</script>

<template>
  <div class="flex flex-col xl:flex-row duration-300 transition-all gap-6">
    <DashboardOverviewLatestProblems isShort v-if="features.problems" />
    <DashboardOverviewStats v-if="features.stats" />
  </div>
</template>
