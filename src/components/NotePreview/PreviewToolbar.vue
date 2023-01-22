<script setup lang="ts">
import Zoom from '@/components/NotePreview/Toolbar/Zoom/Zoom.vue'
</script>

<template>
  <div class="preview-toolbar">
    <zoom />
  </div>
</template>

<style scoped>
.preview-toolbar {
  padding-inline: 0.4rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  height: 2.4rem;
  background-color: var(--bs-gray-200);
}
</style>
