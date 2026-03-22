import api from "../../../shared/api/axiosConfig"
import { type CreateUserRequest, type ResponseUser, type UpdateUserRequest } from "../types/userTypes"

export const getUsers = async (): Promise<ResponseUser[]> => {
    const response = await api.get<ResponseUser[]>("/users")
    return response.data
}

export const createUser = async (user: CreateUserRequest): Promise<ResponseUser> => {
    const response = await api.post<ResponseUser>("/users", user)
    return response.data
}

export const deleteUser = async (id: number): Promise<void> => {
    await api.delete<void>(`/users/${id}`)
}

export const updateUser = async (id: number, user: Partial<UpdateUserRequest>): Promise<ResponseUser> => {
    const response = await api.patch<ResponseUser>(`/users/${id}`, user)
    return response.data
}