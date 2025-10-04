<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import TerminalDirectory from './TerminalDirectory.vue'

const appStore = useAppStore()
</script>

<template>
  <div class="flex">
    <TerminalDirectory />
    <input type="text" name="input" autofocus @keyup="appStore.onPress" v-model="appStore.input" />
  </div>
</template>

<style scoped>
input {
  width: 100%;
  outline: 0;
  border: 0;
  padding-left: 10px;
}
</style>
