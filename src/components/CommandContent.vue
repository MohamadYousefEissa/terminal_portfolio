<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { BASE_URL, useDataStore } from '@/stores/data'
import type { Command, Project, Skill } from '@/types'
import ProjectContent from './ProjectContent.vue'
import SkillContent from './SkillContent.vue'

const appStore = useAppStore()
const dataStore = useDataStore()

const props = defineProps<{ command: Command }>()
const splitedCommand = props.command.text.split(' ')

const history = appStore.commands.filter((item) => item.text !== 'history')

let filteredSkills: Skill[] = []
let filteredProjects: Project[] = []

if (splitedCommand[0] === 'skills' && splitedCommand[1] && splitedCommand.length === 2) {
  filteredSkills = dataStore.skills.filter(
    (item) =>
      item.label.toLowerCase().includes(splitedCommand[1]!.toLowerCase()) ||
      splitedCommand[1]?.toLowerCase().includes(item.label.toLowerCase()),
  )
} else if (splitedCommand[0] === 'projects' && splitedCommand[1] && splitedCommand.length === 2) {
  filteredProjects = dataStore.projects.filter(
    (item) =>
      item.label.toLowerCase().includes(splitedCommand[1]!.toLowerCase()) ||
      splitedCommand[1]?.toLowerCase().includes(item.label.toLowerCase()),
  )
} else if (props.command.text === 'gui') {
  window.open(BASE_URL, '_blank', 'noopener,noreferrer')
} else if (props.command.text === 'cv') {
  window.open(dataStore.cvUrl, '_blank', 'noopener,noreferrer')
} else if (props.command.text === 'cv get') {
  window.open(dataStore.cvUrl + '?download=1', '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <div v-if="command.text === 'help'">
    <p v-for="(value, key) in appStore.helpCommands" :key="key">
      <span class="text-sec w-24 block sm:inline-block">{{ key }}</span> - {{ value }}
    </p>
  </div>

  <!-- ---- -->

  <div v-else-if="splitedCommand[0] === 'echo'">{{ command.text.slice(5) }}</div>

  <!-- ---- -->

  <div v-else-if="command.text === 'history'">
    <p v-for="item in history" :key="item.id">
      {{ item.text }}
    </p>
  </div>

  <!-- ---- -->

  <div v-else-if="command.text === 'skills'">
    <a :href="`${BASE_URL}/skills/`" class="text-sec" target="_blank">View in GUI</a>
    <br /><br />
    <p>Usage: skills &lt;skill-name&gt;</p>
    <br />
    <p v-for="item in dataStore.skills" :key="item._id">
      <SkillContent :skill="item" />
    </p>
  </div>

  <!-- ---- -->

  <div
    v-else-if="splitedCommand[0] === 'skills' && splitedCommand[1] && splitedCommand.length === 2"
  >
    <p v-if="filteredSkills.length === 0">skill not found</p>
    <p v-for="item in filteredSkills" :key="item._id">
      <SkillContent :skill="item" />
    </p>
  </div>

  <!-- ---- -->

  <div v-else-if="command.text === 'projects'">
    <a :href="`${BASE_URL}/projects/`" class="text-sec" target="_blank">View in GUI</a>
    <br /><br />
    <p>Usage: projects &lt;project-name&gt;</p>
    <br />
    <b>Web projects :</b>
    <ol class="list-decimal list-inside">
      <li v-for="item in dataStore.webProjects" :key="item._id" class="pb-5">
        <ProjectContent :project="item" />
      </li>
    </ol>
    <br />
    <b>Mobile projects :</b>
    <ol class="list-decimal list-inside">
      <li v-for="item in dataStore.mobileProjects" :key="item._id" class="pb-5">
        <ProjectContent :project="item" />
      </li>
    </ol>
  </div>

  <!-- ---- -->

  <div
    v-else-if="splitedCommand[0] === 'projects' && splitedCommand[1] && splitedCommand.length === 2"
  >
    <p v-if="filteredProjects.length === 0">project not found</p>
    <p v-for="item in filteredProjects" :key="item._id"><ProjectContent :project="item" /></p>
  </div>

  <!-- ---- -->

  <div v-else-if="command.text === 'cv'">
    <p>Use: 'cv get' to download cv</p>
  </div>

  <!-- ---- -->

  <div v-else-if="command.text === 'gui' || command.text === 'cv get'"></div>

  <!-- ---- -->

  <div v-else>command not found: {{ command.text }}</div>
</template>
