type UITag =
    | { type: 'root'; value: string }
    | { type: 'sub'; value: string };

export const buildNoteTagsUI = (tags: string[]): UITag[] => {
    const map = new Map<string, Set<string>>();

    for (const tag of tags) {
        const parts = tag.split('--').filter(Boolean);
        if (!parts.length) continue;

        const root = parts[0];

        if (!map.has(root)) {
            map.set(root, new Set());
        }

        const subs = map.get(root)!;

        for (const sub of parts.slice(1)) {
            subs.add(sub);
        }
    }

    const result: UITag[] = [];

    for (const [root, subs] of map) {
        result.push({ type: 'root', value: root });

        for (const sub of subs) {
            result.push({ type: 'sub', value: sub });
        }
    }

    return result;
};
