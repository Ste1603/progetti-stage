const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];

const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener('click', function(){
    //estraggo un numero compreso tra 0 e 3 (i quattro colori/elementi dell'array)
    const randomNumber = getRandomNumber();

    document.body.style.backgroundColor = colors[randomNumber];
    //cambio la scritta che identifica il colore
    color.textContent = colors[randomNumber];
});

function getRandomNumber(){
    return Math.floor(Math.random()*colors.length);
}