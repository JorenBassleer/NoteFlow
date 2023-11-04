<template>
  <section>
    <header />
    <main class="w-full h-screen">
      <section
        v-if="userStore.isLoggedIn"
        class="h-full w-full flex gap-10 flex-col justify-center items-center"
      >
        <div class="flex justify-end">
          <fwb-button
            color="dark"
            size="lg"
            class="transition-all duration-150"
            pill
            @click="showCreateModal = true"
          >
            Create new note
          </fwb-button>
        </div>
        <div class="flex gap-2">
          <NoteList
            :notes="notes"
          />
        </div>
      </section>
      <section v-else>
        <LoginForm />
      </section>
      <!-- <CreateForm /> -->
    </main>
    <CreateNoteModal
      v-model:visible="showCreateModal"
    />
  </section>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import LoginForm from '@components/auth/LoginForm.vue';
import CreateNoteModal from '@components/modals/CreateNote.vue';
import { FwbButton } from 'flowbite-vue';
import NoteList from './components/notes/NoteList.vue';
import { useNotesStore } from './store/notes';
import { useUsersStore } from './store/users';

const notesStore = useNotesStore();
const userStore = useUsersStore();
const { notes } = storeToRefs(notesStore);
const showCreateModal = ref(false);

onMounted(async () => {
  await notesStore.fetchNotes();
});
</script>
<style>
html {
  overflow: hidden;
}
</style>
