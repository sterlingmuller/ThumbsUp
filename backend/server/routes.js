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
const riderControllers = require('./controllers/riderControllers.js')
router.post('/apikey', riderControllers.getApiKey);
// Sterling
const drivers = require('./controllers/drivers.js')
router.get('/drivers', drivers.getTrips);

// Ezra

// Mitchell

module.exports = router;