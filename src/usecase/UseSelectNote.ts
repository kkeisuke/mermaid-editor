import type { Note } from '@/entities/Note'
import { injectUseNoteCollection } from '@/store/UseNoteCollection'
import { injectUseNoteSingle } from '@/store/UseNoteSingle'

export const useSelectNote = () => {
  const { fetch } = injectUseNoteCollection()
  const { read, destroy, setCurrentHtml } = injectUseNoteSingle()

  const selectNote = async (id: Note['id']) => {
    await read(id)
    await setCurrentHtml()
  }

  const deleteNote = async (note: Note) => {
    await destroy(note)
    await fetch()
  }

  return {
    selectNote,
    deleteNote
  }
}
