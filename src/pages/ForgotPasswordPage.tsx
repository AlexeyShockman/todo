import { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import {useAuth} from "../auth/AuthProvider.tsx";
import {useI18n} from "../hooks/useI18n.ts";
import {UserOutlined} from "@ant-design/icons";

const { Title } = Typography;

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();
    const { t } = useI18n();


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
            <Title level={2}>{t.forgotPasswordPage.title}</Title>

            <Form name="forgot-password" onFinish={onFinish} layout="vertical">
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: t.forgotPasswordPage.forms.emailMessage }]}
                >
                    <Input prefix={<UserOutlined />} placeholder={t.forgotPasswordPage.forms.emailMessage} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        {t.forgotPasswordPage.forms.buttonText}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
