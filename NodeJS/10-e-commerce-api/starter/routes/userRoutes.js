const { authenticateUser, authorizePermissions } = require("../middleware/authentication"); //devo mettere autenticateUser per ogni route (invece che imposrtarlo sulla route radice in app.js) perchè per la funzione getAllUsers devo usare il middleware authorizePermissions per verificare che sia un admin ad effettuare quell'operazione.

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

const express = require("express");

const router = express.Router();

//!authorizePermissions("admin", "owner") dovrà restituire una funzione middlware (con firma req, res, next). 
//le parentesi quadre sui middleware di autenticazione sono una scelta sintattica (non cambiano le funzionalità se non si mettono )
router.route("/").get([authenticateUser, authorizePermissions("admin")], getAllUsers);
router.route("/showMe").get([authenticateUser], showCurrentUser);
router.route("/updateUser").patch([authenticateUser], updateUser);
router.route("/updateUserPassword").patch([authenticateUser], updateUserPassword);
//! se metto queste route sotto a getSingleUser, la route /:id intercetterà tutte le richieste, vedrà "showMe", "updateUser" e "updateUserPassword" come degli id.

router.route("/:id").get([authenticateUser], getSingleUser); 

module.exports = router;
    