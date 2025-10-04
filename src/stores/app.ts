import { ref } from 'vue'
import { defineStore } from 'pinia'

let id = 0

const commands = ['help', 'me']

interface History {
  id: string
  text: string
  content: string
}

export const useAppStore = defineStore('app', () => {
  const input = ref<string>('')
  const history = ref<History[]>([])
  let historyTrigger = 0

  const onPress = (ev: KeyboardEvent) => {
    switch (ev.key) {
      case 'Enter': {
        handleUserSubmit()
        break
      }
      case 'ArrowDown': {
        if (history.value.length === 0) return
        if (historyTrigger < history.value.length) {
          historyTrigger++
          if (input.value !== history.value[historyTrigger]?.text) {
            input.value = history.value[historyTrigger]?.text ?? ''
          }
        }
        if (historyTrigger == history.value.length) {
          input.value = ''
        }
        break
      }
      case 'ArrowUp': {
        if (history.value.length === 0) return
        if (historyTrigger >= 0) {
          historyTrigger--
          if (input.value !== history.value[historyTrigger]?.text) {
            input.value = history.value[historyTrigger]?.text ?? ''
          }
        }
        if (historyTrigger == -1) {
          input.value = ''
        }
        break
      }
    }
  }

  const handleUserSubmit = () => {
    if (input.value.trim().length == 0) return
    if (input.value === 'clear') {
      history.value = []
    } else {
      const h: History = {
        id: id.toString(),
        text: input.value,
        content:
          commands.indexOf(input.value) === -1
            ? `command not found: ${input.value}`
            : getCommandContent(input.value),
      }
      history.value.push(h)
      historyTrigger = history.value.length
      id++
    }
    input.value = ''
  }

  const getCommandContent = (text: string): string => {
    return `maaan ${text}`
  }

  return { history, input, onPress }
})
