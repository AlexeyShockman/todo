import { dictionary } from './../i18n/dictionary.ts';
import { useLang } from '../i18n/LangContext.tsx';


export const useI18n = () => {
    const { lang, setLang, toggleLang } = useLang();
    const t = dictionary[lang];
    return { t, lang, setLang, toggleLang };
};
