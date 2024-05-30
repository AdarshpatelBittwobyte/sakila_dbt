
const mysql = require('mysql');
require('dotenv').config();

// Create MySQL connection pools for each database
const pool1 = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB1_HOST,
  user: process.env.DB1_USER,
  password: process.env.DB1_PASS,
  database: process.env.DB1_NAME
});

const pool2 = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB2_HOST,
  user: process.env.DB2_USER,
  password: process.env.DB2_PASS,
  database: process.env.DB2_NAME
});

// Function to execute a query on a specified pool
function executeQuery(pool, query, params, callback) {
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
  executeQuery,
  pool1,
  pool2
};
