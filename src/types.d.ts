import { type } from "os"

export interface AuthContextType {
  user: User
}

export interface UserProps {
  email: string
  password: string
  firstname: string
  lastname: string
  menu: {}
}

export interface Scenarii {
  id: number
  type: string
  attributes: Scenario
}

export interface Scenario {
  id: number
  author: string
  name: string
  level: number
  subject: string
  description: string
  created_at: string
  updated_at: string
}

export interface IScenario {
  id: number
  attributes: {
    author: string
    name: string
    level: number
    subject: string
    description: string
    created_at: string
    updated_at: string
  }
}

export interface Cards {
  id: number
  type: string
  attributes: Card
}

export interface Card {
  id: number
  attributes: {
    name: string
    description: string
    note: string
    typeable_type: string
    typeable_id: number
    created_at: string
    updated_at: string
  }
}
