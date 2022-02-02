const {pool} = require('../../database/index.js');


module.exports = {

  getUpcomingTrips (req, res) {
    console.log("req query:::", req.query);
    let {user_id} = req.query;
    let sql = 'SELECT u.username, dt.id as trip_id, u.user_id as user_id, dt.start_address, dt.end_address, dt.start_time, dt.completed FROM driver_trips dt, users u WHERE u.user_id=$1 AND dt.user_id=$1 AND dt.completed=false';

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
    // let sql2 = 'DELETE FROM messages WHERE id_driver_trips=$1; DELETE FROM driver_trips WHERE id=$1';

    pool.query(sql, [trip_id])
      .then(res.status(201).send("Trip canceled"))
      .catch(err => console.log(err));
  }


};
