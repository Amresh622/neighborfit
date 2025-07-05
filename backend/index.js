 const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
//require('dotenv').config();


app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('🎉 NeighborFit backend is running!');
});


// Import routes
const neighborhoodRoutes = require('./routes/neighborhoods');
app.use('/api', neighborhoodRoutes);

// Start the server
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});

