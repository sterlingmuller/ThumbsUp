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
  
  getDriveInfo: function (req, res) {

    var callback = (err, result) => {
      if (err) {
        console.log('there is an error', err);
      } else {
        res.send(result.rows);
      }
    };
    messages.getDriveInfo(callback,req.query);
  }, 

  /**
   * This function gets 2 usernames based on 2 user ids
   * @param {*} req 
   * @param {*} res 
   */
  getUser: function (req, res) {
    var callback = (err, result) => {
      if (err) {
        console.log('there is an error', err);
      } else {
        res.send(result.rows);
      }
    };
    messages.getUser(callback,req.query);
  }, 

  /**
   * this function gets all chatrooms that driver is a part of 
   * @param {*} req 
   * @param {*} res 
   */
  getRooms: function (req, res) {

    var callback = (err, result) => {
      if (err) {
        console.log('there is an error', err);
      } else {
        res.send(result.rows);
      }
    };
    messages.getRooms(callback,req.query);
  }, 

  acceptRider: function (req, res) {
    var callback = (err, result) => {
      if (err) {
        console.log('there is an error', err);
      } else {
        res.send(result.rows);
      }
    };
    messages.acceptRider(callback,req.body);
  },

/**
 * This function adds 1 message to 1 chatroom
 * @param {*} req 
 * @param {*} res 
 */
  post: function (req, res) {
    messages.createMessage(req.body);
    res.send('you posted');
  },

  rejectRider: function (req, res) {
    var callback = (err, result) => {
      if (err) {
        console.log('there is an error', err);
      } else {
        res.send(result.rows);
      }
    };
    messages.rejectRider(callback,req.query);
  },
};
