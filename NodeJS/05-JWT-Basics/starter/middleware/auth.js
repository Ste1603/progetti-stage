const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  //Controllo la presenza del token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication failed");
  }

  //se presente prelevo il token Authorization: `Bearer ${token}`
  const token = authHeader.split(" ")[1];

  //autenticazione = verifica del token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    /*decoded ha la seguente struttura
    "decoded": {
        "id": data a caso
        "username": "Stefano", 
        "iat": 1716491842, -> tempo di emissione
        "exp": 1719083842 -> scadenza
    }*/
    const { id, username } = decoded;
    //salvo l'oggetto user della richiesta
    req.user = { id, username };
    //passo il controllo al middleware successivo ovvero dashboard
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication failed");
  }
};

module.exports = authenticationMiddleware;
