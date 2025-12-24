import Title from "antd/es/typography/Title";
import {Link} from "react-router-dom";


export default function Page404() {

    return (
        <div style={{ maxWidth: 450, margin: '20px auto' }}>
            <Title level={1}>Ошибка 404</Title>
            <Title level={4}>Страница с таким адресом не найдена</Title>
            <Title level={3}><Link to="/">На главную</Link></Title>
        </div>
    );
}
