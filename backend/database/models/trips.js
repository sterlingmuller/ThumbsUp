var { pool } = require('../index.js');

module.exports = {
  getUpcomingTrips: function (user_id, callback) {
    let queryStr = `
      SELECT rt.id, start_address, end_address, start_time
      FROM driver_trips dt
      INNER JOIN rider_trips rt
      ON dt.id = rt.id_driver_trips
      WHERE rt.user_id = $1 AND dt.completed = false`;
    let queryArgs = [user_id];
    pool.query(queryStr, queryArgs, callback);
  },

  getRiderPrevious: function (user_id, callback) {
    let queryStr = `
      SELECT rt.id, start_address, end_address, start_time
      FROM driver_trips dt
      INNER JOIN rider_trips rt
      ON dt.id = rt.id_driver_trips
      WHERE rt.user_id = $1 AND dt.completed = true`;
    let queryArgs = [user_id];
    pool.query(queryStr, queryArgs, callback);
  },

  getDriverPrevious: function (user_id, callback) {
    let queryStr = `
      SELECT id, start_address, end_address, start_time
      FROM driver_trips dt
      WHERE user_id = $1 AND completed = true`;
    let queryArgs = [user_id];
    pool.query(queryStr, queryArgs, callback);
  }

}