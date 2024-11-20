const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/auth');

//se voglio una sola operazione (post) su questa route, altrimenti se c'è anche una get è meglio usare router.route('/register').post(register).get(...)    
router.post('/register', register);
router.post('/login', login);
module.exports = router