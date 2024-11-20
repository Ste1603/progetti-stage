const express = require('express');
const router = express.Router();

const { login, dashboard } = require('../controllers/main');

const authenticationMiddleware = require('../middleware/auth');

//ad ogni get su /dashboard viene prima chiamato la funzione authenticationMiddleware e poi dashboard
router.route("/dashboard").get(authenticationMiddleware, dashboard);
//ad una richiesta di login viene chiamata la funzione login che crea il token 
router.route("/login").post(login);

module.exports = router;