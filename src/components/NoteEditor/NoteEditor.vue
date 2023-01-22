<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { createEditor, KeyCode, KeyMod } from '@/plugin/MonacoEditor'
import { injectUseNoteSingle } from '@/store/UseNoteSingle'
import defaultDiagramTemplate from '@/assets/templates/defaultDiagram.md?raw'

const { current, getText, readCache, update, setCurrentHtml, renderHtml } = injectUseNoteSingle()
const CLASS_NAME = 'note-editor'

onMounted(async () => {
  // 初回読み込み
  await readCache()

  const editorElm = document.querySelector<HTMLElement>(`.${CLASS_NAME}`)

  if (!editorElm) {
    return
  }

  const editor = createEditor(editorElm, {
    value: getText() || defaultDiagramTemplate
  })
  editor.onDidChangeModelContent(async (event) => {
    !event.isFlush && (await update(editor.getValue()))
  })
  editor.addCommand(KeyMod.CtrlCmd | KeyCode.Enter, async () => {
    await renderHtml(editor.getValue())
  })
  editor.addCommand(KeyMod.WinCtrl | KeyCode.Enter, async () => {
    await renderHtml(editor.getValue())
  })

  watch(
    () => current.value.id,
    (id) => {
      if (id) {
        editor.setValue(getText())
      } else {
        editor.setValue('')
      }
    }
  )

  // 初回描画
  if (current.value.id) {
    await setCurrentHtml()
  } else {
    await setCurrentHtml(defaultDiagramTemplate)
  }
})
</script>

<template>
  <div :class="[CLASS_NAME]" class="overflow-hidden" />
</template>
