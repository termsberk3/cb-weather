export interface CityProps {
    label: string;
    value: string;
    name?: string;
    id?: string;
}

export interface CitySelectorProps {
    onCityChange: (city: string) => void;
    selectedCity: string;
}