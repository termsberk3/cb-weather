import { SectionList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '../redux/store';
import translateWeatherCondition from '../utilities/LocalizedConditions';


const HourlyWeather = ({ day = 0 }) => {
    const weatherData = useAppSelector((state) => state.weather);
    const hourlyWeatherData = weatherData.data.forecast.forecastday[day]?.hour || [];
    const currentHour = new Date().getHours();
    const translatedCondition = translateWeatherCondition(weatherData.data.current.condition.text);
    if (!weatherData) {
        return null; // veya bir yükleme göstergesi
    }

    const daysOfWeek = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

    const filteredHours = hourlyWeatherData.filter(item => {
        const hour = parseInt(item.time.slice(11, 13), 10);
        return day === 0 ? hour >= currentHour : true;
    });


    return (
        <View className="pt-2 h-full flex-1">
            <SectionList
                sections={[
                    { title: 'Saatlik', data: filteredHours },
                ]}
                keyExtractor={(item) => item.time}
                renderItem={({ item }) => (
                    <View>
                        <Text className="text-default">Saat : {item.time.slice(11, 13)}:00</Text>
                        <Text className="text-default">Sıcaklık : {item.temp_c} °C</Text>
                        <Text className="text-default">Durum : {translatedCondition}</Text>
                        <Text className="text-default">Yağmur : {item.chance_of_rain}%</Text>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
            />
        </View>
    );
};

export default HourlyWeather

const styles = StyleSheet.create({
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'white',
        padding: 10,
    },
});