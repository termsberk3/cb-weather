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