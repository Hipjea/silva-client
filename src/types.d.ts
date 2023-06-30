export interface ScenariiState {
  scenarii: Array<IScenario>
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

export interface AuthContextType {
  user: User
}

export interface User {
  user: {
    email: string
    password: string
  }
}
