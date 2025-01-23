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
            precip_mm: 0,
        },
        forecast: {
            forecastday: [],
        },
        loading: false,
        error: null,
    },
};

export const fetchCurrentWeather = createAsyncThunk(
    'weather/fetchWeather',
    async (city: string) => {
        const apiKey = process.env.API_KEY;
        const days = 7;
        const baseUrl = 'http://api.weatherapi.com/v1/forecast.json';
        const response = await axios.get(
            `${baseUrl}?key=${apiKey}&q=${city}&days=7`
        );
        return response.data;
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentWeather.pending, (state) => {
                state.data.loading = true;
                state.data.error = null;
            })
            .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
                state.data = action.payload;
                state.data.loading = false;
            })
            .addCase(fetchCurrentWeather.rejected, (state, action) => {
                state.data.loading = false;
                state.data.error = action.error.message || 'Bir hata oluştu';
            });
    },
});

export const weatherActions = weatherSlice.actions;
export default weatherSlice.reducer;