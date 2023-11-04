<template>
  <section>
    <header />
    <main class="w-full h-screen">
      <section
        v-if="userStore.isLoggedIn"
        class="h-full w-full flex gap-10 flex-col justify-center items-center p-8"
      >
        <fwb-button
          gradient="purple-blue"
          outline
          size="lg"
          class="transition-all duration-150 h-15"
          @click="handleClickCreate"
        >
          Create new note
        </fwb-button>
        <div class="flex gap-2 w-full xl:w-1/3 justify-center overflow-y-scroll p-4 m-4">
          <NoteList
            v-if="!isLoading"
            :notes="notes"
            @edit-note="handleClickEdit"
          />
          <div
            v-else
            class="flex flex-col gap-2 justify-center items-center"
          >
            <fwb-spinner
              color="white"
              size="12"
            />
            <span class="text-white font-semibold">Loading notes...</span>
          </div>
        </div>
      </section>
      <section v-else>
        <LoginForm />
      </section>
      <ConfigNoteModal
        v-model:visible="showConfigModal"
        :note="noteToEdit"
      />
    </main>
  </section>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import LoginForm from '@components/auth/LoginForm.vue';
import ConfigNoteModal from '@components/modals/ConfigNote.vue';
import { FwbButton, FwbSpinner } from 'flowbite-vue';
import NoteList from './components/notes/NoteList.vue';
import { useNotesStore } from './store/notes';
import { useUsersStore } from './store/users';

const notesStore = useNotesStore();
const userStore = useUsersStore();
const { notes, isLoading } = storeToRefs(notesStore);
const noteToEdit = ref(null);
const showConfigModal = ref(false);

const handleClickEdit = (note) => {
  noteToEdit.value = note;
  showConfigModal.value = true;
};

const handleClickCreate = () => {
  noteToEdit.value = null;
  showConfigModal.value = true;
};

onMounted(async () => {
  await notesStore.fetchNotes();
});
</script>
<style>
html {
  overflow: hidden;
}
</style>
