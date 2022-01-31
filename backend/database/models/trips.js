var { pool } = require('../index.js');

module.exports = {
  getUpcomingTrips: function (user_id, callback) {
    let queryStr = `
      SELECT rt.id AS rider_trip_id, start_address, end_address, start_time, dt.id AS driver_trip_id
      FROM driver_trips dt
      INNER JOIN rider_trips rt
      ON dt.id = rt.id_driver_trips
      WHERE rt.user_id = $1 AND dt.completed = false`;
    let queryArgs = [user_id];
    pool.query(queryStr, queryArgs, callback);
  },

  getRiderPrevious: function (user_id, callback) {
    let queryStr = `
      SELECT rt.id AS rider_trip_id, start_address, end_address, start_time, dt.id AS driver_trip_id
      FROM driver_trips dt
      INNER JOIN rider_trips rt
      ON dt.id = rt.id_driver_trips
      WHERE rt.user_id = $1 AND dt.completed = true`;
    let queryArgs = [user_id];
    pool.query(queryStr, queryArgs, callback);
  },

  getDriverPrevious: function (user_id, callback) {
    let queryStr = `
      SELECT id AS driver_trip_id, start_address, end_address, start_time
      FROM driver_trips dt
      WHERE user_id = $1 AND completed = true`;
    let queryArgs = [user_id];
    pool.query(queryStr, queryArgs, callback);
  },

  getDriverInfo: function (trip_id, callback) {
    let queryStr = `
    SELECT u.user_id, username, profile_picture
    FROM users u
    INNER JOIN driver_trips dt
    ON u.user_id = dt.user_id
    WHERE dt.id = $1`;
    let queryArgs = [trip_id];
    pool.query(queryStr, queryArgs, callback)
  }

}