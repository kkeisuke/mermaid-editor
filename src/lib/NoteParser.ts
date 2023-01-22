const startDiagram = '```mermaid'
const endDiagram = '```'

export const parser = (text: string) => {
  const lines = text.split('\n')
  const diagrams: string[] = []
  const temp: string[] = []
  let isDiagram = false

  lines.forEach((line) => {
    if (line === startDiagram) {
      isDiagram = true
      temp.length = 0
    } else if (line === endDiagram) {
      isDiagram = false
      diagrams.push(temp.join('\n'))
    } else if (isDiagram) {
      temp.push(line)
    }
  })

  return {
    diagrams
  }
}
