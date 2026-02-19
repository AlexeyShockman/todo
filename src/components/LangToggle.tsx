import { Switch } from 'antd'
import {useI18n} from '../hooks/useI18n.ts';


export default function LangToggle() {
    const { lang, toggleLang } = useI18n();

    return (
        <Switch
            checked={lang === 'ru'}
            checkedChildren='RU'
            unCheckedChildren='EN'
            onChange={toggleLang}
        />
    );
}
