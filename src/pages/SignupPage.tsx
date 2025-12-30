import Title from 'antd/es/typography/Title';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import {useFeedback} from "../ui/feedback/FeedbackContext.tsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider.tsx";
import {useI18n} from "../hooks/useI18n.ts";

interface SignupFormValues {
    email: string;
    password: string;
    passwordRepeat: string;
}

export default function SignupPage() {
    const { toast } = useFeedback();
    const auth = getAuth();
    const { user } = useAuth();
    const { t } = useI18n();
    const navigate = useNavigate();

    async function handleSignup(values: SignupFormValues): Promise<void> {
        const { email, password, passwordRepeat } = values;

        if (password !== passwordRepeat) {
            toast.error(t.signupPage.differentPasswordsError);
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast.success(`${t.signupPage.createSuccessText.firstPart} ${email} ${t.signupPage.createSuccessText.secondPart}`);
            navigate("/login");
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                toast.error(err.message);
            } else {
                toast.error(t.signupPage.createErrorText);
            }
        }
    }

    if (user && user.email) {
        return (
            <>
                <Title level={2}>{t.signupPage.alreadyRegistered.title}</Title>
                <Title level={4}>${t.signupPage.alreadyRegistered.text} ${user.email}</Title>
            </>
        )
    }

    return (
        <div style={{ maxWidth: 450, margin: '20px auto' }}>
            <Title level={2}>{t.signupPage.title}</Title>

            <Form<SignupFormValues>
                name="register"
                initialValues={{ remember: true }}
                onFinish={handleSignup}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: t.signupPage.forms.emailMessage }]}
                >
                    <Input prefix={<UserOutlined />} placeholder={t.signupPage.forms.emailPlaceholder} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: t.signupPage.forms.passwordMessage }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder={t.signupPage.forms.passwordPlaceholder} />
                </Form.Item>

                <Form.Item
                    name="passwordRepeat"
                    rules={[{ required: true, message: t.signupPage.forms.repeatPasswordMessage }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder={t.signupPage.forms.repeatPasswordPlaceholder} />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        {t.signupPage.forms.buttonText}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
