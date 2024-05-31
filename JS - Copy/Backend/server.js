// server.js

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 8081;

app.use(bodyParser.json());

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.authenticateMasterUser(username, password, (error, authenticated, schoolDbConfig) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (!authenticated) {
      res.status(401).send('Invalid username or password');
      return;
    }

    // Connect to school's database using schoolDbConfig
    const schoolDbConnection = mysql.createConnection(schoolDbConfig);

    schoolDbConnection.connect((error) => {
      if (error) {
        console.error('Error connecting to school database:', error);
        res.status(500).send('Failed to connect to school database');
        return;
      }

      console.log('Connected to school database:', schoolDbConfig.database);
      // You can perform further actions after connecting to the school's database

      // Respond with success
      res.status(200).send('Login successful and connected to school database');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});








