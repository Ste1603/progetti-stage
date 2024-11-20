//questo file gestisce la connessione dell'app al database
const mongoose = require("mongoose");

//la funzione connectDB effettua la connessione prendendo come parametro l'url del db 
const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;