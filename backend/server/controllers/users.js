const users = require("../../database/models/users.js");
const {pool} = require('../../database/index.js')

module.exports = {
  checkLogin: function (req, res) {
    const { username, password } = req.body;
    const validateLogin = (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      if (!result.rows.length) {
        console.log("Invalid Login");
        res.send(false);
        return;
      }
      result.rows[0].row = result.rows[0].row.replace(/[{()}]/g, "");
      result.rows[0].row = result.rows[0].row.split(",");
      if (
        username !== result.rows[0].row[1] ||
        password !== result.rows[0].row[2]
      ) {
        res.send(false);
      } else {
        var payload = {
          userId: result.rows[0].row[0],
          username: result.rows[0].row[1],
          profile_picture: result.rows[0].row[3],
          usertype: "",
          rating: "",
        };
        users.getRatings(payload["userId"], (err, data) => {
          if (err) {
            console.log(err);
            res.send(err);
          }
          data.rows[0].avg ? payload["rating"] = data.rows[0].avg.substring(0, 3) : payload["rating"] = 'User has not been rated';
          res.status(200).send(payload)
        });
      }
    };
    users.loginValidation(validateLogin, username);
  },

  createUser: function (req, res) {
    let { username, password, profile_picture } = req.body;
    profile_picture = profile_picture || "";
    if (username.length < 2 || password.length < 2) {
      res.send('Username and Password must be at least 3 characters long');
      return;
    }
    pool.query(`SELECT * from users where username = ($1)`, [username], (err, data) => {
      if (err) {
        console.log(err)
        res.send(err)
      }
      if (data.rows.length) {
        res.send('Username already taken')
      } else if (!data.rows.length) {
        pool.query(`INSERT INTO users (username, password, profile_picture) VALUES ($1, $2, $3)`, [username, password, profile_picture], (err, data2) => {
          if (err) {
            console.log(err)
            res.send(err)
          }
          res.send('Created Account');
        })
      }
    })
  },
};
