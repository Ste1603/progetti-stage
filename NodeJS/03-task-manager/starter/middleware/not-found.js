//viene ritornato quando la ROUTE (diverso da id) non è valida, ad esempio .../thsks al posto di .../tasks ==> se l'id è sbagliato non viene chiamato questo middleware
const notFound = (req, res) => res.status(404).send("Route does not exixst");

module.exports = notFound;      