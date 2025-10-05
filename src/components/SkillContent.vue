<script setup lang="ts">
import type { Skill } from '@/types'

defineProps<{ skill: Skill }>()
</script>

<template>
  {{ skill.label }} - <span class="text-sec">{{ skill.range }}/10</span>
</template>
