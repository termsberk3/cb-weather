import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import weatherSlice from "./reducers/weather-slice"


//Store has been created with scalability in mind, this method of using reducers ensure addition of multiple reducers in future
export const store = configureStore({
  reducer: {
    weather: weatherSlice

  },
});




export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;