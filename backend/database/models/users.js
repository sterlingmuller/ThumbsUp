var {pool} = require('../index.js');

module.exports = {
  // invoked when user tries to login
  loginValidation: function (callback, username) {
    const query = `SELECT (user_id, username, password) FROM users where username = ($1)`
    pool.query(query, [username], callback);
  },

  newUserCreation: function(callback, username, password, profile_picture) {
    // const userExist = `SELECT (username) FROM users where username = ($1)`
    const addUser = `INSERT INTO users (username, password, profile_picture) VALUES ($1, $2, $3)`
    // pool.query(userExist, [username], callback);
    pool.query(addUser, [username, password, profile_picture], callback);
  }
};