require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// database
const connectDB = require('./db/connect');

//product router
const productsRouter = require('./routes/productRoutes');

//!file upload
const fileUpload = require('express-fileupload');


//!cloudinary (importante il .v2)
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use(express.static('./public'));
app.use(express.json());

//app.use(fileUpload()); -> da usare se si salvano le immagini sul server
//!salva autmomaticamente le immagini temporaneamente (in tmp)
app.use(fileUpload({ useTempFiles: true })); //-> mi permette di tenere temporaneamente le immagini sul server e poi passarle al cloud



app.use('/api/v1/products', productsRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
