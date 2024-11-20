// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
//definisco le funzioni di callback a parte
submitBtn.addEventListener("click", addItem);

//clear items
clearBtn.addEventListener("click", clearItems);
// display items onload
window.addEventListener("DOMContentLoaded", setupItems);

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  //ad ogni item da aggiungere alla lista voglio assegnare un id unico
  const id = new Date().getTime().toString();

  //se value è diverso dalla stringa vuota (se vuota value sarà false) e editFlag è falso (non voglio modificare un item già nella lista) devo aggiungere l'item alla lista
  if (value && editFlag === false) {
    const element = document.createElement("article");
    //add class
    element.classList.add("grocery-item");
    //add id
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p>                  
                        <div class="btn-container">
                          <button type="button" class="edit-btn">
                            <i class="fas fa-edit"></i>
                          </button>
                          <button type="button" class="delete-btn">
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>`;

    //solamente a questo punto ho accesso ai tasti di delete e edit perchè vengono aggiunti dinamicamente
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");

    //aggiungo l'evento click ad entrambi i tasti
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);

    //aggiungo l'elemento alla lista
    list.appendChild(element);
    //mostro l'alert che l'elemento è stato aggiunto
    displayAlert("item added to the list", "success");
    //mostro la lista
    container.classList.add("show-container");
    //memorizzo il codice aggiunto in modo che quando si riapre la pagina le modifiche sono salvate
    addToLocalStorage(id, value);
    //set back to default svota la barra di inserimento per poter aggiungere un nuovo item
    setBackToDefault();
  } //se editFlag è true allora voglio modificare un item già nella lista
  else if (value && editFlag === true) {
    //dopo aver premuto il button per l'edit, editFlag viene messo a true, il tasto da submit cambia a edit e nella barra di inserimento viene copiato il testo dell'elemento da editare (guarda sotto la funzione editItem)
    editElement.innerHTML = value;
    displayAlert("value changed", "succes");

    //edit local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger");
  }
}

//display alert function
function displayAlert(text, action) {
  //action distingue alert rosso da alert verde
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  //remove alert after 1sec
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

//setBackToDdefault function
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

//clearItems function
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }

  container.classList.remove("show-container");
  displayAlert("list cleared", "success");
  setBackToDefault();
  localStorage.removeItem("list");
}

//deleteItem: al click devo accedere all'elemento grocery-item nel quale il button è contenuto
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  //se la list è vuota (list.children ritorna una lista con tutti i figli diretti di list)
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }

  displayAlert("item removed", "danger");
  setBackToDefault();
  //remove from local storage
  removeFromLocalStorage(id);
}

//editItem
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  //Set edit item, voglio accedere ell'elemento con classe title che è l'elemento precedente nello stesso livello gerarchico del DOM (previousElementSibling)
  editElement = e.currentTarget.parentElement.previousElementSibling;

  //set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  const grocery = { id, value }; //uguale a scrivere {id:id, value:value}
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  //verifica se esiste un elemento chiamato "list" nell'archiviazione locale. Se esiste, il valore di "list" viene recuperato tramite localStorage.getItem("list"), quindi viene analizzato come JSON utilizzando JSON.parse(). Se non esiste, viene restituito un array vuoto [].
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    return item.id !== id;
  });

  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

// ****** SETUP ITEMS **********
//questa funzione mostra gli elementi presenti anche al ricaricamento della pagina
//(una volta aggiunti alla local storage ci rimangono finchè non la si svuota)
function setupItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach(function (item) {
      //chiamo la funzione createListItem che a partire dalla local storage ricostruisce la lista da mostrare
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}

function createListItem(id, value) {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("grocery-item");
  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
  // add event listeners to both buttons;
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  // append child
  list.appendChild(element);
}
