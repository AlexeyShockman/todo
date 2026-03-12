import {createSelector, createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {Note} from '../types/note';
import type {RootState} from './index.ts';
import {subscribeNotes} from './noteThunks.ts';


interface NotesState {
    byId: Record<string, Note>;
    allIds: string[];
    activeTags: string[];
    activeSubTags: string[];
    loading: boolean;
    error: string | null;
}

const initialState: NotesState = {
    byId: {},
    allIds: [],
    activeTags: [],
    activeSubTags: [],
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
        toggleSubTag: (state, action: PayloadAction<string>) => {
            const subTag = action.payload;
            if (state.activeSubTags.includes(subTag)) {
                state.activeSubTags = state.activeSubTags.filter(st => st !== subTag);
            } else {
                state.activeSubTags.push(subTag);
            }
        },
        clearAllTags: (state) => {
            state.activeTags = [];
        },
        clearAllSubTags: (state) => {
            state.activeSubTags = [];
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
export const selectActiveSubTags = (state: RootState) => state.notes.activeSubTags;

// выделяем и теги и саб теги (просто берем все вместе)
export const selectAllTags = createSelector (
    selectNotesState,
    (notes) => {
        const allTagsSet = new Set<string>();

        for (const id of notes.allIds) {
            const note = notes.byId[id];

            for (const tags of note.tags) {
                allTagsSet.add(tags);
            }
        }

        return Array.from(allTagsSet).sort();
    }
)

export const selectSubTags = createSelector(
    [selectAllTags, selectActiveTags], (allTags, activeTags) => {

        if (!(activeTags.length === 1)) {
            return [];
        }

        const allSubTagsSet = new Set<string>();
        allTags.forEach(tag => {
            if (tag.includes(activeTags[0] + '--')) {
                const subTagsFromTag = tag.replace(activeTags[0] + '--', '').split('--');
                subTagsFromTag.forEach(subTag => {allSubTagsSet.add(subTag)});
            }
        })

        return Array.from(allSubTagsSet).sort();
    }
);

export const selectTags = createSelector(
    [selectAllTags, selectSubTags],
    (allTags, subTags) => {
        return {
            tags: allTags.filter((t) => !(t.includes('--'))),
            subTags,
        }
    }
);


export const selectNotesData = createSelector(
    [selectNotesState, selectActiveTags, selectActiveSubTags],
    (notes, activeTags, activeSubTags) => {
        const activeNotes: Note[] = [];
        const doneNotes: Note[] = [];
        const archivedNotes: Note[] = [];

        const matchesTags = (note: Note) => {
            return activeTags.length === 0 ||
            activeTags.every(tag => note.tags.includes(tag));
        }

        const matchesSubTags = (note: Note) => {
            return activeSubTags.length === 0 ||
            activeSubTags.every(subTag => note.tags.some(tag => tag.includes('--' + subTag)));
        }

        for (const id of notes.allIds) {
            const n = notes.byId[id];

            if (!matchesTags(n)) continue;

            if (!matchesSubTags(n)) continue;

            if (n.archive) archivedNotes.push(n);
            else if (n.done) doneNotes.push(n);
            else activeNotes.push(n);
        }

        return {
            activeNotes,
            doneNotes,
            archivedNotes,
            counters: {
                active: activeNotes.length,
                done: doneNotes.length,
                archive: archivedNotes.length
            }
        };
    }
);

export const {
    addNote,
    updateNote,
    removeNote,
    setAllNotes,
    toggleTag,
    toggleSubTag,
    clearAllTags,
    clearAllSubTags,
    resetNotes
} = notesSlice.actions;
export default notesSlice.reducer;
