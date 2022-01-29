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

// Ezra

// Mitchell

module.exports = router;