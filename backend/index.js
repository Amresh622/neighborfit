 const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Import routes
const neighborhoodRoutes = require('./routes/neighborhoods');
app.use('/api', neighborhoodRoutes);

// Start the server
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});

