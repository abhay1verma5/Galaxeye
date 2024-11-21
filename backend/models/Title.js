// models/GeoFeature.js
const mongoose = require("mongoose");

const tileSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Feature"], // We expect all entries to be of type "Feature"
    required: true,
  },
  properties: {
    type: Object, // Store properties like "fill", "id", etc.
    required: true,
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point", "LineString", "Polygon"], // Geometry types we are handling
      required: true,
    },
    coordinates: {
      type: Array, // Store coordinates as an array
      required: true,
    },
  },
});

module.exports = mongoose.model("Tile", tileSchema);
