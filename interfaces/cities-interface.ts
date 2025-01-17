export interface CityProps {
    name: string;
    id: string
}

export interface CitySelectorProps {
    onCityChange: (city: string) => void;
    selectedCity: string;
}