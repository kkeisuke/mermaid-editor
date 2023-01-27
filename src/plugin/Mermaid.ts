import mermaid from 'mermaid'

export const init = () => {
  mermaid.mermaidAPI.initialize({ startOnLoad: false })
}

export const render = (diagram: string, delay = 20): Promise<string> => {
  // パフォーマンス対策
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      mermaid.mermaidAPI
        .renderAsync(`mermaid-${crypto.randomUUID()}`, diagram)
        .then((svg) => resolve(svg))
        .catch((error) => reject(error))
    }, delay)
  })
}
