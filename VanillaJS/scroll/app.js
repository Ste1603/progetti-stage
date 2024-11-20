// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read-only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById("date");
//new Date() crea un oggetto di tipo date e con getFullYear() viene ritornato l'anno (sono built-in in JS)
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");


navToggle.addEventListener("click", function(){
    /*versione nabbo
    linksContainer.classList.toggle("show-links");*/
    
    //versione pro
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;   

    if(containerHeight === 0){
        linksContainer.style.height = `${linksHeight}px`; //devo metterlo tra apici ma linksHeight va valutata IMPORTANTE: in questo modo (...style.height) viene aggiunto inline nell'HTML e non nel css
    }

    else{
        linksContainer.style.height = 0;  
    }

})


// ********** fixed navbar ************
const navBar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");


window.addEventListener("scroll", function(){
    const scrollHeight = window.scrollY;
    const navHeight = navBar.getBoundingClientRect().height;

    if(scrollHeight > navHeight)
        navBar.classList.add("fixed-nav");
    else
        navBar.classList.remove("fixed-nav");
    //dopo 500px mostro il  pulsante in basso a destra per tornare in cima
    if(scrollHeight > 500)
        topLink.classList.add("show-link");
    else
        topLink.classList.remove("show-link");


})


/* ********** smooth scroll *************/
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
    link.addEventListener('click', function(e){
        //evita il comportamento di default che con il click porta alla sezione 
        e.preventDefault();
        //navigate to specific spot
        //ottengo il valore di href dell'oggetto su cui ho cliccato ad esempio #services. Con slice(1) prendo solo services escludendo l'hastag perchè questo valore andrà passato ad un getElementById dove non va messo l'hastag.
        const id = e.currentTarget.getAttribute("href").slice(1);
        const element = document.getElementById(id);
        const navHeight = navBar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = navBar.classList.contains("fixed-nav"); //sarà true o false
        
        console.log(navHeight);
        //guarda sopra cosa fa
        let elementPosition = element.offsetTop - navHeight;

        //se la navBar non è fixed ma sono all'inizio della pagina, questa risulterà di altezza 0 e quindi element.offsetTop - navHeight non risolve il problema del nome della sezione nascosto.
        //Risolvo quindi rimuovendo ancora navHeight
        if(!fixedNav){
            elementPosition = elementPosition - navHeight;
        }

        if(navHeight > 82){
            elementPosition = elementPosition + containerHeight;
        }   

        window.scrollTo({
            left:0,
            top: elementPosition,
        });

        //quando clicco su un link in mobile mode il menu si chiude
        linksContainer.style.height = 0;
    })
})

