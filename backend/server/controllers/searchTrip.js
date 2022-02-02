const searchTrip = require('../../database/models/searchTrip.js');

module.exports = {
  searchTrips: function (req, res) {
    const { user_id } = req.query;

    trips.getUpcomingTrips(user_id, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result.rows)
      }
    });
  }
}