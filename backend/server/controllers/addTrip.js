const {pool} = require('../../database/index.js');


module.exports = {
  trip(req,res){
    const {user_id, start_address, end_address, start_time} = req.body;
    pool.query('INSERT INTO driver_trips (user_id, start_address, end_address, start_time) VALUES ($1, $2, $3, $4)', [user_id, start_address, end_address, start_time])
    .then(() => {
      console.log('Added trip: ', res);
      res.status(200);
    })
    .catch((err) => console.log('AddTrip error: ', err));
  }
};