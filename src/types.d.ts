export interface AuthContextType {
  user: User
}

export interface User {
  user: {
    email: string
    password: string
  }
}
