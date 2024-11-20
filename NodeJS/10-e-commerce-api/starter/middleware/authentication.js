const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  //contiene tutti i cookies firmati inviati dal client nella richiesta corrente
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }

  try {
    const payload = isTokenValid({ token });
    const { name, userId, role } = payload;
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
};

//!express richiede che le funzioni chiamate nelle route siano dei middleware e abbiano quindi la firma (req, res, next). authorizePermissions non ha questa firma e deve quindi ritornare una funzione (callback) che la rispetti
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};




module.exports = { authenticateUser, authorizePermissions };
