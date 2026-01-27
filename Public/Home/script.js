document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    updateDato();
    updateYear();
    loadCSV();
    setTimeout(updateTime, 1000);
    sortList();
});


let clock = document.querySelector('.clock');
let dato = document.querySelector('.date');
let year = document.querySelector('.year');
let ascending = true;

const list = document.getElementById("sakListe");

function updateTime(){
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds(); 

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    space = "  ";

    clock.innerHTML = `${hours}:${minutes}:${seconds}${space}`;

    setTimeout(updateTime, 1000);
}
updateTime();


function updateDato(){
    let day = new Date().getDay();
    let datoNumber = new Date().getDate(); 
    let month = new Date().getMonth();

    space = "  ";

    const days = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
    const dayName = days[day]; 

    const months = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"]
    const monthName = months[month]

    dato.innerHTML = `${dayName} ${datoNumber}. ${monthName}${space}`;

    console.log(monthName)
}


function updateYear(){
    let yearNumber = new Date().getFullYear();

    year.innerHTML = `${yearNumber}`;
}

function loadCSV() {
    fetch("data.csv")
        .then(response => response.text())
        .then(text => parseCSV(text))
        .catch(err => console.error("CSV load error:", err));
}

function parseCSV(text) {
    const lines = text.trim().split("\n");
    lines.shift();

    lines.forEach((line, index) => {
        createRow(line, index + 1);
    });
}

function createRow(line, index) {
    const [saknr,romnr,type,skjerm,utstyrnr,dato,tid] = line.split(",");

    const utstyrMap = ["Ingen tilbehør", "Headset", "Tastatur & Mus", "Headset, Tastatur & Mus"];
    const utstyr = utstyrMap[utstyrnr]; 

    const utstyrSVGMap = ["", "<img src='../svg/Headset.svg'>", "<img src='../svg/Keyboard.svg'> <img src='../svg/Mouse.svg'>", "<img src='../svg/Headset.svg'> <img src='../svg/Keyboard.svg'> <img src='../svg/Mouse.svg'>" ];
    const utstyrSVG = utstyrSVGMap[utstyrnr];

    const formattedSkjerm = skjerm.includes('x')
    ? skjerm.replace('x', '"x')
    : `${skjerm}"`;


    const li = document.createElement("li");
    li.classList.add("sak");

    li.innerHTML = `
        <div class="sak-main">
            <div class="sak-title">#${saknr}</div>
            <div class="sak-sub">${romnr} • ${type}</div>
        </div>

        <div class="tag screen">
            <img src="../svg/Screen.svg">
            <span>${formattedSkjerm}</span>
        </div>
        
        <div class="util">
            ${utstyrSVG}
            <p>${utstyr}</p>
        </div>
        
        <div id="sak-time" class="sak-time">${dato}, ${tid}</div>
    `;

    list.appendChild(li);
}

function parseDate(dateStr) {
  const [day, month, year, time] = dateStr.match(/(\d+)\.(\d+)\.(\d+), (\d+:\d+)/).slice(1);
  return new Date(`${year}-${month}-${day}T${time}`);
}

function sortList() {
  const items = Array.from(list.querySelectorAll("li"));

  items.sort((a, b) => {
    const dateA = parseDate(a.querySelector("#sak-time").textContent.trim());
    const dateB = parseDate(b.querySelector("#sak-time").textContent.trim());
    return ascending ? dateA - dateB : dateB - dateA;
  });

  items.forEach(item => list.appendChild(item));

  const indicator = document.getElementById("sort-indicator");
  indicator.textContent = ascending ? "Eldste først ↑" : "Nyeste først ↓";
}

document.getElementById("toggle-sort").addEventListener("click", () => {
  ascending = !ascending;
  sortList();
});


setInterval(() => {
    document.getElementById("sakListe").innerHTML = "";
    loadCSV();
}, 30000);
