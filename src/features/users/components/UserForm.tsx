import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { createUser, updateUser } from "../services/userService"
import type { User } from "../types/userTypes"

interface Props {
    refreshUsers: () => void
    editingUser: User | null
    setEditingUser: (user: User | null) => void
}

const UserForm = ({ refreshUsers, editingUser, setEditingUser }: Props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("USER")
    const [enabled, setEnabled] = useState(true)

    useEffect(() => {
        if (editingUser) {
            setEmail(editingUser.email)
            setPassword("")
            setRole(editingUser.role)
            setEnabled(editingUser.enabled)
        }
    }, [editingUser])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (editingUser) {
                await updateUser(editingUser.id, {
                    email,
                    password: password || undefined,
                    role,
                    enabled
                })
                toast.success("Usuario actualizado")
                setEditingUser(null)
            } else {
                await createUser({
                    email,
                    password: password || undefined,
                    role
                })
                toast.success("Usuario creado");
            }

            // RESET
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
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="w-full mb-2 p-2 rounded text-black"
                type="password"
                placeholder={editingUser ? "Nueva contraseña (opcional)" : "Password"}
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
            <select
                className="w-full mb-2 p-2 rounded text-black"
                value={enabled ? 1 : 0}
                onChange={(e) => setEnabled(Number(e.target.value) === 1)}
            >
                <option value={1}>Enabled</option>
                <option value={0}>Disabled</option>
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