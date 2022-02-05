var {pool} = require('../index.js');

module.exports = {
  /**
   * a function which produces all the messages for one chat
   * @param {Function} callback
   * @param {Object} chatObject
   */
  getMessages: function (callback, chatObject) {
    let stmt = `SELECT * FROM messages where id_driver_trips = $1 AND (message_recepient = $2  OR  message_sender = $2);`;
    let todos = [
      chatObject.tripId,
      chatObject.sender_id
    ];
    pool.query(stmt,todos, callback);
  },

  getUser: function (callback, chatObject) {

    let stmt = `SELECT * FROM users WHERE user_id = $1 ;`;
    let todos = [
      chatObject.sender_id,
    ];
    pool.query(stmt,todos, callback);
  },

  getRooms: function (callback, chatObject) {
    let stmt = `SELECT DISTINCT m.message_sender FROM messages m LEFT JOIN driver_trips dt ON id_driver_trips = $1 WHERE dt.completed = false;`;
    let todos = [
      chatObject.tripId,

    ];
    pool.query(stmt,todos, callback);
  },

  acceptRider: function(callback, chatObject) {
    console.log(chatObject);
    let stmt = `INSERT INTO rider_trips (user_id, id_driver_trips, pending) VALUES ($1, $2, $3 ) ;`;
    //make rider trip 
    let todos = [
      chatObject.user_id,
      chatObject.id_driver_trips,
      chatObject.pending //false
    ];
    pool.query(stmt,todos, callback);
  },

  
  getDriveInfo: function(callback, chatObject) {
    let stmt = `SELECT * FROM driver_trips WHERE id = ($1);`;
    let todos = [
      chatObject.tripId,

    ];
    pool.query(stmt,todos, callback);
  },

  rejectRider: function(callback, chatObject) {
    let stmt = `DELETE FROM messages WHERE id_driver_trips = ($1) AND message_sender = ($2);`;
                //DELETE FROM rider_trips r WHERE id_driver_trips = $1 AND user_id = $2
    let todos = [
      chatObject.tripId,
      chatObject.sender_id

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
      console.log('Row inserted:' );
    }
    );
  }
};