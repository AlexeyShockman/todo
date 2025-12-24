import { Switch } from 'antd'
import {useThemeMode} from '../theme/ThemeContext.tsx';

export default function ThemeToggle() {
    const { themeMode, setThemeMode } = useThemeMode();

    const onChange = (val: boolean) => {
        const mode = val ? 'dark' : 'light';
        setThemeMode(mode);
    }

    return (
        <Switch
            checked={themeMode === 'dark'}
            checkedChildren='Dark!'
            unCheckedChildren='Light!' 
            onChange={onChange}
        />
    );
}
