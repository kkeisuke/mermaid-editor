import { describe, it, expect } from 'vitest'
import { END_DIAGRAM, parser, START_DIAGRAM } from './NoteParser'
import defaultDiagramTemplate from '@/assets/templates/defaultDiagram.md?raw'
import classDiagramTemplate from '@/assets/templates/classDiagram.md?raw'

describe('NoteParse.spec', () => {
  const defaultDiagram = defaultDiagramTemplate.replace(START_DIAGRAM, '').replace(END_DIAGRAM, '').trim()
  const classDiagram = classDiagramTemplate.replace(START_DIAGRAM, '').replace(END_DIAGRAM, '').trim()

  it('マークダウンの中から mermaid ブロックを抽出できる', () => {
    const markdown = `# タイトル\n${defaultDiagramTemplate}\nテキスト\n${classDiagramTemplate}\n`
    const { diagrams } = parser(markdown)
    expect(diagrams.length).toBe(2)
    expect(diagrams[0]).toBe(defaultDiagram)
    expect(diagrams[1]).toBe(classDiagram)
  })
  it('閉じられていない mermaid ブロックがあった場合、無視される', () => {
    const markdown = `# タイトル\n${START_DIAGRAM}\nテキスト\n${classDiagramTemplate}\n`
    const { diagrams } = parser(markdown)
    expect(diagrams.length).toBe(1)
    expect(diagrams[0]).toBe(classDiagram)
  })
  it('文末が mermaid ブロックの場合、``` は省略できる', () => {
    const markdown = `# タイトル\n${defaultDiagramTemplate}\nテキスト\n${START_DIAGRAM}\nclassDiagram\n`
    const { diagrams } = parser(markdown)
    expect(diagrams.length).toBe(2)
    expect(diagrams[0]).toBe(defaultDiagram)
    expect(diagrams[1]).toBe('classDiagram')
  })
  it('mermaid ブロックがない場合は空配列', () => {
    const { diagrams } = parser('テスト')
    expect(diagrams.length).toBe(0)
  })
})
