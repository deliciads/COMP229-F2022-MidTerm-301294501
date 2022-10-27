let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// create a model class
let carModel = mongoose.Schema(
  {
    carname: String,
    category: String,
    carmodel: String,
    price: Number,
  },
  {
    collection: "cars",
  }
);

module.exports = mongoose.model("Car", carModel);
