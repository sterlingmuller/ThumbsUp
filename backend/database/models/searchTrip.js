var {pool} = require('../index.js');

module.exports = {
  /**
   * a function which produces all the messages for one chat
   * @param {Function} callback
   * @param {Object} chatObject
   */

  getRiderTrips: function (callback, req) {
    let { startingLocation } = req.query;
    let search = 'SELECT id, start_address, end_address, start_time FROM driver_trips WHERE completed=false AND start_address % $1;';
    let todos = [
      startingLocation
    ];
    pool.query(search, todos, callback) 
  }
};