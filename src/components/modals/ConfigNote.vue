<template>
  <fwb-modal
    v-if="visible"
    @close="$emit('update:visible', false)"
    @click:outside="$emit('update:visible', false)"
  >
    <template #header>
      <div class="flex items-center text-lg text-gray-800 font-semibold">
        {{ isCreatingNewNote ? 'Create' : 'Update' }} note
      </div>
    </template>
    <template #body>
      <ConfigNoteForm
        :note="note"
        :is-create="isCreatingNewNote"
        @submit-success="$emit('update:visible', false)"
      />
    </template>
  </fwb-modal>
</template>
<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { FwbModal } from 'flowbite-vue';
import ConfigNoteForm from '@components/notes/ConfigForm.vue';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  note: {
    type: Object,
    default: null,
  },
});

defineEmits(['update:visible']);

const isCreatingNewNote = computed(() => props.note === null);
</script>
