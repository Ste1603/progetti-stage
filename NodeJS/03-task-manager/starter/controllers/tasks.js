//in questo file definisco le funzioni per il comportamento delle route tasks
//importo il modulo contenente il modello dei documenti
const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
//ritorna tutte le task presenti nel db
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({}); //ritorna tutte i documenti con modello task presenti nel db
  res.status(200).json({ tasks });
});

//crea una task e la aggiunge al db
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

//ritorna una specifica task in base all'id
const getTask = asyncWrapper(async (req, res) => {
  //preleva l'attributo id dar req.params ma ritornalo con il nome taskID
  const { id: taskID } = req.params;
  //estraggo la task il cui attributo _id è uaguale a taskID
  const task = await Task.findOne({ _id: taskID });
  //senza questo if cambiando solo alcune lettere viene restituito task = null invece che l'errore, assegno un errore anche se vengono cambiate solo alcune lettere
  if (!task) {
    //passa al prossimo middleware di gestione errori (errorHandlerMiddleware) l'errore creato con la funzione createCustomError.
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

//modifica una task in base all'id
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    //mettendo req.body tutti i campi dell'oggetto della collezione che corrispondono ai campi dell'oggetto req.body vengono aggiornati
    new: true, //indica a mongoose di mostrare il documento aggiornato e non quello originale
    runValidators: true, //indica a mongoose di vare i controlli di correttezza dello schema di req.body prima di aggiornare
  });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task }); //req.body contiene il nuovo contenuto
});

//elimina una task in base all'id
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  //trova ed elimino una certa task in base all'id
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).send(); //non è necessario ritornare l'ggetto eliminato
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
