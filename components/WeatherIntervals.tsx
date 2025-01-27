import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View } from 'react-native';
import { WeatherIntervalsProps } from '../interfaces/weather-interface';

const WeatherIntervals: React.FC<WeatherIntervalsProps> = ({ forecastDays, setForecastDays, setCurrentPage, open, setIsDropdownOpen }) => {
  const handleSelectForecastDays = (value : any) => {
    setForecastDays(value);
    if (value > 1) {
      setCurrentPage(0);  // Only reset page if forecastDays > 1
    }
  };
  return (
    <View className="mb-4 px-4">
      <DropDownPicker
        open={open}
        value={forecastDays}
        items={[
          { label: 'Günlük', value: 1 },
          { label: 'Haftalık', value: 7 },
        ]}
        setOpen={setIsDropdownOpen}
        setValue={setForecastDays}
        style={{
          backgroundColor: '#663399',
          borderColor: '#FFFFFF',
          width: 150
        }}
        textStyle={{
          color: '#FFFFFF',
          fontSize: 16,
        }}
        dropDownContainerStyle={{
          backgroundColor: '#663399',
          borderColor: '#FFFF',
          width: 150
        }}
        labelStyle={{
          color: '#FFFFFF',
        }}
      />
    </View>
  );
};

export default WeatherIntervals;