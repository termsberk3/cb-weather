import React, { useState, useEffect, FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { CityProps } from '../interfaces/cities-interface';
import { CitySelectorProps } from '../interfaces/cities-interface';
import axios, { AxiosResponse } from 'axios';

interface City {
    label: string;
    value: string;
    name?: string;
    id?: string;
}


const fetchTurkeyCities = async (): Promise<{ name: string; id: string }[]> => {
    try {
        const response: AxiosResponse = await axios.get('https://turkiyeapi.dev/api/v1/provinces');
        const jsonData: { data: CityProps[] } = response.data;
        const cityData = jsonData.data.map((city) => ({
            label: city.name,
            value: city.name,
            name: city.name ?? '',
            id: city.id,
        }));

        return cityData;
    } catch (error) {
        console.error('Error fetching city names:', error);
        return [];
    }
};

const CitySelector: FC<CitySelectorProps> = ({ onCityChange }) => {
    const [cities, setCities] = useState<CityProps[]>([]);
    const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);


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

    const handleCityChange = (item: City) => {
        setSelectedCity(item.value);
        onCityChange(item.value);
    };
    return (
        <View style={styles.container}>
            <Dropdown
                style={[styles.dropdown, { borderColor: 'white' }]}
                placeholderStyle={[styles.placeholderStyle, { color: 'white' }]}
                selectedTextStyle={[styles.selectedTextStyle, { color: 'white' }]}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={cities}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={loading ? 'Yükleniyor...' : 'Şehir Seçin'}
                searchPlaceholder="Şehir ara..."
                value={selectedCity}
                onChange={handleCityChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default CitySelector;