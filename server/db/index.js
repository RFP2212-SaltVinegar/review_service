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
