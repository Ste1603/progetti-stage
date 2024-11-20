require('dotenv').config();
require('express-async-errors')
const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

//security
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

//connessione DB
const connectDB = require('./db/connect');

//routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes.js');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');

//middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.set("trust proxy", 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    })
);

app.use(cors());
app.use(xss());
app.use(helmet());
app.use(mongoSanitize());

//!registra le richieste in entrata e le logga in console con il formato scelto (tiny)
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET)); //per leggere il cookie presente nella richiesta e decodificarlo con la chiave (signed è impostato a true)
app.use(express.static('./public'));
app.use (fileUpload()); 

app.get('/api/v1', (req, res) => {
    res.send('<h1>E-commerce API</h1>');
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });        
    } catch (error) {        
        console.log(error);
    }
};

start();