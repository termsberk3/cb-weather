import { StyleSheet, Text, View, Image } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/store'
import { fetchWeather } from '../redux/reducers/weather-slice';
import translate from 'googletrans';
import translateWeatherCondition from '../utilities/LocalizedConditions';

import CitySelector from './SelectCity';

const WeatherInfo = () => {
  const dispatch = useAppDispatch()
  const weatherData = useAppSelector((state) => state.weather);
  const translatedCondition = translateWeatherCondition(weatherData.data.current.condition.text);
  const [translatedLocationCountry, setTranslatedLocationCountry] = useState('');
  const loading = useAppSelector((state) => state.weather.data.loading);
  const error = useAppSelector((state) => state.weather.data.error);
  const [selectedCity, setSelectedCity] = useState('Antalya');

  useEffect(() => {
    dispatch(fetchWeather(selectedCity));
  }, [dispatch, selectedCity]);

  const handleCityChange = (city : any) => {
    setSelectedCity(city);
  };

  React.useEffect(() => {
    dispatch(fetchWeather('Antalya'));
  }, [dispatch]);

  useEffect(() => {
    const translateLocationCountry = async () => {
      if (weatherData) {
        const result = await translate(weatherData.data.location.country, { to: 'tr' });
        setTranslatedLocationCountry(result.text);
      }
    };

    translateLocationCountry();
  }, [weatherData]);
  if (loading) {
    return <Text>Yükleniyor...</Text>;
  }

  if (error) {
    return <Text>Hata: {error}</Text>;
  }

  return (
    <View className="p-4">
      <CitySelector 
        onCityChange={handleCityChange} 
        selectedCity={selectedCity} 
      />
      <Text className="text-default font-bold text-2xl mb-4">
        {weatherData.data.location.name}, {translatedLocationCountry}
      </Text>
      <Text className="text-default font-bold text-2xl mb-4">
        {new Date(weatherData.data.location.localtime).toLocaleDateString('tr-TR', { weekday: 'long' })} , {new Date(weatherData.data.location.localtime).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
      </Text>
      <Text className="text-default text-4xl mb-4">
        {weatherData.data.current.temp_c} °C
      </Text>
      <Text className="text-default text-lg mb-2">
        Durum: {translatedCondition}
      </Text>
      <Text className="text-default text-lg mb-2">
        Hissedilen Sıcaklık: {weatherData.data.current.feelslike_c} °C
      </Text>
      <Text className="text-default text-lg mb-2">
        Rüzgar Hızı: {weatherData.data.current.wind_kph} km/h
      </Text>
      <Text className="text-default text-lg mb-2">
        Nem: {weatherData.data.current.humidity}%
      </Text>

    </View>
  );
};

export default WeatherInfo