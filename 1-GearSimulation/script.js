const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

const gearControls = document.getElementById("gearControls");
const speedInput = document.getElementById("speedInput");
const speedValue = document.getElementById("speedValue");

const pauseBtn = document.getElementById("pauseBtn");
const reverseBtn = document.getElementById("reverseBtn");
const addGearBtn = document.getElementById("addGearBtn");
const removeGearBtn = document.getElementById("removeGearBtn");
const axisToggle = document.getElementById("axisToggle");

const ratioValue = document.getElementById("ratioValue");
const outputSpeedValue = document.getElementById("outputSpeedValue");
const directionValue = document.getElementById("directionValue");
const inputTurnsValue = document.getElementById("inputTurnsValue");
const outputTurnsValue = document.getElementById("outputTurnsValue");
const turnList = document.getElementById("turnList");

const czBtn = document.getElementById("czBtn");
const enBtn = document.getElementById("enBtn");

let language = "cz";
let running = true;
let inputDirection = 1;
let inputAngle = 0;

let gears = [
  { teeth: 16, color: "#4169ff" },
  { teeth: 32, color: "#ff1f86" },
  { teeth: 24, color: "#59d65c" }
];

const texts = {
  cz: {
    title: "Ozubená kola",
    subtitle: "Interaktivní simulace převodu otáček mezi ozubenými koly.",
    settings: "Nastavení",
    speed: "Rychlost simulace",
    reverse: "↔ Změnit směr vstupu",
    addGear: "＋ Přidat kolo",
    removeGear: "🗑 Odebrat poslední kolo",
    simulation: "Simulace převodu",
    showAxis: "Zobrazit osy",
    results: "Výsledky",
    ratio: "Převodový poměr",
    outputSpeed: "Výstupní rychlost",
    outputDirection: "Směr výstupu",
    inputTurns: "Otočení vstupu",
    outputTurns: "Otočení výstupu",
    gearTurns: "Otočení jednotlivých kol",
    howTitle: "Jak to funguje?",
    howText: "Když se dvě ozubená kola dotýkají, jejich zuby do sebe zapadají. Menší kolo se při stejném kontaktu otočí rychleji než větší kolo. Každé další kolo v soustavě mění směr otáčení.",
    formula: "Vzorec",
    gear: "Kolo",
    input: "vstup",
    output: "výstup",
    teeth: "zubů",
    same: "stejný",
    opposite: "opačný",
    turns: "ot.",
    pause: "⏸ Pauza",
    play: "▶ Spustit"
  },
  en: {
    title: "Gears",
    subtitle: "Interactive simulation of rotational transmission between gears.",
    settings: "Settings",
    speed: "Simulation speed",
    reverse: "↔ Reverse input direction",
    addGear: "＋ Add gear",
    removeGear: "🗑 Remove last gear",
    simulation: "Gear train simulation",
    showAxis: "Show axes",
    results: "Results",
    ratio: "Gear ratio",
    outputSpeed: "Output speed",
    outputDirection: "Output direction",
    inputTurns: "Input turns",
    outputTurns: "Output turns",
    gearTurns: "Turns of each gear",
    howTitle: "How does it work?",
    howText: "When two gears mesh together, their teeth transfer rotational motion from one gear to another. A smaller gear rotates faster than a larger gear. Each additional gear changes the direction of rotation.",
    formula: "Formula",
    gear: "Gear",
    input: "input",
    output: "output",
    teeth: "teeth",
    same: "same",
    opposite: "opposite",
    turns: "rev.",
    pause: "⏸ Pause",
    play: "▶ Play"
  }
};

function t(key) {
  return texts[language][key] || key;
}

function applyLanguage() {
  document.documentElement.lang = language === "cz" ? "cs" : "en";

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;

    if (texts[language][key]) {
      element.textContent = texts[language][key];
    }
  });

  pauseBtn.textContent = running ? t("pause") : t("play");

  czBtn.classList.toggle("active", language === "cz");
  enBtn.classList.toggle("active", language === "en");

  renderControls();
}

czBtn.addEventListener("click", () => {
  language = "cz";
  applyLanguage();
});

enBtn.addEventListener("click", () => {
  language = "en";
  applyLanguage();
});

pauseBtn.addEventListener("click", () => {
  running = !running;
  pauseBtn.textContent = running ? t("pause") : t("play");
});

