import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type Command } from '@/types'

let id = 0

export const useAppStore = defineStore('app', () => {
  const helpCommands = {
    projects: "view projects that I've coded",
    skills: 'view my skills and technologies',
    cv: 'download my cv',
    gui: 'go to my portfolio in GUI',
    help: 'check available commands',
    echo: 'print out anything',
    history: 'view command history',
    clear: 'clear the terminal',
  }

  const input = ref<string>('')
  // let inputElement: HTMLInputElement
  const commands = ref<Command[]>([])
  let historyTrigger = 0

  const onPress = (ev: KeyboardEvent) => {
    switch (ev.key) {
      case 'Enter': {
        handleUserSubmit()
        break
      }
      case 'ArrowDown': {
        if (commands.value.length === 0) return
        if (historyTrigger < commands.value.length) {
          historyTrigger++
          if (input.value !== commands.value[historyTrigger]?.text) {
            input.value = commands.value[historyTrigger]?.text ?? ''
          }
        }
        if (historyTrigger === commands.value.length) {
          input.value = ''
        }
        break
      }
      case 'ArrowUp': {
        if (commands.value.length === 0) return
        if (historyTrigger >= 0) {
          historyTrigger--
          if (input.value !== commands.value[historyTrigger]?.text) {
            input.value = commands.value[historyTrigger]?.text ?? ''
          }
        }
        if (historyTrigger === -1) {
          input.value = ''
        }
        break
      }
    }
  }

  const handleUserSubmit = () => {
    // if (!inputElement) inputElement = document.getElementById('input') as HTMLInputElement
    if (input.value.trim().length === 0) return
    if (input.value === 'clear') {
      commands.value = []
    } else {
      const h: Command = {
        id: id.toString(),
        text: input.value,
      }
      commands.value.push(h)
      historyTrigger = commands.value.length
      id++
      setTimeout(() => window.scrollTo({ top: document.body.scrollHeight }))
    }
    input.value = ''
  }

  return { input, onPress, commands, helpCommands }
})
