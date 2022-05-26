// Importing NPM packages
const express = require("express");

// Importing modules
const Book = require("../models/Book");

// Initializing express router
const router = express.Router();

// @route - GET /books
// @desc - Get all the books for a specific user
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});

    if (books.length) {
      res.json({ status: "ok", data: books });
    } else {
      res.json({ status: "error", msg: "No books to show!" });
    }
  } catch (err) {
    console.log(err);
  }
});

// @route - GET /books/:id
// @desc - Returns a book with given ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      res.json({ status: "ok", data: book });
    } else {
      res.json({ status: "error", msg: "Book not found with given ID!" });
    }
  } catch (err) {
    console.log(err);
  }
});

// @route - POST /books
// @desc - Create a book with all the required metadata
router.post("/", async (req, res) => {
  const { title, description, author, isFavorite } = req.body;

  try {
    if (title === "" || author === "") {
      res.json({
        status: "error",
        msg: "Please fill out required inputs!",
      });
    } else {
      const book = await new Book({ title, description, author, isFavorite });

      const savedBook = await book.save();
      res.json({
        status: "ok",
        data: savedBook,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// @route - PUT /books/:id
// @desc - Update an entire book with given ID
router.put("/:id", async (req, res) => {
  const { title, description, author, isFavorite } = req.body;

  try {
    const bookToUpdate = await Book.findById(req.params.id);

    if (bookToUpdate) {
      const updateBook = await Book.updateOne(
        { _id: req.params.id },
        { $set: { title, description, author, isFavorite } }
      );

      if (updateBook.acknowledged && updateBook.modifiedCount > 0) {
        const updatedBook = await Book.findById(req.params.id);
        res.json({ status: "ok", data: updatedBook });
      } else {
        res.json({ status: "error", msg: "Please update the fields!" });
      }
    } else {
      res.json({ status: "error", msg: "Book not found with given ID!" });
    }
  } catch (err) {
    console.log(err);
  }
});

// @route - DELETE /books/:id
// @desc - Deletes a specific book with given ID
router.delete("/:id", async (req, res) => {
  try {
    const bookToDelete = await Book.findById(req.params.id);

    if (bookToDelete) {
      await Book.deleteOne({ _id: req.params.id });

      res.json({ status: "ok", data: "Book deleted!" });
    } else {
      res.json({ status: "error", msg: "Book not found with given ID!" });
    }
  } catch (err) {
    console.log(err);
  }
});

// Exporting this module (router)
module.exports = router;
