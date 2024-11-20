require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();


const sendEmail = require('./controllers/sendEmail');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('<h1>Email Project</h1> <a href="/send">send email</a>');
});


app.get('/send', sendEmail);

//prima di notFoundMiddleware bisogna mettere tutti middleware che gestiscono route valide, se nessuno gestisce una richiesta (route inesistente) questa arriva a notFoundMiddleware 
app.use(notFoundMiddleware);
//gestisce gli errori perchè è l'unico che nella firma ha il parametro err
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
