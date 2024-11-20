//dovendo gestire una tipologia di errori, è necessario passare alla funzione il parametro err, il parametro next è inutile perchè qualsiasi errore che non sia istanza di CustomAPIError viene comunque gestito con return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
const CustomAPIError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: err.message });
};

module.exports = errorHandlerMiddleware;
