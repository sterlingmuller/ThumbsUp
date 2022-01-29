var messages = require('../../database/models/messages.js');


module.exports = {
  get: function (req, res) {
    console.log('got a gett all request!!');
    var callback = (err, result) => {
      if (err) {
        console.log('there is an error', err);
      } else {
        res.send(result.rows);
        console.log('result:', result);
      }
    };
    messages.getMessages(callback,req.body);
  }, // a function which handles a get request for all messages



  post: function (req, res) {
    messages.createMessage(req.body);
    res.send('you posted');
  } // a function which handles posting a message to the database
};
