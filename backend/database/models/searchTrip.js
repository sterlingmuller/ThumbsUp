var { pool } = require('../index.js');

module.exports = {
  searchTrips: function (user_id, callback) {
    let queryStr = `
      SELECT start_address, end_address, start_time, dt.id AS driver_trip_id
      FROM driver_trips dt
      WHERE dt.completed = false`;
    let queryArgs = [user_id];
    pool.query(queryStr, queryArgs, callback);
  }
}

// SELECT rt.id AS rider_trip_id, start_address, end_address, start_time, dt.id AS driver_trip_id
//       FROM driver_trips dt
//       INNER JOIN rider_trips rt
//       ON dt.id = rt.id_driver_trips
//       WHERE rt.user_id = $1 AND dt.completed = false`;