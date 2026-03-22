import { useEffect, useState } from "react"
import toast, { } from "react-hot-toast";
import Loader from "../../../shared/components/Loader"
import DashboardLayout from "../../../layout/DashboardLayout";
import UserForm from "../components/UserForm";
import { deleteUser, getUsers } from "../services/userService";
import type { ResponseUser, User } from "../types/userTypes";


const Users = () => {
    const [users, setUsers] = useState<ResponseUser[]>([])
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const usersPerPage = 5

    const fetchUsers = async () => {
        setLoading(true)
        const data = await getUsers()
        setUsers(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("¿Eliminar usuario?")
        if (!confirmDelete) return
        try {
            await deleteUser(id)
            toast.success("Usuario eliminado")
            fetchUsers()
        } catch {
            toast.error("Error al eliminar usuario")
        }
    }

    const filteredUsers = users.filter((user) =>
        user.email.toLowerCase().includes(search.toLowerCase())
    )

    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage

    const currentUsers = filteredUsers.slice(
        indexOfFirstUser,
        indexOfLastUser
    )

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

    return (
        <DashboardLayout>
            <div className="p-10 text-white max-w-6xl mx-auto space-y-8">
                <h1 className="text-3xl mb-6">Usuarios</h1>
                <UserForm refreshUsers={fetchUsers} editingUser={editingUser} setEditingUser={setEditingUser} />

                <div className="bg-slate-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Lista de usuarios</h2>
                    <div className="max-h-96 overflow-y-auto">
                        <div className="flex justify-between mb-4">
                            <input
                                type="text"
                                placeholder="Buscar usuario..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="p-2 rounded text-black w-64"
                            />
                        </div>
                        {loading ? (<Loader />) : (
                            <table className="w-full text-left">
                                <thead className="border-b border-slate-600 sticky top-0 bg-slate-800">
                                    <tr>
                                        <th className="p-2">ID</th>
                                        <th className="p-2">Email</th>
                                        <th className="p-2">Role</th>
                                        <th className="p-2">Enabled</th>
                                        <th className="p-2">CreatedAt</th>
                                        <th className="p-2">UpdatedAt</th>
                                        <th className="p-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers
                                        .filter((user) => user.role !== "ADMIN")
                                        .map((user) => (
                                            <tr key={user.id} className="border-b border-slate-700">
                                                <td className="p-2">{user.id}</td>
                                                <td className="p-2">{user.email}</td>
                                                <td className="p-2">
                                                    <span
                                                        className={`px-2 py-1 rounded text-xs ${user.role === "ADMIN"
                                                            ? "bg-purple-600"
                                                            : "bg-blue-600"
                                                            }`}
                                                    >
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="p-2">{user.enabled ? "TRUE" : "FALSE"}</td>
                                                <td className="p-2">{user.createdAt}</td>
                                                <td className="p-2">{user.updatedAt}</td>
                                                <td className="p-2">
                                                    <div className="flex gap-2">
                                                        <button onClick={() => setEditingUser(user)} className="bg-yellow-500 px-3 py-1 rounded">
                                                            Editar
                                                        </button>

                                                        <button onClick={() => handleDelete(user.id)} className="bg-red-500 px-3 py-1 rounded">
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        )}

                    </div>
                    <div className="flex justify-center mt-6 gap-2">
                        <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} className="px-3 py-1 bg-slate-700 rounded">
                            Prev
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-3 py-1 rounded ${currentPage === index + 1
                                    ? "bg-blue-600"
                                    : "bg-slate-700"
                                    }`}
                            >
                                {index + 1}
                            </button>

                        ))}
                        <button onClick={() => setCurrentPage((p) =>
                            Math.min(p + 1, totalPages)
                        )
                        }
                            className="px-3 py-1 bg-slate-700 rounded"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div >
        </DashboardLayout>
    )
}

export default Users