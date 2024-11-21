import React, { useState } from "react";
import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import axios from "axios";

const Map = () => {
  const [tiles, setTiles] = useState([]); // Intersecting tiles
  const [aoi, setAoi] = useState(null); // AOI drawn
  const [error, setError] = useState(null); // Error handling

  const onAOICreated = async (e) => {
    const { layerType, layer } = e;

    if (layerType === "polygon") {
      const geojson = layer.toGeoJSON(); // Convert drawn layer to GeoJSON
      setAoi(geojson); // Store the drawn AOI
      console.log(geojson, "g");

      try {
        // Fetch intersecting tiles
        const response = await axios.post(
          "http://localhost:5000/api/tiles/intersecting-tiles",
          { aoi: geojson }
        );

        setTiles(response.data || []); // Store intersecting tiles
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error(
          "Error fetching intersecting tiles:",
          err.response || err
        );
        setError("Failed to fetch intersecting tiles. Please try again.");
        setTiles([]); // Clear tiles on error
      }
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "10px" }}>
        AOI Intersecting Tiles Viewer
      </h2>

      <MapContainer
        center={[15.3173, 75.7139]} // Approximate center
        zoom={7}
        style={{ height: "80vh", width: "100%", marginTop: "10px" }}
      >
        {/* Base Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Draw Control */}
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={onAOICreated}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false,
            }}
          />
        </FeatureGroup>

        {/* Render AOI (Blue) */}
        {aoi && (
          <GeoJSON
            data={aoi}
            style={{ color: "blue", weight: 2, fillOpacity: 0.2 }}
          />
        )}

        {/* Render Intersecting Tiles (Red) */}
        {tiles.length > 0 &&
          tiles.map((tile, index) => {
            const tileGeoJSON = {
              type: "Feature",
              geometry: tile.geometry, // Assuming tile.geometry contains coordinates and type for Polygon
              properties: tile.properties, // Optional, can add styling
            };

            return (
              <GeoJSON
                key={index}
                data={tileGeoJSON}
                style={{ color: "red", weight: 2, fillOpacity: 0.5 }}
              />
            );
          })}
      </MapContainer>

      {/* Tile Details */}
      <div style={{ padding: "20px" }}>
        <h3>Intersecting Tiles:</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {tiles.length > 0 ? (
            tiles.map((tile) => <li key={tile._id}>Tile ID: {tile._id}</li>)
          ) : (
            <p>No intersecting tiles found. Draw an AOI to get results.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Map;
