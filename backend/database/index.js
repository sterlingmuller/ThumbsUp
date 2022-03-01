const { Pool } = require('pg');
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() };

//set up pool connection
const localConnection = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD
}

const herokuConnection = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
};

const pool = new Pool (
  process.env.DATABASE_URL
  ? herokuConnection: localConnection
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