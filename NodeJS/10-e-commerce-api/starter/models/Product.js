const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this product."],
        trim: true,
        unique: true,
        maxlength: [100, "Name can not be more than 100 characters"],
    },

    price: {
        type: Number,
        required: [true, "Please provide a price for this product."],
        default: 0,
    },

    description: {
        type: String,
        required: [true, "Please provide a description for this product."],
        maxlength: [1000, "Description can not be more than 1000 characters"],
    },

    image: {
        type: String,
        default: "/uploads/example.jpeg",
    },

    category: {
        type: String,
        required: [true, "Please provide a category for this product."],
        enum: ["office", "kitchen", "bedroom"],
    },

    company: {
        type: String,
        required: [true, "Please provide a company for this product."],
        enum: {
            values: ["ikea", "liddy", "marcos"], //valori dell'enumerazione
            message: "{VALUE} is not supported", //messaggio mostrato nel caso in cui un valore inserito non sia presente
        }
    },

    colors: {
        type: [String],
        default: ["#222"],
        required: true
    },

    featured: {
        type: Boolean,
        default: false,
    },

    freeShipping: {
        type: Boolean,
        default: false,
    },

    inventory: {
        type: Number,
        required: true,
        default: 15,
    },

    averageRating: {
        type: Number,
        default: 0,
    },

    numofReviews: {
        type: Number,
        default: 0,
    },

    user: {
        type: mongoose.Types.ObjectId, //!foreign key
        ref: "User",
        required: true
    }

    
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
//timestamps server per l'aggiunta automatica di createdAt e updatedAt
//toJSON e toObject con virtuals settato a true servono per consentire l'uso di virtuals

ProductSchema.virtual("reviews", {
    ref: "Review", //nome dello schema
    localField: "_id", //campo di un prodotto usato come chiave esterna in una review 
    foreignField: "product",  //campo di una review referenzia il prodotto
    justOne: false,        
    //match: {rating: 1} prende solo le recensioni che hanno rating = 1
});

//!prima di rimovere un prodotto rimuove tutte le recensioni ad esso associate la funzione deleteOne usata in deleteProduct opera a livello di query e non di oggetto documento che sta per essere rimosso quindi è necessario specificare { document: true, query: false }
ProductSchema.pre("deleteOne",{ document: true, query: false }, async function () {
    await this.model("Review").deleteMany({ product: this._id });
});

module.exports = mongoose.model("Product", ProductSchema);
