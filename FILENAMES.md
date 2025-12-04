# 📋 METEOROLOGINĖS STOTYS - FAILŲ ŽINYNAS

## 📂 Projekto Struktūra

```
metorologinis/
│
├── 🌐 INTERNETO PUSLAPIAI (Pagrindinis)
│   ├── index.html              (256 eilučių, 11.26 KB)
│   ├── style.css               (800+ eilučių, 24.14 KB)
│   └── script.js               (600+ eilučių, 21.95 KB)
│
├── 📚 DOKUMENTACIJA & VADOVĖLIAI
│   ├── QUICK_START.md          ← PRADĖKITE ČIA! (Greita pradžia)
│   ├── README.md               (Pilna dokumentacija)
│   ├── GUIDE.md                (Greitoji vadovėlis)
│   ├── COMPLETE_SUMMARY.md     (Išsami apžvalga)
│   └── FILENAMES.md            (Šis failas)
│
├── 💻 KODŲ PAVYZDŽIAI
│   └── API_EXAMPLES.js         (API naudojimo pavyzdžiai)
│
└── 📊 STATISTIKA
    └── Bendras Dydis: ~97 KB
        - HTML: 11 KB
        - CSS: 24 KB
        - JavaScript: 22 KB
        - Dokumentacija: 28 KB
```

---

## 📄 FAILŲ APRAŠYMAS

### 🔴 PAGRINDINIAI FAILAI (Reikalingi darbui)

#### `index.html` (11.26 KB) - ATIDARYKITE ŠĮ!
**Naudojimas**: Pagrindinė puslapio nuoroda  
**Turinys**:
- HTML5 semantinis markup
- 5 pagrindiniai puslapiai (Home, Forecast, Historical, Map, Settings)
- Loader animacija
- Toast pranešimų konteineris
- Chart.js CDN nuoroda
- CSS ir JavaScript nuorodos

**Linijos**: 256  
**Naudojimo**: Tiesioginė naršyklėje

---

#### `style.css` (24.14 KB) - Visas Dizainas
**Naudojimas**: Visas CSS stiliai ir animacijos  
**Turinys**:
- CSS kintamiai (spalvos, šriftai, raštai)
- Loader stiliai ir animacija
- Header ir navigacijos stiliai
- Kortelių ir komponentų stiliai
- 30+ CSS animacijos (@keyframes)
- Responsive taškai (4 breakpoints)
- Tamsi & Šviesla tema

**Linijos**: 800+  
**Animacijos**: slideUp, fadeIn, float, spin, pulse, bounce, shimmer, itd.

---

#### `script.js` (21.95 KB) - Visa Logika
**Naudojimas**: JavaScript funkcionalumas  
**Turinys**:
- LHMT API integracija
- Open-Meteo atsarginis API
- Duomenų kešavimas (15 min)
- Puslapių navigacija
- Nustatymų valdymas (LocalStorage)
- Mėgstamų vietų saugojimas
- Toast pranešimai
- Chart.js grafikus
- Automatinis atnaujinimas

**Linijos**: 600+  
**Funkcijos**: 40+  
**Bibliotekos**: Chart.js (CDN)

---

### 📘 DOKUMENTACIJA (Skaitymas)

#### `QUICK_START.md` (5.98 KB) - ⭐ PRADĖKITE ČIA
**Naudojimas**: Greita pradžia (3 žingsniai)  
**Turinys**:
- Kaip paleisti projektą
- Pagrindinės savybės
- Trumpas kiekvieno puslapio aprašas
- DUK (Dažnai užduodami klausimai)
- Trikdžiai ir jų sprendimai

**Laikas**: 5 minutės skaitymui

---

#### `README.md` (6.34 KB) - Pilna Dokumentacija
**Naudojimas**: Išsami projekto aprašymas  
**Turinys**:
- Pagrindinės savybės
- Komponentų sąrašas
- Technologijos
- API šaltiniai (LHMT, Open-Meteo)
- Diegimo instrukcijos
- Konfigūracija
- Žinomos problemos

**Laikas**: 10 minučių skaitymui

---

#### `GUIDE.md` (4.30 KB) - Greitoji Vadovėlis
**Naudojimas**: Nuorodos ir lentelės  
**Turinys**:
- Svarbiausios savybės
- Animacijų lentelė
- Nustatymų lentelė
- LocalStorage raktažodžiai
- API nustatymai
- Spalvų schema
- Responzyvieji taškai
- Checklist

**Laikas**: 5 minutės skaitymui

---

#### `COMPLETE_SUMMARY.md` (11.59 KB) - Išsami Apžvalga
**Naudojimas**: Pilnas techninis aprašymas  
**Turinys**:
- Projektų statistika
- Kiekvieno puslapio aprašas
- Animacijos & Perejimai
- Techninis stakas
- Greitaveika
- Saugumas & Prieinamumas
- Failų apžvalga
- 200+ eilučių aprašymų

**Laikas**: 20 minučių skaitymui

---

### 💻 KODŲ PAVYZDŽIAI

#### `API_EXAMPLES.js` (12.22 KB) - API Naudojimas
**Naudojimas**: Mokymasis ir bendri kodų fragmentai  
**Turinys**:
1. LHMT API užklausa (pavyzdys)
2. Open-Meteo API užklausa (pavyzdys)
3. WMO oro kodų žodynas
4. Duomenų kešavimo klasė
5. Geolokacinės koordinatės
6. Klaidu tvarkymasis
7. Realaus laiko atnaujinimai
8. Duomenų transformacija
9. Debug konsole logavimas
10. Performance monitoringas

