var {pool} = require('../index.js');

module.exports = {
  // invoked when user tries to login
  loginValidation: function (callback, username) {
    const query = `SELECT (username, password) FROM users where username = ($1)`
    pool.query(query, [username], callback);
  },
};