const mysql = require('mysql');
require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Function to execute a query
function executeQuery(query, params, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      callback(err, null);
      return;
    }

    connection.query(query, params, (err, results) => {
      connection.release();
      if (err) {
        console.error('Error executing MySQL query:', err);
        callback(err, null);
        return;
      }

      callback(null, results);
    });
  });
}

module.exports = {
  executeQuery
};
