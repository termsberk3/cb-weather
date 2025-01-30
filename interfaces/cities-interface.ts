export interface FetchCityProps {
    name: string;
    id: string;
}

export interface SetCityProps {
    label: string;
    value: string;
}

export interface CitySelectorProps {
    onCityChange: (city: string) => void;
    selectedCity: string;
}