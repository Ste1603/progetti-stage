//importa direttamente errors/index.js
const { CustomAPIError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
//!il fatto che ci sia err nella firma fa capire che è un middleware per la gesione degli errorimi fa
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  //* validation error (manca il valore per un campo required)
  if (err.name === "ValidationError") {
    //nell'oggetto err è presente il campo errors che contiene i campi che hanno dato errore e per ognuno di questi degli attributi come ad esempio il messaggio di errore (impostato dal model). Con obejct.values ottengo il value di ognuno di questi campi da cui poi con map prendo per ognuno il campo message che contiene l'errore che ritorna il model
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = 400;
  }

  //* duplicate keyvalue error
  if (err.code && err.code === 11000) {
    //nell'oggetto errore tornato il campo keyValue contiene le coppie chiave valore che hanno causato l'errore. Facendo Object.keys(err.keyValue) otterro' l'array con solo le chiavi
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }

  //* cast error (il campo id passato ha di caratteri in più o in meno)
  if (err.name === "CastError") {
    customError.msg = `No item found with id : ${err.value}`;
  }
  //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};
//9:02

module.exports = errorHandlerMiddleware;
