const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

const distanceInput = document.getElementById("distanceInput");
const rangeInput = document.getElementById("rangeInput");
const materialSelect = document.getElementById("materialSelect");
const sensorTypeSelect = document.getElementById("sensorTypeSelect");
const fieldToggle = document.getElementById("fieldToggle");
const eddyToggle = document.getElementById("eddyToggle");
const autoBtn = document.getElementById("autoBtn");

const distanceValue = document.getElementById("distanceValue");
const rangeValue = document.getElementById("rangeValue");

const currentDistanceValue = document.getElementById("currentDistanceValue");
const effectiveRangeValue = document.getElementById("effectiveRangeValue");
const materialFactorValue = document.getElementById("materialFactorValue");
const outputValue = document.getElementById("outputValue");
const statusBadge = document.getElementById("statusBadge");
const learningText = document.getElementById("learningText");

const czBtn = document.getElementById("czBtn");
const enBtn = document.getElementById("enBtn");

let language = "cz";
let autoMove = false;
let autoTime = 0;

const materials = {
  steel: {
    factor: 1.0,
    color: "#8ca3b8",
    conductive: true
  },
  stainless: {
    factor: 0.65,
    color: "#b4c2cc",
    conductive: true
  },
  aluminum: {
    factor: 0.55,
    color: "#d6dce2",
    conductive: true
  },
  brass: {
    factor: 0.50,
    color: "#d6a84f",
    conductive: true
  },
  copper: {
    factor: 0.45,
    color: "#d87945",
    conductive: true
  },
  plastic: {
    factor: 0.0,
    color: "#22c55e",
    conductive: false
  },
  wood: {
    factor: 0.0,
    color: "#a16207",
    conductive: false
  }
};

const texts = {
  cz: {
    title: "Indukční snímač",
    subtitle: "Interaktivní simulace detekce kovových objektů pomocí elektromagnetického pole.",
    settings: "Nastavení",
    distance: "Vzdálenost objektu",
    nominalRange: "Jmenovitý dosah senzoru",
    material: "Materiál objektu",
    sensorType: "Typ senzoru",
    showField: "Zobrazit elektromagnetické pole",
    showEddy: "Zobrazit vířivé proudy",
    autoMove: "▶ Automatický pohyb",
    stopAuto: "⏸ Zastavit pohyb",
    simulation: "Simulace senzoru",
    results: "Výsledky",
    currentDistance: "Aktuální vzdálenost",
    effectiveRange: "Efektivní dosah",
    materialFactor: "Materiálový faktor",
    output: "Výstup",
    howTitle: "Jak to funguje?",
    howText: "Indukční snímač vytváří elektromagnetické pole. Když se do pole přiblíží kovový objekt, vzniknou v něm vířivé proudy. Ty změní energii pole a elektronika senzoru přepne výstup.",
    learningTitle: "Co se právě děje?",
    detected: "Objekt je v dosahu senzoru. Kovový materiál ovlivňuje elektromagnetické pole a výstup je sepnutý.",
    notDetected: "Objekt je mimo efektivní dosah senzoru, výstup zůstává vypnutý.",
    nonMetal: "Tento materiál není vodivý kov. Indukční snímač ho běžně nedetekuje.",
    closeButWeak: "Objekt je blízko, ale materiál má nižší materiálový faktor, takže efektivní dosah je kratší.",
    sensor: "SENZOR",
    metalObject: "OBJEKT",
    field: "elektromagnetické pole",
    eddy: "vířivé proudy",
    on: "ON",
    off: "OFF"
  },
  en: {
    title: "Inductive Sensor",
    subtitle: "Interactive simulation of metal object detection using an electromagnetic field.",
    settings: "Settings",
    distance: "Object distance",
    nominalRange: "Nominal sensor range",
    material: "Object material",
    sensorType: "Sensor type",
    showField: "Show electromagnetic field",
    showEddy: "Show eddy currents",
    autoMove: "▶ Auto movement",
    stopAuto: "⏸ Stop movement",
    simulation: "Sensor simulation",
    results: "Results",
    currentDistance: "Current distance",
    effectiveRange: "Effective range",
    materialFactor: "Material factor",
    output: "Output",
    howTitle: "How does it work?",
    howText: "An inductive sensor creates an electromagnetic field. When a metal object enters the field, eddy currents are induced inside the object. These currents change the field energy and the sensor electronics switch the output.",
    learningTitle: "What is happening?",
    detected: "The object is within the sensor range. The metal material affects the electromagnetic field and the output is switched on.",
    notDetected: "The object is outside the effective sensing range, so the output remains off.",
    nonMetal: "This material is not conductive metal. An inductive sensor normally does not detect it.",
    closeButWeak: "The object is close, but the material has a lower material factor, so the effective sensing distance is shorter.",
    sensor: "SENSOR",
    metalObject: "OBJECT",
    field: "electromagnetic field",
    eddy: "eddy currents",
    on: "ON",
    off: "OFF"
  }
};

