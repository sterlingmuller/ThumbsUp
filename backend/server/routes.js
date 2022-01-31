let messages = require('./controllers/messages.js');
let router = require('express').Router();

//Connect methods to their routes
// Matt
  //messages
router.get('/messages', messages.get);
    
router.post('/messages', messages.post);
  //users
    
router.get('/messagesUsers', messages.getUser); 

// Prith
const users = require('./controllers/users.js');
router.post('/usersLogin', users.checkLogin);
router.post('/usersCreate', users.createUser)// Neil

// Sterling
const drivers = require('./controllers/drivers.js')
router.get('/drivers', drivers.getTrips);

// Ezra

// Mitchell

module.exports = router;