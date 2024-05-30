
const express = require('express');
const cors = require('cors'); // Import cors
const db = require('./db'); // Import the db.js file

const app = express();

app.use(cors()); // Enable CORS

// Route to fetch all students from database 1
app.get('/api/students', (req, res) => {
  const query = 'SELECT * FROM B2B_Parents';

  db.executeQuery(db.pool2, query, [], (error, results) => {
    if (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Error fetching students' });
    } else {
      res.json(results); // Send the list of students as JSON response
    }
  });
});

// Route to fetch student attendance data joined with student details from database 1
app.get('/api/studentAttendance', (req, res) => {
  const query = `
    SELECT B2B_ATTENDANCE.*, B2B_STUDENT.First_Name, B2B_STUDENT.Middle_Name
    FROM B2B_ATTENDANCE
    JOIN B2B_STUDENT ON B2B_ATTENDANCE.Student_Id = B2B_STUDENT.Student_Id
  `;

  db.executeQuery(db.pool1, query, [], (error, results) => {
    if (error) {
      console.error('Error fetching student attendance:', error);
      res.status(500).json({ error: 'Error fetching student attendance' });
    } else {
      res.json(results); // Send the joined data as JSON response
    }
  });
});

// Route to fetch all students from database 2
app.get('/api/students-db2', (req, res) => {
  const query = 'SELECT * FROM B2B_STUDENT';

  db.executeQuery(db.pool2, query, [], (error, results) => {
    if (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Error fetching students' });
    } else {
      res.json(results); // Send the list of students as JSON response
    }
  });
});

// Route to fetch student attendance data joined with student details from database 2
app.get('/api/studentAttendance-db2', (req, res) => {
  const query = `
    SELECT B2B_ATTENDANCE.*, B2B_STUDENT.First_Name, B2B_STUDENT.Middle_Name
    FROM B2B_ATTENDANCE
    JOIN B2B_STUDENT ON B2B_ATTENDANCE.Student_Id = B2B_STUDENT.Student_Id
  `;

  db.executeQuery(db.pool2, query, [], (error, results) => {
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
