

const mysql = require('mysql2/promise');

// Function to create MySQL pool using environment variables
const createPool = () => {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  return pool;
};

// Function to connect to a specific school's database using provided credentials
const connectToSchoolDatabase = async (schoolcredentials) => {
  try {
    const schoolPool = mysql.createPool({
      host: schoolcredentials.database_host,
      user: schoolcredentials.database_user,
      database: schoolcredentials.database_name,
      password: schoolcredentials.database_password,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test the connection by executing a simple query
    const [rows] = await schoolPool.query('SELECT 1');
    console.log('Connected to school database successfully');
    return schoolPool;
  } catch (error) {
    console.error('Error connecting to school database:', error.message, error.stack);
    throw error; // Rethrow the error to handle it in the caller function
  }
};

module.exports = { createPool, connectToSchoolDatabase };
