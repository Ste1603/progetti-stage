const asyncWrapper = (fn) => {
    //ritorna una funzione dichiarata come async perchè 
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