**Naudojimas**: Kopijuoti & Įdėti fragmentus savo kodui  
**Laikas**: 30 minučių studijoms

---

## 📊 NAUDOJIMO VADOVAS

### JEIGU NORITE...

#### Atidarykite Puslapį
→ Atidarykite `index.html` naršyklėje

#### Keisti Stilius
→ Redaguokite `style.css`
- Jei spalvos: keiskite CSS kintamuosius (:root)
- Jei animacijos: keiskite @keyframes
- Jei layout: keiskite CSS Grid/Flexbox

#### Keisti Logika
→ Redaguokite `script.js`
- API: keiskite fetchWeatherData()
- Vietos: keiskite CONFIG.LOCATION
- Intervalas: keiskite REFRESH_INTERVAL

#### Suprasti API
→ Skaityti `API_EXAMPLES.js`
- Grafiškas žodis žingsnis nuo žingsnio
- Pastatyti pavyzdžiai su komentarais
- Praktiniai scenarijas

#### Mokyti Kitus
→ Dalyti `README.md` ir `QUICK_START.md`
- Nereikia jokio kodo žinojimo
- Lengva sekti instrukcijas
- Visuomenės paruošti

#### Rašyti Tyrimą/Straipsnį
→ Naudoti `COMPLETE_SUMMARY.md`
- Pilna techninio aprašymo
- Statistika ir fakta
- Žaltinio lentelės

---

## 🎯 REKOMENDUOJAMA SKAITYMO TVARKA

### Pirma Kartą?
1. ✅ `QUICK_START.md` (5 min)
2. ✅ Atidarykite `index.html`
3. ✅ Žaidžias su programu (10 min)

### Norite Suprasti Daugiau?
4. ✅ `README.md` (10 min)
5. ✅ `GUIDE.md` (5 min)
6. ✅ Pažiūrite HTML/CSS/JS failai

### Norite Giliau?
7. ✅ `COMPLETE_SUMMARY.md` (20 min)
8. ✅ `API_EXAMPLES.js` (30 min)
9. ✅ Redaguokite ir eksperimentuokite

---

## 🔗 FAILŲ SĄRYŠIAI

```
index.html
    ├─ Links: style.css
    ├─ Links: script.js
    ├─ Imports: Chart.js (CDN)
    └─ Contains: 5 sections

script.js
    ├─ Calls: LHMT API
    ├─ Calls: Open-Meteo API
    ├─ Updates: HTML elements
    ├─ Uses: LocalStorage
    └─ Creates: Charts (Chart.js)

style.css
    ├─ Styles: All HTML elements
    ├─ Supports: Dark & Light theme
    ├─ Responsive: 4 breakpoints
    └─ Animations: 30+ keyframes

API_EXAMPLES.js
    └─ Reference: For script.js
```

---

## 🎓 MOKYMO IŠTEKLIAI

### Bendri
- MDN Web Docs: https://developer.mozilla.org/
- W3Schools: https://www.w3schools.com/

### CSS Animacijos
- CSS Tricks: https://css-tricks.com/
- MDN Animations: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations

### Chart.js
- Dokumentacija: https://www.chartjs.org/
- Examples: https://www.chartjs.org/samples/latest/

### Weather APIs
- LHMT: https://get.data.gov.lt/
- Open-Meteo: https://open-meteo.com/

### JavaScript
- MDN JS: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- Async/Await: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous

---

## 🆘 PAGALBA

### Klausimai apie Failų Struktūrą?
→ Žr. **FILENAMES.md** (šis failas)

### Kaip Paleisti?
→ Žr. **QUICK_START.md**

### Kaip Naudoti?
→ Žr. **README.md**

### Dėl API?
→ Žr. **API_EXAMPLES.js**

### Dėl Spalvų/Dizaino?
→ Žr. **GUIDE.md** (Spalvų schema)

### Viskas Nėra Aišku?
→ Žr. **COMPLETE_SUMMARY.md**

---

## 📋 GREITOJI NUORODA

| Kas Yra? | Failas | Žodžiai | Eilutės |
|----------|--------|--------|--------|
| Programa | index.html | 256 | Atidarykite! |
| Stiliai | style.css | 24KB | Visi CSS |
| Logika | script.js | 600+ | Visa JS |
| Pradžia | QUICK_START.md | 200 | 3 žingsniai |
| Info | README.md | 300 | Dokumentacija |
| Vadovėlis | GUIDE.md | 150 | Nuorodos |
| Aprašymas | COMPLETE_SUMMARY.md | 600 | Viskas |
| Kodai | API_EXAMPLES.js | 400+ | 10 pavyzdžių |

---

## ✅ SĄRAŠAS PRIEŠ PRADEDANT

- [x] Atsisiųsti visus 8 failų
- [x] Atidarykite index.html
- [x] Skaityti QUICK_START.md
- [x] Naudokites programu
- [x] Keiskite nustatymai
- [x] Matyti animacijas
- [x] Tyrinėti kodą
- [x] Sėkmingas!

---

## 🎉 BAIGTA!

Viskas, ką reikia - čia.

**Pradėkite su**: `QUICK_START.md` 🚀

---

**Versija**: 1.0  
**Data**: 2025-12-01  
**Būsena**: ✅ Paruošta  
**Kalba**: Lietuvių  

---

💡 **Pro patarimas**: Jei svarbiai negreit suprantate kai ką, atmetus iš programos ir grįžkite prie dokumentacijos - visuomet padės!
