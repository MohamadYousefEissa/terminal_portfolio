export interface Command {
  id: string
  text: string
}

export interface Skill {
  _id?: string
  label: string
  icon: string
  range: number
  order?: number
}

export interface Project {
  _id?: string
  label: string
  thumbnail: string
  images: string[]
  features: Feature[]
  skills: Skill[]
  url: string
  description: string
  type: ProjectType
  order?: number
}

export interface Feature {
  _id: string
  title: string
  content: string
}

export enum ProjectType {
  web = 'Web',
  mobile = 'Mobile',
}
