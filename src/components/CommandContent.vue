<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { BASE_URL, useDataStore } from '@/stores/data'
import type { Command, Project, Skill } from '@/types'
import ProjectContent from './ProjectContent.vue'
import SkillContent from './SkillContent.vue'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { onMounted } from 'vue'

const appStore = useAppStore()
const dataStore = useDataStore()

const props = defineProps<{ command: Command }>()
const splitedCommand = props.command.text.split(' ')

onMounted(() => {
  const split = SplitText.create(`#command-${props.command.id} div`)
  if (split.lines.length !== 0) {
    const interval = setInterval(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }, 300)
    gsap
      .from(split.lines, {
        display: 'none',
        width: 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        stagger: 0.3,
        duration: 2,
        ease: 'none',
      })
      .then(() => clearInterval(interval))
  }
})

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
  <div :id="`command-${command.id}`">
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
      <b v-if="dataStore.webProjects.length !== 0"
        ><br />
        Web projects :</b
      >
      <li
        v-for="(item, i) in dataStore.webProjects"
        :key="item._id"
        class="list-none"
        :class="{ 'pb-5': i !== dataStore.webProjects.length - 1 }"
      >
        {{ i + 1 }}. <ProjectContent :project="item" />
      </li>
      <br />
      <b v-if="dataStore.mobileProjects.length !== 0"><br />Mobile projects :</b>
      <li
        v-for="(item, i) in dataStore.mobileProjects"
        :key="item._id"
        class="list-none"
        :class="{ 'pb-5': i !== dataStore.mobileProjects.length - 1 }"
      >
        {{ i + 1 }}. <ProjectContent :project="item" />
      </li>
    </div>
    <!-- ---- -->
    <div
      v-else-if="
        splitedCommand[0] === 'projects' && splitedCommand[1] && splitedCommand.length === 2
      "
    >
      <p v-if="filteredProjects.length === 0">project not found</p>
      <p
        v-for="(item, i) in filteredProjects"
        :key="item._id"
        :class="{ 'pb-5': i !== filteredProjects.length - 1 }"
      >
        <ProjectContent :project="item" />
      </p>
    </div>
    <!-- ---- -->
    <div v-else-if="command.text === 'cv'">
      <p>Use: 'cv get' to download cv</p>
    </div>
    <!-- ---- -->
    <div v-else-if="command.text === 'gui' || command.text === 'cv get'"></div>
    <!-- ---- -->
    <div v-else>command not found: {{ command.text }}</div>
  </div>
</template>