reverseBtn.addEventListener("click", () => {
  inputDirection *= -1;
});

addGearBtn.addEventListener("click", () => {
  if (gears.length >= 6) return;

  const colors = ["#4169ff", "#ff1f86", "#59d65c", "#ff9f1c", "#a855f7", "#22d3ee"];

  gears.push({
    teeth: 24,
    color: colors[gears.length % colors.length]
  });

  renderControls();
});

removeGearBtn.addEventListener("click", () => {
  if (gears.length <= 2) return;

  gears.pop();
  renderControls();
});

function renderControls() {
  gearControls.innerHTML = "";

  gears.forEach((gear, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "control-line";

    const title = document.createElement("strong");
    title.textContent = `${t("gear")} ${index + 1}${index === 0 ? ` (${t("input")})` : ""}`;

    const label = document.createElement("label");
    label.textContent = `${t("teeth")}: `;

    const value = document.createElement("strong");
    value.textContent = gear.teeth;
    value.style.color = gear.color;

    const input = document.createElement("input");
    input.type = "range";
    input.min = "8";
    input.max = "64";
    input.step = "1";
    input.value = gear.teeth;
    input.style.accentColor = gear.color;

    input.addEventListener("input", () => {
      gear.teeth = Number(input.value);
      value.textContent = gear.teeth;
    });

    label.appendChild(value);
    wrapper.appendChild(title);
    wrapper.appendChild(label);
    wrapper.appendChild(input);
    gearControls.appendChild(wrapper);
  });
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function calculateScale() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  const sidePadding = 120;
  const topPadding = 90;
  const bottomPadding = 130;

  const availableWidth = width - sidePadding * 2;
  const availableHeight = height - topPadding - bottomPadding;

  const toothHeightReserve = 18;

  const totalPitchWidth = gears.reduce((sum, gear) => sum + gear.teeth, 0);

  const visualWidthTeeth =
    totalPitchWidth -
    gears[0].teeth / 2 -
    gears[gears.length - 1].teeth / 2;

  const maxTeeth = Math.max(...gears.map(g => g.teeth));

  const scaleByWidth = availableWidth / (visualWidthTeeth * 2 + toothHeightReserve * gears.length);
  const scaleByHeight = availableHeight / (maxTeeth * 2 + toothHeightReserve * 2);

  return Math.max(1.2, Math.min(scaleByWidth, scaleByHeight, 5.8));
}

function getGearData() {
  const scale = calculateScale();

  const data = gears.map((gear, index) => {
    const pitchRadius = gear.teeth * scale;
    const toothHeight = Math.max(6, scale * 2.2);

    const outerRadius = pitchRadius + toothHeight;
    const rootRadius = Math.max(8, pitchRadius - toothHeight);

    return {
      ...gear,
      index,
      pitchRadius,
      outerRadius,
      rootRadius,
      toothHeight,
      angle: 0,
      turns: 0,
      x: 0,
      y: 0
    };
  });

  const totalOuterWidth =
    data[0].outerRadius +
    data[data.length - 1].outerRadius +
    data.slice(1).reduce((sum, gear, index) => {
      const prev = data[index];
      return sum + prev.pitchRadius + gear.pitchRadius;
    }, 0);

  const startX = canvas.clientWidth / 2 - totalOuterWidth / 2 + data[0].outerRadius;
  const maxOuterRadius = Math.max(...data.map(g => g.outerRadius));

  const minY = maxOuterRadius + 70;
  const maxY = canvas.clientHeight - maxOuterRadius - 95;

  const centerY = Math.max(
    minY,
    Math.min(canvas.clientHeight / 2 - 25, maxY)
  );

  data[0].x = startX;
  data[0].y = centerY;
  data[0].angle = inputAngle;

  for (let i = 1; i < data.length; i++) {
    const prev = data[i - 1];
    const current = data[i];

    current.x = prev.x + prev.pitchRadius + current.pitchRadius;
    current.y = centerY;

    const meshPhase = Math.PI + Math.PI / current.teeth;

    current.angle =
      -prev.angle * (prev.teeth / current.teeth) + meshPhase;
  }

  data.forEach(gear => {
    gear.turns = Math.abs(gear.angle / (Math.PI * 2));
  });

  return data;
}

