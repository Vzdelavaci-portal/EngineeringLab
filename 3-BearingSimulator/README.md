# ⚙️ Engineering Lab – Bearing Simulator

[English version](README.en.md)

Interaktivní simulace kuličkového ložiska vytvořená pomocí **HTML, CSS a JavaScriptu**.

Projekt názorně ukazuje princip fungování radiálního kuličkového ložiska, rozložení zatížení mezi jednotlivé kuličky, vliv mazání, tření, teploty a otáček.

Jedná se o třetí projekt ze série **Engineering Lab**, která přibližuje principy strojírenství, mechaniky a průmyslové automatizace pomocí interaktivních webových simulací.

---

# Náhled

Přidej screenshot do složky:

```text
docs/
└── screenshots/
    └── bearing-simulator.png
```

---

# Funkce

- ⚙️ Interaktivní simulace kuličkového ložiska
- 🔄 Nastavení otáček (RPM)
- 📦 Nastavení radiálního zatížení
- 🛢️ Výběr kvality mazání
- ⚪ Nastavení počtu kuliček
- 🟡 Vizualizace rozložení zatížení
- 🏹 Zobrazení směru působící síly
- 🌡️ Výpočet odhadované teploty
- ⚡ Výpočet tření
- ⏳ Odhad životnosti ložiska
- 🐢 Slow Motion režim
- 🌍 Přepínání jazyků CZ / EN
- 📱 Responzivní rozhraní

---

# Jak simulace funguje

Radiální kuličkové ložisko nepřenáší zatížení pouze jednou kuličkou.

Největší zatížení nese kulička nacházející se ve směru působící síly, ale část zatížení se přenáší také na několik sousedních kuliček.

Simulace používá spojité rozložení zatížení pomocí Gaussovy funkce, díky čemuž vzniká plynulá zatěžovaná oblast podobná skutečnému chování ložiska.

Mazání ovlivňuje:

- velikost tření
- odhadovanou provozní teplotu
- předpokládanou životnost ložiska

---

# Ovládání

| Ovládání | Popis |
|----------|-------|
| RPM | Nastavení otáček |
| Radiální zatížení | Velikost působící síly |
| Mazání | Kvalita mazání |
| Počet kuliček | Počet valivých elementů |
| Zobrazit sílu | Směr zatížení |
| Rozložení zatížení | Barevné zvýraznění zatěžované oblasti |
| Slow Motion | Zpomalená animace |
| Kliknutí do simulace | Změna směru zatížení |

---

# Použité technologie

- HTML5
- CSS3
- JavaScript (ES6)
- Canvas API

Projekt nepoužívá žádné externí knihovny.

---

# Struktura projektu

```text
BearingSimulator/
│
├── index.html
├── style.css
├── script.js
│
├── docs/
│   └── screenshots/
│
├── README.md
└── README.en.md
```

---

# Plánované funkce

## Verze 1

- ✅ Radiální zatížení
- ✅ Rozložení zatížení
- ✅ Otáčky
- ✅ Mazání
- ✅ Výpočet teploty
- ✅ Výpočet tření
- ✅ Odhad životnosti
- ✅ Slow Motion

## Budoucí verze

- ⏳ Axiální zatížení
- ⏳ Kombinované zatížení
- ⏳ Keramická ložiska
- ⏳ Kuličková × válečková ložiska
- ⏳ Jehlová ložiska
- ⏳ Kuželíková ložiska
- ⏳ Kontaktní úhel
- ⏳ Radiální vůle (C2, CN, C3...)
- ⏳ Vibrace
- ⏳ FFT analýza vibrací
- ⏳ Mazací intervaly
- ⏳ Reálné katalogové údaje SKF/FAG

---

# Série Engineering Lab

Součást připravované série interaktivních simulací:

- ⚙️ Gear Simulation
- 🔵 Inductive Sensor
- ⚙️ Bearing Simulator
- ⚡ Capacitive Sensor
- 🔴 Photoelectric Sensor
- 🌡 PT100
- 📡 Ultrasonic Sensor
- 🤖 Robot Arm
- 🚚 Conveyor Belt
- 💨 Pneumatic Cylinder
- 💧 Hydraulic Press
- 🔌 PLC Simulator

---

# Licence

Projekt byl vytvořen pro vzdělávací účely jako součást série **Engineering Lab**.

Zdrojový kód můžeš volně studovat, upravovat a používat pro vlastní vzdělávání.