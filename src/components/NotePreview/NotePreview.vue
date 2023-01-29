<script setup lang="ts">
import PreviewToolbar from '@/components/NotePreview/PreviewToolbar.vue'
import { provideUseNotePreview } from '@/store/UseNotePreview'
import { injectUseNoteSingle } from '@/store/UseNoteSingle'
import { vMermaid } from '@/directives/v-mermaid'

const { imgSize } = provideUseNotePreview()
const { htmlString } = injectUseNoteSingle()
</script>

<template>
  <div class="d-flex flex-column overflow-hidden">
    <preview-toolbar class="flex-shrink-0" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-mermaid class="flex-grow-1 pt-3 px-3 pb-0 overflow-auto" v-html="htmlString" />
  </div>
</template>

<style scoped>
:deep(.diagram-svg) {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center; /* for safari */
}
:deep(.diagram-svg) svg {
  max-width: unset !important;
  width: calc(40rem * v-bind('imgSize'));
}
</style>
