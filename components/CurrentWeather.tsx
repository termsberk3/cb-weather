import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../redux/store';
import translate from 'googletrans';
import translateWeatherCondition from '../utilities/LocalizedConditions';

const CurrentWeather = ({ day = 0 }) => {
    const [translatedLocationCountry, setTranslatedLocationCountry] = useState('');
    const weatherData = useAppSelector((state) => state.weather);
    const currentWeatherData = weatherData.data.forecast.forecastday[day];
    const translatedCondition = translateWeatherCondition(currentWeatherData?.day.condition.text);
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
                {new Date(currentWeatherData?.date).toLocaleDateString('tr-TR', { weekday: 'long' })} , {new Date(currentWeatherData?.date).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </Text>
            <Text className="text-default text-4xl mb-4">
                {currentWeatherData?.day.avgtemp_c} °C
            </Text>
            <Text className="text-default text-lg mb-2">
                Durum: {translatedCondition}
            </Text>
            <Text className="text-default text-lg mb-2">
                Max.Rüzgar Hızı: {currentWeatherData?.day.maxwind_kph} km/h
            </Text>
            <Text className="text-default text-lg mb-2">
                Ortalama Nem: {currentWeatherData?.day.avghumidity}%
            </Text>
            <Text className="text-default text-lg mb-2">
                Toplam Yağış: {currentWeatherData?.day.totalprecip_mm}mm
            </Text>
        </View>
    )
}

export default CurrentWeather

const styles = StyleSheet.create({})