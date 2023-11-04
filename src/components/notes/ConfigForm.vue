<template>
  <form @submit.prevent="submitForm">
    <fwb-input
      v-model="newNote.title"
      :placeholder="props.isCreate ? 'enter the title of your new note' : 'update the tile of your note'"
      label="Title"
      class="mb-2"
      required
    />
    <fwb-textarea
      v-model="newNote.content"
      :placeholder="props.isCreate ? 'enter the content of your new note' : 'update the content of your note'"
      label="Content"
      required
    />
    <div class="mt-4 class flex justify-end">
      <fwb-button
        color="dark"
        class="transition-all duration-150"
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
import { ref, defineEmits, defineProps } from 'vue';
import {
  FwbInput, FwbTextarea, FwbButton, FwbSpinner,
} from 'flowbite-vue';
import { storeToRefs } from 'pinia';
import { getAuth } from 'firebase/auth';
import { useNotification } from '@kyvg/vue3-notification';
import { useNotesStore } from '../../store/notes';

const { notify } = useNotification();
const user = getAuth().currentUser;
const props = defineProps({
  note: {
    type: Object,
    default: () => ({
      title: '',
      content: '',
    }),
  },
  isCreate: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['submitSuccess']);

const notesStore = useNotesStore();
const { isLoading } = storeToRefs(notesStore);
const newNote = ref(props.note ?? {
  title: '',
  content: '',
  userId: user.uid,
});

const submitForm = async () => {
    console.log(newNote.value);
    if (props.isCreate) await notesStore.createNote(newNote.value);
    else await notesStore.updateNote(newNote.value, props.note.id);
    emit('submitSuccess');
    notify({
      title: 'Success',
      text: 'Your note has been saved',
      type: 'success',
    });
    newNote.value = {
      title: '',
      content: '',
    };
    notify({
      title: 'Error',
      text: error.message,
      type: 'danger',
    });
};
</script>
