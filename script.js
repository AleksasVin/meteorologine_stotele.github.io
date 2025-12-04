/* ==================== GLOBAL CONFIGURATION ==================== */
const CONFIG = {
    API_WEATHER: 'https://api.weatherapi.com/v1',
    API_KEY: '1b42b4e51c3d46a5abb164036250112',
    CACHE_DURATION: 15 * 60 * 1000, // 15 minutes
    REFRESH_INTERVAL: 15 * 60 * 1000, // 15 minutes
    LOCATION: {
        'Vilnius': { lat: 54.6872, lon: 25.2797 },
        'Kaunas': { lat: 54.9041, lon: 23.9613 },
        'Klaipėda': { lat: 55.7186, lon: 21.1447 },
        'Šiauliai': { lat: 55.9333, lon: 23.3167 }
    },
    LITHUANIAN_DAYS: ['Sekmadienis', 'Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis']
};

let weatherData = {
    current: null,
    forecast: null,
    historical: [],
    stations: []
};

let cacheData = {};
let refreshInterval = null;

/* ==================== INITIALIZATION ==================== */
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupEventListeners();
    loadSettings();
    fetchWeatherData();
    setupAutoRefresh();
    hideLoader();
}

function hideLoader() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
}

/* ==================== NAVIGATION ==================== */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateToPage(page);
        });
    });
}

