var {pool} = require('../index.js');

module.exports = {
  /**
   * a function which produces all the messages for one chat
   * @param {Function} callback
   * @param {Object} chatObject
   */
  getMessages: function (callback, chatObject) {
    let stmt = `SELECT * FROM messages where id_driver_trips = $1 AND (recepient_id = $2 OR sender_id = $2);`;
    let todos = [
      chatObject.tripId,
      chatObject.userId
    ];
    pool.query(stmt,todos, callback);
  },

  getUser: function (callback, chatObject) {

    let stmt = `SELECT * FROM users WHERE user_id = $1 OR user_id = $2;`;
    let todos = [
      chatObject.sender_id,
      chatObject.recepient_id
    ];
    pool.query(stmt,todos, callback);
  },

  getRooms: function (callback, chatObject) {

    let stmt = `SELECT DISTINCT ON (message_sender) FROM messages m WHERE id_driver_trips = $1 ORDER BY message_time;`;
    let todos = [
      chatObject.tripId,
      chatObject.sender_id,
      chatObject.recepient_id
    ];
    pool.query(stmt,todos, callback);
  },


/**
 * a function which can be used to insert a message into the database
 * @param {Object} messageObject
 */
  createMessage: function (messageObject) {
    let stmt = `INSERT INTO messages ( id_driver_trips, message_sender, message_recepient, message_body, message_time)  VALUES ( $1, $2, $3, $4, $5)`;
    let todos = [

      messageObject.tripId,
      messageObject.message_sender,
      messageObject.message_recepient,
      messageObject.message_body,
      messageObject.message_time,

    ];
    pool.query(stmt, todos, (err, results, fields, meadows) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Row inserted:' + results.affectedRows);
    }
    );
  }
};