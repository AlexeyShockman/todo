import { type ReactNode, createContext, useContext } from 'react';
import { message } from 'antd';

interface MessageContextValue {
    messageApi: ReturnType<typeof message.useMessage>[0];
}

const MessageContext = createContext<MessageContextValue | null>(null);

export function MessageProvider({ children }: { children: ReactNode }) {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <MessageContext.Provider value={{ messageApi }}>
            {contextHolder}
            {children}
        </MessageContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMessage() {
    const ctx = useContext(MessageContext);
    if (!ctx) throw new Error('useMessage must be used within <MessageProvider>');
    return ctx.messageApi;
}
