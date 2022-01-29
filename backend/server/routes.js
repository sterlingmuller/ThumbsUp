let messages = require('./controllers/messages.js');
let router = require('express').Router();

//Connect methods to their routes
router.get('/messages', messages.get);

router.post('/messages', messages.post);

module.exports = router;