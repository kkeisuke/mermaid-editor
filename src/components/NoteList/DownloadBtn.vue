<script setup lang="ts">
import { ref, watch } from 'vue'
import downloadIcon from '@/assets/icons/bi-download.svg?url'
import { getDownloadSVG } from '@/lib/DownloadSVG'

const props = defineProps<{
  diagram: string
}>()

const href = ref('')

watch(
  () => props.diagram,
  async (newDiagram) => {
    href.value = await getDownloadSVG(newDiagram)
  },
  { immediate: true }
)
</script>

<template>
  <a v-if="href" :href="href" download="diagram.svg" class="download-btn" title="download">
    <svg role="button">
      <use :href="`${downloadIcon}#icon`" />
    </svg>
  </a>
</template>

<style scoped>
.download-btn {
  color: var(--bs-body-color);
}
.download-btn svg {
  width: 1.2rem;
  height: 1.2rem;
}
</style>
