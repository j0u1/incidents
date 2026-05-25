<script setup lang="ts">
const dialogRef = useTemplateRef("dialogRef");

const props = defineProps<{
  openModal: boolean;
  title?: string;
}>();

const emit = defineEmits<{
  "update:openModal": [value: boolean];
}>();

watch(
  () => props.openModal,
  async (val) => {
    if (val) {
      if (!dialogRef.value?.open) {
        dialogRef.value?.showModal();
      }
    } else {
      if (dialogRef.value?.open) {
        dialogRef.value?.close();
      }
    }
  },
);
</script>

<template>
  <dialog
    ref="dialogRef"
    class="absolute flex items-center justify-center top-0 left-0 size-full m-0 p-0 max-w-none max-h-none bg-black/20 backdrop-blur-sm z-1 text-white"
    @click.self="emit('update:openModal', false)"
    @close="emit('update:openModal', false)"
  >
    <UIModalCloseButton @click.stop="emit('update:openModal', false)" />
    <div class="border border-border bg-secondary rounded-2xl p-4 max-w-84 w-full mx-auto">
      <h3 v-if="title" class="text-2xl font-medium mb-4">
        {{ title }}
      </h3>
      <div class="flex flex-col gap-4">
        <slot />
      </div>
    </div>
  </dialog>
</template>

<style scoped>
dialog {
  opacity: 1;
  transition: opacity 0.32s ease;
}

dialog:not([open]) {
  opacity: 0;
  user-select: none;
  pointer-events: none;
}

@starting-style {
  dialog[open] {
    opacity: 0;
  }
}
</style>
