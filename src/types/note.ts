export interface Note {
    id: string;
    header?: string | null;
    text: string;
    done: boolean;
    archive: boolean;
    date: number;
    weather?: string | null;
    tags: string[];
}

export type ToggleableNoteKeys = {
    [K in keyof Note]: Note[K] extends boolean ? K : never
}[keyof Note];

export interface NoteOptions {
    weather: boolean;
    longText: boolean;
    tags: boolean;
}
