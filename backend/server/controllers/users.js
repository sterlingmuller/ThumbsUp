const users = require('../../database/models/users.js');


module.exports = {
  checkLogin: function (req, res) {
    const {username, password} = req.body;
    console.log('Login attempt');
    const callback = (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      if (!result.rows.length) {
        console.log('Invalid Login');
        res.send(false);
        return;
      }
      result.rows[0].row = result.rows[0].row.replace(/[{()}]/g, '');
      result.rows[0].row = result.rows[0].row.split(',')
      console.log(result.rows[0].row)
      if (username !== result.rows[0].row[1] || password !== result.rows[0].row[2]) {
        console.log('Invalid Login');
        res.send(false);
      } else {
        console.log('Valid Login');
        const payload = {
          userId: result.rows[0].row[0],
          username: result.rows[0].row[1]
        }
        res.send(payload);
      }


    };
    users.loginValidation(callback, username);
  },
  createUser: function (req, res) {
    let {username, password, profile_picture} = req.body;
    profile_picture = profile_picture || ''
    console.log(username, password)
    console.log('User Creation attempt');
    const callback = (err, result) => {
      if (err) {
        console.log(err.detail);
        res.send(err.detail);
        return;
      }
      console.log('Created Account');
      res.send('Created Account');
    }
    users.newUserCreation(callback, username, password, profile_picture);
  }

};
