# Greitoji Vadovėlis - Meteorologinė Stotis

## 🎯 Svarbiausios Savybės

### Dabartinės Sąlygos
- 🌡️ Temperatūra su gradientu
- 💨 Vėjo greitis ir kryptis
- 💧 Drėgmė su progreso juosta
- 🔽 Atmosferinis slėgis
- 🌧️ Krituliai (mm)
- 👁️ Matomumas (km)
- 🌅/🌇 Saulės tekėjimas ir leidimasis

### Prognozės
**Valandinė** - 24 valandų rodymui
**Savaitės** - 7 dienų detali prognozė

### Grafikai
- 📈 Temperatūra (30 dienų)
- 💧 Drėgmė (30 dienų)
- 🔽 Slėgis (30 dienų)

### Stotys
- 📍 Stočių vietos (Vilnius, Kaunas, Klaipėda, Šiauliai)
- 📊 Realūs duomenys iš kiekvienos
- ⏰ Paskutinio atnaujinimo laikas

## 🎨 Animacijos

| Animacija | Naudojimas |
|-----------|-----------|
| slideUp | Kortelių įkėlimas |
| fadeIn | Puslapių persijungimas |
| float | Logo judėjimas |
| iconFloat | Oro ikonos judėjimas |
| pulse | Įkėlimo teksto |
| spin | Atnaujinimo mygtuko |
| shimmer | Stiklinių kortelių žėrėjimas |

## 🔧 Nustatymai

| Nustatymas | Parinktys | Numatytasis |
|-----------|----------|-----------|
| Vieta | Vilnius, Kaunas, Klaipėda, Šiauliai | Vilnius |
| Atnaujinimas | 5, 15, 30, 60 min | 15 min |
| Tema | Tamsi, Šviesla | Tamsi |
| Perspėjimai | Įjungti/Išjungti | Įjungti |

## 💾 LocalStorage Raktažodžiai

```javascript
'weatherLocation'      // Pasirinktinė vieta
'refreshInterval'      // Atnaujinimo intervalas
'theme'               // Tema (dark/light)
'notifications'       // Perspėjimai (true/false)
'favorites'           // Mėgstamos vietos (JSON array)
```

## 🌐 API Nustatymai

### LHMT API
```
Nuoroda: https://get.data.gov.lt/api/v1/datasets/gov/lhmt/stebejimai/Matavimas
Metodas: GET
Formato: JSON
Ribojimas: Nėra žinomas
Autentifikacija: Ne
```

### Open-Meteo API (Atsarginis)
```
Nuoroda: https://api.open-meteo.com/v1/forecast
Parametrai: latitude, longitude, current, timezone
Ribojimas: 10,000 per dieną (nemokama)
Autentifikacija: Ne
```

## 🎨 Spalvų Schema

```css
--bg-primary: #0f0f0f      /* Pagrindinė fono spalva */
--bg-secondary: #1a1a1a    /* Antrinė fono spalva */
--accent: #00d4ff           /* Pagrindinė akcentinė spalva */
--accent-dark: #00a8cc      /* Tamsesnė akcentinė spalva */
--text-primary: #ffffff     /* Pagrindinė teksto spalva */
--text-secondary: #b0b0b0   /* Antrinė teksto spalva */
--success: #00ff88          /* Sėkmės spalva */
--warning: #ffaa00          /* Perspėjimo spalva */
--danger: #ff4444           /* Klaidos spalva */
```

## 📱 Responzyvieji Taškai

```css
/* Desktopu */
@media (max-width: 1024px)  /* Planšetės */
@media (max-width: 768px)   /* Mažos planšetės */
@media (max-width: 480px)   /* Mobilūs telefonai */
```

## 🚀 Pagreitis

1. **Pirmasis įkėlimas**: ~2-3s (duomenų nusisiuntimas)
2. **Atnaujinimas**: ~1s (kešuota)
3. **Puslapių persijungimas**: ~0.3s (animacija)
4. **Grafiko rodymis**: ~0.5s (Chart.js)

## ✅ Darbo Checklist

- [x] HTML semantinis markup
- [x] CSS animacijos ir perejimai
- [x] JavaScript ES6+
- [x] LHMT API integracija
- [x] Open-Meteo atsarginis API
- [x] LocalStorage duomenų saugojimas
- [x] Mėgstamų vietų valdymas
- [x] Temų parinktis
- [x] Responzyvus dizainas
- [x] Prieinamumas (ARIA etiketės)
- [x] Toast pranešimai
- [x] Duomenų grafikai
- [x] Lietuvos kalba

## 🔗 Naudingos Nuorodos

- [LHMT Duomenų Rinkinys](https://get.data.gov.lt/)
- [Open-Meteo API](https://open-meteo.com/)
- [Chart.js Dokumentacija](https://www.chartjs.org/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)

## 🐛 Trikdžiai ir Jų Sprendimas

### Problema: API grąžina 404
**Sprendimas**: Patikrinkite interneto ryšį ir API nuorodos

### Problema: Grafikai nerodomi
**Sprendimas**: Patikrinkite Chart.js CDN nuorodą

### Problema: Nustatymai nesaugomi
**Sprendimas**: Patikrinkite localStorage dėl kvotų

### Problema: Animacijos neveikia
**Sprendimas**: Patikrinkite CSS3 palaikymą naršyklėje

## 📞 Paramos Kontaktai

Dėl pagalbos žr. LHMT oficialią svetainę ir dokumentaciją.

---

**Versija**: 1.0  
**Paskutinis atnaujinimas**: 2025-12-01  
**Palaikoma**: Chrome, Firefox, Safari, Edge
