const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },

  {
    id: 10,
    title: "stake",
    category: "dinner",
    price: 16.99,
    img: "./images/item-10.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },

  //aggiungendo ora un qualsiasi nuovo elemento con una nuova categoria 
  //verrà automaticamente creato un nuovo button per quella nuova categoria
];

const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

//load all items
window.addEventListener('DOMContentLoaded', function(){
  displayMenuItems(menu);
  const categories = menu.reduce((values, item) => {
    if(!values.includes(item.category)){
      values.push(item.category);
    }
    return values;
  }, ['all']);

  const categoryBtns = categories.map(function(category){
    return `<button class="filter-btn" type="button" data-id=${category}>${category}</button>`;
  }).join(""); //avendo dichiarato categoryBtns come una costante non
  //posso fare come per displayMenu, ovvero displayMenu = displayMenu.join("");,
  //perchè non posso cambiarne il valore e devo restituirla direttamente joinata 

  btnContainer.innerHTML = categoryBtns;
  //la selezione dei buttons va fatta dopo che il loro codice è stato
  //scritto dinamicamente con la funzione map
  const filterBtns = document.querySelectorAll(".filter-btn");

  //filter items
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', function(e){
      const categoryBtn = e.currentTarget.dataset.id;
      if(categoryBtn === 'all'){
        displayMenuItems(menu);
      }
      else{
        //se la funzione di callback ritorna true la funzione filter aggiunge
        //l'elemento all'array menuFiltered altrimenti no. Alla fine ritorna 
        //l'array con tutti gli elementi che rispettano la condizione
        const menuFiltered = menu.filter(function(menuItem){
          return menuItem.category === categoryBtn;
        })
        displayMenuItems(menuFiltered);
      }
    });
  });

});



function displayMenuItems(menuItems){
    //con map applico la funzione ad ogni elemento item dell'array (passato come parametro alla funzione)
    let displayMenu = menuItems.map(function(item){
      //${...} literal template
      return `<article class="menu-item">
                <img src=${item.img} alt="" class="photo">
                <div class=${item.title}>
                  <header>
                    <h4>${item.title}</h4>
                    <h4 class="price">${item.price}</h4>
                  </header>
  
                  <p class="item-text">
                    ${item.desc}
                  </p>
                </div>
              </article>`
    });
  
    displayMenu = displayMenu.join("");
  
    //sostituisco il contenuto html di sectionCenter con quello di displayMenu appena creato con la 
    //funzione map  
    sectionCenter.innerHTML = displayMenu;
}

/*IN QUESTO MODO IL CODICE E' CORRETTO MA NON OTTIMIZZATO NEL CASO SI VOGLIA AGGIUNGERE UNA CATEGORIA
SEGUE LA PARTE DI CODICE PER RENDERLO "AUTOMATICO" IN SEGUITO A DELLE MODIFICHE */

