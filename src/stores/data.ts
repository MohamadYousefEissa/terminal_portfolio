import { ProjectType, type Project, type Skill } from '@/types'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const BASE_URL = 'https://mohamadyousefeissa.vercel.app'

export const useDataStore = defineStore('data', () => {
  const skills = ref<Skill[]>([])
  const projects = ref<Project[]>([])
  const mobileProjects = ref<Project[]>([])
  const webProjects = ref<Project[]>([])
  const cvUrl = ref('')

  const getSkills = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/skills`)
    skills.value = data.skills
  }

  const getProjects = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/projects`)
    projects.value = data.projects
    webProjects.value = projects.value.filter((item) => item.type === ProjectType.web)
    mobileProjects.value = projects.value.filter((item) => item.type === ProjectType.mobile)
  }

  const getCv = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/cv`)
    cvUrl.value = data.cv.url
  }

  return {
    getSkills,
    getProjects,
    getCv,
    skills,
    projects,
    webProjects,
    mobileProjects,
    cvUrl,
    BASE_URL,
  }
})
