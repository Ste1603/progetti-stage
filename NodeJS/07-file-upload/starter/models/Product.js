const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
    },
    image: {
        type: String, //!path a cui trovare l'immagine 
        required: true
    }
});

module.exports = mongoose.model('Product', ProductSchema)