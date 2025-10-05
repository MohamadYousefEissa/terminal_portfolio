<script setup lang="ts">
import { BASE_URL } from '@/stores/data'
import type { Project } from '@/types'

defineProps<{ project: Project }>()
</script>

<template>
  {{ project.label }}
  <a v-if="project.url" :href="project.url" class="mr-3 text-third" target="_blank">View Demo</a>
  <a :href="`${BASE_URL}/projects/${project._id}`" class="text-sec" target="_blank">More</a>
  <p v-if="project.description">{{ project.description }}</p>
</template>
