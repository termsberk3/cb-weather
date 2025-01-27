import { FlatList, View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react'
import { useAppSelector } from '../redux/store';
import translateWeatherCondition from '../utilities/LocalizedConditions';

const numColumns = 2
const HourlyWeather = ({ day = 0 }) => {
    const weatherData = useAppSelector((state) => state.weather);
    const hourlyWeatherData = weatherData.data.forecast.forecastday[day]?.hour || [];
    const currentHour = new Date().getHours();
    const translatedCondition = translateWeatherCondition(weatherData.data.current.condition.text);
    if (!weatherData) {
        return null; 
    }

    const filteredHours = hourlyWeatherData.filter(item => {
        const hour = parseInt(item.time.slice(11, 13), 10);
        return day === 0 ? hour >= currentHour : true;
    });


    return (
        <View className="pt-2 h-full flex-1">
            <FlatList
                data={filteredHours}
                keyExtractor={(item) => item.time}
                numColumns={numColumns} // Sütun sayısını belirle
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text className="text-default text-xl">Saat : {item.time.slice(11, 13)}:00</Text>
                        <Text className="text-default">Sıcaklık : {item.temp_c} °C</Text>
                        <Text className="text-default">Durum : {translateWeatherCondition(item.condition.text)}</Text>
                        <Text className="text-default">Yağmur : {item.chance_of_rain}%</Text>
                    </View>
                )}
                ListHeaderComponent={<Text style={styles.title}>Saatlik</Text>}
            />
        </View>
    );
};

export default HourlyWeather

const styles = StyleSheet.create({
    item: {
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / numColumns,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color :"white",
        textDecorationLine : "underline"
    }
});