const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection setup
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'b2b-s360.chpxcjdw4aj9.ap-south-1.rds.amazonaws.com',
  user: 'B2B_Admin',
  password: 'b2b@123',
  database: 'B2B_S360_EUROKID',
  port: 3306, // Default MySQL port
});

// Route to fetch all students
app.get('/api/students', (req, res) => {
  // Get all students from the database
  pool.query('SELECT * FROM B2B_STUDENT', (error, results) => {
    if (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Error fetching students' });
    } else {
      res.json(results); // Send the list of students as JSON response
    }
  });
});


// Route to fetch student attendance data joined with student details
app.get('/api/studentAttendance', (req, res) => {
  // Perform a JOIN operation between B2B_ATTENDANCE and B2B_STUDENT tables based on Student_Id
  const query = `
    SELECT B2B_ATTENDANCE.*, B2B_STUDENT.First_Name, B2B_STUDENT.Middle_Name
    FROM B2B_ATTENDANCE
    JOIN B2B_STUDENT ON B2B_ATTENDANCE.Student_Id = B2B_STUDENT.Student_Id
  `;

  // Execute the SQL query
  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching student attendance:', error);
      res.status(500).json({ error: 'Error fetching student attendance' });
    } else {
      res.json(results); // Send the joined data as JSON response
    }
  });
});

// Start the server
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
