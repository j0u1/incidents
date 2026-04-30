<script setup lang="ts">
defineProps<{
    label: String;
    additionalText?: String;
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
