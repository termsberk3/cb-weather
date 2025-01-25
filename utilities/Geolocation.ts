import * as Location from 'expo-location';
import axios from 'axios';

export const getCityFromCoordinates = async (latitude: number, longitude: number): Promise<string> => {
    try {
        const apiKey = process.env.OPEN_CAGE_KEY
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
        const data = response.data;
        if (data.status.code === 200 && data.results.length > 0) {
            const components = data.results[0].components;
            return components.city || components.town || components.village || 'Bilinmiyor';
        } else {
            return 'Bilinmiyor';
        }
    } catch (error) {
        console.error('Şehir bilgisi alınırken hata oluştu:', error);
        return 'Bilinmiyor';
    }
};

export const getCurrentLocation = async (): Promise<{ latitude: number, longitude: number }> => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.log('Konum izni verilmedi!');
        return { latitude: 0, longitude: 0 };
    }

    let location = await Location.getCurrentPositionAsync({});
    return location.coords;
};