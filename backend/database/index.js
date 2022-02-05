const { Pool } = require('pg');
require('dotenv').config();

//set up pool connection
const localConnection = {
  user: process.env.USER,
  host: process.env.HOST,
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