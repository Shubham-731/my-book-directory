// Importing NPM packages
const mongoose = require("mongoose");

// Creating book schema
const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

// Publishing Book schema
const Book = mongoose.model("Book", bookSchema);

// Exporting this module (Book)
module.exports = Book;
