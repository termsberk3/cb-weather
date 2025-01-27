import { View, TextInput, StyleSheet, Text, Button } from 'react-native';
import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../redux/store'
import { fetchCurrentWeather } from '../redux/reducers/weather-slice';
import CitySelector from './SelectCity';
import CurrentWeather from './CurrentWeather';
import HourlyWeather from './HourlyWeather';
import DayPagination from './DayPagination';
import { fetchLocation } from '../redux/reducers/location-slice';
import { useAppSelector } from '../redux/store';
import WeatherIntervals from './WeatherIntervals';

const WeatherInfo = () => {
  const dispatch = useAppDispatch()
  const city = useAppSelector((state) => state.location.city);
  const [selectedCity, setSelectedCity] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [forecastDays, setForecastDays] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const handleNextPage = () => {
    if (currentPage < forecastDays - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (selectedCity) {
      dispatch(fetchCurrentWeather({ city: selectedCity, days: forecastDays }));
    }
  }, [dispatch, selectedCity, forecastDays]);


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
    <View className="px-3 h-full">
      <CitySelector
        onCityChange={handleCityChange}
        selectedCity={selectedCity}
      />
      <WeatherIntervals
        open={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        forecastDays={forecastDays}
        setForecastDays={setForecastDays}
        setCurrentPage={setCurrentPage}
      />
     <View className="px-3 h-full  flex-1">
        {currentPage === 0 ? (
           <View className="px-2 h-full  flex-1">
            <CurrentWeather day={currentPage} />
            <HourlyWeather day={currentPage} />
          </View>
        ) : (
          <View className="px-3 h-full  flex-1">
            <CurrentWeather day={currentPage} />
            <HourlyWeather day={currentPage} />
          </View>
        )}
      </View>
      {forecastDays > 1 && (
        <DayPagination
          forecastDays={forecastDays}
          currentPage={currentPage}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
      )}
    </View>
  );
};

export default WeatherInfo