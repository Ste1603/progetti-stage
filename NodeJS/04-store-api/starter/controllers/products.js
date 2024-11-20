const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const search = "wooden table";
  const products = await Product.find({
    //ritorna tutti i prodotti che contengono il valore search nel campo name.
    //options: "i" => case insensitive
    name: { $regex: search, $options: "i" },
  });

  const productsSorted = await Product.find({}).sort("price");

  //nbHits conterrà il numero di prodotti prelevati dal db
  //res.status(200).json({ products, nbHits: products.length });
  res.status(200).json({ productsSorted, nbHits: productsSorted.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  //oggetto che conterrà i criteri di ricerca (filtering)
  const queryObject = {};

  //se viene passato il parametro featured, lo aggiunge all'oggetto queryObject con il valore corrispondente
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  //se viene passato il parametro company, lo aggiunge all'oggetto queryObject con il valore corrispondente
  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" }; //serve per controllare se il valore di name passato è contenuto nei campi name
  }

  if (numericFilters) {
    //associo il formato comprensibile degli operatori a quello comprensibile da mongoose
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(>|>=|<|<=)\b/g; //creo una regex per controllare se l'indirizzo conterrà uno di questi simboli

    //per ogni match tra regEx e numericFilters, sostituisco con l'operatore corrispondente presente in operatorMap
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(filters);
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      //esempio di filtro = "price-$gt-200"
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });

    //queryObject risulterebbe ad esempio { pricing: { $gt: 200 }, rating: { $gt: 4.5 } }
  }

  
  //sono costretto a fare in questo modo perchè sort() è la funzione query.prototype.sort() e va quindi effettuata su una query (creata con Product.find(queryObject)) ==> o concateno find e sort o chiamo sort separatamente sulla query.
  //In questo modo memorizzo la query nella variabile result e poi chiamo sort su result
  let query = Product.find(queryObject);
  /*se l'oggetto queryObject è fatto nel seguente modo
  { pricing: { $gt: 200 }, rating: { $gt: 4.5 } }
  l'operazione di find ritornerà solo i prodotti con prezzo>200 e rating>4.5*/
  if (sort) {
    const sortList = sort.split(",").join(" ");
    query = query.sort(sortList);
  } else {
    //se non viene passato il parametro sort, allora ordino per il campo createdAt che di default è impostato con la Date.now()
    query = query.sort("createdAt");
  }
  //POTEVO FARE ANCHE IN QUESTO MODO CONCATENANDOI IL FIND E IL SORT
  /*let products;
  if (sort) { 
    const sortList = sort.split(",").join(" ");
    products = await Product.find(queryObject).sort(sortList); 
    //console.log(result);
  }*/

  //mostro solo i campi richiesti
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    query = query.select(fieldsList);
  }
  //fino a qui è come se facessi Product.find(queryObject).sort(sortList).select(fieldsList);

  const page = Number(req.query.page) || 1; //numero della pagina (default 1)
  const limit = Number(req.query.limit) || 23; //numero di items per pagina (default 23)
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);
  //23 total items
  //se voglio max 7 items per pagina, le pagine 1,2,3 avranno 7 items e la pagina 4 avrà 2 items
  const products = await query;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
