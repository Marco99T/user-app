import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "../features/auth/pages/Login"
import Users from "../features/users/pages/Users"
import Dashboard from "../features/auth/pages/Dashboard"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router