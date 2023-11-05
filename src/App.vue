<template>
  <section>
    <notifications />
    <header />
    <main class="w-full h-screen">
      <section
        v-if="userStore.isLoggedIn || auth.currentUser"
        class="h-full w-full flex gap-5 flex-col justify-center items-center p-8"
      >
        <div class="flex gap-2 mt-6">
          <fwb-button
            gradient="purple-blue"
            outline
            size="lg"
            class="transition-all duration-150 h-15"
            @click="handleClickCreate"
          >
            Create new note
          </fwb-button>
          <fwb-button
            color="red"
            size="lg"
            class="transition-all duration-150 h-15"
            @click="handleSignOut"
          >
            Sign out
          </fwb-button>
        </div>
        <div class="w-full h-full flex gap-2 justify-center flex-col items-center">
          <div>
            <fwb-button @click="onlyMyNotes = !onlyMyNotes">
              {{ onlyMyNotes ? 'View all notes' : 'My notes' }}
            </fwb-button>
          </div>
          <div class="flex gap-2 w-full h-full xl:w-1/3 justify-center overflow-y-scroll p-6 mb-8 border rounded-xl">
            <NoteList
              v-if="!isLoading"
              :notes="notesList"
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
        </div>
      </section>
      <section
        v-else
        class="flex flex-col items-center justify-center w-full"
      >
        <LoginForm
          v-if="showLogin"
          @clicked-register="showLogin = false"
        />
        <RegisterForm
          v-else
          @clicked-login="showLogin = true"
        />
      </section>
      <ConfigNoteModal
        v-model:visible="showConfigModal"
        :note="noteToEdit"
      />
    </main>
  </section>
</template>
<script setup>
import { onBeforeMount, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import LoginForm from '@components/auth/LoginForm.vue';
import ConfigNoteModal from '@components/modals/ConfigNote.vue';
import { FwbButton, FwbSpinner } from 'flowbite-vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import RegisterForm from '@components/auth/RegisterForm.vue';
import NoteList from '@components/notes/NoteList.vue';
import { useNotesStore } from '@store/notes';
import { useUsersStore } from '@store/users';

let auth;
const router = useRouter();
const notesStore = useNotesStore();
const userStore = useUsersStore();
const { notes, isLoading } = storeToRefs(notesStore);

const onlyMyNotes = ref(false);
const notesList = computed(() => {
  if (!onlyMyNotes.value) {
    return notes.value.filter((note) => {
      if (note.isPrivate) return note.user.uid === auth.currentUser.uid;
      return true;
    });
  }
  // Don't need to check for private when all notes are from user
  return notes.value.filter((note) => note.user.uid === auth.currentUser.uid);
});

const noteToEdit = ref(null);
const showConfigModal = ref(false);
const showLogin = ref(true);

const handleClickEdit = (note) => {
  noteToEdit.value = note;
  showConfigModal.value = true;
};

const handleClickCreate = () => {
  noteToEdit.value = null;
  showConfigModal.value = true;
};

const handleSignOut = () => {
  signOut(auth);
  // force refresh
  router.go(0);
};

const getCurrentUser = () => new Promise((resolve, reject) => {
  const removeListener = onAuthStateChanged(
    getAuth(),
    (user) => {
      userStore.isLoggedIn = true;
      removeListener();
      resolve(user);
    },
    reject,
  );
});

onBeforeMount(async () => {
  auth = getAuth();
  if (await getCurrentUser())userStore.isLoggedIn = true;
  else userStore.isLoggedIn = false;
  await notesStore.fetchNotes();
});
</script>
<style>
html {
  overflow: hidden;
}
</style>
