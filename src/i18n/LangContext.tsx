import {createContext, type ReactNode, useContext, useEffect, useState} from 'react';

export type Language = 'en' | 'ru';

interface LangContextType {
    lang: Language;
    setLang: (l: Language) => void;
    toggleLang: () => void;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {

    const [lang, setLang] = useState<Language>(() => {
        try {
            const saved = localStorage.getItem('lang');
            return (saved === 'en' || saved === 'ru') ? saved : 'ru';
        } catch {
            return 'ru';
        }
    });

    useEffect(() => {
        try { localStorage.setItem('lang', lang); }
        catch {
            //null
        }
    }, [lang]);

    const toggleLang = () => {
        setLang(prev => (prev === 'en' ? 'ru' : 'en'));
    };

    return (
        <LangContext.Provider value={{ lang, setLang, toggleLang }}>
            {children}
        </LangContext.Provider>
    );
}


// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
    const ctx = useContext(LangContext);
    if (!ctx) throw new Error('useLang must be used within LangProvider');
    return ctx;
}