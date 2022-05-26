// Importing NPM packages
const express = require("express");
const mongoose = require("mongoose");

// Importing modules
const bookRoute = require("./routes/book");
const homeRoute = require("./routes/index");

// Intializing express
const app = express();

// Express Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connecting with database
mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => console.log("Connected to DB!"));

// EJS Setup
app.set("view engine", "ejs");

// Routes
app.use("/", homeRoute);
app.use("/api/books", bookRoute);

// Starting the express server
app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
