import { render } from '@/plugin/Mermaid'

export const getDownloadSVG = async (diagram: string) => {
  try {
    const svg = await render(diagram)
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    return URL.createObjectURL(blob)
  } catch (error) {
    return ''
  }
}
