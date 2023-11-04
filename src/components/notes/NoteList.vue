<template>
  <div class="flex flex-col gap-4">
    <NoteItem
      v-for="note in notes"
      :key="note.id"
      :note="note"
    />
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
import NoteItem from './NoteItem.vue';

defineProps({
  notes: {
    type: Array,
    default: () => [],
  },
});
</script>
