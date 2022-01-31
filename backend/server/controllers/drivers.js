const {pool} = require('../../database/index.js');


module.exports = {
  // get: function (req, res) {
  //   console.log('got a gett all request!!');
  //   var callback = (err, result) => {
  //     if (err) {
  //       console.log('there is an error', err);
  //     } else {
  //       res.send(result.rows);
  //       // console.log('result:', result);
  //     }
  //   };
  //   messages.getMessages(callback,req.body);
  // }, // a function which handles a get request for all messages

  getTrips (req, res) {
    console.log("req query:::", req.query);
    let {user_id} = req.query;
    let sql = 'SELECT username, dt.id, start_address, end_address, start_time, completed FROM users u, driver_trips dt WHERE u.user_id=$1';

    pool.query(sql, [user_id])
    .then(({rows}) => {
      console.log("res:::", rows);
      res.status(200).send(rows);
    })
    .catch(err => console.log('err:', err));
  }



  // a function which handles posting a message to the database
};
