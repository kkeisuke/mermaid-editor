<script setup lang="ts">
import { watch } from 'vue'
import DeleteBtn from '@/components/NoteList/DeleteBtn.vue'
import { injectUseNoteCollection } from '@/store/UseNoteCollection'
import { injectUseNoteSingle } from '@/store/UseNoteSingle'
import { useSelectNote } from '@/usecase/UseSelectNote'
import { vMermaid } from '@/directives/v-mermaid'

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
    <ul v-mermaid class="list-group list-group-flush">
      <li v-for="note in notes" :key="note.id" class="list-group-item p-0">
        <div class="inner p-2 d-flex flex-wrap gap-1" :class="{ current: note.id === current.id }" role="button" @click="selectNote(note.id)">
          <div v-for="(diagram, index) in note.diagrams" :key="index" :class="{ 'w-100': !index, 'secondary flex-grow-1': index }">
            <pre :id="`diagram-${note.id}-${index}`" class="mermaid">{{ diagram }}</pre>
          </div>
          <delete-btn class="position-absolute bottom-0 start-0 mb-2 ms-2" @delete="deleteNote(note)" />
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.inner {
  min-height: 14rem;
}
.inner:is(:hover, .current) {
  outline-offset: -0.4rem;
  outline: 0.4rem solid var(--bs-pink);
}
:deep(.mermaid-svg) {
  display: grid;
  place-content: center;
  width: 100%;
  height: 14rem;
  background-color: #fff;
}
:deep(.mermaid-svg) svg {
  height: 100%;
}
.secondary {
  max-width: calc(50% - 0.125rem);
}
.secondary :deep(.mermaid-svg) {
  height: 3.5rem;
}
.mermaid {
  display: none;
}
</style>
