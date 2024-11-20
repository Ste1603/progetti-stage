const jwt = require("jsonwebtoken");

//Creazione jwt
const createJWT = function ({ payload }) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

const isTokenValid = function ({ token }) {
  return jwt.verify(token, process.env.JWT_SECRET);
};

//Setta il token nel cookie dell'oggetto risposta. Quando il client riceve l'oggetto risposta memorizza il token nel browser
const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production", //! i cookies vengono accettati solo in https (anche in http se stiamo testando e programmando l'applicazione => production = rilasciato e utilizzato dagli utenti)
    signed: true, //! serve per firmare i cookie
  });

};



module.exports = { createJWT, isTokenValid, attachCookiesToResponse};
