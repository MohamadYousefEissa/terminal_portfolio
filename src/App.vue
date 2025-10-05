<script setup lang="ts">
import { onBeforeMount } from 'vue'
import BaseInput from './components/BaseInput.vue'
import CommandContent from './components/CommandContent.vue'
import TerminalDirectory from './components/TerminalDirectory.vue'
import ThemeDropdown from './components/ThemeDropdown.vue'
import { useAppStore } from './stores/app'
import { useDataStore } from './stores/data'

const appStore = useAppStore()
const dataStore = useDataStore()

onBeforeMount(async () => {
  try {
    await Promise.all([dataStore.getCv(), dataStore.getSkills(), dataStore.getProjects()])
  } catch (err) {
    console.error(err)
    alert('Error when get the data please try again')
  }
})
</script>

<template>
  <ThemeDropdown />
  <div>
    <p>Welcome to my terminal portfolio. (Version 1.0.0)</p>
    <p>Made by <span class="text-third">Mohamad Yousef Eissa</span></p>
    <p>For a list of available commands, type `<span class="text-sec">help</span>`.</p>
  </div>
  <br />
  <div>
    <div v-for="item in appStore.commands" :key="item.id">
      <TerminalDirectory />
      {{ item.text }}
      <br />
      <CommandContent :command="item" />
      <br />
    </div>
  </div>
  <BaseInput />
</template>
