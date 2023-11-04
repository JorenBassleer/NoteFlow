<template>
  <form @submit.prevent="submitForm">
    <fwb-input
      v-model="newNote.title"
      placeholder="enter the title of your new note"
      label="Title"
      class="mb-2"
      required
    />
    <fwb-textarea
      v-model="newNote.content"
      placeholder="enter the content of your new note"
      label="Content"
      required
    />
    <div class="mt-4 class flex justify-end">
      <fwb-button
        color="dark"
        class="transition-all duration-150"
        @click="submitForm"
      >
        <div class="flex items-center gap-2">
          <fwb-spinner
            v-if="isLoading"
            size="4"
          />
          <span>{{ isLoading ? 'Submtting...': 'Submit' }}</span>
        </div>
      </fwb-button>
    </div>
  </form>
</template>
<script setup>
import { ref } from 'vue';
import {
  FwbInput, FwbTextarea, FwbButton, FwbSpinner,
} from 'flowbite-vue';
import { storeToRefs } from 'pinia';
import { useNotesStore } from '../../store/notes';

const notesStore = useNotesStore();
const { isLoading } = storeToRefs(notesStore);
const newNote = ref({
  title: '',
  content: '',
  // set user id
  userId: '123',
});

const submitForm = async () => {
  try {
    await notesStore.createNote(newNote.value);
  } catch (error) {
    console.log(error);
  }
};
</script>
