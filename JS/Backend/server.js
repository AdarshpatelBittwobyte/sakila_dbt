const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

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
app.post('/signups', (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO login (name, email, password) VALUES ($1, $2, $3)";
  const values = [name, email, password];

  pool.query(sql, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ message: "User registered successfully" });
  });
});

app.listen(8081, () => {
  console.log(`Server is listening on port 8081`);
});
