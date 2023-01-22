<script setup lang="ts">
import zoomOut from '@/assets/icons/bi-zoom-out.svg?url'
</script>

<template>
  <svg role="button" class="zoom-out-btn">
    <use :href="`${zoomOut}#icon`" />
  </svg>
</template>

<style scoped>
.zoom-out-btn {
  width: 1.2rem;
  height: 1.2rem;
}
</style>
