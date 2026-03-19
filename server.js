require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Create MySQL connection using .env
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Example: insert attendance
app.post('/attendance', (req, res) => {
  const { student_id } = req.body;

  if (!student_id) {
    return res.status(400).json({ message: 'Student ID required' });
  }

  const sql = 'INSERT INTO attendance (student_id) VALUES (?)';

  db.query(sql, [student_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.json({ message: 'Attendance recorded', id: result.insertId });
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});