//in questo file gestisco i comportamenti delle route tasks
const express = require("express");
//importo tutte le funzioni
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

const router = express.Router();

//imposto sulla route "/" la funzione getAllTasks per il get e createTask per il post
router.route("/").get(getAllTasks).post(createTask);
//imposto sulla route "/:id" le funzioni getTask per get, updateTask per patch e deleteTask per delete
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