function t(key) {
  return texts[language][key] || key;
}

function applyLanguage() {
  document.documentElement.lang = language === "cz" ? "cs" : "en";

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    element.textContent = t(key);
  });

  autoBtn.textContent = autoMove ? t("stopAuto") : t("autoMove");

  czBtn.classList.toggle("active", language === "cz");
  enBtn.classList.toggle("active", language === "en");
}

czBtn.addEventListener("click", () => {
  language = "cz";
  applyLanguage();
});

enBtn.addEventListener("click", () => {
  language = "en";
  applyLanguage();
});

autoBtn.addEventListener("click", () => {
  autoMove = !autoMove;
  autoBtn.textContent = autoMove ? t("stopAuto") : t("autoMove");
});

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function getState() {
  const distance = Number(distanceInput.value);
  const nominalRange = Number(rangeInput.value);
  const materialKey = materialSelect.value;
  const sensorType = sensorTypeSelect.value;
  const material = materials[materialKey];

  const typeFactor = sensorType === "flush" ? 1.0 : 1.25;
  const effectiveRange = nominalRange * material.factor * typeFactor;
  const detected = material.conductive && distance <= effectiveRange;

  return {
    distance,
    nominalRange,
    materialKey,
    material,
    sensorType,
    typeFactor,
    effectiveRange,
    detected
  };
}

function updateUI(state) {
  distanceValue.textContent = `${state.distance.toFixed(1)} mm`;
  rangeValue.textContent = `${state.nominalRange.toFixed(1)} mm`;

  currentDistanceValue.textContent = `${state.distance.toFixed(1)} mm`;
  effectiveRangeValue.textContent = `${state.effectiveRange.toFixed(1)} mm`;
  materialFactorValue.textContent = state.material.factor.toFixed(2);

  outputValue.textContent = state.detected ? t("on") : t("off");
  statusBadge.textContent = state.detected ? t("on") : t("off");

  statusBadge.classList.toggle("on", state.detected);
  statusBadge.classList.toggle("off", !state.detected);

  if (!state.material.conductive) {
    learningText.textContent = t("nonMetal");
  } else if (state.detected) {
    learningText.textContent = t("detected");
  } else if (state.distance <= state.nominalRange) {
    learningText.textContent = t("closeButWeak");
  } else {
    learningText.textContent = t("notDetected");
  }
}

