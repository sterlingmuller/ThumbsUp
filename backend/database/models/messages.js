var {client} = require('../index.js');

module.exports = {
  /**
   * a function which produces all the messages for one chat
   * @param {Function} callback 
   * @param {Object} chatObject 
   */
  getMessages: function (callback, chatObject) {
    let stmt = `SELECT * FROM messages where id_driver_trips = $1;`;
    let todos = [
      //chatObject.stuff
      1
    ];
    client.query(stmt,todos, callback);
  },

/**
 * a function which can be used to insert a message into the database
 * @param {Object} messageObject 
 */  
  createMessage: function (messageObject) {
    let stmt = `INSERT INTO messages ( id_driver_trips, message_sender, message_recepient, message_body, message_time)  VALUES ( $1, $2, $3, $4, $5)`;
    let todos = [

      //messageObject.stuff
    ];
    client.query(stmt, todos, (err, results, fields, meadows) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Row inserted:' + results.affectedRows);
    }
    );
  }
};