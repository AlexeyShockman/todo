export const dictionary = {
    ru: {
        list: {
            emptyList: {
                title: 'Заметок еще нет.',
                text: 'Но вы легко можете добавить новые!',
            },
            loadingErrorText: 'Возникла ошибка при загрузке и добавлении новой заметки',
            firstLoadingText: 'Получение списка задач с сервера',
            edit: {
                status: {
                    tags: 'Использовать тег',
                    weather: 'Добавить погоду',
                    longText: 'Большой текст',
                },
                buttons: {
                    add: 'добавить',
                    loading: 'загрузка',
                },
                input: {
                    shortNote: 'Добавить заметку',
                    title: 'Заголовок',
                    text: 'Текст заметки',
                    tags: 'Теги (через пробел)',
                }
            },
            collapse: {
                wip: 'В процессе',
                done: 'Завершено',
                archive: 'Архив',
            },
        },
        code: 'ru-RU',
        weather: {
            clear: 'Ясно',
            mostlyClear: 'Преимущественно ясно',
            partlyCloudy: 'Переменная облачность',
            cloudy: 'Пасмурно',
            fog: 'Туман',
            frost: 'Иней',
            drizzle: 'Морось слабая',
            rainLight: 'Дождь слабый',
            rainHeavy: 'Ливень',
            unknown: 'Погода неизвестна',
        },
        note: {
          tooltips: {
              edit: 'Редактировать',
              archive: 'В архив',
              unarchive: 'Убрать из архива',
              delete: 'Удалить (необратимо)',
              archiveNotEdited: 'Архивные записи не редактируются',
          },
        }
    },
    en: {
        list: {
            emptyList: {
                title: 'No notes yet.',
                text: 'But you can easily add some!',
            },
            loadingErrorText: 'An error occurred while loading or adding a note.',
            firstLoadingText: 'Fetching tasks from the server',
            edit: {
                status: {
                    tags: 'Use tag',
                    weather: 'Add weather',
                    longText: 'Long text',
                },
                buttons: {
                    add: 'add',
                    loading: 'loading',
                },
                input: {
                    shortNote: 'Add a note',
                    title: 'Title',
                    text: 'Note text',
                    tags: 'Tags (separated by spaces)'
                }
            },
            collapse: {
                wip: 'In progress',
                done: 'Completed',
                archive: 'Archive',
            },
        },
        code: 'en-US',
        weather: {
            clear: 'Clear',
            mostlyClear: 'Mostly clear',
            partlyCloudy: 'Partly cloudy',
            cloudy: 'Cloudy',
            fog: 'Fog',
            frost: 'Frost',
            drizzle: 'Light drizzle',
            rainLight: 'Light rain',
            rainHeavy: 'Heavy rain',
            unknown: 'Weather unknown',
        },
        note: {
            tooltips: {
                edit: 'Edit',
                archive: 'Move to archive',
                unarchive: 'Remove from archive',
                delete: 'Delete (irreversible)',
                archiveNotEdited: 'Archived notes cannot be edited',
            },
        }
    },
} as const;

export type Lang = keyof typeof dictionary;
