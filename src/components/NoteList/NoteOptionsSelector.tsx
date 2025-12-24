import { Checkbox, Space } from "antd";
import type {NoteOptions} from "../../types/note.ts";
import {useI18n} from "../../hooks/useI18n.ts";

interface NoteOptionsSelectorProps {
    options: NoteOptions;
    onToggle: (key: keyof NoteOptions) => void;
}

const OPTIONS_CONFIG = ["weather", "longText", "tags"] as const;

export function NoteOptionsSelector({ options, onToggle }: NoteOptionsSelectorProps) {
    const { t } = useI18n();

    return (
        <Space>
            {OPTIONS_CONFIG.map((key) => (
                <Checkbox
                    key={key}
                    checked={options[key]}
                    onChange={() => onToggle(key)}
                >
                    {t.list.edit.status[key]}
                </Checkbox>
            ))}
        </Space>
    );
}
