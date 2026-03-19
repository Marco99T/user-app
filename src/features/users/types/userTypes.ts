export interface LoginUser {
  id: number
  username: string
  email: string
  role: string
}

export interface CreateUserRequest {
  username: string
  email: string
  password: string
  role: string
}

export interface UserUpdate {
  username: string
  email: string
  password: string
}