import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { JSX } from "react";

interface Props {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {

    const { token, loanding } = useAuth();

    if(loanding) {
        return <div> loanding... </div>
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;