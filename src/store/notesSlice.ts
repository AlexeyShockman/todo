import {createSelector, createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type { Note } from '../types/note';
import type {RootState} from './index.ts';
import {subscribeNotes} from './noteThunks.ts';


interface NotesState {
    byId: Record<string, Note>;
    allIds: string[];
    activeTags: string[];
    loading: boolean;
    error: string | null;
}

const initialState: NotesState = {
    byId: {},
    allIds: [],
    activeTags: [],
    loading: true,
    error: null,
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<Note>) => {
            const n = action.payload;
            if (!state.byId[n.id]) {
                state.allIds.unshift(n.id);
            }
            state.byId[n.id] = n;
            // TODO думаю, что state.byId[n.id] = n; тоже внутри условия можно поместить.
        },
        updateNote: (state, action: PayloadAction<Note>) => {
            const n = action.payload;

            if (!state.byId[n.id]) {
                throw new Error(`updateNote: attempt  to update missing note id=${n.id}`);
            }

            state.byId[n.id] = { ...state.byId[n.id], ...n };
        },
        removeNote: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            delete state.byId[id];
            state.allIds = state.allIds.filter(i => i !== id);
        },
        setAllNotes: (state, action: PayloadAction<Note[]>) => {
            state.byId = Object.fromEntries(action.payload.map(n => [n.id, n]));
            state.allIds = action.payload.map(n => n.id);
        },
        toggleTag: (state, action: PayloadAction<string>) => {
            const tag = action.payload;
            if (state.activeTags.includes(tag)) {
                state.activeTags = state.activeTags.filter(t => t !== tag);
            } else {
                state.activeTags.push(tag);
            }
        },
        clearAllTags: (state) => {
            state.activeTags = [];
        },
        resetNotes: () => initialState,

    },
    extraReducers: (builder) => {
        builder
            .addCase(subscribeNotes.pending, (state) => { state.loading = true; state.error = null })
            .addCase(subscribeNotes.fulfilled, (state) => { state.loading = false })
            .addCase(subscribeNotes.rejected, (state, action) => { state.loading = false; state.error = action.error?.message ?? 'Error' });
    }
});


const selectNotesState = (state: RootState)  => state.notes;

export const selectNoteById = (state: RootState, id: string) => selectNotesState(state).byId[id];
export const selectAllNotes = createSelector(
    selectNotesState,
    notes => notes.allIds.map(id => notes.byId[id]),
);
export const selectNotesLoadingStatus = (state: RootState) => state.notes.loading;
export const selectActiveTags = (state: RootState) => state.notes.activeTags;



export const selectNotesData = createSelector(
    [selectNotesState, selectActiveTags],
    (notes, activeTags) => {
        const activeNotes: Note[] = [];
        const doneNotes: Note[] = [];
        const archivedNotes: Note[] = [];

        const allTagsSet = new Set<string>();

        const matchesTags = (note: Note) =>
            activeTags.length === 0 ||
            activeTags.every(tag => note.tags.includes(tag));

        for (const id of notes.allIds) {
            const n = notes.byId[id];

            for (const t of n.tags) {
                allTagsSet.add(t);
            }

            if (!matchesTags(n)) continue;

            if (n.archive) archivedNotes.push(n);
            else if (n.done) doneNotes.push(n);
            else activeNotes.push(n);
        }

        const allTags = Array.from(allTagsSet).sort();

        return {
            activeNotes,
            doneNotes,
            archivedNotes,
            allTags,
            counters: {
                active: activeNotes.length,
                done: doneNotes.length,
                archive: archivedNotes.length
            }
        };
    }
);
export const { addNote, updateNote, removeNote, setAllNotes, toggleTag, clearAllTags, resetNotes } = notesSlice.actions;
export default notesSlice.reducer;
