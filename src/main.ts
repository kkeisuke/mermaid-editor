import { createApp } from 'vue'
import App from './App.vue'

import '@/plugin/Bootstrap/Bootstrap'
import { init } from '@/plugin/Mermaid'

import { noteRepository } from '@/repository/NoteRepository'

// 初期化
init()
noteRepository.init()

createApp(App).mount('#app')
