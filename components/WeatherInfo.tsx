import { View, Button } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../redux/store'
import { fetchCurrentWeather } from '../redux/reducers/weather-slice';

import CitySelector from './SelectCity';
import CurrentWeather from './CurrentWeather';
import HourlyWeather from './HourlyWeather';
import DayPagination from './DayPagination';

const WeatherInfo = () => {
  const dispatch = useAppDispatch()
  const [selectedCity, setSelectedCity] = useState('Ankara');
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

  const handleCityChange = (city: any) => {
    setSelectedCity(city);
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