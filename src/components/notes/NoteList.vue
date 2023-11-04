<template>
  <div
    v-auto-animate
    class="flex flex-col gap-4"
  >
    <NoteItem
      v-for="note in notes"
      :key="note.id"
      :note="note"
      @edit-note="$emit('editNote', $event)"
    />
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
import NoteItem from './NoteItem.vue';

defineProps({
  notes: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['editNote']);
</script>
