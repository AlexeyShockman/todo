import {Button, Input, Space} from "antd";
import {useEffect, useState} from "react";
import type {NoteOptions} from "../../types/note.ts";
import {useI18n} from "../../hooks/useI18n.ts";
import {selectActiveTags} from "../../store/notesSlice.ts";
import {useSelector} from "react-redux";

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

    return (
        <>
            <Space.Compact style={{width: '100%', marginBottom: 4}}>
                {noteOptions.longText && (
                    <Input
                        placeholder={t.list.edit.input.title}
                        value={headerText}
                        onChange={e => setHeaderText(e.target.value)}
                        onPressEnter={handlePressEnter}
                        disabled={btnLoading}
                    />
                )}
                <Input
                    placeholder={t.list.edit.input[noteOptions.longText ? 'text' : 'shortNote']}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onPressEnter={handlePressEnter}
                    disabled={btnLoading}
                />
                <Button
                    type="primary"
                    onClick={handleAdd}
                    disabled={isFormEmpty || btnLoading}
                    loading={btnLoading}
                >
                    {!btnLoading ? t.list.edit.buttons.add : t.list.edit.buttons.loading}
                </Button>
            </Space.Compact>
            {noteOptions.tags && (
                <Input
                    style={{marginBottom: 4}}
                    placeholder={t.list.edit.input.tags}
                    value={tagsText}
                    onChange={e => setTagsText(e.target.value)}
                    onPressEnter={handlePressEnter}
                    disabled={btnLoading}
                />
            )}
        </>
    )
}