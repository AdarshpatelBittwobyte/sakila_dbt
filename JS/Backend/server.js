const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs'); // Changed to bcryptjs

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL pool setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'student_management',
  password: 'welcome_1234',
  port: 5432,
});

// User registration route
app.post('/Signups', async (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = 'INSERT INTO login(name, email, password) VALUES($1, $2, $3) RETURNING *';
  const values = [name, email, hashedPassword];

  try {
    const result = await pool.query(sql, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
