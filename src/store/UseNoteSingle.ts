import { computed, inject, type InjectionKey, provide, reactive, ref, toRaw } from 'vue'
import { noteCacheRepository } from '@/repository/NoteCacheRepository'
import { noteSingleRepository } from '@/repository/NoteSingleRepository'
import { getDefaultNote, type Note } from '@/entities/Note'
import { convertToHtml } from '@/plugin/Marked'
import { parser } from '@/lib/NoteParser'

type State = {
  note: Note
}

const useNoteSingle = () => {
  const state = reactive<State>({
    note: getDefaultNote()
  })
  const htmlString = ref('')

  const read = async (id: Note['id']) => {
    const result = await noteSingleRepository.read(id)
    Object.assign(state.note, result)
    noteCacheRepository.save(id)
  }

  const readCache = async () => {
    const id = noteCacheRepository.fetch()
    id && (await read(id))
  }

  const getText = () => {
    return state.note.text
  }

  const update = async (text: Note['text']) => {
    if (!state.note.id) {
      return
    }
    state.note.text = text
    const result = await noteSingleRepository.update(toRaw(state.note))
    // updatedAt が更新される
    Object.assign(state.note, result)
  }

  const destroy = async (note: Note) => {
    await noteSingleRepository.delete(note.id)
    if (state.note.id === note.id) {
      Object.assign(state.note, getDefaultNote())
      htmlString.value = ''
      noteCacheRepository.reset()
    }
  }

  const setCurrentHtml = (text?: Note['text']) => {
    htmlString.value = convertToHtml(text || state.note.text)
  }

  const renderHtml = async (text: Note['text']) => {
    if (!state.note.id) {
      return
    }
    const { diagrams } = parser(text)
    state.note.diagrams = diagrams
    // diagrams を更新するため
    await update(text)
    htmlString.value = convertToHtml(text)
  }

  return {
    current: computed(() => state.note),
    htmlString: computed(() => htmlString.value),
    read,
    readCache,
    getText,
    update,
    destroy,
    setCurrentHtml,
    renderHtml
  }
}

const USE_NOTE_SINGLE: InjectionKey<ReturnType<typeof useNoteSingle>> = Symbol('USE_NOTE_SINGLE')

export const provideUseNoteSingle = () => {
  const useObj = useNoteSingle()

  provide(USE_NOTE_SINGLE, useObj)

  return useObj
}

export const injectUseNoteSingle = () => {
  const useObj = inject(USE_NOTE_SINGLE)

  if (useObj) {
    return useObj
  } else {
    throw new Error('error injectUseNoteSingle')
  }
}
