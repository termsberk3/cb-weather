import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View } from 'react-native';
import { WeatherIntervalsProps } from '../interfaces/weather-interface';

const WeatherIntervals: React.FC<WeatherIntervalsProps> = ({ forecastDays, setForecastDays, open, setIsDropdownOpen }) => {
  return (
    <View className="mb-4 px-4">
      <DropDownPicker
        open={open}
        value={forecastDays}
        items={[
          { label: 'Günlük', value: 1 },
          { label: '3 Günlük', value: 3 },
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