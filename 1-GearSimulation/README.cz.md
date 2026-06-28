# ⚙️ Engineering Lab – Simulace ozubených kol

[English version](README.en.md)

Interaktivní simulace ozubených kol vytvořená pomocí **HTML, CSS a JavaScriptu**.

Projekt názorně ukazuje princip přenosu rotačního pohybu mezi ozubenými koly. Můžeš měnit počet zubů jednotlivých kol, přidávat další kola, sledovat převodový poměr, rychlost otáčení i směr rotace.

Jedná se o první projekt ze série **Engineering Lab**, která přibližuje principy strojírenství, mechaniky a průmyslové automatizace pomocí interaktivních webových simulací.

---

# Funkce

- ⚙️ Interaktivní simulace ozubených kol
- ➕ Přidávání a odebírání kol
- 🎚️ Nastavení počtu zubů každého kola
- ⚡ Nastavení rychlosti simulace
- 🔄 Změna směru otáčení vstupního kola
- 📊 Automatický výpočet převodového poměru
- 📈 Výpočet výstupní rychlosti
- 🔃 Výpočet směru otáčení výstupního kola
- 🔢 Počítadlo otočení každého kola
- 📐 Zobrazení os hřídelí
- 🌍 Přepínání jazyků CZ / EN
- 📱 Responzivní uživatelské rozhraní
- 🎨 Moderní technický vzhled

---

# Jak simulace funguje

Každé ozubené kolo obsahuje určitý počet zubů.

Při záběru dvou kol platí:

- větší kolo se otáčí pomaleji,
- menší kolo se otáčí rychleji,
- každé sousední kolo mění směr otáčení.

Výpočet otáček:

```text
n₂ = n₁ × (Z₁ / Z₂)
```

kde:

- **n** = otáčky
- **Z** = počet zubů

---

# Ovládání

| Ovládání | Popis |
|----------|-------|
| Posuvník | Změní počet zubů kola |
| Přidat kolo | Přidá další ozubené kolo |
| Odebrat poslední kolo | Odebere poslední kolo |
| Pauza | Pozastaví animaci |
| Změnit směr | Otočí směr vstupního kola |
| Zobrazit osy | Zapne nebo vypne zobrazení os |

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
GearSimulation/
│
├── index.html
├── style.css
├── script.js
│
├── README.md
└── README.en.md
```

---

# Plánované funkce

## Verze 1

- ✅ Více ozubených kol
- ✅ Automatické škálování
- ✅ Převodový poměr
- ✅ Výpočet rychlosti
- ✅ Počítadlo otočení kol

---

# Licence

Projekt byl vytvořen pro vzdělávací účely jako součást série **Engineering Lab**.

Zdrojový kód můžeš volně studovat, upravovat a používat pro vlastní vzdělávání.