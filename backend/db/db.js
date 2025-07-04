const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Amresh@12345', // <--- Replace this with your real password
  database: 'neighborfit_app'
});

conn.connect(err => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
    return;
  }
  console.log('✅ MySQL connected successfully!');
});

module.exports = conn;
