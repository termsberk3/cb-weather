import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { WeatherData } from "../../interfaces/weather-interface";
import axios from 'axios';


interface WeatherState {
    data: WeatherData;
}

const initialState: WeatherState = {
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
        },
        forecast: {
            forecastday: [],
        },
        loading: false,
        error: null,
    },
};

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async (city: string) => {
        const apiKey = process.env.API_KEY;
        const baseUrl = 'http://api.weatherapi.com/v1/current.json';
        const response = await axios.get(
            `${baseUrl}?key=${apiKey}&q=${city}`
        );
        return response.data;
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        // changeSelectedCity reducer'ı eklendi
        changeSelectedCity(state, action: PayloadAction<string>) {
            // API isteğinde kullanılacak şehir adı formatını kontrol et
            // Örneğin, WeatherAPI için "Antalya" yerine "antalya" gerekebilir
            const formattedCityName = action.payload.toLowerCase();
            state.data.location.name = formattedCityName;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.data.loading = true;
                state.data.error = null;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.data = action.payload;
                state.data.loading = false;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.data.loading = false;
                state.data.error = action.error.message || 'Bir hata oluştu';
            });
    },
});

export const { changeSelectedCity } = weatherSlice.actions; 
export const weatherActions = weatherSlice.actions;
export default weatherSlice.reducer;