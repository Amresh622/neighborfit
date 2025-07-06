require('dotenv').config();
const db = require('./db/db');

// ✅ Neighborhoods data
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

// ✅ Insert neighborhoods
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
    (err) => {
      if (err) {
        console.error('❌ Insert error (neighborhood):', err.message);
      } else {
        console.log(`✅ Inserted neighborhood: ${n.name}`);
      }
    }
  );
});

// ✅ Users data
const users = [
  {
    name: 'Alice',
    preferences_json: JSON.stringify({
      safety: 5,
      rent: 3,
      entertainment: 4,
      transport: 4
    })
  },
  {
    name: 'Bob',
    preferences_json: JSON.stringify({
      safety: 3,
      rent: 4,
      entertainment: 5,
      transport: 2
    })
  }
];

// ✅ Insert users
users.forEach((u) => {
  const query = `
    INSERT INTO users (name, preferences_json)
    VALUES (?, ?)
  `;
  db.query(query, [u.name, u.preferences_json], (err) => {
    if (err) {
      console.error('❌ Insert error (user):', err.message);
    } else {
      console.log(`✅ Inserted user: ${u.name}`);
    }
  });
});

// ✅ Example match linking user → neighborhood
// You can insert this after you confirm IDs or modify it to use LAST_INSERT_ID logic.
const match = {
  user_id: 1,           // ← You may need to adjust these IDs based on your DB
  neighborhood_id: 1,
  score: 2.0
};

const matchQuery = `
  INSERT INTO matches (user_id, neighborhood_id, score)
  VALUES (?, ?, ?)
`;

db.query(matchQuery, [match.user_id, match.neighborhood_id, match.score], (err) => {
  if (err) {
    console.error('❌ Insert error (match):', err.message);
  } else {
    console.log(`✅ Inserted match: user ${match.user_id} → neighborhood ${match.neighborhood_id}`);
  }
});
