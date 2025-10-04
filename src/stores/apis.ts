import axios from 'axios'
import { defineStore } from 'pinia'

const BASE_URL = 'https://mohamadyousefeissa.vercel.app'

export const useApisStore = defineStore('apis', () => {
  const getSkills = async () => {
    const skills = await axios.get(`${BASE_URL}/api/skills`)
    console.log(skills)
  }

  return { getSkills }
})
