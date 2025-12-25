import Title from "antd/es/typography/Title";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {FirebaseError} from "firebase/app";
import {useMessage} from "../ui/MessageContext.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useI18n} from "../hooks/useI18n.ts";

interface LoginFormValues {
    email: string;
    password: string;
    remember?: boolean;
}

export default function LoginPage() {
    const messageApi = useMessage();
    const auth = getAuth();
    const navigate = useNavigate();
    const {t} = useI18n();

    async function handleLogin(values: LoginFormValues): Promise<void> {
        const { email, password } = values;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            messageApi.success(t.loginPage.loginSuccessText);
            navigate("/");
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                messageApi.error(err.message);
            } else {
                messageApi.error(t.loginPage.loginErrorText);
            }
        }
    }

    return (
        <div style={{ maxWidth: 450, margin: '20px auto' }}>
            <Title level={2}>{t.loginPage.title}</Title>

            <Form<LoginFormValues>
                name="login"
                initialValues={{ remember: true }}
                onFinish={handleLogin}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: t.loginPage.emailMessage }]}
                >
                    <Input prefix={<UserOutlined />} placeholder={t.loginPage.emailPlaceholder} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: t.loginPage.passwordMessage }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder={t.loginPage.passwordPlaceholder} />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        {t.loginPage.buttonText}
                    </Button>
                </Form.Item>
            </Form>
            <Link to="/forgot-password">{t.loginPage.forgotPasswordText}</Link>
        </div>
    );
}
