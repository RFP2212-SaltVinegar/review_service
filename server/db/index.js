const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connection complete');
  }
});

module.exports = client;

// client.query('SELECT * FROM reviews', (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(res);
//   }
// });

// client.query('INSERT INTO reviews VALUES (1,1)', (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(res);
//   }
// });
