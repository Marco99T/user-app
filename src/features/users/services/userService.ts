import api from "../../../shared/api/axiosConfig"
import type { CreateUserRequest, LoginUser, UserUpdate } from "../../auth/types/userTypes"


export const getUsers = async (): Promise<LoginUser[]> => {
    const response = await api.get<LoginUser[]>("/auth/users")
    return response.data
}

export const createUser = async (user: Omit<CreateUserRequest, "id">) => {
    const response = await api.post("/auth/users/user", user);
    return response.data;
}

export const deleteUser = async (id: number) => {
    await api.delete(`/auth/users/${id}`);
}

export const updateUser = async (id: number, user: Partial<UserUpdate>) => {
    const response = await api.put(`/auth/users/${id}`, user)
    return response.data
}