<script setup lang="ts">
import chevronLeft from '@/assets/icons/bi-chevron-left.svg?url'
import chevronRight from '@/assets/icons/bi-chevron-right.svg?url'
import { injectUseLayout } from '@/store/UseLayout'

const { isShowMenu, showMenu, hideMenu } = injectUseLayout()

const onClick = () => {
  isShowMenu.value ? hideMenu() : showMenu()
}
</script>

<template>
  <svg role="button" class="side-menu-btn text-white-50" @click="onClick">
    <use :href="`${isShowMenu ? chevronLeft : chevronRight}#icon`" />
  </svg>
</template>

<style scoped>
.side-menu-btn {
  width: 1.4rem;
  height: 1.4rem;
}
</style>
