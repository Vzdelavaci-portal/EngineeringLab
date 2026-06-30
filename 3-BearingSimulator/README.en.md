# ⚙️ Engineering Lab – Bearing Simulator

[Česká verze](README.md)

Interactive ball bearing simulation built with **HTML, CSS and JavaScript**.

This project demonstrates how a radial ball bearing works, how the load is distributed across multiple rolling elements, and how lubrication, friction, speed and temperature affect bearing operation.

It is the third project in the **Engineering Lab** series focused on engineering, mechanics and industrial automation.

---

# Preview

Add screenshots to:

```text
docs/
└── screenshots/
    └── bearing-simulator.png
```

---

# Features

- ⚙️ Interactive ball bearing simulation
- 🔄 Adjustable RPM
- 📦 Adjustable radial load
- 🛢️ Lubrication quality selection
- ⚪ Adjustable number of balls
- 🟡 Load distribution visualization
- 🏹 Force direction indicator
- 🌡 Estimated operating temperature
- ⚡ Friction estimation
- ⏳ Bearing lifetime estimation
- 🐢 Slow Motion mode
- 🌍 Czech / English language support
- 📱 Responsive interface

---

# How It Works

In a radial ball bearing, the load is **not** carried by a single ball.

The ball located closest to the applied force carries the highest load, while neighboring balls also share part of the load.

The simulator models the load distribution using a Gaussian function, producing a smooth stress distribution similar to real bearing behavior.

Lubrication affects:

- friction
- operating temperature
- estimated bearing lifetime

---

# Controls

| Control | Description |
|----------|-------------|
| RPM | Rotation speed |
| Radial Load | Applied force |
| Lubrication | Lubrication quality |
| Number of Balls | Rolling elements |
| Show Force | Display load direction |
| Load Distribution | Display stress distribution |
| Slow Motion | Reduce animation speed |
| Click inside simulation | Change load direction |

---

# Technologies

- HTML5
- CSS3
- JavaScript (ES6)
- Canvas API

No external libraries are required.

---

# Project Structure

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

# Roadmap

## Version 1

- ✅ Radial load
- ✅ Load distribution
- ✅ RPM control
- ✅ Lubrication
- ✅ Temperature estimation
- ✅ Friction estimation
- ✅ Lifetime estimation
- ✅ Slow Motion

## Future Versions

- ⏳ Axial load
- ⏳ Combined loading
- ⏳ Ceramic bearings
- ⏳ Ball vs Roller bearings
- ⏳ Needle bearings
- ⏳ Tapered roller bearings
- ⏳ Contact angle
- ⏳ Internal clearance (C2, CN, C3...)
- ⏳ Vibration analysis
- ⏳ FFT spectrum
- ⏳ Lubrication intervals
- ⏳ Real SKF/FAG catalogue data

---

# Engineering Lab Series

Part of the interactive Engineering Lab collection:

- ⚙️ Gear Simulation
- 🔵 Inductive Sensor
- ⚙️ Bearing Simulator
- ⚡ Capacitive Sensor
- 🔴 Photoelectric Sensor
- 🌡 PT100 Sensor
- 📡 Ultrasonic Sensor
- 🤖 Robot Arm
- 🚚 Conveyor Belt
- 💨 Pneumatic Cylinder
- 💧 Hydraulic Press
- 🔌 PLC Simulator

---

# License

Created for educational purposes as part of the **Engineering Lab** series.

Feel free to study, modify and use the source code for learning purposes.