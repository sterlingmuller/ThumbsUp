var searchTrip = require('../../database/models/searchTrip.js');

module.exports = {
  getRiderTrips (req, res) {
    var callback = (err, results) => {
      err ? console.log(err) : res.send(results.rows);
    };
    searchTrip.getRiderTrips(callback, req);
}
}