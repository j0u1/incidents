<script setup lang="ts">
import { PlusIcon } from "@lucide/vue";
</script>

<template>
    <UICard class="min-h-67" title="Последние проблемы" :button="{ boolean: true, text: 'Добавить новую проблему' }" :icon="PlusIcon">
        <DashboardProblems />
    </UICard>
</template>
