
// db.js

const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

// MySQL Connection Pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
// server.js

function authenticateMasterUser(username, password, callback) {
  pool.query('SELECT * FROM MASTER_LOGIN WHERE username = ?', [username], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      callback(error, null);
      return;
    }

    if (results.length === 0) {
      console.log(`Username "${username}" not found`);
      callback(null, false, 'Invalid username');
      return;
    }

    const user = results[0];
    console.log(`Found user with username "${username}". Password in database: "${user.userpassword}", Password provided: "${password}"`);
    
    if (user.userpassword !== password) {
      console.log(`Password for user "${username}" does not match`);
      callback(null, false, 'Incorrect password');
      return;
    }

    // Authentication successful
    const masterUserId = user.Master_Id;
    pool.query('SELECT * FROM SchoolCredentials WHERE Master_Id = ?', [masterUserId], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        callback(error, null);
        return;
      }

      if (results.length === 0) {
        callback(null, false, 'School credentials not found');
        return;
      }

      const schoolCredentials = results[0];
      const schoolDbConfig = {
        host: schoolCredentials.database_host,
        user: schoolCredentials.database_user,
        password: schoolCredentials.database_password,
        database: schoolCredentials.database_name
      };

      callback(null, true, schoolDbConfig);
    });
  });
}

module.exports = {
  authenticateMasterUser
};

