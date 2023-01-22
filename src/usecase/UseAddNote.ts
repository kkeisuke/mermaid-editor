import flowchartTemplate from '@/assets/templates/flowchart.md?raw'
import sequenceDiagramTemplate from '@/assets/templates/sequenceDiagram.md?raw'
import classDiagramTemplate from '@/assets/templates/classDiagram.md?raw'
import stateDiagramTemplate from '@/assets/templates/stateDiagram.md?raw'
import erDiagramTemplate from '@/assets/templates/erDiagram.md?raw'

import { injectUseNoteCollection } from '@/store/UseNoteCollection'
import { injectUseNoteSingle } from '@/store/UseNoteSingle'

const templates = {
  flowchartTemplate,
  sequenceDiagramTemplate,
  classDiagramTemplate,
  stateDiagramTemplate,
  erDiagramTemplate
}

export const useAddNote = () => {
  const { add, fetch } = injectUseNoteCollection()
  const { read, getText, renderHtml } = injectUseNoteSingle()

  const addNewNote = async (temp: keyof typeof templates) => {
    const id = await add(templates[temp])
    await read(id)
    await renderHtml(getText())
    await fetch()
  }

  return {
    addNewNote
  }
}
