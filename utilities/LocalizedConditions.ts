export default function translateWeatherCondition(condition: string): string {
    switch (condition) {
        case 'Clear':
            return 'Açık';
        case 'Partly Cloudy':
            return 'Parçalı bulutlu';
            case 'Partly cloudy':
            return 'Parçalı bulutlu';
        case 'Cloudy':
            return 'Bulutlu';
        case 'Overcast':
            return 'Kapalı';
        case 'Mist':
            return 'Sisli';
        case 'Patchy rain possible':
            return 'Yer yer yağmur mümkün';
            case 'Patchy rain nearby':
            return 'Yakınlarda düzensiz yağmur';
        case 'Patchy snow possible':
            return 'Yer yer kar mümkün';
        case 'Patchy sleet possible':
            return 'Yer yer sulu kar mümkün';
        case 'Patchy freezing drizzle possible':
            return 'Yer yer donan çiseleme mümkün';
        case 'Thundery outbreaks possible':
            return 'Gök gürültülü sağanak yağışlar mümkün';
        case 'Blowing snow':
            return 'Tipi';
        case 'Blizzard':
            return 'Kar fırtınası';
        case 'Fog':
            return 'Sis';
        case 'Freezing fog':
            return 'Donan sis';
        case 'Patchy light drizzle':
            return 'Yer yer hafif çiseleme';
        case 'Light drizzle':
            return 'Hafif çiseleme';
        case 'Freezing drizzle':
            return 'Donan çiseleme';
        case 'Heavy freezing drizzle':
            return 'Yoğun donan çiseleme';
        case 'Patchy light rain':
            return 'Yer yer hafif yağmur';
        case 'Light rain':
            return 'Hafif yağmur';
        case 'Moderate rain at times':
            return 'Zaman zaman orta şiddetli yağmur';
        case 'Moderate rain':
            return 'Orta şiddetli yağmur';
        case 'Heavy rain at times':
            return 'Zaman zaman yoğun yağmur';
        case 'Heavy rain':
            return 'Yoğun yağmur';
        case 'Light freezing rain':
            return 'Hafif donan yağmur';
        case 'Moderate or heavy freezing rain':
            return 'Orta veya yoğun donan yağmur';
        case 'Light sleet':
            return 'Hafif sulu kar';
        case 'Moderate or heavy sleet':
            return 'Orta veya yoğun sulu kar';
        case 'Patchy light snow':
            return 'Yer yer hafif kar';
        case 'Light snow':
            return 'Hafif kar';
        case 'Patchy moderate snow':
            return 'Yer yer orta şiddetli kar';
        case 'Moderate snow':
            return 'Orta şiddetli kar';
        case 'Patchy heavy snow':
            return 'Yer yer yoğun kar';
        case 'Heavy snow':
            return 'Yoğun kar';
        case 'Ice pellets':
            return 'Dolu';
        case 'Light rain shower':
            return 'Hafif yağmur sağanağı';
        case 'Moderate or heavy rain shower':
            return 'Orta veya yoğun yağmur sağanağı';
        case 'Torrential rain shower':
            return 'Şiddetli yağmur sağanağı';
        case 'Light sleet showers':
            return 'Hafif sulu kar sağanakları';
        case 'Moderate or heavy sleet showers':
            return 'Orta veya yoğun sulu kar sağanakları';
        case 'Light snow showers':
            return 'Hafif kar sağanakları';
        case 'Moderate or heavy snow showers':
            return 'Orta veya yoğun kar sağanakları';
        case 'Light showers of ice pellets':
            return 'Hafif dolu sağanakları';
        case 'Moderate or heavy showers of ice pellets':
            return 'Orta veya yoğun dolu sağanakları';
        case 'Patchy light rain with thunder':
            return 'Yer yer hafif yağmur ve gök gürültüsü';
        case 'Moderate or heavy rain with thunder':
            return 'Orta veya yoğun yağmur ve gök gürültüsü';
        case 'Patchy light snow with thunder':
            return 'Yer yer hafif kar ve gök gürültüsü';
        case 'Moderate or heavy snow with thunder':
            return 'Orta veya yoğun kar ve gök gürültüsü';
        default:
            return condition;
    }
}