import { Switch } from 'antd'
import {useThemeMode} from '../theme/ThemeContext.tsx';
import {useI18n} from '../hooks/useI18n.ts';

export default function ThemeToggle() {
    const { themeMode, setThemeMode } = useThemeMode();
    const { t } = useI18n();

    const onChange = (val: boolean) => {
        const mode = val ? 'dark' : 'light';
        setThemeMode(mode);
    }

    return (
        <Switch
            checked={themeMode === 'dark'}
            checkedChildren={t.header.theme.dark}
            unCheckedChildren={t.header.theme.light}
            onChange={onChange}
        />
    );
}
