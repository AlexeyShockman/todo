import { Layout, theme } from 'antd';

import { Outlet } from 'react-router-dom';
import {useAppDispatch} from '../store/hooks.ts';
import {useEffect} from 'react';
import {subscribeNotes} from '../store/noteThunks.ts';
import {AppHeader} from '../components/AppHeader.tsx';
import {useAuth} from '../auth/AuthProvider.tsx';

const { Content } = Layout;

export default function AppLayout() {
    const dispatch = useAppDispatch();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;
        dispatch(subscribeNotes(user.uid));
    }, [user, dispatch]);

    const { token } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppHeader />
            <Content style={{ padding: token.paddingXL, paddingTop: '36px' }}>
                <Outlet />
            </Content>
        </Layout>
    );
}
