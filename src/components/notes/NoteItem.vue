<template>
  <fwb-card
    href="#"
    class="shadow-xl p-4"
  >
    <div class="flex gap-6">
      <div class="h-full flex justify-center items-center">
        <fwb-avatar
          initials="JB"
          rounded
        />
      </div>
      <section>
        <div class="flex gap-4">
          <div class="text-xl text-gray-800">
            Title:
          </div>
          <div class="text-gray-800">
            {{ note.title }}
          </div>
        </div>
        <div class="flex gap-4">
          <div class="font-semibold text-gray-800">
            content:
          </div>
          <div class="text-gray-800">
            {{ note.content }}
          </div>
        </div>
      </section>
    </div>
  </fwb-card>
</template>
<script setup>
import { defineProps } from 'vue';
import { FwbCard, FwbAvatar } from 'flowbite-vue';

defineProps({
  note: {
    type: Object,
    required: true,
  },
});
</script>
