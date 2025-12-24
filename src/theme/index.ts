import baseTokens from './tokens/baseTokens'
import lightTokens from './tokens/lightTokens'
import darkTokens from './tokens/darkTokens'
import { theme as antdTheme } from 'antd'

export type ThemeMode = 'light' | 'dark'

/**
 * Создаёт объект темы для ConfigProvider.
 * Возвращает токены в формате, который antD ожидает.
 */
export function createThemeConfig(mode: ThemeMode) {
    const base = { ...baseTokens }

    const specific = mode === 'dark' ? darkTokens : lightTokens
    const merged = { ...base, ...specific }

    return {
        token: merged,
        algorithm: mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    }
}
