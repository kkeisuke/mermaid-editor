<script setup lang="ts">
import { useAddNote } from '@/usecase/UseAddNote'

const { addNewNote } = useAddNote()
</script>

<template>
  <ul class="navbar-nav">
    <li class="nav-item dropdown">
      <span class="btn btn-secondary btn-sm dropdown-toggle" role="button" data-bs-toggle="dropdown">New Diagram</span>
      <ul class="dropdown-menu dropdown-menu-dark position-absolute">
        <li><span class="dropdown-item" role="button" @click="addNewNote('flowchartTemplate')">flowchart</span></li>
        <li><span class="dropdown-item" role="button" @click="addNewNote('sequenceDiagramTemplate')">sequenceDiagram</span></li>
        <li><span class="dropdown-item" role="button" @click="addNewNote('classDiagramTemplate')">classDiagram</span></li>
        <li><span class="dropdown-item" role="button" @click="addNewNote('stateDiagramTemplate')">stateDiagram</span></li>
        <li><span class="dropdown-item" role="button" @click="addNewNote('erDiagramTemplate')">erDiagram</span></li>
      </ul>
    </li>
  </ul>
</template>

<style scoped></style>
