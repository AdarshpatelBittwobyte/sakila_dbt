const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const createPool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL pool setup using environment variables
const pool = createPool();

// Helper function to check if email exists
const emailExists = async (email) => {
  const emailCheckSql = "SELECT * FROM login WHERE email = $1";
  const emailCheckResult = await pool.query(emailCheckSql, [email]);
  return emailCheckResult.rows.length > 0;
};




app.get('/api/students', async (req, res) => {
const query = 'SELECT * FROM login';

try {
  const result = await pool.query(query);
  res.json(result.rows);
} catch (error) {
  console.error('Error fetching students:', error.message, error.stack);
  res.status(500).json({ error: 'Error fetching students' });
}
});



// User registration route
app.post('/signups', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Missing email, password or name' });
  }

  try {
    if (await emailExists(email)) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO login (email, password, name) VALUES ($1, $2, $3)";
    const values = [email, hashedPassword, name];

    await pool.query(sql, values);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error('Error registering user:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Login authentication route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  try {
    const sql = "SELECT * FROM login WHERE email = $1";
    const result = await pool.query(sql, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Email not registered" });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    console.log('User authenticated successfully');
    return res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error('Error querying user:', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// Get user data by email route
app.get('/userByEmail/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const sql = "SELECT * FROM login WHERE email = $1";
    const result = await pool.query(sql, [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: result.rows[0] });
  } catch (err) {
    console.error('Error querying user:', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// Update user data by email route
app.put('/userByEmail/:email', async (req, res) => {
  const { email } = req.params;
  const { name } = req.body;

  try {
    const sql = "UPDATE login SET name = $1 WHERE email = $2";
    const values = [name, email];

    await pool.query(sql, values);
    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error('Error updating user:', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// Delete user data by email route
app.delete('/userByEmail/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const sql = "DELETE FROM login WHERE email = $1";
    const values = [email];

    await pool.query(sql, values);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error('Error deleting user:', err.message);
    return res.status(500).json({ error: err.message });
  }
});

app.listen(8081, () => {
  console.log(`Server is listening on port 8081`);
});
