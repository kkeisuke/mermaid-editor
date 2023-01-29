import { marked } from 'marked'
import DOMPurify from 'dompurify'

// https://github.com/cure53/DOMPurify/blob/master/demos/hooks-target-blank-demo.html
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if ('target' in node) {
    node.setAttribute('target', '_blank')
    node.setAttribute('rel', 'noopener noreferrer')
  }
  if (node.tagName.toLowerCase() === 'table') {
    node.className = 'table table-hover'
  }
  if (node.tagName.toLowerCase() === 'pre') {
    node.className = node.getElementsByTagName('code')[0].className.replace('language-', '')
    node.setAttribute('hidden', '')
  }
})

export const convertToHtml = (md: string) => {
  return DOMPurify.sanitize(marked(md))
}
