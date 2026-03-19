import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/authService";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await loginRequest({
                username,
                password,
            });

            login(response.token);
            navigate("/dashboard");

            alert("Login exitoso");
        } catch (error) {
            console.error(error);
            alert("Error en login");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900">
            <form
                onSubmit={handleSubmit}
                className="bg-slate-800 p-8 rounded-xl w-96"
            >
                <h2 className="text-white text-2xl mb-6">Login</h2>

                <input
                    type="text"
                    placeholder="Username o Email"
                    className="w-full p-2 mb-4 rounded"
                    value={username}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-4 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="bg-blue-500 w-full p-2 rounded text-white"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;