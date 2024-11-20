const mongoose = require("mongoose");

//un database MongoDB contiene collezioni di documenti (sequenze di coppie chiave-valore), ognuno con uno schema

//creo uno schema per documenti chiamato TaskSchema
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

//tutti i documenti con modello Task avranno schema TaskSchema
module.exports = mongoose.model("Task", TaskSchema);
