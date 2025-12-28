export const dictionary = {
    ru: {
        code: 'ru-RU',
        header: {
            loadingStatusText: 'Аутентификация и загрузка...',
            unauthorizedUserName: 'Не авторизован',
            linkText: {
                registration: 'Регистрация',
                login: 'Авторизация',
            },
            buttons: {
                exit: 'Выйти'
            },
        },
        list: {
            emptyList: {
                title: 'Заметок еще нет.',
                text: 'Но вы легко можете добавить новые!',
            },
            emptyListByTags: {
                title: 'Заметок с такой комбинацией тегов еще нет',
                buttonText: 'Сброс тегов',
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
                    add: 'Добавить',
                    loading: 'Загрузка',
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
            tagsPanelText: 'Фильтрация по тегам:',
            privateRouteLoadingText: 'Загрузка...',
        },
        loginPage: {
            title: 'Авторизация',
            buttonText: 'Вход',
            loginSuccessText: 'Успешный вход',
            loginErrorText: 'Непредвиденная ошибка',
            emailPlaceholder: 'Введите Email',
            emailMessage: 'Необходимо ввести Email',
            passwordPlaceholder: 'Введите пароль',
            passwordMessage: 'Необходимо ввести пароль',
            forgotPasswordText: 'Забыли пароль?',
        },
        page404: {
            title: 'Ошибка 404',
            text: 'Страница с таким адресом не найдена',
            linkText: 'На главную',
        },
        signupPage: {
            title: 'Регистрация',
            differentPasswordsError: 'Пароли не совпадают',
            createSuccessText: {
                firstPart: 'Аккаунт',
                secondPart: 'создан!',
            },
            createErrorText: 'Неожиданная ошибка при создании учетной записи',
            alreadyRegistered: {
                title: 'Вы уже зарегистрированы',
                text: 'Логин:',
            },
            forms: {
                emailMessage: 'Введите Email',
                emailPlaceholder: 'Email',
                passwordMessage: 'Введите пароль',
                passwordPlaceholder: 'Пароль',
                repeatPasswordMessage: 'Повторите пароль',
                repeatPasswordPlaceholder: 'Повторите пароль',
                buttonText: 'Регистрация',
            },
        },
        forgotPasswordPage: {
            title: 'Восстановление пароля',
            forms: {
                emailMessage: 'Введите ваш email',
                emailPlaceholder: 'Email',
                buttonText: 'Отправить ссылку',
            }
        },
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
        code: 'en-US',
        header: {
            loadingStatusText: 'Authentication and loading...',
            unauthorizedUserName: 'Not authorized',
            linkText: {
                registration: 'Registration',
                login: 'Login',
            },
            buttons: {
                exit: 'Logout',
            },
        },
        list: {
            emptyList: {
                title: 'No notes yet.',
                text: 'But you can easily add some!',
            },
            emptyListByTags: {
                title: 'There are no notes with this combination of tags yet',
                buttonText: 'Clear tags',
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
                    add: 'Add',
                    loading: 'Loading',
                },
                input: {
                    shortNote: 'Add a note',
                    title: 'Title',
                    text: 'Note text',
                    tags: 'Tags (separated by spaces)',
                },
            },
            collapse: {
                wip: 'In progress',
                done: 'Completed',
                archive: 'Archive',
            },
            tagsPanelText: 'Filter by tags:',
            privateRouteLoadingText: 'Loading...',
        },
        loginPage: {
            title: 'Authorization',
            buttonText: 'Sign in',
            loginSuccessText: 'Successfully signed in',
            loginErrorText: 'Unexpected error',
            emailPlaceholder: 'Email is required',
            emailMessage: 'Enter your email',
            passwordPlaceholder: 'Enter password',
            passwordMessage: 'Password is required',
            forgotPasswordText: 'Forgot password?',
        },
        page404: {
            title: '404 Error',
            text: 'The page with this address was not found',
            linkText: 'Go to home',
        },
        signupPage: {
            title: 'Sign up',
            differentPasswordsError: 'Passwords do not match',
            createSuccessText: {
                firstPart: 'Account',
                secondPart: 'created!',
            },
            createErrorText: 'Unexpected error while creating an account',
            alreadyRegistered: {
                title: 'You are already registered',
                text: 'Login:',
            },
            forms: {
                emailMessage: 'Enter your email',
                emailPlaceholder: 'Email',
                passwordMessage: 'Enter password',
                passwordPlaceholder: 'Password',
                repeatPasswordMessage: 'Repeat password',
                repeatPasswordPlaceholder: 'Repeat password',
                buttonText: 'Sign up',
            },
        },
        forgotPasswordPage: {
            title: 'Password recovery',
            forms: {
                emailMessage: 'Enter your email',
                emailPlaceholder: 'Email',
                buttonText: 'Send link',
            },
        },
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
        },
    },
} as const;

export type Lang = keyof typeof dictionary;
