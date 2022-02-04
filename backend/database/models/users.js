var {pool} = require('../index.js');

module.exports = {
  // invoked when user tries to login
  loginValidation: function (callback, username) {
    const query = `SELECT (user_id, username, password, profile_picture) FROM users where username = ($1)`
    pool.query(query, [username], callback);
  },

  getRatings: function(userId, callback) {
    const query = `SELECT AVG(rating) from completed_trips where user_id = ($1);`;
    pool.query(query, [userId], callback);
  },

  newUserCreation: function(callback, username, password, profile_picture) {
    const addUser = `INSERT INTO users (username, password, profile_picture) VALUES ($1, $2, $3)`
    pool.query(addUser, [username, password, profile_picture], callback);
  }
};