function navigateToPage(page) {
    // Update active page
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    document.getElementById(page).classList.add('active');

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-page="${page}"]`).classList.add('active');

    // Load page-specific data
    if (page === 'forecast') {
        updateForecastPage();
    } else if (page === 'historical') {
        updateHistoricalPage();
    } else if (page === 'map') {
        updateMapPage();
    }
}

/* ==================== EVENT LISTENERS ==================== */
function setupEventListeners() {
    // Refresh button
    document.getElementById('refresh-btn').addEventListener('click', refreshWeatherData);

    // Location change
    document.getElementById('location').addEventListener('change', (e) => {
        const selectedLocation = e.target.value;
        localStorage.setItem('weatherLocation', selectedLocation);
        fetchWeatherData();
        showToast(`📍 Vieta pakeista: ${selectedLocation}`, 'success');
    });

    // Forecast tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = e.target.dataset.tab;
            switchForecastTab(tabName);
        });
    });

    // Settings form
    document.getElementById('settings-form').addEventListener('submit', handleSettingsSubmit);

    // Add favorite button
    document.getElementById('add-favorite').addEventListener('click', addFavoriteLocation);
}

/* ==================== API DATA FETCHING ==================== */
async function fetchWeatherData() {
    try {
        const location = localStorage.getItem('weatherLocation') || 'Vilnius';
        
        // Fetch data from WeatherAPI.com
        const weatherAPIData = await fetchWeatherAPIData(location);
        if (weatherAPIData) {
            weatherData.current = weatherAPIData;
            updateCurrentWeather(weatherAPIData);
        }
        
        // Generate mock forecast data based on current data
        generateForecastData();
        updateForecastPage();
        
        // Update historical data
        generateHistoricalData();
        updateHistoricalPage();
        
        // Update stations
        generateStationsData();
        updateMapPage();
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showToast('Klaida nusiunčiant duomenis', 'error');
        loadMockData();
    }
}

async function fetchWeatherAPIData(location) {
    try {
        const response = await fetch(
            `${CONFIG.API_WEATHER}/current.json?key=${CONFIG.API_KEY}&q=${location}&aqi=yes`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }
        );
        
        if (!response.ok) {
            console.error('WeatherAPI HTTP error:', response.status);
            return null;
        }
        
        const data = await response.json();
        
        // Fetch forecast for sunrise/sunset
        try {
            const forecastResponse = await fetch(
                `${CONFIG.API_WEATHER}/forecast.json?key=${CONFIG.API_KEY}&q=${location}&days=1&aqi=no`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            );
            
            if (forecastResponse.ok) {
                const forecastData = await forecastResponse.json();
                data.forecast = forecastData.forecast;
            }
        } catch (error) {
            console.error('Forecast fetch error:', error);
        }
        
        return parseWeatherAPIData(data, location);
    } catch (error) {
        console.error('WeatherAPI fetch error:', error);
        return null;
    }
}

function parseWeatherAPIData(data, location) {
    if (!data || !data.current) return null;

    const current = data.current;
    const translatedCondition = translateWeatherCondition(current.condition.text);

    // Extract sunrise/sunset from forecast if available, otherwise use default
    let sunrise = '06:30';
    let sunset = '20:45';
    
    if (data.forecast && data.forecast.forecastday && data.forecast.forecastday[0]) {
        const astro = data.forecast.forecastday[0].astro;
        sunrise = convertTo24HourFormat(astro.sunrise);
        sunset = convertTo24HourFormat(astro.sunset);
    }

    return {
        temperature: Math.round(current.temp_c),
        humidity: current.humidity,
        pressure: Math.round(current.pressure_mb),
        windSpeed: Math.round(current.wind_kph / 3.6 * 10) / 10, // Convert to m/s
        windDirection: current.wind_dir,
        precipitation: current.precip_mm,
        visibility: current.vis_km,
        feelsLike: Math.round(current.feelslike_c),
        condition: translatedCondition,
        icon: current.condition.icon,
        sunrise: sunrise,
        sunset: sunset,
        location: data.location?.name || location,
        uvIndex: current.uv,
        gustSpeed: Math.round(current.gust_kph / 3.6 * 10) / 10
    };
}

function convertTo24HourFormat(time12h) {
    // Convert 12-hour format (e.g., "3:57 PM") to 24-hour format (e.g., "15:57")
    if (!time12h) return '--:--';
    
    const match = time12h.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return time12h; // Return as-is if format doesn't match
    
    let hours = parseInt(match[1], 10);
    const minutes = match[2];
    const period = match[3].toUpperCase();
    
    // Convert to 24-hour format
    if (period === 'PM' && hours !== 12) {
        hours += 12;
    } else if (period === 'AM' && hours === 12) {
        hours = 0;
    }
    
    // Format with leading zeros
    return `${String(hours).padStart(2, '0')}:${minutes}`;
}

function translateWeatherCondition(condition) {
    const translations = {
        'Sunny': 'Saulėta',
        'Clear': 'Aiški',
        'Partly cloudy': 'Mažai debesuota',
        'Cloudy': 'Debesuota',
        'Overcast': 'Labai debesuota',
        'Mist': 'Rūkas',
        'Patchy rain nearby': 'Lietus šalia',
        'Patchy snow nearby': 'Sniegas šalia',
        'Patchy sleet nearby': 'Šlapdriba šalia',
        'Patchy freezing drizzle nearby': 'Šerkštas šalia',
        'Thundery outbreaks possible': 'Galima perkūnija',
        'Blizzard': 'Sniego audra',
        'Light drizzle': 'Rasa',
        'Light rain': 'Trumpas lietus',
        'Light snow': 'Lengvas sniegas',
        'Light sleet': 'Lengva šlapdriba',
        'Light rain shower': 'Trumpas lietus',
        'Light snow showers': 'Trumpas sniegas',
        'Moderate or heavy rain shower': 'Stiprus lietus',
        'Moderate or heavy snow shower': 'Stiprus sniegas',
        'Moderate or heavy sleet shower': 'Stipri šlapdriba',
        'Moderate rain': 'Vidutinis lietus',
        'Moderate snow': 'Vidutinis sniegas',
        'Heavy rain': 'Stiprus lietus',
        'Heavy snow': 'Stiprus sniegas',
        'Light freezing rain': 'Šerkštas',
        'Moderate or heavy freezing rain': 'Šerkštas',
        'Light sleet showers': 'Sniegputra',
        'Moderate or heavy sleet showers': 'Sniegputra',
        'Torrential rain shower': 'Liūtis',
        'Fog': 'Migla'
    };
    
    return translations[condition] || condition || 'Nežinoma';
}

function getWeatherEmoji(condition) {
    const emojiMap = {
        'Saulėta': '☀️',
        'Giedra naktį': '🌙',
        'Mažai debesuota': '🌤️',
        'Debesuota': '☁️',
        'Labai debesuota': '🌥️',
        'Rūkas': '☁️',
        'Lietus šalia': '🌧️',
        'Sniegas šalia': '❄️',
        'Šlapdriba šalia': '🌨️',
        'Šerkštas šalia': '🌨️',
        'Galima perkūnija': '⛈️',
        'Sniego audra': '❄️💨',
        'Rasa': '💧',
        'Dulksna': '💨',
        'Lengvas sniegas': '❄️',
        'Lengva šlapdriba': '🌨️',
        'Trumpas lietus': '🌦️',
        'Trumpas sniegas': '🌨️',
        'Stiprus lietus': '🌧️',
        'Stiprus sniegas': '❄️🌨️',
        'Stipri šlapdriba': '🌨️💨',
        'Vidutinis lietus': '🌧️',
        'Vidutinis sniegas': '❄️',
        'Liūtis': '⛈️',
        'Pilė': '🌧️💨',
        'Sniegputra': '❄️💨',
        'Šlapdriba': '🌨️',
        'Šerkštas': '🌨️💧',
        'Migla': '☁️',
        'Nežinoma': '🌡️'
    };
    
    return emojiMap[condition] || '🌡️';
}

function loadMockData() {
    weatherData.current = {
        temperature: 15,
        humidity: 65,
        pressure: 1013,
        windSpeed: 3.5,
        windDirection: 'SW',
        precipitation: 0,
        visibility: 10,
        feelsLike: 14,
        condition: 'Gražus oras',
        sunrise: '06:30',
        sunset: '20:45',
        location: 'Vilnius'
    };
    generateForecastData();
    generateHistoricalData();
    generateStationsData();
}

function generateForecastData() {
    const now = new Date();
    const hourly = [];
    const daily = [];

    // Generate hourly forecast
    for (let i = 0; i < 24; i++) {
        const time = new Date(now.getTime() + i * 60 * 60 * 1000);
        const temp = Math.round(weatherData.current.temperature + Math.random() * 5 - 2.5);
        hourly.push({
            time: time.toLocaleTimeString('lt-LT', { hour: '2-digit', minute: '2-digit' }),
            temp: temp,
            condition: ['Saulėta', 'Iš dalies debesuota', 'Debesuota'][Math.floor(Math.random() * 3)],
            icon: ['☀️', '⛅', '☁️'][Math.floor(Math.random() * 3)]
        });
    }

    // Generate daily forecast
    for (let i = 0; i < 7; i++) {
        const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
        const dayName = CONFIG.LITHUANIAN_DAYS[date.getDay()];
        const tempMax = Math.round(weatherData.current.temperature + Math.random() * 8 - 2);
        const tempMin = Math.round(tempMax - (Math.random() * 5 + 3));
        daily.push({
            date: date.toLocaleDateString('lt-LT'),
            day: i === 0 ? 'Šiandien' : i === 1 ? 'Rytoj' : dayName,
            tempMax: tempMax,
            tempMin: tempMin,
            condition: ['Saulėta', 'Iš dalies debesuota', 'Debesuota'][Math.floor(Math.random() * 3)],
            icon: ['☀️', '⛅', '☁️'][Math.floor(Math.random() * 3)],
            precipitation: Math.random() * 10
        });
    }

    weatherData.forecast = { hourly, daily };
}

function generateHistoricalData() {
    const data = [];
    const baseTemp = weatherData.current?.temperature || 15;
    const baseHumidity = weatherData.current?.humidity || 65;
    const basePressure = weatherData.current?.pressure || 1013;
    
    // Generate more realistic historical data based on current conditions
    for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Create gradual temperature variations
        const tempVariation = Math.sin(i / 5) * 3 + (Math.random() * 4 - 2);
        // Create gradual humidity variations
        const humidityVariation = Math.cos(i / 5) * 10 + (Math.random() * 5 - 2.5);
        // Create gradual pressure variations
        const pressureVariation = Math.sin(i / 8) * 5 + (Math.random() * 3 - 1.5);
        
        data.push({
            date: date.toLocaleDateString('lt-LT'),
            temp: Math.round(baseTemp + tempVariation),
            humidity: Math.max(20, Math.min(100, Math.round(baseHumidity + humidityVariation))),
            pressure: Math.max(980, Math.min(1050, Math.round(basePressure + pressureVariation)))
        });
    }
    weatherData.historical = data;
}

async function generateStationsData() {
    const stations = [];
    
    // Fetch real weather data for each station
    for (const [name, coords] of Object.entries(CONFIG.LOCATION)) {
        try {
            const response = await fetch(
                `${CONFIG.API_WEATHER}/current.json?key=${CONFIG.API_KEY}&q=${name}&aqi=yes`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            );
            
            if (response.ok) {
                const data = await response.json();
                const current = data.current;
                
                stations.push({
                    name: name,
                    lat: coords.lat,
                    lon: coords.lon,
                    temperature: Math.round(current.temp_c),
                    humidity: current.humidity,
                    pressure: Math.round(current.pressure_mb),
                    condition: translateWeatherCondition(current.condition.text),
                    windSpeed: Math.round(current.wind_kph / 3.6 * 10) / 10,
                    lastUpdate: new Date().toLocaleTimeString('lt-LT')
                });
            } else {
                // Fallback if API call fails
                stations.push({
                    name: name,
                    lat: coords.lat,
                    lon: coords.lon,
                    temperature: Math.round(weatherData.current?.temperature || 15),
                    humidity: weatherData.current?.humidity || 65,
                    pressure: weatherData.current?.pressure || 1013,
                    condition: 'Nežinoma',
                    windSpeed: 0,
                    lastUpdate: new Date().toLocaleTimeString('lt-LT')
                });
            }
        } catch (error) {
            console.error(`Error fetching data for ${name}:`, error);
            // Fallback data
            stations.push({
                name: name,
                lat: coords.lat,
                lon: coords.lon,
                temperature: Math.round(weatherData.current?.temperature || 15),
                humidity: weatherData.current?.humidity || 65,
                pressure: weatherData.current?.pressure || 1013,
                condition: 'Nežinoma',
                windSpeed: 0,
                lastUpdate: new Date().toLocaleTimeString('lt-LT')
            });
        }
    }
    
    weatherData.stations = stations;
}

/* ==================== UPDATE UI ==================== */
function updateCurrentWeather(data) {
    if (!data) return;

    document.getElementById('location-name').textContent = `${data.location}, Lietuva`;
    document.getElementById('current-temp').textContent = data.temperature;
    document.getElementById('weather-condition').textContent = data.condition;
    document.getElementById('weather-description').textContent = `Juntamoji temperatūra: ${data.feelsLike}°C`;
    
    // Update weather icon emoji
    document.getElementById('weather-icon-emoji').textContent = getWeatherEmoji(data.condition);
    
    document.getElementById('wind-speed').textContent = `${data.windSpeed} m/s`;
    document.getElementById('wind-direction').textContent = `Kryptis: ${data.windDirection}`;
    
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('humidity-fill').style.width = `${data.humidity}%`;
    
    document.getElementById('feels-like').textContent = `${data.feelsLike}°C`;
    document.getElementById('pressure').textContent = `${data.pressure} hPa`;
    document.getElementById('precipitation').textContent = `${data.precipitation} mm`;
    document.getElementById('visibility').textContent = `${data.visibility} km`;
    
    document.getElementById('sunrise').textContent = data.sunrise;
    document.getElementById('sunset').textContent = data.sunset;
    
    document.getElementById('last-update').textContent = `Paskutinis atnaujinimas: ${new Date().toLocaleTimeString('lt-LT')}`;
}

function updateForecastPage() {
    if (!weatherData.forecast) return;

    // Update hourly forecast
    const hourlyContainer = document.getElementById('hourly-forecast');
    hourlyContainer.innerHTML = '';
    
    weatherData.forecast.hourly.slice(0, 24).forEach(hour => {
        const card = document.createElement('div');
        card.className = 'forecast-item';
        card.innerHTML = `
            <div class="forecast-time">${hour.time}</div>
            <div class="forecast-icon">${hour.icon}</div>
            <div class="forecast-temp">${hour.temp}°C</div>
            <div class="forecast-condition">${hour.condition}</div>
        `;
        hourlyContainer.appendChild(card);
    });

    // Update daily forecast
    const dailyContainer = document.getElementById('daily-forecast');
    dailyContainer.innerHTML = '';
    
    weatherData.forecast.daily.forEach(day => {
        const card = document.createElement('div');
        card.className = 'daily-forecast-item';
        card.innerHTML = `
            <div class="forecast-day">${day.day}</div>
            <div class="forecast-icon">${day.icon}</div>
            <div class="forecast-temps">
                <span class="temp-high">${day.tempMax}°</span>
                <span class="temp-low">${day.tempMin}°</span>
            </div>
            <div class="forecast-condition">${day.condition}</div>
            <div class="forecast-condition" style="font-size: 0.8rem; margin-top: 0.5rem;">💧 ${Math.round(day.precipitation)}mm</div>
        `;
        dailyContainer.appendChild(card);
    });
}

function switchForecastTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(`${tab}-tab`).classList.add('active');
}

function updateHistoricalPage() {
    if (!weatherData.historical || weatherData.historical.length === 0) return;

    createChart('temperature-chart', 'Temperatūra (°C)', weatherData.historical.map(d => d.temp), 'rgba(0, 212, 255, 0.8)');
    createChart('humidity-chart', 'Drėgmė (%)', weatherData.historical.map(d => d.humidity), 'rgba(0, 255, 136, 0.8)');
    createChart('pressure-chart', 'Slėgis (hPa)', weatherData.historical.map(d => d.pressure), 'rgba(255, 170, 0, 0.8)');
}

function createChart(canvasId, label, data, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.chartInstances && window.chartInstances[canvasId]) {
        window.chartInstances[canvasId].destroy();
    }

    if (!window.chartInstances) window.chartInstances = {};

    window.chartInstances[canvasId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: weatherData.historical.map(d => d.date),
            datasets: [{
                label: label,
                data: data,
                borderColor: color,
                backgroundColor: color.replace('0.8', '0.1'),
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: color,
                pointBorderColor: '#0f0f0f',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#b0b0b0',
                        font: { size: 12 }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#b0b0b0' },
                    grid: { color: 'rgba(51, 51, 51, 0.3)' }
                },
                y: {
                    ticks: { color: '#b0b0b0' },
                    grid: { color: 'rgba(51, 51, 51, 0.3)' }
                }
            }
        }
    });
}

function updateMapPage() {
    const stationsList = document.getElementById('stations-list');
    stationsList.innerHTML = '';

    weatherData.stations.forEach(station => {
        const stationCard = document.createElement('div');
        stationCard.className = 'station-item';
        stationCard.innerHTML = `
            <div class="station-name">${station.name}</div>
            <div class="station-coords">📍 ${station.lat.toFixed(2)}, ${station.lon.toFixed(2)}</div>
            <div class="station-data">
                <div>🌡️ ${station.temperature}°</div>
                <div>💧 ${station.humidity}%</div>
                <div>🔽 ${station.pressure}hPa</div>
                <div>💨 ${station.windSpeed}m/s</div>
            </div>
            <div style="margin-top: 0.5rem; font-size: 0.75rem; color: var(--text-secondary); padding: 0.3rem 0.4rem; background: rgba(0,0,0,0.2); border-radius: 0.3rem; text-align: center;">
                🌥️ ${station.condition}
            </div>
            <div style="margin-top: 0.3rem; font-size: 0.65rem; color: var(--text-secondary); text-align: center;">
                ${station.lastUpdate}
            </div>
        `;
        stationsList.appendChild(stationCard);
    });
    
    // Initialize map
    initializeMap();
}

function initializeMap() {
    // Destroy existing map if it exists
    if (window.weatherMap) {
        window.weatherMap.remove();
    }
    
    // Create map centered on Lithuania
    const mapContainer = document.getElementById('map-container');
    window.weatherMap = L.map(mapContainer).setView([55.1694, 23.8813], 7);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(window.weatherMap);
    
    // Add markers for each station
    if (weatherData.stations && weatherData.stations.length > 0) {
        weatherData.stations.forEach(station => {
            const marker = L.marker([station.lat, station.lon]).addTo(window.weatherMap);
            
            const popupContent = `
                <div style="font-size: 0.9rem; min-width: 200px;">
                    <strong>${station.name}</strong><br>
                    🌡️ Temp: ${station.temperature}°C<br>
                    💧 Drėgmė: ${station.humidity}%<br>
                    🔽 Slėgis: ${station.pressure} hPa<br>
                    💨 Vėjas: ${station.windSpeed} m/s<br>
                    🌥️ ${station.condition}<br>
                    <small>Atnaujinta: ${station.lastUpdate}</small>
                </div>
            `;
            marker.bindPopup(popupContent);
        });
    }
}

/* ==================== SETTINGS ==================== */
function loadSettings() {
    const location = localStorage.getItem('weatherLocation') || 'Vilnius';
    const interval = localStorage.getItem('refreshInterval') || '15';
    const theme = localStorage.getItem('theme') || 'dark';
    const notifications = localStorage.getItem('notifications') !== 'false';

    document.getElementById('location').value = location;
    document.getElementById('refresh-interval').value = interval;
    document.getElementById('theme').value = theme;
    document.getElementById('notifications').checked = notifications;

    applyTheme(theme);
    loadFavoritesFromStorage();
}

function handleSettingsSubmit(e) {
    e.preventDefault();

    const location = document.getElementById('location').value;
    const interval = document.getElementById('refresh-interval').value;
    const theme = document.getElementById('theme').value;
    const notifications = document.getElementById('notifications').checked;

    localStorage.setItem('weatherLocation', location);
    localStorage.setItem('refreshInterval', interval);
    localStorage.setItem('theme', theme);
    localStorage.setItem('notifications', notifications);

    applyTheme(theme);
    
    showToast('✓ Nustatymai išsaugoti', 'success');
    
    // Refresh data with new location
    fetchWeatherData();
    
    // Update refresh interval
    setupAutoRefresh();
}

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
}

function addFavoriteLocation() {
    const location = prompt('Įvesti vietovės pavadinimą:');
    if (location && Object.keys(CONFIG.LOCATION).includes(location)) {
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!favorites.includes(location)) {
            favorites.push(location);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            loadFavoritesFromStorage();
            showToast(`✓ ${location} pridėta į mėgstamas vietas`, 'success');
        } else {
            showToast('Ši vieta jau yra sąraše', 'info');
        }
    } else if (location) {
        showToast('Vieta nerasta. Pasirinkite iš: ' + Object.keys(CONFIG.LOCATION).join(', '), 'error');
    }
}

function loadFavoritesFromStorage() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = '';

    favorites.forEach(fav => {
        const item = document.createElement('div');
        item.className = 'favorite-item';
        item.innerHTML = `
            ${fav}
            <button class="favorite-remove" onclick="removeFavorite('${fav}')">✕</button>
        `;
        item.addEventListener('click', () => {
            document.getElementById('location').value = fav;
            fetchWeatherData();
        });
        favoritesList.appendChild(item);
    });
}

function removeFavorite(location) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites = favorites.filter(fav => fav !== location);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavoritesFromStorage();
    showToast(`${location} pašalinta iš mėgstamų`, 'success');
}

/* ==================== REFRESH & AUTO-UPDATE ==================== */
function setupAutoRefresh() {
    if (refreshInterval) clearInterval(refreshInterval);

    const interval = parseInt(localStorage.getItem('refreshInterval') || '15');
    refreshInterval = setInterval(refreshWeatherData, interval * 60 * 1000);
}

async function refreshWeatherData() {
    const btn = document.getElementById('refresh-btn');
    btn.classList.add('loading');
    
    try {
        await fetchWeatherData();
        showToast('✓ Duomenys atnaujinti', 'success');
    } catch (error) {
        showToast('Klaida atnaujinant duomenis', 'error');
    } finally {
        btn.classList.remove('loading');
    }
}

/* ==================== NOTIFICATIONS ==================== */
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
