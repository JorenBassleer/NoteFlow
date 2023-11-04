<template>
  <section>
    <header />
    <main>
      <section v-if="userStore.isLoggedIn">
        <div
          v-for="note in notes"
          :key="note"
        >
          Note: {{ note.content }}
        </div>
      </section>
      <section v-else>
        <LoginForm />
      </section>
      <!-- <CreateForm /> -->
    </main>
  </section>
</template>
<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import LoginForm from '@components/auth/LoginForm.vue'
import { useNotesStore } from './store/notes';
import { useUsersStore } from './store/users';

const notesStore = useNotesStore();
const userStore = useUsersStore();
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
