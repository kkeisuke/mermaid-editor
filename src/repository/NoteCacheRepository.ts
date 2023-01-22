import type { Note } from '@/entities/Note'

const CASH_NOTE_ID = 'CASH_NOTE_ID'

export const noteCacheRepository = {
  fetch() {
    return window.localStorage.getItem(CASH_NOTE_ID) || ''
  },
  save(id: Note['id']) {
    window.localStorage.setItem(CASH_NOTE_ID, id)
  },
  reset() {
    window.localStorage.setItem(CASH_NOTE_ID, '')
  }
}
