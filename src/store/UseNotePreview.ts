import { notePreviewRepository } from '@/repository/NotePreviewRepository'
import { computed, inject, type InjectionKey, provide, ref } from 'vue'

const DEFAULT_IMG_SIZE = 50

export const useNotePreview = () => {
  const imgSize = ref(notePreviewRepository.fetchImgSize() || DEFAULT_IMG_SIZE)

  const addImgSize = (val: number) => {
    const result = imgSize.value + val
    if (result <= 0) {
      return
    }
    imgSize.value = result
    notePreviewRepository.saveImgSize(imgSize.value)
  }

  return {
    imgSize: computed(() => imgSize.value / 100),
    addImgSize
  }
}

const USE_NOTE_PREVIEW: InjectionKey<ReturnType<typeof useNotePreview>> = Symbol('USE_NOTE_PREVIEW')

export const provideUseNotePreview = () => {
  const useObj = useNotePreview()

  provide(USE_NOTE_PREVIEW, useObj)

  return useObj
}

export const injectUseNotePreview = () => {
  const useObj = inject(USE_NOTE_PREVIEW)

  if (useObj) {
    return useObj
  } else {
    throw new Error('error injectUseNotePreview')
  }
}
