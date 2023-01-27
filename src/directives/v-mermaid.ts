import type { Directive } from 'vue'
import mermaid from 'mermaid'

interface VMermaidElement extends HTMLElement {
  __timer__: number
}

const MERMAID_CLASS_NAME = 'mermaid'
const MERMAID_SVG_CLASS_NAME = 'mermaid-svg'

export const vMermaid: Directive<VMermaidElement> = {
  updated(el) {
    if (el.__timer__) {
      clearInterval(el.__timer__)
    }
    // updated を間引く
    el.__timer__ = window.setTimeout(() => {
      const targets = el.querySelectorAll<HTMLElement>(`.${MERMAID_CLASS_NAME}`)
      let result = ''
      targets.forEach(async (target) => {
        try {
          result = await mermaid.mermaidAPI.renderAsync(`svg-${crypto.randomUUID()}`, target.textContent || '')
        } catch (error) {
          error instanceof Error && (result = error.message)
        } finally {
          // mermaid コードの下に配置する
          target.nextElementSibling?.className === MERMAID_SVG_CLASS_NAME && target.nextElementSibling.remove()
          target.insertAdjacentHTML('afterend', `<div class="${MERMAID_SVG_CLASS_NAME}">${result}</div>`)
        }
      })
    }, 500)
  }
}
