# ⚙️ Engineering Lab – Gear Simulation

[Česká verze](README.cz.md)

Interactive gear simulation built with **HTML, CSS and JavaScript**.

This project demonstrates how rotational motion is transferred between gears. You can change the number of teeth, add additional gears, and observe gear ratios, rotation speed, and rotation direction in real time.

It is the first project in the **Engineering Lab** series, focused on explaining engineering and industrial principles through interactive web simulations.

---

# Preview

Add screenshots to:

```text
docs/
└── screenshots/
    └── gear-simulation.png
```

---

# Features

- ⚙️ Interactive gear simulation
- ➕ Add and remove gears
- 🎚️ Adjustable number of teeth
- ⚡ Adjustable simulation speed
- 🔄 Reverse input rotation
- 📊 Automatic gear ratio calculation
- 📈 Output speed calculation
- 🔃 Rotation direction calculation
- 🔢 Rotation counter for every gear
- 📐 Optional shaft axis display
- 🌍 Czech / English language support
- 📱 Responsive interface
- 🎨 Modern engineering-inspired design

---

# How It Works

Each gear has a specific number of teeth.

When two gears mesh together:

- Larger gears rotate more slowly.
- Smaller gears rotate faster.
- Adjacent gears always rotate in opposite directions.

Gear speed is calculated using:

```text
n₂ = n₁ × (Z₁ / Z₂)
```

Where:

- **n** = rotational speed
- **Z** = number of teeth

---

# Controls

| Control | Description |
|----------|-------------|
| Slider | Change the number of teeth |
| Add Gear | Add another gear |
| Remove Gear | Remove the last gear |
| Pause | Pause the animation |
| Reverse Direction | Reverse the input rotation |
| Show Axes | Toggle shaft axis visibility |

---

# Technologies

- HTML5
- CSS3
- JavaScript (ES6)
- Canvas API

No external libraries required.

---

# Project Structure

```text
GearSimulation/
│
├── index.html
├── style.css
├── script.js
├── README.cz.md
└── README.en.md
```

---

# Roadmap

## Version 1

- ✅ Multiple gears
- ✅ Automatic scaling
- ✅ Gear ratio calculation
- ✅ Output speed calculation
- ✅ Rotation counters

---


# License

Created for educational purposes as part of the **Engineering Lab** series.

Feel free to study, modify and use the source code for learning purposes.