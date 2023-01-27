export const START_DIAGRAM = '```mermaid'
export const END_DIAGRAM = '```'

export const parser = (text: string) => {
  const lines = text.split('\n')
  const diagrams: string[] = []
  const temp: string[] = []
  let isDiagram = false

  lines.forEach((line, index) => {
    if (line === START_DIAGRAM) {
      isDiagram = true
      temp.length = 0
    } else if (line === END_DIAGRAM || index === lines.length - 1) {
      if (isDiagram) {
        isDiagram = false
        diagrams.push(temp.join('\n'))
      }
    } else if (isDiagram) {
      temp.push(line)
    }
  })

  return {
    diagrams
  }
}
