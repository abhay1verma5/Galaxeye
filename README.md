Here's an API documentation for your project, which involves managing tiles, finding intersecting tiles, and handling GeoJSON data. This documentation will cover the routes, request formats, and responses.

API Documentation

1. Load Tiles into the Database

Route: POST /api/tiles/load-tiles

Description: This endpoint is used to load tile data into the MongoDB database from a GeoJSON file.

Request

Body: The request body should contain a valid GeoJSON file structure (either uploaded or passed in the body).

Example:

{

"geojson": { ... }  // Entire GeoJSON content

}


Response

Status: 200 OK (on success)


Body:

{

"message": "Tiles loaded successfully!"

}


Error Response: If the GeoJSON structure is invalid, the API will return:

{

"message": "Invalid GeoJSON data"

}


Status: 400 Bad Request

1. Get Intersecting Tiles Based on AOI

Route: POST /api/tiles/intersecting-tiles

Description: This endpoint fetches the tiles that intersect with a specified Area of Interest (AOI) polygon.

Request

Body: The body should contain a GeoJSON object representing the AOI polygon.

Example:

{

"aoi": {

"type": "Feature",

"geometry": {

"type": "Polygon",

"coordinates": [

[

[75.712, 15.317],

[75.714, 15.318],

[75.716, 15.319],

[75.718, 15.320],

[75.712, 15.317]

]

]

},

"properties": {}

}

}


Response

Status: 200 OK (on success)


Body: Returns a list of tiles that intersect with the provided AOI.

Example:

{

"tiles": [

{

"\_id": "tileId123",

"geometry": { ... },

"properties": { ... }

},

{

"\_id": "tileId456",

"geometry": { ... },

"properties": { ... }

}

]

}


Error Response: If there's an error processing the request:

{

"message": "Failed to fetch intersecting tiles. Please try again."

}


Status: 500 Internal Server Error

1. MongoDB Connection

Environment Variable: The MONGO\_URI environment variable is used to connect to the MongoDB database.

Example:

MONGO\_URI=mongodb+srv://<username>:<password>@cluster0.g6clnyx.mongodb.net/<dbname>



1. CORS Configuration

Allowed Origin: http://localhost:3000 This allows the frontend (React) to communicate with the backend running on port 5000.

Running the Application Locally

1. Set Up Docker

Ensure you have Docker installed on your machine.

Create a docker-compose.yml file to set up the backend, frontend, and MongoDB containers.

version: '3.8'

services:

backend:

build: ./backend

ports:

- "5000:5000"

environment:

- MONGO\_URI=mongodb+srv://<username>:<password>@cluster0.g6clnyx.mongodb.net/<dbname>
- PORT=5000

depends\_on:

- mongo

frontend:

build: ./frontend

ports:

- "3000:3000"

stdin\_open: true

mongo:

image: mongo

ports:

- "27017:27017"

2\. Running the Backend

Navigate to the backend folder.

Install the required dependencies:

npm install


Start the server:

npm start


3\. Running the Frontend

Navigate to the frontend folder.

Install the required dependencies:

npm install


Start the React development server:

npm start



Testing the Application

1. Load Tiles

Navigate to the frontend and draw an AOI polygon.

Use the Load Tiles button to load tiles into the backend. The backend will handle the GeoJSON and load the tiles into MongoDB.

1. Intersecting Tiles

Draw an Area of Interest (AOI) polygon on the map.

The frontend will send a POST request to /api/tiles/intersecting-tiles with the AOI data.

The backend will process the request and return the tiles that intersect with the AOI.

Error Handling

The system will respond with a 400 or 500 status code in case of errors:

400 Bad Request: For invalid inputs (e.g., incorrect GeoJSON format).

500 Internal Server Error: For unexpected server issues.

Conclusion

This API allows you to load GeoJSON data into a MongoDB database, retrieve intersecting tiles based on a drawn AOI polygon, and use these tiles in a mapping application. The frontend leverages React and Leaflet to display and interact with these tiles.



