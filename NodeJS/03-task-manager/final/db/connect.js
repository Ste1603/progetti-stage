const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    //creazione indici per velocizzare l'accesso alle query
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
} 

module.exports = connectDB
