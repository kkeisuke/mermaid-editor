<script setup lang="ts">
import { watch } from 'vue'
import DiagramSvg from '@/components/NoteList/DiagramSvg.vue'
import DeleteBtn from '@/components/NoteList/DeleteBtn.vue'
import DownloadBtn from '@/components/NoteList/DownloadBtn.vue'
import { injectUseNoteCollection } from '@/store/UseNoteCollection'
import { injectUseNoteSingle } from '@/store/UseNoteSingle'
import { useSelectNote } from '@/usecase/UseSelectNote'

const { selectNote, deleteNote } = useSelectNote()
const { notes, fetch } = injectUseNoteCollection()
const { current } = injectUseNoteSingle()

// 更新を一覧に反映させる
watch(
  current.value,
  async () => {
    await fetch()
  },
  { immediate: true }
)
</script>

<template>
  <div class="overflow-auto bg-dark">
    <ul class="list-group list-group-flush">
      <li v-for="note in notes" :key="note.id" class="list-group-item p-0">
        <div class="inner p-2 d-flex flex-wrap gap-1" :class="{ current: note.id === current.id }" role="button" @click="selectNote(note.id)">
          <div v-for="(diagram, index) in note.diagrams" :key="index" :class="{ 'w-100': !index, secondary: index }" class="position-relative">
            <diagram-svg :diagram="diagram" />
            <download-btn :diagram="diagram" class="position-absolute bottom-0 end-0 me-1" />
          </div>
          <delete-btn class="position-absolute bottom-0 start-0 mb-2 ms-2" @delete="deleteNote(note)" />
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.inner:is(:hover, .current) {
  outline-offset: -0.4rem;
  outline: 0.4rem solid var(--bs-pink);
}
.diagram-svg {
  display: grid;
  place-content: center;
  height: 14rem;
}
.secondary {
  width: calc(50% - 0.125rem);
}
.secondary .diagram-svg {
  height: 3.5rem;
}
</style>
