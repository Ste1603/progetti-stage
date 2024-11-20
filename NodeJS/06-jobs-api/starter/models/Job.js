const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      //tipo specifico di identificatore utilizzato da MongoDB 
        type: mongoose.Types.ObjectId,
        //chiave esterna -> createdBy è un elemento della collezione User
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true } //aggiunge attribute createdAt e updatedAt (data e ora di creazione e ultima modifica)
)

module.exports = mongoose.model('Job', JobSchema)