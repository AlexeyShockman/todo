import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import React from "react";
import {useI18n} from "../hooks/useI18n.ts";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const { t } = useI18n();

    if (loading) return <div>{t.authStatus.loadingText}</div>;

    return user ? children : <Navigate to="/login" replace />;
}
