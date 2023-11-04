<template>
  <section>
    <header />
    <main>
      <TheNavBar />
      <div
        v-for="note in notes"
        :key="note"
      >
        Note: {{ note.content }}
      </div>
    </main>
  </section>
</template>
<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import TheNavBar from '@components/TheNavBar.vue';
import { useNotesStore } from './store/notes';

const notesStore = useNotesStore();
const { notes } = storeToRefs(notesStore);

onMounted(async () => {
  await notesStore.fetchNotes();
});
</script>
<style>
html {
  overflow: hidden;
}
</style>
