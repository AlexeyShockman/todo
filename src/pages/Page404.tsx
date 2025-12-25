import Title from "antd/es/typography/Title";
import {Link} from "react-router-dom";
import {useI18n} from "../hooks/useI18n.ts";


export default function Page404() {
    const { t } = useI18n();

    return (
        <div style={{ maxWidth: 450, margin: '20px auto' }}>
            <Title level={1}>{t.page404.title}</Title>
            <Title level={4}>{t.page404.text}</Title>
            <Title level={3}><Link to="/">{t.page404.linkText}</Link></Title>
        </div>
    );
}
