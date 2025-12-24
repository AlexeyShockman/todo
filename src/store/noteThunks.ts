import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import type { Note } from "../types/note";
import {addNote, removeNote, resetNotes, setAllNotes, updateNote} from "./notesSlice.ts";

let unsubscribe: (() => void) | null = null;

export const subscribeNotes = createAsyncThunk<
    void,
    string | null  // аргумент: userId
>(
    "notes/subscribe",
    async (userId, { dispatch }) => {

        if (!userId) {
            console.warn("subscribeNotes: userId is null, skipping subscription");
            return;
        }

        unsubscribe?.();
        unsubscribe = null;


        const notesRef = collection(db, `users/${userId}/notes`);
        const q = query(notesRef, orderBy("date", "desc"));

        return new Promise<void>((resolve) => {
            let isInitial = true;



           unsubscribe = onSnapshot(q, snapshot => {
                if (isInitial) {
                    const all = snapshot.docs.map(d => {
                        return {
                            id: d.id,
                            ...d.data(),
                        }}) as Note[];

                    dispatch(setAllNotes(all));
                    isInitial = false;
                    resolve();
                    return;
                }

                snapshot.docChanges().forEach(change => {
                    const note = {
                        id: change.doc.id,
                        ...change.doc.data(),
                    } as Note;

                    if (change.type === "added") {
                        dispatch(addNote(note));
                    } else if (change.type === "modified") {
                        dispatch(updateNote(note));
                    } else if (change.type === "removed") {
                        dispatch(removeNote(note.id));
                    }
                })

            });
        });
    }
);

export const unsubscribeNotes = createAsyncThunk(
    "notes/unsubscribe",
    async (_, { dispatch }) => {
        unsubscribe?.();
        unsubscribe = null;
        dispatch(resetNotes());
    }
);