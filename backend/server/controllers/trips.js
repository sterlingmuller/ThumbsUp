const trips = require('../../database/models/trips.js');

module.exports = {
  getUpcoming: function (req, res) {
    const { user_id } = req.query;

    trips.getUpcomingTrips(user_id, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result.rows)
      }
    });
  },

  getPrevious: function(req, res) {
    const { user_id, user_type } = req.query;

    var callback = (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(result.rows)
      }
    }

    if (user_type === 'rider') {
      trips.getRiderPrevious(user_id, callback)
    } else {
      trips.getDriverPrevious(user_id, callback)
    }
  },

  getDriverInfo: function(req, res) {
    const { trip_id } = req.query;

    trips.getDriverInfo(trip_id, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result.rows[0]);
      }
    });
  },

  postDriverRating: function (req, res) {
    const { trip, driver, rating } = req.body;

    trips.postDriverRating(trip, driver, rating, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send('posted');
      }
    });
  }

}