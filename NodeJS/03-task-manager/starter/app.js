const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
// il modulo dotenv cerca il file .env e carica le variabili d'ambiente definite all'interno di esso nell'oggetto process.env
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.static("./public"));
app.use(express.json());

//monto il middleware tasks sull'url "/api/v1/tasks", quando viene fatta una richiesta con una route non presente in questo file/middleware il controllo viene passato al middleware successivo (notFound)
app.use("/api/v1/tasks", tasks);

//essendo posto dopo il middleware tasks, se la route specificata dall'utente non è valida viene passato il controllo a notFound.
app.use(notFound);
app.use(errorHandlerMiddleware);

//viene tentata la connessione con il database e la connessione con il server, se qualcosa da errore questo viene restituito.
//la connessione al server viene fatta sul numero di porta definito o altrimenti sulla porta 5000. 
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    //MONGO_URI è la variabile d'ambiente presente nel file .env (se non esiste va creato)
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server online on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
