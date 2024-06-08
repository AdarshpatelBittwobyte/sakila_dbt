
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { createPool, connectToSchoolDatabase } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL pool setup using environment variables for the main database
const pool = createPool();
let schoolDbConnection; // Define a global variable to store the school database connection

// Helper function to check if email exists
const emailExists = async (email) => {
  const emailCheckSql = "SELECT 1 FROM logins WHERE email = ?";
  const [emailCheckResult] = await pool.query(emailCheckSql, [email]);
  return emailCheckResult.length > 0;
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
    const sql = "INSERT INTO logins (email, password, name) VALUES (?, ?, ?)";
    const values = [email, hashedPassword, name];

    await pool.query(sql, values);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error('Error registering user:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}); 

 // Login authentication route
app.post('/masterlogin', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Missing email, password, or role' });
  }

  try {
    const sql = "SELECT * FROM master_user WHERE email = ?";
    const [result] = await pool.query(sql, [email]);

    if (result.length === 0) {
      return res.status(401).json({ error: "Email not registered" });
    }

    const user = result[0];
    const isPasswordValid = user.password
    //await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    console.log('User authenticated successfully');

    // Check if user's email exists in schoolcredentials
    const schoolSql = "SELECT * FROM schoolcredentials WHERE email = ?";
    const [schoolResult] = await pool.query(schoolSql, [email]);

    if (schoolResult.length === 0) {
      return res.status(404).json({ error: "Student database not found" });
    }

    const schoolCredentials = schoolResult[0];

    // Securely connect to the school database and store the connection globally
    schoolDbConnection = await connectToSchoolDatabase(schoolCredentials);

    console.log('Connected to the school database successfully');

    // Return the user, along with the school database details, excluding sensitive information
    return res.status(200).json({
      message: "Login successful",
      user: { email: user.email, name: user.name, role },
      schoolDb: {
        host: schoolCredentials.database_host,
        database: schoolCredentials.database_name,
      },
    });

  } catch (err) {
    console.error('Error during login process:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



 // Login authentication route
 app.post('/adminlogin', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Missing email, password, or role' });
  }

  try {
    const sql = "SELECT * FROM admin_user WHERE user_email = ?";
    const [result] = await pool.query(sql, [email]);

    if (result.length === 0) {
      return res.status(401).json({ error: "Email not registered" });
    }

    const user = result[0];
    const isPasswordValid = user.password
    //await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    console.log('User authenticated successfully');

    // Check if user's email exists in schoolcredentials
    const schoolSql = "SELECT * FROM schoolcredentials WHERE email = ?";
    const [schoolResult] = await pool.query(schoolSql, [user.email]);

    if (schoolResult.length === 0) {
      return res.status(404).json({ error: "Student database not found" });
    }

    const schoolCredentials = schoolResult[0];

    // Securely connect to the school database and store the connection globally
    schoolDbConnection = await connectToSchoolDatabase(schoolCredentials);

    console.log('Connected to the school database successfully');

    // Return the user, along with the school database details, excluding sensitive information
    return res.status(200).json({
      message: "Login successful",
      user: { email: user.user_email, name: user.name, role },
      schoolDb: {
        host: schoolCredentials.database_host,
        database: schoolCredentials.database_name,
      },
    });

  } catch (err) {
    console.error('Error during login process:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});




 // Login authentication route
 app.post('/teacherlogin', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Missing email, password, or role' });
  }

  try {
    const sql = "SELECT * FROM teacher_user WHERE user_email = ?";
    const [result] = await pool.query(sql, [email]);

    if (result.length === 0) {
      return res.status(401).json({ error: "Email not registered" });
    }

    const user = result[0];
    const isPasswordValid = user.password
    //await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    console.log('User authenticated successfully');

    // Check if user's email exists in schoolcredentials
    const schoolSql = "SELECT * FROM schoolcredentials WHERE email = ?";
    const [schoolResult] = await pool.query(schoolSql, [user.email]);

    if (schoolResult.length === 0) {
      return res.status(404).json({ error: "Student database not found" });
    }

    const schoolCredentials = schoolResult[0];

    // Securely connect to the school database and store the connection globally
    schoolDbConnection = await connectToSchoolDatabase(schoolCredentials);

    console.log('Connected to the school database successfully');

    // Return the user, along with the school database details, excluding sensitive information
    return res.status(200).json({
      message: "Login successful",
      user: { email: user.user_email, name: user.name, role },
      schoolDb: {
        host: schoolCredentials.database_host,
        database: schoolCredentials.database_name,
      },
    });

  } catch (err) {
    console.error('Error during login process:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



 // Login authentication route
 app.post('/studentlogin', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Missing email, password, or role' });
  }

  try {
    const sql = "SELECT * FROM student_user WHERE user_email = ?";
    const [result] = await pool.query(sql, [email]);

    if (result.length === 0) {
      return res.status(401).json({ error: "Email not registered" });
    }

    const user = result[0];
    const isPasswordValid = user.password
    //await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    console.log('User authenticated successfully');

    // Check if user's email exists in schoolcredentials
    const schoolSql = "SELECT * FROM schoolcredentials WHERE email = ?";
    const [schoolResult] = await pool.query(schoolSql, [user.email]);

    if (schoolResult.length === 0) {
      return res.status(404).json({ error: "Student database not found" });
    }

    const schoolCredentials = schoolResult[0];

    // Securely connect to the school database and store the connection globally
    schoolDbConnection = await connectToSchoolDatabase(schoolCredentials);

    console.log('Connected to the school database successfully');

    // Return the user, along with the school database details, excluding sensitive information
    return res.status(200).json({
      message: "Login successful",
      user: { email: user.user_email, name: user.name, role },
      schoolDb: {
        host: schoolCredentials.database_host,
        database: schoolCredentials.database_name,
      },
    });

  } catch (err) {
    console.error('Error during login process:', err);
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
    const studentsSql = `
  SELECT 
  B2B_ACADEMICS.*,
  B2B_STUDENT.First_Name,
  B2B_STUDENT.Middle_Name,
  B2B_STUDENT.Last_Name,
  B2B_STUDENT.Gender,
  B2B_STUDENT.Student_Id
  FROM B2B_ACADEMICS
  left JOIN B2B_STUDENT ON B2B_ACADEMICS.Student_Id = B2B_STUDENT.Student_Id
  `;// Adjust this query as per your schema
    console.log("GET /students: Executing SQL query:", studentsSql);

    const [studentsResult] = await schoolDbConnection.query(studentsSql);

    console.log("GET /students: Students fetched successfully.");
    return res.status(200).json(studentsResult);

  } catch (err) {
    console.error('Error fetching students:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to fetch students
app.get('/api/studentAttendance', async (req, res) => {
  try {
    console.log("GET /students: Fetching students...");
    if (!schoolDbConnection) {
      console.log("GET /students: School database connection not established.");
      return res.status(500).json({ error: "School database connection not established" });
    }

    // Fetch all students from the students table
    const studentsSql = `SELECT a.Attendance_ID,  a.Student_ID,
  s.First_Name, s.Middle_Name, s.Last_Name,Ac.Class ,a.Status,replace(REPLACE(a.Attendance_Date , 'T', ' '),'Z',' ') AS Attendance_Date
  FROM B2B_STUDENT_ATTENDANCE a join B2B_ACADEMICS Ac on a.Student_ID =Ac.Student_ID
   join B2B_STUDENT s on s.Student_Id =Ac.Student_ID`;

    console.log("GET /students: Executing SQL query:", studentsSql);

    const [studentsResult] = await schoolDbConnection.query(studentsSql);

    console.log("GET /students: Students fetched successfully.");
    return res.status(200).json(studentsResult);

  } catch (err) {
    console.error('Error fetching students:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



// Route to fetch students
app.get('/api/studentprofile', async (req, res) => {
  try {
    console.log("GET /students: Fetching students...");
    if (!schoolDbConnection) {
      console.log("GET /students: School database connection not established.");
      return res.status(500).json({ error: "School database connection not established" });
    }

    // Fetch all students from the students table
    const studentsSql = `
    SELECT 
      B2B_STUDENT.Student_Id,
      B2B_STUDENT.First_Name,
      B2B_STUDENT.Middle_Name,
      B2B_STUDENT.Last_Name,
      B2B_STUDENT.Gender,
      B2B_STUDENT.Contact_Number,
      B2B_STUDENT.Address,
      B2B_STUDENT.City,
      B2B_STUDENT.State,
      B2B_STUDENT.Postal_Code,
      replace(REPLACE(B2B_STUDENT.Date_Of_Birth, 'T', ' '),'Z',' ') as Date_Of_Birth,
      B2B_STUDENT.Father_Name,
      B2B_STUDENT.Email,
      replace(REPLACE(B2B_STUDENT.Enrollment_Date , 'T', ' '),'Z',' ') as Enrollment_Date,
      B2B_STUDENT.Nationality,
      B2B_STUDENT.Emergency_Contact_Name,
      B2B_STUDENT.Emergency_Contact_Number,
      B2B_STUDENT.Aaadhar_Number,
      B2B_ACADEMICS.Class
    FROM 
      B2B_STUDENT 
    LEFT JOIN 
      B2B_ACADEMICS ON B2B_ACADEMICS.Student_Id = B2B_STUDENT.Student_Id`;

    console.log("GET /students: Executing SQL query:", studentsSql);

    const [studentsResult] = await schoolDbConnection.query(studentsSql);

    console.log("GET /students: Students fetched successfully.");
    return res.status(200).json(studentsResult);

  } catch (err) {
    console.error('Error fetching students:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



// Route to fetch students
app.get('/api/staff', async (req, res) => {
  try {
    console.log("GET /students: Fetching students...");
    if (!schoolDbConnection) {
      console.log("GET /students: School database connection not established.");
      return res.status(500).json({ error: "School database connection not established" });
    }

    // Fetch all students from the students table
    const studentsSql = `SELECT * FROM B2B_STAFF `;

    console.log("GET /students: Executing SQL query:", studentsSql);

    const [studentsResult] = await schoolDbConnection.query(studentsSql);

    console.log("GET /students: Students fetched successfully.");
    return res.status(200).json(studentsResult);

  } catch (err) {
    console.error('Error fetching students:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



// Route to fetch students
app.get('/api/staffAttendance', async (req, res) => {
  try {
    console.log("GET /students: Fetching students...");
    if (!schoolDbConnection) {
      console.log("GET /students: School database connection not established.");
      return res.status(500).json({ error: "School database connection not established" });
    }

    // Fetch all students from the students table
    const studentsSql = `select Attendance_ID,Staff_ID,Status,REC_CREATE_DATE ,CREATED_BY,replace(REPLACE(Attendance_Date , 'T', ' '),'Z',' ') AS Attendance_Date from B2B_STAFF_ATTENDANCE `;

    console.log("GET /students: Executing SQL query:", studentsSql);

    const [studentsResult] = await schoolDbConnection.query(studentsSql);

    console.log("GET /students: Students fetched successfully.");
    return res.status(200).json(studentsResult);

  } catch (err) {
    console.error('Error fetching students:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});





// Route to fetch students
app.get('/api/studentTimetable', async (req, res) => {
  try {
    console.log("GET /students: Fetching students...");
    if (!schoolDbConnection) {
      console.log("GET /students: School database connection not established.");
      return res.status(500).json({ error: "School database connection not established" });
    }

    // Fetch all students from the students table
    const studentsSql = `select * from  B2B_STUDENT_TIMETABLE`;
    console.log("GET /students: Executing SQL query:", studentsSql);

    const [studentsResult] = await schoolDbConnection.query(studentsSql);

    console.log("GET /students: Students fetched successfully.");
    return res.status(200).json(studentsResult);

  } catch (err) {
    console.error('Error fetching students:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});




// Route to fetch students
app.get('/api/examtimetable', async (req, res) => {
  try {
    console.log("GET /students: Fetching students...");
    if (!schoolDbConnection) {
      console.log("GET /students: School database connection not established.");
      return res.status(500).json({ error: "School database connection not established" });
    }

    // Fetch all students from the students table
    const studentsSql = ` select * from B2B_EXAM_TIME_TABLE`;
    console.log("GET /students: Executing SQL query:", studentsSql);

    const [studentsResult] = await schoolDbConnection.query(studentsSql);

    console.log("GET /students: Students fetched successfully.");
    return res.status(200).json(studentsResult);

  } catch (err) {
    console.error('Error fetching students:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to fetch students
app.get('/api/studentEvents', async (req, res) => {
  try {
    console.log("GET /students: Fetching students...");
    if (!schoolDbConnection) {
      console.log("GET /students: School database connection not established.");
      return res.status(500).json({ error: "School database connection not established" });
    }

    // Fetch all students from the students table
    const studentsSql = ` select * from  B2B_EVENTS`;
    console.log("GET /students: Executing SQL query:", studentsSql);

    const [studentsResult] = await schoolDbConnection.query(studentsSql);

    console.log("GET /students: Students fetched successfully.");
    return res.status(200).json(studentsResult);

  } catch (err) {
    console.error('Error fetching students:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(8081, () => {
  console.log(`Server is listening on port 8081`);
});