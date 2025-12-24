import Title from 'antd/es/typography/Title';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import {useMessage} from "../ui/MessageContext.tsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider.tsx";

interface SignupFormValues {
    email: string;
    password: string;
    passwordRepeat: string;
}

export default function SignupPage() {
    const messageApi = useMessage();
    const auth = getAuth();
    const { user } = useAuth();
    const navigate = useNavigate();

    async function handleSignup(values: SignupFormValues): Promise<void> {
        const { email, password, passwordRepeat } = values;

        if (password !== passwordRepeat) {
            messageApi.error('Пароли не совпадают');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            messageApi.success(`Аккаунт ${email} создан!`);
            navigate("/login");
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                messageApi.error(err.message);
            } else {
                messageApi.error('Unexpected error');
            }
        }
    }

    if (user && user.email) {
        return (
            <>
                <Title level={2}>Вы уже зарегистрированы</Title>
                <Title level={4}>Логин: ${user.email}</Title>
            </>
        )
    }

    return (
        <div style={{ maxWidth: 450, margin: '20px auto' }}>
            <Title level={2}>Регистрация</Title>

            <Form<SignupFormValues>
                name="register"
                initialValues={{ remember: true }}
                onFinish={handleSignup}
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

                <Form.Item
                    name="passwordRepeat"
                    rules={[{ required: true, message: 'Повторите пароль' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Repeat Password" />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Регистрация
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
