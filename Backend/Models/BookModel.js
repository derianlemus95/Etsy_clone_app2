const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var booksSchema = new Schema({
    BookID: {type: String, required: true},
    Title: {type: String, required: true},
    Author: {type: String, required: true}
},
{
    versionKey: false
});

const bookModel = mongoose.model('book', booksSchema);
module.exports = bookModel;