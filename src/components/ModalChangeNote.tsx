import { Modal, Form, Input, Select } from 'antd';
import {useEffect} from 'react';
import type {Note} from '../types/note.ts';


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
    const [form] = Form.useForm();

    useEffect(() => {
        if (note) {
            form.setFieldsValue({
                ...note
            });
        } else {
            form.resetFields();
        }
    }, [note, form]);

    const handleOk = async () => {
        if (!note) return;

        try {
            const values = await form.validateFields();

            const updatedNote: Note = {
                ...note,
                ...values,
                header: values.header || null,
            };

            onSave(updatedNote);
            onClose();
        } catch {
            // ошибки валидации — Modal не закроется
        }
    };

    return (
        <Modal
            title='Редактирование заметки'
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
                        label='Заголовок'
                        name='header'
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Текст'
                        name='text'
                        rules={[
                            { required: true, message: 'Введите текст заметки' },
                        ]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        label='Теги'
                        name='tags'
                    >
                        <Select mode='tags' />
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
}
