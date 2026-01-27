let lastCSV = "";

document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    updateDato();
    updateYear();
    loadCSV();

    setInterval(loadCSV, 10000);
});


const clock = document.querySelector('.clock');
const dato = document.querySelector('.date');
const year = document.querySelector('.year');
const list = document.getElementById("sakListe");


function updateTime() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    clock.innerHTML = `${hours}:${minutes}:${seconds}`;

    setTimeout(updateTime, 1000);
}

function updateDato() {
    const now = new Date();

    const days = [
        "Søndag", "Mandag", "Tirsdag",
        "Onsdag", "Torsdag", "Fredag", "Lørdag"
    ];

    const months = [
        "Januar", "Februar", "Mars", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Desember"
    ];

    const dayName = days[now.getDay()];
    const datoNumber = now.getDate();
    const monthName = months[now.getMonth()];

    dato.innerHTML = `${dayName} ${datoNumber}. ${monthName}`;
}

function updateYear() {
    year.innerHTML = new Date().getFullYear();
}

function loadCSV() {
    fetch("data.csv", { cache: "no-store" })
        .then(response => response.text())
        .then(text => {
            if (text !== lastCSV) {
                lastCSV = text;
                renderCSV(text);
            }
        })
        .catch(err => console.error("CSV load error:", err));
}

function renderCSV(text) {
    list.innerHTML = "";

    const lines = text.trim().split("\n");

    lines.shift();

    lines.forEach(line => createRow(line));
}


function createRow(line) {
    const [saknr, romnr, type, skjerm, utstyrnr, dato, tid] = line.split(",");

    const utstyrMap = [
        "Ingen tilbehør",
        "Headset",
        "Tastatur & Mus",
        "Headset, Tastatur & Mus"
    ];

    const utstyrSVGMap = [
        "",
        "<img src='../svg/Headset.svg'>",
        "<img src='../svg/Keyboard.svg'> <img src='../svg/Mouse.svg'>",
        "<img src='../svg/Headset.svg'> <img src='../svg/Keyboard.svg'> <img src='../svg/Mouse.svg'>"
    ];

    const utstyr = utstyrMap[utstyrnr] ?? "Ukjent";
    const utstyrSVG = utstyrSVGMap[utstyrnr] ?? "";

    const formattedSkjerm = skjerm.includes("x")
        ? skjerm.replace("x", '"x')
        : `${skjerm}"`;

    const li = document.createElement("li");
    li.classList.add("sak");

    li.innerHTML = `
        <div class="sak-main">
            <div class="sak-title">
                <img src="../svg/Document.svg">
                <p>${saknr}</p>
            </div>

            <div class="sak-sub">
                <img src="../svg/Placement.svg">
                <p>${romnr} • ${type}</p>
            </div>
        </div>

        <div class="tag screen">
            <img src="../svg/Screen.svg">
            <span>${formattedSkjerm}</span>
        </div>

        <div class="util">
            ${utstyrSVG}
            <p>${utstyr}</p>
        </div>

        <div class="sak-time">${dato}, ${tid}</div>
    `;

    list.appendChild(li);
}
