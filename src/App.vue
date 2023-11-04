<template>
  <section>
    <header />
    <main class="w-full h-screen">
      <section
        v-if="userStore.isLoggedIn"
        class="h-full w-full flex justify-center items-center"
      >
        <NoteList
          :notes="notes"
        />
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
import LoginForm from '@components/auth/LoginForm.vue';
import NoteList from './components/notes/NoteList.vue';
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
