import { Modal, Form, Input } from 'antd';
import {useEffect} from 'react';
import type {Note} from '../types/note.ts';
import {useI18n} from "../hooks/useI18n.ts";


interface ModalChangeNoteProps {
    note: Note | null;
    onClose: () => void;
    onSave: (updatedNote: Note) => void;
}


export function ModalChangeNote({
                                    note,
                                    onClose,
                                    onSave,
                                }: ModalChangeNoteProps) {
    const { t } = useI18n();
    const [form] = Form.useForm();

    useEffect(() => {
        if (note) {
            form.setFieldsValue({
                ...note, tags: note.tags ? note.tags.join(' ') : '',
            });
        } else {
            form.resetFields();
        }
    }, [note, form]);

    const handleOk = async () => {
        if (!note) return;

        try {
            const values = await form.validateFields();
            const updatedTags = values.tags ? Array.from(new Set(values.tags.trim().split(/\s+/))) : [];
            const updatedHeader = values.header ? values.header.trim() : null;

            const updatedNote: Note = {
                ...note,
                ...values,
                header: updatedHeader,
                tags: updatedTags,
            };

            onSave(updatedNote);
            onClose();
        } catch {
            // ошибки валидации
        }
    };

    return (
        <Modal
            title={t.list.edit.editing.title}
            open={!!note}
            onOk={handleOk}
            onCancel={onClose}
        >
            {note && (
                <Form
                    form={form}
                    layout='vertical'
                >
                    <Form.Item
                        label={t.list.edit.input.title}
                        name='header'
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={t.list.edit.input.text}
                        name='text'
                        rules={[
                            {
                                validator: (_, value) => {
                                    if (!value || !value.trim()) {
                                        return Promise.reject(
                                            new Error(t.list.edit.editing.emptyTextFieldMessage)
                                        );
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        label={t.list.edit.editing.tags}
                        name='tags'
                    >
                        <Input />
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
}
