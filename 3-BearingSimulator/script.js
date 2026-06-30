const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

const rpmInput = document.getElementById("rpmInput");
const loadInput = document.getElementById("loadInput");
const lubricationSelect = document.getElementById("lubricationSelect");
const ballsInput = document.getElementById("ballsInput");

const rpmValue = document.getElementById("rpmValue");
const loadValue = document.getElementById("loadValue");
const ballsValue = document.getElementById("ballsValue");

const forceToggle = document.getElementById("forceToggle");
const stressToggle = document.getElementById("stressToggle");
const slowBtn = document.getElementById("slowBtn");

const resultRpm = document.getElementById("resultRpm");
const frictionValue = document.getElementById("frictionValue");
const temperatureValue = document.getElementById("temperatureValue");
const lifetimeValue = document.getElementById("lifetimeValue");
const statusBadge = document.getElementById("statusBadge");
const learningText = document.getElementById("learningText");

const czBtn = document.getElementById("czBtn");
const enBtn = document.getElementById("enBtn");

let language = "cz";
let cageAngle = 0;
let shaftAngle = 0;
let slowMotion = false;
let loadDirection = -Math.PI / 2;

const lubricationData = {
  excellent: { factor: 0.45 },
  good: { factor: 0.75 },
  poor: { factor: 1.35 },
  none: { factor: 2.4 }
};

