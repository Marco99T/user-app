import { Link, useNavigate } from "react-router-dom"
import { getUserFromToken, logout } from "../features/auth/services/authService"

const Sidebar = () => {
    const navigate = useNavigate()
    const user = getUserFromToken()
    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <div className="w-64 h-screen bg-slate-900 text-white p-6 flex flex-col">
            <div>
                <h2 className="text-2xl font-bold mb-6">
                    Admin Panel
                </h2>
                {user && (

                    <div className="mb-8 text-sm text-slate-300">
                        <p>{user.username}</p>
                        <p className="text-xs text-slate-400">
                            {user.role}
                        </p>
                    </div>
                )}
                <nav className="flex flex-col gap-3">
                    <Link to="/dashboard" className="hover:bg-slate-700 p-2 rounded">
                        Dashboard
                    </Link>

                    {user?.role === "ADMIN" && (
                        <Link to="/users" className="hover:bg-slate-700 p-2 rounded">
                            Usuarios
                        </Link>
                    )}
                </nav>
            </div>

            <button onClick={handleLogout} className="mt-auto bg-red-600 p-2 rounded" >
                Logout
            </button>
        </div>
    )
}

export default Sidebar