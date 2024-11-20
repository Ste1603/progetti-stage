const url = "/api/v1/products";
const fileFormDOM = document.querySelector(".file-form");

const nameInputDOM = document.querySelector("#name");
const priceInputDOM = document.querySelector("#price");
const imageInputDOM = document.querySelector("#image");

const containerDOM = document.querySelector(".container");
let imageValue;

// imageInputDOM.addEventListener('change',(e)=>{
//  const file = e.target.files[0];
//  console.log(file);
// })

//*imageInpt è l'elemento di input che accetta immagini. Una volta che l'utente ha caricato un'immagine viene sollevato l'evento di change in seguito al quale tramite const imageFile = e.target.files[0] prelevo il primo file e lo salvo in imageFile. FormData è un oggetto usato per trasferire i file come le immagini. In questo caso aggiunge il campo image con valore imageFile e lo invia alla route /api/v1/products/uploads con una post, specificando content-type come 'multipart/form-data' (fondamentale). A livello server si accede all'immagine semplicemente con req.files, questo grazie all'oggetto FormData, alla specifica 'Content-Type':'multipart/form-data' e al middleware express-fileupload
imageInputDOM.addEventListener("change", async (e) => {
  const imageFile = e.target.files[0];
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const {
      data: {
        image: { src },
      },
    } = await axios.post(`${url}/uploads`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    imageValue = src;
  } catch (error) {
    imageValue = null;
    console.log(error);
  }
});

fileFormDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nameValue = nameInputDOM.value;
  const priceValue = priceInputDOM.value;
  try {
    //!imageValue è diventata l'immagine quando viene fatto imageValue = src nella funzione qua sopra
    const product = { name: nameValue, price: priceValue, image: imageValue };

    await axios.post(url, product);
    fetchProducts();
  } catch (error) {
    console.log(error);
  }
});

async function fetchProducts() {
  try {
    const {
      data: { products },
    } = await axios.get(url);
    //!al posto di product.image ci sarà il path /uploads/computer-1.jpg che in automatico verrà cercato nella cartella public configurata come statica 
    const productsDOM = products
      .map((product) => {
        return `<article class="product">
          <img src="${product.image}" alt="${product.name}" class="img"/>
          <footer>
          <p>${product.name}</p>
          <span>$${product.price}</span>
          </footer>
          </article>`;
      })
      .join("");
    containerDOM.innerHTML = productsDOM;
  } catch (error) {
    console.log(error);
  }
}

fetchProducts();
