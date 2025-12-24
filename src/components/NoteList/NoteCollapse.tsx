import {Collapse, Space} from "antd";
import {UserNote} from "../UserNote.tsx";
import {useSelector} from "react-redux";
import {useI18n} from "../../hooks/useI18n.ts";
import {selectNotesData} from "../../store/notesSlice.ts";
import type {ToggleableNoteKeys} from "../../types/note.ts";


interface NotesCollapseProps {
    toggleNote: (id: string, property: ToggleableNoteKeys) => void;
    deleteNote: (id: string) => void;
}

export function NotesCollapse({toggleNote, deleteNote}: NotesCollapseProps) {
    const {t} = useI18n();

    const {
        activeNotes,
        doneNotes,
        archivedNotes,
        counters: {active: activeCount, done: doneCount, archive: archiveCount}
    } = useSelector(selectNotesData);

    const panels = [
        {key: "wip", notes: activeNotes, label: t.list.collapse.wip, count: activeCount},
        {key: "done", notes: doneNotes, label: t.list.collapse.done, count: doneCount},
        {key: "archive", notes: archivedNotes, label: t.list.collapse.archive, count: archiveCount},
    ];

    const defaultActiveKey = ["wip", "done"];

    const items = panels
        .filter(({count}) => count > 0)
        .map(({key, notes, label, count}) => ({
            key,
            label: `${label} [${count}]`,
            children: (
                <Space style={{display: "grid", gap: 10}}>
                    {notes.map((note) => (
                        <UserNote
                            key={note.id}
                            {...note}
                            onToggle={toggleNote}
                            onDelete={deleteNote}
                        />
                    ))}
                </Space>
            ),
        }));

    return (
        <Collapse defaultActiveKey={defaultActiveKey} items={items} style={{marginTop: "2rem"}}/>
    );
}
