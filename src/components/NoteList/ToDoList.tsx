import {useState} from 'react';
import {Space, Typography} from 'antd';
import { addNoteDB, removeNoteDB, updateNoteDB } from "../../api/notes.ts";
import {getCurrentWeather} from "../../services/weather.ts";
import type {Note, ToggleableNoteKeys} from "../../types/note.ts";
import {useI18n} from "../../hooks/useI18n.ts";
import {ToDoListSkeleton} from "./ToDoListSkeleton.tsx";
import {NoteOptionsSelector} from "./NoteOptionsSelector.tsx";
import {useSelector} from "react-redux";
import {
    selectAllNotes,
    selectNotesLoadingStatus,
} from "../../store/notesSlice.ts";
import {TagsPanel} from "./TagsPanel.tsx";
import {TodoListForm} from "./TodoListForm.tsx";
import {NotesCollapse} from "./NoteCollapse.tsx";
import {useAuth} from "../../auth/AuthProvider.tsx";
import {useMessage} from "../../ui/MessageContext.tsx";


const {Title} = Typography;


export function ToDoList() {
    const { t } = useI18n();
    const { user } = useAuth();
    const messageApi = useMessage();

    const notesR = useSelector(selectAllNotes);
    const loading = useSelector(selectNotesLoadingStatus);

    const [btnLoading, setBtnLoading] = useState(false);

    const [noteOptions, setNoteOptions] = useState({
        weather: false,
        longText: false,
        tags: false,
    });

    // TODO тут надо подумать над логикой. Это должен быть невозможный сценарий из-за приватного роута
    if (!user) {
        messageApi.error('!user');
        return;
    }


    const addNote = async (
        noteData: { text: string; headerText: string; tagsText: string }
    ) => {
        if (!noteData.text.trim()) return;
        if (noteOptions.longText && !noteData.headerText.trim()) return;
        if (noteOptions.tags && !noteData.tagsText.trim()) return;

        setBtnLoading(true);


        try {
            let weather = null;
            if (noteOptions.weather) {
                weather = await getCurrentWeather();
            }
            const tags = noteOptions.tags ? noteData.tagsText.split(' ').filter(tag => !!tag) : [];
            const header = noteOptions?.longText ? noteData.headerText : '';

            const newNote: Note = {
                id: crypto.randomUUID(),
                text: noteData.text,
                header,
                done: false,
                archive: false,
                date: Date.now(),
                weather: weather,
                tags,
            }

            await addNoteDB(user.uid, newNote);
        } catch (error) {
            messageApi.error(t.list.loadingErrorText);
            console.log(error);
        } finally {
            setBtnLoading(false);
        }

    };

    const toggleNote = async (noteId: string, property: ToggleableNoteKeys) => {
        const note = notesR.find((note) => note.id === noteId);

        if (!note) return;
        if (property === undefined) return;

        try {
            await updateNoteDB(user.uid, noteId, {
                [property]: !note[property]
            });
        } finally {
            // null
        }
    };

    const deleteNote = async (noteId: string) => {
        await removeNoteDB(user.uid, noteId);
    };

    const toggleOption = (key: keyof typeof noteOptions) => {
        setNoteOptions(prev => ({...prev, [key]: !prev[key]}));
    };

    return (
        <div style={{maxWidth: 700, margin: '20px auto'}}>
            <ToDoListSkeleton isActive={loading}>
                <>
                    <Space style={{width: '100%', marginBottom: 4, display: 'flex', justifyContent: 'space-between'}}>
                        <NoteOptionsSelector
                            options={noteOptions}
                            onToggle={toggleOption}
                        />
                    </Space>
                    <TodoListForm
                        btnLoading={btnLoading}
                        noteOptions={noteOptions}
                        onAddNote={addNote}
                    />
                    <TagsPanel />

                    {(notesR.length === 0 && loading === false) ? (
                        <Space style={{display: 'grid', justifyItems: 'center', marginTop: 12}}>
                            <Title level={2}>{t.list.emptyList.title}</Title>
                            <Title level={4}>{t.list.emptyList.text}</Title>
                        </Space>
                    ) : (
                        <NotesCollapse
                            toggleNote={toggleNote}
                            deleteNote={deleteNote}
                        />
                    )}



                </>

            </ToDoListSkeleton>

        </div>
    );
}
