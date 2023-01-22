<script setup lang="ts">
import ZoomInBtn from '@/components/NotePreview/Toolbar/Zoom/ZoomInBtn.vue'
import ZoomOutBtn from '@/components/NotePreview/Toolbar/Zoom/ZoomOutBtn.vue'
import { injectUseNotePreview } from '@/store/UseNotePreview'
const { imgSize, addImgSize } = injectUseNotePreview()
</script>

<template>
  <div class="d-flex align-items-center gap-2">
    <zoom-in-btn @click="addImgSize(10)" />
    <span class="size">{{ imgSize.toFixed(1) }}</span>
    <zoom-out-btn @click="addImgSize(-10)" />
  </div>
</template>

<style scoped>
.size {
  user-select: none;
  font-variant-numeric: tabular-nums;
}
</style>
