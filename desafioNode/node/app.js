const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DB || 'nodedb',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database!');
});

app.get('/', (req, res) => {
  const name = 'Full Cycle Rocks!';

  const query = 'INSERT INTO people (name) VALUES (?)';
  db.query(query, [name], (err, result) => {
    if (err) throw err;

    db.query('SELECT * FROM people', (err, results) => {
      if (err) throw err;

      let peopleList = results.map(row => `<li>${row.name}</li>`).join('');
      res.send(`<h1>${name}</h1><ul>${peopleList}</ul>`);
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});