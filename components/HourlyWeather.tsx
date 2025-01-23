import { SectionList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '../redux/store';
import translateWeatherCondition from '../utilities/LocalizedConditions';

interface WeatherHour {
    time: string;
    temp_c: number;
    humidity: number;
    chance_of_rain: number;
}

interface WeatherForecast {
    current: {
        condition: {
            text: string;
        };
    };
    forecast: {
        forecastday: {
            hour: WeatherHour[];
        }[];
    };
}

const HourlyWeather: React.FC = () => {
    const weatherData = useAppSelector((state) => state.weather);
    const currentHour = new Date().getHours();
    const translatedCondition = translateWeatherCondition(weatherData.data.current.condition.text);
    const filteredHoursToday = weatherData.data.forecast.forecastday[0]?.hour.filter(item => {
        const hour = parseInt(item.time.slice(11, 13), 10);
        return hour >= currentHour;
    });

    return (
        <View className="pt-2 h-full flex-1">
            <SectionList
                sections={[
                    { title: 'Bugün', data: filteredHoursToday || [] },
                    { title: 'Yarın', data: weatherData.data.forecast.forecastday[1]?.hour || [] },
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
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'lightgray',
        padding: 10,
    },
});