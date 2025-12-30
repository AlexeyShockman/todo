import type { NotificationInstance } from 'antd/es/notification/interface';
import type { NotificationArgsProps } from 'antd';

type ToastOptions = {
    title?: string;
    duration?: number;
};

export function createToast(notificationApi: NotificationInstance) {
    const open = (
        type: NotificationArgsProps['type'],
        description: string,
        options?: ToastOptions
    ) => {
        notificationApi.open({
            type,
            message: options?.title,
            description,
            placement: 'bottomRight',
            duration: options?.duration ?? 3,
        });
    };

    return {
        success: (description: string, options?: ToastOptions) =>
            open('success', description, options),

        error: (description: string, options?: ToastOptions) =>
            open('error', description, options),

        info: (description: string, options?: ToastOptions) =>
            open('info', description, options),

        warning: (description: string, options?: ToastOptions) =>
            open('warning', description, options),
    };
}
