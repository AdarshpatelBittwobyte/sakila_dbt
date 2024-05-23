const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'studentdb',
  password: 'your_password',
  port: 5432,
});

app.use(bodyParser.json());
app.use(cors());

const secret = 'your_jwt_secret';

// Route to handle user signup
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
    [username, hashedPassword]
  );
  res.status(201).json({ userId: result.rows[0].id });
});

// Route to handle user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
  if (result.rows.length > 0) {
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const token = jwt.sign({ userId: user.id }, secret);
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  } else {
    res.status(401).json({ error: 'User not found' });
  }
});

// Route to add a new student
app.post('/students', async (req, res) => {
  const { name, age, grade } = req.body;
  const result = await pool.query(
    'INSERT INTO students (name, age, grade) VALUES ($1, $2, $3) RETURNING id',
    [name, age, grade]
  );
  res.status(201).json({ studentId: result.rows[0].id });
});

// Route to get all students
app.get('/students', async (req, res) => {
  const result = await pool.query('SELECT * FROM students');
  res.json(result.rows);
});

// Route to get a specific student by ID
app.get('/students/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM students WHERE id=$1', [id]);
  res.json(result.rows[0]);
});

// Route to update student details
app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, grade } = req.body;
  const result = await pool.query(
    'UPDATE students SET name=$1, age=$2, grade=$3 WHERE id=$4 RETURNING *',
    [name, age, grade, id]
  );
  res.json(result.rows[0]);
});

// Route to delete a student
app.delete('/students/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM students WHERE id=$1', [id]);
  res.status(204).send();
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
