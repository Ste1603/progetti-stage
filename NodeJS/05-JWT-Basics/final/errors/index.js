
//Facendo require("./errors") dove servono gli errori viene automaticamente cercato il file errors/index.js da cui importare i moduli
const CustomAPIError = require('./custom-error');
const BadRequestError = require('./bad-request')
const UnauthenticatedError = require('./unauthenticated')

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
}