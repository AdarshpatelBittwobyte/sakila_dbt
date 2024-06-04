const { Pool } = require('pg');

// Function to create PostgreSQL pool using environment variables
const createPool = () => {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  return pool;
};
const connectToSchoolDatabase = async (schoolCredentials) => {
  try {
    const schoolPool = new Pool({
      user: schoolCredentials.database_user,
      host: schoolCredentials.database_host,
      database: schoolCredentials.database_name,
      password: schoolCredentials.database_password,
      port: schoolCredentials.database_port,
    });

    // Test the connection by executing a simple query
    const testQuery = 'SELECT 1';
    await schoolPool.query(testQuery);

    console.log('Connected to school database successfully');
    return schoolPool;
  } catch (error) {
    console.error('Error connecting to school database:', error.message, error.stack);
    throw error; // Rethrow the error to handle it in the caller function
  }
};


module.exports = { createPool, connectToSchoolDatabase };
 