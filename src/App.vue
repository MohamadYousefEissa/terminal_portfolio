<script setup lang="ts">
import BaseInput from './components/BaseInput.vue'
import TerminalDirectory from './components/TerminalDirectory.vue'
import ThemeDropdown from './components/ThemeDropdown.vue'
import { useAppStore } from './stores/app'
import { useApisStore } from './stores/apis'

const appStore = useAppStore()
const apisStore = useApisStore()

apisStore.getSkills()
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
    <div v-for="(item, i) in appStore.history" :key="i">
      <TerminalDirectory />
      {{ item.text }}
      <br />
      <div v-html="item.content"></div>
      <br />
    </div>
  </div>
  <BaseInput />
</template>
