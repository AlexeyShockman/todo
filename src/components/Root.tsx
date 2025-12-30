// import { useState } from 'react'
import { App, ConfigProvider } from "antd";
import { createThemeConfig } from '../theme'
// import type { ThemeMode } from '../theme'
// import { loadThemeFromStorage } from './../theme/theme-storage'
// import App from './../App'
import {Provider} from 'react-redux';
import {store} from '../store';
import {LangProvider} from "../i18n/LangContext.tsx";
import {AuthProvider} from "../auth/AuthProvider.tsx";
import {AppRouter} from "../router/AppRouter.tsx";
import {ThemeProvider, useThemeMode} from "../theme/ThemeContext.tsx";
import {FeedbackProvider} from "../ui/feedback/FeedbackContext.tsx";

export default function Root() {
    return (
        <Provider store={store}>
            <LangProvider>
                <ThemeProvider>
                    <ConfigWrapper />
                </ThemeProvider>
            </LangProvider>
        </Provider>
    );
}

function ConfigWrapper() {
    const { themeMode } = useThemeMode();

    return (
        <ConfigProvider theme={createThemeConfig(themeMode)}>
            <App>
                <FeedbackProvider>
                    <AuthProvider>
                        <AppRouter />
                    </AuthProvider>
                </FeedbackProvider>
            </App>
        </ConfigProvider>
    );
}