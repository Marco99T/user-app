import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Dashboard from "../features/auth/pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import Users from "../features/users/pages/Users";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;