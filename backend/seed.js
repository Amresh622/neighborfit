require('dotenv').config(); // ✅ Add this FIRST

const db = require('./db/db');

const neighborhoods = [
  {
    name: 'Greenview',
    city: 'New York',
    score_safety: 4.5,
    score_entertainment: 5.0,
    score_rent: 3.2,
    score_transport: 4.1
  },
  {
    name: 'Lakeside',
    city: 'Boston',
    score_safety: 5.0,
    score_entertainment: 3.8,
    score_rent: 2.4,
    score_transport: 4.0
  },
  {
    name: 'Downtown Heights',
    city: 'Chicago',
    score_safety: 3.6,
    score_entertainment: 4.2,
    score_rent: 4.1,
    score_transport: 4.8
  }
];

neighborhoods.forEach((n) => {
  const query = `
    INSERT INTO neighborhoods (
      name, city, score_safety, score_entertainment, score_rent, score_transport
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [n.name, n.city, n.score_safety, n.score_entertainment, n.score_rent, n.score_transport],
    (err, result) => {
      if (err) {
        console.error('❌ Insert error:', err); // 👈 now prints full error
      } else {
        console.log(`✅ Inserted: ${n.name}`);
      }
    }
  );
});
