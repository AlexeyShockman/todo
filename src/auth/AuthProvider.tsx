import {type ReactNode, createContext, useContext, useEffect, useState } from "react";
import {onAuthStateChanged, sendPasswordResetEmail, signOut, type User} from "firebase/auth";
import { auth } from "../firebase";
import {useFeedback} from "../ui/feedback/FeedbackContext.tsx";
import {FirebaseError} from "firebase/app";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import {subscribeNotes, unsubscribeNotes} from "../store/noteThunks.ts";
import {useI18n} from "../hooks/useI18n.ts";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const { toast } = useFeedback();
    const { t } = useI18n();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        return onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (!user) {
            dispatch(unsubscribeNotes());
            return;
        }

        dispatch(subscribeNotes(user.uid));

        return () => {
            dispatch(unsubscribeNotes());
        };
    }, [user, dispatch]);



    const resetPassword = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success(t.authStatus.resetPassword.success);
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                toast.error(err.message);
            } else {
                toast.error(t.authStatus.resetPassword.error);
            }
            throw err;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            toast.success(t.authStatus.logOut.success);
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                toast.error(err.message);
            } else {
                toast.error(t.authStatus.logOut.error);
            }
            throw err;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be inside AuthProvider");
    return ctx;
}
