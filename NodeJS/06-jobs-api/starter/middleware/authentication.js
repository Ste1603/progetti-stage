const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  //check header -> il token viene salvato nell'intastazione nel campo authorization preceduto da Bearer
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('No token provided');
    }
    //prendo il token -> "Bearer adfaimp04.m875n0348.cm2384r8ucm23"
    const token = authHeader.split(' ')[1];

    try {   
        //verifico che il token sia valido: se è valido vengono restituiti i dati del token e vengono assegnati alla variabile payload
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        //aggiungo le informazioni sullo user alla richiesta estraendole dal token => in questo modo il prossimo middleware potrà usarle per effettuare operazioni. 
        req.user = { userId: payload.userId };
        //passo la richiesta al prossimo middleware nella coda (jobsRouter)
        next();
    } catch (error) {    
        throw new UnauthenticatedError('Not authorized to access this route');
    }   
};
    

module.exports = auth