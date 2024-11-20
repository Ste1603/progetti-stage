const { StatusCodes } = require("http-status-codes");
const path = require("path");

//sto importando automaticamente index.js
const CustomError = require("../errors");
const { log } = require("console");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

//!se si vuole che le immagini siano caricate direttamente sul server (opzione peggiore a livello di performance) si usa questo codice altrimenti quello sotto effettua l'upload delle immagini su un cloud cloudinary (performance migliori)
/*const uploadProductImage = async (req, res) => {

  if(!req.files) {
    throw new CustomError.BadRequestError("No file uploaded");
  }

  //l'immagine viene passata nel campo image della richiesta sotto forma di codice
   const productImage = req.files.image;
  
  if(!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload image");
  }

  const maxSize = 1000;
  if(productImage.size > maxSize) {
    throw new CustomError.BadRequestError("Please upload image smaller than 1kb");
  }
  
  
   //__dirname = directory alla quale si trova uploadsController.js => (c:/Users/User/Desktop/Progetti_NodeJS/07-file-upload/starter/controllers) con ../public/uploads torno a starter
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );

  //sposto l'immagine in public/uploads
  await productImage.mv(imagePath);
  //nella prima funzione di browser-app.js viene estratto il valore di src così { data: { image: { src; } } }
  return res.status(StatusCodes.OK).json({ image: { src: `/uploads/${productImage.name}` } });
};*/

//!salvo le immagini prima temporaneamente nel server (possibile grazie al modulo express-fileupload) e poi le carico sul cloud
const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  //dopo aver caricato l'immagine su cloudinary la rimuovo da temp (sync = blocco il thread principale)
  fs.unlinkSync(req.files.image.tempFilePath);



  //* il path a cui sta l'immagine su cloudinary è contenuto in secure_url
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: result.secure_url } });
};

module.exports = { uploadProductImage };
