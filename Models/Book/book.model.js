const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        unique: false
    },
    description : {
        type: String,
        required: false,
        unique: false
    },
    user_id: {
        type: String,
        required: true,
        unique: false,
    }
},
    {collection: 'books'}
);

const Book = mongoose.model('BookSchema',BookSchema);

module.exports = Book;