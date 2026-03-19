import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { updateUser, createUser } from "../../auth/services/userService"
import type { LoginUser } from "../../auth/types/userTypes"

interface Props {
    refreshUsers: () => void
    editingUser: LoginUser | null
    setEditingUser: (user: LoginUser | null) => void
}

const UserForm = ({ refreshUsers, editingUser, setEditingUser }: Props) => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("USER")

    useEffect(() => {
        if (editingUser) {
            setUsername(editingUser.username)
            setEmail(editingUser.email)
            setRole(editingUser.role)
        }

    }, [editingUser])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (editingUser) {
                await updateUser(editingUser.id, {
                    username,
                    email,
                    password
                })
                toast.success("Usuario actualizado")
                setEditingUser(null)
            } else {
                await createUser({
                    username,
                    email,
                    password,
                    role
                })
                toast.success("Usuario creado");
            }

            setUsername("")
            setEmail("")
            setPassword("")
            setRole("USER")

            refreshUsers()
        } catch (error) {
            toast.error("Error al guardar usuario");
        }
    }


    return (

        <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Crear usuario</h2>
            <input
                className="w-full mb-2 p-2 rounded text-black"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="w-full mb-2 p-2 rounded text-black"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="w-full mb-2 p-2 rounded text-black"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <select
                className="w-full mb-2 p-2 rounded text-black"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
            </select>
            <div className="flex gap-2">

                <button type="submit" className="bg-blue-500 px-4 py-2 rounded"> {editingUser ? "Actualizar" : "Crear"}</button>
                {editingUser && (<button type="button" onClick={
                    () => setEditingUser(null)} className="bg-gray-500 px-4 py-2 rounded" > Cancelar</button>)
                }
            </div>
        </form>
    )
}

export default UserForm