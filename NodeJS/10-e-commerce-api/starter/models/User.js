const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [50, "Name must not be more than 50 characters"],
  },
  email: {
    type: String,
    unique: true, //errore gesti nell'error handler, codice errore 11000 = duplicate value
    required: [true, "Please add an email"],
    validate: {
      validator: validator.isEmail, //funzione da usare
      message: "Please enter a valid email", //messaggio da tornare se valdiator = false
    },
    //!va bene anche fare validate: [email, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

//prima di salvare uno user faccio l'hash della password
//!next è opzionale per le funzioni dichiarate come async (fa in automatico)
userSchema.pre("save", async function () {
  if (!this.isModified('password')) return; //* necessario per la vesione di userUpdate con User.save
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Controllo della password
//!i metodi definiti con .methods sono chiamabili dall'istanza
userSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};



module.exports = mongoose.model("User", userSchema);
