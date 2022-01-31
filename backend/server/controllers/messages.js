var messages = require('../../database/models/messages.js');


module.exports = {

  /**
   * This function gets all messages for 1 chatroom
   * @param {*} req 
   * @param {*} res 
   */
  get: function (req, res) {

    var callback = (err, result) => {
      if (err) {
        console.log('there is an error', err);
      } else {
        res.send(result.rows);
      }
    };
    messages.getMessages(callback,req.query);
  }, 


  /**
   * This function gets 2 usernames based on 2 user ids
   * @param {*} req 
   * @param {*} res 
   */
  getUser: function (req, res) {
    console.log('getting to getti user nameadfsdfsdfsd!')
    var callback = (err, result) => {
      if (err) {
        console.log('there is an error', err);
      } else {
        res.send(result.rows);
        //console.log('result:', result);
      }
    };
    messages.getUser(callback,req.query);
  }, 


/**
 * This function adds 1 message to 1 chatroom
 * @param {*} req 
 * @param {*} res 
 */
  post: function (req, res) {
    messages.createMessage(req.body);
    res.send('you posted');
  } 
};
