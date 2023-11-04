<template>
  <fwb-modal
    v-if="visible"
    @close="$emit('update:visible', false)"
    
  >
    <template #header>
      <div class="flex items-center text-lg">
        Create note
      </div>
    </template>
    <template #body>
      <form>
        foifpooifkoi
      </form>
    </template>
  </fwb-modal>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
import { FwbModal } from 'flowbite-vue';

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

defineEmits(['update:visible']);
</script>
