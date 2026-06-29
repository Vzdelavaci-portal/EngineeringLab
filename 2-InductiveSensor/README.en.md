# 🔵 Engineering Lab – Inductive Sensor

[Česká verze](README.md)

Interactive inductive sensor simulation built with **HTML, CSS and JavaScript**.

This project demonstrates how an inductive proximity sensor works, how an electromagnetic field is generated, how different materials affect sensing distance, and how the sensor output switches.

It is the second project in the **Engineering Lab** series focused on engineering, electronics and industrial automation.

---

# Features

- 🔵 Interactive inductive sensor simulation
- 📏 Adjustable object distance
- ⚙️ Adjustable nominal sensing range
- 🧲 Multiple material selection
- 🏭 Flush / Non-Flush sensor type
- ⚡ Electromagnetic field visualization
- 🌀 Eddy current visualization
- 💡 Sensor LED indicator
- 📊 Effective sensing range calculation
- 📈 Material factor calculation
- 🔄 Automatic object movement
- 🌍 Czech / English language support
- 📱 Responsive interface

---

# How It Works

An inductive sensor generates a high-frequency electromagnetic field.

When a conductive metal object enters the field:

- eddy currents are induced,
- oscillator energy decreases,
- the sensor electronics detect the change,
- the output switches ON.

Non-metallic materials such as plastic or wood have almost no influence on the electromagnetic field and therefore are not detected by a standard inductive sensor.

---

# Controls

| Control | Description |
|----------|-------------|
| Object Distance | Move the object |
| Nominal Range | Adjust sensing distance |
| Material | Select object material |
| Sensor Type | Flush / Non-Flush |
| Electromagnetic Field | Toggle field visualization |
| Eddy Currents | Toggle eddy current visualization |
| Automatic Movement | Move the object automatically |

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
InductiveSensor/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── README.en.md
```

---

# Roadmap

## Version 1

- ✅ Electromagnetic field visualization
- ✅ Material factor calculation
- ✅ Effective sensing range
- ✅ Eddy current visualization
- ✅ LED indication
- ✅ Automatic movement

## Future Versions

- ⏳ PNP / NPN outputs
- ⏳ NO / NC contacts
- ⏳ Analog output
- ⏳ M12 connector wiring
- ⏳ 24 VDC power supply
- ⏳ PLC connection
- ⏳ Conveyor simulation
- ⏳ Product counting
- ⏳ High-speed detection
- ⏳ Oscilloscope visualization
- ⏳ Adjustable hysteresis

---

# License

Created for educational purposes as part of the **Engineering Lab** series.

Feel free to study, modify and use the source code for learning purposes.