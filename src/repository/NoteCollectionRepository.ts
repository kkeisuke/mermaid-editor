import { noteRepository } from '@/repository/NoteRepository'
import type { Note } from '@/entities/Note'

export const noteCollectionRepository = {
  add(note: Note) {
    note.id = crypto.randomUUID()
    note.createdAt = Date.now()
    note.updatedAt = Date.now()
    return noteRepository.table().add(note)
  },
  fetch() {
    const order: keyof Note = 'updatedAt'
    return noteRepository.table().reverse().sortBy(order)
  }
}
