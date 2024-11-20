const formDOM = document.querySelector(".form");
const usernameInputDOM = document.querySelector(".username-input");
const passwordInputDOM = document.querySelector(".password-input");
const formAlertDOM = document.querySelector(".form-alert");
const resultDOM = document.querySelector(".result");
const btnDOM = document.querySelector("#data");
const tokenDOM = document.querySelector(".token");

formDOM.addEventListener("submit", async (e) => {
  formAlertDOM.classList.remove("text-success");
  tokenDOM.classList.remove("text-success");

  e.preventDefault();
  const username = usernameInputDOM.value;
  const password = passwordInputDOM.value;

  try {
    //una volta inviati le credenziali, viene estratto il campo data dall'oggetto di risposta
    const { data } = await axios.post("/login", { username, password });

    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = data.msg;

    formAlertDOM.classList.add("text-success");
    usernameInputDOM.value = "";
    passwordInputDOM.value = "";

    //memorizzo data.token nella localStorage del browser sotto il nome di token
    localStorage.setItem("token", data.token);
    resultDOM.innerHTML = "";
    tokenDOM.textContent = "token present";
    tokenDOM.classList.add("text-success");
  } catch (error) {
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = error.response.data.msg;
    localStorage.removeItem("token");
    resultDOM.innerHTML = "";
    tokenDOM.textContent = "no token present";
    tokenDOM.classList.remove("text-success");
  }
  //dopo 2 secondi viene fatto formAlertDOM.style.display = 'none'
  setTimeout(() => {
    formAlertDOM.style.display = "none";
  }, 2000);
});

//per fare la get devo mettere il token nella request 
btnDOM.addEventListener("click", async () => {
  //prendo il token dal localStorage
  const token = localStorage.getItem("token");
  try {
    //aggiungo il token nell'header della richista
    const { data } = await axios.get("/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    resultDOM.innerHTML = `<h5>${data.msg}</h5><p>${data.secret}</p>`;

    //data.secret;
  } catch (error) {
    localStorage.removeItem("token");
    resultDOM.innerHTML = `<p>${error.response.data.msg}</p>`;
  }
});

const checkToken = () => {
  tokenDOM.classList.remove("text-success");

  const token = localStorage.getItem("token");
  if (token) {
    tokenDOM.textContent = "token present";
    tokenDOM.classList.add("text-success");
  }
};
//quando viene ricaricata la pagina viene controllato se è presente un token nella localStorage
checkToken();
