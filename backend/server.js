const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const tileRoutes = require("./routes/tileRoutes");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
// Middleware
app.use(bodyParser.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/tiles", tileRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
