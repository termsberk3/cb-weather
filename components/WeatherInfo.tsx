import { StyleSheet, Text, View, Image, FlatList, SectionList, ScrollView } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../redux/store'
import { fetchCurrentWeather } from '../redux/reducers/weather-slice';

import CitySelector from './SelectCity';
import CurrentWeather from './CurrentWeather';
import HourlyWeather from './HourlyWeather';

const WeatherInfo = () => {
  const dispatch = useAppDispatch()
  const [selectedCity, setSelectedCity] = useState('Antalya');

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
      <CurrentWeather />
      <HourlyWeather />
    </View>
  );
};

export default WeatherInfo