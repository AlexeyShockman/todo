import {createContext, useContext, useState, useEffect, type ReactNode} from 'react';
import type { ThemeMode } from "./index";

const THEME_KEY = 'app_theme_v1';


function loadThemeFromStorage(): ThemeMode | null {
    try {
        const v = localStorage.getItem(THEME_KEY);
        return v === 'dark' ? 'dark' : v === 'light' ? 'light' : null;
    } catch {
        return null;
    }
}

function saveThemeToStorage(mode: ThemeMode) {
    try {
        localStorage.setItem(THEME_KEY, mode);
    } catch {
        // null
    }
}


type ThemeContextValue = {
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);


export function ThemeProvider({ children }: { children: ReactNode }) {
    const stored = loadThemeFromStorage();
    const [themeMode, setThemeMode] = useState<ThemeMode>(stored ?? 'light');

    useEffect(() => {
        saveThemeToStorage(themeMode);
    }, [themeMode]);

    return (
        <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useThemeMode() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useThemeMode must be used within ThemeProvider');
    return ctx;
}
