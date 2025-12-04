/* ==================== API NAUDOJIMO PAVYZDŽIAI ==================== */

// API Užklausos Pavyzdžiai

/**
 * 1. LHMT API - Lietuvos Meteorologiniai Duomenys
 * 
 * Nuoroda: https://get.data.gov.lt/api/v1/datasets/gov/lhmt/stebejimai/Matavimas
 * 
 * Atribūtai:
 * - oro_temperatura: Temperatūra (°C)
 * - santykinė_drėgmė: Drėgmė (%)
 * - atmosferinis_slėgis: Slėgis (hPa)
 * - vėjo_greitis: Greitis (m/s)
 * - vėjo_kryptis: Kryptis (N, NE, E, SE, S, SW, W, NW)
 * - krituliai: Krituliai (mm)
 * - matomumas: Matomumas (km)
 * - jautimasis_kaip_temperatura: Jautimasis (°C)
 */

// Pavyzdys: LHMT API Užklausa
async function fetchLHMTExample() {
    try {
        const response = await fetch(
            'https://get.data.gov.lt/api/v1/datasets/gov/lhmt/stebejimai/Matavimas?format=json',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('LHMT Duomenys:', data);

        // Parsinguoti duomenis
        if (data.data && data.data.length > 0) {
            const latest = data.data[0];
            console.log({
                temperatūra: latest.oro_temperatura,
                drėgmė: latest.santykinė_drėgmė,
                slėgis: latest.atmosferinis_slėgis,
                vėlo_greitis: latest.vėjo_greitis
            });
        }

        return data;
    } catch (error) {
        console.error('LHMT API klaida:', error);
    }
}

/**
 * 2. Open-Meteo API - Pasauliniai Meteorologiniai Duomenys
 * 
 * Nuoroda: https://api.open-meteo.com/v1/forecast
 * 
 * Parametrai:
 * - latitude: Geografinė platuma
 * - longitude: Geografinė ilguma
 * - current: Dabartiniai duomenys
 * - timezone: Laiko zona (pvz., Europe/Vilnius)
 * 
 * Grąžinamų duomenų Tipai:
 * - temperature_2m: Temperatūra (°C)
 * - relative_humidity_2m: Drėgmė (%)
 * - apparent_temperature: Jautimasis (°C)
 * - precipitation: Krituliai (mm)
 * - weather_code: Oro kodas (WMO)
 * - wind_speed_10m: Vėlo greitis (m/s)
 * - wind_direction_10m: Vėlo kryptis (°)
 */

// Pavyzdys: Open-Meteo API Užklausa
async function fetchOpenMeteoExample() {
    try {
        // Vilnius koordinatės
        const latitude = 54.6872;
        const longitude = 25.2797;

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?` +
            `latitude=${latitude}` +
            `&longitude=${longitude}` +
            `&current=temperature_2m,relative_humidity_2m,apparent_temperature,` +
            `precipitation,weather_code,wind_speed_10m,wind_direction_10m` +
            `&hourly=temperature_2m,precipitation,weather_code` +
            `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code` +
            `&timezone=Europe/Vilnius`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Open-Meteo Duomenys:', data);

        // Parsinguoti dabartines sąlygas
        if (data.current) {
            console.log({
                temperatūra: data.current.temperature_2m,
                drėgmė: data.current.relative_humidity_2m,
                vėlo_greitis: data.current.wind_speed_10m,
                vėlo_kryptis: data.current.wind_direction_10m
            });
        }

        // Parsinguoti valandinę prognozę
        if (data.hourly) {
            console.log('Valandinė prognozė:', data.hourly.temperature_2m);
        }

        // Parsinguoti savaitės prognozę
        if (data.daily) {
            console.log('Savaitės prognozė:', {
                maxTemps: data.daily.temperature_2m_max,
                minTemps: data.daily.temperature_2m_min,
                krituliai: data.daily.precipitation_sum
            });
        }

        return data;
    } catch (error) {
        console.error('Open-Meteo API klaida:', error);
    }
}

/**
 * 3. WMO Oro Kodų Žinynas
 * 
 * Open-Meteo grąžinti kodai:
 */
const WMO_CODES = {
    0: 'Aiški',
    1: 'Beveik aiški',
    2: 'Iš dalies debesuota',
    3: 'Visiškai debesuota',
    45: 'Rūkuota',
    48: 'Šerkšno rūkuota',
    51: 'Šlapi šalčiai',
    53: 'Vidutiniai šlapti šalčiai',
    55: 'Sunkūs šlapti šalčiai',
    61: 'Šlapi lietus',
    63: 'Vidutinis šlapi lietus',
    65: 'Sunkūs šlapi lietus',
    71: 'Šlaptas sniegas',
    73: 'Vidutinis šlaptas sniegas',
    75: 'Sunkūs šlaptas sniegas',
    77: 'Snieguotas',
    80: 'Nedidelis lietus',
    81: 'Vidutinis lietus',
    82: 'Sunkūs lietus',
    85: 'Nedidelis snieguotas lietus',
    86: 'Sunkūs snieguotas lietus',
    95: 'Audra',
    96: 'Audra su krūmais',
    99: 'Audra su žaibais'
};

/**
 * 4. DUOMENŲ KEŠAVIMAS - Pavyzdys
 */
class WeatherCache {
    constructor(duration = 15 * 60 * 1000) {
        this.cache = new Map();
        this.duration = duration;
    }

    set(key, value) {
        this.cache.set(key, {
            value: value,
            timestamp: Date.now()
        });
    }

    get(key) {
        const item = this.cache.get(key);
        
        if (!item) return null;
        
        // Patikrinkite ar kešo trukmė nepraėjo
        if (Date.now() - item.timestamp > this.duration) {
            this.cache.delete(key);
            return null;
        }
        
        return item.value;
    }

    clear() {
        this.cache.clear();
    }
}

// Naudojimas:
const weatherCache = new WeatherCache(15 * 60 * 1000); // 15 minučių

async function getCachedWeather(location) {
    const cachedData = weatherCache.get(location);
    if (cachedData) {
        console.log('Grąžinami kešuoti duomenys iš:', location);
        return cachedData;
    }

    const data = await fetchOpenMeteoExample();
    weatherCache.set(location, data);
    return data;
}

/**
 * 5. GEOLOKACINIŲ KOORDINAČIŲ NAUDOJIMAS
 */
async function getUserLocation() {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    console.error('Geolokacija nepavyko:', error);
                    reject(error);
                }
            );
        } else {
            reject(new Error('Geolokacija nėra palaikoma'));
        }
    });
}

// Naudojimas:
async function fetchWeatherByUserLocation() {
    try {
        const location = await getUserLocation();
        const weatherUrl = 
            `https://api.open-meteo.com/v1/forecast?` +
            `latitude=${location.latitude}` +
            `&longitude=${location.longitude}` +
            `&current=temperature_2m,humidity,weather_code`;
        
        const response = await fetch(weatherUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Negalima gauti orų pagal vietovę:', error);
    }
}

/**
 * 6. KLAIDU TVARKYMASIS
 */
async function fetchWeatherWithErrorHandling(location) {
    try {
        // Bandyti LHMT API
        const lhmtResponse = await Promise.race([
            fetch('https://get.data.gov.lt/api/v1/datasets/gov/lhmt/stebejimai/Matavimas'),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('API timeout')), 5000)
            )
        ]);

        if (lhmtResponse.ok) {
            return await lhmtResponse.json();
        }

        // Jei LHMT nepavyksta, bandyti Open-Meteo
        console.warn('LHMT API nepavyko, naudojamas atsarginis API');
        const fallbackResponse = await fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=54.6872&longitude=25.2797&current=temperature_2m'
        );

        if (fallbackResponse.ok) {
            return await fallbackResponse.json();
        }

        throw new Error('Visi API nepavyko');

    } catch (error) {
        console.error('Kritinė klaida nusiunčiant orų duomenis:', error);
        return getMockData(); // Grąžinti mock duomenis
    }
}

