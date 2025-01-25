import { View, Button } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../redux/store'
import { fetchCurrentWeather } from '../redux/reducers/weather-slice';
import CitySelector from './SelectCity';
import CurrentWeather from './CurrentWeather';
import HourlyWeather from './HourlyWeather';
import DayPagination from './DayPagination';
import { fetchLocation } from '../redux/reducers/location-slice';
import { useAppSelector } from '../redux/store';

const WeatherInfo = () => {
  const dispatch = useAppDispatch()
  const city = useAppSelector((state) => state.location.city);
  const [selectedCity, setSelectedCity] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    dispatch(fetchCurrentWeather(selectedCity));
  }, [dispatch, selectedCity]);

  useEffect(() => {
    dispatch(fetchLocation());
  }, [dispatch]);

  useEffect(() => {
    if (city) {
      setSelectedCity(city);
    }
  }, [city]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setCurrentPage(0);
  };
  return (
    <View className="p-4 h-full">
      <CitySelector
        onCityChange={handleCityChange}
        selectedCity={selectedCity}
      />
      <View className="p-4 h-full  flex-1">
        {currentPage === 0 ? (
          <View className="p-4 h-full  flex-1">
            <CurrentWeather day={currentPage} />
            <HourlyWeather day={currentPage} />
          </View>
        ) : (
          <View className="p-4 h-full  flex-1">
            <CurrentWeather day={currentPage} />
            <HourlyWeather day={currentPage} />
          </View>
        )}
      </View>
      <DayPagination
        currentPage={currentPage}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
    </View>
  );
};

export default WeatherInfo