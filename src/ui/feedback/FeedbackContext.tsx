import { type ReactNode, createContext, useContext } from 'react';
import { message, notification } from 'antd';
import { createToast } from './toast';

interface FeedbackContextValue {
    messageApi: ReturnType<typeof message.useMessage>[0];
    toast: ReturnType<typeof createToast>;
}

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

export function FeedbackProvider({ children }: { children: ReactNode }) {
    const [messageApi, messageHolder] = message.useMessage();
    const [notificationApi, notificationHolder] = notification.useNotification();

    const toast = createToast(notificationApi);

    return (
        <FeedbackContext.Provider value={{ messageApi, toast }}>
            {messageHolder}
            {notificationHolder}
            {children}
        </FeedbackContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFeedback() {
    const ctx = useContext(FeedbackContext);
    if (!ctx) throw new Error('useFeedback must be used within <FeedbackProvider>');
    return ctx;
}
