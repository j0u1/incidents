<script setup lang="ts">
defineProps<{
  label: string;
  additionalText?: string;
  required?: boolean;
}>();
</script>

<template>
  <label
    :class="required && 'cursor-help'"
    :title="required ? 'Обязательное для заполнения поле' : undefined"
  >
    {{ label }}
    <span v-if="required" class="text-red">*</span>
    <span v-if="additionalText" class="text-gray text-sm">
      {{ additionalText }}
    </span>
  </label>
</template>
