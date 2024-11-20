//codice che aggiunge automaticamente tutti gli elementi al db
require ("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    //crea nuovi documenti nel database per ogni oggetto nell'array.
    await Product.create(jsonProducts);
    console.log("Success!!!!");
    //faccio terminare il processo con un codice di successo, 0
    process.exit(0);
  } catch (error) {
    console.log(error);
    //faccio terminare il processo con un codice di errore, 1
    process.exit(1); 
  } 
};


start();
