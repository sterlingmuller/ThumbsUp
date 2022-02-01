let messages = require('./controllers/messages.js');
let router = require('express').Router();

//Connect methods to their routes
// Matt
router.get('/messages', messages.get);

router.post('/messages', messages.post);

// Prith
const users = require('./controllers/users.js');
const passport = require('passport');
router.post('/usersCreate', users.createUser)
router.post('/login', passport.authenticate('local'), users.checkLogin);
// Neil

// Sterling
const drivers = require('./controllers/drivers.js')
router.get('/drivers', drivers.getTrips);

// Ezra

// Mitchell

module.exports = router;