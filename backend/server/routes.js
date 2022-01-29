let messages = require('./controllers/messages.js');
let router = require('express').Router();

//Connect methods to their routes
// Matt
router.get('/messages', messages.get);

router.post('/messages', messages.post);

// Prith

// Neil

// Sterling

// Ezra

// Mitchell

module.exports = router;