<script setup lang="ts">
defineProps<{
  label: string;
  additionalText?: string;
}>();
</script>

<template>
  <label>
    {{ label }}
    <span v-if="additionalText" class="text-gray text-sm">
      {{ additionalText }}
    </span>
  </label>
</template>
