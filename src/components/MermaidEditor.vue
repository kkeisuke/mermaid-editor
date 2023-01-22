<script setup lang="ts">
import AppHeader from '@/components/AppHeader/AppHeader.vue'
import NoteList from '@/components/NoteList/NoteList.vue'
import NoteEditor from '@/components/NoteEditor/NoteEditor.vue'
import NotePreview from '@/components/NotePreview/NotePreview.vue'
import { provideUseNoteCollection } from '@/store/UseNoteCollection'
import { provideUseNoteSingle } from '@/store/UseNoteSingle'
import { provideUseLayout } from '@/store/UseLayout'

provideUseNoteCollection()
provideUseNoteSingle()
const { isShowMenu } = provideUseLayout()
</script>

<template>
  <div class="mermaid-editor">
    <app-header class="app-header" />
    <note-list class="note-list" :class="{ hidden: !isShowMenu }" />
    <note-editor class="note-editor" />
    <note-preview />
  </div>
</template>

<style scoped>
.mermaid-editor {
  display: grid;
  grid-template-columns: auto auto minmax(40rem, 1fr);
  grid-template-rows: auto 1fr;
  height: 100vh;
}
.app-header {
  grid-column: 1 / 4;
}
.note-list {
  width: 14rem;
}
.note-editor {
  width: 45rem;
}
.hidden {
  padding: 0;
  width: 0;
}
</style>
