const {pool} = require('../../database/index.js');


module.exports = {
  checkStatus (req, res) {
    let {driver_trips} = req.body;
    let sql = 'SELECT message_read FROM messages WHERE id_driver_trips=$1 ORDER BY message_id DESC LIMIT 1;'

    pool.query(sql, [driver_trips])
    .then(({rows}) => {
      res.status(200).send(rows);
    })
    .catch(err => console.log('err:', err));
  }


}