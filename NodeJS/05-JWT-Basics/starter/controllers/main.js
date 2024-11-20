/*controllo username, pw ricevuti tramite post e se rispettano certe condizioni creo un nuovo JWT
Imposto poi l'autenticazione in modo che solo le richieste contenti il token possano accedere alla dashboard*/

const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;
  //Se non sono presenti username o password, lancio un errore di tipo CustomAPIError con status code 400
  if (!username || !password) {
    //errore captato dal middleware error-handler che ritorna un json con il messaggio di errore
    throw new CustomAPIError("Please provide name and password", 400);
  }
  //genero un id a caso 
  const id = new Date().getDate()
  //creo un token => primo parametro = oggetto payload, secondo parametro = chiave, oggetto opzioni (il token scadra' dopo 30 giorni)
  //l'header viene creato in automatico dal pacchetto jsonwebtoken.
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  //se la variabile e il campo hanno lo stesso nome basta metterlo una volta => solo token e non token: token
  res.status(200).json({ msg: `Welcome, ${username}`, token }); //status code a 200 di default
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })

};

module.exports = {
  login,
  dashboard,
};
