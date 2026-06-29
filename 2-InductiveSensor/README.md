# 🔵 Engineering Lab – Indukční snímač

[English version](README.en.md)

Interaktivní simulace indukčního snímače vytvořená pomocí **HTML, CSS a JavaScriptu**.

Projekt názorně ukazuje princip fungování indukčního senzoru, vznik elektromagnetického pole, vliv materiálu na detekční vzdálenost a přepnutí výstupu senzoru.

Jedná se o druhý projekt ze série **Engineering Lab**, která přibližuje principy strojírenství, elektrotechniky a průmyslové automatizace pomocí interaktivních webových simulací.

---

# Funkce

- 🔵 Interaktivní simulace indukčního snímače
- 📏 Nastavení vzdálenosti objektu
- ⚙️ Nastavení jmenovitého dosahu senzoru
- 🧲 Výběr materiálu objektu
- 🏭 Typ senzoru (Flush / Non-Flush)
- ⚡ Vizualizace elektromagnetického pole
- 🌀 Vizualizace vířivých proudů
- 💡 LED indikace stavu senzoru
- 📊 Výpočet efektivního dosahu
- 📈 Materiálový faktor
- 🔄 Automatický pohyb objektu
- 🌍 Přepínání jazyků CZ / EN
- 📱 Responzivní rozhraní

---

# Jak simulace funguje

Indukční snímač vytváří vysokofrekvenční elektromagnetické pole.

Pokud se do tohoto pole dostane vodivý kovový objekt:

- vzniknou vířivé proudy,
- sníží se energie oscilátoru,
- elektronika senzoru změnu vyhodnotí,
- výstup senzoru se přepne do stavu ON.

Nekovové materiály (například plast nebo dřevo) elektromagnetické pole téměř neovlivňují, proto nejsou běžným indukčním snímačem detekovány.

---

# Ovládání

| Ovládání | Popis |
|----------|-------|
| Vzdálenost objektu | Posun objektu vůči senzoru |
| Jmenovitý dosah | Nastavení detekční vzdálenosti |
| Materiál | Změna materiálu objektu |
| Typ senzoru | Flush / Non-Flush |
| Elektromagnetické pole | Zapnutí nebo vypnutí vizualizace pole |
| Vířivé proudy | Zapnutí nebo vypnutí vizualizace proudů |
| Automatický pohyb | Pohyb objektu tam a zpět |

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
InductiveSensor/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── README.en.md
```

---

# Plánované funkce

## Verze 1

- ✅ Vizualizace elektromagnetického pole
- ✅ Materiálový faktor
- ✅ Efektivní dosah
- ✅ Vířivé proudy
- ✅ LED indikace
- ✅ Automatický pohyb

---

# Licence

Projekt byl vytvořen pro vzdělávací účely jako součást série **Engineering Lab**.

Zdrojový kód můžeš volně studovat, upravovat a používat pro vlastní vzdělávání.