/**
 * 7. REALAUS LAIKO DUOMENŲ ATNAUJINIMAI
 */
class WeatherUpdater {
    constructor(interval = 15 * 60 * 1000) {
        this.interval = interval;
        this.timerId = null;
        this.callback = null;
    }

    start(callback) {
        this.callback = callback;
        this.callback(); // Pasukti iš karto

        this.timerId = setInterval(async () => {
            this.callback();
        }, this.interval);
    }

    stop() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    setInterval(interval) {
        this.interval = interval;
        if (this.timerId) {
            this.stop();
            this.start(this.callback);
        }
    }
}

// Naudojimas:
const updater = new WeatherUpdater(15 * 60 * 1000);
updater.start(async () => {
    console.log('Atnaujinami orų duomenys...');
    await fetchWeatherWithErrorHandling('Vilnius');
});

/**
 * 8. DUOMENŲ TRANSFORMACIJA
 */
function transformWeatherData(rawData) {
    return {
        temperature: Math.round(rawData.current?.temperature_2m),
        humidity: rawData.current?.relative_humidity_2m,
        windSpeed: Math.round(rawData.current?.wind_speed_10m * 10) / 10,
        condition: getWeatherConditionText(rawData.current?.weather_code),
        feelsLike: Math.round(rawData.current?.apparent_temperature),
        sunrise: rawData.daily?.sunrise?.[0],
        sunset: rawData.daily?.sunset?.[0],
        forecast: rawData.daily
    };
}

