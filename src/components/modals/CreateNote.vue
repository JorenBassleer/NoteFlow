<template>
  <fwb-modal
    v-if="visible"
    @close="$emit('update:visible', false)"
    @click:outside="$emit('update:visible', false)"
  >
    <template #header>
      <div class="flex items-center text-lg text-gray-800 font-semibold">
        Create note
      </div>
    </template>
    <template #body>
      <CreateNoteForm />
    </template>
  </fwb-modal>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
import { FwbModal } from 'flowbite-vue';
import CreateNoteForm from '@components/notes/CreateForm.vue';

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

defineEmits(['update:visible']);
</script>
