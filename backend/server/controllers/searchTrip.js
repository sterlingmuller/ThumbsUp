var searchTrip = require('../../database/models/searchTrip.js');

module.exports = {
  getRiderTrips (req, res) {
    var callback = (err, results) => {
      err ? console.log(err) : res.send(results.rows);
    };
    searchTrip.getRiderTrips(callback, req);
}
}



// getRooms: function (req, res) {

//   var callback = (err, result) => {
//     if (err) {
//       console.log('there is an error', err);
//     } else {
//       res.send(result.rows);
//     }
//   };
//   messages.getRooms(callback,req.query);
// }