import {useI18n} from '../../hooks/useI18n.ts';
import {Button, Space} from 'antd';
import Title from 'antd/es/typography/Title';
import {ClearOutlined} from '@ant-design/icons';
import {clearAllTags} from '../../store/notesSlice.ts';
import {useAppDispatch} from '../../store/hooks.ts';

export function EmptyTagFilterScreen() {
    const {t} = useI18n();
    const dispatch = useAppDispatch();

    return (
        <Space direction='vertical' align='center' style={{ width: '100%' }}>
            <Title level={3} style={{ margin: 0, textAlign: 'center' }}>
                {t.list.emptyListByTags.title}
            </Title>
            <Button
                aria-label='clearTags'
                icon={<ClearOutlined/>}
                onClick={() => dispatch(clearAllTags())}
                type='default'
            >
                {t.list.emptyListByTags.buttonText}
            </Button>
        </Space>

    );
}