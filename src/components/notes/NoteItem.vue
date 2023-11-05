<template>
  <fwb-card
    class="shadow-xl p-4 border border-black"
  >
    <div class="flex gap-6">
      <div class="flex items-center p-2">
        <fwb-avatar
          :initials="note.user.displayName || note.user.email"
        />
      </div>
      <section class="w-full p-2">
        <!-- Check if user is the one allowed to do this -->
        <div
          v-if="auth.currentUser.uid === props.note.user.uid"
          class="absolute flex gap-2 top-0 right-0 z-40"
        >
          <fwb-button
            color="default"
            size="xs"
            class="transition-all duration-150"
            @click="handleTogglePrivate"
          >
            Make {{ props.note.isPrivate ? 'un': '' }}private
          </fwb-button>
          <fwb-button
            color="yellow"
            size="xs"
            class="transition-all duration-150"
            @click="$emit('editNote', note)"
          >
            Edit
          </fwb-button>
          <fwb-button
            color="red"
            size="xs"
            class="transition-all duration-150"
            @click="handleClickDelete"
          >
            Delete
          </fwb-button>
        </div>
        <div class="flex relative gap-4 my-6">
          <div class="text-xl text-gray-800 w-1/3">
            Title:
          </div>
          <div class="text-gray-800 w-2/3">
            {{ note.title }}
          </div>
        </div>
        <div class="flex gap-4">
          <div class="font-semibold text-gray-800 w-1/3">
            content:
          </div>
          <div class="text-gray-800 w-2/3">
            {{ note.content }}
          </div>
        </div>
      </section>
    </div>
  </fwb-card>
</template>
<script setup>
import {
  defineProps, defineEmits,
} from 'vue';
import {
  FwbCard, FwbAvatar, FwbButton,
} from 'flowbite-vue';
import { getAuth } from 'firebase/auth';
import { useNotification } from '@kyvg/vue3-notification';
import { useNotesStore } from '@store/notes';

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});
defineEmits(['editNote']);

const store = useNotesStore();
const auth = getAuth();
const { notify } = useNotification();

const handleTogglePrivate = async () => {
  try {
    await store.updateNote({
      ...props.note,
      isPrivate: !props.note.isPrivate,
    }, props.note.id);
    notify({
      title: 'Success',
      text: props.note.isPrivate ? 'Only you can see the note now' : 'Everyone can see the note again',
      type: 'success',
    });
  } catch (error) {
    notify({
      title: 'Error',
      text: error.message,
      type: 'danger',
    });
  }
};

const handleClickDelete = async () => {
  // Ask for confirm
  try {
    await store.deleteNote(props.note.id);
    notify({
      title: 'Deleted note',
      text: 'Successfully deleted note',
    });
  } catch (error) {
    notify({
      title: 'Error',
      text: error.message,
      type: 'danger',
    });
  }
};

</script>
