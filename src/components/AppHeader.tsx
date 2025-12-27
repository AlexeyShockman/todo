import {Button, Space, theme} from "antd";
import {Header} from "antd/es/layout/layout";
import ThemeToggle from "./ThemeToggle.tsx";
import LangToggle from "./LangToggle.tsx";
import Title from "antd/es/typography/Title";
import {useAuth} from "../auth/AuthProvider.tsx";
import {Link, useNavigate } from "react-router-dom";
import {useI18n} from "../hooks/useI18n.ts";


export function AppHeader () {
    const { token } = theme.useToken();
    const {t} = useI18n();
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <Header
            style={{
                position: "fixed",
                zIndex: 999,
                borderBottom: `1px dotted ${token.colorWarning}`,
                width: "100%",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: token.colorBgContainer,
                height: '36px',
                padding: '0 12px',
                lineHeight: '36px'
            }}
        >
            <div style={{ color: token.colorWarning, fontWeight: 700, fontSize: '14px' }}>
                TO DO LIST
            </div>
            <Space size="middle" >
                <ThemeToggle />
                <LangToggle />
                {user && user.email ? (
                    <>
                        <Title level={5} style={{ margin: 0 }}>
                            {loading ? t.header.loadingStatusText : user?.email ?? t.header.unauthorizedUserName}
                        </Title>
                        <Button type='text' onClick={handleLogout}>
                            {t.header.buttons.exit}
                        </Button>
                    </>
                ) : (
                    <>
                        <Link to="/signup">{t.header.linkText.registration}</Link>
                        <Link to="/login">{t.header.linkText.login}</Link>
                    </>
                )}


            </Space>
        </Header>
    )
}
