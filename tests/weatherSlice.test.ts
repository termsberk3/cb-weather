import weatherReducer from "../redux/reducers/weather-slice";
import { fetchCurrentWeather } from "../redux/reducers/weather-slice";


const initialState = {
    data: {
        location: {
            name: '',
            region: '',
            country: '',
            localtime: '',
        },
        current: {
            temp_c: 0,
            condition: {
                text: '',
                icon: '',
            },
            wind_kph: 0,
            humidity: 0,
            feelslike_c: 0,
            uv: 0,
            precip_mm: 0,
        },
        forecast: {
            forecastday: [],
        },
        loading: false,
        error: null,
    },
};

describe('weather slice', () => {
    it('should handle initial state', () => {
        expect(weatherReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle fetchCurrentWeather.pending', () => {
        const nextState = weatherReducer(initialState, { type: fetchCurrentWeather.pending.type });

        expect(nextState.data.loading).toBe(true);
        expect(nextState.data.error).toBeNull();
    });

    it('should handle fetchCurrentWeather.fulfilled', () => {
        const payload = { temperature: 25, condition: 'Sunny' };

        const nextState = weatherReducer(initialState, { type: fetchCurrentWeather.fulfilled.type, payload });

        expect(nextState.data).toEqual(payload);
        expect(nextState.data.loading).toBe(false);
    });

    it('should handle fetchCurrentWeather.rejected', () => {
        const error = { message: 'Network error' };

        const nextState = weatherReducer(initialState, { type: fetchCurrentWeather.rejected.type, error });

        expect(nextState.data.loading).toBe(false);
        expect(nextState.data.error).toBe('Network error');
    });
});