const texts = {
  cz: {
    title: "Ložiska",
    subtitle: "Interaktivní simulace kuličkového ložiska, zatížení, tření, mazání a teploty.",
    settings: "Nastavení",
    rpm: "Otáčky",
    load: "Radiální zatížení",
    lubrication: "Mazání",
    balls: "Počet kuliček",
    forces: "Zobrazit sílu",
    stress: "Zobrazit rozložení zatížení",
    slowMotion: "🐢 Slow motion",
    normalSpeed: "⚡ Normální rychlost",
    hint: "Kliknutím do simulace změníš směr zatížení.",
    simulation: "Simulace ložiska",
    results: "Výsledky",
    resultRpm: "Otáčky",
    friction: "Tření",
    temperature: "Teplota",
    lifetime: "Životnost",
    howTitle: "Jak to funguje?",
    howText: "U radiálně zatíženého kuličkového ložiska nenese zatížení pouze jedna kulička. Nejvíce zatížená je kulička ve směru síly, ale část zatížení přebírají i sousední kuličky.",
    learningTitle: "Co se právě děje?",
    good: "Ložisko pracuje v běžném režimu. Zatížení je rozloženo mezi několik kuliček v zatěžované oblasti.",
    warning: "Vyšší zatížení nebo horší mazání zvyšuje tření. Kuličky v zatížené oblasti mají výrazně vyšší kontaktní tlak.",
    danger: "Ložisko je v rizikovém režimu. Vysoké tření může způsobit přehřátí, hluk, vibrace a poškození drah.",
    low: "Nízké",
    medium: "Střední",
    high: "Vysoké",
    failure: "RIZIKO",
    ok: "GOOD",
    warn: "WARNING",
    loadDirection: "směr zatížení"
  },
  en: {
    title: "Bearings",
    subtitle: "Interactive simulation of a ball bearing, load, friction, lubrication and temperature.",
    settings: "Settings",
    rpm: "RPM",
    load: "Radial load",
    lubrication: "Lubrication",
    balls: "Number of balls",
    forces: "Show force",
    stress: "Show load distribution",
    slowMotion: "🐢 Slow motion",
    normalSpeed: "⚡ Normal speed",
    hint: "Click inside the simulation to change the load direction.",
    simulation: "Bearing simulation",
    results: "Results",
    resultRpm: "RPM",
    friction: "Friction",
    temperature: "Temperature",
    lifetime: "Lifetime",
    howTitle: "How does it work?",
    howText: "In a radially loaded ball bearing, the load is not carried by a single ball. The ball in the load direction carries the highest load, while neighboring balls carry part of it too.",
    learningTitle: "What is happening?",
    good: "The bearing is operating normally. The radial load is distributed across several balls in the load zone.",
    warning: "Higher load or worse lubrication increases friction. Balls in the load zone experience much higher contact pressure.",
    danger: "The bearing is in a risky condition. High friction may cause overheating, noise, vibration and raceway damage.",
    low: "Low",
    medium: "Medium",
    high: "High",
    failure: "RISK",
    ok: "GOOD",
    warn: "WARNING",
    loadDirection: "load direction"
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

  slowBtn.textContent = slowMotion ? t("normalSpeed") : t("slowMotion");

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

slowBtn.addEventListener("click", () => {
  slowMotion = !slowMotion;
  slowBtn.textContent = slowMotion ? t("normalSpeed") : t("slowMotion");
});

canvas.addEventListener("click", event => {
  const rect = canvas.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const cx = canvas.clientWidth / 2;
  const cy = canvas.clientHeight / 2 + 8;

  loadDirection = Math.atan2(y - cy, x - cx);
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
  const rpm = Number(rpmInput.value);
  const load = Number(loadInput.value);
  const balls = Number(ballsInput.value);
  const lubrication = lubricationSelect.value;

  const lube = lubricationData[lubrication];
  const speedFactor = rpm / 3000;

  const frictionScore = (load / 100) * lube.factor + speedFactor * 0.35;
  const temperature = 24 + frictionScore * 58;
  const lifetime = Math.max(900, Math.round(90000 / (1 + frictionScore * 4.7)));

  let frictionLabel = t("low");
  let status = "good";

  if (frictionScore > 0.75) {
    frictionLabel = t("medium");
    status = "warning";
  }

  if (frictionScore > 1.35) {
    frictionLabel = t("high");
    status = "danger";
  }

  return {
    rpm,
    load,
    balls,
    lubrication,
    frictionScore,
    frictionLabel,
    temperature,
    lifetime,
    status
  };
}

function updateUI(state) {
  rpmValue.textContent = `${state.rpm} RPM`;
  loadValue.textContent = `${state.load} %`;
  ballsValue.textContent = state.balls;

  resultRpm.textContent = state.rpm;
  frictionValue.textContent = state.frictionLabel;
  temperatureValue.textContent = `${state.temperature.toFixed(0)} °C`;
  lifetimeValue.textContent = `${state.lifetime.toLocaleString("cs-CZ")} h`;

  statusBadge.className = `status ${state.status}`;

  if (state.status === "good") {
    statusBadge.textContent = t("ok");
    learningText.textContent = t("good");
  } else if (state.status === "warning") {
    statusBadge.textContent = t("warn");
    learningText.textContent = t("warning");
  } else {
    statusBadge.textContent = t("failure");
    learningText.textContent = t("danger");
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

function drawRing(cx, cy, outerRadius, innerRadius, colorA, colorB) {
  const gradient = ctx.createRadialGradient(cx, cy, innerRadius, cx, cy, outerRadius);
  gradient.addColorStop(0, colorA);
  gradient.addColorStop(1, colorB);

  ctx.beginPath();
  ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2);
  ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2, true);
  ctx.closePath();

  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255,255,255,0.65)";
  ctx.stroke();
}

function angularDistance(a, b) {
  return Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
}

function pressureDistribution(angleToLoad, loadPercent) {
  const sigma = Math.PI / 4.2;
  const normalized = Math.exp(-(angleToLoad * angleToLoad) / (2 * sigma * sigma));
  return normalized * (loadPercent / 100);
}

function pressureColor(pressure) {
  if (pressure > 0.7) return "#ef4444";
  if (pressure > 0.45) return "#f97316";
  if (pressure > 0.2) return "#facc15";
  return "#64748b";
}

function drawLoadDistribution(cx, cy, innerRadius, outerRadius, state) {
  if (!stressToggle.checked || state.load <= 0) return;

  const segments = 70;

  for (let i = 0; i < segments; i++) {
    const a1 = (Math.PI * 2 / segments) * i;
    const a2 = (Math.PI * 2 / segments) * (i + 1);

    const mid = (a1 + a2) / 2;
    const diff = angularDistance(mid, loadDirection);
    const p = pressureDistribution(diff, state.load);

    if (p < 0.03) continue;

    let color = "250, 204, 21";

    if (p > 0.65) color = "239, 68, 68";
    else if (p > 0.4) color = "249, 115, 22";

    ctx.beginPath();
    ctx.arc(cx, cy, outerRadius, a1, a2);
    ctx.arc(cx, cy, innerRadius, a2, a1, true);
    ctx.closePath();

    ctx.fillStyle = `rgba(${color}, ${0.12 + p * 0.42})`;
    ctx.fill();
  }
}

function drawForceArrow(cx, cy, radius, state) {
  if (!forceToggle.checked || state.load <= 0) return;

  const length = 70 + state.load * 0.6;

  const startX = cx + Math.cos(loadDirection) * (radius + length);
  const startY = cy + Math.sin(loadDirection) * (radius + length);

  const endX = cx + Math.cos(loadDirection) * (radius + 10);
  const endY = cy + Math.sin(loadDirection) * (radius + 10);

  ctx.save();

  ctx.strokeStyle = "rgba(250,204,21,0.95)";
  ctx.fillStyle = "rgba(250,204,21,0.95)";
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(
    endX + Math.cos(loadDirection + 2.55) * 16,
    endY + Math.sin(loadDirection + 2.55) * 16
  );
  ctx.lineTo(
    endX + Math.cos(loadDirection - 2.55) * 16,
    endY + Math.sin(loadDirection - 2.55) * 16
  );
  ctx.closePath();
  ctx.fill();

  ctx.font = "900 15px system-ui";
  ctx.textAlign = "center";

  ctx.fillText(
    t("loadDirection"),
    startX,
    startY - 12
  );

  ctx.restore();
}

function drawBearing(width, height, state) {
  const cx = width / 2;
  const cy = height / 2 + 8;

  const outerRadius = Math.min(width, height) * 0.35;
  const outerInner = outerRadius * 0.78;

  const innerOuter = outerRadius * 0.48;
  const innerInner = outerRadius * 0.31;

  const ballTrackRadius = (outerInner + innerOuter) / 2;
  const ballRadius = outerRadius * 0.072;

  const cageInner = ballTrackRadius - ballRadius * 0.82;
  const cageOuter = ballTrackRadius + ballRadius * 0.82;

  drawLoadDistribution(cx, cy, innerOuter, outerRadius, state);
  drawForceArrow(cx, cy, outerRadius, state);

  drawRing(cx, cy, outerRadius, outerInner, "#dce7f5", "#64748b");
  drawRing(cx, cy, innerOuter, innerInner, "#e2e8f0", "#64748b");
  drawRing(cx, cy, cageOuter, cageInner, "#b7791f", "#3f2a0d");

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(cageAngle);

  for (let i = 0; i < state.balls; i++) {
    const localAngle = (Math.PI * 2 / state.balls) * i;
    const worldAngle = localAngle + cageAngle;

    const diff = angularDistance(worldAngle, loadDirection);
    const pressure = pressureDistribution(diff, state.load);

    const bx = Math.cos(localAngle) * ballTrackRadius;
    const by = Math.sin(localAngle) * ballTrackRadius;

    ctx.save();
    ctx.translate(bx, by);

    const spinAngle = -shaftAngle * 1.8;
    ctx.rotate(spinAngle);

    const ballGradient = ctx.createRadialGradient(
      -ballRadius * 0.35,
      -ballRadius * 0.35,
      ballRadius * 0.15,
      0,
      0,
      ballRadius
    );

    ballGradient.addColorStop(0, "#ffffff");
    ballGradient.addColorStop(0.45, "#cbd5e1");
    ballGradient.addColorStop(1, pressureColor(pressure));

    ctx.beginPath();
    ctx.arc(0, 0, ballRadius + pressure * 2.2, 0, Math.PI * 2);
    ctx.fillStyle = ballGradient;
    ctx.fill();

    ctx.lineWidth = pressure > 0.35 ? 4 : 2.5;
    ctx.strokeStyle =
      pressure > 0.65
        ? "#ef4444"
        : pressure > 0.35
          ? "#f97316"
          : "rgba(255,255,255,0.72)";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-ballRadius * 0.68, 0);
    ctx.lineTo(ballRadius * 0.68, 0);
    ctx.strokeStyle = "rgba(8,17,29,0.85)";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();
  }

  ctx.restore();

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(shaftAngle);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(innerOuter * 0.85, 0);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();

  ctx.restore();

  ctx.beginPath();
  ctx.arc(cx, cy, innerInner * 0.55, 0, Math.PI * 2);
  ctx.fillStyle = "#08111d";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.stroke();
}

function animate() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  const state = getState();
  updateUI(state);

  const speedFactor = slowMotion ? 0.18 : 1;
  const speed = (state.rpm / 3000) * 0.085 * speedFactor;

  shaftAngle += speed;
  cageAngle += speed * 0.42;

  drawBackground(width, height);
  drawBearing(width, height, state);

  requestAnimationFrame(animate);
}

applyLanguage();
animate();