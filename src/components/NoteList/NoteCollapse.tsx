import {Collapse, Space} from "antd";
import {UserNote} from "../UserNote.tsx";
import {useSelector} from "react-redux";
import {useI18n} from "../../hooks/useI18n.ts";
import {selectNotesData} from "../../store/notesSlice.ts";
import type {ToggleableNoteKeys} from "../../types/note.ts";
import {EmptyTagFilterScreen} from "./EmptyTagFilterScreen.tsx";


interface NotesCollapseProps {
    toggleNote: (id: string, property: ToggleableNoteKeys) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
    editNote: (id: string) => void;
}

export function NotesCollapse({toggleNote, deleteNote, editNote}: NotesCollapseProps) {
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

    if (!(activeCount || doneCount || archiveCount)) {
        return (
            <EmptyTagFilterScreen />
        )
    }

    const defaultActiveKey = ["wip"];

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
                            onEdit={editNote}
                        />
                    ))}
                </Space>
            ),
        }));

    return (
        <Collapse defaultActiveKey={defaultActiveKey} items={items}/>
    );
}