function drawBackground(width, height) {
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "#08111d";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(255,255,255,0.045)";
  ctx.lineWidth = 1;

  for (let x = 0; x < width; x += 24) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y < height; y += 24) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawSensor(x, y, detected) {
  const bodyW = 240;
  const bodyH = 96;

  ctx.save();

  const gradient = ctx.createLinearGradient(x, y, x + bodyW, y);
  gradient.addColorStop(0, "#9ca3af");
  gradient.addColorStop(0.45, "#e5e7eb");
  gradient.addColorStop(1, "#64748b");

  ctx.fillStyle = gradient;
  roundRect(x, y, bodyW, bodyH, 18);
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.85)";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#111827";
  roundRect(x + bodyW - 22, y + 8, 18, bodyH - 16, 8);
  ctx.fill();

  ctx.fillStyle = detected ? "#4ade80" : "#374151";
  ctx.beginPath();
  ctx.arc(x + 36, y + bodyH / 2, 13, 0, Math.PI * 2);
  ctx.fill();

  if (detected) {
    ctx.shadowColor = "#4ade80";
    ctx.shadowBlur = 22;
    ctx.beginPath();
    ctx.arc(x + 36, y + bodyH / 2, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  ctx.fillStyle = "#07111f";
  ctx.font = "900 18px system-ui";
  ctx.textAlign = "center";
  ctx.fillText(t("sensor"), x + bodyW / 2, y + bodyH / 2 + 6);

  ctx.restore();
}

function drawField(sensorX, sensorY, state, time) {
  if (!fieldToggle.checked) return;

  const originX = sensorX + 240;
  const originY = sensorY + 48;

  const strength = Math.max(0, 1 - state.distance / 25);
  const deformation = state.material.conductive ? strength * state.material.factor : 0;

  ctx.save();
  ctx.lineWidth = 2;

  for (let i = 1; i <= 8; i++) {
    const wave = Math.sin(time * 0.04 + i) * 8;
    const radiusX = 34 + i * 32 + wave - deformation * i * 5;
    const radiusY = 18 + i * 13 + wave * 0.3;

    ctx.beginPath();
    ctx.ellipse(
      originX + i * 23,
      originY,
      radiusX,
      radiusY,
      0,
      -Math.PI / 2,
      Math.PI / 2
    );

    ctx.strokeStyle = `rgba(32, 214, 255, ${0.42 - i * 0.035})`;
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(32,214,255,0.9)";
  ctx.font = "700 14px system-ui";
  ctx.fillText(t("field"), originX + 210, originY - 105);

  ctx.restore();
}

function drawObject(x, y, state, time) {
  const w = 120;
  const h = 120;

  ctx.save();

  ctx.fillStyle = state.material.color;
  roundRect(x, y, w, h, 18);
  ctx.fill();

  ctx.strokeStyle = state.detected ? "#4ade80" : "rgba(255,255,255,0.6)";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#07111f";
  ctx.font = "900 16px system-ui";
  ctx.textAlign = "center";
  ctx.fillText(t("metalObject"), x + w / 2, y + h / 2 + 5);

  if (eddyToggle.checked && state.material.conductive && state.distance <= state.nominalRange) {
    ctx.strokeStyle = state.detected ? "#4ade80" : "#facc15";
    ctx.lineWidth = 3;

    for (let i = 0; i < 4; i++) {
      const cx = x + 30 + i * 22;
      const cy = y + h / 2 + Math.sin(time * 0.06 + i) * 10;

      ctx.beginPath();
      ctx.arc(cx, cy, 10, time * 0.05, time * 0.05 + Math.PI * 1.5);
      ctx.stroke();
    }

    ctx.fillStyle = state.detected ? "#4ade80" : "#facc15";
    ctx.font = "700 14px system-ui";
    ctx.fillText(t("eddy"), x + w / 2, y + h + 28);
  }

  ctx.restore();
}

function drawDistance(sensorX, sensorY, objectX, state) {
  const startX = sensorX + 240;
  const endX = objectX;
  const y = sensorY + 175;

  ctx.save();

  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 8]);

  ctx.beginPath();
  ctx.moveTo(startX, y);
  ctx.lineTo(endX, y);
  ctx.stroke();

  ctx.setLineDash([]);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 16px system-ui";
  ctx.textAlign = "center";
  ctx.fillText(`${state.distance.toFixed(1)} mm`, (startX + endX) / 2, y - 12);

  ctx.restore();
}

function drawRangeZone(sensorX, sensorY, state) {
  const startX = sensorX + 240;
  const scale = 18;
  const rangePx = state.effectiveRange * scale;

  ctx.save();

  ctx.fillStyle = state.detected
    ? "rgba(74, 222, 128, 0.16)"
    : "rgba(32, 214, 255, 0.10)";

  ctx.fillRect(startX, sensorY - 25, rangePx, 170);

  ctx.strokeStyle = state.detected
    ? "rgba(74, 222, 128, 0.75)"
    : "rgba(32, 214, 255, 0.45)";

  ctx.lineWidth = 2;
  ctx.strokeRect(startX, sensorY - 25, rangePx, 170);

  ctx.fillStyle = "#c8f4ff";
  ctx.font = "700 14px system-ui";
  ctx.fillText(`${state.effectiveRange.toFixed(1)} mm`, startX + rangePx / 2, sensorY - 36);

  ctx.restore();
}

function animate() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  autoTime += 1;

  if (autoMove) {
    const value = 12.5 + Math.sin(autoTime * 0.025) * 12.5;
    distanceInput.value = value.toFixed(1);
  }

  const state = getState();
  updateUI(state);

  const sensorX = Math.max(60, width * 0.08);
  const sensorY = height / 2 - 70;

  const scale = 18;
  const objectX = sensorX + 240 + state.distance * scale;
  const objectY = sensorY - 12;

  drawBackground(width, height);
  drawRangeZone(sensorX, sensorY, state);
  drawField(sensorX, sensorY, state, autoTime);
  drawSensor(sensorX, sensorY, state.detected);
  drawObject(objectX, objectY, state, autoTime);
  drawDistance(sensorX, sensorY, objectX, state);

  requestAnimationFrame(animate);
}

function roundRect(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

applyLanguage();
animate();