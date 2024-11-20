/*JWT (JSON Web Token) è uno standard che definisce un modo compatto e autenticato per il trasferimento sicuro di informazioni tra client e server
In questa app è possibile fare Get data, e quindi recuperare le informazioni solo se si è loggati ==> solo se nella request è presente un token valido*/ 

require('dotenv').config();
//la libreria express-async-errors serve per gestire le eccezioni generate da funzioni asincrone, evitando di mettere un blocco try-catch ad ogni funzione
require('express-async-errors');

const express = require('express');
const app = express(); // ritorna un oggetto applicazione Express che può essere configurato e avviato come un server

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');
const mainRouter = require('./routes/main');

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/', mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

