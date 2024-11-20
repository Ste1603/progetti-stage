const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];


const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4")

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
// months are ZERO index based;
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);
//in questo modo setta ad ogni caricamento una scadenza pari a 10 giorni a partire dalla data corrente.

//let futureDate = new Date(2024, 1, 29, 23, 59, 0); 
//anno, mese(con indici a partire da 0), giorno, ore, minuti, secondi

const year = futureDate.getFullYear();
//futureDate.getMonth() ritorna l'indice
const month = months[futureDate.getMonth()];
const hours = futureDate.getHours();
const date = futureDate.getDate();
const minutes = futureDate.getMinutes();
//futureDate.getDay() ritorna l'indice
const weekDay = weekdays[futureDate.getDay()];  

giveaway.textContent = `giveaway ends on ${weekDay} ${date} ${month} ${year} at ${hours}:${minutes}pm`;

const futureTime = futureDate.getTime();
//restituisce il numero di millisecondi trascorsi dal 1 gennaio 1970 00:00:00 UTC fino a tale data

function getRemainingTime(){
  //restituisce il numero di millisecondi trascorsi dal 1 gennaio 1970 00:00:00 UTC fino ad oggi (di default new Date() ritorna la data corrente)
  const today = new Date().getTime();
  const t = futureTime - today;

  //1 day in ms
  const oneDay = 24*60*60*1000; 
  //1s = 1000ms
  //1 min = 60s
  //1h = 60min
  //1day = 24h

  //1 hour in ms
  const oneHour = 60*60*1000;

  //1 min in ms
  const oneMin = 60*1000;
  const oneSec = 1000;

  //calculate the remaining days
  let days = Math.floor(t/oneDay);
  let hours = Math.floor((t % oneDay)/oneHour); //tolgo la parte dei giorni espressa in ore perchè l'ho già espressa in giorni
  let minutes = Math.floor((t % oneHour)/oneMin);
  let seconds = Math.floor((t % oneMin)/1000);

  //set them into an array
  const values = [days, hours, minutes, seconds];

  //se i valori sono minori di 10, ad es 2 giorni, lo trasformo in 02 giorni
  function format(item){
    if(item < 10){
      return item = `0${item}`
    }
    return item;
  }

  items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  });

  if(t < 0){ //significa che la scadenza è minore della data corrente

    clearInterval(conuntdown);
    deadline.innerHTML = `<h4>sorry but this giveaway is expired</h4>`;
  }
}

//setting the live conuntdown
let conuntdown = setInterval(getRemainingTime, 1000); //chiama la funzione getRemainingTime ad ogni secondo

getRemainingTime();