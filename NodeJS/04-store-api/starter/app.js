const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
require("express-async-errors");

const productsRouter = require("./routes/products");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//!middleware: trasforma il corpo delle richieste da formato json ad oggetto js accessibile con req.body
app.use(express.json());


//routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use("/api/v1/products", productsRouter);

//se li metto prima di app.get("/"...) saranno loro ad intercettare tutte le richieste http ==> è necessario definire i middleware di gestione degli errori alla fine della catena di gestione delle richieste
app.use(notFoundMiddleware);
app.use(errorMiddleware); //!sempre alla fine: se lo metto prima intercetterà anche l'errore "route non esistente"
//fine middleware

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listening on port ${port}`));  
  } catch (error) {
    console.log(error);
  }
};

start();
