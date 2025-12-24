import Title from "antd/es/typography/Title";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {FirebaseError} from "firebase/app";
import {useMessage} from "../ui/MessageContext.tsx";
import {Link, useNavigate} from "react-router-dom";

interface LoginFormValues {
    email: string;
    password: string;
    remember?: boolean;
}

export default function LoginPage() {
    const messageApi = useMessage();
    const auth = getAuth();
    const navigate = useNavigate();

    async function handleLogin(values: LoginFormValues): Promise<void> {
        const { email, password } = values;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            messageApi.success('Успешный вход');
            navigate("/");
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                messageApi.error(err.message);
            } else {
                messageApi.error('Непредвиденная ошибка');
            }
        }
    }

    return (
        <div style={{ maxWidth: 450, margin: '20px auto' }}>
            <Title level={2}>Авторизация</Title>

            <Form<LoginFormValues>
                name="login"
                initialValues={{ remember: true }}
                onFinish={handleLogin}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Введите Email' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Вход
                    </Button>
                </Form.Item>
            </Form>
            <Link to="/forgot-password">Забыли пароль?</Link>
        </div>
    );
}
