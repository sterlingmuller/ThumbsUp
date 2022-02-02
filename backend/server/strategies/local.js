const LocalStrategy = require("passport-local");
const passport = require("passport");
const { pool } = require("../../database/index.js");
const users = require('../controllers/users.js')

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  try {
  const result = await pool.query(`SELECT * from users where username = ($1)`, [username]);
  if (result.rows[0].length) {
    done(null, results.rows[0])
  }
  } catch (err) {
    done(err, null)
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await pool.query(
        `SELECT * from users where username = ($1)`,
        [username]
      );
      if (result.rows.length === 0) {
        done(null, false);
      } else {
        if (result.rows[0].password === password) {
          done(null, result.rows[0]);
        } else {
          done(null, false);
        }
      }
    } catch (err) {
      done(err, false);
    }
  })
);
