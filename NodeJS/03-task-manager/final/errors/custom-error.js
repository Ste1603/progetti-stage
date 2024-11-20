class CustomAPIError extends Error {
  constructor(message, statusCode) {
    //quando si crea un oggetto errore è necessario passare come parametro il testo dell'errore
    super(message)
    this.statusCode = statusCode
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode)
}

module.exports = { createCustomError, CustomAPIError }
