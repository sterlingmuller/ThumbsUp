const {pool} = require('../../database/index.js');


module.exports = {

  getUpcomingTrips (req, res) {
    console.log("req query:::", req.query);
    let {user_id} = req.query;
    let sql = 'SELECT username, dt.id, start_address, end_address, start_time, completed FROM users u, driver_trips dt WHERE u.user_id=$1 AND dt.completed=false';

    pool.query(sql, [user_id])
    .then(({rows}) => {
      console.log("res:::", rows);
      res.status(200).send(rows);
    })
    .catch(err => console.log('err:', err));
  },

  markCompleted (req, res) {
    let {trip_id} = req.query;
    let sql = 'UPDATE driver_trips SET completed = true WHERE id=$1'

    pool.query(sql, [trip_id])
    .then(res.status(201).send('Trip complete!'))
    .catch(err => console.log(err));
  },

  cancelTrip (req, res) {
    let {trip_id} = req.query;
    let sql = 'DELETE FROM driver_trips WHERE id=$1';

    pool.query(sql, [trip_id])
      .then(res.status(201).send("Trip canceled"))
      .catch(err => console.log(err));
  }


};
