import api from "../../../shared/api/axiosConfig";

interface LoginRequest {
    username: string;
    password: string;
}

interface AuthResponse {
    token: string;
    refreshToken: string;
}

export const getToken = () => {
    return localStorage.getItem("token")
}

export const logout = () => {
    localStorage.removeItem("token")
}

export const getUserFromToken = () => {
    const token = getToken()
    if (!token) return null
    try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        return {
            username: payload.sub,
            role: payload.role
        }
    } catch {
        return null
    }
}

export const loginRequest = async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
};