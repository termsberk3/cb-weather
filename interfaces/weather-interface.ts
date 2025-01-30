export interface WeatherData {
    location: {
      name: string;
      region: string;
      country: string;
      localtime: string;
    };
    current: {
      temp_c: number;
      condition: {
        text: string;
        icon: string;
      };
      wind_kph: number;
      humidity: number;
      feelslike_c: number;
      uv: number;
      precip_mm: number
    };
    forecast: {
      forecastday: Forecastday[];
    };
    loading: boolean;
    error: string | null | undefined;
  }

export interface Forecastday {
    hour: Hour[];
    day: DayData
    date: string
}

export interface Hour {
    time: string;
    temp_c: number;
    condition: {
        text: string;
        icon: string;
    };
    chance_of_rain: number;
}

export interface DayData {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  uv: number;
}

export interface WeatherIntervalsProps {
  forecastDays: number;
  setForecastDays: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  open: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ForecastDayProp {
  day?: number;
}
