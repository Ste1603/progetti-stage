//questo file definisce lo schema dei documenti all'interno del database
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "you must provide a name"], //se nel body della richiesta di post non è incluso l'attributo nome viene ritornato un errore con messaggio: you must provide a name
    trim: true, //rimuove gli spazi bianchi in eccesso
        maxlength: [20, "name length not valid"],//imposta la lunghezza massima
  },
    completed: {
        type: Boolean,
        default: false //Se non viene specificato viene messo come default a falso
    }
});
//i documenti Task avranno lo schema TaskSchema, la collezione avrà nome tasks
module.exports = mongoose.model("Task", TaskSchema);
