const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You need to provide a product name"],
  },
  price: {
    type: Number,
    required: [true, "You need to provide a product price"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
        values: ["ikea", "liddy", "caressa", "marcos"],
        //se il valore per company inserito dall'utente non è valido, viene stampata la seguente stringa dove {VALUE} viene sostituito dal valore inserito dall'utente
      message: "{VALUE} is not supported",
    },
  },
});

module.exports = mongoose.model("Product", productSchema);
