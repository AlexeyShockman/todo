import type {useI18n} from '../hooks/useI18n.ts';

interface CurrentWeatherRaw {
    time: string;
    temperature_2m: number;
    weathercode: number;
}

interface WeatherResponse {
    current: CurrentWeatherRaw;
}

const weatherCodeMap: Record<number, string> = {
    0: '☀️',
    1: '🌤️☀️',
    2: '⛅☁️',
    3: '☁️',
    45: '🌫️',
    48: '❄️',
    51: '🌦️',
    61: '🌧️🌧️',
    80: '🌧️🌧️🌧️',
};

const normalizeCurrent = (data: CurrentWeatherRaw) => (
    `${data.temperature_2m}°C ${weatherCodeMap[data.weathercode] ?? 'Weather unknown'}`
);

const weatherUrl =
    'https://api.open-meteo.com/v1/forecast?latitude=55.7558&longitude=37.6176&current=temperature_2m,weathercode&timezone=auto';

const fetchWeather = async (url = weatherUrl): Promise<WeatherResponse> => {
    const res = await fetch(url);
    return res.json();
};

export const getCurrentWeather = async () => {
    try {
        const data = await fetchWeather();
        return normalizeCurrent(data.current);
    } catch {
        return 'Weather unknown';
    }

};


const weatherEmojiMap = {
    '☀️': 'clear',
    '🌤️☀️': 'mostlyClear',
    '⛅☁️': 'partlyCloudy',
    '☁️': 'cloudy',
    '🌫️': 'fog',
    '❄️': 'frost',
    '🌦️': 'drizzle',
    '🌧️🌧️': 'rainLight',
    '🌧️🌧️🌧️': 'rainHeavy'
} as const;

export const decodeWeather = (value: string, t: ReturnType<typeof useI18n>['t']) => {
    const key = (Object.keys(weatherEmojiMap) as (keyof typeof weatherEmojiMap)[])
        .find(emoji => value.endsWith(emoji));

    if (!key) return t.weather.unknown;

    const code = weatherEmojiMap[key];
    return t.weather[code];
};