function getWeatherConditionText(code) {
    return WMO_CODES[code] || 'Nežinoma';
}

/**
 * 9. IŠVEDIMAS I KONSOLE
 */
function logWeatherDebug(data) {
    console.group('🌤️ Orų Duomenys - Debug');
    console.table({
        'Temperatūra': data.temperature + '°C',
        'Drėgmė': data.humidity + '%',
        'Vėlo greitis': data.windSpeed + ' m/s',
        'Sąlyga': data.condition,
        'Jautiesi': data.feelsLike + '°C'
    });
    console.groupEnd();
}

/**
 * 10. PERFORMANCE MONITORING
 */
function measureAPIPerformance(apiName, promise) {
    const start = performance.now();
    
    return promise
        .then(result => {
            const end = performance.now();
            console.log(`${apiName} API: ${(end - start).toFixed(2)}ms`);
            return result;
        })
        .catch(error => {
            const end = performance.now();
            console.error(`${apiName} API klaida: ${(end - start).toFixed(2)}ms`);
            throw error;
        });
}

// Naudojimas:
measureAPIPerformance('Open-Meteo', fetchOpenMeteoExample());

/**
 * VISAS PAVYZDYS - SĄRYŠYS TRP
 */
async function completeWeatherFlow() {
    console.log('🚀 Pradedamas orų duomenų nusisiuntimas...');

    try {
        // 1. Bandyti nusisiųsti duomenis
        const rawData = await fetchWeatherWithErrorHandling('Vilnius');

        // 2. Transformuoti duomenis
        const processedData = transformWeatherData(rawData);

        // 3. Išvesti rezultatus
        logWeatherDebug(processedData);

        // 4. Saugoti kešą
        weatherCache.set('Vilnius', processedData);

        // 5. Grąžinti datos
        return processedData;

    } catch (error) {
        console.error('❌ Klaida atliekant operaciją:', error);
    }
}

// ===================== PALEISTA =====================
console.log('💡 API užklausų pavyzdžiai sukonfigūruoti');
console.log('Išbandykite: completeWeatherFlow()');
