const Tile = require("../models/Title"); // Corrected model name
const turf = require("@turf/turf");
const geojsonData = require("../data/geojson.json"); // JSON file with latitude-longitude polygons

/**
 * Fetch intersecting tiles based on AOI
 */
exports.getIntersectingTiles = async (req, res) => {
  try {
    const { aoi } = req.body;
    console.log("AOI received: ", aoi,aoi.geometry.coordinates);

    
  const data = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [77.726907, 17.276561],
          [75.650765, 15.739142],
          [77.397361, 13.539549],
          [79.35267, 15.209884],
          [77.726907, 17.276561],
        ],
      ],
    },
  };



    
    // Find points in the GeoJSON that are inside the AOI polygon
    const pointsInsideAOI = geojsonData.features
      .map((feature) => {
       
         
        
      

      let polyIntersection = turf.intersect(
        data,
        feature
      );

      console.log("Turf intersection is", polyIntersection);
      }

    )
  } catch (error) {
    console.error("Error finding points inside AOI: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Load initial tiles into the database
 */
exports.loadTiles = async (req, res) => {
  try {
    const geojson = require("../data/geojson.json"); // Path to GeoJSON file

    // Validate GeoJSON structure
    if (!geojson || !geojson.features || !Array.isArray(geojson.features)) {
      return res.status(400).json({ message: "Invalid GeoJSON data" });
    }

    // Map features to tile schema
    const tiles = geojson.features.map((feature) => ({
      type: feature.type || "Feature", // Default to "Feature"
      geometry: feature.geometry, // Geometry object
      properties: feature.properties || {}, // Default to empty properties
    }));

    // Insert tiles into the database
    await Tile.insertMany(tiles);

    res.status(200).json({ message: "Tiles loaded successfully!" });
  } catch (error) {
    console.error("Error loading tiles: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
