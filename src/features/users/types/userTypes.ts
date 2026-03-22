export interface User {
  id: number
  email: string
  role: string
  enabled: boolean
}

export interface CreateUserRequest {
  email: string
  password?: string
  role: string
}

export interface UpdateUserRequest {
  email?: string
  password?: string
  role?: string
  enabled?: boolean
}

export interface ResponseUser {
  id: number
  email: string
  role: string
  enabled: boolean
  createdAt: string
  updatedAt: string
}