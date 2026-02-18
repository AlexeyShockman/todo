import { fireEvent, render, screen } from '@testing-library/react';
import { UserNote } from './UserNote';

jest.mock('../hooks/useI18n', () => ({
    useI18n: () => ({
        t: {
            code: 'en-US',
            note: {
                tooltips: {
                    archiveNotEdited: '',
                    edit: 'edit',
                    unarchive: 'unarchive',
                    archive: 'archive',
                    delete: 'delete',
                },
            },
        },
    }),
}));

jest.mock('../services/weather', () => ({
    decodeWeather: jest.fn(() => 'Always sunny'),
}));

const baseNote = {
    id: '1',
    text: 'Test note text',
    done: false,
    archive: false,
    date: 1765965751300,
    tags: ['tag', 'tag2'],
};

const renderUserNote = (overrides = {}) => {
    const defaultProps = {
        ...baseNote,
        onToggle: jest.fn(),
        onDelete: jest.fn(),
        onEdit: jest.fn()
    };
    return render(<UserNote {...defaultProps} {...overrides} />);
};

describe('UserNote', () => {

    describe('Рендер текста и элементов', () => {
        test('рендерит текст заметки', () => {
            renderUserNote();
            expect(screen.getByText('Test note text')).toBeInTheDocument();
        });

        test('рендерит header, tags и weather', () => {
            renderUserNote({
                header: 'Header',
                tags: ['tag1', 'tag2'],
                weather: 'sunny',
            });

            expect(screen.getByText('Header')).toBeInTheDocument();
            expect(screen.getByText('tag1')).toBeInTheDocument();
            expect(screen.getByText('tag2')).toBeInTheDocument();
            expect(screen.getByText('sunny')).toBeInTheDocument();
        });

        test('отображает дату и время', () => {
            renderUserNote({ date: new Date('2025-01-01T12:34:00').getTime() });
            expect(screen.getByText(/01.01.2025/)).toBeInTheDocument();
            expect(screen.getByText(/12:34/)).toBeInTheDocument();
        });
    });

    describe('Поведение кнопок', () => {
        test('вызывает onDelete при клике на кнопку удаления', () => {
            const onDelete = jest.fn();
            renderUserNote({ onDelete });

            const deleteButton = screen.getByRole('button', { name: /delete/i });
            fireEvent.click(deleteButton);

            expect(onDelete).toHaveBeenCalledTimes(1);
            expect(onDelete).toHaveBeenCalledWith('1');
        });

        test('вызывает onToggle с "done" при клике на чекбокс', () => {
            const onToggle = jest.fn();
            renderUserNote({ onToggle });

            const checkbox = screen.getByRole('checkbox');
            fireEvent.click(checkbox);

            expect(onToggle).toHaveBeenCalledWith('1', 'done');
        });

        test('вызывает onToggle с "archive" при клике на archive кнопку', () => {
            const onToggle = jest.fn();
            renderUserNote({ onToggle });

            const archiveButton = screen.getByRole('button', { name: /archive/i });
            fireEvent.click(archiveButton);

            expect(onToggle).toHaveBeenCalledTimes(1);
            expect(onToggle).toHaveBeenCalledWith('1', 'archive');
        });

        test('archive кнопка НЕ заблокирована для архивной заметки', () => {
            renderUserNote({ archive: true });

            const archiveButton = screen.getByRole('button', { name: /archive/i });
            expect(archiveButton).toBeEnabled();
        });

        test('чекбокс отмечен при done = true', () => {
            renderUserNote({ done: true });

            const checkbox = screen.getByRole('checkbox');
            expect(checkbox).toBeChecked();
        });

        test('edit кнопка disabled при archive = true', () => {
            renderUserNote({ archive: true });

            const editButton = screen.getByRole('button', { name: /edit/i });
            expect(editButton).toBeDisabled(); 
        });
    });


});