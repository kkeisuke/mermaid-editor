import Dexie from 'dexie'
import type { Note } from '@/entities/Note'

const note: Record<keyof Note, string> = {
  id: '&', // primary key
  text: '',
  diagrams: '*', // array
  createdAt: '',
  updatedAt: ''
}
const ver = 1
const DBName = 'MermaidEditor'
const tableName = 'notes'
const db = new Dexie(DBName)

export const noteRepository = {
  init() {
    const schema = {
      [tableName]: (Object.keys(note) as Array<keyof Note>).map((key) => note[key] + key).join(',')
    }
    db.version(ver).stores(schema)
  },
  table() {
    return db.table<Note, string>(tableName)
  }
}
