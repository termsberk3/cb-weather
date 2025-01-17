import React, { FC, useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import { CityProps } from '../interfaces/cities-interface';
import { CitySelectorProps } from '../interfaces/cities-interface';


const fetchTurkeyCities = async (): Promise<CityProps[]> => {
    try {
        const response: AxiosResponse = await axios.get('https://turkiyeapi.dev/api/v1/provinces');
        const jsonData: { data: CityProps[] } = response.data;
        const cityData: CityProps[] = jsonData.data.map((city): { name: string; id: string } => ({
            name: city.name,
            id: city.id
        }));
        return cityData;
    } catch (error) {
        console.error('Error fetching city names:', error);
        return [];
    }
};

const normalizeCityName = (cityId: string, cities: { name: string, id: string }[]): string => {
    const city = cities.find(city => city.id === cityId);
    if (!city) {
        return '';
    }
    return city.name
        .replace(/ı/g, 'i')
        .replace(/ğ/g, 'g')
        .replace(/ö/g, 'o')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ç/g, 'c')
        .replace(/Ç/g, 'C')
        .replace(/Ş/g, 'S');
};

const CitySelector: FC<CitySelectorProps> = ({ onCityChange, selectedCity }) => {
    const [cities, setCities] = useState<{ name: string, id: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCities = async (): Promise<void> => {
            try {
                const cityList: { name: string, id: string }[] = await fetchTurkeyCities();
                setCities(cityList);
                setLoading(false);
            } catch (error) {
                console.error('Şehir listesi alınırken hata oluştu:', error);
                setLoading(false);
            }
        };

        fetchCities();
    }, []);

    return (
        <View className="border-white border-[1px] bg-white">
            <Picker
                selectedValue={selectedCity}
                onValueChange={onCityChange}

            >
                {loading ? (
                    <Picker.Item label="Yükleniyor..." value="" />
                ) : cities.map((value) => (
                    <Picker.Item key={value.id} label={value.name} value={normalizeCityName(value.id, cities)} />
                ))}
            </Picker>
        </View>
    );
};


export default CitySelector;