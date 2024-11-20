const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
    maxlength: 50,
    minlength: 3,
    //chiave primaria -> non possono esistere due user con lo stesso username
    unique: true,
  },

  email: {
    type: String,
    required: [true, "please provide an email"],
    maxlength: 50,
    minlength: 3,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide a valid email",
    ],
    //chiave primaria -> non possono esistere due user con la stessa mail
    unique: true,
  },

  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 6,
  },
});

//in una funzione dichiarata con function il this si riferisce al contesto dell'oggetto che ha chiamato la funzione, in un'arrow fuction il contesto è quello globale e non si riferirà all'oggetto che ha chiamato la funzione

//next come parametro fa capire a mongoose che deve passare alla funzione di callback la funzione di next per passare al middleware MONGOOOSE (non middleware di express) successivo (in questo caso non ci sono altri middleware mongoose quindi continua con ol salvataggio)

//la funzione .pre-save viene eseguita tra la creazione del documento e prima del suo inserimento nel db
userSchema.pre("save", async function (next) {
  //genero il fattore di costo = numero di volte che deve essere ripetuta la funzione di hashing => più è alto, più il calcolo sarà elevato e la pw sarà più sicura e difficile da decrittare
  const salt = await bcrypt.genSalt(10);
  //hashing della password
  //this si riferisce all'istanza del documento che sta per essere salvato
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//creo il metodo createJWT sullo schema userSchema
userSchema.methods.createJWT = function () {
                  //payload, key, options
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME}); 
};
//candidatePassword è la pw inserita dall'utente che deve essere confrontata con quella hashata nel db
userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
}

module.exports = mongoose.model("User", userSchema);
