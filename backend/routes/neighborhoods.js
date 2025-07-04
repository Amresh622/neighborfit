const express = require('express');
const router = express.Router();
const db = require('../db/db');

// GET all neighborhoods
router.get('/neighborhoods', (req, res) => {
  db.query('SELECT * FROM neighborhoods', (err, result) => {
    if (err) {
      console.error('❌ Error fetching neighborhoods:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(result);
  });
});

// POST: Add new neighborhood
router.post('/neighborhoods', (req, res) => {
  const { name, city, safety, rent, entertainment, transport } = req.body;

  if (!name || !city) {
    return res.status(400).json({ error: 'Name and city are required' });
  }

  const query = `
    INSERT INTO neighborhoods (name, city, safety, rent, entertainment, transport)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [name, city, safety, rent, entertainment, transport], (err, result) => {
    if (err) {
      console.error('❌ Error inserting neighborhood:', err);
      return res.status(500).json({ error: 'Database insert error' });
    }
    res.status(201).json({ message: 'Neighborhood added successfully' });
  });
});

// POST: Match best neighborhood by user preferences
// POST: Match best neighborhood by user preferences
router.post('/match', (req, res) => {
  const { safety, rent, entertainment, transport } = req.body;

  console.log("🔍 Incoming match request:", req.body);

  if (
    safety === undefined ||
    rent === undefined ||
    entertainment === undefined ||
    transport === undefined
  ) {
    return res.status(400).json({ error: "All preferences are required" });
  }

  const query = `
    SELECT *, 
    ABS(safety - ?) + 
    ABS(rent - ?) + 
    ABS(entertainment - ?) + 
    ABS(transport - ?) AS score
    FROM neighborhoods
    ORDER BY score ASC
    LIMIT 1
  `;

  db.query(query, [safety, rent, entertainment, transport], (err, result) => {
    if (err) {
      console.error("❌ Match query error:", err);
      return res.status(500).json({ error: 'Matching error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'No neighborhoods found to match' });
    }

    console.log("✅ Match found:", result[0]);
    res.json(result[0]);
  });
});

// DELETE: Remove a neighborhood by ID
router.delete('/neighborhoods/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM neighborhoods WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('❌ Error deleting neighborhood:', err);
      return res.status(500).json({ error: 'Delete failed' });
    }
    res.json({ message: 'Neighborhood deleted successfully' });
  });
});

// PUT: Update a neighborhood by ID
router.put('/neighborhoods/:id', (req, res) => {
  const { name, city, safety, rent, entertainment, transport } = req.body;
  const { id } = req.params;

  const query = `
    UPDATE neighborhoods SET 
      name = ?, 
      city = ?, 
      safety = ?, 
      rent = ?, 
      entertainment = ?, 
      transport = ?
    WHERE id = ?
  `;

  db.query(query, [name, city, safety, rent, entertainment, transport, id], (err, result) => {
    if (err) {
      console.error('❌ Error updating neighborhood:', err);
      return res.status(500).json({ error: 'Update failed' });
    }
    res.json({ message: 'Neighborhood updated successfully' });
  });
});




module.exports = router;

