const express = require("express");
const router = express.Router();
const Ninja = require("../models/ninjas");
// get a list of ninjas from the db
router.get("/ninjas", function (req, res) {
  //lat should be between -180 and 180, lat btwn 90 and -90
  Ninja.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        },
        distanceField: "dist.calculated",
        maxDistance: 10000000,
        spherical: true,
      },
    },
  ]).then(function (ninjas) {res.send(ninjas);})
});

// add a new ninja to the db
router.post("/ninjas", function (req, res, next) {
  Ninja.create(req.body)
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
});

// update a ninja in the db
router.put("/ninjas/:id", function (req, res, next) {
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function () {
      Ninja.findOne({ _id: req.params.id }).then(function (ninja) {
        res.send(ninja);
      });
    })
    .catch(next);
});

// delete a ninja from the db
router.delete("/ninjas/:id", function (req, res, next) {
  Ninja.findByIdAndRemove({ _id: req.params.id })
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
});

module.exports = router;
