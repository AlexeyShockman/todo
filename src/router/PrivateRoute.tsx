import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import React from "react";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Загрузка...</div>;

    return user ? children : <Navigate to="/login" replace />;
}