function drawBackground() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "#08111d";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(255,255,255,0.045)";
  ctx.lineWidth = 1;

  for (let x = 0; x < width; x += 22) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y < height; y += 22) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawGear(gear) {
  ctx.save();
  ctx.translate(gear.x, gear.y);
  ctx.rotate(gear.angle);

  const step = Math.PI * 2 / gear.teeth;

  ctx.beginPath();

  for (let i = 0; i < gear.teeth; i++) {
    const a = i * step;

    const points = [
      [a, gear.rootRadius],
      [a + step * 0.16, gear.rootRadius],
      [a + step * 0.32, gear.outerRadius],
      [a + step * 0.68, gear.outerRadius],
      [a + step * 0.84, gear.rootRadius],
      [a + step, gear.rootRadius]
    ];

    points.forEach(([angle, radius], pointIndex) => {
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (i === 0 && pointIndex === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
  }

  ctx.closePath();

  const gradient = ctx.createRadialGradient(0, 0, gear.rootRadius * 0.2, 0, 0, gear.outerRadius);
  gradient.addColorStop(0, lightenColor(gear.color, 38));
  gradient.addColorStop(1, gear.color);

  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255,255,255,0.85)";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, gear.pitchRadius * 0.26, 0, Math.PI * 2);
  ctx.fillStyle = "#07111f";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(gear.pitchRadius * 0.55, 0);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();

  ctx.restore();

  ctx.fillStyle = gear.color;
  ctx.font = "900 16px system-ui";
  ctx.textAlign = "center";

  const labelY = Math.min(
    gear.y + gear.outerRadius + 32,
    canvas.clientHeight - 58
  );

  ctx.fillText(
    `${t("gear")} ${gear.index + 1}${gear.index === 0 ? ` (${t("input")})` : ""}`,
    gear.x,
    labelY
  );

  ctx.fillStyle = "#f5f7fb";
  ctx.font = "14px system-ui";
  ctx.fillText(`${gear.teeth} ${t("teeth")}`, gear.x, labelY + 22);

  ctx.beginPath();
  ctx.arc(gear.x, gear.y, 15, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,0,0,0.65)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 13px system-ui";
  ctx.fillText(gear.index + 1, gear.x, gear.y + 5);
}

function drawAxes(data) {
  if (!axisToggle.checked) return;

  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.setLineDash([8, 8]);
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(45, data[0].y);
  ctx.lineTo(canvas.clientWidth - 45, data[0].y);
  ctx.stroke();

  ctx.restore();
}

function updateResults(data) {
  const first = data[0];
  const last = data[data.length - 1];

  const totalRatio = last.teeth / first.teeth;
  const speed = Number(speedInput.value);
  const outputSpeed = speed * first.teeth / last.teeth;
  const sameDirection = (data.length - 1) % 2 === 0;

  ratioValue.textContent = `1 : ${totalRatio.toFixed(2)}`;
  outputSpeedValue.textContent = `${outputSpeed.toFixed(2)}×`;
  directionValue.textContent = sameDirection ? t("same") : t("opposite");

  inputTurnsValue.textContent = `${first.turns.toFixed(2)} ${t("turns")}`;
  outputTurnsValue.textContent = `${last.turns.toFixed(2)} ${t("turns")}`;

  turnList.innerHTML = "";

  data.forEach(gear => {
    const item = document.createElement("div");
    item.className = "turn-item";
    item.style.borderColor = gear.color;

    item.innerHTML = `
      <span style="color:${gear.color}">
        ${t("gear")} ${gear.index + 1}
      </span>
      <strong>${gear.turns.toFixed(2)} ${t("turns")}</strong>
    `;

    turnList.appendChild(item);
  });
}

function animate() {
  const speed = Number(speedInput.value);
  speedValue.textContent = `${speed.toFixed(1)}×`;

  if (running) {
    inputAngle += 0.018 * speed * inputDirection;
  }

  const data = getGearData();

  drawBackground();
  drawAxes(data);
  data.forEach(drawGear);
  updateResults(data);

  requestAnimationFrame(animate);
}

function lightenColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);

  let r = (num >> 16) + percent;
  let g = ((num >> 8) & 255) + percent;
  let b = (num & 255) + percent;

  r = Math.min(255, r);
  g = Math.min(255, g);
  b = Math.min(255, b);

  return `rgb(${r}, ${g}, ${b})`;
}

renderControls();
applyLanguage();
resizeCanvas();
animate();