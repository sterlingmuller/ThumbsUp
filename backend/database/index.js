const { Pool } = require('pg');


const client = new Pool ({
  user: 'postgres',
  host: 'localhost',
  database: 'blueocean',
  password: 'password',
  port: 5432,
});


client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
});

module.exports = {client};