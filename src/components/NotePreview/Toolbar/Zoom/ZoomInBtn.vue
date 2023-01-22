<script setup lang="ts">
import zoomIn from '@/assets/icons/bi-zoom-in.svg?url'
</script>

<template>
  <svg role="button" class="zoom-in-btn">
    <use :href="`${zoomIn}#icon`" />
  </svg>
</template>

<style scoped>
.zoom-in-btn {
  width: 1.2rem;
  height: 1.2rem;
}
</style>
