const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { createPool, connectToSchoolDatabase} = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL pool setup using environment variables for the main database
const pool = createPool();
let schoolDbConnection; // Define a global variable to store the school database connection

// Helper function to check if email exists
const emailExists = async (email) => {
  const emailCheckSql = "SELECT 1 FROM logins WHERE email = $1";
  const emailCheckResult = await pool.query(emailCheckSql, [email]);
  return emailCheckResult.rows.length > 0;
};


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
    const sql = "INSERT INTO logins (email, password, name) VALUES ($1, $2, $3)";
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
    const sql = "SELECT * FROM logins WHERE email = $1";
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

    // Check if user's email exists in schoolcredentials
    const schoolSql = "SELECT * FROM schoolcredentials WHERE email = $1";
    const schoolResult = await pool.query(schoolSql, [email]);

    if (schoolResult.rows.length === 0) {
      return res.status(404).json({ error: "Student database not found" });
    }

    const schoolCredentials = schoolResult.rows[0];

    // Securely connect to the school database and store the connection globally
    schoolDbConnection = await connectToSchoolDatabase(schoolCredentials);

    console.log('Connected to the school database successfully');

    // Return the user, along with the school database details, excluding sensitive information
    return res.status(200).json({
      message: "Login successful",
      user: { email: user.email, name: user.name },
      schoolDb: { host: schoolCredentials.database_host, database: schoolCredentials.database_name }
    });

  } catch (err) {
    console.error('Error during login process:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch students
app.get('/students', async (req, res) => {
  try {
    console.log("GET /students: Fetching students...");
    if (!schoolDbConnection) {
      console.log("GET /students: School database connection not established.");
      return res.status(500).json({ error: "School database connection not established" });
    }

    // Fetch all students from the students table
    const studentsSql = "SELECT * FROM stg.actor"; // Adjust this query as per your schema
    console.log("GET /students: Executing SQL query:", studentsSql);
    
    const studentsResult = await schoolDbConnection.query(studentsSql);

    console.log("GET /students: Students fetched successfully.");
    return res.status(200).json(studentsResult.rows);

  } catch (err) {
    console.error('Error fetching students:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

 

app.listen(8081, () => {
  console.log(`Server is listening on port 8081`);
});
