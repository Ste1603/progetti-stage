const { CustomAPIError } = require('../errors/custom-error')
//sarà l'unico middleware di gestione degli errori perchè accetta come parametro err;
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandlerMiddleware