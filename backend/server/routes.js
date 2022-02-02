let messages = require('./controllers/messages.js');
let router = require('express').Router();

//Connect methods to their routes
// Matt
  //messages
router.get('/messages', messages.get);
router.delete('/messagesReject', messages.rejectRider);
router.post('/messagesAccept', messages.acceptRider);
router.get('/messagesChatRooms', messages.getRooms);
router.post('/messages', messages.post);
  //users
router.get('/messagesUsers', messages.getUser);

// Prith
const users = require('./controllers/users.js');
const passport = require('passport');
const local = require('./strategies/local.js');
router.post('/usersCreate', users.createUser)
router.post('/login', passport.authenticate('local', { failureMessage: true}), (users.checkLogin));
// Neil

// Sterling
const drivers = require('./controllers/drivers.js')
const newMessage = require('./controllers/newMessage.js')
router.get('/drivers', drivers.getUpcomingTrips);
router.put('/drivers', drivers.markCompleted);
router.delete('/drivers', drivers.cancelTrip);
router.get('/read', newMessage.checkStatus);

// Ezra
const addTrip = require('./controllers/addTrip.js');
router.post('/AddDriverTrip', addTrip.trip);

// Mitchell
const trips = require('./controllers/trips.js')
router.get('/trips/upcoming', trips.getUpcoming)
router.get('/trips/previous', trips.getPrevious)
router.get('/trips/driver', trips.getDriverInfo)
router.post('/trips/driver', trips.postDriverRating)
router.get('/trips/rated', trips.getRated)

module.exports = router;