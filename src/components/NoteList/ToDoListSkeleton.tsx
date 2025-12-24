import {Skeleton, Spin} from "antd";
import Title from "antd/es/typography/Title";
import type {ReactNode} from "react";
import {useI18n} from "../../hooks/useI18n.ts";

interface ToDoListSkeletonProps {
    isActive?: boolean;
    children: ReactNode;
}

export function ToDoListSkeleton({ isActive = false, children }: ToDoListSkeletonProps) {
    const { t } = useI18n();


    if (isActive) {
        return (
            <>
                <Title
                    level={2}
                    style={{
                        display: "flex",
                        gap: 20,
                    }}
                >
                    <Spin size="large"/>
                    {t.list.firstLoadingText}
                </Title>
                <Skeleton active paragraph={{ rows: 2 }} />
                <Skeleton active paragraph={{ rows: 2 }} />
                <Skeleton active paragraph={{ rows: 5 }} />
                <Skeleton active paragraph={{ rows: 2 }} />
                <Skeleton active paragraph={{ rows: 3 }} />
            </>
        );
    }

    return <>{children}</>;
}