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

module.exports = createPool;
