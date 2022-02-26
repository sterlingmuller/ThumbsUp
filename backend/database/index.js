const { Pool } = require('pg');
require('dotenv').config();

//set up pool connection
const pool = new Pool ({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD
});

//repo stuff here for heroku
pool.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
});

module.exports = {pool};