<template>
  <!-- <form @submit.prevent="submitForm">
    <div>
      <label>
        Title
      </label>
      <input v-model="newNote.title">
    </div>
    <div>
      <label>
        Content
      </label>
      <input v-model="newNote.content">
    </div>
    <button type="submit">{{ isLoading ? 'Submitting...' : 'Submit' }}</button>
  </form> -->
  <div>Create form</div>
</template>
<script>
import { ref } from 'vue';
import { useNotesStore } from '../../store/notes';
import { storeToRefs } from 'pinia';

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
