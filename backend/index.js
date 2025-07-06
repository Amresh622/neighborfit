 const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Simple root route
app.get('/', (req, res) => {
  res.send('🎉 NeighborFit backend is running!');
});

// API Routes
const neighborhoodRoutes = require('./routes/neighborhoods');
app.use('/api', neighborhoodRoutes);

// Dynamic port for Render (uses 5000 locally)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
