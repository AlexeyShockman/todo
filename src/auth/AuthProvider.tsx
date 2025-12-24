import {type ReactNode, createContext, useContext, useEffect, useState } from "react";
import {onAuthStateChanged, sendPasswordResetEmail, signOut, type User} from "firebase/auth";
import { auth } from "../firebase";
import {useMessage} from "../ui/MessageContext.tsx";
import {FirebaseError} from "firebase/app";
interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
}
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import {subscribeNotes, unsubscribeNotes} from "../store/noteThunks.ts";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const messageApi = useMessage();
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
            messageApi.success(
                "Ссылка для восстановления пароля отправлена на ваш email (если введенный email существует в системе)"
            );
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                messageApi.error(err.message);
            } else {
                messageApi.error("Ошибка при отправке письма");
            }
            throw err;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            messageApi.success("Вы вышли из аккаунта");
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                messageApi.error(err.message);
            } else {
                messageApi.error("Ошибка при выходе");
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
