import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentLocation, getCityFromCoordinates } from '../../utilities/Geolocation';
import { LocationState } from '../../interfaces/location-interface';


const initialState: LocationState = {
    city: null,
    loading: false,
    error: null,
};

export const fetchLocation = createAsyncThunk(
    'location/fetchLocation',
    async () => {
        const { latitude, longitude } = await getCurrentLocation();
        const city = await getCityFromCoordinates(latitude, longitude);
        return city;
    }
);

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.city = action.payload;
            })
            .addCase(fetchLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Bir hata oluştu';
            });
    },
});
export const locationActions = locationSlice.actions;
export default locationSlice.reducer;