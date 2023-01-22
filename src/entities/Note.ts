export type Note = {
  id: string
  text: string
  diagrams: string[]
  createdAt: number
  updatedAt: number
}

export const getDefaultNote = (): Note => ({
  id: '',
  text: '',
  diagrams: [],
  createdAt: 0,
  updatedAt: 0
})
