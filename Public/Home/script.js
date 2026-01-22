document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    updateDato();
    updateYear();
});


let clock = document.querySelector('.clock')
let dato = document.querySelector('.date')
let year = document.querySelector('.year')

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