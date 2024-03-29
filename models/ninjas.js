const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create geolocation Schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
});

// create ninja Schema & model
const NinjaSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  rank: {
    type: String,
    required: [true, "name field required"],
  },
  available: {
    type: Boolean,
    default: false,
  },
  geometry: GeoSchema,
  // add in geo location
});

const Ninja = mongoose.model("Ninjas", NinjaSchema);

module.exports = Ninja;

//
