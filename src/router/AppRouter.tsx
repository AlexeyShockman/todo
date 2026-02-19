import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import AppLayout from './AppLayout.tsx';

import {ToDoList} from '../components/NoteList/ToDoList.tsx';

import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import Page404 from '../pages/Page404.tsx';
import ForgotPasswordPage from '../pages/ForgotPasswordPage.tsx';

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<AppLayout />}>

                    {/* публичные */}
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signup' element={<SignupPage />} />
                    <Route path='/forgot-password' element={<ForgotPasswordPage />} />
                    {/* приватные */}
                    <Route
                        path='/'
                        element={
                            <PrivateRoute>
                                <ToDoList />
                            </PrivateRoute>
                        }
                    />
                    <Route path='*' element={<Page404 />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}
