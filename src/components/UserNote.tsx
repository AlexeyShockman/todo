import {Card, Checkbox, Typography, Space, Button, theme, Tooltip, Tag} from 'antd';
import {DatabaseOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import type {Note, ToggleableNoteKeys} from "../types/note";
import {decodeWeather} from "../services/weather";
import {useI18n} from "../hooks/useI18n";
import {useState} from "react";
import {useMessage} from "../ui/MessageContext.tsx";

const {Text} = Typography;

export interface UserNoteProps extends Note {
    onToggle: (id: string, property: ToggleableNoteKeys) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export function UserNote({
                             id,
                             header = null,
                             text,
                             done,
                             archive = false,
                             date,
                             weather,
                             tags,
                             onToggle,
                             onDelete
                         }: UserNoteProps) {

    const {token} = theme.useToken();
    const { t } = useI18n();
    const messageApi = useMessage();
    const [loading, setLoading] = useState<{
        toggle: boolean;
        delete: boolean;
        archive: boolean;
    }>({
        toggle: false,
        delete: false,
        archive: false,
    });

    const isBusy = Object.values(loading).some(Boolean);

    const dateLabel = new Intl.DateTimeFormat(t.code, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);

    const timeLabel = new Intl.DateTimeFormat(t.code, {
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);

    const runWithLoading = async <K extends keyof typeof loading>(
        key: K,
        action: () => Promise<void>
    ) => {
        if (loading[key]) return;

        try {
            setLoading(prev => ({ ...prev, [key]: true }));
            await action();
        } finally {
            setLoading(prev => ({ ...prev, [key]: false }));
        }
    };

    const handleToggle = () =>
        runWithLoading('toggle', () => onToggle(id, 'done'));

    const handleDelete = () =>
        runWithLoading('delete', () => onDelete(id));

    const handleArchive = () =>
        runWithLoading('archive', () => onToggle(id, 'archive'));


    return (
        <Card
            size="small"
            style={{
                borderColor: done ? token.colorSuccess : token.colorBorder,
            }}
        >
            <Space style={{width: '100%', justifyContent: 'space-between'}}>
                <Space>
                    <Tooltip title={archive ? t.note.tooltips.archiveNotEdited : ''}>
                        <Checkbox
                            className={done ? 'note-checkbox-done' : ''}
                            checked={done}
                            onChange={() => handleToggle()}
                            disabled={archive || isBusy}
                            indeterminate={loading.toggle}
                        />
                    </Tooltip>


                    <Space
                        style={{display: 'grid'}}
                    >
                        {header && (
                            <Text style={{
                                color: done ? token.colorSuccess : token.colorText,
                                fontWeight: token.fontWeightStrong,
                                fontSize: token.fontSizeXL
                            }}>
                                {header}
                            </Text>
                        )}
                        <Text
                            style={{
                                color: done ? token.colorSuccess : token.colorText,
                                fontSize: header ? token.fontSize : token.fontSizeXL,
                                whiteSpace: header ? 'pre-wrap' : 'normal'
                            }}
                            // editable={{
                            //     icon: <HighlightOutlined />,
                            //     tooltip: 'click to edit text',
                            //     onChange: ()=>(alert(1)),
                            //     enterIcon: null,
                            // }}
                        >
                            {text}
                        </Text>
                        {weather &&
                            <Tooltip title={decodeWeather(weather, t)}>
                                <Text>{weather}</Text>
                            </Tooltip>
                        }
                        {tags && (
                            <Space.Compact style={{ flexWrap: 'wrap', flexDirection: 'row-reverse'}}>
                                {tags.map((tag, i) => (
                                    <Tag key={i} color="blue" >{tag}</Tag>
                                ))}
                            </Space.Compact>
                        )}
                    </Space>


                </Space>

                <Space style={{display: 'grid', rowGap: 3, justifyItems: 'end', width: 'max-content'}}>
                    <Text type="secondary" style={{fontSize: token.fontSizeSM}}>
                        {timeLabel} {dateLabel}
                    </Text>

                    <Space style={{
                        textAlign: 'right',
                        alignSelf: 'flex-start'
                    }}>
                        <Tooltip title={archive ? t.note.tooltips.archiveNotEdited : t.note.tooltips.edit}>
                            <Button
                                aria-label="edit"
                                type="default"
                                icon={<EditOutlined/>}
                                onClick={() => messageApi.info('функция редактирования еще не реализована :)')}
                                disabled={archive || isBusy}
                            />
                        </Tooltip>

                        <Tooltip title={archive ? t.note.tooltips.unarchive : t.note.tooltips.archive}>
                            <Button
                                aria-label='archive'
                                type={archive ? 'primary' : 'default'}
                                icon={<DatabaseOutlined/>}
                                onClick={() => handleArchive()}
                                disabled={isBusy}
                                loading={loading.archive}
                             />
                        </Tooltip>

                        <Tooltip title={t.note.tooltips.delete}>
                            <Button
                                aria-label='delete'
                                type="dashed"
                                danger
                                icon={<DeleteOutlined/>}
                                onClick={() => handleDelete()}
                                disabled={isBusy}
                                loading={loading.delete}
                            />
                        </Tooltip>

                    </Space>
                </Space>

            </Space>
        </Card>
    );
}
