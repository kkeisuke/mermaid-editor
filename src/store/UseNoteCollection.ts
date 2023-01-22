import { computed, inject, type InjectionKey, provide, reactive } from 'vue'
import { noteCollectionRepository } from '@/repository/NoteCollectionRepository'
import { getDefaultNote, type Note } from '@/entities/Note'

type State = {
  notes: Note[]
}

const useNoteCollection = () => {
  const state = reactive<State>({
    notes: []
  })

  const fetch = async () => {
    state.notes = await noteCollectionRepository.fetch()
  }

  const add = async (text: Note['text']) => {
    const id = await noteCollectionRepository.add({ ...getDefaultNote(), text })
    fetch()
    return id
  }

  return {
    notes: computed(() => state.notes),
    fetch,
    add
  }
}

const USE_NOTE_COLLECTION: InjectionKey<ReturnType<typeof useNoteCollection>> = Symbol('USE_NOTE_COLLECTION')

export const provideUseNoteCollection = () => {
  const useObj = useNoteCollection()

  provide(USE_NOTE_COLLECTION, useObj)

  return useObj
}

export const injectUseNoteCollection = () => {
  const useObj = inject(USE_NOTE_COLLECTION)

  if (useObj) {
    return useObj
  } else {
    throw new Error('error injectUseNoteCollection')
  }
}
