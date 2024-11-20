const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide a rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide review title"],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, "Please provide a comment"],
      maxlength: 1000,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { setTimestamps: true }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true }); //ogni utente può lasciare una sola recensione per ogni prodotto

//!le funzioni statiche sono definite sul modello e non sulle istanze
reviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    {
      $match: {
        product: productId,
      },
    },
    {
      $group: {
        _id: null,
        averageRating: {
          $avg: "$rating",
        },
        numOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);
  //*resulta è una cosa del tipo [ { _id: null, averageRating: 2.3333333333333335, numOfReviews: 3 } ]
  console.log(result);
  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        /*Tronca mantenendo la prima cifra decimale
                 result[0]?.averageRating permette di accedere alla proprietà averageRating dell'oggetto ad indice 0 di result senza causare un errore se l'oggetto o la proprietà non esiste.*/
        averageRating: Math.trunc(result[0]?.averageRating * 10 || 0) / 10,
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

reviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

//usando deleteOne this.constructr non funzionerebbe perchè deleteOne non ritorna l'oggetto eliminato. Bisogna fare quindi una funzione pre("deleteOne") che salvi il doc in una variabile temporanea this.doc prima di eliminarlo.
reviewSchema.pre('deleteOne', async function (next) {
    //! this è riferito alla query quindi finita la query, this.doc non esiste più
    this.doc = await this.model.findOne(this.getQuery());
    next();
  });
  
  //sfrutto il doc salvato nella variabile temporanea per eseguire calculateAverageRating
  reviewSchema.post('deleteOne', async function() {
    if (this.doc) {
      await this.doc.constructor.calculateAverageRating(this.doc.product);
    }
  });

module.exports = mongoose.model("Review", reviewSchema);
