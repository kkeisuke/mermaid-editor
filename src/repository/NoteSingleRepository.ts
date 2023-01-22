import { noteRepository } from '@/repository/NoteRepository'
import type { Note } from '@/entities/Note'

export const noteSingleRepository = {
  async read(id: Note['id']) {
    if (!id) {
      throw new Error('empty id')
    }
    const note = await noteRepository.table().get(id)
    if (!note) {
      throw new Error('not found note')
    }
    return note
  },
  async update(note: Note) {
    if (!note.id) {
      throw new Error('empty id')
    }
    note.updatedAt = Date.now()
    const result = await noteRepository.table().update(note.id, note)
    if (!result) {
      throw new Error('error update')
    }
    return note
  },
  async delete(id: Note['id']) {
    if (!id) {
      throw new Error('empty id')
    }
    try {
      await noteRepository.table().delete(id)
      return id
    } catch (error) {
      throw new Error('error delete')
    }
  }
}
