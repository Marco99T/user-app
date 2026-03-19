import { createContext, useEffect, useState, type ReactNode } from "react";
import { setAuthToken } from "../shared/api/axiosConfig";

interface AuthContextType {
    token: string | null;
    loanding: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [token, setToken] = useState<string | null>(null);
    const [loanding, setLoanding] = useState<boolean>(true);

    // cargar token al iniciar la app
    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            setToken(storedToken);
            setAuthToken(storedToken);
        }

        setLoanding(false);

    }, []);

    const login = (jwt: string) => {
        setToken(jwt);
        localStorage.setItem("token", jwt);
        setAuthToken(jwt);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, loanding, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};