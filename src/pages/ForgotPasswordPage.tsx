import { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import {useAuth} from "../auth/AuthProvider.tsx";

const { Title } = Typography;

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();


    const onFinish = async (values: { email: string }) => {
        setLoading(true);
        try {
            await resetPassword(values.email);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "50px auto" }}>
            <Title level={2}>Восстановление пароля</Title>

            <Form name="forgot-password" onFinish={onFinish} layout="vertical">
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Введите ваш email" }]}
                >
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Отправить ссылку
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
