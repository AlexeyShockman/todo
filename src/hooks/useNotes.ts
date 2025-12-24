// import { useEffect, useState } from "react";
// import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
// import { db } from "../firebase";
// import type {Note} from "../types/note";
// import { FIRST_LOADING_TIMEOUT } from "../constants/global.ts";
//
// // TODO use notes больше не нужен - состояние хранится в редаксе
// export const useNotes = () => {
//     const [notes, setNotes] = useState<Note[]>([]);
//
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const notesRef = collection(db, "notes");
//         const q = query(notesRef, orderBy("date", "desc"));
//
//         const unsubscribe = onSnapshot(q, snapshot => {
//             const updatedNotes = snapshot.docs.map(d => {
//                 const data = d.data();
//                 return {
//                     id: d.id,
//                     ...data,
//                     // date: data.date.toDate(),
//                 };
//             }) as Note[];
//             setNotes(updatedNotes);
//
//             if (!FIRST_LOADING_TIMEOUT) {
//                 setLoading(false);
//             } else {
//                 setTimeout(() => {
//                     setLoading(false);
//                 }, FIRST_LOADING_TIMEOUT);
//             }
//
//         });
//
//         return () => unsubscribe();
//     }, []);
//
//     return {notes, loading};
// };
//
// // TODO очевидно, что мне стоит удалить useNotes