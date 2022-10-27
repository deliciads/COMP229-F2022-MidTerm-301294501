// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the car model
let Car = require("../models/cars");

/* GET cars List page. READ */
router.get("/", (req, res, next) => {
  // find all cars in the cars collection
  Car.find((err, cars) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("cars/index", {
        title: "Cars",
        Cars: cars,
      });
    }
  });
});

//  GET the Car Details page in order to add a new Car
router.get("/add", (req, res, next) => {
  res.render('cars/add', {title: 'Add Cars'})
});

// POST process the Car  Details page and create a new Car  - CREATE
router.post("/add", (req, res, next) => {
  let newcar = Car({
    carname: req.body.carname,
    category: req.body.category,
    carmodel: req.body.carmodel,
    price: req.body.price,
  });
Car.create(newcar, (err, Car) => {
  if (err) {
    console.log(err);
    res.end(err);
  }
  else {
    res.redirect('/cars')
  }
  });
});

// GET the Car Details page in order to edit an existing Car
router.get("/details/:id", (req, res, next) => {
  let id = req.params.id;

  Car.findById(id, (err, carToEdit) => {
    if(err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.render('cars/details', {title: "Edit Car", cars: carToEdit});
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/details/:id", (req, res, next) => {
  let id = req.params.id;

  let updateCar = Car({
    _id: id,
    carname: req.body.carname,
    category: req.body.category,
    carmodel: req.body.carmodel,
    price: req.body.price
  });
  Car.updateOne({_id: id}, updateCar, (err) => {
    if(err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/cars');
    }
  });
});

// GET - process the delete
router.get("/delete/:id", (req, res, next) => {
  let id = req.params.id;
  Car.remove({_id: id}, (err) => {
    if(err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/cars');
    }
  });
});

module.exports = router;
