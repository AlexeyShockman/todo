import { db } from "../firebase";
import {
    collection,
    deleteDoc,
    doc,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import type { Note } from "../types/note";

const notesCollection = (userId: string) => collection(db, `users/${userId}/notes`);

export const addNoteDB = async (userId: string, note: Note) => {
    const notesRef = notesCollection(userId);
    const docRef = doc(notesRef, note.id); // используем note.id как id документа
    await setDoc(docRef, note);
};

export const updateNoteDB = async (
    userId: string,
    noteId: Note["id"],
    data: Partial<Note>
) => {
    const ref = doc(db, `users/${userId}/notes`, noteId);
    await updateDoc(ref, data);
};

export const removeNoteDB = async (userId: string, noteId: Note["id"]) => {
    const notesRef = notesCollection(userId);
    await deleteDoc(doc(notesRef, noteId));
};