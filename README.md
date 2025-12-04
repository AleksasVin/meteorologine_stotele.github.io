# 🌡️ Meteorologinė Orų Stotis - Modernus Internetinis Taikymas

Visapusiškas, moderni meteorologinė stotis su animacijomis ir realiais LHMT duomenimis.

## ✨ Pagrindinės Savybės

### 🎨 Dizainas & Sąsaja
- **Tamsi tema** su gradientiniais akcentais (#00d4ff)
- **Animacijos** ir perejimai (fadeIn, slideUp, float, iconFloat)
- **Stiklinis efektas** (glassmorphism) su backdrop-filter
- **Visiškai reagiuojantis** dizainas (mobile, tablet, desktop)
- **Lengva tema** - pasirinkimai nustatymuose

### 📊 Pagrindiniai Komponentai

#### 🏠 Pagrindinis Puslapis
- Dabartinės oro sąlygos ekranas
- Temperatūros rodymas (esama, minimali, maksimali)
- Vėjo greitis ir kryptis
- Drėgmės procentas su juosta
- Atmosferinis slėgis (hPa)
- Krituliai (mm)
- Matomas atstumas (km)
- Saulės tekėjimas/leidimasis
- Paskutinio atnaujinimo laikas

#### 📈 Prognozės Puslapis
- **Valandinė prognozė**: 24 val. rodymui
- **7 dienų prognozė**: Detali pamaininė prognozė
- Temperaturų diapazonai (max/min)
- Oro sąlygų aprašai
- Kritulių prognozės

#### 📉 Istoriniai Duomenys
- **Interaktyvūs grafikai** su Chart.js
- Temperatūros grafiko (30 dienų)
- Drėgmės grafiko
- Slėgio grafiko
- Pasirinktini datos diapazonai

#### 🗺️ Meteorologinės Stotys
- Stočių sąrašas su koordinatėmis
- Realaus laiko duomenys iš kiekvienos stoties
- Interaktyvi stočių karta (išplėtima ateityje)
- Stočių palyginimas

#### ⚙️ Nustatymai
- Vietos pasirinkimas (Vilnius, Kaunas, Klaipėda, Šiauliai)
- Atnaujinimo intervalas (5, 15, 30, 60 min)
- Temos pasirinkimas (tamsi/šviesla)
- Perspėjimų įjungimas/išjungimas
- **Mėgstamos vietos** - greitas prieiga
- Nustatymų saugojimas lokalinėje atmintyje

### 🔄 API Integracija

#### Pirminiai šaltiniai
1. **LHMT API** (Lietuvos hidrometeorologijos tarnyba)
   - URL: `https://get.data.gov.lt/api/v1/datasets/gov/lhmt/stebejimai/Matavimas`
   - Realūs duomenys iš Lietuvos stočių

2. **Open-Meteo API** (atsarginis šaltinis)
   - URL: `https://api.open-meteo.com/v1/forecast`
   - Pasauliniai meteorologiniai duomenys
   - Nereikalingas API raktazodis

#### Duomenų kešavimas
- 15 minučių kešo trukmė
- Automatinis atnaujinimas
- Vietinės saugyklos (localStorage) palaikymas

### 🌐 Lietuvos Kalbos Palaikymas

Visa turinio versija lietuvių kalba:
- ✓ Visų etikečių ir mygtukai
- ✓ Dienų pavadiniai (Pirmadienis, Antradienis, etc.)
- ✓ Oro aprašai (Saulėta, Debesuota, Šlaptas, etc.)
- ✓ Visos klaidos ir pranešimai
- ✓ Laiko formatas (24 val. sistema)

### 💾 Vietos Nustatymai

Palaikomos vietos:
- Vilnius (54.6872°N, 25.2797°E)
- Kaunas (54.9041°N, 23.9613°E)
- Klaipėda (55.7186°N, 21.1447°E)
- Šiauliai (55.9333°N, 23.3167°E)

### 📱 Responzyvus Dizainas

**Taškai lūžio:**
- **Staliniai kompiuteriai**: > 1024px (visas funkcionalumas)
- **Planšetės**: 768px - 1024px (prilaginti meniu)
- **Mobilūs įrenginiai**: < 768px (optimizuoti dydžiai)
- **Maži ekranai**: < 480px (suglaudinti rodiniai)

### 🎯 JavaScript Funkcionalumas

#### Navigacija
- SPA (Single Page Application) architektūra
- Sklandus puslapių persijungimas
- Aktyvios nuorodos žymėjimas
- Paieškos parametrų palaikymas

#### Atnaujinimai & Šalyntinis Ryšys
- Automatinis duomenų atnaujinimas
- Rankinis atnaujinimas (🔄 mygtukas)
- Klaidos tvarkymasis ir informavimas
- Toast pranešimai

#### Vietinė Saugykla
- Išsaugoti nustatymai
- Mėgstamų vietų sąrašas
- Temos pasirinkimas
- Šalyntinis ryšys nustatymai

### 🎨 CSS Organizacija

Modulinė CSS struktūra:
- CSS kintamieji (spalvos, šriftai, tarpai)
- Animacijos (@keyframes)
- Žaliuzės klasės (utility classes)
- Prieinamumas (ARIA, keyboard nav)

## 📁 Failų Struktūra

```
metorologinis/
├── index.html          # HTML struktūra
├── style.css           # CSS stiliai & animacijos
├── script.js           # JavaScript logika & API
└── README.md           # Šis failas
```

## 🚀 Pradžia

### Reikalavimai
- Šiuolaikinis interneto naršyklė su ES6 palaikymu
- Interneto ryšys LHMT/Open-Meteo API
- Chart.js biblioteka (CDN nuoroda)

### Diegimas
1. Atsisiųskite/klonuokite visus failus
2. Atidarykite `index.html` interneto naršyklėje
3. Programėlė automatiškai nusiunčia duomenis

### Vietinis Serveris (rekomenduo)
```bash
# Python 3
python -m http.server 8000

# Node.js http-server
npx http-server

# Tada atsidarykite: http://localhost:8000
```

## 🔧 Konfigūracija

Redaguoti `script.js` failą:

```javascript
const CONFIG = {
    API_LHMT: 'https://get.data.gov.lt/api/v1/datasets/gov/lhmt/stebejimai/Matavimas',
    FALLBACK_API: 'https://api.open-meteo.com/v1/forecast',
    CACHE_DURATION: 15 * 60 * 1000, // Keisti kaip reikia
    REFRESH_INTERVAL: 15 * 60 * 1000, // Atnaujinimo intervalas
    LOCATION: { /* pridėti naujų vietų */ }
};
```

## 📊 Duomenų Šaltiniai

### LHMT (Pirminė)
- Real-time duomenys iš Lietuvos stočių
- Meteorologiniai parametrai
- Istoriniai duomenys

### Open-Meteo (Atsarginis)
- 7 dienų prognozė
- Globalūs duomenys
- Nereikalingas registracija

## 🎓 Technologijos

- **HTML5**: Semantinis markup
- **CSS3**: Gridai, flexbox, animacijos
- **JavaScript (ES6+)**: Asinchroninis, async/await
- **Chart.js**: Duomenų vizualizacija
- **Fetch API**: Duomenų nusisiuntimai
- **LocalStorage**: Vietos duomenų saugojimas

## ⚡ Optimizacija

- Efektyvus kešavimas
- Sumažintas DOM manipuliavimas
- Animacijos GPU pagreitis
- Mobiliųjų įrenginių optimizacija
- Prieinamumas (WCAG 2.1)

## 🐛 Žinomos Problemos & Tobulinimas

### Dabartinis
- ✓ LHMT API integracija
- ✓ Atsarginis API
- ✓ Interaktyvūs grafikai
- ✓ Mėgstamų vietų saugojimas

### Ateityje
- [ ] Žemėlapio integracija (Leaflet/Mapbox)
- [ ] Ore kokybės indeksas
- [ ] Perspėjimai apie orų grėsmes
- [ ] Palyginimas tarp stočių
- [ ] Fotometrija
- [ ] Grėsmingumo laipsnis

## 📝 Licencija

Atvirojo kodo projektas. Laisvai naudoti ir modifikuoti.

## 👨‍💻 Autorius

Sukurta su ❤️ Lietuvos orų stebėjimo gerinimui

---

**Pasitikrinkite**: Šis projektas aktyviai naudoja LHMT API. Žiūrėkite jų dokumentaciją dėl API limitų ir vartotojo sutarčių.
