//non essendoci particolari errori che questa funzione deve gestire (nessun errore per route non trovata) non è necessario il parametro err (next non è necessario nemmeno in error-handler)
const notFound = (req, res) => res.status(404).send('Route does not exist')

module.exports = notFound
