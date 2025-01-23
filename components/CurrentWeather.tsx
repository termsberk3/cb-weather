import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../redux/store';
import translate from 'googletrans';
import translateWeatherCondition from '../utilities/LocalizedConditions';

const CurrentWeather = () => {
    const [translatedLocationCountry, setTranslatedLocationCountry] = useState('');
    const weatherData = useAppSelector((state) => state.weather);
    const translatedCondition = translateWeatherCondition(weatherData.data.current.condition.text);
    const loading = useAppSelector((state) => state.weather.data.loading);
    const error = useAppSelector((state) => state.weather.data.error);

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
        <View className='pt-1'>
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
            <Text className="text-default text-lg mb-2">
                Yağış: {weatherData.data.current.precip_mm}mm
            </Text>
        </View>
    )
}

export default CurrentWeather

const styles = StyleSheet.create({})