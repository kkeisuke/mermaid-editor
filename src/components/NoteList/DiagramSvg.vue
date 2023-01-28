<script lang="ts">
import { defineComponent, h, ref, watch } from 'vue'
import { render } from '@/plugin/Mermaid'

export default defineComponent({
  props: {
    diagram: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const svg = ref('')

    watch(
      () => props.diagram,
      async (newDiagram) => {
        try {
          svg.value = await render(newDiagram)
        } catch (error) {
          error instanceof Error && (svg.value = error.message)
        }
      },
      { immediate: true }
    )

    return () => h('div', { class: 'diagram-svg', innerHTML: svg.value })
  }
})
</script>

<style scoped>
.diagram-svg {
  overflow: hidden;
}
.diagram-svg :deep(svg) {
  height: 100%;
}
</style>
