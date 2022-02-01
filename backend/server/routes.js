let messages = require('./controllers/messages.js');
let router = require('express').Router();

//Connect methods to their routes
// Matt
  //messages
router.get('/messages', messages.get);

router.get('/messagesChatRooms', messages.getRooms);    
router.post('/messages', messages.post);
  //users
router.get('/messagesUsers', messages.getUser); 

// Prith
const users = require('./controllers/users.js');
router.post('/usersLogin', users.checkLogin);
router.post('/usersCreate', users.createUser)// Neil

// Sterling
const drivers = require('./controllers/drivers.js')
router.get('/drivers', drivers.getUpcomingTrips);
router.put('/drivers', drivers.markCompleted);
router.delete('/drivers', drivers.cancelTrip);

// Ezra

// Mitchell
const trips = require('./controllers/trips.js')
router.get('/trips/upcoming', trips.getUpcoming)
router.get('/trips/previous', trips.getPrevious)
router.get('/trips/driver', trips.getDriverInfo)
router.post('/trips/driver', trips.postDriverRating)
router.get('/trips/rated', trips.getRated)

module.exports = router;