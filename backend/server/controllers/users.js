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
      result.rows[0].row = result.rows[0].row.replace(/[{()}]/g, '');
      result.rows[0].row = result.rows[0].row.split(',')
      if (username !== result.rows[0].row[0] && password !== result.rows[0].row[1]) {
        console.log('Invalid Login');
        res.send(false);
      } else {
        console.log('Valid Login');
        res.send(true);
      }


    };
    users.loginValidation(callback, username);
  }

};
