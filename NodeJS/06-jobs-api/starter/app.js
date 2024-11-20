require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const autenticateUser = require('./middleware/authentication');
//DB connection
const connectDB = require('./db/connect');

//routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//helmet -> configura gli header per garantire sicurezza
const helmet = require('helmet');
//cors -> previene dai cors error (Cross-Origin Resource Sharing)
const cors = require('cors');
//css-clean -> previene dall'iniezione di codice malevolo
const xss = require('xss-clean');
//rateLimiter -> limita il numero di richieste dell'utente
const rateLimiter = require('express-rate-limit');

app.use(express.json());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs',autenticateUser, jobsRouter);


//Se nessuna delle rotte qua sopra gestisce la richiesta sarà notFound a rispondere
app.use(notFoundMiddleware);
//Chiamato in causa dalle dalle rotte quando ci sono errori
app.use(errorHandlerMiddleware);

app.use(helmet());
app.use(cors());
app.use(xss());
//dice ad express di fidarsi del fatto che le richieste arrivino da un proxy
app.set('trust proxy', 1);
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 })); //max 100 richieste ogni 15 min

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
