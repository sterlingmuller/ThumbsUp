const {pool} = require('../../database/index.js');


module.exports = {
  trip(req,res){
    const {user_id, start_address, end_address, start_time} = req.body;
    pool.query('INSERT INTO driver_trips (user_id, start_address, end_address, start_time) VALUES ($1, $2, $3, $4)', [user_id, start_address, end_address, start_time])
    .then(() => {
      res.status(200).send('OK');
    })
    .catch((err) => console.log('AddTrip error: ', err));
  },
  
  specificTrip(req,res){
    const {trip_id} = req.query;
    pool.query('SELECT start_address, end_address FROM driver_trips WHERE id=$1',[trip_id])
    .then((data) => {
      res.send(data.rows[0]);
    })
    .catch((err) => console.log('getTrip error: ', err));
  }
};