let messages = require('./controllers/messages.js');
let router = require('express').Router();

//Connect methods to their routes
// Matt
router.get('/messages', messages.get);

router.post('/messages', messages.post);

// Prith
const users = require('./controllers/users.js');
router.post('/usersLogin', users.checkLogin);
router.post('/usersCreate', users.createUser)
// Neil

// Sterling
const drivers = require('./controllers/drivers.js')
router.get('/drivers', drivers.getTrips);

// Ezra

// Mitchell
const trips = require('./controllers/trips.js')
router.get('/trips/upcoming', trips.getUpcoming)
router.get('/trips/previous', trips.getPrevious)
router.get('/trips/driver', trips.getDriverInfo)

module.exports = router;