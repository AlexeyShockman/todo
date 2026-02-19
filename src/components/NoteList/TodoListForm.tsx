import {Button, Input, Space} from 'antd';
import {useEffect, useState} from 'react';
import type {NoteOptions} from '../../types/note.ts';
import {useI18n} from '../../hooks/useI18n.ts';
import {selectActiveTags} from '../../store/notesSlice.ts';
import {useSelector} from 'react-redux';

interface TodoListFormProps {
    btnLoading: boolean;
    noteOptions: NoteOptions;
    onAddNote: (noteData: { text: string; headerText: string; tagsText: string }) => Promise<void>;
}


export function TodoListForm({btnLoading, noteOptions, onAddNote}: TodoListFormProps) {

    const { t } = useI18n();
    const activeTags = useSelector(selectActiveTags);

    const [text, setText] = useState('');
    const [headerText, setHeaderText] = useState('');
    const [tagsText, setTagsText] = useState('');
    
    useEffect(() => {
        setTagsText([...activeTags].join(' '));
    }, [activeTags])

    const handleAdd = async () => {
        await onAddNote({ text, headerText, tagsText });
        setText('');
        setHeaderText('');
    }

    const isFormEmpty = (
        !text.trim() ||
        (noteOptions.longText && !headerText.trim()) ||
        (noteOptions.tags && !tagsText.trim())
    );

    const handlePressEnter = () => { if (!isFormEmpty) handleAdd(); };

    const handleTextKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !isFormEmpty) {
            handleAdd();
        }
    };

    return (
        <>
            <Space
                direction='vertical'
                size={6}
                style={{
                    width: '100%',
                    marginBottom: 10,
                }}
            >
                {noteOptions.longText && (
                    <Input
                        size='large'
                        placeholder={t.list.edit.input.title}
                        value={headerText}
                        onChange={e => setHeaderText(e.target.value)}
                        onPressEnter={handlePressEnter}
                        disabled={btnLoading}
                    />
                )}

                <Input.TextArea
                    size='large'
                    placeholder={t.list.edit.input[noteOptions.longText ? 'text' : 'shortNote']}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    disabled={btnLoading}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    onKeyDown={handleTextKeyDown}
                />

                {noteOptions.tags && (
                    <Input
                        size='large'
                        placeholder={t.list.edit.input.tags}
                        value={tagsText}
                        onChange={e => setTagsText(e.target.value)}
                        onPressEnter={handlePressEnter}
                        disabled={btnLoading}
                    />
                )}

                {/* Контейнер для центрирования кнопки */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        type='primary'
                        onClick={handleAdd}
                        disabled={isFormEmpty || btnLoading}
                        loading={btnLoading}
                        style={{
                            width: '100%',
                            maxWidth: '50%',
                        }}
                    >
                        {!btnLoading
                            ? t.list.edit.buttons.add
                            : t.list.edit.buttons.loading}
                    </Button>
                </div>
            </Space>
        </>

    )
}