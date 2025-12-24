// import {Layout, Space, theme} from 'antd'
// import ThemeToggle from './components/ThemeToggle'
// import LangToggle from "./components/LangToggle.tsx";
// import {ToDoList} from "./components/NoteList/ToDoList.tsx";
// import {useEffect} from "react";
// import {subscribeNotes} from "./store/noteThunks.ts";
// import { useAppDispatch } from "./store/hooks";
//
// export type ThemeMode = 'light' | 'dark';
//
// type AppProps = {
//     themeMode: ThemeMode
//     setThemeMode: (mode: ThemeMode) => void
// }
//
// const { Header, Content } = Layout
//
// export default function App({ themeMode, setThemeMode}: AppProps) {
//     const { token } = theme.useToken();
//     const dispatch = useAppDispatch();
//
//
//     useEffect(() => {
//         dispatch(subscribeNotes());
//     }, []);
//
//     return (
//         <Layout style={{ minHeight: '100vh' }}>
//
//             <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: token.colorBgContainer }}>
//                 <div style={{ color: token.colorWarning, fontWeight: 700 }}>TO DO LIST</div>
//                 <Space>
//                     <ThemeToggle themeMode={themeMode} setThemeMode={setThemeMode} />
//                     <LangToggle />
//                 </Space>
//             </Header>
//
//             <Content style={{padding: token.paddingXL}}>
//                 <ToDoList />
//             </Content>
//         </Layout>
//     )
// }
// TODO этот файл после подключения роутера больше не нужен