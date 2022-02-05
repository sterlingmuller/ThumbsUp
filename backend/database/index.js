const { Pool } = require('pg');
require('dotenv').config();


// const localConnection = new Pool ({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
// });

const localConnection = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
};

const herokuConnection = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
};

const pool = new Pool(
  process.env.DATABASE_URL
  ? herokuConnection
  : localConnection
);


//repo stuff here for heroku
pool.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
});

module.exports = {pool};